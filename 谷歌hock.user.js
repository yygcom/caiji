// ==UserScript==
// @name         谷歌hock https 降级
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.fr/search*
// @match        https://www.google.com/search*
// @match        https://www.google.co.jp/search*
// @match        https://www.google.com.hk/search*
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var $X = jQuery.noConflict();

    $X('#ires .r>a').each(function(idx,obj){
        if($X(obj).hasClass('fl')){
            //none;
        }else{
            //console.log($X(obj).attr('href'));
            $X(obj).before('<a target="_blank" class="f1" style="border:solid 1px #ccc;color:red;padding:3px;margin-right:5px;" href="'+$X(obj).attr('href').replace('https','http')+'">HTTP</a>');
        }
    });
    // Your code here...
})();