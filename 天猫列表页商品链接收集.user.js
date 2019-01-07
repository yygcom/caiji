// ==UserScript==
// @name         天猫列表页商品链接收集
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @match        https://*.tmall.com/category-*
// @match        https://*.tmall.com/search.htm*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var $X = jQuery.noConflict();
    $X('#outdiv').css({'width':'1500px','height':'800px'});
    $X('body').append('<div id="outdiv" style="border:solid 1px #ccc;background:#eaeaea;padding: 10px;position: absolute;top: 0;right: 0;width: 200px;height: 170px;overflow-y: scroll;z-index:200000001;"></div>');
    $X('#outdiv').append('<div style="height:30px;"> <span style="cursor:pointer; border:solid 1px #ccc;background-color:#bababa;color:red;padding:10px;margin-right:10px;" id="dlhand">获取商品链接</span> </div>');
    $X('#outdiv').append('<div style="width:100%;height:100%;" id="output"></div>');

    var xx = function(){
    var myEle = document.getElementById('output'),
        range = document.createRange();

    //range.selectNode(myEle);

    var selection = window.getSelection();
    // Save the selection.
    range = document.createRange();
    range.selectNodeContents(myEle);
    selection.removeAllRanges();
    // Remove all ranges from the selection.
    selection.addRange(range);

    //window.getSelection().addRange(range);

    //try {
        if(document.execCommand) {
            // 复制选中的文字到剪贴板
            document.execCommand("copy", "false", null);
            selection.removeRange(range);
        }
    //}catch{
        // 不支持复制命令
      //  alert('xx');
    //}
    alert('已复制到剪切板');
}


    var download = function(){
        var outp = '';
        $X('.J_TItems .J_TGoldData').each(function(idx,obj){outp = outp + $X(obj).attr('href').replace('//','https://')+"<br>";});
        $X('#output').html(outp);
    };

    $X('#dlhand').click(function(){
        download();
    });
    $X('#output').click(function(){
        xx();
    });
    console.log('loding..');


    // Your code here...
})();