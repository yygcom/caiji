// ==UserScript==
// @name         milanoo抓
// @namespace    http://tampermonkey.net/
// @version      0.1.3
// @description  try to take over the world!
// @author       You
// @match        https://www.milanoo.com/fr/produit/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var domain = 'http://www.milanoo.com/';
    var postdomain = 'milanoo.com';
    var serv = '172.20.3.194:3000';
    var servs = '172.20.3.194:3001';

    var download = function(){
        $('#outdiv').css({'width':'500px','height':'500px'});
        var pid = $('input[name="ProductsId"]').val();
        $('#s_imglist li a').each(function(idx,obj){
            var imgurl = '';
            if(typeof($(obj).attr("hd"))!= "undefined"){//有此属性为高清
                imgurl = $(obj).attr('hd');
            }else{//否则是普通大图
                imgurl=$(obj).attr('href');
            }

            $('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">图片<img width="35" height="45" src="' +imgurl+'"/>已经加入下载进程，请注意查看<div>');

            $.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pid},function(result){
                //no
                console.log(result);
            });
        });
    };

    $('body').append('<div id="outdiv" style="border:solid 1px #ccc;background:#eaeaea;padding: 10px;position: absolute;top: 0;right: 0;width: 260px;height: 70px;overflow-y: scroll;z-index:9999;"></div>');

    $('#outdiv').append('<div style="height:30px;"> <span style="cursor:pointer; border:solid 1px #ccc;background-color:#bababa;color:red;padding:10px;margin-right:10px;" id="dlhand">下载此产品的图片</span> <a style="border:solid 1px #ccc;background-color:#999;color:#fff;padding:10px;;" id="showhand" href="http://'+serv+'/yaaw" target="_blank">查看下载进程</a></div>');
    $('#outdiv').append('<div style="height:20px;">图片位置 <pre>\\\\172.20.3.194\\wwwroot\\caiji\\images\\ </pre></div>');

    $('#dlhand').click(function(){
        download();
    });

    // Your code here...


    //download();
    //window.close();

})();
