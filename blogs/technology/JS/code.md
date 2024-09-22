---
title: JavaScript编码相关
date: 2024/07/31
tags:
 - javascript
categories:
 - javascript
---

## 手写 Object.create

思路：将传入的对象作为原型

```js
function create(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
```

## 手写instanceof方法

instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。

实现步骤：

首先获取类型的原型
然后获得对象的原型
然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为 null，因为原型链最终为 null
具体实现：

```js
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left), // 获取对象的原型
      prototype = right.prototype; // 获取构造函数的 prototype 对象

  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;

    proto = Object.getPrototypeOf(proto);
  }
}
```

## new操作符的实现步骤

1. 创建一个对象
2. 将对象与构造函数通过原型链连接起来(也就是将对象的__proto__属性指向构造函数的prototype属性)
3. 构造函数的this绑定到新的对象上(也就是为这个对象添加属性和方法)
4. 返回新的对象(如果返回类型为原始值，则忽略，如果是对象，则正常处理)

```js
// 如果构造函数返回一个原始值，这个返回值无任何作用
function Test(name) {
    this.name = name
    return 1
}

const t = new Test('xxx')
console.log(t.name) // 'xxx'

// 如果构造函数返回一个对象，则返回值会被正常使用
function Test(name) {
    this.name = name
    console.log(this) // Test {name: 'xxx'}
    return {
        age: 26
    }
}
const t = new Test('xxx')
console.log(t) // {age: 26}
console.log(t.name) // 'undefined'
```

```js
// 手撕new操作符
function myNew(constructor, ...args) {
    // 1.创建一个新的空对象 
    const obj = {}
    // 2.将这个新对象的内部原型链接到构造函数的prototype对象  
    obj.__proto__ = constructor.prototype
    // 3.将这个新对象作为this上下文，并调用构造函数  
    let result = constructor.apply(obj, args)
    // 4.如果构造函数返回的是一个对象，则返回这个对象；否则返回新创建的对象
    return result instanceOf Object ? result : obj
}
```

## 手写Promise

三种状态： pending(进行中)、fulfilled(已成功)、rejected(已失败)
状态改变：PENDING -> FULFILLED、PENDING -> REJECTED
[一篇文章带你手写Promise以及all和race](https://juejin.cn/post/7338645700098490419?searchId=20240904113125B0E75B03417527EE1124)

```js
// promise使用
const promise = new Promise((resove, reject) => {
}).then((res) => {})
  .catch((error) => {
    // 支持多个promise的error冒泡
  }).finally(() => {
    // 无论promise状态如何，都会执行
  })
```

```js
// promise实现
const PENDING = "pending"
const RESOLVED = "resolved"
const REJECTED = "rejected"

class MyPromise {
    constructor(executor) {
        // 初始化状态为 pending
        this.status = PENDING
        // 初始化成功状态的值
        this.value = undefined
        // 初始化失败状态的值
        this.reason = undefined

        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        // 定义 resolve 函数
        const resolve = (value) => {
            if (this.status === PENDING) {
                // 更新状态为 resolved
                this.status = RESOLVED
                // 存储成功状态的值
                this.value = value
                // 执行所有成功状态的回调函数
                this.onResolvedCallbacks.forEach((func) => func())
            }
        }

        // 定义 reject 函数
        const reject = (reason) => {
            if (this.status === PENDING) {
                // 更新状态为 rejected
                this.status = REJECTED
                // 存储失败状态的值
                this.reason = reason
                // 执行所有失败状态的回调函数
                this.onRejectedCallbacks.forEach((func) => func())
            }
        }

        try {
            // 调用回调函数，将resolve和reject传递给它
            executor(resolve, reject)
        } catch(e) {
            reject(e)
        }
    }
    then(onResolved, onRejected) {
        // 如果onResolved是函数，则直接使用，否则默认为返回值不变的函数
        onResolved = typeof onResolved === "function" ? onResolved : (value) => value
        // 如果onRejected是函数，则直接使用，否则默认为抛出异常的函数
        onRejected =
            typeof onRejected === "function"
                ? onRejected
                : (reason) => {
                      throw reason
                  }
        // 返回一个新的Promise对象
        return new MyPromise((resolve, reject) => {
            if (this.status == RESOLVED) {
                try {
                    // 如果当前状态为resolved，则调用onResolved函数处理值
                    const x = onResolved(this.value)
                    resolve(x)
                } catch (error) {
                    // 如果onResolved函数抛出异常，则调用reject函数
                    reject(error)
                }
            }
            if (this.status == REJECTED) {
                try {
                    // 如果当前状态为rejected，则调用onRejected函数处理原因
                    const x = onRejected(this.reason)
                    resolve(x)
                } catch (error) {
                    // 如果onRejected函数抛出异常，则调用reject函数
                    reject(error)
                }
            }
            if (this.status == PENDING) {
                // 如果当前状态为pending，则将回调函数添加到对应的数组中
                this.onResolvedCallbacks.push(() => {
                    if (this.status == RESOLVED) {
                        try {
                            // 如果当前状态变为resolved，则调用onResolved函数处理值
                            const x = onResolved(this.value)
                            resolve(x)
                        } catch (error) {
                            // 如果onResolved函数抛出异常，则调用reject函数
                            reject(error)
                        }
                    }
                })
                this.onRejectedCallbacks.push(() => {
                    if (this.status == REJECTED) {
                        try {
                            // 如果当前状态变为rejected，则调用onRejected函数处理原因
                            const x = onRejected(this.reason)
                            resolve(x)
                        } catch (error) {
                            // 如果onRejected函数抛出异常，则调用reject函数
                            reject(error)
                        }
                    }
                })
            } else {
                // 执行完所有回调函数之后，清空回调数组
                this.onResolvedCallbacks = []
                this.onRejectedCallbacks = []
            }
        })
    }
    catch(onRejected) {
        // 等同于then(null, onRejected)
        return this.then(null, onRejected)
    }

    /**
     * 将多个Promise对象合并为一个新的Promise对象
     * @param {Array} promises - 包含多个Promise对象的数组
     * @returns {MyPromise} - 合并后的Promise对象
     */
    static all(promises) {
        return new MyPromise((resolve, reject) => {
            let resolvedCount = 0
            const values = new Array(promises.length)
            for (let i = 0; i < promises.length; i++) {
                if (!MyPromise.isPromise(promises[i])) {
                    reject(new TypeError("Expected a Promise"))
                    break
                }

                // 处理每个Promise
                promises[i].then(
                    (value) => {
                        resolvedCount++
                        values[i] = value

                        // 当所有Promise都成功时，resolve结果数组
                        if (resolvedCount === promises.length) {
                            resolve(values)
                        }
                    },
                    (reason) => {
                        // 只要有一个Promise失败，就reject整个Promise.all的结果
                        reject(reason)
                    }
                )
            }
        })
    }

    /**
     * 判断是否为Promise对象
     * @param {*} value - 待判断的对象
     * @returns {boolean} - 是否为Promise对象
     */
    static isPromise(value) {
        return (
            value instanceof MyPromise ||
            (typeof value === "object" && value !== null && typeof value.then === "function")
        )
    }
    /**
     * 执行一组Promise中的第一个完成（resolve或reject）的Promise
     * @param {Array} promises - Promise对象数组
     * @returns {MyPromise} - 新的Promise实例
     */
    static race(promises) {
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                if (!MyPromise.isPromise(promises[i])) {
                    reject(new TypeError("Expected a Promise"))
                    break
                }

                // 当任何一个Promise resolve或reject时，立即结束新Promise的状态
                promises[i].then(
                    (value) => {
                        resolve(value)
                    },
                    (reason) => {
                        reject(reason)
                    }
                )
            }
        })
    }
}
```

## 手写防抖函数

函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。

```js
function debounce(fn, wait) {
  let timer = null;

  return function() {
    const context = this,
        args = arguments;

    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
```

## 手写节流函数

函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。

```js
// 函数节流的实现;
function throttle(fn, delay) {
  let curTime = Date.now();

  return function() {
    let context = this,
        args = arguments,
        nowTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - curTime >= delay) {
      curTime = Date.now();
      return fn.apply(context, args);
    }
  };
}
```

```js
// 定时器实现方式
function throttle (func, delay) {
    let timeout 
    return function() {
        const context = this
        const args = arguments
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                func.apply(context, arguments)
            }, delay)
        }
    }
}
```

## 手写类型判断函数

```js
function getType(value) {
    // 判断数据是null的情况
    if (value === null) {
        return value + ""
    }
    // 判断数据是引用类型的情况
    if (typeof value === "object") {
        let valueClass = Object.prototype.toString.call(value),
            type = valueClass.split(" ")[1].split("")
        type.pop()
        return type.join("").toLowerCase()
    } else {
        // 判断数据是基本数据类型的情况和函数的情况
        return typeof value
    }
}
```

## 手写call函数

call函数的实现步骤：
判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用call等方式调用的情况。
判断传入上下文对象是否存在，如果不存在，则设置为 window 。
处理传入的参数，截取第一个参数后的所有参数。
将函数作为上下文对象的一个属性。
使用上下文对象来调用这个方法，并保存返回结果。
删除刚才新增的属性。
返回结果。

```js
// call函数实现
Function.prototype.myCall = function (context) {
    // 判断调用对象
    if (typeof this !== "function") {
        console.error("type error")
    }
    // 获取参数
    let args = [...arguments].slice(1),
        result = null
    // 判断context是否传入，如果未传入则设置为window
    context = context || window
    // 将调用函数设为对象的方法
    context.fn = this
    // 调用函数
    result = context.fn(...args)
    // 将属性删除
    delete context.fn
    return result
}
```

## 手写apply函数

apply函数的实现步骤：
判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用call等方式调用的情况。
判断传入上下文对象是否存在，如果不存在，则设置为window 。
将函数作为上下文对象的一个属性。
判断参数值是否传入
使用上下文对象来调用这个方法，并保存返回结果。
删除刚才新增的属性
返回结果

```js
// apply 函数实现
Function.prototype.myApply = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error")
  }
  let result = null
  // 判断 context 是否存在，如果未传入则为 window
  context = context || window
  // 将函数设为对象的方法
  context.fn = this
  // 调用方法
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  // 将属性删除
  delete context.fn;
  return result;
};
```

## 手写bind函数

bind函数的实现步骤：
判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用call等方式调用的情况。
保存当前函数的引用，获取其余传入参数值。
创建一个函数返回
函数内部使用apply来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。

```js
// bind 函数实现
Function.prototype.myBind = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 获取参数
  var args = [...arguments].slice(1),
      fn = this;
  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
};
```

## 函数柯里化实现

函数柯里化概念：柯里化（Currying）是把接受多个参数的函数转变为接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数的技术。

```js
function curry(fn) {
    return function curried (...args) {
      // 如果传入的参数数量达到原函数的参数数量，则直接调用原函数
        if (args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
        // 否则返回一个新的函数，继续接收参数
            return function (...moreArgs) {
                return curried.apply(this, args.concat(moreArgs))
            }
        }
    }
}
```

## 实现add(1)(2)(3)

```js
function add (x, y, z) {
  return x + y + z
}

const curriedAdd = curry(add)
console.log(curriedAdd(1)(2)(3))
```

## 实现AJAX请求

AJAX是Asynchronous JavaScript and XML的缩写，指的是通过JavaScript的异步通信，从服务器获取XML文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。
创建AJAX请求的步骤：

1. 创建一个XMLHttpRequest对象。
2. 在这个对象上使用open方法创建一个HTTP请求，open方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。
3. 在发起请求前，可以为这个对象添加一些信息和监听函数。比如说可以通过setRequestHeader方法来为请求添加头信息。还可以为这个对象添加一个状态监听函数。一个XMLHttpRequest对象一共有5个状态，当它的状态变化时会触发onreadystatechange 事件，可以通过设置监听函数，来处理请求成功后的结果。当对象的readyState变为4的时候，代表服务器返回的数据接收完成，这个时候可以通过判断请求的状态，如果状态是2xx或者304的话则代表返回正常。这个时候就可以通过response中的数据来对页面进行更新了。
当对象的属性和监听函数设置完成后，最后调用sent方法来向服务器发起请求，可以传入参数作为发送的数据体。

```js
const SERVER_URL = "/server";
let xhr = new XMLHttpRequest();
// 创建 Http 请求
xhr.open("GET", SERVER_URL, true,  'username[可选]', 'password[可选]');
// 设置状态监听函数
xhr.onreadystatechange = function() {
  if (this.readyState !== 4) return;
  // 当请求成功时
  if (this.status === 200) {
    handle(this.response);
  } else {
    console.error(this.statusText);
  }
};
// 设置请求失败时的监听函数
xhr.onerror = function() {
  console.error(this.statusText);
};
// 设置请求头信息
xhr.responseType = "json";
xhr.setRequestHeader("Accept", "application/json");
// 发送 Http 请求
xhr.send(null);

// xhr.readyState
// 0-尚未调用open
// 1-已调用open
// 2-已调用send
// 3-已接收请求返回数据
// 4-已完成请求
```

## 使用Promise封装AJAX请求

```js
// promise 封装实现：
function getJSON(url) {
  // 创建一个 promise 对象
  let promise = new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    // 新建一个 http 请求
    xhr.open("GET", url, true);
    // 设置状态的监听函数
    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return;
      // 当请求成功或失败时，改变 promise 的状态
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    // 设置错误监听函数
    xhr.onerror = function() {
      reject(new Error(this.statusText));
    };
    // 设置响应的数据类型
    xhr.responseType = "json";
    // 设置请求头信息
    xhr.setRequestHeader("Accept", "application/json");
    // 发送 http 请求
    xhr.send(null);
  });
  return promise;
}
```

## 实现日期格式化函数

```js
// 输入：
dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd') // 2020/12/01
dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd') // 2020/04/01
dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日') // 2020年04月01日
const dateFormat = (dateInput, format)=>{
    const day = dateInput.getDate() 
    const month = dateInput.getMonth() + 1  
    const year = dateInput.getFullYear()   
    format = format.replace(/yyyy/, year)
    format = format.replace(/MM/,month)
    format = format.replace(/dd/,day)
    return format
}
```

## 交换a,b的值，不能用临时变量

```js
// 巧妙的利用两个数的和、差：
a = a + b
b = a - b
a = a - b

// 解构
[b, a] = [a, b]
```

## 实现数组的乱序输出??

主要的实现思路就是：
取出数组的第一个元素，随机产生一个索引值，将该第一个元素和这个索引对应的元素进行交换。
第二次取出数据数组第二个元素，随机产生一个除了索引为1的之外的索引值，并将第二个元素与该索引值对应的元素进行交换
按照上面的规律执行，直到遍历完成

```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
for (var i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i
    ;[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
}
console.log(arr)

// 还有一方法就是倒序遍历：
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let length = arr.length,
    randomIndex,
    temp
while (length) {
    randomIndex = Math.floor(Math.random() * length--)
    temp = arr[length]
    arr[length] = arr[randomIndex]
    arr[randomIndex] = temp
}
console.log(arr)
```

## 实现数组元素求和

```js
// arr=[1,2,3,4,5,6,7,8,9,10]，求和
const arr=[1,2,3,4,5,6,7,8,9,10]
const sum = arr.reduce((total,i) => total += i,0);
console.log(sum);

// arr=[1,2,3,[[4,5],6],7,8,9]，求和
const arr=[1,2,3,[[4,5],6],7,8,9]
const sum= arr.toString().split(',').reduce((total,i) => total += Number(i),0);
console.log(arr);

// 递归实现：
let arr = [1, 2, 3, 4, 5, 6] 
function add(arr) {
    if (arr.length == 1) return arr[0] 
    return arr[0] + add(arr.slice(1)) 
}
console.log(add(arr)) // 21
```

## 实现数组的扁平化

1.递归实现

```js
const arr = [1, [2, [3, 4, 5]]]
function flatten(arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]))
        } else {
            result.push(arr[i])
        }
    }
    return result
}
flatten(arr) //  [1, 2, 3, 4，5]
```

2.reduce函数

```js
const arr = [1, [2, [3, 4]]]
function flatten(arr) {
    return arr.reduce(function(prev, next){
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}
console.log(flatten(arr)) //  [1, 2, 3, 4，5]
```

3.扩展运算符&&some

```js
const arr = [1, [2, [3, 4]]]
function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}
console.log(flatten(arr)) //  [1, 2, 3, 4，5]
```

4.split&&toString

```js
const arr = [1, [2, [3, 4]]]
function flatten(arr) {
  return arr.toString().split(',')
}
console.log(flatten(arr)) //  [1, 2, 3, 4，5]
```

5.ES6中的flat([depth])

```js
// depth默认为1
const arr = [1, [2, [3, 4]]]
function flatten(arr) {
  return arr.flat(Infinity)
}
console.log(flatten(arr)) //  [1, 2, 3, 4，5]
```

6.正则和JSON方法

```js
const arr = [1, [2, [3, [4, 5]]], 6]
function flatten(arr) {
  let str = JSON.stringify(arr)
  str = str.replace(/(\[|\])/g, '')
  str = '[' + str + ']'
  return JSON.parse(str)
}
console.log(flatten(arr)) //  [1, 2, 3, 4，5]
```

## 实现数组去重

给定某无序数组，要求去除数组中的重复数字并且返回新的无重复数组。

```js
// ES6方法（使用数据结构集合）：
const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];
Array.from(new Set(array)); // [1, 2, 3, 5, 9, 8]

// ES5方法：使用map存储不重复的数字
const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];
uniqueArray(array); // [1, 2, 3, 5, 9, 8]

function uniqueArray(array) {
  let map = {}
  let res = []
  for(let i = 0; i < array.length; i++) {
    if(!map.hasOwnProperty([array[i]])) {
      map[array[i]] = 1
      res.push(array[i])
    }
  }
  return res
}
```

## 实现数组的push方法

```js
let arr = []
Array.prototype._push = function() {
  for( let i = 0; i < arguments.length; i++){
    this[this.length] = arguments[i]
  }
  return this.length
}
```

## 实现数组的filter方法??

```js
Array.prototype._filter = function(fn) {
    if (typeof fn !== "function") {
        throw Error('参数必须是一个函数');
    }
    const res = [];
    for (let i = 0, len = this.length; i < len; i++) {
        fn(this[i]) && res.push(this[i]);
    }
    return res;
}
```

## 实现数组的map方法??

```js
Array.prototype._map = function(fn) {
   if (typeof fn !== "function") {
        throw Error('参数必须是一个函数');
    }
    const res = [];
    for (let i = 0, len = this.length; i < len; i++) {
        res.push(fn(this[i]));
    }
    return res;
}
```

## 实现字符串的repeat方法

```js
// 输入字符串s，以及其重复的次数，输出重复的结果，例如输入abc，2，输出abcabc。
function repeat(s, n) {
  console.log('====', new Array(n + 1))
    return (new Array(n + 1)).join(s);
}

repeat('abc', 2)
// 递归：
function repeat(s, n) {
    return (n > 0) ? s.concat(repeat(s, --n)) : "";
}
```

## 实现字符串翻转

```js
// 在字符串的原型链上添加一个方法，实现字符串翻转：
String.prototype._reverse = function (a) {
    return a.split("").reverse().join("")
}
var obj = new String()
var res = obj._reverse("hello")
console.log(res) // olleh
// 需要注意的是，必须通过实例化对象之后再去调用定义的方法，不然找不到该方法。
```

## 正则写13-15位大写字母或数字

```js
const pattern = /^[A-Z0-9]{13,15}$/
```

## 将数字每千分位用逗号隔开??

```js
// 数字有小数版本：
let format = n => {
    let num = n.toString() // 转成字符串
    let decimals = ''
        // 判断是否有小数
    num.indexOf('.') > -1 ? decimals = num.split('.')[1] : decimals
    let len = num.length
    if (len <= 3) {
        return num
    } else {
        let temp = ''
        let remainder = len % 3
        decimals ? temp = '.' + decimals : temp
        if (remainder > 0) { // 不是3的整数倍
            return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp
        } else { // 是3的整数倍
            return num.slice(0, len).match(/\d{3}/g).join(',') + temp 
        }
    }
}
format(12323.33)  // '12,323.33'

// 数字无小数版本：

let format = n => {
    let num = n.toString() 
    let len = num.length
    if (len <= 3) {
        return num
    } else {
        let remainder = len % 3
        if (remainder > 0) { // 不是3的整数倍
            return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') 
        } else { // 是3的整数倍
            return num.slice(0, len).match(/\d{3}/g).join(',') 
        }
    }
}
format(1232323)  // '1,232,323'
```

## 实现非负大整数相加??

JavaScript对数值有范围的限制，限制如下：

```js
Number.MAX_VALUE // 1.7976931348623157e+308
Number.MAX_SAFE_INTEGER // 9007199254740991
Number.MIN_VALUE // 5e-324
Number.MIN_SAFE_INTEGER // -9007199254740991
```

如果想要对一个超大的整数(> Number.MAX_SAFE_INTEGER)进行加法运算，但是又想输出一般形式，那么使用+是无法达到的，一旦数字超过 Number.MAX_SAFE_INTEGER数字会被立即转换为科学计数法，并且数字精度相比以前将会有误差。

实现一个算法进行大数的相加：

```js
function sumBigNumber(a, b) {
    let res = ""
    let temp = 0

    a = a.split("")
    b = b.split("")

    while (a.length || b.length || temp) {
        temp += ~~a.pop() + ~~b.pop()
        res = (temp % 10) + res
        temp = temp > 9
    }
    return res.replace(/^0+/, "")
}
```

其主要的思路如下：
首先用字符串的方式来保存大数，这样数字在数学表示上就不会发生变化
初始化res，temp来保存中间的计算结果，并将两个字符串转化为数组，以便进行每一位的加法运算
将两个数组的对应的位进行相加，两个数相加的结果可能大于10，所以可能要仅为，对10进行取余操作，将结果保存在当前位
判断当前位是否大于9，也就是是否会进位，若是则将temp赋值为true，因为在加法运算中，true会自动隐式转化为1，以便于下一次相加
重复上述操作，直至计算结束

## 什么是类数组

类数组对象是指具有类似数组的特性，但不完全是数组的对象。类数组对象通常具有以下特征：
有一个length属性：用于表示对象中元素的数量。
可以通过索引访问元素：例如 obj[0]、obj[1] 等。
尽管类数组对象看起来像数组，但它们并不具备数组的所有方法（如 push、pop、forEach 等）。常见的类数组对象包括函数的参数对象（arguments）、DOM 方法返回的结果（如 NodeList、HTMLCollection）、以及字符串等。

## 实现类数组转化为数组

1.通过call调用数组的slice方法来实现转换

```js
// `Array.prototype.slice.call(arrayLike)`
function example() {
    const argsArray = Array.prototype.slice.call(arguments)
    console.log(argsArray) // 输出: 数组
}
example(1, 2, 3) // 示例调用
```

2.通过call调用数组的splice方法来实现转换
`Array.prototype.splice.call(arrayLike, 0)`

3.通过apply调用数组的concat方法来实现转换
`Array.prototype.concat.apply([], arrayLike)`

4.通过Array.from方法来实现转换

```js
// `Array.from(arrayLike)`
const nodeList = document.querySelectorAll('div');
const array = Array.from(nodeList);
console.log(array); // 输出: 数组
```

## 将js对象转化为树形结构

```js
// 转换前：
const source = [
    {
        id: 1,
        pid: 0,
        name: "body"
    },
    {
        id: 2,
        pid: 1,
        name: "title"
    },
    {
        id: 3,
        pid: 2,
        name: "div"
    }
]
// 转换为:
const tree = [
    {
        id: 1,
        pid: 0,
        name: "body",
        children: [
            {
                id: 2,
                pid: 1,
                name: "title",
                children: [
                    {
                        id: 3,
                        pid: 1,
                        name: "div",
                    }
                ]
            }
        ]
    }
]
```

代码实现

```js
function jsonToTree(data) {
    // 初始化结果数组，并判断输入数据的格式
    let result = []
    if (!Array.isArray(data)) {
        return result
    }
    // 使用map，将当前对象的id与当前对象对应存储起来
    let map = {}
    data.forEach((item) => {
        map[item.id] = {
          ...item,
          children: []
        }
    })
    data.forEach((item) => {
        if (item.pid) {
            if (map[item.pid]) {
                map[item.pid].children.push(map[item.id]);
            }
        } else {
            result.push(map[item.id])
        }
    })
    return result
}
```

## 解析URL Params为对象

```js
const url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'
parseParam(url)
/* 结果
{ user: 'anonymous',
  id: [123, 456], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得key约定为true
}
*/
function parseParam(url) {
    const paramsStr = /.+\?(.+)$/.exec(url)[1] // 将?后面的字符串取出来
    const paramsArr = paramsStr.split("&") // 将字符串以&分割后存到数组中
    let paramsObj = {}
    // 将 params 存到对象中
    paramsArr.forEach((param) => {
        if (/=/.test(param)) {
            // 处理有 value 的参数
            let [key, val] = param.split("=") // 分割 key 和 value
            val = decodeURIComponent(val) // 解码
            val = /^\d+$/.test(val) ? parseFloat(val) : val // 判断是否转为数字
            if (paramsObj.hasOwnProperty(key)) {
                // 如果对象有key，则添加一个值
                paramsObj[key] = [].concat(paramsObj[key], val)
            } else {
                // 如果对象没有这个key，创建 key 并设置值
                paramsObj[key] = val
            }
        } else {
            // 处理没有 value 的参数
            paramsObj[param] = true
        }
    })
    return paramsObj
}
```

## 循环打印红黄绿

下面来看一道比较典型的问题，通过这个问题来对比几种异步编程方法：红灯3s亮一次，绿灯1s亮一次，黄灯2s亮一次；如何让三个灯不断交替重复亮灯？

```js
// 三个亮灯函数
function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}
```

1.用callback实现

```js
const task = (timer, light, callback) => {
    setTimeout(() => {
        if (light === 'red') {
            red()
        }
        else if (light === 'green') {
            green()
        }
        else if (light === 'yellow') {
            yellow()
        }
        callback()
    }, timer)
}
const step = () => {
    task(3000, 'red', () => {
        task(2000, 'green', () => {
            task(1000, 'yellow', step)
        })
    })
}
step()
```

2.用promise实现

```js
const task = (timer, light) => 
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (light === 'red') {
                red()
            }
            else if (light === 'green') {
                green()
            }
            else if (light === 'yellow') {
                yellow()
            }
            resolve()
        }, timer)
    })
const step = () => {
    task(3000, 'red')
        .then(() => task(2000, 'green'))
        .then(() => task(2100, 'yellow'))
        .then(step)
}
step()
// 这里将回调移除，在一次亮灯结束后，resolve当前promise，并依然使用递归进行。
```

3.用async/await实现

```js
const task = async (timer, light) => {
  setTimeout(() => {
            if (light === 'red') {
                red()
            }
            else if (light === 'green') {
                green()
            }
            else if (light === 'yellow') {
                yellow()
            }
        }, timer)

}
const taskRunner =  async () => {
    await task(3000, 'red')
    await task(2000, 'green')
    await task(2100, 'yellow')
    taskRunner()
}
taskRunner()
```

## 实现每隔一秒打印1,2,3,4

```js
// 使用闭包实现
for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i)
    }, i * 1000)
  })(i)
}
// 使用 let 块级作用域
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i)
  }, i * 1000)
}
```

## 用Promise实现图片的异步加载

```js
const imageAsync = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = url
        img.οnlοad = () => {
            console.log(`图片请求成功，此处进行通用操作`)
            resolve(image)
        }
        img.οnerrοr = (err) => {
            console.log(`失败，此处进行失败的通用操作`)
            reject(err)
        }
    })
}

imageAsync("url")
    .then(() => {
        console.log("加载成功")
    })
    .catch((error) => {
        console.log("加载失败")
    })
```

## 实现发布-订阅模式

```js
class EventCenter{
    // 1. 定义事件容器，用来装事件数组
    let handlers = {}
  
    // 2. 添加事件方法，参数：事件名 事件方法
    on(type, handler) {
      // 创建新数组容器
      if (!this.handlers[type]) {
        this.handlers[type] = []
      }
      // 存入事件
      this.handlers[type].push(handler)
    }
  
    // 3. 触发事件，参数：事件名 事件参数
    emit(type, params) {
      // 若没有注册该事件则抛出错误
      if (!this.handlers[type]) {
        return new Error('该事件未注册')
      }
      // 触发事件
      this.handlers[type].forEach(handler => {
        handler(...params)
      })
    }
  
    // 4. 事件移除，参数：事件名 要删除事件，若无第二个参数则删除该事件的订阅和发布
    off(type, handler) {
      if (!this.handlers[type]) {
        return new Error('事件无效')
      }
      if (!handler) {
        // 移除事件
        delete this.handlers[type]
      } else {
        const index = this.handlers[type].findIndex(el => el === handler)
        if (index === -1) {
          return new Error('无该绑定事件')
        }
        // 移除事件
        this.handlers[type].splice(index, 1)
        if (this.handlers[type].length === 0) {
          delete this.handlers[type]
        }
      }
    }
  }
```

## 查找文章中出现频率最高的单词??

```js
function findMostWord(article) {
    // 合法性判断
    if (!article) return
    // 参数处理
    article = article.trim().toLowerCase()
    let wordList = article.match(/[a-z]+/g),
        visited = [],
        maxNum = 0,
        maxWord = ""
    article = " " + wordList.join("  ") + " "
    // 遍历判断单词出现次数
    wordList.forEach(function (item) {
        if (visited.indexOf(item) < 0) {
            // 加入 visited
            visited.push(item)
            let word = new RegExp(" " + item + " ", "g"),
                num = article.match(word).length
            if (num > maxNum) {
                maxNum = num
                maxWord = item
            }
        }
    })
    return maxWord + "  " + maxNum
}
```

## 封装异步的fetch，使用async await方式来使用??

```js
(async () => {
    class HttpRequestUtil {
        async get(url) {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
        async post(url, data) {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            return result;
        }
        async put(url, data) {
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            });
            const result = await res.json();
            return result;
        }
        async delete(url, data) {
            const res = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            });
            const result = await res.json();
            return result;
        }
    }
    const httpRequestUtil = new HttpRequestUtil();
    const res = await httpRequestUtil.get('http://golderbrother.cn/');
    console.log(res);
})()
```

## 实现prototype继承??

```js
// 所谓的原型链继承就是让新实例的原型等于父类的实例：

//父方法
function SupperFunction(flag1){
    this.flag1 = flag1;
}
//子方法
function SubFunction(flag2){
    this.flag2 = flag2;
}
//父实例
var superInstance = new SupperFunction(true);
//子继承父
SubFunction.prototype = superInstance;
//子实例
var subInstance = new SubFunction(false);
//子调用自己和父的属性
subInstance.flag1;   // true
subInstance.flag2;   // false
```

## 实现双向数据绑定??

```js
let obj = {}
let input = document.getElementById("input")
let span = document.getElementById("span")
// 数据劫持
Object.defineProperty(obj, "text", {
    configurable: true,
    enumerable: true,
    get() {
        console.log("获取数据了")
    },
    set(newVal) {
        console.log("数据更新了")
        input.value = newVal
        span.innerHTML = newVal
    },
})
// 输入监听
input.addEventListener("keyup", function (e) {
    obj.text = e.target.value
})
```

## 实现简单路由??

```js
// hash路由
class Route {
    constructor() {
        // 路由存储对象
        this.routes = {}
        // 当前hash
        this.currentHash = ""
        // 绑定this，避免监听时this指向改变
        this.freshRoute = this.freshRoute.bind(this)
        // 监听
        window.addEventListener("load", this.freshRoute, false)
        window.addEventListener("hashchange", this.freshRoute, false)
    }
    // 存储
    storeRoute(path, cb) {
        this.routes[path] = cb || function () {}
    }
    // 更新
    freshRoute() {
        this.currentHash = location.hash.slice(1) || "/"
        this.routes[this.currentHash]()
    }
}
```

## 实现斐波那契数列

```js
// leetcode 509
function fib(n) {
  let dp = new Array(n + 1).fill(0)
  dp[0] = 0, dp[1] = 1
  for (let i = 2; i <= n, i++) {
    dp[i] = dp[i -1] + dp[i -2]
  }
  return dp[n]
}
```

## 字符串出现的不重复最长长度??

用一个滑动窗口装没有重复的字符，枚举字符记录最大值即可。用 map 维护字符的索引，遇到相同的字符，把左边界移动过去即可。挪动的过程中记录最大长度：

```js
var lengthOfLongestSubstring = function (s) {
    let map = new Map();
    let i = -1
    let res = 0
    let n = s.length
    for (let j = 0; j < n; j++) {
        if (map.has(s[j])) {
            i = Math.max(i, map.get(s[j]))
        }
        res = Math.max(res, j - i)
        map.set(s[j], j)
    }
    return res
};
```

## 小孩报数问题??

有30个小孩儿，编号从1-30，围成一圈依此报数，1、2、3 数到3的小孩儿退出这个圈， 然后下一个小孩新报数 1、2、3，问最后剩下的那个小孩儿的编号是多少?

```js
// leetcode 412
function childNum(num, count){
    let allplayer = [];    
    for(let i = 0; i < num; i++){
        allplayer[i] = i + 1;
    }
    
    let exitCount = 0;    // 离开人数
    let counter = 0;      // 记录报数
    let curIndex = 0;     // 当前下标
    
    while(exitCount < num - 1){
        if(allplayer[curIndex] !== 0) counter++;    
        
        if(counter == count){
            allplayer[curIndex] = 0;                 
            counter = 0;
            exitCount++;  
        }
        curIndex++;
        if(curIndex == num){
            curIndex = 0               
        };           
    }    
    for(i = 0; i < num; i++){
        if(allplayer[i] !== 0){
            return allplayer[i]
        }      
    }
}
childNum(30, 3)
```

## 使用setTimeout实现setInterval??

setInterval的作用是每隔一段指定时间执行一个函数，但是这个执行不是真的到了时间立即执行，它真正的作用是每隔一段时间将事件加入事件队列中去，只有当前的执行栈为空的时候，才能去从事件队列中取出事件执行。所以可能会出现这样的情况，就是当前执行栈执行的时间很长，导致事件队列里边积累多个定时器加入的事件，当执行栈结束的时候，这些事件会依次执行，因此就不能到间隔一段时间执行的效果。

针对 setInterval的这个缺点，我们可以使用 setTimeout 递归调用来模拟 setInterval，这样我们就确保了只有一个事件结束了，我们才会触发下一个定时器事件，这样解决了 setInterval 的问题。

实现思路是使用递归函数，不断地去执行setTimeout从而达到setInterval的效果

```js
function mySetInterval(fn, timeout) {
  // 控制器，控制定时器是否继续执行
  var timer = {
    flag: true
  }
  // 设置递归函数，模拟定时器执行。
  function interval() {
    if (timer.flag) {
      fn()
      setTimeout(interval, timeout)
    }
  }
  // 启动定时器
  setTimeout(interval, timeout)
  // 返回控制器
  return timer
}
```

## 实现jsonp

```js
// 动态的加载js文件
function addScript(src) {
  const script = document.createElement('script')
  script.src = src
  script.type = "text/javascript"
  document.body.appendChild(script)
}
addScript("http://xxx.xxx.com/xxx.js?callback=handleRes")
// 设置一个全局的callback函数来接收回调结果
function handleRes(res) {
  console.log(res)
}
// 接口返回的数据格式
handleRes({a: 1, b: 2})
```

## 查找有序二维数组的目标值

```js
// leetcode 74
var findNumberIn2DArray = function(matrix, target) {
    let m = matrix.length, n = matrix[0].length
    let left = 0, right = m * n -1
    while(left <= right) {
        const mid = Math.floor((left + right) / 2)
        const midVal = matrix[Math.floor(mid / 2)][mid % n]
        if (target === midVal) {
            return true
        } else if (target > midVal ){
            left++
        } else {
            right--
        }
    }
    return false
};
```

## 二维数组斜向打印？？

```js
// leetcode 498
function printMatrix(arr){
  let m = arr.length, n = arr[0].length
	let res = []
  
  // 左上角，从0 到 n - 1 列进行打印
  for (let k = 0; k < n; k++) {
    for (let i = 0, j = k; i < m && j >= 0; i++, j--) {
      res.push(arr[i][j]);
    }
  }

  // 右下角，从1 到 n - 1 行进行打印
  for (let k = 1; k < m; k++) {
    for (let i = k, j = n - 1; i < m && j >= 0; i++, j--) {
      res.push(arr[i][j]);
    }
  }
  return res
}
```

## 按要求实现以下功能

实现前端一个并发请求控制函数
1.输入URL数组和限制请求数
2.按照限制请求数控制前端同时可以并发请求数量
3.请求操作直接用window.fetch

```js
// Example usage
const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3',
    // Add more URLs as needed
];

const limit = 2;

async function concurrentRequests(urls, limit) {
    const results = [];
    const inFlightRequests = [];
    
    async function makeRequest(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            results.push(data);
        } catch (error) {
            results.push({ error: error.message });
        }
    }
    
    for (let i = 0; i < urls.length; i++) {
        const request = makeRequest(urls[i]);
        inFlightRequests.push(request);
        
        if (inFlightRequests.length === limit || i === urls.length - 1) {
            await Promise.all(inFlightRequests);
            inFlightRequests.length = 0;
        }
    }
    
    return results;
}

concurrentRequests(urls, limit)
    .then(results => console.log(results))
    .catch(error => console.error(error));
```

## 如何让`var [a, b] = {a: 1, b: 2}`解构赋值成功？

```js
Object.prototype[Symbol.iterator] = function() {
    return Object.values(this)[Symbol.iterator]()
}
```

## 参考

[高频前端面试题汇总之手写代码篇](https://juejin.cn/post/6946136940164939813?searchId=202407292030586E131805AC0D04523E04)
[2024前端高频面试题之-- JS篇](https://juejin.cn/post/7330065707358208010?searchId=202408292313519F58B7ACC69B97332EA1)