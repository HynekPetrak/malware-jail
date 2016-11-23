function _trace(t) {
    try {
        throw new Error(t);
    } catch (err) {
        util_log("Trace Non-" + _inspect(err));
    }
}

var _defineProperty = function(that, name, map) {
    Object.defineProperty(that, name, {
        get: function() {
            util_log(that._name + "." + name + ".get() => " + _truncateOutput(map[name]));
            return map[name];
        },
        set: function(v) {
            util_log(that._name + "." + name + " = '" + _truncateOutput(v) + "'");
            map[name] = v;
        }
    })
}
_defineProperty.toString = () => {
    return "_defineProperty"
}

var _truncateOutput = function(v, max_len) {
    // TODO: make max_len a command line parameter
    try {
        if (typeof max_len === 'undefined') {
            max_len = 250;
        }
        if (v === null)
            return "null";
        if (typeof v === 'undefined')
            return "undefined";
        var vtrunc = "" + v.toString();
        if (vtrunc.length > max_len) {
            vtrunc = vtrunc.substring(0, max_len) + " ... (truncated)";
        }
        return vtrunc.replace(/[^\x20-\x7E]/g, '?');
    } catch (err) {
        util_log("Exception occured in _truncateOutput: " + _inspect(err));
        throw err;
    }
}
_truncateOutput.toString = () => {
    return "_truncateOutput"
}

var _defineSingleProperty = function(that, name, intvar) {
    if (typeof intvar === 'undefined') {
        intvar = "_" + name;
        that[intvar] = "";
    }

    Object.defineProperty(that, name, {
        get: function() {
            util_log(that._name + "." + name + ".get() => (" + typeof that[intvar] + ") '" + _truncateOutput(that[intvar]) + "'");
            return that[intvar];
        },
        set: function(v) {
            util_log(that._name + "." + name + " = (" + typeof v + ") '" + _truncateOutput(v) + "'");
            that[intvar] = v;
        }
    })
}
_defineSingleProperty.toString = () => {
    return "_defineSingleProperty"
}
var _proxy_verbose = false;
var _proxy_options = {
    "dont_fail": true,
    "verbose" : false
};


var _proxy = function(o, verbose = false, what = undefined) {
    // util_log("Creating proxy for " + o);
    ret = new Proxy(o, {
        get: function(target, name) {
            //util_log("name is a " + typeof name);
            if (_proxy_options.verbose || verbose) {
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
                return Reflect.get(target, name);
            }
            if (typeof name === 'string') {
                lcname = name.toLowerCase();
                if (lcname in target) {
                    if (msg)
                        util_log(msg + " => " + Reflect.get(target, name));
                    return Reflect.get(target, lcname);
                }
            }
            ret = Reflect.get(target, name);
            if (typeof name !== 'symbol') {
                vname = name.toString();
                if (typeof ret === 'undefined') {
                    if (_proxy_options.dont_fail)
                        util_log(">>> FIXME: " + target._name + "[" + vname + "] not defined");
                    else
                        throw new TypeError(">>> FIXME: " + target + "[" + vname + "] not defined");
                } else {
                    util_log(">>> FIXME: " + target._name + "[" + vname + "] reflected to " + typeof ret);
                }
            }

            return ret;
        },
        set: function(target, name, value) {
            if (_proxy_options.verbose) {
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
            if (_proxy_options.verbose) {
                util_log("Proxy.construct: " + target + "(" + _truncateOutput(args.join(", "), 50) + ")");
            }
            return _proxy(Reflect.construct(target, args, newTarget));
        },
        apply: function(target, that, args) {
            if (_proxy_options.verbose) {
                util_log("Proxy.apply: " + target + "(" + _truncateOutput(args.join(", "), 50) + ")");
            }
            return Reflect.apply(target, that, args);
        }
    })
    return ret;
}
_proxy.toString = () => {
    return "_proxy"
}

if (typeof module !== 'undefined') {
    var exports = module.exports = {};
    exports._proxy = _proxy;
    exports._proxy_options = _proxy_options;
    var util_log = console.log;
}
// Strange, does not work in node
//Date.toStringOrig = Date.prototype.toString;
////
//Date.prototype.toString = function() {
//        // Node: Sat,Oct,22,2016,22:20:52,GMT+0200,(CEST)
//        // WSH:  Sat,Oct,22,22:07:32,UTC+0200,2016
//        util_log("called")
//        var a = this.toStringOrig().split(" ");
//        var b = a.slice(3);
//        b[3] = a[4];
//        b[4] = a[5];
//        b[5] = a[3];
//        return b.join(" ");
//    }
//    //Date.prototype.inspect = Date.prototype.toString;
