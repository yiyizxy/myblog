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

Webpack的热更新，在不刷新页面的前提下，将新代码替换掉旧代码。

HRM的原理实际上是webpack-dev-server（WDS）和浏览器之间维护了一个websocket服务。当本地资源发生变化后，webpack会先将打包生成新的模块代码放入内存中，然后WDS向浏览器推送更新，并附带上构建时的hash，让客户端和上一次资源进行对比，如果和上次不一样的话，浏览器向服务端获取更新的内容，最后进行更新。

### 为什么需要热更新？

Hot Module Replacement（以下简称 HMR）是webpack发展至今引入的最令人兴奋的特性之一 ，当你对代码进行修改并保存后，webpack将对代码重新打包，并将新的模块发送到浏览器端，浏览器通过新的模块替换老的模块，这样在不刷新浏览器的前提下就能够对应用进行更新。例如，在开发Web页面过程中，当你点击按钮，出现一个弹窗的时候，发现弹窗标题没有对齐，这时候你修改CSS样式，然后保存，在浏览器没有刷新的前提下，标题样式发生了改变。感觉就像在Chrome的开发者工具中直接修改元素样式一样。

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

思考💡：webpack可以将不同的模块打包成bundle文件或者几个chunk文件，但是当我通过webpack HMR进行开发的过程中，我并没有在我的 dist目录中找到webpack打包好的文件，它们去哪呢？
原来webpack将bundle.js文件打包到了内存中，不生成文件的原因就在于访问内存中的代码比访问文件系统中的文件更快，而且也减少了代码写入文件的开销，这一切都归功于memory-fs，memory-fs是webpack-dev-middleware的一个依赖库，webpack-dev-middleware将webpack原本的outputFileSystem替换成了MemoryFileSystem实例，这样代码就将输出到内存中。

思考💡：通过查看webpack-dev-server的package.json 文件，我们知道其依赖于webpack-dev-middleware库，那么 webpack-dev-middleware在HMR过程中扮演什么角色？
webpack-dev-middleware扮演是中间件的角色，一头可以调用webpack暴露的API检测代码的变化，一头可以通过sockjs和webpack-dev-server/client建立webSocket长连接，将webapck打包编译的各个阶段发送给浏览器端
。
思考💡：使用HMR的过程中，通过Chrome开发者工具我知道浏览器是通过websocket和webpack-dev-server 进行通信的，但是websocket的 message中并没有发现新模块代码。打包后的新模块又是通过什么方式发送到浏览器端的呢？为什么新的模块不通过websocket随消息一起发送到浏览器端呢？
功能块的解耦，各个模块各司其职，dev-server/client只负责消息的传递而不负责新模块的获取，而这些工作应该有HMR runtime来完成，HMR runtime才应该是获取新代码的地方。再就是因为不使用webpack-dev-server的前提，使用 webpack-hot-middleware 和 webpack 配合也可以完成模块热更新流程，在使用 webpack-hot-middleware 中有件有意思的事，它没有使用 websocket，而是使用的 EventSource。综上所述，HMR的工作流中，不应该把新模块代码放在 websocket 消息中。

思考💡：浏览器拿到最新的模块代码，HMR又是怎么将老的模块替换成新的模块，在替换的过程中怎样处理模块之间的依赖关系？

思考💡：当模块的热替换过程中，如果替换模块失败，有什么回退机制吗？
模块热更新的错误处理，如果在热更新过程中出现错误，热更新将回退到刷新浏览器

面试题：说一下webpack的热更新原理？
webpack通过watch可以监测代码的变化；webpack-dev-middleware可以调用webpack暴露的API检测代码变化，并且告诉webpack将代码保存到内存中；webpack-dev-middleware通过sockjs和webpack-dev-server/client建立webSocket长连接，将webpack打包阶段的各个状态告知浏览器端，最重要的是新模块的hash值。webpack-dev-server/client通过webpack/hot/dev-server中的HMR去请求新的更新模块，HMR主要借助JSONP。先拿到hash的json文件，然后根据hash拼接出更新的文件js，然后HotModulePlugin对比新旧模块和模块依赖完成更新。

## webpack构建流程

Webpack的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

初始化参数：从配置文件和Shell语句中读取与合并参数，得出最终的参数
开始编译：用上一步得到的参数初始化Compiler对象，加载所有配置的插件，执行对象的run方法开始执行编译
确定入口：根据配置中的entry找出所有的入口文件
编译模块：从入口文件出发，调用所有配置的Loader对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
完成模块编译：在经过第4步使用Loader翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的Chunk，再把每个Chunk转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

在以上过程中，Webpack会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用Webpack提供的API改变Webpack的运行结果。

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

webpack实现tree shaking有两种方案：
usedExports: 通过标记某些函数是否被使用，之后通过Terser来进行优化
sideEffects: 跳过整个模块/文件，直接查看该文件是否有副作用

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

1.静态分析：对所有模块的依赖关系进行静态分析，会构建出一个依赖图，其中包括各个模块之间的依赖关系
2.标记未使用的代码：在分析期间，webpack会通过识别导入语句和变量是否被引用，从而判断出是否被使用，如果一个导出模块在整个应用程序中都没有被引用，那么这个模块就会被标记为未使用
3.生成输出文件，webpack会根据标记的结果生成最终的一个输出文件，在输出的文件中被标记为未使用的代码最终会被删除

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

## Babel原理

Babel是一个流行的用于将新版本ES6+代码转换为向后兼容版本（ES5）代码的JavaScript编译器。它还为JSX语法提供了编译支持，还有一些其他插件可用于转换特定类型的代码。

解析
当Babel接收到源代码时，将会调用一个叫做解析器的工具，用于将源代码转换为抽象语法树（AST）。在这个过程中，解析器会识别代码中的语法结构，并将其转换为对应的节点类型。例如，当解析器遇到一个变量声明语句时，它将会创建一个 “VariableDeclaration” 节点，并将该节点的信息存储在AST中。AST是一个以节点为基础组成的树形结构，每个节点都有相应的类型、属性和子节点等信息。

转换
一旦AST被创建，Babel将遍历整个树形结构，对每个节点进行转换。这些转换可以是插件、预设或手动创建的。转换器会检查AST中的每个节点，然后对其进行相应的修改或替换，以将新语法转换为旧语法。 例如，如果Babel遇到一个包含箭头函数的节点，而你已经启用了转换插件，该插件将会将箭头函数转换为其等效的体函数。代码转换后，Babel将会生成一个新的AST。

生成
最后，Babel将基于转换后的AST生成代码文本。在这个步骤中，Babel将遍历转换后的AST，并创建对应的代码字符串，并将这些字符串组合成一个完整的JavaScript文件。如果启用了代码压缩，Babel还可以将生成的代码进行压缩。总结来说，Babel的原理就是将JavaScript源代码转换为抽象语法树（AST），然后对AST进行转换，生成与源代码功能相同但向后兼容的代码。Babel提供了一个强大的生态系统，使得开发者可以轻松扩展并自定义转换器，实现自己的功能需求。

简化版：
解析：将代码转换成AST
词法分析：将代码(字符串)分割为token流，即语法单元成的数组
语法分析：分析token流(上面生成的数组)并生成AST

转换：访问AST的节点进行变换操作生产新的AST
Taro就是利用babel完成的小程序语法转换

生成：以新的AST为基础生成代码

## 为什么Vite比Webpack快？

Vite开发环境是基于esbuild构建的，生产环境是基于rollup构建的，当我们使用webpack启动项目时，webpack会根据我们的配置文件中的入口文件，分析出项目所有依赖关系，然后打包成一个文件，交给浏览器去加载渲染。而vite是基于现代浏览器对esmodule的支持，当用vite启动项目时，会使用esbuild进行预构建，将所有模块转换成es module，不需要对整个项目进行编译打包，而是在浏览器加载某个模块时，拦截浏览器发出的请求，根据请求按需加载，然后返回给浏览器

什么是预构建依赖？
预构建依赖通常指的是在项目启动或构建之前，对项目中所需的依赖项进行预先的处理或构建。这样做的好处在于，当项目实际运行时，可以直接使用这些已经预构建好的依赖，而无需再进行实时的编译或构建，从而提高了应用程序的运行速度和效率。

构建方式上：
webpack是基于nodejs运行的，js是单线程，无法利用多核CPU的优势，当项目越来越大时，构建速度就越来越慢了；
vite预构建和按需编译的过程，都是基于esbuild完成的，esbuild是用go语言编写的，可以充分利用多核CPU的优势，所以vite更快

http2:
vite利用http2多路复用，可以并发请求的优势

热更新：
webpack每次更改代码，都会重新整体打包，尽管有缓存，大型项目还是比较慢
vite监听到文件变更后，利用websocket通知浏览器，重新发起新的请求，只对该模块重新编译然后热替换

## vite生产环境下，为什么使用rollup打包呢？

Rollup是一款ES Module打包器， 从作用上来看，Rollup与Webpack非常类似。不过相比于Webpack，Rollup要小巧的多，打包生成的文件更小。因为小巧，自然在这种特定的打包环境下，Rollup的打包速度也要比Webpack快很多。vite正是基于es module的特性实现的，所以使用rollup要更合适一些。

## vite生产环境下，为什么不用esbuild打包呢？

尽管esbuild的打包速度比rollup更快，但 Vite 目前的插件API与使用 esbuild作为打包器并不兼容，rollup插件api与基础建设更加完善，所以在生产环境vite使用rollup打包会更稳定一些。
如果后面esbuild基础建设与生态更加完善后，esbuild还是更有优势的。
所以使用vite可能会带来开发环境与生产环境打包结果不一致的问题。

## webpack与vite的使用成本？

webpack
如果我们使用webpack自己去搭建项目脚手架时，需要配置比较多的东西， 比如：跨域、代码压缩、代码分割、css预处理器的代码转换、样式兼容性、vue/react代码解析、图片压缩、代码热更新、es降级、ts转换等等，远不止这些。
概念和配置项太多，我们需要了解各种loader、plugin的使用，并且需要根据项目场景，对配置不断进行优化，心智负担太大。
所以就出现了一些基于webpack上层封装的脚手架，如：vue-cli、create-react-app、umi等。

vite
vite对我们常用功能都做了内置，比如：css预处理器、html预处理器、hash命名、异步加载、分包、压缩、HMR等等，我们可以很轻松的通过配置项去配置。
并且vite官方也提供了一些官方模板、社区模板，我们可以快速地创建出一个带有最佳预设项目，不需要关心太多的配置项。

## 参考

[webpack热更新原理](https://juejin.cn/post/7152845665477869582?searchId=202407171441107B631F6471FADB26ED99)
[一文了解Webpack热更新(HMR)原理](https://juejin.cn/post/7300118821531942927?searchId=202407171419393CEE50881EE03D040614)
[2024前端高频面试题之-- 前端工程化篇](https://juejin.cn/post/7350535815132659749?searchId=20240922194743D592541764F686D37EBA)
[「吐血整理」再来一打Webpack面试题](https://juejin.cn/post/6844904094281236487?searchId=20240922194743D592541764F686D37EBA#heading-5)
