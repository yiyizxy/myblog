---
title: ES6
date: 2024/09/04
tags:
 - javascript
categories:
 - javascript
---

## ES6有哪些新特性

1. 箭头函数
2. 解构赋值
3. 模板字符串
4. promise
5. symbol Symbol是ES6中引入的一种新的基本数据类型,用于表示一个独一无二的值,不能与其他数据类型进行运算
6. 新的变量声明方式-let和const
7. 模块化-es6新增了模块化，根据功能封装模块，通过import导入，然后通过export导出也可以使用export default导出
8. for…of 循环,用于遍历可迭代对象(如数组、Map 和 Set)中的元素
9. 扩展运算符:使用 ... 可以将数组或对象展开成多个参数,或者将多个参数合并成一个数组
10. 展开运算符:在ES6中用...来表示展开运算符,它可以将数组或者对象进行展开
11. Map和Set，引入了两种新的数据结构，分别用于存储键值对和唯一值
12. Proxy，允许在对象和函数调用等操作前后添加自定义的行为
13. 类（Class），引入了面向对象编程中类的概念
14. 默认参数（Default Parameter），在定义函数时可以给参数设置默认值

## Proxy

Proxy是一个对象，用于修改目标对象的默认行为。可以理解为在目标对象前增加‘拦截器’，当访问或者对目标对象进行操作时，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

### 基本语法

`new Proxy(target, handler)`
target：目标对象，可以是数组、对象、函数等任何对象。（必填参数）
handler：拦截器对象，其属性是定义的多种操作的代理行为。（必填参数）

### 使用实例

1.get方法用于拦截读取属性操作

```js
const obj = {
    name: "jack",
}
const objNew = new Proxy(obj, {
    get: function (target, prop, recevier) {
        if (props in target) {
            return target[prop]
        } else {
            throw new Error("该对象不具有该属性！")
        }
    },
})

objNew.name // jack
objNew.age // throw Error
// 上面对obj对象添加了代理，读取name属性时将会返回正常的结果，当访问obj不具有的属性age时，将会抛出错误。
```

2.set方法拦截设置属性的操作，下面是一个简单的例子

```js
const obj = {
  name: 'jack',
};
const objNew = new Proxy(obj, {
  set: function(target, prop, value, recevier) {
    target[prop] = 'hi';
  }
})

objNew.name = 'hello';
console.log(objNew.name) // 'hi'
```

3.参数含义

上面obj和objNew有什么区别，get方法中target以及recevier分别是什么？

```js
var obj = {
  name: 'jack'
}
var pro = new Proxy(obj, {
    get(target, prop, recevier) {
        console.log(target === obj); // true
        console.log(recevier === pro); // true
    }
})
console.log(obj === pro) // false
```

从上面的输出中可以看到，拦截器中第一个参数target和目标对象是同一个对象，参数recevier是代理后的对象。但是目标对象和代理对象是不一样的，当没有设置handler时，对代理对象和目标对象进行对应操作时，将获取到相同的结果。

```js
let target = {};
let p = new Proxy(target, {});

target.a = 37;

console.log(p.a); // 37
```

### Proxy可拦截操作

除了上面的get以及set拦截器，下面将介绍其他拦截器的使用方法以及特性。

#### apply

apply用于拦截函数的调用操作。

1. 基本语法

```js
var p = new Proxy(target, {
  apply: function(target, thisArg, argumentsList) {
  }
});
```

apply中的参数含义：
target：目标对象
thisArg：执行原方法时指定this对象
argumentsList：参数
2. 使用例子

```js
function add(a, b) {
  return a + b;
}
const addNew = new Proxy(add, {
  apply(target, thisArg, args) {
    return target.apply(thisArg, args);
  }
})

addNew(1, 3); // 4
```

3. 可拦截操作以及注意事项

3.1 可拦截操作

proxy(arg)：直接调用方法（是被Proxy拦截后的方法对象）
Function.Prototype.apply()以及Function.Prototype.call()
Reflect.apply(target, thisArg, argumentsList)：通过指定参数argumentsList，在thisArg上下文环境下调用对象方法target
3.2 注意事项

当target不是可执行对象方法时，如果使用改拦截器，则会抛错。

constructor
执行new 操作时将会被拦截

1. 基本语法

```js
var p = new Proxy(target, {
  construct: function(target, argumentsList, newTarget) {
  }
});
```

参数含义：
target：目标对象
newTarget：最初被调用的构造函数，在上述demo中指的是p
argumentsList：参数
2. 使用例子

```js
var pro = new Proxy(function() {}, {
  construct: function(target, argumentsList, newTarget) {
    return { greet: `hello ${argumentsList[0]}`};
  }
});

console.log(new pro('jack').greet); // hello jack
```

3. 可拦截操作以及注意事项
3.1 可拦截操作

new操作符：new proxy(args);
Reflect.constructor();
3.2 注意事项

target目标对象必须可进行new 操作
constructor代理中返回值必须是对象
has

1. 基本语法

```js
var p = new Proxy(target, {
  has: function(target, prop) {
  }
});
```

2. 使用例子

```js
var p = new Proxy({}, {
  has: function(target, prop) {
    console.log('called: ' + prop);
    return true;
  }
});

console.log('a' in p); // called: a
```

3. 可拦截操作以及注意事项
3.1 可拦截操作

```js
for a in proxy
for a in Object.create(proxy)：当某个对象继承了proxy时
with 检查: with(proxy) { (foo); }
Reflect.has()
```

3.2 注意事项

如果目标对象的某一属性本身不可被配置，则该属性不能够被代理
如果目标对象为不可扩展对象，则该对象的属性不能够被代理
deleteProperty
delete操作符删除某个属性时，会被拦截。

1. 基本语法

```js
var p = new Proxy(target, {
  deleteProperty: function(target, property) {
  }
});
```

2. 使用实例

```js
var p = new Proxy({}, {
  deleteProperty: function(target, prop) {
    console.log('called: ' + prop);
    return true;
  }
});

delete p.a; // "called: a"
```

3. 可拦截操作以及注意事项
3.1 可拦截操作

```js
delete proxy.a 或者是delete proxy['a']
Reflect.deleteProperty()
```

3.2 注意事项

如果目标对象的属性是不可配置的，那么该属性不能被删除
其他拦截器
以下方法的使用和上面介绍的很类似，就不一一展开了，有兴趣的同学可以查看具体的API。

```js
getPrototypeOf
setPrototypeOf
defineProperty
getOwnPropertyDescriptor
isExtensible
ownKeys
preventExtensions
Proxy.revocable()
Proxy.revocable方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例。

let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
```

上面代码中，当执行revoke函数之后，再访问Proxy实例，就会抛出一个错误。

Proxy.revocable的一个使用场景是目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

Proxy中的this问题
虽然Proxy可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy代理的情况下，目标对象内部的this关键字会指向Proxy代理。

```js
const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};
const proxy = new Proxy(target, handler);
target.m() // false
proxy.m()  // true
```
在没有任何拦截的情况下，如果只是对代理对象和目标对象进行简单操作，还是基本能保持结果的一致性的。

Proxy的实际使用场景
基本扩展操作

```js
 const arr = [1, 2, 3, 4, 5, 6, 7, 8]

  const res = new Proxy(arr, {
    get (target, name) {
      if (name.includes(':')) {
        const indexs = name.split(':')
        return target.slice(indexs[0], indexs[1])
      }
      return target[name]
    }
  })

  res['2:5'] // [ 2, 3, 4]
```

这不是很cool，对对象也可做类似处理，实现链式操作。

```js
const obj = {
    a: {
      b: {
        c: 'hello world'
      }
    }
}

  const obj1 = new Proxy(obj, {
    get (target, name) {
      const keys = name.split('.')
      return keys.reduce((pre, next) => {
        if (pre !== null && pre !== undefined) {
          pre = pre[next]
        }
        return pre
      }, target)
    }
  })
  obj1['a.b.c'] // hello world
```

数据校验

```js
const people = {
  name: 'jack',
  age: 16
};
const proxy = new Proxy(people, {
  set(target, prop, value) {
    if (prop === 'age') {
      if (typeof value !== 'number') {
        throw new Error('数据类型出错');
      }

      if (value > 200) {
        throw new Error('年龄设置超出范围');
      }
      
    } 
    return target[prop] = value;
  }
});
proxy.age = 100;
proxy.age // 100
proxy.age = '111' // 抛错 数据类型出错
```

通过Proxy还可以实现其他很多有趣的东西，比如数据库orm等等，等待着你的探索哦！

## Map与WeakMap的区别

1.键值类型的限制：Map的键可以是任何类型，WeakMap的键只能是对象类型
2.弱引用：WeakMap的键是弱引用，即当键对象不再被引用时，会被垃圾回收器自动回收，不存在内存泄漏的问题，Map的键是强引用，即使该键对象没有被引用，也不会被垃圾回收器自动回收
3.可迭代性：Map是可迭代的，可以使用for..of,forEach进行遍历，但是WeakMap不支持，因为其中的键没有固定的顺序
4.安全性：WeakMap是弱引用，无法被外部访问或者修改，不会对键对象造成额外的引用，避免了内存泄漏的问题，相对来说更加安全