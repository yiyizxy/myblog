---
title: DOM事件
date: 2024/07/01
tags:
 - javascript
categories:
 - javascript
---

## 概念

Javascript事件流是指在HTML文档中，事件的传播过程，即事件从触发元素向上或向下传递的路径。 DOM事件流包括3个阶段：

1. 事件捕获阶段：事件开始时由顶层对象（通常是document对象）接收，然后向下传递到目标节点的过程
2. 处于目标事件阶段
3. 事件冒泡阶段

## DOM事件

### DOM0（原生事件模型）

只有两个阶段：处于目标事件和捕获阶段

```js
// 绑定方案一
<button onclick="btnClick1()" onclick="btnClick2()">click me</button>
<button onclick="btnClick1()" onclick="btnClick2()">click me</button>

<script>
function btnClick1(){console.log('click!1')}
function btnClick2(){console.log('click!2')}
</script>

// 绑定方案二
btn.onclick = function(){

}
```

特点：同一个元素绑定相同事件，后者会覆盖前者

### DOM2（标准事件模型）

事件监听绑定：addEventListener / removeEventListener（避免内存泄漏）

```js
// 第三个参数true：表示事件在捕获阶段进行，false：事件在冒泡阶段进行（默认），先绑定先执行
btn.addEventListener('click',function(){
}， true) 

btn.removeEventListener('click',function(){
}， true) 
```

特点：如果绑定了同一元素绑定了多个click 事件，都会执行，并且有先后顺序

### IE事件模型

IE事件监听绑定：attachEvent / detachEvent（避免内存泄漏）
特点： 事件流只有处于目标事件和冒泡事件

```js
btn.attachEvent('onclick', function(){})
// 如果同一元素绑定了多个click 事件，都会执行，后绑定先执行。

btn.detachEvent('onclick', function(){})

e.cancelBubble = true // 阻止事件冒泡
e.returnValue = false // 阻止默认事件
```

## 阻止默认事件

event.stopPropagation(): 阻止父类冒泡
event.stopImmediatePropagation(): 阻止父类冒泡及当前节点的同类事件
event.preventDefault(): 阻止默认事件

## 事件委托（代理）

事件代理（也称为事件委托）是一种常用的前端开发技术，通过将事件处理程序绑定到父元素而不是每个子元素上，来管理事件。当子元素触发事件时，事件会冒泡到父元素，然后在父元素上触发事件处理程序。好处包括：

- 性能优化：减少了添加事件处理程序的次数，节省了内存和提高了性能。特别是在需要管理大量子元素时，使用事件代理可以显著减少内存消耗和页-面加载时间。
- 动态元素：对于动态添加的子元素，使用事件代理可以确保这些新元素也能受到事件处理程序的控制，而无需重新绑定事件。
- 代码简洁：通过将事件处理程序绑定到共同的父元素上，可以减少重复的代码量，提高代码的可维护性。

```js
// 父元素
const parentElement = document.getElementById('parent');

// 事件代理
parentElement.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') { // 假设子元素是 li 元素
        console.log('子元素被点击:', event.target.textContent);
    }
});
```

## 实现多浏览器的兼容事件绑定（兼容IE的事件监听）

思路： 采用addEventListener && attachEvent

```js
class bindEvent() {
    constructor(element) {
        this.element = element
    }
    addEventListener = (type, handler) => {
        if (this.element.addEventListener) {
            this.element.addEventListener(type, handler, false)
        } else if (this.element.attachEvent) {
            const element = this.element
            this.element.attachEvent('on' + type, () => {
                handle.call(element)
            }))
        } else {
            this.element['on' + type] = handler
        }
    },
    removeEventListener = () => {
        if (this.element.removeEventListener) {
            this.element.removeEventListener(type, handler, false)
        } else if (this.element.detachEvent) {
            const element = this.element
            this.element.detachEvent('on' + type, () => {
                handle.call(element)
            }))
        } else {
            this.element['on' + type] = null
        }
    }
    static stopPropagation(e) {
        if (e.stopPropagation) {
            e.stopPropagation()
        } else {
            e.cancelBubble = true
        }
    }

    static preventDefault() {
        if (e.preventDefault) {
            e.preventDefault()
        } else {
            e.returnValue = false
        }

    }
}
```

## target与currentTarget区别

target：指的是目标阶段。
currentTarget：指的是捕获阶段，目标阶段和冒泡阶段。（一般指目标元素的父级）

参考

一文带你吃透【JS事件流】