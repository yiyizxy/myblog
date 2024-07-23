---
title: React
date: 2024/07/22
tags:
 - 框架
categories:
 - 框架
---

## 生命周期

Mounting

Updating

UnMounting

## setState同步还是异步

React17 legacy下只执行一次，但是如果在settimeout里执行会执行多次

## React Router

### history和hash路由区别？

hash路由url上会携带#不美观,不支持SSR
history路由需要后端配合改（ningix）,支持SSR

### V6和V5的区别

V6取消了<Switch>

### React-Router-Dom V6

react-router提供一些核心api,如Router、Route，不提供和Dom相关的api
react-router-dom提供BrowserRouter、HashRouter、Link这些，可以通过dom操作触发事件，控制路由
