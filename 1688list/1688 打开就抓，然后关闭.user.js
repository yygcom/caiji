// ==UserScript==
// @name         1688 打开就抓，然后关闭
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @match        http://detail.1688.com/offer/*.html*
// @match        https://detail.1688.com/offer/*.html*
// @grant        none
// ==/UserScript==

var XJQ = jQuery.noConflict();
var $ = XJQ;
(function() {
    'use strict';



    var domain = 'http://www.1688.com/';
    var postdomain = '1688.com';
    var serv = '172.20.3.194:3000';
    var servs = '172.20.3.194:3001';

    var download = function(){
        XJQ('#outdiv').css({'width':'500px','height':'500px'});
        //var pid = $$('input[name="item_id"]').val();
        var pid = XJQ('meta[name="b2c_auction"]').attr('content');
        XJQ('.tab-content-container li').each(function(idx,obj){
            var imgurldata = JSON.parse(XJQ(obj).attr("data-imgs"));
            var imgurl = imgurldata.original;
            console.log(imgurl);

            XJQ('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">图片<img width="35" height="45" src="' +imgurl+'"/>已经加入下载进程，请注意查看<div>');

            XJQ.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pid},function(result){
                //no
                console.log(result);
            });
        });

        window.close();
    };

    XJQ('body').append('<div id="outdiv" style="border:solid 1px #ccc;background:#eaeaea;padding: 10px;position: absolute;top: 0;right: 0;width: 260px;height: 70px;overflow-y: scroll;z-index:200000001;"></div>');

    XJQ('#outdiv').append('<div style="height:30px;"> <span style="cursor:pointer; border:solid 1px #ccc;background-color:#bababa;color:red;padding:10px;margin-right:10px;" id="dlhand">下载此产品的图片</span> <a style="border:solid 1px #ccc;background-color:#999;color:#fff;padding:10px;;" id="showhand" href="http://'+serv+'/yaaw" target="_blank">查看下载进程</a></div>');
    XJQ('#outdiv').append('<div style="height:20px;">图片位置 <pre>\\\\172.20.3.194\\wwwroot\\caiji\\images\\ </pre></div>');

    XJQ('#dlhand').click(function(){
        download();
    });
download();
    // Your code here...
})();
