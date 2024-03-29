// ==UserScript==
// @name         taobao抓
// @namespace    http://tampermonkey.net/
// @version      0.4.20221027
// @description  try to take over the world!
// @author       You
// @original-script https://github.com/yygcom/caiji/raw/master/taobao%E6%8A%93.user.js
// @updateURL    https://github.com/yygcom/caiji/raw/master/taobao%E6%8A%93.user.js
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @match        http://item.taobao.com/item.htm*
// @match        https://item.taobao.com/item.htm*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var $$ = jQuery.noConflict();
    var domain = 'http://www.taobao.com/';
    var postdomain = 'taobao.com';
    var serv = '172.20.3.194:3000';
    var servs = '172.20.3.194:3001';

    var download = function(){
        $$('#outdiv').css({'width':'500px','height':'500px'});
        var pid = $$('input[name="item_id"]').val();
        $$('#J_UlThumb img').each(function(idx,obj){
            var imgurl = $$(obj).attr("src").replace(/\/\//,'https://').replace(/_\d+x\d+.*/,'');
            console.log(imgurl);

            $$('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">图片<img width="35" height="45" src="' +imgurl+'"/>已经加入下载进程【一组】，请注意查看<div>');

            $$.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pid},function(result){
                //no
                console.log(result);
            });
        });

        var pidx = pid+'/ext/';
        $$('.J_TSaleProp a').each(function(idx,obj){
            var testxx = $$(obj).attr('style');
            if(testxx !== undefined){
                var imgurl = testxx.replace(/background:url\(/,'https:').replace(/_\d+x\d+.*/,'');
                console.log(imgurl);
                $$('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">图片<img width="35" height="45" src="' +imgurl+'"/>已经加入下载进程【二组】，请注意查看<div>');
                $$.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pidx},function(result){
                    console.log(result);
                });
            }
        });

        pidx = pid+'/desc/';
        $$('#J_DivItemDesc img').each(function(idx,obj){
            //console.log(obj);
            var imgurl = $$(obj).attr('src');
            var lzimgurl = $$(obj).data('ks-lazyload');
            //console.log(imgurl);
            //console.log(lzimgurl);
            imgurl = lzimgurl == undefined ? imgurl : lzimgurl;

            $$('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">图片<img width="35" height="45" src="' +imgurl+'"/>已2经加入下载进程【描述】，请注意查看<div>');
            $$.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pidx},function(result){
                console.log(result);
            });
        });

    };

    $$('body').append('<div id="outdiv" style="border:solid 1px #ccc;background:#eaeaea;padding: 10px;position: absolute;top: 0;right: 0;width: 360px;height: 70px;overflow-y: scroll;z-index:200000001;"></div>');

    $$('#outdiv').append('<div style="height:30px;"><span style="cursor:pointer; border:solid 1px #ccc;background-color:#bababa;color:red;padding:10px;margin-right:10px;" id="getvedio">视频 </span>  <span style="cursor:pointer; border:solid 1px #ccc;background-color:#bababa;color:red;padding:10px;margin-right:10px;" id="dlhand">下载此产品的图片</span> <a style="border:solid 1px #ccc;background-color:#999;color:#fff;padding:10px;;" id="showhand" href="http://'+serv+'/yaaw" target="_blank">查看下载进程</a></div>');
    $$('#outdiv').append('<div style="height:20px;">图片位置 <pre>\\\\172.20.3.194\\wwwroot\\caiji\\images\\ </pre></div>');

    $$('#dlhand').click(function(){
       // download();
        ckst();
    });

    var ckst = function(){
        //$$.get('https://172.20.3.194:3001/test?t='+Math.rand(),function(data){

        //});
        $$.get('https://172.20.3.194:3001/test?t='+Math.random(), function(data){
            //console.log('ok');
            download();
        }).fail(function() {
            window.open('https://172.20.3.194:3001');
            //alert('woops'); // or whatever
        });
    }


    $$('#getvedio').click(function(){
        var pid = $$('input[name="item_id"]').val();
        var xurl = 'https://world.taobao.com/item/'+pid+'.htm?autodvx=1';
        document.location.href=xurl;
    });
    // Your code here...
})();
