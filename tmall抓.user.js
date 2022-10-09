// ==UserScript==
// @name         tmall抓
// @namespace    http://tampermonkey.net/
// @version      0.3.221009
// @description  try to take over the world!
// @author       You
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @match        http://detail.tmall.com/item.htm*
// @match        https://detail.tmall.com/item.htm*
// @match        https://detail.tmall.hk/hk/item.htm*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var $$ = jQuery.noConflict();
    var domain = 'http://www.tmall.com/';
    var postdomain = 'tmall.com';
    var serv = '172.20.3.194:3000';
    var servs = '172.20.3.194:3001';


    var getelem = function(xpath){
        return document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null,
        ).singleNodeValue;
    }

    var getd2022_pid = function(){
        // pid
        var d2022_pid = getelem('//*[@ id="aliww-click-trigger"]');
        var pid = $$(d2022_pid).attr('data-item');
        return pid;
    }

    var download = function(){
        $$('#outdiv').css({'width':'500px','height':'500px'});
        var pid = $$('#LineZing').attr('itemid');
        pid = pid == undefined ? getd2022_pid() : pid;
        $$('#J_UlThumb img').each(function(idx,obj){
            var imgurl = $$(obj).attr("src").replace(/\/\//,'http://').replace(/_\d+x\d+.*/,'').replace('https:http:','http:');
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



    // d2022 begin
    function scrollToEnd(){//滚动到底部
        var h = 1200;//滚动让起暴露 $$(document).height()-$$(window).height();
        $$(document).scrollTop(h);
    }
    function scrollToTop(){//滚动到顶部
        var h = 0;
        $$(document).scrollTop(h);
    }

    var d2022 = function(){
        console.log('d2022 start..');

        var pid = getd2022_pid();
        console.log('pid prase .. '+pid);

        var d2022_imgs= getelem('//*[@id="root"]/div/div[2]/div[2]/div[1]/div/div[1]/div/ul');
        console.log('d2022 prase imgurls...');
        $$(d2022_imgs).find('img').each(function(idx,obj){
            var imgurl =$$(obj).attr('src');
            imgurl = imgurl.replace(/^\/\//,'https://').replace(/_\d+x\d+.*/,'');
            console.log(imgurl);
            $$('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">图片<img width="35" height="45" src="' +imgurl+'"/>已经加入下载进程，请注意查看<div>');
            $$.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pid},function(result){
                //no
                console.log(result);
            });
        });
        console.log('d2022 prase imgurls... end');

        // 延迟以加载暴露
        $$('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">延迟以等待描述加载..<div>');
        var descxx = function(){
            console.log('d2022 prase descimgs... begin');

            var pidpath = pid+'/ext';
            var d2022_dimgs = getelem('//*[@data-layoutid="desc_richtext_pc"]/p');
            $$(d2022_dimgs).find('img').each(function(idx,obj){
                var imgurl = $$(obj).attr('data-src');
                //如果过曝需要取src
                imgurl = imgurl == undefined ? $$(obj).attr('src') : imgurl;
                console.log(imgurl);
                $$('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">图片<img width="35" height="45" src="' +imgurl+'"/>已经加入下载进程，请注意查看<div>');
                $$.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pidpath},function(result){
                    //no
                    console.log(result);
                });
            });
        }
        scrollToEnd();
        setTimeout(function() { scrollToTop();descxx(); }, 1200);


    }
    // d2022 end

    $$('body').append('<div id="outdiv" style="border:solid 1px #ccc;background:#eaeaea;padding: 10px;position: absolute;top: 0;right: 0;width: 300px;height: 70px;overflow-y: scroll;z-index:200000001;"></div>');

    $$('#outdiv').append('<div style="height:30px;"><span style="cursor:pointer; border:solid 1px #ccc;background-color:#bababa;color:red;padding:10px;margin-right:10px;" id="getvedio">视频 </span> <span style="cursor:pointer; border:solid 1px #ccc;background-color:#bababa;color:red;padding:10px;margin-right:10px;" id="dlhand">下载此产品的图片</span> <a style="border:solid 1px #ccc;background-color:#999;color:#fff;padding:10px;;" id="showhand" href="http://'+serv+'/yaaw" target="_blank">查看下载进程</a></div>');
    $$('#outdiv').append('<div style="height:20px;">图片位置 <pre>\\\\172.20.3.194\\wwwroot\\caiji\\images\\ </pre></div>');

    $$('#dlhand').click(function(){
        //download();
        ckst();
    });

    $$('#getvedio').click(function(){
        //console.log($$('video.lib-video')[0].currentSrc);
        //var newWeb=window.open('_blank');
        //newWeb.location = $$('video.lib-video')[0].currentSrc;

        var pid = $$('#LineZing').attr('itemid');
        pid = pid == undefined ? getd2022_pid() : pid;
        var imgurl = $$('video.lib-video')[0].currentSrc;
        $$.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pid},function(result){
                    console.log(result);
            $$('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">' +imgurl+'已经加入下载进程，请注意查看<div>');
        });
    });

    var ckst = function(){
        //$$.get('https://172.20.3.194:3001/test?t='+Math.rand(),function(data){

        //});
        $$.get('https://172.20.3.194:3001/test?t='+Math.random(), function(data){
            //console.log('ok');
            download();
            d2022();
        }).fail(function() {
            window.open('https://172.20.3.194:3001');
            //alert('woops'); // or whatever
        });
    }

    // Your code here...
})();
