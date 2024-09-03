---
title: webpack
date: 2024/07/02
tags:
 - 框架
categories:
 - 框架
---

## webpack5.0优化点

## Hot Module Replacement(HMR)

第一步，在 webpack 的 watch 模式下，文件系统中某一个文件发生修改，webpack 监听到文件变化，根据配置文件对模块重新编译打包，并将打包后的代码通过简单的 JavaScript 对象保存在内存中。
第二步是 webpack-dev-server 和 webpack 之间的接口交互，而在这一步，主要是 dev-server 的中间件 webpack-dev-middleware 和 webpack 之间的交互，webpack-dev-middleware 调用 webpack 暴露的 API对代码变化进行监控，并且告诉 webpack，将代码打包到内存中。
第三步是 webpack-dev-server 对文件变化的一个监控，这一步不同于第一步，并不是监控代码变化重新打包。当我们在配置文件中配置了devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化，变化后会通知浏览器端对应用进行 live reload。注意，这儿是浏览器刷新，和 HMR 是两个概念。
第四步也是 webpack-dev-server 代码的工作，该步骤主要是通过 sockjs（webpack-dev-server 的依赖）在浏览器端和服务端之间建立一个 websocket 长连接，将 webpack 编译打包的各个阶段的状态信息告知浏览器端，同时也包括第三步中 Server 监听静态文件变化的信息。浏览器端根据这些 socket 消息进行不同的操作。当然服务端传递的最主要信息还是新模块的 hash 值，后面的步骤根据这一 hash 值来进行模块热替换。
webpack-dev-server/client 端并不能够请求更新的代码，也不会执行热更模块操作，而把这些工作又交回给了 webpack，webpack/hot/dev-server 的工作就是根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器呢还是进行模块热更新。当然如果仅仅是刷新浏览器，也就没有后面那些步骤了。
HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上一步传递给他的新模块的 hash 值，它通过 JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回一个 json，该 json 包含了所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，获取到最新的模块代码。这就是上图中 7、8、9 步骤。
而第 10 步是决定 HMR 成功与否的关键步骤，在该步骤中，HotModulePlugin 将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用。
最后一步，当 HMR 失败后，回退到 live reload 操作，也就是进行浏览器刷新来获取最新打包代码。
在初步体会了webpack的热更新之后，可能需要思考以下的问题

### 为什么需要热更新？

Hot Module Replacement（以下简称 HMR）是 webpack 发展至今引入的最令人兴奋的特性之一 ，当你对代码进行修改并保存后，webpack 将对代码重新打包，并将新的模块发送到浏览器端，浏览器通过新的模块替换老的模块，这样在不刷新浏览器的前提下就能够对应用进行更新。例如，在开发 Web 页面过程中，当你点击按钮，出现一个弹窗的时候，发现弹窗标题没有对齐，这时候你修改 CSS 样式，然后保存，在浏览器没有刷新的前提下，标题样式发生了改变。感觉就像在 Chrome 的开发者工具中直接修改元素样式一样。

### HMR是怎样实现自动编译的？

webpack通过watch可以监听文件编译完成和监听文件的变化，webpack-dev-middleware可以调用webpack的API监听代码的变化，webpack-dev-middleware利用sockjs和webpack-dev-server/client建立webSocket长连接。将webpack的编译编译打包的各个阶段告诉浏览器端。主要告诉新模块hash的变化，然后webpack-dev-server/client是无法获取更新的代码的，通过webpack/hot/server获取更新的模块，然后HMR对比更新模块和模块的依赖。
思考💡：模块内容的变更浏览器又是如何感知的？
webpack-dev-middleware利用sockjs和webpack-dev-server/client建立webSocket长连接。将webpack的编译编译打包的各个阶段告诉浏览器端。
思考💡：以及新产生的两个文件又是干嘛的？
d04feccfa446b174bc10.hot-update.json
告知浏览器新的hash值，并且是哪个chunk发生了改变
main.d04feccfa446b174bc10.hot-update.js
告知浏览器，main 代码块中的/src/title.js模块变更的内容
首先是通过XMLHttpRequest的方式，利用上一次保存的hash值请求hot-update.json文件。这个描述文件的作用就是提供了修改的文件所在的chunkId。
然后通过JSONP的方式，利用hot-update.json返回的chunkId 及 上一次保存的hash 拼接文件名进而获取文件内容。
思考💡：怎么实现局部更新的？
当hot-update.js文件加载好后，就会执行window.webpackHotUpdate，进而调用了hotApply。hotApply根据模块ID找到旧模块然后将它删除，然后执行父模块中注册的accept回调，从而实现模块内容的局部更新。
思考💡：webpack 可以将不同的模块打包成 bundle 文件或者几个 chunk 文件，但是当我通过 webpack HMR 进行开发的过程中，我并没有在我的 dist 目录中找到 webpack 打包好的文件，它们去哪呢？
原来 webpack 将 bundle.js 文件打包到了内存中，不生成文件的原因就在于访问内存中的代码比访问文件系统中的文件更快，而且也减少了代码写入文件的开销，这一切都归功于memory-fs，memory-fs 是 webpack-dev-middleware 的一个依赖库，webpack-dev-middleware 将 webpack 原本的 outputFileSystem 替换成了MemoryFileSystem 实例，这样代码就将输出到内存中。
思考💡：通过查看 webpack-dev-server 的 package.json 文件，我们知道其依赖于 webpack-dev-middleware 库，那么 webpack-dev-middleware 在 HMR 过程中扮演什么角色？
webpack-dev-middleware扮演是中间件的角色，一头可以调用webpack暴露的API检测代码的变化，一头可以通过sockjs和webpack-dev-server/client建立webSocket长连接，将webapck打包编译的各个阶段发送给浏览器端。
思考💡：使用 HMR 的过程中，通过 Chrome 开发者工具我知道浏览器是通过 websocket 和 webpack-dev-server 进行通信的，但是 websocket 的 message 中并没有发现新模块代码。打包后的新模块又是通过什么方式发送到浏览器端的呢？为什么新的模块不通过 websocket 随消息一起发送到浏览器端呢？
功能块的解耦，各个模块各司其职，dev-server/client 只负责消息的传递而不负责新模块的获取，而这些工作应该有 HMR runtime 来完成，HMR runtime 才应该是获取新代码的地方。再就是因为不使用 webpack-dev-server 的前提，使用 webpack-hot-middleware 和 webpack 配合也可以完成模块热更新流程，在使用 webpack-hot-middleware 中有件有意思的事，它没有使用 websocket，而是使用的 EventSource。综上所述，HMR 的工作流中，不应该把新模块代码放在 websocket 消息中。
思考💡：浏览器拿到最新的模块代码，HMR 又是怎么将老的模块替换成新的模块，在替换的过程中怎样处理模块之间的依赖关系？
思考💡：当模块的热替换过程中，如果替换模块失败，有什么回退机制吗？
模块热更新的错误处理，如果在热更新过程中出现错误，热更新将回退到刷新浏览器
面试题：说一下webpack的热更新原理？
webpack通过watch可以监测代码的变化；webpack-dev-middleware可以调用webpack暴露的API检测代码变化，并且告诉webpack将代码保存到内存中；webpack-dev-middleware通过sockjs和webpack-dev-server/client建立webSocket长连接，将webpack打包阶段的各个状态告知浏览器端，最重要的是新模块的hash值。webpack-dev-server/client通过webpack/hot/dev-server中的HMR去请求新的更新模块，HMR主要借助JSONP。先拿到hash的json文件，然后根据hash拼接出更新的文件js，然后HotModulePlugin对比新旧模块和模块依赖完成更新。

## webpack的Hash类型

### [hash]

描述：整个项目构建的哈希值，每次构建时生成一个新的哈希值。
适用场景：适用于整个项目构建的全局哈希，通常用于非代码资源（如 CSS、图像等）。

### [chunkhash]

描述：基于每个入口文件及其依赖的哈希值，不同的入口文件会生成不同的哈希值。
适用场景：适用于代码分割后的文件，确保只有内容变化的文件会生成新的哈希值，从而更好地利用缓存。

### [contenhash]

描述：基于文件内容的哈希值，文件内容不变则哈希值不变。
适用场景：适用于静态资源文件（如 CSS、图片等），确保文件内容不变时哈希值也不变，从而更好地利用缓存。

## Tree Shaking

配置mode=production默认支持tree shaking，并且package.json设置sideEffects，设置的文件表明不支持tree shaking

启动Tree Shaking功能必须同时满足以下3个条件：
1.使用ESM规范编写模块代码
2.配置optimization.usedExports为true,启动标记功能
3.启动代码优化功能，可以通过如下方式实现：
 *配置optimization.minimize=true
 *提供optimization.minimizer数组

```js
// webpack.config.js
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', {
                "modules": false // 确保Babel不会将ES6模块语法转换为CommonJS模块
            }]
          }
        }
      }
    ]
  },
  optimization: {
    usedExports: true, // 这行是可选的，生产模式下默认启用
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          dead_code: true,
          drop_console: true
        }
      }
    })]
  }
};

```

## Tree Shaking原理

## vendor && common文件代表什么

vendor文件通常是指第三方库和依赖项，例如React、Lodash、Moment.js等。这些库通常不会频繁变化，因此将它们打包到一个单独的文件中可以利用浏览器缓存，从而减少加载时间
common文件通常是指项目中多个入口点之间共享的代码。这些代码可能是业务逻辑、工具函数等。将这些共享代码提取到一个单独的文件中，可以避免重复加载，提高代码复用性和加载效率

```js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: { // 配置代码拆分
      chunks: 'all', // 对所有类型的代码块进行拆分
      cacheGroups: { // 定义缓存值
        vendor: { // 将所有来自node_modules下的模块打包到vendors文件
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors', // vendors.[contenthash].js
          chunks: 'all'
        },
        common: { // 将所有来自common下的模块打包到vendors文件
          test: /[\\/]src[\\/]common[\\/]/,
          name: 'common', // common.[contenthash].js 
          chunks: 'all', 
          minSize: 0 // 可以根据需要调整
        }
      }
    }
  }
}
```

## source-map有哪些值



## 参考

[webpack热更新原理](https://juejin.cn/post/7152845665477869582?searchId=202407171441107B631F6471FADB26ED99)
[一文了解Webpack热更新(HMR)原理](https://juejin.cn/post/7300118821531942927?searchId=202407171419393CEE50881EE03D040614)