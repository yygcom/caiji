// ==UserScript==
// @name         roanyer抓
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://www.roanyer.com/index.php?route=product/product*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var domain = 'http://www.roanyer.com/';
    var postdomain = 'roanyer.com';
    var serv = '172.20.3.194:3000';
    var servs = '172.20.3.194:3001';

    var testurl = function(str){

        //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
        //下面的代码中应用了转义字符"\"输出一个字符"/"
        var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        var objExp=new RegExp(Expression);
        if(objExp.test(str)==true){
            return true;
        }else{
            return false;
        }

    }

    var download = function(){
        $('#outdiv').css({'width':'500px','height':'500px'});
        //var pid = window.location.href.replace(/.*product\//i,'').replace(/\?.*/i,'');
        var pid = $('input[name="product_id"]').val();
        $('#ban_num1 img').each(function(idx,obj){
            var imgurl = '';
            imgurl=$(obj).attr('src');

            console.log(imgurl);


            $('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">图片<img width="35" height="45" src="' +imgurl+'"/>已经加入下载进程，请注意查看<div>');

            $.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pid},function(result){
                //no
                console.log(result);
            });
        });

        //扩展图
        var pidx = pid+'/ext/';
        $('#tab-description img').each(function(idx,obj){
            var imgurl = '';
            var tmurl = $(obj).attr('src');
            if(testurl(tmurl)){
                imgurl = tmurl;
            }else{
                imgurl=domain+$(obj).attr('src');
            }
            

            console.log(imgurl);


            $('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">图片<img width="35" height="45" src="' +imgurl+'"/>已经加入下载进程，请注意查看<div>');

            $.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pidx},function(result){
                //no
                console.log(result);
            });
        });

        //window.close();
    };

    $('body').append('<div id="outdiv" style="border:solid 1px #ccc;background:#eaeaea;padding: 10px;position: absolute;top: 0;right: 0;width: 260px;height: 70px;overflow-y: scroll;z-index:9999;"></div>');

    //if(document.domain == 'ecom.wix.com'){
    //console.log(window.location.href.replace(/.*product\//i,'').replace(/\?.*/i,''));
        $('#outdiv').append('<div style="height:30px;"> <span style="cursor:pointer; border:solid 1px #ccc;background-color:#bababa;color:red;padding:10px;margin-right:10px;" id="dlhand">下载此产品的图片</span> <a style="border:solid 1px #ccc;background-color:#999;color:#fff;padding:10px;;" id="showhand" href="http://'+serv+'/yaaw" target="_blank">查看下载进程</a></div>');
        $('#outdiv').append('<div style="height:20px;">图片位置 <pre>\\\\172.20.3.194\\wwwroot\\caiji\\images\\ </pre></div>');
    //}else{
        //$('#outdiv').append('<div style="height:20px;"><a href="'+$('#TPAMultiSection_j4ci4xqbiframe').attr('src')+'" target="_blank">先打开真实页面</a></div>');
    //}

    $('#dlhand').click(function(){
        download();
    });

    // Your code here...


    //download();
    //window.close();

})();
