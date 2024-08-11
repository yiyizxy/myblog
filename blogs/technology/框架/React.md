---
title: React
date: 2024/07/22
tags:
 - 框架
categories:
 - 框架
---

## React18有哪些更新

- 并发模式
- 更新render API
- 自动批处理
- Suspense支持SSR
- startTransition
- useTransition
- useDeferredValue
- useId
- 提供给第三方库的Hook

## JSX是什么，它和JS有什么区别

JSX是JavaScript的语法糖，它允许在html中写JS，JS可以被打包工具直接编译，不需要额外转换，jsx需要通过babel编译，它是React.createElement的语法糖

JSX代码如下：

```js
<div className="sidebar" />
```

它转换为以下JS代码：

```js
document.createElement('div', {
    className: 'sidebar'
})
```

## 为什么在文件中没有使用react，也要在文件顶部`import React from “react”`

只要使用了jsx，就需要引用react，因为jsx本质就是React.createElement
***注意，在React 17RC版本后，jsx不一定会被转换为React.createElement**

```js
function App(){
    return <h1>hello,lyllovelemon</h1>
}    
```

```js
// react17将会通过编译器babel/typescript转换为
import {jsx as _jsx} from 'react/jsx-runtime';

function App() {
  return _jsx('h1', { children: 'hello,lyllovelemon' });
}
```

## 为什么React自定义组件首字母要大写

jsx通过babel转义时，调用了React.createElement函数，它接收三个参数，分别是type元素类型，props元素属性，children子元素。如果组件首字母为小写，它会被当成字符串进行传递，在创建虚拟DOM的时候，就会把它当成一个html标签，而html没有app这个标签，就会报错。组件首字母为大写，它会当成一个变量进行传递，React知道它是个自定义组件就不会报错了。

```js
<app>lyllovelemon</app>
// 转义后
React.createElement("app",null,"lyllovelemon")

<App>lyllovelemon</App>
// 转义后
React.createElement(App,null,lyllovelemon)
```

## React组件为什么不能返回多个元素，即React组件为什么只能有一个根元素？

## 生命周期

React16.4之后生命周期主要分为三个阶段：Mounting（组件挂载）、Updating（组件更新）、UnMounting（组件卸载）

### Mounting

constructor，实例过程中自动调用的方法，在方法内部通过super关键字获取来自父组件的props，在该方法中，通常的操作为初始化state或者在this上挂载方法
getDerivedStateFromProps：第一个参数为即将更新的props，第二个参数为上一个状态state，可以比较两者数据做一些操纵
render: 用于渲染DOM，可以访问组件的state和prop属性
componentDidMount: 组件挂载到真实DOM后执行，该方法多用于一些数据获取，事件监听操作

### Updating

getDerivedStateFromProps
shouldComponentUpdate
render
getSnapshopBeforeUpdate
componentDidMount

### UnMounting

componentWillUnMount:用于组件卸载前，清理一些注册的监听事件等

## React事件机制和原生DOM事件流有什么区别

## setState同步还是异步，setStat做了什么？

在React中，setState()函数通常被认为是异步的，这意味着调用setState()时不会立刻改变react组件中state的值，setState通过触发一次组件的更新来引发重汇，多次setState函数调用产生的效果会合并。调用setState时，React会做的第一件事情是将传递给setState的对象合并到组件的当前状态。这将启动一个称为和解（reconciliation）的过程。和解（reconciliation）的最终目标是以最有效的方式，根据这个新的状态来更新UI。 为此，React将构建一个新的 React元素树（您可以将其视为 UI 的对象表示）。一旦有了这个树，为了弄清 UI 如何响应新的状态而改变，React 会将这个新树与上一个元素树相比较

React17 legacy下只执行一次，但是如果在settimeout里执行会执行多次

在组件生命周期或者React合成事件中，setState是异步的，另外，如果对同一个值进行对此setState，会覆盖，取最后一次执行的结果
在setTimeout或者原生Dom中，setState是同步的，以上情况不会覆盖

## 什么是fiber，fiber解决了什么问题

React15 的 StackReconciler 方案由于递归不可中断问题，如果 Diff 时间过长（JS计算时间），会造成页面 UI 的无响应（比如输入框）的表现，vdom 无法应用到 dom 中。
为了解决这个问题，React16 实现了新的基于 requestIdleCallback 的调度器（因为 requestIdleCallback 兼容性和稳定性问题，自己实现了 polyfill），通过任务优先级的思想，在高优先级任务进入的时候，中断 reconciler。
为了适配这种新的调度器，推出了 FiberReconciler，将原来的树形结构（vdom）转换成 Fiber 链表的形式（child/sibling/return），整个 Fiber 的遍历是基于循环而非递归，可以随时中断。
更加核心的是，基于 Fiber 的链表结构，对于后续（React 17 lane 架构）的异步渲染和 （可能存在的）worker 计算都有非常好的应用基础

## React中在哪捕获错误？

React中如果js代码错误会导致整个应用崩溃，这是不应该出现的现象。React16引入了错误边界的概念，错误边界是React组件，可以捕获发生在其子组件树任何位置的Javascript错误并且打印这些错误，同时展示降级UI，而不会渲染那些发生崩溃的子组件树。

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
​
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }
​
  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }
​
  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }
​
    return this.props.children; 
  }
}
```

```xml
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

```js
// 但是错误边界不会捕获：

try{}catch(err){}
///异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
///服务端渲染
///它自身抛出来的错误（并非它的子组件)
```

## React组件传值有哪些方式

- 父传子：props
- 子传父：通过在父组件引入的子组件中传递一个函数并传参数，子组件去触发这个函数更改参数完成数据更新
- 跨多层组件传值：通过context api完成

## react中props和state有什么区别？

### 相同点

- 两者都是Javascript对象
- 两者都是用于保存信息
- props和state都能触发渲染更新

### 不同点

- props是外部传递给组件内部的数据，而state是在组件内被组件自己管理的，一般在constructor中初始化
- props在组件内部是不可修改的，但state在组件内部可以被修改

## super()和super(props)有什么区别？======待更新=====

在ES6中,通过extends关键字实现类的继承，方式如下：

```js
class Sup {
    constructor(name) {
        this.name = name; 
    }
    printName() {
        console.log(this.name);
    }
  
class Sub extends Sup { 
    constructor(name, age) {
        super(name); // super代表的是父类的构造函数
        this.age = age;
    }
    printAge() {
        console.log(this.age);
    }
}
let jack = new sub("jack", 20);
jack.printName(); // jack
jack.printAge(); // 20
```

在上面的例子中，可以看到通过super关键字实现调用父类，super代替的是父类的构造函数，使用super(name) 相当于调用sup.prototype.constructor.call(this,name)，如果在子类中不使用super会引发报错，原因是子类没有自己的this对象，它只能继承父类的this对象，然后对其进行加工，

```js
 1
2
3
4 5} 6}
```

## react函数组件和class类组件的区别

- 编写形式：代码编写方式不一样，函数组件代码量较少，相比类组件更加简洁
- 状态管理：函数组件在hooks出来之前，不能保管组件的状态，不像类组件中调用setState，有了hooks后，可以用useState管理状态
- 生命周期：函数组件无生命周期，有了hooks后，实现了类似生命周期
- 调用方式：如果是一个函数组件，调用则就是执行函数，类组件需要将组件实例化，然后调用对象实例的render方法

## 受控组件和非受控组件有什么区别？

受控组件中，组件的状态全程响应外部数据
非受控制组件，组件内部存储自身的状态

## React事件机制

React基于浏览器的事件机制实现了一套自身的事件机制，包括事件触发、事件冒泡、事件捕获、事件合成和事件派发等，叫做React的合成事件。React上所有的事件都挂载在document对象上，React17以后事件绑定在container上,ReactDOM.render(app,container)。

设计动机

1. 在底层磨平不同浏览器的差异，React实现了统一的事件机制，不再需要处理浏览器事件机制方面的兼容问题
2. React把握了事件机制的主动权，实现了对所有事件的中心化管控
3. React引入事件池避免垃圾回收，在事件池中获取或释放事件对象，避免频繁的创建和销毁

合成事件的执行顺序

1. 当真实dom元素触发事件，会冒泡到document对象后，再处理React事件
2. 所以先执行原生事件，然后再处理React事件
3. 最后执行document上挂载的事件

## React怎么阻止事件冒泡

阻止合成事件的冒泡：`e.stopPropagation()`
阻止合成事件和最外层document事件冒泡： `e.nativeEvent.stopImmediatePropogation()`
阻止合成事件和除最外层document上的原生事件冒泡，通过判断e.target避免

```js
document.body.addEventListener('click',e=>{
  if(e.target && e.target.matches('div.stop')){
    return
  }
  this.setState({active:false})
})
```

## React中refs的作用是什么？

Refs 是 React 提供给我们的安全访问 DOM 元素或者某个组件实例的句柄。

我们可以为元素添加 ref 属性然后在回调函数中接受该元素在 DOM 树中的句柄，该值会作为回调函数的第一个参数返回：

```jsx
class CustomForm extends Component {
  handleSubmit = () => {
    console.log("Input Value: ", this.input.value)
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          ref={(input) => this.input = input} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
```

上述代码中的 input 域包含了一个 ref 属性，该属性声明的回调函数会接收 input 对应的 DOM 元素，我们将其绑定到 this 指针以便在其他的类函数中使用。
另外值得一提的是，refs 并不是类组件的专属，函数式组件同样能够利用闭包暂存其值：

```js
function CustomForm ({handleSubmit}) {
  let inputElement
  return (
    <form onSubmit={() => handleSubmit(inputElement.value)}>
      <input
        type='text'
        ref={(input) => inputElement = input} />
      <button type='submit'>Submit</button>
    </form>
  )
}
```

## React事件处理为什么要手动绑定this

react组件会被编译为React.createElement,在createElement中，它的this丢失了，并不是由组件实例调用的，因此���要手动绑定this
为什么不能通过return false阻止事件的默认行为
因为React基于浏览器的事件机制实现了一套自己的事件机制，和原生DOM事件不同，它采用了事件委托的思想，通过dispatch统一分发事件处理函数

## React diff原理

- 把树形结构按照层级分解，只比较同级元素。
- 列表结构的每个单元添加唯一的key属性，方便比较。
- React只会匹配相同class的component（这里面的class指的是组件的名字）
- 合并操作，调用component的setState方法的时候, React将其标记为dirty到每一个事件循环结束, React检查所有标记dirty的component重新绘制.
- 选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高diff的性能。

## 为什么虚拟dom会提高性能?

虚拟dom相当于在js和真实dom中间加了一个缓存，利用dom diff算法避免了没有必要的dom操作，从而提高性能。
具体实现步骤如下：
用JavaScript对象结构表示DOM树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了。

## React引入CSS方式

1. 在组件内直接使用
优点
内联样式，样式之间不会冲突
可以动态获取当前state中的状态
缺点
写法上都需要驼峰标识
某些样式没有显示
大量的样式，代码混乱
某些样式无法编写，例如伪类、伪元素
2. 组件中引入.css文件，缺点是样式全局生效，容易相互影响
3. 组件中引入.module.css文件，将css文件作为一个模块引入，这个模块中的所有css只作用于当前组件，使用 styles.className语法应用样式，需要webpack配置文件中`module:true`。
缺点
样式的引入，类名不能使用连接符(xxx-xxx)
className只支持{styles.className}这种形式
不方便动态修改样式
4. css-in-js：指的是css是有js生成的，一般由第三方库提供，例如`styled-components`

```jsx
// App.module.css
.title {
  color: blue;
  font-size: 24px;
}

// App.js
import React from 'react';
import styles from './App.module.css'; // 引入 CSS Module

function App() {
  return (
    <div className={styles.title}>
      <h1>Hello, React!</h1>
    </div>
  );
}

export default App;
```

```jsx
// App.js
import React from 'react';
import styled from 'styled-components'; // 引入 styled-components

const Title = styled.h1`
  color: blue;
  font-size: 24px;
`;

function App() {
  return (
    <div>
      <Title>Hello, React!</Title>
    </div>
  );
}

export default App;
```

## 如何提高组件的渲染效率？在React中如何避免不必要的渲染？

1. shouldComponentUpdate
2. 纯函数
3. React.memo
4. useMemo和useCallback

```js
class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // 仅当props或state发生变化时才重新渲染
    return nextProps.someValue !== this.props.someValue || nextState.someState !== this.state.someState;
  }

  render() {
    return <div>{this.props.someValue}</div>;
  }
}
```

```jsx
const MyComponent = React.memo((props) => {
  return <div>{props.someValue}</div>;
}, (prevProps, nextProps) => {
  // 仅当props发生变化时才重新渲染
  return prevProps.someValue === nextProps.someValue;
});
```

```jsx
import React, { useMemo, useCallback } from 'react';

const MyComponent = (props) => {
  const computedValue = useMemo(() => {
    // 仅在props.someValue变化时重新计算
    return expensiveComputation(props.someValue);
  }, [props.someValue]);

  const handleClick = useCallback(() => {
    // 仅在props.someValue变化时重新创建函数
    console.log(props.someValue);
  }, [props.someValue]);

  return (
    <div>
      {computedValue}
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

function expensiveComputation(value) {
  // 模拟一个耗时的计算
  return value * 2;
}

export default MyComponent;
```

## React性能优化手段？

1. shouldComponentUpdate
2. 纯函数
3. React.memo
4. 避免使用内联函数
5. 使用React Fragments避免额外标记：`<></>`
6. 懒加载组件: 利用webpack的代码拆分能力以及动态加载能力，减少初始包的大小，另外，React中使Suspense和lazy组件实现代码拆分
7. 事件绑定方式: 事件绑定有4种方式，具体可参考前面，建议采用constructor中绑定以及箭头函数绑定两种方式
8. 使用Immutable
9. 服务端渲染

## 参考

[参考](https://juejin.cn/post/7349971654590857216)
[](https://juejin.cn/post/7182382408807743548)

## TODO

1. 生命周期
