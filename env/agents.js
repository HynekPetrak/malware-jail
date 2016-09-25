/*
    agents.js - different browser agent strings
*/

_agents = {
    "IE11_W10": {
        "_browser_type": "IE11 on Win10 64bit",
        "userAgent":
        //"Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
            "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko",
        "chrome": undefined,
        "vendor": ""
    },
    "IE8": {
        "_browser_type": "IE8 on Win10 64bit",
        "userAgent":
        //"Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; .NET CLR 2.7.58687; SLCC2; Media Center PC 5.0; Zune 3.4; Tablet PC 3.6; InfoPath.3)",
            "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 10.0; WOW64; Trident/7.0; Touch; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)",
        "chrome": undefined,
        "vendor": undefined
    },
    "IE7": {
        "_browser_type": "IE7 on Vista",
        "userAgent":
        //"Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; .NET CLR 2.7.58687; SLCC2; Media Center PC 5.0; Zune 3.4; Tablet PC 3.6; InfoPath.3)",
            "Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 6.0; en-US)",
        "chrome": undefined,
        "vendor": undefined
    },
    "iPhone": {
        "_browser_type": "iPhone?",
        "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) CriOS/47.0.2526.70 Mobile/12B436 Safari/600.1.4 (000410)",
        "chrome": undefined,
        "vendor": "Apple"
    },
    "Firefox": {
        "_browser_type": "Firefox on Win10 64bit",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:44.0) Gecko/20100101 Firefox/44.0",
        "chrome": undefined,
        "vendor": ""
    },
    "Chrome": {
        "_browser_type": "Chrome on Win10 64bit",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36",
        "chrome": {
            "app": {},
            "csi": function() {},
            "loadTimes": function() {},
            "runtime": {},
            "webstore": {}
        },
        "vendor": "Google Inc."
    }
}

if (typeof exports !== 'undefined')
    exports._agents = _agents;

if (typeof window !== 'undefined' /*&& typeof window._props !== 'undefined'*/) {
    window._props = _agents[_browser_type];
    util_log("Setting Browser environment to:", window._props._browser_type);
    for (var k in window._props) {       
        _defineProperty(window, k, window._props);
    }
    window.appVersion = window.userAgent;
}
