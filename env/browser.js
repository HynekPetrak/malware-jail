/*
    browser.js - simulates web browser like environment
*/

util_log("Preparing sandbox to emulate Browser environment (default = IE11).");
_browser_documents = [];

location = _proxy({
    _name: "location",
    _props: {
        "href": "http://example.com/?search",
        "hostname": "example.com",
        "search": "?search",
        "host" : "example.com"
    },
    replace: function(n) {
        util_log(this._name + ".replace(" + n + ")");
        this._props["href"] = n;
    }
})
location.toString = () => { return "location" }
for (var k in location._props) {
    _defineProperty(location, k, location._props);
}

screen = _proxy({
    availHeight: 1080,
    availLeft : 78,
    availTop : 0,
    availWidth : 1842,
    colorDepth : 24,
    height : 1080,
    orientation : { // ScreenOrientation
        angle : 0,
        onchange : null,
        type : "landscape-primary"
    },
    pixelDepth : 24,
    width : 1920
})
screen.toString = () => { return "screen" }


_setInterval_calls = [];
_setTimeout_calls = [];
window = _proxy(new function() {
    this.id = id++;
    this._name = "window[" + this.id + "]";
    util_log("Created: " + this._name);
    //this._props = {
    //    "userAgent" : "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
    //    "chrome" : false,
    //    "vendor" : "Microsoft"
    //};
    //for (var k in this._props) {
    //    _defineProperty(this, k, this._props);
    //}
    this.eval = eval;
    this.settimeout = function() {
        util_log(this._name + ".setTimeout(" + Array.prototype.slice.call(arguments, 0).join(",") + ")");
        _setTimeout_calls[_setTimeout_calls.length] = arguments[0].toString();
        //util_log(typeof arguments[0]);
        return _setTimeout.apply(this, Array.prototype.slice.call(arguments, 0));
    }
    this.cleartimeout = function() {
        util_log(this._name + ".clearTimeout(" + Array.prototype.slice.call(arguments, 0).join(",") + ")");
        _clearTimeout.apply(this, Array.prototype.slice.call(arguments, 0));
    }
    this.scrollby = function(x, y) {
        util_log(this._name + ".scrollBy(" + Array.prototype.slice.call(arguments, 0).join(",") + ")");
    }
    this.setinterval = function() {
        util_log(this._name + ".setInterval(" + Array.prototype.slice.call(arguments, 0).join(",") + ")");
        _setInterval_calls[_setInterval_calls.length] = arguments[0].toString();
        //util_log(typeof arguments[0]);
        return _setInterval.apply(this, Array.prototype.slice.call(arguments, 0));
    }
    this.clearinterval = function() {
        util_log(this._name + ".clearInterval(" + Array.prototype.slice.call(arguments, 0).join(",") + ")");
        _clearInterval.apply(this, Array.prototype.slice.call(arguments, 0));
    }
    this.settimeoutsync = function() {
        util_log(this._name + ".setTimeout(" + Array.prototype.slice.call(arguments, 0).join(",") + ")");
        _setTimeout_calls[_setTimeout_calls.length] = arguments[0].toString();
        //util_log(typeof arguments[0]);
        return arguments[0].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    this.setintervalsync = function() {
        util_log(this._name + ".setInterval(" + Array.prototype.slice.call(arguments, 0).join(",") + ")");
        _setInterval_calls[_setInterval_calls.length] = arguments[0].toString();
        //util_log(typeof arguments[0]);
        return arguments[0].apply(this, Array.prototype.slice.call(arguments, 1));
    }

    this.clearintervalsync = function() {
        util_log(this._name + ".clearInterval(" + Array.prototype.slice.call(arguments, 0).join(",") + ")");
    }
    this.navigator = this;
    this._location = location,
        Object.defineProperty(this, "location", {
            get: function() {
                util_log("document.location.get()");
                return this._location;
            },
            set: function(n) {
                util_log("document.location.set(" + n + ")");
                this._location.href = n;
            }
        })
}());
window.toString = () => { return "window" }

for (var k in _browser_api) {
    if (_browser_api.hasOwnProperty(k))
        if (typeof  _browser_api[k] !== 'undefined') {
            window[k] = _browser_api[k];
        }
}

window.Element = Element;
window.HTMLElement = HTMLElement;
window.Node = Node;

setTimeout = window.setTimeout.bind(window);
setInterval = window.setInterval.bind(window);
clearInterval = window.clearInterval.bind(window);
clearTimeout = window.clearInterval.bind(window);

navigator = window;

Document = _proxy(function() {
    this.id = id++;
    this._name = "document[" + this.id + "]";
    util_log("Created: " + this._name);
    this._content = "";
    this._elements = [];
    this.getelementsbytagname = function(n) {
        var ret = []
        util_log(this._name + ".getElementsByTagName(" + n + ")");
        for(i = 0; i < this._elements.length; i++) {
            var e = this._elements[i];
            if (e.elementName.toLowerCase() === n.toLowerCase()) {
                ret[ret.length] = e;
            }
        }
        util_log(this._name + ".getElementsByTagName(" + n + ") ... " + ret.length + " found");
        return ret;
    };
    this.getelementsbyclassname = function(n) {
        var ret = []
        util_log(this._name + ".getElementsByClassName(" + n + ")");
        for(i = 0; i < this._elements.length; i++) {
            var e = this._elements[i];
            if (e.class.toLowerCase() === n.toLowerCase()) {
                ret[ret.length] = e;
            }
        }
        util_log(this._name + ".getElementsByClassName(" + n + ") ... " + ret.length + " found");
        return ret;
    };
    this.getelementbyid = function(n) {
        util_log(this._name + ".getElementById(" + n + ")");
        for(i = 0; i < this._elements.length; i++) {
            var e = this._elements[i];
            if ((""+ e._id).toLowerCase() === n.toLowerCase()) {
                util_log(this._name + ".getElementById(" + n + ") => " + e._name);
                return e;
            }
        }
        util_log(this._name + ".getElementById(" + n + ") => null");
        return null;
    };
    this.createelement = function(n) {
        util_log(this._name + ".createElement(" + n + ")");
        var e;
        if (n.toLowerCase() === "iframe") {
            e = new HTMLIFrameElement();
        } else if (n.toLowerCase() === "style") {
            e = new Style();
        } else {
            e = new Element(n);
        }
        this._elements[this._elements.length] = e;
        return e;
    };
    this.createtextnode = function(n) {
        util_log(this._name + ".createTextNode(" + n + ")");
        return new Element(n);
    };
    this.createstylesheet = function(n) {
        util_log(this._name + ".createStyleSheet(" + n + ")");
        return this.createelement("style");
    };
    this.write = function(c) {
        util_log(this._name + ".write(content) " + c.length + " bytes");
        util_log("=> '" + c + "'");
        _content = c;
        _browser_documents[_browser_documents.length] = c;
    };
    this.writeln = function(c) {
        util_log(this._name + ".writeln(content) " + c.length + " bytes");
        util_log("=> '" + c + "'");
        _content = c;
        _browser_documents[_browser_documents.length] = c;
    };
    this._addElementById = function(id, content) {
        var e = new Element("div");
        e.id = id;
        e.innerHTML = content;
        this._elements[this._elements.length] = e;
    };
    this._addElementByClass = function(cls, content) {
        var e = new Element("div");
        e.class = cls;
        e.innerHTML = content;
        this._elements[this._elements.length] = e;
    };
    this._props = {
        "body": undefined,
        "referrer": "http://example.com/",
        "cookie": "",
        "namespaces": undefined
    };
    this._location = location;
    for (var k in this._props) {
        _defineProperty(this, k, this._props);
    }
    this.documentelement = this.createelement("html");
    this.body = this.createelement("body");
    this.head = this.createelement("head");
    this.namespaces = new Collection();
    this.documentelement.appendchild(this.head);
    this.documentelement.appendchild(this.body);
})
Document.prototype = Object.create(Node.prototype);
Document.prototype.constructor = Document;
Document.toString = Document.toJSON = () => { return "Document" }

document = _proxy(new Document());
document.toString = () => { return "document" }


Object.defineProperty(document, "location", {
    get: function() {
        util_log("document.location.get()");
        return this._location;
    },
    set: function(n) {
        util_log("document.location.set(" + n + ")");
        this._location.href = n;
    }
})

var Image = function(w, h) {
    Element.call(this, "Image");
    util_log("Image(" + w + ", " + h + ")");

    this._width = w;
    this._height = h;
    _defineSingleProperty(this, "width", "_width");
    _defineSingleProperty(this, "height", "_height");
}
Image.prototype = Object.create(Element.prototype);
Image.prototype.constructor = Image;

