// ==UserScript==
// @name         roanyer 商品原始地址探测器
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.roanyer.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict'
    var pidx = window.location.href.search('product_id') != -1 ? false : true;
    var pid = $('input[name="product_id"]').val();

    if(pidx && pid != undefined){
        window.location.href = 'https://www.roanyer.com/index.php?route=product/product&product_id='+pid;
    }

    //console.log(pid);
    //console.log(pidx);

    // Your code here...
})();