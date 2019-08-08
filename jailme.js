var util = require('util');
var vm = require('vm');
require('./cycle');

process.on('uncaughtException', (err) => {
    util.log('!!! Uncaught Exception !!!');
    util.log(util.inspect(err));
});

util.log("mailware-jail, a malware sandbox ver. 0.20");
util.log("------------------------");

// commandline overwrites config.json values
var argv = require('minimist')(process.argv.slice(2), {
    "boolean": true
});
var _exit = false;

if (argv.h || argv.help) {
    util.log("Usage: node jailme.js  [[-e file1] [-e file2] .. ] [-c ./config.json] \\");
    util.log("\t\t[-o ofile] [-b id] \\");
    util.log("\t\t[-s odir] [--down] [malware1 [malware2] .. ]");
    util.log("\t-c config .. use alternative config file, preceed with ./");
    util.log("\t-e ifile ... js that simulates specific environment");
    util.log("\t-o ofile ... name of the file where sandbox shall be dumped at the end");
    util.log("\t-s odir  ... output directory for generated files (malware payload)");
    util.log("\t-b id    ... browser type, use -b list for possible values");
    util.log("\t-t msecs ... number of miliseconds before terminating execution, default 1 minute");
    util.log("\t--trace  ... print stack trace with every log line");
    util.log("\t--down   ... allow downloading malware payloads from remote servers");
    util.log("\t--h404   ... on download return always HTTP/404");
    util.log("\t--t404   ... on download return always HTTP/404 and throw exception");
    util.log("\tmalware  ... js with the malware code");
    util.log("If no arguments are specified the default values are taken from config.json");
    _exit = true;
}

var config_name = "./config.json";

if (typeof argv.c === 'string') {
    config_name = argv.c
}

var config = require(config_name);

if (typeof argv.b === 'string') {
    if (argv.b === 'list') {
        var a = require('./env/agents.js')._agents;
        util.log("Possible -b values:", Object.keys(a));
        _exit = true;
    } else {
        config.browser_type = argv.b
    }
}
if (_exit)
    return;

util.log("Arguments: " + process.argv.slice(2).join(" "));

function parse_argv_array(a, b) {
    if (a) {
        if (Array.isArray(a) && a.length > 0)
            return a;
        else if (typeof a === 'string')
            return [a];
        else if (typeof a === 'boolean')
            return [];
    }
    return b;
}
config.sandbox_sequence = parse_argv_array(argv.e, config.sandbox_sequence);
util.log("Sandbox environment sequence: " + config.sandbox_sequence);

config.malware_files = parse_argv_array(argv._, config.malware_files);
util.log("Malware files: " + config.malware_files);

if (typeof argv.t === 'number')
    config.timeout = argv.t;
if (typeof config.timeout !== 'number')
    config.timeout = 1000 * 60;
util.log("Execution timeout set to: " + config.timeout / 1000 + " seconds");
if (typeof argv.o === 'string')
    config.context_dump_after = argv.o
util.log("Output file for sandbox dump: " + config.context_dump_after);
if (typeof argv.s === 'string')
    config.save_files = argv.s
util.log("Output directory for generated files: " + config.save_files);
//if (process.platform === "win32") {
//    var rl = require("readline").createInterface({
//        input: process.stdin,
//        output: process.stdout
//    });
//
//    rl.on("SIGINT", function() {
//        console.log("here");
//        process.emit("SIGINT");
//    });
//}
//
//process.on("SIGINT", function() {
//    //graceful shutdown
//    console.log("here");
//    process.exit();
//});

var _proxy = function(o, verbose = false, what = undefined) {
    var util_log = mylog;
    ret = new Proxy(o, {
        get: function(target, name, receiver) {
            if (verbose) {
                if (typeof name === 'symbol')
                    vname = name.toString();
                else
                    vname = name;
                if (what) {
                    var msg = what + "[" + vname + "]";
                } else {
                    var msg = "Proxy.get: " + _truncateOutput(target.toString(), 50) + "[" + vname + "]";
                }
            }
            if (name in target) {
                if (msg)
                    util_log(msg + " => " + Reflect.get(target, name));
                return Reflect.get(target, name, receiver);
            }
            if (typeof name === 'string') {
                lcname = name.toLowerCase();
                if (lcname in target) {
                    if (msg)
                        util_log(msg + " => " + Reflect.get(target, name));
                    return Reflect.get(target, lcname, receiver);
                }
            }
            ret = Reflect.get(target, name, receiver);
            if (typeof name !== 'symbol') {
                vname = name.toString();
                if (typeof ret === 'undefined') {
                    util_log(">>> " + target._name + "[" + vname + "] not defined");
                    //throw new TypeError(">>> FIXME: " + target + "[" + vname + "] not defined");
                } else {
                    util_log(">>> FIXME: " + target._name + "[" + vname + "] reflected to " + typeof ret);
                }
            }

            return ret;
        },
        set: function(target, name, value) {
            if (verbose) {
                if (typeof name === 'symbol')
                    vname = name.toString();
                else
                    vname = name;
                util_log("Proxy.set: " + _truncateOutput(target.toString(), 50) + "[" + vname + "]");
            }
            if (name in target)
                return Reflect.set(target, name, value);
            if (typeof name === 'string') {
                lcname = name.toLowerCase();
                if (lcname in target)
                    return Reflect.set(target, lcname, value);
            }
            return Reflect.set(target, name, value);
        },
        construct: function(target, args, newTarget) {
            if (verbose) {
                util_log("Proxy.construct: " + target + "(" + _truncateOutput(args.join(", "), 50) + ")");
            }
            return _proxy(Reflect.construct(target, args, newTarget));
        },
        apply: function(target, that, args) {
            if (verbose) {
                util_log("Proxy.apply: " + target + "(" + _truncateOutput(args.join(", "), 50) + ")");
            }
            return Reflect.apply(target, that, args);
        }
    })
    return ret;
}


var sandbox = {};
// too ambitious
// var sandbox = _proxy({});
if (argv.down)
    sandbox._download = "Yes";
else
    sandbox._download = "No";
if (argv.h404)
    sandbox._download = "Return HTTP/404";
if (argv.t404)
    sandbox._download = "Throw HTTP/404";
util.log("Download from remote server: " + sandbox._download);

var _show_stack;
if (argv.trace)
    _show_stack = true;
else
    _show_stack = false;

var _dont_log = false;

function mylog() {
    //if (arguments[0].startsWith("function"))
    //    debugger;
    if (_dont_log)
        return;
    util.log.apply(util, arguments);
    if (_show_stack) {
        var err = new Error();
        var st = err.stack;
        var st1 = st.split("\n");
        var st2 = st1.slice(2, st1.length - 5).join(", ");
        st2 = st2.replace(/\s+/g, ' ');
        util.log(" >" + st2)
    }
}

sandbox.toString = () => {
    return "sandbox";
}
sandbox._object_id = 1;
sandbox.util_log = mylog
sandbox._iconv = require("iconv-lite");

//require('http');
// FIXME: proxy?
//sandbox.Object = Object
//sandbox.Error = Error
//sandbox.Proxy = Proxy
//sandbox.Reflect = Reflect
//sandbox.unescape = unescape
//sandbox.Date = Date
//sandbox.String = String
sandbox.Buffer = Buffer
sandbox._options = (typeof config.options === 'undefined') ? {} : config.options;
sandbox._browser_type = config.browser_type;
sandbox._date = Date;
sandbox.require = require;
sandbox._setTimeout = setTimeout;
sandbox._clearTimeout = clearTimeout;
sandbox._setInterval = setInterval;
sandbox._clearInterval = clearInterval;
sandbox._decodeHTML = require("entities").decodeHTML;
sandbox._inspect = util.inspect;
sandbox._proxy_verbose = false;
sandbox._sync_request = require("sync-request");
sandbox._data = {}
sandbox._sc = ">>> Silencing catch ";
sandbox._browser_api = {
    'Array': Array,
    'Boolean': Boolean,
    'Date': Date,
    'Error': Error,
    'Math': Math,
    'Number': Number,
    'Object': Object,
    'RegExp': RegExp,
    'String': String,
    'Node': {},
    'Element': undefined,
    'HTMLElement': undefined,
    'JSON': JSON,
    'Function': Function
}

fs = require('fs');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var ctx = vm.createContext(sandbox);
var i, fc;

function run_in_ctx(files, malware = true /*no_log = false, catch_catch = false*/) {
    var no_log = !malware;
    var catch_catch = malware;
    try {
        for (i = 0; i < files.length; i++) {
            util.log(" => Executing: " + files[i] + ((no_log) ? " quitely" : " verbosely") + ((catch_catch) ? ", reporting silent catches" : ""));
            fc = fs.readFileSync(files[i], 'utf8');
            _dont_log = no_log;
            sandbox._script_name = files[i];
            // log every exception caught by the script itself
            if (catch_catch) {
                fc = fc.replace(/\bcatch\b\s*\((.*?)\)\s*{/g, 'catch($1) { util_log(_sc + _inspect($1));');
                let fname = files[i].replace(/\//g, "_");
                let fname2 = config.save_files + fname;
                util.log("Saving: " + fname2);
                fs.writeFileSync(fname2, fc);
                let r = /\\u([\d\w]{4})|\\x([\d\w]{2})/gi;
                let x = fc.replace(r, function(match, p1, p2) {
                    let grp = (p1) ? p1 : p2;
                    let ret = String.fromCharCode(parseInt(grp, 16));
                    switch (ret) {
                        case '\\':
                            ret = '\\\\';
                            break;
                        case '\'':
                            ret = '\'\'';
                            break;
                        case '\"':
                            ret = '\"\"';
                            break;
                    }
                    return ret;
                });
                fname2 = config.save_files + "tr_" + fname;
                util.log("Saving: " + fname2);
                fs.writeFileSync(fname2, x);
            }
            if (malware) {
                fc = fc.replace(/\/\*@cc_on/gi, "");
                fc = fc.replace(/@\*\//gi, "");
                fc = fc.replace(/@if.*/gi, "");
                fc = fc.replace(/@else.*/gi, "");
                fc = fc.replace(/@elif.*/gi, "");
                fc = fc.replace(/@end.*/gi, "");

                fc = fc.replace(/\} *var\b/g, "}; var");

                if ("WScript" in sandbox) {
                    sandbox.WScript.scriptfullname = files[i];
                    sandbox.WScript.arguments = [files[i], "xyz"];
                }
            }
            vm.runInContext(fc, ctx, {
                filename: files[i],
                timeout: config.timeout
            });
            _dont_log = false;
        }
    } catch (err) {
        _dont_log = false;
        if ("_source" in err) {
            util.log("Execution finished: " + err._source);
            return true;
        }
        util.log("Exception occured: " + typeof err + " " + util.inspect(err));
        //if (typeof err.stack !== 'undefined')
        //    util.log("Stack: " + err.stack);
        return false;
    } finally {
        _dont_log = false;
    }
    return true;
}

util.log("==> Preparing Sandbox environment.");
if (!run_in_ctx(config.sandbox_sequence, false)) return;

//process.on('SIGINT', function () {
//    util.log('Ctrl-C...');
//    process.exit(2);
//});

// clean up
sandbox.require = undefined;

// Run the malware
util.log("==> Executing malware file(s). =========================================");
process.exitCode = run_in_ctx(config.malware_files, true) ? 0 : 1;
sandbox._config = config;
sandbox._arguments = process.argv.slice(2).join(" ");
exiting = false;

var dump_sandbox = function() {
    var s2 = {};
    var ctx2 = vm.createContext(s2);
    var i, fc;
    s2.writeFile = fs.writeFileSync;
    s2.JSON = JSON;
    s2.sandbox = sandbox;
    s2.config = config;
    s2.util_log = util.log;
    s2.util_inspect = util.inspect;
    s2._escape = /\/|\\|%|:/gi;
    s2._f = {};
    let c = `var _f = function(t) {
        var out;
        out = JSON.stringify(JSON.decycle(sandbox), function(key, value) {
                // convert functions to string
                if (typeof value === 'function') {
                    try {
                        return value.toString();
                    } catch (err) {
                        util_log("Exception occured: " + typeof err + " ==> " + util_inspect(err));
                        util_log("Object details: " + typeof value + " ==> " + util_inspect(value));
                        return "!!! Exception occured !!!";
                    }
                }
                    return value;
                }, 4);

        writeFile(config.context_dump_after, out);
        util_log("The sandbox context has been  saved to: " + config.context_dump_after);

        p = sandbox._data["eval_calls"];
        var ec = 1;
        for (let key in p) {
            if (p.hasOwnProperty(key)) {
                fname = config.save_files + "eval_" + ec++ + ".js";
                util_log("Saving: " + fname);
                writeFile(fname, p[key]["report_catch"]);
            }
        }

        p = sandbox._Function_calls;
        for (let key in p) {
            if (p.hasOwnProperty(key)) {
                fname = config.save_files + key + ".js";
                util_log("Saving: " + fname);
                writeFile(fname, p[key][p[key].length - 1]);
            }
        }

        var name, p, fname;
        p = sandbox._wscript_saved_files;
        for (let key in p) {
            if (p.hasOwnProperty(key)) {
                name = key.replace(_escape, "_");
                fname = config.save_files + name;
                util_log("Saving: " + fname);
                writeFile(fname, p[key]);
            }
        }

        p = sandbox._wscript_urls;
        if (p.length > 0) {
            out = JSON.stringify(p, null, 4);
            fname = config.save_files + "urls.json";
            util_log("Saving: " + fname);
            writeFile(fname, out);
        }
        p = sandbox._wscript_wmis;
        if (p.length > 0) {
            out = JSON.stringify(p, null, 4);
            fname = config.save_files + "wmis.json";
            util_log("Saving: " + fname);
            writeFile(fname, out);
        }
     }

    _f();
    `

    vm.runInContext(c, ctx2, {
        timeout: 60 * 1000
    });
}

process.on('beforeExit', (code) => {
    if (exiting)
        return;
    exiting = true;
    util.log("==> Cleaning up sandbox.");
    sandbox._decodeHTML = undefined;
    sandbox._my_path = undefined;
    sandbox._browser_api = undefined;
    sandbox.util_log.toString = () => {
        return "util_log"
    }
    sandbox._iconv = undefined;
    sandbox._date = undefined;
    sandbox.require = undefined;
    sandbox._setTimeout = undefined;
    sandbox._clearTimeout = undefined;
    sandbox._setInterval = undefined;
    sandbox._clearInterval = undefined;
    sandbox._decodeHTML = undefined;
    sandbox._inspect = undefined;
    sandbox._pw32 = undefined;
    sandbox.Base64 = undefined;
    sandbox.console = undefined;

    util.log("==> Script execution finished, dumping sandbox environment to a file.");

    dump_sandbox(sandbox, fs.writeFileSync, config);

    return;
})
