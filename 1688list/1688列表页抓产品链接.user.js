// ==UserScript==
// @name         1688列表页抓产品链接，直接开产品抓，抓完就跑
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @match        http://*.1688.com/page/offerlist_*
// @match        https://*.1688.com/page/offerlist_*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var $X = jQuery.noConflict();
    $X('#outdiv').css({'width':'1500px','height':'800px'});
    $X('body').append('<div id="outdiv" style="border:solid 1px #ccc;background:#eaeaea;padding: 10px;position: absolute;top: 0;right: 0;width: 200px;height: 170px;overflow-y: scroll;z-index:200000001;"></div>');
    $X('#outdiv').append('<div style="height:30px;"> <span style="cursor:pointer; border:solid 1px #ccc;background-color:#bababa;color:red;padding:10px;margin-right:10px;" id="dlhand">获取商品链接</span> </div>');
    $X('#outdiv').append('<div style="width:100%;height:100%;" id="output"></div>');

    console.log('准备ok');

    $X('#search-bar').find('li.offer-list-row-offer').each(function(idx,obj){
        console.log($X(obj).attr('data-offerid'));
        window.open('http://detail.1688.com/offer/'+$X(obj).attr('data-offerid')+'.html', '_blank');
    });

    // Your code here...
})();