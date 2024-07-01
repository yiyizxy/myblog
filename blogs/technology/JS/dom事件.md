---
title: dom事件
date: 2024/07/01
tags:
 - javascript
categories:
 - javascript
---

DOM事件

## DOM事件

### DOM0

只有两个阶段：处于目标事件和捕获阶段

btn.onclick = function(){

}

DOM1

DOM2

概念

Javascript事件流是指在 HTML 文档中，事件的传播过程，即事件从触发元素向上或向下传递的路径。 事件流分为三个阶段：，DOM事件流包括3个阶段：

事件捕获阶段：事件开始时由顶层对象（通常是document对象）接收，然后向下传递到目标节点的过程

处于目标事件阶段

事件冒泡阶段

addEventListener

// 第三个参数true：表示事件在捕获阶段进行，false：事件在冒泡阶段进行（默认）
btn.addEventListener('click',function(){
}， true) 

阻止默认事件

stopPropagation()：终止默认事件传播到其他容器上

stopImmediatePropagation()：终止默认事件传播到其他容器上和自己这个容器上的其他事件

事件委托（代理）

事件代理（也称为事件委托）是一种常用的前端开发技术，通过将事件处理程序绑定到父元素而不是每个子元素上，来管理事件。当子元素触发事件时，事件会冒泡到父元素，然后在父元素上触发事件处理程序。好处包括：

性能优化：减少了添加事件处理程序的次数，节省了内存和提高了性能。特别是在需要管理大量子元素时，使用事件代理可以显著减少内存消耗和页面加载时间。

动态元素：对于动态添加的子元素，使用事件代理可以确保这些新元素也能受到事件处理程序的控制，而无需重新绑定事件。

代码简洁：通过将事件处理程序绑定到共同的父元素上，可以减少重复的代码量，提高代码的可维护性。

// 父元素
const parentElement = document.getElementById('parent');

// 事件代理
parentElement.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') { // 假设子元素是 li 元素
        console.log('子元素被点击:', event.target.textContent);
    }
});

事件绑定

DOM元素上面绑定

<button onclick="btnClick1()" onclick="btnClick2()">click me</button>

<script>
function btnClick1(){console.log('click!1')}
function btnClick2(){console.log('click!2')}
</script>
// 同一个元素绑定相同事件，后者会覆盖前者

js代码匿名绑定

btn.onclick = function(){console.log('1')}
btn.onclick = function(){console.log('2')}
// 只会执行最后一个

IE事件监听绑定：attachEvent / detachEvent（避免内存泄漏）

btn.attachEvent('onclick', function(){})
// 如果同一元素绑定了多个click 事件，都会执行，并且有先后顺序。

事件监听绑定：addEventListener / removeEventListener（避免内存泄漏）

btn.addEventListener('click',function(){}, false) // 可以区分捕获阶段和冒泡阶段
// 如果绑定了同一元素绑定了多个click 事件，都会执行，并且有先后顺序

兼容IE的事件监听

if (a.addEventListener) {
	a.addEventListener('click', function(){
      console.log('is addEventListener!') 
    })
  
} else if (a.attachEvent) {
	a.attachEvent('onclick', function(){
      console.log('is attachEvent!') 
    })
} else {
	console.log('others')
}


target与currentTarget区别

target：指的是目标阶段。

currentTarget：指的是捕获阶段，目标阶段和冒泡阶段。（一般指目标元素的父级）

小升初

参考

一文带你吃透【JS事件流】