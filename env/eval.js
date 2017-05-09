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
        //if (s.indexOf("continue") > -1) {
        //    util_log("Potentially contains continue within a catch");
        //    ns = s.replace(/try/g, '').replace(/catch/g, '\r\nwhile');
        //} else {
        //    ns = s.replace(/try/g, '').replace(/catch/g, '\r\nfunction _mycatch');
        //}
        //_t["no_try_catch"] = ns;
        ns1 = s.replace(/\bcatch\b\s*\((.*?)\)\s*{/g, 'catch($1) { util_log(">>> Silencing catch " + _inspect($1));');
        _t["report_catch"] = ns1;
        //  https://github.com/defconhaya proposal:
        ns = ns1.replace(/function ([^ (]*)/g, "$1 = function");
        //ns1 = ns;
        _t["safe_funcs"] = ns;
        _eval_calls[_eval_calls.length] = _t;
        var _isStrict = (function() {
            return !this;
        })();

        ns1 = ns1.replace(/\/\*@cc_on/gi, "");
        ns1 = ns1.replace(/@\*\//gi, "");
        ns1 = ns1.replace(/@if.*/gi, "");
        ns1 = ns1.replace(/@else.*/gi, "");
        ns1 = ns1.replace(/@elif.*/gi, "");
        ns1 = ns1.replace(/@end.*/gi, "");

        ns1 = ns1.replace(/\} *var\b/g, "}; var");

        //util_log("Strict mode:", _isStrict);
        util_log("Calling eval[" + _eval_calls.length + "]('" + _truncateOutput(ns1) +"')");
        return _orig_eval(ns1);
    }
    return function eval(s) { /* [native code ] */ return _(s)}
}();
