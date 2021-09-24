// ==UserScript==
// @name         1688抓
// @namespace    http://tampermonkey.net/
// @version      0.2.5
// @description  try to take over the world!
// @author       You
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @match        http://detail.1688.com/offer/*.html*
// @match        https://detail.1688.com/offer/*.html*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var $$ = jQuery.noConflict();

    var domain = 'http://www.1688.com/';
    var postdomain = '1688.com';
    var serv = '172.20.3.194:3000';
    var servs = '172.20.3.194:3001';

    var download = function(){
        $$('#outdiv').css({'width':'500px','height':'500px'});
        //var pid = $$('input[name="item_id"]').val();
        var pid = $$('meta[name="b2c_auction"]').attr('content');
        $$('.tab-content-container li').each(function(idx,obj){
            if(typeof($$(obj).attr("data-imgs"))!="undefined"){
                var imgurldata = JSON.parse($$(obj).attr("data-imgs"));
                var imgurl = imgurldata.original;
                console.log(imgurl);

                $$('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">图片<img width="35" height="45" src="' +imgurl+'"/>已经加入下载进程，请注意查看<div>');

                $$.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pid},function(result){
                    //no
                    console.log(result);
                });
            }
        });

    };

    var descx = function(){
        $$('#outdesc').remove();
        $$('body').append('<div id="outdesc" style="border:solid 1px #ccc;background:#eaeaea;padding: 10px;position: fixed;top: 0;left: 0;width: 660px;height: 470px;overflow-y: scroll;z-index:200000002;"></div>');

        var pid = $$('meta[name="b2c_auction"]').attr('content');
        var dimgs = $$('#desc-lazyload-container').html().match(/<img.*?>/g);

        if(dimgs == null){
            var hhh = $$(document).height()-$$(window).height();
            $$(document).scrollTop(hhh);
            setTimeout(function(){
                descx();
                $$(document).scrollTop(0);
            },12);
        }
        for(var ix in dimgs){
            //console.log(dimgs[ix]);
            //console.log($$(dimgs[ix]).attr('src'));
            if($$(dimgs[ix]).attr("src")!= undefined){
                //console.log($$(dimgs[ix]).attr('src'));
                var imgurl = $$(dimgs[ix]).attr('src');
                var imgurllazy = $$(dimgs[ix]).attr('data-lazyload-src');
                imgurl = imgurllazy != '' && imgurllazy != undefined ? imgurllazy : imgurl;
                imgurl = imgurl.substring(0,2) == '//' ? imgurl.replace('//','https://') : imgurl;
                $$('#outdesc').append('<img width="135" height="145" style="float:left;margin-right:5px;" src="' +imgurl+'"/><div>');

                $$.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pid,xdir:'descdir'},function(result){
                    //no
                    console.log(result);
                });
            }
        }
    };

    $$('body').append('<div id="outdiv" style="border:solid 1px #ccc;background:#eaeaea;padding: 10px;position: fixed;top: 0;right: 0;width: 260px;height: 70px;overflow-y: scroll;z-index:200000001;"></div>');

    $$('#outdiv').append('<div style="height:30px;"> <span style="cursor:pointer; border:solid 1px #ccc;background-color:#bababa;color:red;padding:10px;margin-right:10px;" id="dlhand">下载此产品的图片</span> <a style="border:solid 1px #ccc;background-color:#999;color:#fff;padding:10px;;" id="showhand" href="http://'+serv+'/yaaw" target="_blank">查看下载进程</a></div>');
    $$('#outdiv').append('<div style="height:20px;">图片位置 <pre>\\\\172.20.3.194\\wwwroot\\caiji\\images\\ </pre></div>');

    $$('#dlhand').click(function(){
        //download();
        ckst();
    });

    $$('#descbtn').click(function(){
        var hhh = $$(document).height()-$$(window).height();
        $$(document).scrollTop(hhh);
        setTimeout(function(){
            descx();
            $$(document).scrollTop(0);
        },12);
    });

    var ckst = function(){
        //$$.get('https://172.20.3.194:3001/test?t='+Math.rand(),function(data){

        //});
        $$.get('https://172.20.3.194:3001/test?t='+Math.random(), function(data){
            //console.log('ok');
            download();
            descx();
        }).fail(function() {
            window.open('https://172.20.3.194:3001');
            //alert('woops'); // or whatever
        });
    }

    // Your code here...
})();
