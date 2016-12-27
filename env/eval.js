util_log("Preparing sandbox to intercept eval() calls.");
eval = function() {
    var _eval_calls = [];
    _data["eval_calls"] = _eval_calls;
    var _orig_eval;
    if (typeof _orig_eval === 'undefined')
        _orig_eval = eval;
    var _ = function(s) {
        var _t = {};
        _t["orig"] = s;
        var ns;
        // "potato".includes("to");
        if (s.indexOf("continue") > -1) {
            util_log("Potentially contains continue within a catch");
            ns = s.replace(/try/g, '').replace(/catch/g, '\r\nwhile');
        } else {
            ns = s.replace(/try/g, '').replace(/catch/g, '\r\nfunction _mycatch');
        }
        _t["no_try_catch"] = ns;
        ns1 = s.replace(/\bcatch\b\s*\((.*?)\)\s*{/g, 'catch($1) { util_log(">>> Silencing catch " + _inspect($1));');
        _t["report_catch"] = ns1;
        //  https://github.com/defconhaya proposal:
        ns = ns.replace(/function ([^ (]*)/g, "$1 = function");
        _t["safe_funcs"] = ns;
        _eval_calls[_eval_calls.length] = _t;
        var _isStrict = (function() {
            return !this;
        })();
        //util_log("Strict mode:", _isStrict);
        util_log("Calling eval[" + _eval_calls.length + "]('" + _truncateOutput(ns1) +"')");
        return _orig_eval(ns1);
    }
    return function eval(s) { /* [native code ] */ return _(s)}
}();
