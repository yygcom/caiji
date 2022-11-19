// ==UserScript==
// @name         北语图书馆ssid dxid
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ss.zhizhen.com/s?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhizhen.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
////*[@id="mainlist"]/div[1]/div[2]/ul/li[7]/div/a[2]

    //添加兄弟节点
    function insertAfter(newNode,curNode){
        curNode.parentNode.insertBefore(newNode,curNode.nextElementSibling);
    }

    const allParagraphs = document.evaluate(
        '//li[@class="mountItems"]//a[1]',
        document,
        null,
        //XPathResult.ANY_TYPE,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null,
    );

    for(var idx=0;idx<allParagraphs.snapshotLength;idx++){
        console.log(idx);
        var xx = allParagraphs.snapshotItem(idx);
        //if(xx == null) break;
        var xxhref = xx.getAttribute('href');
        //console.log(xxhref);
        var rst = xxhref.match(/dxid=(\d+).*?ssid=(\d+)/);
        //console.log(rst);
        if(rst == null){
            rst = xxhref.match(/dxid=(\d+)/);
            rst[2] = '';
        }
        //console.log(typeof(xx));
        //var d1 = document.createElement('span');
        //console.log(typeof(d1));
        var a1 = document.createElement('a');
        a1.innerText = '['+rst[1]+']';
        a1.setAttribute('style','color:#000;font-weith:bold;text-decoration: underline;');
        a1.setAttribute('target','_blank');
        a1.setAttribute('href','https://api.freembook.com/search?category=duxiu&q='+rst[1]);

        var a2 = document.createElement('a');
        a2.innerText = '['+rst[2]+']';
        a2.setAttribute('style','color:#000;font-weith:bold;text-decoration: underline;');
        a2.setAttribute('target','_blank');
        a2.setAttribute('href','https://api.freembook.com/search?category=duxiu&q='+rst[2]);
        //d1.innerText = 'DX:[<a href="https://api.freembook.com/search?category=duxiu&q='+rst[1]+'">'+rst[1]+'</a>] [SSID: '+rst[2]+' ]';
        insertAfter(a1,xx);
        insertAfter(a2,a1);


    }
    // Your code here...
})();