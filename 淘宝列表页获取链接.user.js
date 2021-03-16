// ==UserScript==
// @name         淘宝列表页获取链接
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://s.taobao.com/search*
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var $$ = jQuery.noConflict();

    $$('body').append('<div id="outdiv" style="border:solid 1px #ccc;background:#eaeaea;padding: 10px;position: absolute;top: 0;right: 0;width: 660px;height: 70px;overflow-y: scroll;z-index:200000001;"></div>');

    $$('#outdiv').append('<div id="dlhand" style="float:left;margin-right:5px;border:solid 1px #ccc;">获取链接</div><div id="copyAddr" style="float:left;margin-right:5px;border:solid 1px #ccc;">复制</div><div id="eee" style="float:left;margin-right:5px;border:solid 1px #ccc;">清空</div><textarea id="outlinks" style="background:#fff;width:100%;"></textarea>');

    var getlinks = function(){
        $$('.J_MouserOnverReq').each(function(idx,obj){
            //console.log($(obj).find('.pic a').attr('href'))

            $$('#outlinks').val($$('#outlinks').val()+$$(obj).find('.pic a').attr('href').replace(/^.*?\/\//g,'https://')+"\n");
        });
    };

    $$('#dlhand').click(function(){
        getlinks();
    });

    $$('#copyAddr').click(function(){
      $$("#outlinks").select();
      try {var state = document.execCommand("copy");/*$$('#outlinks').val('');*/}
      catch(err){
          //var state = false;
      }
    });

    $$('#eee').click(function(){
        $$('#outlinks').val('');
    });

    // Your code here...
})();