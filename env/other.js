_unescape_calls = [];
_unescape_retuns = [];
if (typeof _orig_unescape === 'undefined') {
    _orig_unescape = unescape;
    _orig_unescape.toString = () => { return "_orig_unescape" }
}
unescape = function(s) {
    _unescape_calls[_unescape_calls.length] = s;
    util_log("Calling unescape() no.:", _unescape_calls.length);
    var _r = _orig_unescape(s);
    _unescape_retuns[_unescape_calls.length-1] = _r;
    return _r;
}
unescape.toString = () => { return "unescape" }

