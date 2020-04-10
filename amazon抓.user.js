// ==UserScript==
// @name         amazon抓
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  try to take over the world!
// @author       You
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @match        https://www.amazon.co.jp/*
// @grant        none
// ==/UserScript==

var $$ = $;//jQuery.noConflict();
(function() {
    'use strict';

    //var domain = 'https://amazon.co.jp/';
    var postdomain = 'amazon';
    var serv = '172.20.3.194:3000';
    var servs = '172.20.3.194:3001';

    var download = function(){
        $$('#outdiv').css({'width':'500px','height':'500px'});
        var pid = document.location.href.match(/dp(.*)/)[1].replace('/','').replace('/','');
        console.log(pid);

        var aaa = $$('html')[0].textContent;
        //console.log(aaa);
        var bbb = aaa.match(/colorImages.*/);
        var ccc = bbb[0].match(/"hiRes":"(.*?)"/g);

        for(var ni = 0; ni<ccc.length;ni++){
            var imgurl = ccc[ni].match(/"hiRes":"(.*?)"/)[1];
            //console.log(imgurl);

            $$('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">图片<img width="35" height="45" src="' +imgurl+'"/>已经加入下载进程，请注意查看<div>');

            $$.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pid},function(result){
                    console.log(result);
            });
        }

        //console.log(ccc);

    };

    $$('body').append('<div id="outdiv" style="border:solid 1px #ccc;background:#eaeaea;padding: 10px;position: absolute;top: 0;right: 0;width: 500px;height: 70px;overflow-y: scroll;z-index:200000001;"></div>');

    $$('#outdiv').append('<div style="height:30px;"><span style="cursor:pointer; border:solid 1px #ccc;background-color:#bababa;color:red;padding:10px;margin-right:10px;" id="getvedio">视频 </span> <span style="cursor:pointer; border:solid 1px #ccc;background-color:#bababa;color:red;padding:10px;margin-right:10px;" id="dlhand">下载此产品的图片</span> <a style="border:solid 1px #ccc;background-color:#999;color:#fff;padding:10px;;" id="showhand" href="http://'+serv+'/yaaw" target="_blank">查看下载进程</a></div>');
    $$('#outdiv').append('<div style="height:20px;">图片位置 <pre>\\\\172.20.3.194\\wwwroot\\caiji\\images\\ </pre></div>');

    $$('#dlhand').click(function(){
        download();
    });

    // Your code here...
})();
