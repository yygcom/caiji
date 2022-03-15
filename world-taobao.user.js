// ==UserScript==
// @name         world-taobao
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://world.taobao.com/item/*
// @icon         https://www.google.com/s2/favicons?domain=taobao.com
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==
    var $$ = jQuery.noConflict();
(function() {
    'use strict';

    var autod = true;

    var domain = 'http://world.taobao.com/';
    var postdomain = 'world.taobao.com';
    var serv = '172.20.3.194:3000';
    var servs = '172.20.3.194:3001';


    $$('body').append('<div id="outdiv" style="border:solid 1px #ccc;background:#eaeaea;padding: 10px;position: absolute;top: 0;right: 0;width: 400px;height: 170px;overflow-y: scroll;z-index:200000001;"></div>');

    $$('#outdiv').append('<div style="height:30px;"><span style="cursor:pointer; border:solid 1px #ccc;background-color:#bababa;color:red;padding:10px;margin-right:10px;" id="getvedio">视频 </span> <a style="border:solid 1px #ccc;background-color:#999;color:#fff;padding:10px;;" id="showhand" href="http://'+serv+'/yaaw" target="_blank">查看下载进程</a></div>');
    $$('#outdiv').append('<div style="height:36px;">位置 <pre>\\\\172.20.3.194\\wwwroot\\caiji\\images\\ </pre></div>');

    $$('#dlhandx').click(function(){
        //download();
        ckst();
    });

    $$(document).on('click','#getvedio',function(){
        ckst();
    });

    var download = function(){
        $$('outdiv').css('width', '500px').css('height', '300px');
        var pid = document.location.href.match(/(\d*?)\.htm/)[1];

        var imgurl = $$('video').attr('src');

        $$.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pid},function(result){
                    console.log(result);
            $$('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">' +imgurl+'已经加入下载进程，请注意查看<div>');
        });
    }

    var ckst = function(){
        //$$.get('https://172.20.3.194:3001/test?t='+Math.rand(),function(data){

        //});
        $$.get('https://172.20.3.194:3001/test?t='+Math.random(), function(data){
            //console.log('ok');
            download();
        }).fail(function() {
            alert('请在打开的页面中确认后，再重新采集');
            window.open('https://172.20.3.194:3001');
            //alert('woops'); // or whatever
        });
    }

    var initx = function(){
        var autodownload = document.location.href.match(/htm\?(autodvx)=1/)[1];
        var pid = document.location.href.match(/(\d*?)\.htm/)[1];
        if(autodownload == 'autodvx'){
            history.pushState( null, null, 'https://world.taobao.com/item/'+pid+'.htm');
            ckst();
        }
    }

    initx();

    // Your code here...
})();