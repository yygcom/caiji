// ==UserScript==
// @name         百度m抓
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://music.baidu.com/*
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var $$ = jQuery.noConflict();
    var domain = 'http://musice.baidu.com/';
    var postdomain = 'music.baidu.com';
    var serv = '172.20.3.194:3000';
    var servs = '172.20.3.194:3001';

    var download = function(){
        $$('#outdiv').css({'width':'500px','height':'500px'});
        var pid = $$('input[name="item_id"]').val();
        $$('#J_UlThumb img').each(function(idx,obj){
            var imgurl = $$(obj).attr("src").replace(/\/\//,'https://').replace(/_\d+x\d+.*/,'');
            console.log(imgurl);

            $$('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">图片<img width="35" height="45" src="' +imgurl+'"/>已经加入下载进程，请注意查看<div>');

            $$.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pid},function(result){
                //no
                console.log(result);
            });
        });

        $$('.J_TSaleProp a').each(function(idx,obj){
            var testxx = $$(obj).attr('style');
            if(testxx !== undefined){
                var imgurl = testxx.replace(/background:url\(/,'https:').replace(/_\d+x\d+.*/,'');
                console.log(imgurl);
                $$('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">图片<img width="35" height="45" src="' +imgurl+'"/>已经加入下载进程，请注意查看<div>');
                $$.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pid},function(result){
                    console.log(result);
                });
            }
        });

    };

    var showdown =function(){
        $$('.icon-play').each(function(idx,obj){
            var musid = JSON.parse($$(obj).parent().attr('data-musicicon')).id;
            $$('<a class="list-micon yyy999 icon-download" title="下载音乐" id="dx'+musid+'"></a>').insertAfter($$(obj));
            $$.get("http://music.baidu.com/data/music/fmlink?songIds="+musid+"&type=mp3",function(result){
                var tmpjs = JSON.parse(result);
                //console.log(tmpjs);
                $$('#dx'+tmpjs.data.songList[0].songId).attr('href',tmpjs.data.songList[0].songLink);
            });
            console.log();
        });
    };

    showdown();

    $('.page-navigator-number').click(function(){
        showdown();
    });
    // Your code here...
})();
