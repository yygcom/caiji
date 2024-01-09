// ==UserScript==
// @name         pp
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在油猴脚本中点击指定XPath的按钮
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var loadtoupiao = function(){
        // 获取XPath元素
        var buttonElement = document.evaluate(
            '//*[@id="__next"]/div[2]/main/div/div[1]/section/div/div[5]/div/div[2]/div[2]/button',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;

        // 检查元素是否存在
        if (buttonElement) {
            // 触发按钮点击事件
            buttonElement.click();
        } else {
            console.error('找不到指定的按钮元素。');
        }

        // 获取复选框元素
        var checkbox = document.getElementById("privacy");

        // 检查复选框是否存在
        if (checkbox) {
            // 设置复选框为选中状态
            checkbox.checked = true;
        } else {
            console.error('找不到指定的复选框元素。');
        }


        // 获取按钮元素
        //var button = document.querySelector("/html/body/div[3]/div/div/div/section/form/button");
        var button = document.evaluate(
            '/html/body/div[3]/div/div/div/section/form/button',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;

        // 检查按钮元素是否存在
        if (button) {
            // 移除按钮的 disabled 属性，使其变为可用
            button.removeAttribute("disabled");
        } else {
            console.error('找不到指定的按钮元素。');
        }


        // 获取输入框元素
        var inputElement = document.evaluate(
            '/html/body/div[3]/div/div/div/section/div[3]/input[1]',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
            //document.querySelector("");

        // 检查输入框元素是否存在
        if (inputElement) {
            // 给输入框获得焦点
            inputElement.focus();

            inputElement.addEventListener("keydown", function(event) {
                // 检查是否按下的是回车键
                if (event.key === "Enter" || event.keyCode === 13) {
                    // 阻止默认行为，以防止表单提交
                    event.preventDefault();

                    // 触发按钮点击事件
                    button.click();
                }
            });
        } else {
            console.error('找不到指定的输入框元素。');
        }

    }

    // 等待页面加载完成
    document.addEventListener('DOMContentLoaded', function() {
        loadtoupiao();

        // 添加键盘事件监听器到整个文档
        document.addEventListener("keydown", function(event) {
            // 检查按下的键是否是 F4
            if (event.key === "F4" || event.keyCode === 115) {
                // 阻止默认行为，以防止浏览器触发 F4 的默认行为（通常是打开检查元素）
                event.preventDefault();

                // 在这里执行你想要的操作，比如触发按钮点击事件、显示/隐藏元素等
                console.log('按下了 F4 键！');
                loadtoupiao();
            }
        });
    });
})();