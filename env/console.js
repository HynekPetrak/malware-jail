console = _proxy({
    _name: "console",
    time: function(a) {
        util_log(this._name + ".time(" + a + ")");
        return;
    },
    timeend: function(a) {
        util_log(this._name + ".timeEnd(" + a + ")");
        return;
    },
    log: function(a) {
        util_log(this._name + ".log(" + a + ")");
        return;
    },
    assert: function(a) {
        util_log(this._name + ".assert(" + a + ")");
        return;
    },
    clear: function(a) {
        util_log(this._name + ".clear" + a + ")");
        return;
    },
    count: function(a) {
        util_log(this._name + ".count(" + a + ")");
        return;
    },
    dir: function(a) {
        util_log(this._name + ".dir(" + a + ")");
        return;
    },
    dirxml: function(a) {
        util_log(this._name + ".dirxml(" + a + ")");
        return;
    },
    error: function(a) {
        util_log(this._name + ".(" + a + ")");
        return;
    },
    group: function(a) {
        util_log(this._name + ".group(" + a + ")");
        return;
    },
    groupcollapsed: function(a) {
        util_log(this._name + ".groupCollapsed(" + a + ")");
        return;
    },
    groupend: function(a) {
        util_log(this._name + ".groupEnd(" + a + ")");
        return;
    },
    info: function(a) {
        util_log(this._name + ".info(" + a + ")");
        return;
    },
    profile: function(a) {
        util_log(this._name + ".profile(" + a + ")");
        return;
    },
    profileend: function(a) {
        util_log(this._name + ".profileEnd(" + a + ")");
        return;
    },
    table: function(a) {
        util_log(this._name + ".table(" + a + ")");
        return;
    },
    timestamp: function(a) {
        util_log(this._name + ".timeStamp(" + a + ")");
        return;
    },
    trace: function(a) {
        util_log(this._name + ".trace(" + a + ")");
        return;
    },
    warn: function(a) {
        util_log(this._name + ".warn(" + a + ")");
        return;
    }
})
console.toString = () => { return "console" }
