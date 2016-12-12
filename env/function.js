util_log("Preparing sandbox to intercept 'new Function()' calls.");
_Function_calls = {};

var Function = function() {
    _orig_Function = Function;
    _orig_Function.toString = () => {
        return "_orig_Function";
    }
    return function() {
        _fn_id = id++;
        _name = "Function[" + _fn_id + "]";
        _Function_calls[_name] = Array.prototype.slice.call(arguments); //.join(",");
        util_log("new Function(" + _truncateOutput(Array.prototype.slice.call(arguments).join(", ")) + ") => " + _name);
        // Inject logger into the new function created
        var new_args = arguments;
        var orig_body = arguments[new_args.length - 1];
        //util_log("orig: " + orig_body);
        var orig_fn = "function(" + Array.prototype.slice.call(arguments, 0, -1).join(", ") + ") {" + orig_body + "}"
        var used_body = "var fn = " + orig_fn + "; var ret = fn.apply(this, arguments); util_log(\"Returning: '\"+ret+\"'\"); return ret;";
        //var escaped_fn = orig_fn.replace(/\"/g, "\\\"");
        used_body = "util_log('Calling Function[" + _fn_id +
            "]('+_truncateOutput(Array.prototype.slice.call(arguments).join(\", \"))+') on ' + _truncateOutput(this));" + used_body;
        new_args[new_args.length - 1] = used_body;
        //util_log("args: " + Array.prototype.slice.call(new_args).join(","));
        return _orig_Function.apply(this, new_args);
    };
}()

Function.toString = () => {
    return "Function"
}
