// ==UserScript==
// @name         莫丹你列表id
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @match        http://www.modanie.fr/*-pas-cher-*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var $X = jQuery.noConflict();
    var idarr = new Array();
    $X('body').append('<style>.bred{background: #acefe8;}</style><div id="outdiv" style="word-break: break-all;border:solid 1px #ccc;background:#eaeaea;padding: 10px;position: fixed;top: 0;right: 0;width: 200px;height: 370px;overflow-y: scroll;z-index:200000001;"></div>');

    var bianli = function(){
        $X('#outdiv').empty();
        idarr = [];
        $X('.goods_item').each(function(idx,obj){
            if($X(this).hasClass('bred')){
                //$X('#outdiv').append('<p>'+$X(obj).find('dt a').attr('href').match(/.*-produit-(.*)\.html/)[1]+'</p>');
                idarr.push($X(obj).find('dt a').attr('href').match(/.*-produit-(.*)\.html/)[1]);
            }
        });
        $X('#outdiv').append(idarr.join(','));
    };

    $X('body').on('click','.goods_item',function(){
        //alert('aaa');return false;
        if($X(this).hasClass( "bred" )){
            $X(this).removeClass('bred');
            bianli();
            return false;
        }else{
            $X(this).addClass('bred');
            bianli();
            return false;
        }
    });

    $X('.goods_item').each(function(idx,obj){
        $X(this).addClass('bred');
        idarr.push($X(obj).find('dt a').attr('href').match(/.*-produit-(.*)\.html/)[1]);
        //$X('#outdiv').append('<p>'+$X(obj).find('dt a').attr('href').match(/.*-produit-(.*)\.html/)[1]+'</p>');
    });
    $X('#outdiv').append(idarr.join(','));
    // Your code here...
})();
