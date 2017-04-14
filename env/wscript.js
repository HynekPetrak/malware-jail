/*
    wscript.js - simulates WScript (Windows scripting host) environment
*/

util_log("Preparing sandbox to emulate WScript environment.");
_wscript_saved_files = {};
_wscript_urls = [];
_wscript_objects = [];
_pw32 = require('path').win32;

Date = _date;
Date.prototype._getYear = Date.prototype.getYear;

Date.prototype.getYear = function() {
    // https://msdn.microsoft.com/cs-cz/library/b9x8b9k7(v=vs.100).aspx
    // Approximate solution
    var r = this._getYear() + 1900;
    util_log("'" + this + "'.getYear() => " + r);
    return r;
}

Object.defineProperty(Error.prototype, "number", {
    get: function() {
        ret = parseInt(this.message);
        util_log("Error.number => " + ret);
        return ret;
    }
});

var Base64 = {
    // Source: http://jsfiddle.net/gabrieleromanato/qaght/
    // and: http://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript#246813

    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }
};

TextStream = function(filename) {
    this.id = id++;
    this._name = "TextStream[" + this.id + "]";
    this._filename = filename;
    this._content = "";
    util_log("new " + this._name);
    this.writeline = function(s) {
        util_log(this._name + ".WriteLine(" + _truncateOutput(s) + ")");
        this._content += s;
        _wscript_saved_files[this._filename] = this._content;
        FS.writeFile(this._filename, this._content);
    }
    this.write = function(s) {
        util_log(this._name + ".Write(" + s + ")");
        this._content += s;
        _wscript_saved_files[this._filename] = this._content;
    }
    this.readall = function() {
        util_log(this._name + ".ReadAll()");
        return "readall";
    }
    this.close = function() {
        util_log(this._name + ".Close()");
    }
    this.readline = function() {
        a = _truncateOutput(Array.prototype.slice.call(arguments, 0).join(","));
        util_log(this._name + ".ReadLine(" + a + ")");
        return "MZreadline";
    }
    this.toString = function() {
        return this._name;
    }
};
TextStream.toString = () => {
    return "TextStream"
}

FileSystemObject = function() {
    this.id = id++;
    this._name = "Scripting.FileSystemObject[" + this.id + "]";
    util_log("new " + this._name);
    this.toString = function() {
        return this._name;
    }
    this.createtextfile = function(filename) { //(filename[, overwrite[, unicode]])
        util_log(this._name + ".CreateTextFile(" + filename + ")");
        return _proxy(new TextStream(filename));
    }
    this.opentextfile = function(filename) { //(filename[, iomode[, create[, format]]])
        util_log(this._name + ".OpenTextFile(" + filename + ")");
        return _proxy(new TextStream(filename));
    }
    this.getfileversion = function(f) {
        util_log(this._name + ".GetFileVersion(" + f + ")");
        return "1.0";
    }
    this.buildpath = function() {
        util_log(this._name + ".BuildPath(" + Array.prototype.slice.call(arguments, 0).join(",") + ")");
        return Array.prototype.slice.call(arguments, 0).join("\\");
    }
    this.getdrive = function(drivespec) {
        util_log(this._name + ".GetDrive(" + drivespec + ")");
        return _proxy(new DriveObject(drivespec));
    }
    this.getdrivename = function(path) {
        util_log(this._name + ".GetDriveName(" + _truncateOutput(path) + ")");
        return path[0]; //Fixme
    }
    this.fileexists = function(f) {
        var ret = false;
        var abs = _pw32.isAbsolute(f);
        if (!abs)
            util_log("FIXME: " + this._name + ".FileExists(" + f + ") - relative path");
        var parts = _pw32.normalize(f).split(_pw32.sep);
        var t = FS;
        for (let p of parts) {
            if (p === "")
                continue;
            t = t[p.toUpperCase()];
            if (typeof t === "undefined")
                break;
        }
        if (typeof t !== "undefined")
            ret = true;
        if (!ret && _options.FileAlwaysExists) {
            util_log("FileExists: " + ret + " overridden with FileAlwaysExists: true");
            ret = true;
        }
        util_log(this._name + ".FileExists(" + f + ") => " + ret);
        return ret;
    }
    this.folderexists = function(f) {
        var ret = false;
        var abs = _pw32.isAbsolute(f);
        if (!abs)
            util_log("FIXME: " + this._name + ".FolderExists(" + f + ") - relative path");
        var parts = _pw32.normalize(f).split(_pw32.sep);
        var t = FS;
        for (let p of parts) {
            if (p === "")
                continue;
            t = t[p.toUpperCase()];
            if (typeof t === "undefined")
                break;
        }
        if (typeof t !== "undefined")
            ret = true;
        util_log(this._name + ".FolderExists(" + f + ") => " + ret);
        return ret;
    }
    this.deletefile = function(f) {
        util_log(this._name + ".DeleteFile(" + f + ")");
        return true;
    }
    this.copyfile = function(f1, f2) {
        util_log(this._name + ".CopyFile(" + f1 + ", " + f2 + ")");
        return true;
    }
    this.getfolder = function(d) {
        d1 = _pw32.normalize(d);
        util_log(this._name + ".GetFolder(" + d + ") => " + d1);
        return _proxy(new FolderObject(d1));
    }
    this.getfile = function(d) {
        d1 = _pw32.normalize(d);
        util_log(this._name + ".GetFile(" + d + ") => " + d1);
        return _proxy(new FileObject(d1));
    }
    this.deletefolder = function(d) {
        util_log(this._name + ".DeleteFolder(" + d + ")");
    }
    this.createfolder = function(f) {
        util_log(this._name + ".CreateFolder(" + f + ")");
        var abs = _pw32.isAbsolute(f);
        if (!abs)
            util_log("FIXME: " + this._name + ".CreateFolder(" + f + ") - relative path");
        var parts = _pw32.normalize(f).split(_pw32.sep);
        var t = FS;
        for (let p of parts) {
            if (p === "")
                continue;
            if (p.toUpperCase() in t)
                t = t[p.toUpperCase()];
            else {
                t = t[p.toUpperCase()] = {};
            };
        }
        return _proxy(new FolderObject(f));
    }
    this.getspecialfolder = function(f) {
        switch ("" + f) {
            case "0":
                fn = ENV["WINDIR"]; //"WindowsFolder";
                break;
            case "1":
                fn = ENV["SYSTEMDIRECTORY"]; //"SystemFolder";
                break;
            case "2":
                fn = ENV["TEMP"]; //TempFolder;
                break;
            default:
                fn = "UnknownType[" + f + "]";
                break;
        }
        util_log(this._name + ".GetSpecialFolder(" + f + ") => " + fn + _pw32.sep);
        return fn + _pw32.sep;
    }
    this.gettempname = function() {
        var fn = "TempFile_" + id++ + ".tmp";
        util_log(this._name + ".GetTempName() => " + fn);
        return fn;
    }
    this.getabsolutepathname = function(d) {
        d1 = _pw32.normalize(d);
        if (!_pw32.isAbsolute(d1)) {
            d1 = ENV["CWD"] + _pw32.sep + d1;
        }
        util_log(this._name + ".GetAbsolutePathName(" + d + ") => " + d1);
        return d1;
    }
};
FileSystemObject.toString = () => {
    return "FileSystemObject"
}

// FIXME : create dummy filesystem structure to be able to answer Folder/FileExists

var FS = {
    "C:": {
        "PROGRAMDATA": {},
        "PROGRAM FILES": {
            "COMMON FILES": {}
        },
        "PROGRAM FILES (X86)": {
            "COMMON FILES": {}
        },
        "USERS": {
            "USER": {
                "APPDATA": {
                    "LOCAL": {
                        "TEMP": {}
                    },
                    "ROAMING": {},
                    "LOCALLOW": {}
                },
                "DESKTOP": {}
            },
            "DEFAULT": {
                "APPDATA": {
                    "LOCAL": {
                        "TEMP": {}
                    },
                    "ROAMING": {},
                    "LOCALLOW": {}
                },
                "DESKTOP": {}
            },
            "PUBLIC": {
                "APPDATA": {
                    "LOCAL": {
                        "TEMP": {}
                    },
                    "ROAMING": {},
                    "LOCALLOW": {}
                },
                "DESKTOP": {}
            }
        },
        "WINDOWS": {
            "SYSTEM32": {
                "DRIVERS": {
                    "ETC": {
                        "SERVICES": "FILE CONTENT"
                    }
                }
            }
        }
    },
    "writeFile": function(f, c) {
        var abs = _pw32.isAbsolute(f);
        if (!abs)
            util_log("FIXME: FS.writeFile - relative path");
        var parts = _pw32.normalize(f).split(_pw32.sep);
        var t = this;
        var path = Array.prototype.slice.call(parts, 0, -1);
        var fname = parts[parts.length - 1];
        util_log("FS.writeFile(" + f + ", " + _truncateOutput(c) + ")");
        for (let p of path) {
            if (p === "")
                continue;
            if (!(p in t))
                t[p] = {}
            t = t[p.toUpperCase()];
        }
        t[fname.toUpperCase()] = c;
    }
};

var ENV = {
    "ALLUSERSPROFILE": "C:\\ProgramData",
    "APPDATA": "C:\\Users\\User\\AppData\\Roaming",
    "COMMONPROGRAMFILES": "C:\\Program Files\\Common Files",
    "COMMONPROGRAMFILES(X86)": "C:\\Program Files (x86)\\Common Files",
    "COMMONPROGRAMW6432": "C:\\Program Files\\Common Files",
    "COMPUTERNAME": "COMPUTER",
    "COMSPEC": "C:\\WINDOWS\\system32\\cmd.exe",
    "CWD": "C:\\Users\\User",
    "FPS_BROWSER_APP_PROFILE_STRING": "Internet Explorer",
    "FPS_BROWSER_USER_PROFILE_STRING": "Default",
    "FP_NO_HOST_CHECK": "NO",
    "HOMEDRIVE": "C:",
    "HOMEPATH": "\\Users\\User",
    "LANG": "EN",
    "LOCALAPPDATA": "C:\\Users\\User\\AppData\\Local",
    "LOGONSERVER": "\\\\COMPUTER",
    "NUMBER_OF_PROCESSORS": "4",
    "OS": "Windows_NT",
    "PATH": "C:\\Users\\User\\AppData\\Roaming\\npm;C:\\Program Files\\nodejs\\;C:\\ProgramData\\Oracle\\Java\\javapath;C:\\Program Files (x86)\\Intel\\iCLS Client\\;C:\\Program Files\\Intel\\iCLS Client\\;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\;C:\\Program Files\\Lenovo\\Fingerprint Manager Pro\\;C:\\Program Files (x86)\\Intel\\Intel(R) Management Engine Components\\DAL;C:\\Program Files\\Intel\\Intel(R) Management Engine Components\\DAL;C:\\Program Files (x86)\\Intel\\Intel(R) Management Engine Components\\IPT;C:\\Program Files\\Intel\\Intel(R) Management Engine Components\\IPT;C:\\Program Files\\Microsoft SQL Server\\120\\Tools\\Binn\\;C:\\Program Files (x86)\\Bitvise SSH Client;C:\\Program Files\\Microsoft\\Web Platform Installer\\;C:\\Program Files (x86)\\Skype\\Phone\\;C:\\Program Files\\Intel\\WiFi\\bin\\;C:\\Program Files\\Common Files\\Intel\\WirelessCommon\\;C:\\Program Files\\Microsoft SQL Server\\Client SDK\\ODBC\\110\\Tools\\Binn\\;C:\\Program Files (x86)\\Microsoft SQL Server\\120\\Tools\\Binn\\;C:\\Program Files\\Microsoft SQL Server\\120\\DTS\\Binn\\;C:\\Program Files (x86)\\Microsoft SQL Server\\120\\Tools\\Binn\\ManagementStudio\\;C:\\Program Files (x86)\\Microsoft SQL Server\\120\\DTS\\Binn\\;C:\\Program Files\\Microsoft SQL Server\\130\\Tools\\Binn\\;C:\\Program Files (x86)\\Microsoft SQL Server\\110\\DTS\\Binn\\;C:\\Program Files (x86)\\Microsoft SQL Server\\130\\DTS\\Binn\\;C:\\Program Files (x86)\\Microsoft Emulator Manager\\1.0\\;C:\\Program Files (x86)\\Windows Kits\\10\\Windows Performance Toolkit\\;C:\\Program Files\\Git\\cmd;C:\\Program Files\\nodejs\\;C:\\Strawberry\\c\\bin;C:\\Strawberry\\perl\\site\\bin;C:\\Strawberry\\perl\\bin;C:\\Program Files\\TortoiseGit\\bin;C:\\Program Files\\dotnet\\;C:\\Tcl\\bin;C:\\Program Files (x86)\\Nmap;C:\\Program Files\\Intel\\WiFi\\bin\\;C:\\Program Files\\Common Files\\Intel\\WirelessCommon\\;C:\\Users\\User\\AppData\\Roaming\\npm;C:\\ProgramData\\Oracle\\Java\\javapath;C:\\Program Files (x86)\\Intel\\iCLS Client\\;C:\\Program Files\\Intel\\iCLS Client\\;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\;C:\\Program Files\\Lenovo\\Fingerprint Manager Pro\\;C:\\Program Files (x86)\\Intel\\Intel(R) Management Engine Components\\DAL;C:\\Program Files\\Intel\\Intel(R) Management Engine Components\\DAL;C:\\Program Files (x86)\\Intel\\Intel(R) Management Engine Components\\IPT;C:\\Program Files\\Intel\\Intel(R) Management Engine Components\\IPT;C:\\Program Files\\Microsoft SQL Server\\120\\Tools\\Binn\\;C:\\Program Files (x86)\\Bitvise SSH Client;C:\\Program Files\\Microsoft\\Web Platform Installer\\;C:\\Program Files (x86)\\Skype\\Phone\\;C:\\Program Files\\Intel\\WiFi\\bin\\;C:\\Program Files\\Common Files\\Intel\\WirelessCommon\\;C:\\Program Files\\Microsoft SQL Server\\Client SDK\\ODBC\\110\\Tools\\Binn\\;C:\\Program Files (x86)\\Microsoft SQL Server\\120\\Tools\\Binn\\;C:\\Program Files\\Microsoft SQL Server\\120\\DTS\\Binn\\;C:\\Program Files (x86)\\Microsoft SQL Server\\120\\Tools\\Binn\\ManagementStudio\\;C:\\Program Files (x86)\\Microsoft SQL Server\\120\\DTS\\Binn\\;C:\\Program Files\\Microsoft SQL Server\\130\\Tools\\Binn\\;C:\\Program Files (x86)\\Microsoft SQL Server\\110\\DTS\\Binn\\;C:\\Program Files (x86)\\Microsoft SQL Server\\130\\DTS\\Binn\\;C:\\Program Files (x86)\\Microsoft Emulator Manager\\1.0\\;C:\\Program Files (x86)\\Windows Kits\\10\\Windows Performance Toolkit\\;C:\\Program Files\\Git\\cmd;C:\\Program Files\\nodejs\\;C:\\Strawberry\\c\\bin;C:\\Strawberry\\perl\\site\\bin;C:\\Strawberry\\perl\\bin;C:\\Program Files\\TortoiseGit\\bin;C:\\Program Files\\dotnet\\;C:\\Users\\User\\AppData\\Local\\Microsoft\\WindowsApps;",
    "PATHEXT": ".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC",
    "PROCESSOR_ARCHITECTURE": "AMD64",
    "PROCESSOR_IDENTIFIER": "Intel64 Family 6 Model 61 Stepping 4, GenuineIntel",
    "PROCESSOR_LEVEL": "6",
    "PROCESSOR_REVISION": "3d04",
    "PROGRAMDATA": "C:\\ProgramData",
    "PROGRAMFILES": "C:\\Program Files",
    "PROGRAMFILES(X86)": "C:\\Program Files (x86)",
    "PROGRAMW6432": "C:\\Program Files",
    "PROMPT": "$P$G",
    "PSMODULEPATH": "C:\\WINDOWS\\system32\\WindowsPowerShell\\v1.0\\Modules\\;C:\\Program Files (x86)\\Microsoft SQL Server\\120\\Tools\\PowerShell\\Modules\\;C:\\Program Files\\WindowsPowerShell\\Modules\\;C:\\Program Files (x86)\\Microsoft SDKs\\Azure\\PowerShell\\ResourceManager\\AzureResourceManager\\;C:\\Program Files (x86)\\Microsoft SDKs\\Azure\\PowerShell\\ServiceManagement\\;C:\\Program Files (x86)\\Microsoft SDKs\\Azure\\PowerShell\\Storage\\",
    "PUBLIC": "C:\\Users\\Public",
    "SESSIONNAME": "Console",
    "SYSTEMDRIVE": "C:",
    "SYSTEMROOT": "C:\\WINDOWS",
    "TEMP": "C:\\Users\\User\\AppData\\Local\\Temp",
    "TMP": "C:\\Users\\User\\AppData\\Local\\Temp",
    "USERDOMAIN": "COMPUTER",
    "USERDOMAIN_ROAMINGPROFILE": "COMPUTER",
    "USERNAME": "User",
    "USERPROFILE": "C:\\Users\\User",
    "WINDIR": "C:\\WINDOWS",
    "SYSTEMDIRECTORY": "C:\\WINDOWS\\System32"
};

FolderObject = function(d) {
    this.id = id++;
    this._name = "FolderObject[" + this.id + "](" + d + ")";
    util_log("new " + this._name);
    _defineSingleProperty(this, "name", "_folder_name");
    _defineSingleProperty(this, "parentfolder");
    //_defineSingleProperty(this, "Files");
    //_defineSingleProperty(this, "SubFolders");
    _defineSingleProperty(this, "isrootfolder");
    _defineSingleProperty(this, "attributes");
    _defineSingleProperty(this, "datecreated");
    _defineSingleProperty(this, "datelastaccessed");
    _defineSingleProperty(this, "datelastmodified");
    _defineSingleProperty(this, "drive");
    _defineSingleProperty(this, "path");
    _defineSingleProperty(this, "shortname");
    _defineSingleProperty(this, "shortpath");
    _defineSingleProperty(this, "size");
    _defineSingleProperty(this, "type");
    var a = _pw32.parse(d);

    this.name = d;
    this.parentfolder = _pw32.join(d, "..");
    Object.defineProperty(this, "files", {
        get: function() {
            var ret = [];
            var f = this.name;
            var abs = _pw32.isAbsolute(f);
            if (!abs)
                util_log("FIXME: " + this._name + ".Files.get() - relative path");
            var parts = _pw32.normalize(f).split(_pw32.sep);
            var t = FS;
            for (let p of parts) {
                if (p === "")
                    continue;
                t = t[p.toUpperCase()];
            }
            if (typeof t !== "undefined") {
                for (var p1 in t) {
                    ret[ret.length] = _pw32.join(this.Name, p1);
                }
            }
            util_log(this._name + ".Files.get() => (" + typeof ret + ") '" + _truncateOutput(ret) + "'");
            return ret;
        }
    });
    Object.defineProperty(this, "subfolders", {
        get: function() {
            var f = this.name;
            var ret = [];
            var abs = _pw32.isAbsolute(f);
            if (!abs)
                util_log("FIXME: " + this._name + ".Files.get() - relative path");
            var parts = _pw32.normalize(f).split(_pw32.sep);
            var t = FS;
            for (let p of parts) {
                if (p === "")
                    continue;
                t = t[p.toUpperCase()];
            }
            if (typeof t !== "undefined") {
                for (var p1 in t) {
                    ret[ret.length] = _pw32.join(this.name, p1);
                }
            }
            util_log(this._name + ".SubFolders.get() => (" + typeof ret + ") '" + _truncateOutput(ret) + "'");
            return ret;
        }
    });

    this.toString = function() {
        return this._name;
    }
};
FolderObject.toString = () => {
    return "FolderObject"
}

DriveObject = function(d) {
    this.id = id++;
    this._name = "DriveObject[" + this.id + "](" + d + ")";
    util_log("new " + this._name);
    _defineSingleProperty(this, "name", "_drive_name");
    _defineSingleProperty(this, "availablespace");
    _defineSingleProperty(this, "driveletter");
    _defineSingleProperty(this, "drivetype");
    _defineSingleProperty(this, "filesystem");
    _defineSingleProperty(this, "freespace");
    _defineSingleProperty(this, "isready");
    _defineSingleProperty(this, "path");
    _defineSingleProperty(this, "rootfolder");
    _defineSingleProperty(this, "serialnumber");
    _defineSingleProperty(this, "totalsize");
    _defineSingleProperty(this, "volumename");
    var a = _pw32.parse(d);

    this.name = d;

    this.toString = function() {
        return this._name;
    }
};
DriveObject.toString = () => {
    return "DriveObject"
}
Folder2 = function(d) {
    this.id = id++;
    this._name = "Folder2[" + this.id + "](" + d + ")";
    util_log("new " + this._name);
    _defineSingleProperty(this, "self", "_self");
    _defineSingleProperty(this, "offlinestatus");
    this.self = _proxy(new FolderItem(d));
    this.toString = () => {
        return this._name;
    }
}
Folder2.toString = () => {
    return "Folder2";
}

FolderItem = function(d) {
    this.id = id++;
    this._name = "FolderItem[" + this.id + "](" + d + ")";
    util_log("new " + this._name);
    _defineSingleProperty(this, "application");
    _defineSingleProperty(this, "getfolder");
    _defineSingleProperty(this, "getlink");
    _defineSingleProperty(this, "isbrowsable");
    _defineSingleProperty(this, "isfilesystem");
    _defineSingleProperty(this, "isfolder");
    _defineSingleProperty(this, "islink");
    _defineSingleProperty(this, "name", "_folder_name");
    _defineSingleProperty(this, "parent");
    _defineSingleProperty(this, "path");
    _defineSingleProperty(this, "size");
    _defineSingleProperty(this, "type");
    this.name = d;
    this.path = d;
    this.toString = () => {
        return this._name;
    }
}
FolderItem.toString = () => {
    return "FolderItem";
}

FileObject = function(d) {
    this.id = id++;
    this._name = "FileObject[" + this.id + "](" + d + ")";
    util_log("new " + this._name);
    this.openastextstream = function() {
        a = _truncateOutput(Array.prototype.slice.call(arguments, 0).join(","));
        util_log(this._name + ".OpenAsTextStream(" + a + ")");
        return _proxy(new TextStream());
    }
    this.toString = function() {
        return this._name;
    }
};
FileObject.toString = () => {
    return "FileObject"
}

Collection = _proxy(function(init = undefined) {
    this.id = id++;
    this._name = "Collection[" + this.id + "]";
    util_log("new " + this._name);
    if (!init)
        this._items = _proxy([]);
    else
        this._items = _proxy(init);
    this.add = function(a) {
        util_log(this._name + ".add(" + a + ")");
        this._items[this._items.length] = a;
    }
    this.toString = function() {
        return this._name;
    }
});
Collection.toString = () => {
    return "Collection";
}
Collection.toJSON = () => {
    return "Collection";
}

Enumerator = _proxy(function(a) {
    this.id = id++;
    this._enum = a;
    this._index = 0;
    this._name = "Enumerator[" + this.id + "]";
    util_log("new " + this._name + " for " + _truncateOutput(_inspect(a)));
    this.atend = function() {
        var r = (this._index === this._enum.length);
        //util_log(this._name + ".atEnd() => "+ r);
        return r;
    };
    this.movenext = function() {
        this._index++;
    };
    this.item = function() {
        var ret = this._enum[this._index];
        let n = this._name + ".item(" + this._index + ")";
        util_log(n + " => " + _truncateOutput(_inspect(ret)));
        if (typeof ret === 'object')
            ret = _proxy(ret, true, n)
        return ret;
    }
});
Enumerator.toString = () => {
    return "Enumerator";
}
Enumerator.toJSON = () => {
    return "Enumerator";
}
Enumerator.prototype.toString = function() {
    return this._name;
}

WshArguments = function(init = undefined) {
    this.id = id++;
    this._name = "WshArguments[" + this.id + "]";
    util_log("new " + this._name);
    if (!init)
        this._args = _proxy([]);
    else
        this._args = _proxy(init);
    this.add = function(a) {
        util_log(this._name + ".add(" + a + ")");
        this._args[this._args.length] = a;
    }
    this.item = function(a) {
        if (!a)
            a = 0;
        util_log(this._name + ".Item(" + a + ")");
        return this._args[a];
    }
    this.items = function() {
        util_log(this._name + ".Items()");
        return this._args;
    }
    this.length = function() {
        util_log(this._name + ".Length()");
        return this._args.length;
    }
    Object.defineProperty(this, "args", {
        get: function() {
            util_log(this._name + "." + name + ".get() => (" + typeof this._args + ") '" + _truncateOutput(this._args) + "'");
            return this[intvar];
        },
        set: function(v) {
            util_log(this._name + "." + name + " = (" + typeof v + ") '" + _truncateOutput(v) + "'");
            this._args = _proxy(v);
        }
    })
}
WshArguments.toString = () => {
    return "WshArguments"
}

WScript = _proxy(new function() {
    this._name = "WScript";
    util_log("new " + this._name);
    this.createobject = function(a) {
        util_log(this._name + ".CreateObject(" + a + ")");
        return create_object(a);
    };
    this.sleep = function(a) {
        util_log(this._name + ".Sleep(" + a + ")");
        var waitTill = new Date(new Date().getTime() + a);
        while (waitTill > new Date()) {}
    };
    this.echo = function(a) {
        util_log(this._name + ".Echo(" + a + ")");
    };
    this.quit = function(a) {
        util_log(this._name + ".Quit(" + a + ")");
        throw new Error(this._name + ".Quit() called .... exiting.");
    };
    //ScriptFullName: _script_name,
    this.toString = function() {
        return "Windows Script Host";
    };
    this.toJSON = function() {
        return this.toString();
    }
    _defineSingleProperty(this, "scriptfullname");
    this.scriptfullname = "ScriptNameNotSet";
    _defineSingleProperty(this, "version");
    this.version = "5.812";
    _defineSingleProperty(this, "arguments");
    this.arguments = _proxy(new WshArguments());
})

var create_object = function(a) {
    var ret = null;
    a = a.toLowerCase();
    if (a.startsWith("winhttp.winhttprequest") ||
        a.startsWith("msxml2.serverxmlhttp")) {
        ret = _proxy(new MSXML2_XMLHTTP());
    } else if (a.startsWith("msxml2.domdocument")) {
        ret = _proxy(new Msxml2_DOMDocument_6_0());
    } else {
        switch (a) {
            case "shell.application":
                ret = _proxy(new Shell_Application());
                break;
            case "scripting.filesystemobject":
                ret = _proxy(new FileSystemObject());
                break;
            case "wscript.shell":
                ret = _proxy(new WScript_Shell());
                break;
            case "wscript.network":
                ret = _proxy(new WScript_Network());
                break;
            case "adodb.stream":
                ret = _proxy(new ADODB_Stream());
                break;
            case "adodb.recordset":
                ret = _proxy(new ADODB_Recordset());
                break;
            case "msxml2.xmlhttp":
                ret = _proxy(new MSXML2_XMLHTTP());
                break;
            case "scripting.dictionary":
                ret = _proxy(new Scripting_Dictionary());
                break;
            case "msscriptcontrol.scriptcontrol":
                ret = _proxy(new MSScriptControl_ScriptControl());
                break;
            default:
                util_log(">>> FIXME: WScript.CreateObject: type '" + a + "' not handled");
                ret = null;
                throw new TypeError("WScript.CreateObject: Could not locate automation class named " + a);
                break;
        }
    }
    _wscript_objects[_wscript_objects.length] = ret;
    return ret;
}
create_object.toString = () => {
    return "create_object"
}

GetObject = function(a, b) {
    util_log("GetObject(" + a + ", " + b + ")");
    return _proxy(new AutomationObject(a, b));
}
GetObject.toString = () => {
    return "GetObject"
}

WSH = WScript;

AutomationObject = function(a, b) {
    this.id = id++;
    this._name = "AutomationObject[" + this.id + "](" + a + ", " + b + ")";
    util_log("new " + this._name);
    this.execquery = function() {
        var a = Array.prototype.slice.call(arguments, 0).join(",");
        util_log(this._name + ".ExecQuery(" + a + ")");
        if (arguments[0].toUpperCase() === "SELECT * FROM WIN32_OPERATINGSYSTEM") {
            var ret = [{
                "BOOTDEVICE": "\\Device\\HarddiskVolume1",
                "BUILDNUMBER": "14393",
                "BUILDTYPE": "Multiprocessor Free",
                "CAPTION": "Microsoft Windows 10 Pro",
                "CODESET": "1250",
                "COUNTRYCODE": "420",
                "CREATIONCLASSNAME": "Win32_OperatingSystem",
                "CSCREATIONCLASSNAME": "Win32_ComputerSystem",
                "CSDVERSION": "null",
                "CSNAME": "CARBON",
                "CURRENTTIMEZONE": "60",
                "DATAEXECUTIONPREVENTION_32BITAPPLICATIONS": "true",
                "DATAEXECUTIONPREVENTION_AVAILABLE": "true",
                "DATAEXECUTIONPREVENTION_DRIVERS": "true",
                "DATAEXECUTIONPREVENTION_SUPPORTPOLICY": "2",
                "DEBUG": "false",
                "DESCRIPTION": "Carbon",
                "DISTRIBUTED": "false",
                "ENCRYPTIONLEVEL": "256",
                "FOREGROUNDAPPLICATIONBOOST": "2",
                "FREEPHYSICALMEMORY": "4095708",
                "FREESPACEINPAGINGFILES": "1192496",
                "FREEVIRTUALMEMORY": "4011584",
                "INSTALLDATE": "9/4/2016 03:00:28",
                "LARGESYSTEMCACHE": "null",
                "LASTBOOTUPTIME": "10/30/2016 00:06:03",
                "LOCALDATETIME": "11/1/2016 00:30:15",
                "LOCALE": "0405",
                "MANUFACTURER": "Microsoft Corporation",
                "MAXNUMBEROFPROCESSES": "-1",
                "MAXPROCESSMEMORYSIZE": "137438953344",
                "NAME": "Microsoft Windows 10 Pro|C:\\WINDOWS|\\Device\\Harddisk0\\Partition2",
                "NUMBEROFLICENSEDUSERS": "null",
                "NUMBEROFPROCESSES": "153",
                "NUMBEROFUSERS": "2",
                "ORGANIZATION": "",
                "OSLanguage": "0409",
                /* "1033", */
                "OSPRODUCTSUITE": "256",
                "OSTYPE": "18",
                "OTHERTYPEDESCRIPTION": "null",
                "PLUSPRODUCTID": "null",
                "PLUSVERSIONNUMBER": "null",
                "PRIMARY": "true",
                "PRODUCTTYPE": "1",
                "QUANTUMLENGTH": "undefined",
                "QUANTUMTYPE": "undefined",
                "REGISTEREDUSER": "Uzivatel",
                "SERIALNUMBER": "00330-80000-00000-AA676",
                "SERVICEPACKMAJORVERSION": "0",
                "SERVICEPACKMINORVERSION": "0",
                "SIZESTOREDINPAGINGFILES": "1245184",
                "STATUS": "OK",
                "SUITEMASK": "272",
                "SYSTEMDEVICE": "\\Device\\HarddiskVolume2",
                "SYSTEMDIRECTORY": "C:\\WINDOWS\\system32",
                "SYSTEMDRIVE": "C:",
                "TOTALSWAPSPACESIZE": "null",
                "TOTALVIRTUALMEMORYSIZE": "9306340",
                "TOTALVISIBLEMEMORYSIZE": "8061156",
                "version": "10.0.14393",
                "windowsdirectory": "C:\\WINDOWS"
            }];
            return ret;
        }
    }
}
AutomationObject.toString = () => {
    return "AutomationObject";
}

MSScriptControl_ScriptControl = function() {
    this.id = id++;
    this._name = "MSScriptControl.ScriptControl[" + this.id + "]";
    util_log("new " + this._name);
    _defineSingleProperty(this, "Language");
    _defineSingleProperty(this, "Timeout");
    this.addcode = function(a) {
        util_log(this._name + ".AddCode(" + a + ")");
    }
    this.addobject = function(a, b) {
        util_log(this._name + ".AddObject(" + a + ", " + b + ")");
    }
}
MSScriptControl_ScriptControl.toString = () => {
    return "MSScriptControl_ScriptControl"
}

Scripting_Dictionary = function() {
    this.id = id++;
    this._name = "Scripting.Dictionary[" + this.id + "]";
    util_log("new " + this._name);
    this._dict = {};
    this.add = function(a, b) {
        util_log(this._name + ".add(" + a + ", " + b + ")");
        this._dict[a] = b;
    }
    this.item = function(a) {
        if (!a)
            a = 0;
        util_log(this._name + ".Item(" + a + ")");
        return this._dict[a];
    }
    this.items = function() {
        util_log(this._name + ".Item()");
        return this._dict;
    }
}
Scripting_Dictionary.toString = () => {
    return "Scripting_Dictionary"
}

ActiveXObject = function(a) {
    util_log("ActiveXObject(" + a + ")");
    return create_object(a);
};
ActiveXObject.toString = () => {
    return "ActiveXObject"
}

Shell_Application = function() {
    this.id = id++;
    this._name = "Shell.Application[" + this.id + "]";
    util_log("new " + this._name);
    this.toString = function() {
        return this._name;
    }
    var nms = {
        0: "C:\\Users\\User\\Desktop",
        1: "::{871C5380-42A0-1069-A2EA-08002B30309D}",
        2: "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs",
        3: "::{26EE0668-A00A-44D7-9371-BEB064C98683}\\0",
        4: "::{21EC2020-3AEA-1069-A2DD-08002B30309D}\\::{2227A280-3AEA-1069-A2DE-08002B30309D}",
        5: "C:\\Users\\User\\Documents",
        6: "C:\\Users\\User\\Favorites",
        7: "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup",
        8: "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Recent",
        9: "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\SendTo",
        10: "::{645FF040-5081-101B-9F08-00AA002F954E}",
        11: "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu",
        13: "C:\\Users\\User\\Music",
        14: "C:\\Users\\User\\Videos",
        16: "C:\\Users\\User\\Desktop",
        17: "::{20D04FE0-3AEA-1069-A2D8-08002B30309D}",
        18: "::{F02C1A0D-BE21-4350-88B0-7367FC96EF3C}",
        19: "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Network Shortcuts",
        20: "C:\\Windows\\Fonts",
        21: "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Templates",
        22: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu",
        23: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs",
        24: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp",
        25: "C:\\Users\\Public\\Desktop",
        26: "C:\\Users\\User\\AppData\\Roaming",
        27: "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Printer Shortcuts",
        28: "C:\\Users\\User\\AppData\\Local",
        29: "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup",
        30: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp",
        31: "C:\\Users\\User\\Favorites",
        32: "C:\\Users\\User\\AppData\\Local\\Microsoft\\Windows\\INetCache",
        33: "C:\\Users\\User\\AppData\\Local\\Microsoft\\Windows\\INetCookies",
        34: "C:\\Users\\User\\AppData\\Local\\Microsoft\\Windows\\History",
        35: "C:\\ProgramData",
        36: "C:\\Windows",
        37: "C:\\Windows\\System32",
        38: "C:\\Program Files",
        39: "C:\\Users\\User\\Pictures",
        40: "C:\\Users\\User",
        41: "C:\\Windows\\SysWOW64",
        42: "C:\\Program Files (x86)",
        43: "C:\\Program Files\\Common Files",
        44: "C:\\Program Files (x86)\\Common Files",
        45: "C:\\ProgramData\\Microsoft\\Windows\\Templates",
        46: "C:\\Users\\Public\\Documents",
        47: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Administrative Tools",
        48: "C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Administrative Tools",
        49: "::{21EC2020-3AEA-1069-A2DD-08002B30309D}\\::{7007ACC7-3202-11D1-AAD2-00805FC1270E}",
        53: "C:\\Users\\Public\\Music",
        54: "C:\\Users\\Public\\Pictures",
        55: "C:\\Users\\Public\\Videos",
        56: "C:\\Windows\\Resources",
        58: "C:\\ProgramData\\OEM Links",
        59: "C:\\Users\\User\\AppData\\Local\\Microsoft\\Windows\\Burn\\Burn",
        61: "::{F02C1A0D-BE21-4350-88B0-7367FC96EF3C}"

    }
    this.namespace = function(a) {
        var ret;
        if (typeof a === "string") {
            ret = _proxy(new Folder2(a));
        } else {
            if (a in nms) {
                ret = _proxy(new Folder2(nms[a]));
            } else {
                ret = null
            }
        }
        util_log(this._name + ".Namespace(" + a + ") => " + ret);
        return ret;
    }
    this.shellexecute = function() {
        a = _truncateOutput(Array.prototype.slice.call(arguments, 0).join(","));
        util_log(this._name + ".ShellExecute(" + a + ")");
    }
}
Shell_Application.toString = () => {
    return "Shell_Application"
}


Process = function(d) {
    this.id = id++;
    this._name = "Process[" + this.id + "](" + d + ")";
    util_log("new " + this._name);
    _defineSingleProperty(this, "processid");
    _defineSingleProperty(this, "exitcode");
    _defineSingleProperty(this, "status");
    _defineSingleProperty(this, "stdout");
    _defineSingleProperty(this, "stdin");
    _defineSingleProperty(this, "stderr");
    this.processid = this.id;
    this.stdout = _proxy(new TextStream());
    this.stderr = _proxy(new TextStream());
    this.stdin = _proxy(new TextStream());
    this.terminate = function() {
        a = _truncateOutput(Array.prototype.slice.call(arguments, 0).join(","));
        util_log(this._name + ".Terminate(" + a + ")");
    }
    this.toString = () => {
        return this._name;
    }
}
Process.toString = () => {
    return "Process";
}

// HKEY_CURRENT_USER  or HKCU
// HKEY_USERS
// HKEY_LOCAL_MACHINE or HKLM
// HKEY_CLASSES_ROOT  or HKCR
// HKEY_CURRENT_CONFIG
var REG = {
    "HKLM\\SOFTWARE\\MICROSOFT\\WINDOWS NT\\CURRENTVERSION\\PRODUCTID": "00330-80000-00000-AA676",
    "HKLM\\SOFTWARE\\MICROSOFT\\WINDOWS NT\\CURRENTVERSION\\SYSTEMROOT" : "c:\\WINDOWS",
    /* Windows 10 64bit */
    "HKLM\\SOFTWARE\\CLASSES\\MIME\\DATABASE\\RFC1766\\1034": "en-us;@%SystemRoot%\system32\mlang.dll,-4386",
    "HKLM\\SOFTWARE\\CLASSES\\MIME\\DATABASE\\RFC1766\\0409": "en-us;@%SystemRoot%\system32\mlang.dll,-4386",
    //"HKEY_CLASSES_ROOT\\HTTP\\SHELL\\OPEN\\COMMAND\\" : "\"C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe\" -osint -url \"%1\"",
    "HKCR\\HTTP\\SHELL\\OPEN\\COMMAND\\": "\"C:\\Chrome\\chrome.exe\" -url \"%1\"",
    "eee": ""
}

WScript_Shell = function() {
    this.id = id++;
    this._name = "WScript.Shell[" + this.id + "]";
    util_log("new " + this._name);
    this.expandenvironmentstrings = function(a) {
        var ret = ENV[a.replace(/%/g, '').toUpperCase()];
        util_log(this._name + ".ExpandEnvironmentStrings(" + a + ") => " + ret);
        return ret;
    };
    this.run = function(a, b, c) {
        util_log(this._name + ".Run(" + a + ", " + b + ", " + c + ")");
    }
    this.exec = function(a) {
        util_log(this._name + ".Exec(" + a + ")");
        return new _proxy(new Process(a));
    }
    var _reg_normalize = function(r) {
        var ret;
        ret = r.replace(/\\+/g, '\\').toUpperCase();
        ret = ret.replace('HKEY_CURRENT_USER', 'HKCU');
        ret = ret.replace('HKEY_LOCAL_MACHINE', 'HKLM');
        ret = ret.replace('HKEY_CLASSES_ROOT', 'HKCR');
        return ret;
    }
    this.regwrite = function(a, b, c) {
        util_log(this._name + ".RegWrite(" + a + ", " + b + ", " + c + ")");
        REG[_reg_normalize(a)] = b;
    }
    this.regread = function(a) {
        var ret = "" + REG[_reg_normalize(a)];
        if (ret === "undefined") {
            util_log("FIXME: " + this._name + ".RegRead(" + a + ") - unknown key");
        }
        util_log(this._name + ".RegRead(" + a + ") => " + ret);
        return ret;
    }
    this.environment = function(a) {
        var ret = WshEnvironment(a);
        util_log(this._name + ".Environment(" + a + ") => " + ret);
        return ret;
    }
    this.specialfolders = function(a) {
        util_log("WScript.SpecialFolders(" + a + ")");
        return a + "/";
    }
    this.createshortcut = function(a) {
        a = _truncateOutput(a);
        util_log("WScript.CreateShortcut(" + a + ")");
        return _proxy(new WshShortcut(a));
    }
    this.popup = function() {
        a = _truncateOutput(Array.prototype.slice.call(arguments, 0).join(","));
        util_log("WScript.Popup(" + a + ")");
        return 1;
        // -1 The user did not click a button before nSecondsToWait seconds elapsed.
        // 1 OK button
        // 2 Cancel button
        // 3 Abort button
        // 4 Retry button
        // 5 Ignore button
        // 6 Yes button
        // 7 No button
        // 10 Try Again button
        // 11 Continue button
    }
    this.toString = this.tostring = function() {
        return this._name;
    }
};
WScript_Shell.toString = () => {
    return "WScript_Shell"
}
Shell = WScript_Shell;

WScript_Network = function() {
    this.id = id++;
    this._name = "WScript.Network[" + this.id + "]";
    util_log("new " + this._name);
    this.toString = this.tostring = function() {
        return this._name;
    }
    _defineSingleProperty(this, "userdomain");
    this.userdomain = "MYDOM";
};
WScript_Network.toString = () => {
    return "WScript_Network"
}

// WshEnvironment(a) where a can be PROCESS, SYSTEM, USER and VOLATILE
// PROCESS     TEMP=C:\DOCUME~1\You\LOCALS~1\Temp
// SYSTEM      TEMP=%SystemRoot%\TEMP
// USER        TEMP=%USERPROFILE%\Local Settings\Temp
// VOLATILE    TEMP=
WshEnvironment = function(a) {
    var _id = id++;
    var _type = a.toUpperCase();
    var _name = "WshEnvironment[" + _id + "](" + _type + ")";
    util_log("new " + _name);
    var _env = {
        "PROCESS": {
            "USERNAME": "MY_USER",
            "COMPUTERNAME": "MY_COMPUTER",
            "SYSTEMDRIVE": "C:\\",
            "SYSTEMROOT": "C:\\WinNT",
            "PATH": "C:\\",
            "USERPROFILE": "C:\\Users\\User1"
        },
        "SYSTEM": {

        },
        "USER": {

        },
        "VOLATILE": {

        }
    }

    function b(x) {
        x = x.toUpperCase();
        var r = x;
        try {
            //r = _env[_type][x];
            r = ENV[x];
        } catch (e) {}
        if (typeof r === "undefined") {
            util_log("FIXME: " + _name + "(" + x + ") undefined variable ");
            r = x;
        }
        util_log(_name + "(" + x + ") => " + r);
        return r;
    }
    b.item = function(x) {
        util_log(_name + ".Item(" + x + ")");
        return "itemvalue";
    }
    return b;
};
WshEnvironment.toString = () => {
    return "WshEnvironment"
}

WshShortcut = function(a) {
    this.id = id++;
    this._link = a;
    this._name = "WshShortcut[" + this.id + "](" + this._link + ")";
    util_log("new " + this._name);
    _defineSingleProperty(this, "arguments");
    _defineSingleProperty(this, "fullname", "_link");
    _defineSingleProperty(this, "targetpath");
    _defineSingleProperty(this, "windowstyle");
    _defineSingleProperty(this, "hotkey");
    _defineSingleProperty(this, "iconlocation");
    _defineSingleProperty(this, "description");
    _defineSingleProperty(this, "workingdirectory");
    this.save = function() {
            util_log(this._name + ".save()");
        }
        //this[Symbol.unscopables] = _proxy({})
};
WshShortcut.toString = () => {
    return "WshShortcut"
}

ADODB_Stream = function() {
    this.id = id++;
    this._name = "ADODB_Stream[" + this.id + "]";
    util_log("new " + this._name);

    //_trace("ADOBE");

    this.open = function() {
        util_log(this._name + ".Open()");
    }
    this._type = 2;
    this._position = 0;
    this._size = 0;
    this._content = '';
    this._charset = undefined;
    this.tostring = this.toString = () => {
        return this._name /*JSON.stringify(this)*/
    }

    this.write = function(a) {
        this.content = a;
        if (typeof a === 'undefined')
            util_log(this._name + ".Write(undefined) - Error ?");
        else {
            util_log(this._name + ".Write(str) - " + a.length + " bytes");
            this.size = a.length
        }
    }
    this.writetext = function(a) {
        var encoding = 'binary'
        if (typeof a === 'undefined')
            util_log(this._name + ".WriteText(undefined) - Error ?");
        else {
            if (this.type == 2 && typeof this.charset !== 'undefined') {
                this.content = _iconv.encode(a, this.charset);
                encoding = this.charset;
            } else {
                this.content = a;
            }
            util_log(this._name + ".WriteText(str) - " + a.length + " bytes, encoding: " + encoding);
            this.size = this.content.length
        }
    }
    this.savetofile = function(a, b) {
        util_log(this._name + ".SaveToFile(" + a + ", " + b + ")");
        _wscript_saved_files[a] = this.content;
    }
    this.loadfromfile = function(a) {
            var encoding = 'binary';
            //util_log(this._name + ".LoadFromFile(" + a + ")");
            if (this.type == 2 && typeof this.charset !== 'undefined') {
                //util_log("here");
                this.content = _iconv.decode(_wscript_saved_files[a], this.charset);
                encoding = this.charset;
            } else {
                this.content = _wscript_saved_files[a];
            }
            util_log(this._name + ".LoadFromFile(" + a + ") " + this.content.length + " bytes, encoding: " + encoding);
            this.Position = 0;
        }
        // adReadAll -1 Default. Reads all bytes from the stream, from the current position onwards to the EOS marker.
        // This is the only valid StreamReadEnum value with binary streams (Type is adTypeBinary).
        // adReadLine -2 Reads the next line from the stream (designated by the LineSeparator property).
    this.readtext = function(a) {
        util_log(this._name + ".ReadText(" + a + ")");
        if (typeof a === "undefined" || a == adReadAll) {
            return this.content;
        } else if (a == adReadLine) {
            throw new Error("FIXME: " + this._name + ".ReadText(" + a + ") not implemented.");
        } else if (a > 0) {
            return this.content.slice(this.Position, this.Position + a);
        } else {
            return this.content;
        }
    }
    this.read = function(a) {
        util_log(this._name + ".Read(" + a + ")");
        if (typeof a === "undefined" || a == adReadAll) {
            return this.content;
        } else if (a == adReadLine) {
            throw new Error("FIXME: " + this._name + ".Read(" + a + ") not implemented.");
        } else if (a > 0) {
            return this.content.slice(this.Position, this.Position + a);
        } else {
            return this.content;
        }
    }
    this.close = function() {
        util_log(this._name + ".Close()");
    }
    _defineSingleProperty(this, "charset", "_charset");
    //_defineSingleProperty(this, "readtext", "_content");
    //_defineSingleProperty(this, "read", "_content");
    _defineSingleProperty(this, "content", "_content");
    // adTypeBinary 1 Indicates binary data.
    // adTypeText 2 Default. Indicates text data, which is in the character set specified by Charset.
    _defineSingleProperty(this, "type", "_type");
    _defineSingleProperty(this, "position", "_position");
    _defineSingleProperty(this, "size", "_size");
};
//ADODB_Stream.prototype = Object.create(Object.prototype);
//ADODB_Stream.prototype.constructor = ADODB_Stream;

// http://www.dofactory.com/tutorial/javascript-function-objects
ADODB_Recordset = function() {
    this.id = id++;
    this._name = "ADODB_Recordset[" + this.id + "]";
    var father = this;
    util_log("new " + this._name);
    this.toString = this.tostring = () => {
        return this._name
    }
    this.close = function() {
        util_log(this._name + ".Close()");
    }
    this.open = function() {
        let a = _truncateOutput(Array.prototype.slice.call(arguments, 0).join(","));
        util_log(this._name + ".Open(" + a + ")");
    }
    this.addnew = function() {
        let a = _truncateOutput(Array.prototype.slice.call(arguments, 0).join(","));
        util_log(this._name + ".AddNew(" + a + ")");
        return {};
    }
    _defineSingleProperty(this, "fields");
    this.fields = _proxy({
        "_name": father._name + ".Fields",
        "resync": function() {
            let a = _truncateOutput(Array.prototype.slice.call(arguments, 0).join(","));
            util_log(this._name + ".Resync(" + a + ")");
        },
        "append": function() {
            let fds = Array.prototype.slice.call(arguments, 0);
            let a = _truncateOutput(fds.join(","));
            util_log(this._name + ".Append(" + a + ")");
            for (let i = 0; i < fds.length; i++) {
                _defineSingleProperty(father, fds[i]);
            }
        },
        "toString": () => {
            return father._name + ".Fields";
        }
    });
}
ADODB_Recordset.toString = ADODB_Recordset.toJSON = () => {
    return "ADODB_Recordset"
}

Msxml2_DOMDocument_6_0 = function() {
    this.id = id++;
    this._name = "Msxml2.DOMDocument.6.0[" + this.id + "]";
    util_log("new " + this._name);
    this.createelement = function(a) {
        util_log(this._name + ".createElement(" + a + ")");
        return new Element(a);
    }
};
Msxml2_DOMDocument_6_0.toString = () => {
    return "Msxml2_DOMDocument_6_0"
}

MSXML2_XMLHTTP = function() {
    this.id = id++;
    this._name = "MSXML2.XMLHTTP[" + this.id + "]";
    util_log("new " + this._name);
    var self = this;
    this._status = 0;
    this._headers = {};
    this.toString = this.tostring = () => {
        return this._name
    }

    _defineSingleProperty(this, "allresponseheaders");

    this.open = function(m, u, a) {
        u = u.replace(/\r|\n/g, "");
        util_log(this._name + ".open(" + m + "," + u + "," + a + ")");
        this.method = m;
        this.url = u;
        switch (("" + a).toLowerCase()) {
            case "false":
            case "no":
            case "0":
            case "":
            case "undefined":
            case null:
                this.async = false;
                break;
            default:
                this.async = true;
        }
        _wscript_urls[_wscript_urls.length] = u;
    }
    this.close = function() {
        util_log(this._name + ".close()");
    }
    this.getallresponseheaders = function() {
        var ret = this.allresponseheaders;
        util_log(this._name + ".getAllResponseHeaders() => " + _inspect(ret));
        return ret;
    }
    this.send = function(a) {
        util_log(this._name + ".send(" + a + ")");
        if (typeof _download !== 'undefined' && _download) {
            try {
                var res = _sync_request(this.method, this.url, {
                    'headers': this._headers
                });
                //util_log("Sync_req: " + _truncateOutput(res.getBody()));
                this.status = res.statusCode || 0;
                this.readystate = 4;
                this.statustext = "OK";
                this.responsebody = res.body || "";
                this.allresponseheaders = JSON.stringify(res.headers) || "";
            } catch (err) {
                util_log(this._name + ".send() Exception: " + _truncateOutput(_inspect(err)));
                this.status = err.statusCode || 0;
                this.readystate = 4;
                this.statustext = err.toString();
                this.responsebody = err.body || "";
                this.allresponseheaders = JSON.stringify(err.headers) || "";
            }
            if (this.onreadystatechange) {
                util_log(this._name + ".onreadystatechange()");
                this.onreadystatechange();
            }
            return;
        } else {
            util_log(this._name + " Not sending data, if you want to interact with remote server, set --down");
            var s = 'MZ'
            for (var ii = 0; ii < 200; ii++) {
                s += 'Dumy conntent, use --down to download the real payload.\n';
            }
            this.responsebody = s;
            this.status = 200;
            this.readystate = 4;
            if (this.onreadystatechange) {
                util_log(this._name + " Calling onreadystatechange() with dummy data");
                this.onreadystatechange();
            }
        }
        util_log(this._name + ".send(" + a + ") finished");
    }
    this.setrequestheader = function(a, b) {
        util_log(this._name + ".setRequestHeader(" + a + ", " + b + ")");
        this._headers[a] = b;
    }
    this.setoption = function() {
        a = _truncateOutput(Array.prototype.slice.call(arguments, 0).join(","));
        util_log(this._name + ".setOption(" + a + ")");
    }
    this._responseBody = [];
    _defineSingleProperty(this, "responsebody", "_responseBody");
    _defineSingleProperty(this, "url");
    _defineSingleProperty(this, "method");
    _defineSingleProperty(this, "status", "_status");
    _defineSingleProperty(this, "async");
    _defineSingleProperty(this, "readystate");
    _defineSingleProperty(this, "statustext");
    _defineSingleProperty(this, "onreadystatechange");
    this.onreadystatechange = undefined;
    Object.defineProperty(this, "responsetext", {
        get: function() {
            var ret = "" + this._responseBody;
            util_log(this._name + ".ResponseText.get() => (" + typeof ret + ") '" + _truncateOutput(ret) + "'");
            return ret;
        },
        set: function(v) {
            util_log(this._name + ".ResponseText = (" + typeof v + ") '" + _truncateOutput(v) + "'");
            this.responseBody = v;
        }
    });

}
MSXML2_XMLHTTP.toString = () => {
    return "MSXML2_XMLHTTP"
}

Style = _proxy(function() {
    this._id = id++;
    this._name = "Style[" + this._id + "]";
    util_log("new " + this._name + "()");
    this._attributes = {
        "visibility": true,
        "left": 0,
        "top": 0,
        "position": "",
        "stylesheet": {
            cssText: ""
        }
    };
    this.toString = this.tostring = () => {
        return this._name;
    }

    for (var k in this._attributes) {
        _defineProperty(this, k, this._attributes);
    }

});
Style.prototype = Object.create(Object.prototype);
Style.prototype.constructor = Style;
Style.toString = Style.toJSON = () => {
    return "Style"
}

Node = _proxy(function() {
    this._id = id++;
    this._name = "Node[" + this._id + "]";
    util_log("new " + this._name + "()");
    _defineSingleProperty(this, "nodename", "_nodename");
})
Node.prototype = Object.create(Object.prototype);
Node.prototype.constructor = Node;
Node.toString = Node.toJSON = () => {
    return "Node"
}


Element = _proxy(function(n) {
    Node.call(this);
    this._name = "Element[" + this._id + "]<" + n + ">";
    util_log("new " + this._name);
    this._innerHTML = "";
    this._outerHTML = "";
    this._text = "";
    this._children = [];
    this._attributes = [];
    _defineSingleProperty(this, "tagname", "_nodename");
    _defineSingleProperty(this, "elementname", "_nodename");
    _defineSingleProperty(this, "class");
    _defineSingleProperty(this, "_vgRuntimeStyle");
    this.tagname = n;
    this.toString = function() {
        return this._name;
    }
    this.appendchild = function(e) {
        util_log(this._name + ".appendChild(" + e._name + ")");
        if (this._children.length == 0) {
            this.firstChild = e;
        }
        this._children[this._children.length] = e;
        e.parentNode = this;
        e.parentelement = this;
        return e;
    }
    this.removechild = function(e) {
        util_log(this._name + ".removeChild(" + e._name + ") - dummy");
        return e;
    }
    this.setattribute = function(n, v) {
        util_log(this._name + ".setAttribute(" + n + ", " + v + ")");
        this._attributes[n] = v;
    }
    Object.defineProperty(this, "nodetypedvalue", {
            get: function() {
                util_log(this._name + ".nodeTypedValue");
                if (this.dataType == "bin.base64") {
                    //return new Buffer(this.text, 'base64').toString('binary');
                    return Base64.decode(this._text);
                } else {
                    return this._text;
                }
            }
        })
        //Object.defineProperty(this, "innerHTML", {
        //    get: function() {
        //        util_log(this._name + ".innerHTML returns '"+this._innerHTML+"'");
        //        return this._innerHTML;
        //    },
        //    set: function(v) {
        //        util_log(this._name + ".innerHTML = '"+v+"'");
        //        this._innerHTML = _decodeHTML(v);
        //    }
        //})
    _defineSingleProperty(this, "firstchild");
    _defineSingleProperty(this, "parentelement");
    _defineSingleProperty(this, "parentnode");
    _defineSingleProperty(this, "innerhtml", "_innerHTML");
    _defineSingleProperty(this, "innertext", "_innerHTML");
    _defineSingleProperty(this, "outerhtml", "_outerHTML");
    _defineSingleProperty(this, "style", "_style");
    _defineSingleProperty(this, "text", "_text");
    _defineSingleProperty(this, "id", "_id");
    this.style = new Style();
});
Element.prototype = Object.create(Node.prototype);
Element.prototype.constructor = Element;
Element.toString = Element.toJSON = () => {
    return "Element"
}


HTMLElement = _proxy(function(n) {
    Element.call(this, n);
    this._name = "HTMLElement[" + this._id + "]";
    util_log("new " + this._name + "(" + n + ")");
});
HTMLElement.prototype = Object.create(Element.prototype);
HTMLElement.prototype.constructor = HTMLElement;
HTMLElement.toString = HTMLElement.toJSON = () => {
    return "HTMLElement"
}

HTMLIFrameElement = _proxy(function() {
    util_log("new HTMLIFrameElement() start");
    HTMLElement.call(this, "iframe");
    this._name = "HTMLIFrameElement[" + this._id + "]";
    util_log("new " + this._name + "()");
    this.contentdocument = new Document();
    this.contentwindow = {
        document: this.contentDocument
    }
    util_log("new HTMLIFrameElement() end");
})
HTMLIFrameElement.prototype = Object.create(HTMLElement.prototype);
HTMLIFrameElement.prototype.constructor = HTMLIFrameElement;
HTMLIFrameElement.toString = HTMLIFrameElement.toJSON = () => {
    return "HTMLIFrameElement"
}
