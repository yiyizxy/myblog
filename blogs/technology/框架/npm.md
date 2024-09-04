---
title: npm yarn pnpm包管理工具演变史
date: 2024/09/04
tags:
 - 框架
categories:
 - 框架
---

## npm

### npm v2

此时期主要是采用简单的递归依赖方法，最后形成高度嵌套的依赖树。然后就会造成如下问题：重复依赖嵌套地狱，空间资源浪费，安装速度过慢，文件路径过长等问题。

```js
node_modules
├── A@1.0.0
│   └── node_modules
│       └── B@1.0.0
├── C@1.0.0
│   └── node_modules
│       └── B@2.0.0
└── D@1.0.0
    └── node_modules
        └── B@1.0.0
```

### npm v3

v3版本作了较大的更新，开始采取扁平化的依赖结构。这样的依赖结构可以很好的解决重复依赖的嵌套地狱问题，但是却出现扁平化依赖算法耗时长这样新的问题
官方仓库issue的解释：[npm@3 wants to be faster · Issue #8826 · npm/npm (github.com)](https://github.com/npm/npm/issues/8826)

```shell
node_modules
├── A@1.0.0
├── B@1.0.0
└── C@1.0.0
    └── node_modules
        └── B@2.0.0
├── D@1.0.0
```

V3存在一些不稳定性，举个🌰：假设A@1.0.0 依赖C@1.0.1，B@1.0.0 依赖 C@1.0.2，那么生成的node_modules结构什么样的呢？

```shell
node_modules
├── A@1.0.0
├── B@1.0.0
    └── node_modules
        └── C@1.0.2
├── C@1.0.1
// 还是下面的情况呢
node_modules
├── A@1.0.0
    └── node_modules
        └── C@1.0.1
├── B@1.0.0
├── C@1.0.2
```

具体结构是啥，依赖A、B在package.json中的位置

### npm v5

为了解决上面出现的扁平化依赖算法耗时长以及结构不稳定问题，npm引入package-lock.json机制，package-lock.json的作用是锁定项目的依赖结构，保证依赖的稳定性

官方文档：[package.json | npm Docs (npmjs.com)](https://docs.npmjs.com/cli/v10/configuring-npm/package-json/)

## yarn

## yarn1

首先需要提出的是yarn出现时间为2016年，yarn的出现是为了解决npmv3、npm v5解决的问题，包括使用`yarn.lock`等机制，锁定版本依赖，实现并发网络请求，最大化网络资源利用率，其次还有利用缓存机制，实现了离线模式

其实后面很多`npm`都是在学习`yarn`的机制，上面的机制目前npm基本也都实现了，就目前而言npm和yarn其实并没有差异很大，具体使用npm还是yarn可以看个人需求

yarn与npm的区别：

`package-lock.json`与`yarn.lock`格式上有差异。

npm v5中只需要`package-lock.json`就可以保正确的`node_modules`目录结构，而yarn需要同时拥有`yarn.lock`文件和`package.json`文件。可参考[Yarn的确定性](https://github.com/fengliner/blog/issues/3)

## yarn2

yarn2版本是无`node_modules`模式，可以加快项目安装速度，同时大大缩减删除一整个项目的速度。

`npm install -g yarn@berry`

## pnpm

中文官网：pnpm - 速度快、节省磁盘空间的软件包管理器 | pnpm中文文档 | pnpm中文网

pnpm内部使用基于内容寻址的文件系统来存储磁盘上所有的文件，这样可以做到不会出现重复安装，在项目中需要使用到依赖的时候，pnpm只会安装一次，之后再次使用都会直接硬链接指向该依赖，(包是从全局store硬连接到虚拟store的，这里的虚拟store就是node_modules/.pnpm),极大节省磁盘空间，并且加快安装速度

注：硬链接是多个文件名指向同一个文件的实际内容，而软链接（符号链接）是一个独立的文件，指向另一个文件或目录的路径

也许有人说yarn默认也是扁平化安装方式，但是yarn有独特的PnP安装方式，可以直接去掉node_modules，将依赖包内容写在磁盘，节省了node文件I/O的开销，这样也能提升安装速度，但是yarn PnP 和pnpm机制是不同的，且总体来说安装速度pnpm是要快于yarn PnP的，详情请看下面[官方文档](https://classic.yarnpkg.com/en/docs/pnp/)

最后就是pnpm是默认支持monorepo多项目管理的，在日渐复杂的前端多项目开发中尤其适用，也就说我们不再需要lerna来管理多包项目，可以使用pnpm + Turborepo作为我们的项目管理环境

pnpm解决了npm、yarn存在的哪些问题？
1.幽灵依赖问题，什么是幽灵依赖？`package.json`文件中没有相关依赖包A，但只要依赖包B依赖，项目中就可以直接引入依赖包B，假如某天A不依赖B了，则会有问题
2.当npm、yarn存在依赖多个不同版本的相同包时，只会提升1个，其余版本的包仍然存在复制多次的情况，浪费磁盘空间

还有就是pnpm还能管理nodejs版本，可以直接替代nvm，命令如下所示

```shell
# 安装 LTS 版本
pnpm env use --global lts
# 安装指定版本
pnpm env use --global 16
```

优点

1. 速度快：在绝大多数场景下，包安装的速度比npm/yarn快2-3倍
2. 节省磁盘空间：会把包软链到项目本地，无需重复安装，由于基于内容寻址的文件系统来存储磁盘上的所有文件，主要表现在：1.不会重复安装同一个包2.即使包不同版本，也会最大程度的复用代码，只新增不同的部分
3. 支持monorepo
4. 支持管理nodejs版本

## npm常用指令

为了维护包，npm必须要使用仓库账号才允许将包发不到仓库中。注册账号的命令是npm adduser，这也是一个提问式的交互过程，按顺序即可：

查看npm包的owner:`npm owner ls @xxx`

对npm包加某人权限：`npm owner add shirely @xxx`

对npm包删除某人权限：`npm owner delete shirely @xxx`

npm ls分析出当前路径下能够通过模块路径找到的所有的包，并生成`npm ls | grep @xxx` 查看sparrow版本

npm link 包不用发版，可以连接本地`npm view @xxx --json` 查看包各个版本信息

## package.json关键字段解析

main: 定义了npm包的入口文件，browser环境和node环境均可使用
module: 定义npm包的ESM规范的入口文件，browser环境和node环境均可使用
browser: 定义npm包在browser环境下的入口文件

## 参考

[包管理工具 —— 更推荐的pnpm](https://juejin.cn/post/7076389222025789448)