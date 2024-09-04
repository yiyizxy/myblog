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
React18全面开启并发模式，使得React能够同时准备多个版本的UI，并且能够在渲染过程中中断、恢复、中止或插入高优先级的任务。可以显著提升应用的响应性和性能。
新的根节点挂载方式：引入ReactDOM.createRoot()来替代ReactDOM.render()创建根元素进行渲染。使用createRoot()会自动启用并发模式，而render()则保留为旧版模式的入口。

- 新的API和Hooks
startTransition：一个新的API，用于将某些状态更新标记为可以延迟的非紧急更新。这对于优化长时间运行的任务（如数据加载）特别有用，因为它允许React在渲染这些更新之前优先处理用户的交互。
useTransition：一个与startTransition对应的Hook，用于在函数组件中更方便地控制过渡更新的状态。它返回一个包含挂起状态标志（isPending）和启动过渡的函数（类似于startTransition）的数组。
useDeferredValue：一个Hook，用于获取一个值的“延迟”版本，该值通过过渡任务得到。这对于在输入时延迟更新某些非紧急状态特别有用，可以减少不必要的渲染，提高性能。
useId：一个新的Hook，用于生成在客户端和服务端两侧都独一无二的ID，避免在服务器渲染的应用中由于内容不匹配导致的错误。
useSyncExternalStore：一个允许使用第三方状态管理库来支持并发模式的Hook。它消除了对useEffect的依赖，使得状态管理更加高效和灵活。
useInsertionEffect：一个供CSS-in-JS库使用的Hook，用于在DOM变更发生后但在布局计算之前注入样式，以解决性能问题。

- setState的异步和同步行为

默认异步更新：在React18中，setState默认以异步方式进行更新，这有助于减少不必要的重渲染并提高性能。但是，在某些情况下，你可能需要立即获取更新后的状态，这时可以使用flushSync方法来实现同步更新。
flushSync：一个方法，用于强制React以同步方式执行setState调用。但需要注意的是，使用flushSync可能会对性能产生影响，因此应谨慎使用。

- 自动批处理
React 17不会在事件处理程序之外进行批处理，比如不会在一个promise中合并处理setState
批处理是指，当React在一个单独的重渲染事件中批量处理多个状态更新以此实现优化性能。如果没有自动批处理的话，我们仅能够在React事件处理程序中批量更新。在React 18之前，默认情况下promise、setTimeout、原生应用的事件处理程序以及任何其他事件中的更新都不会被批量处理；但现在，这些更新内容都会被自动批处理：
从 React 18 开始createRoot，所有更新都将自动批处理，无论它们来自何处。
这意味着超时、promise、本机事件处理程序或任何其他事件内部的更新将以与 React 事件内部的更新相同的方式进行批处理。我们希望这会减少渲染工作，从而提高应用程序的性能：

- Suspense支持SSR

- 提供给第三方库的Hook

- 移除对IE浏览器的支持
React 18不再支持Internet Explorer（IE）浏览器。这是React团队为了推动现代Web开发并减少维护老旧浏览器的负担而做出的决定。

## React19

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

React的生命周期已经历经了3次改动，我们以最新的版本为准。
在16.3版本之前，constructor初始化之后是使用到是componentDidMount这个生命周期。
在16.3版本，后面发现componentDidMount这个函数有没有都没有区别，添加了getDerivedStateFromProps函数，影响的是挂载时和父组件更新时的生命周期函数。
16.4版本之后，getDeriveStateFromProps函数，影响的是挂载时和父组件和本身组件更新时的生命周期函数。

React16.4之后生命周期主要分为三个阶段：Mounting（组件挂载）、Updating（组件更新）、UnMounting（组件卸载）

### Mounting

constructor: 用于初始化组件的状态和进行方法绑定
getDerivedStateFromProps(nextProps, prevState): 第一个参数为即将更新的props，第二个参数为当前的state，用于将props中的信息映射到state中
render: 生成虚拟DOM
componentDidMount: 组件挂载到真实DOM后执行，该方法多用于一些数据获取，事件监听操作

### Updating

getDerivedStateFromProps(nextProps, prevState)
shouldComponentUpdate(nextProps, nextState)：用于判断是否要进行组件更新
render:生成虚拟DOM
getSnapshopBeforeUpdate(prevProps, prevState):组件已经完成diff，即将更新真实DOM，用户获取上一次的DOM快照。该函数必须搭配componentDidUpdate一块使用，返回值会变成componentDidUpdate第三个参数。
componentDidUpdate:组件更新完成，通常在该函数中进行副作用处理

### UnMounting

componentWillUnMount:用于组件卸载前，清理一些注册的监听事件等

## getDerivedStateFromProp使用

```js
import React from 'react';
class ExampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      derivedValue: props.initialValue,
    };
  }

// nextProps: 接下来的props, prevState: 当前的state
  static getDerivedStateFromProps(nextProps, prevState) {
    // 当 props.initialValue 发生变化时，同步更新 state.derivedValue
    if (nextProps.initialValue !== prevState.derivedValue) {
      return {
        derivedValue: nextProps.initialValue,
      };
    }
    // 否则，不需要更新 state
    return null;
  }

  render() {
    return (
      <div>
        <p>Derived Value: {this.state.derivedValue}</p>
      </div>
    );
  }
}

export default ExampleComponent;
```

使用场景

1. 同步state和props：当组件的state需要根据props变化时，可以使用getDerivedStateFromProps来同步state和props。
2. 替代componentWillReceiveProps：React 16.3 之后，componentWillReceiveProps被标记为不推荐使用（deprecated），可以使用getDerivedStateFromProps作为替代。

## getSnapshotBeforeUpdate(prevProps, prevState)使用

```tsx
// 展示如何在组件更新之前获取滚动位置，并在更新后恢复滚动位置：
import React from 'react';

class ChatComponent extends React.Component {
  constructor(props) {
    super(props);
    this.messageEndRef = React.createRef();
  }

  // prevProps: 更新前的props, prevState: 更新前的state
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 如果消息列表发生变化，获取滚动位置
    if (prevProps.messages.length < this.props.messages.length) {
      const messageEnd = this.messageEndRef.current;
      return messageEnd ? messageEnd.scrollHeight - messageEnd.scrollTop : null;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 如果有快照，恢复滚动位置
    if (snapshot !== null) {
      const messageEnd = this.messageEndRef.current;
      if (messageEnd) {
        messageEnd.scrollTop = messageEnd.scrollHeight - snapshot;
      }
    }
  }
  render() {
    return (
      <div ref={this.messageEndRef} style={{ height: '300px', overflowY: 'scroll' }}>
        {this.props.messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    );
  }
}
export default ChatComponent;
```

## setState同步还是异步，setStat做了什么？

setState通常被认为是异步的，这意味着调用setState()时不会立刻改变react组件中state的值，多次setState函数调用产生的效果会合并。但是在promise、setTimeout、setInterval等定时器里变成了同步方法。
React18以后，使用了createRoot api后，所有setState都是异步批量执行的，但如果你需要在某些情况下强制同步执行setState（例如，在测试或特定性能敏感的场景中），你可以使用flushSync函数。flushSync是React 18引入的一个新API，它允许你将传递给它的回调函数中的setState调用视为一个单独的更新批次，并立即执行这些更新。

## Fiber架构

React 16引入了Fiber架构，这是一种全新的协调引擎，通过增量渲染（拆分成多个小任务执行）、优先级调度（确保高优先级任务快速响应）和可中断恢复（允许在任务之间暂停和恢复）等机制，提高了React的性能和响应速度，使其能够更高效地处理复杂和高频的用户交互。

背景：
在React 16之前，React的渲染过程是通过一个称为“Stack Reconciler”的递归过程来完成的。这个过程在大型项目或复杂组件树中可能导致性能问题，因为它会长时间占用浏览器的主线程，导致页面卡顿和用户体验下降。

Fiber架构的引入：

为了解决这些问题，React 16引入了Fiber架构。Fiber是一个将渲染工作分成多个小的工作单元（称为“Fiber”）的架构，这些工作单元可以在多个帧中执行。这种拆分使得React能够在工作单元之间暂停和恢复，从而避免长时间占用主线程。

主要特点：

增量渲染：Fiber将渲染工作分成多个小的工作单元，这些单元可以在多个帧中执行。由于分成了更小的任务单元，在这些任务单元之间可以停顿，从而允许浏览器执行其他任务，如用户输入或动画。
优先级调度：不同的任务根据其重要性被赋予不同的优先级。例如，用户输入等高优先级任务可以快速响应，而低优先级的任务（如数据获取）则可以在主线程空闲时执行。
恢复和暂停：React可以在处理完一个工作单元后中断，检查是否有更高优先级的任务需要处理。如果有，则优先处理高优先级任务；否则，继续处理剩余的渲染任务。

两阶段 & 两棵树：

调度阶段（Reconciliation Phase） ：在这一阶段，React会计算需要更新的组件和对应的状态变更。这个阶段是可以被中断的，React会根据优先级逐步处理更新任务。
提交阶段（Commit Phase） ：一旦调度阶段完成，提交阶段会将更新应用到实际的DOM中。这个阶段是同步的，React会确保所有的DOM变更在一次帧内完成。
两棵树：Fiber架构在内存中包含了两棵树，一棵是当前树（已经渲染完成的树），另一棵是工作树（Work-in-Progress Tree）。这两棵树互相替换进行状态的更新。

实现方式：
React重新设计了一种链表的vdom结构，每个节点称之为一个Fiber。每个Fiber包含了一些属性，如stateNode（状态节点）、child（子节点）、return（表示当前节点处理完毕后，应该向谁提交自己的成果，即effect list）、sibling（兄弟节点）等。这种链表结构使得每一个Fiber都可以访问到整棵树。

性能提升：
通过Fiber架构，React能够更好地处理复杂和高频的用户交互，减少页面卡顿，提升用户体验。特别是对于动画和交互频繁的应用场景，Fiber架构能够带来显著的性能提升。
综上所述，React 16引入的Fiber架构通过增量渲染、优先级调度、恢复和暂停等机制，实现了更细粒度的更新和高效的调度，从而提升了React的性能和用户体验。

## 什么是Fiber，Fiber解决了什么问题?

React15的StackReconcile方案由于递归不可中断问题，如果 Diff 时间过长（JS计算时间），会造成页面 UI 的无响应（比如输入框）的表现，vdom 无法应用到 dom 中。
为了解决这个问题，React16实现了新的基于requestIdleCallback的调度器（因为requestIdleCallback兼容性和稳定性问题，自己实现了polyfill），通过任务优先级的思想，在高优先级任务进入的时候，中断reconciler。为了适配这种新的调度器，推出了 FiberReconciler，将原来的树形结构（vdom）转换成 Fiber 链表的形式（child/sibling/return），整个Fiber的遍历是基于循环而非递归，可以随时中断。
更加核心的是，基于Fiber的链表结构，对于后续（React 17 lane 架构）的异步渲染和（可能存在的）worker计算都有非常好的应用基础

React 16引入了Fiber架构，这是一种全新的协调引擎，通过增量渲染（拆分成多个小任务执行）、优先级调度（确保高优先级任务快速响应）和可中断恢复（允许在任务之间暂停和恢复）等机制，提高了React的性能和响应速度，使其能够更高效地处理复杂和高频的用户交互。

增量渲染：Fiber将渲染工作分割成小的任务单元，能够在每一帧的时间内暂停和恢复渲染工作，从而不会阻塞浏览器的主线程，保证页面的交互性。
优先级调度：可以为不同的更新任务设置优先级，优先处理更紧急和重要的更新，例如用户交互相关的更新。
更高效的协调算法：通过新的算法更有效地对比新旧虚拟DOM，减少不必要的重新渲染，提高渲染性能。
从实现角度来看，Fiber 为每个组件创建了一个 Fiber 节点，这些节点形成了一个链表结构，包含组件的各种信息，如类型、属性、状态等，方便进行高效的更新和协调操作。
总之，Fiber 的引入极大地提升了 React 应用的性能和用户体验，使 React 能够更好地应对复杂和大规模的应用场景

## React中在哪捕获错误？

React中如果js代码错误会导致整个应用崩溃，这是不应该出现的现象。React16引入了错误边界的概念，错误边界是React组件，可以捕获发生在其子组件树任何位置的Javascript错误并且打印这些错误，同时展示降级UI，而不会渲染那些发生崩溃的子组件树。涉及错误边界的有2个生命周期方法：getDerivedStateFromError和componentDidCatch。getDerivedStateFromError方法接收错误对象作为参数，并返回一个更新后的state，用于决定组件要渲染的内容，通常是一个错误提示界面。
componentDidCatch方法接收错误对象和错误信息对象作为参数，可以在此执行一些诸如日志记录、错误报告等额外的操作

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
​
  static getDerivedStateFromError(error) {
    // 更新state使下一次渲染能够显示降级后的UI
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
///异步代码（例如setTimeout或requestAnimationFrame回调函数）
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

React基于浏览器的事件机制实现了一套自身的事件机制，包括事件触发、事件冒泡、事件捕获、事件合成和事件派发等，叫做React的合成事件。React上所有的事件都挂载在document对象上，React17以后事件绑定在container上，ReactDOM.render(app,container)。

设计动机

1. 底层磨平不同浏览器的差异：React实现了统一的事件机制，不再需要处理浏览器事件机制方面的兼容问题
2. 优化性能：比如利用事件委托机制，大部分事件最终绑定到了Document，而不是DOM节点本身. 这样简化了DOM事件处理逻辑，减少了内存开销。
3. React想对事件进行调度：react16引入Fiber架构，React 可以通过干预事件的分发以优化用户的交互体体验。

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

Refs是React提供给我们的安全访问DOM元素或者某个组件实例的句柄。我们可以为元素添加ref属性然后在回调函数中接受该元素在DOM树中的句柄，该值会作为回调函数的第一个参数返回：

```tsx
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

上述代码中的input域包含了一个ref属性，该属性声明的回调函数会接收input对应的DOM元素，我们将其绑定到 this 指针以便在其他的类函数中使用。
另外值得一提的是，refs并不是类组件的专属，函数式组件同样能够利用闭包暂存其值：

```tsx
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
3. 组件中引入.module.css文件，将css文件作为一个模块引入，这个模块中的所有css只作用于当前组件，使用styles.className语法应用样式，需要webpack配置文件中`module:true`。
缺点
样式的引入，类名不能使用连接符(xxx-xxx)
className只支持{styles.className}这种形式
不方便动态修改样式
4. css-in-js：指的是css是有js生成的，一般由第三方库提供，例如`styled-components`

![css-in-js优缺点](./assets/react/css-in-jss.png "css-in-js优缺点")

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
// css-in-js
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

1.减少不必要的渲染

- 优化shouldComponentUpdate或PureComponent：对于类组件，可以通过实现shouldComponentUpdate方法或继承PureComponent来避免不必要的重新渲染。这些方法通过比较 props和state的变化来决定是否需要重新渲染组件。
- 使用React.memo:对于函数组件，可以使用React.memo进行包裹，它仅对props进行浅比较，如果props没有变化，则不会重新渲染组件。
- 使用React.useCallback: 绑定函数以避免不必要的重复定义。
- 使用React.useMemo: 记住计算过的值。

2.列表渲染优化

- 使用唯一的key属性：在列表渲染时，为每个列表项指定一个唯一的key属性，帮助React识别每个元素的身份，减少重复渲染和操作的开销。
- 虚拟列表：对于大量数据的列表，可以使用虚拟列表技术（如react-window或react-virtualized），只渲染可视区域内的列表项，以提高渲染性能和滚动性能。

3.懒加载、代码分割、Tree shaking

- 懒加载组件：对于非首屏加载就需要的组件，可以使用懒加载技术（如React.lazy和Suspense），按需加载它们，减少初始渲染体积和提高首屏加载速度。
- 代码分割：通过Webpack等构建工具实现代码分割，将应用拆分成多个小块，根据需要加载对应的代码块。
- Tree shaking

4.合理使用状态管理

- 选择合适的状态管理库：根据项目的规模和复杂度，选择合适的状态管理库（如Redux、MobX或Context API）。
- 避免不必要的全局状态：尽量保持组件的状态局部化，减少不必要的全局状态管理，以降低应用的复杂度和提升性能。

5.优化事件处理

- 避免在render方法中绑定事件处理函数：在render方法中绑定事件处理函数会导致每次渲染时都创建新的函数实例，从而增加内存使用和性能开销。可以将事件处理函数定义在组件外部或作为类成员方法。

6.使用React的并发模式（Concurrent Mode）

- 优先级调度和递增式渲染：并发模式通过引入优先级调度和递增式渲染等机制，使得React可以更好地管理和分配任务，以实现更平滑的用户体验。
- 使用useTransition和useDeferredValue：这两个Hooks可以帮助开发者更好地控制任务的优先级和延迟非紧急任务的执行，以优化应用的响应性和性能。

7.其他优化策略

- 减少组件嵌套：避免过深的组件嵌套，以降低diff算法的复杂度和渲染时间。
- 选择合适的第三方库和插件：避免引入过多冗余的库和插件，以减少性能开销。
- 使用生产环境构建：确保在部署到生产环境时使用了React的生产版本，它会进行代码压缩和性能优化。

8.使用React Fragments避免额外标记：`<></>`
9.事件绑定方式: 事件绑定有4种方式，具体可参考前面，建议采用constructor中绑定以及箭头函数绑定两种方式
10.使用Immutable
11.服务端渲染

## 常见的代码分割方式有哪些？

- 使用动态import：通过在组件内部使用动态import语句来按需加载模块。
- 使用React Router的路由懒加载（React.lazy）：在配置路由时，可以将路由对应的组件设置为懒加载，必须和suspense配合使用。 例如：

```jsx
import {Route} from "react-router-dom"
import React,{Suspense} from "react"
const HomeView = React.lazy(()=>import("./home"))
const App = ()=> {
 return (
     <div>
         <h1>路由懒加载</h1>
         <Route path="/" exact render={()=>{
                 return (
                 <Suspense fallback={<div>组件Loading进来之前的占位内容</div>}>
                         <HomeView/>
                 </Suspense>
                 )
             }} />
     </div>
 )
}
export default App

```

## React Portals是什么？

React Portals是React提供的一种将子节点渲染到DOM节点树中的不同位置的技术。通过Portals，可以将子组件渲染到父组件DOM层次结构之外的DOM节点中，这在处理模态框、工具提示和弹出菜单等场景时非常有用

```jsx
// child:要渲染的子节点、container:渲染子节点的目标DOM容器
ReactDOM.createPortal(child, container)
```

## react 中组件销毁时会自动回收ref么？

在React中，组件销毁时并不会自动回收ref。ref是一个特殊的属性，用于引用组件实例或DOM元素，在组件销毁时，ref引用的对象并不会自动被销毁，而是需要手动进行清理操作。

## 参考

[React系列面试题](https://juejin.cn/post/7395866537495134271?searchId=20240831144828E107E3A667816E018A4D)
[参考](https://juejin.cn/post/7349971654590857216)
[一文带你梳理React面试题（2023年版本）](https://juejin.cn/post/7182382408807743548)


script start
async1 start
async2
promise1
script end
