// ==UserScript==
// @name         dreammask脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://dreammask.net/product/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var $$ = jQuery.noConflict();
    var domain = 'http://dreammask.net/';
    var postdomain = 'dreammask.net';
    var serv = '172.20.3.194:3000';
    var servs = '172.20.3.194:3001';


    var download = function(){
        $$('#outdiv').css({'width':'500px','height':'500px'});
        //var pid = $$('input[name="item_id"]').val();
        var pid = jQuery('input[name="product_id"').val();

        jQuery('.woocommerce-product-gallery__wrapper').find('a').each(function(idx,obj){
            //console.log(jQuery(obj).attr('href'));
            var imgurl = jQuery(obj).attr('href');

            $$('#outdiv').append('<div style="border-bottom: solid 1px #ccc; margin-bottom:5px;">图片<img width="35" height="45" src="' +imgurl+'"/>已解析，图片上右键另存为<div>');

                //$$.post("https://"+servs+"/getimg",{domain:postdomain,imgurl:imgurl,pid:pid},function(result){
                    //no
                //    console.log(result);
                //});
        });
    };

    $$('body').append('<div id="outdiv" style="border:solid 1px #ccc;background:#eaeaea;padding: 10px;position: absolute;top: 0;right: 0;width: 260px;height: 70px;overflow-y: scroll;z-index:200000001;"></div>');
    jQuery('#outdiv').append('<div style="border:solid 1px;padding: 5px;margin-top: 15px;background: #eaeaea;color:blue;">产品ID：'+jQuery('input[name="product_id"').val()+'</div>');

    $$('#outdiv').append('<div style="height:30px;"> <span style="cursor:pointer; border:solid 1px #ccc;background-color:#bababa;color:red;padding:10px;margin-right:10px;" id="dlhand">解析产品的图片</span> </div>');
    //$$('#outdiv').append('<div style="height:20px;">图片位置 <pre>\\\\172.20.3.194\\wwwroot\\caiji\\images\\ </pre></div>');

    $$('#dlhand').click(function(){
        download();
    });


    // Your code here...
})();