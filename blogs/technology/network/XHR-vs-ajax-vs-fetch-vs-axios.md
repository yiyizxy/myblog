---
title: ajax vs fetch vs axios
date: 2024/07/01
tags:
 - 网络
categories:
 - 网络
---

## 区别

ajax：ajax是一种基于原生JavaScript的异步请求技术。它使用XMLHttpRequest对象来发送请求和接收响应。ajax具有相较对较低的层级封装，需要开发人员手动处理请求和响应的细节。使用ajax时，你可以直接操作请求头、设置请求方法和处理响应。

1.基于xmlhttprequest,封装较低级，需要手动处理请求和响应信息
2.需要大量代码通过回调函数的方式处理响应数据，代码可读性较差

axios：axios是一个基于Promise的HTTP客户端，可以在浏览器和Node.js中使用。它提供了更高级别的封装，使发送请求和处理响应更加简单和灵活。axios支持以简洁的方式设置请求参数、处理请求和响应拦截器，并提供了更好的错误处理和取消请求的支持。

1.适用浏览器以及node
2.基于promise处理请求和响应，支持链式调用和异步处理，代码可读性好
3.有较丰富的功能和选项，例如：取消请求、拦截请求和响应、转换请求等
4.缺点是需要手动引入axios库文件，增加了代码量和体积

fetch：fetch是浏览器内置的API，用于发送网络请求。它提供了一种现代化、基于Promise的方式来进行网络通信。与axios类似，fetch也提供了一种较低级别的封装，但相比于axios，它的功能和语法更为简单。fetch通过链式调用的方式设置请求参数，返回的是一个Promise对象

1.浏览器内置api
2.基于promise处理请求和响应，支持链式调用和异步处理，代码可读性好
3.缺点是不兼容低版本浏览器，需要polyfill

## 例子

```js
// ajax
$.ajax({
  url: 'https://api.example.com/data',
  method: 'GET',
  success: function(response) {
    console.log(response);
  },
  error: function(error) {
    console.log(error);
  }
});
```

```js
// axios
axios.get('https://api.example.com/data')
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });

```

```js
// fetch
fetch('https://api.example.com/data')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.log(error);
  });

```

## 总结

ajax是原生的异步请求技术，axios提供了更高级别的封装和功能，而fetch是浏览器内置的现代化网络请求API。选择使用哪种方法取决于你的项目需求和个人喜好，以及是否需要额外的功能和便利性。

## 参考

[ajax、axios、fetch的区别](https://juejin.cn/post/7241990416987979813)