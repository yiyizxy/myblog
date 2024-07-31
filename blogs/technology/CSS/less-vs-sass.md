---
title: Less与Sass的区别
date: 2024/07/01
tags:
 - CSS
categories:
 - CSS
---

## 共同点

都是css预处理器，允许开发者使用一些特定语法来编写css，包括变量、函数、混入（mixins）、逻辑运算、嵌套等能力，是css更加模块化，提高css的可复用性、可维护性以及可扩展性

## 区别

### 语法差异

Less 使用类似于 CSS 的语法，它是用 JavaScript 编写的，因此可以在客户端或服务器端（通过 Node.js）处理。

Sass 有两种语法：原始的缩进语法（缩进式语法，也称为 Sass），以及较新的、类 CSS 的语法（SCSS）。Sass 是用 Ruby 编写的，我们使用sass需要先安装ruby，但现在主要使用 LibSass（C/C++实现）或 Dart Sass。

### 功能差异

- 变量声明：在 Less 中，变量以 @ 符号开始，而在 Sass 的 SCSS 语法中，变量以 $ 符号开始。
- 混合（Mixins）：两者都支持混合，但是 Sass 提供了更多的功能，如参数默认值，以及不传递参数时的内容块。
- 逻辑控制：Sass 支持更复杂的控制指令，如 @if、@for、@each 和 @while。
- 函数：Sass 允许用户编写自己的函数，而 Less 的功能在这方面较为有限。
- 导入：Sass 的 @import 规则会合并文件，避免额外的 HTTP 请求，而 Less 的 @import 更接近原生 CSS 的行为。

### 社区和生态系统

- Sass 通常被认为有一个更大的社区和更成熟的生态系统，特别是在Compass这样的框架支持下。
- Less 也有一个活跃的社区，但通常认为它的生态系统不如 Sass 的成熟

### 性能

编译速度：Sass（特别是使用 LibSass 的版本）的编译速度通常认为比Less快，尤其在处理大型文件时

### 兼容性

跨平台：Sass和Less都可以在多种环境中运行，但是由于Sass有多种实现，它在不同平台上的兼容性可能更好

### 学习成本

由于Less的语法更接近原生CSS，对于初学者来说可能更容易上手。而Sass提供的高级功能可能需要更多的学习和实践。

### 其他

sass支持两种扩展名

.sass：支持语法比较新，跟css差距比较大，开发者比较少用

``` css
.demo
   h1
    color: red
```

.scss：支持语法跟css语法类似，开发者用的比较多

```css
.demo {
    h1 {
       color: red
    }
}
```

## 参考

[Sass(Scss)、Less的区别与选择 + 基本使用](https://juejin.cn/post/7283422522535673856?searchId=20240325151703FB8B0D6C3623661AA21F)