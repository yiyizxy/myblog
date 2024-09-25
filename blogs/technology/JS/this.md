---
title: This
date: 2024/09/06
tags:
 - javascript
categories:
 - javascript
---


this永远指向一个对象；
this的指向取决于函数调用的位置，或通过call、apply、bind修改
this指向跟调用有关，跟定义无关
当绑定的this指向为null的时候，则this指向了window

## 根据绑定形式分类

### 默认绑定

就是我们正常书写代码，this的指向处理，全局作用域下的this

### 隐式绑定

在函数调用时机，this的指向取决于当前上下文环境

### 显示绑定

通过使用apply、call、bind函数改变this指向

this是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。在实际开发中，this的指向可以通过四种调用模式来判断。

第一种是函数调用模式[默认绑定]，当一个函数不是一个对象的属性时，直接作为函数来调用时，this指向全局对象。
第二种是方法调用模式[隐式绑定]，如果一个函数作为一个对象的方法来调用时，this指向这个对象。
第三种是构造器调用模式[new绑定]，如果一个函数用new调用时，函数执行前会新创建一个对象，this指向这个新创建的对象。
第四种是apply、call和bind调用模式[显示绑定]，这三个方法都可以显示的指定调用函数的this指向。其中apply方法接收两个参数：一个是this绑定的对象，一个是参数数组。call方法接收的参数，第一个是this绑定的对象，后面的其余参数是传入函数执行的参数。也就是说，在使用call()方法时，传递给函数的参数必须逐个列举出来。bind方法通过传入一个对象，返回一个this绑定了传入对象的新函数。这个函数的this指向除了使用new时会被改变，其他情况下都不会改变。

这四种方式，使用构造器调用模式 > apply、call和bind调用模式 > 方法调用模式 > 函数调用模式

new绑定 > 显示绑定 > 隐式绑定 > 默认绑定

## 箭头函数

箭头函数不创建自己的this，它从定义它的上下文（即外层非箭头函数）中继承this。
词法作用域：
箭头函数的this是静态的，取决于函数定义时的上下文，而非调用时的上下文。这种行为称为词法作用域（Lexical Scoping）

示例 1：简单的箭头函数

```js
const obj = {
  value: 42,
  arrowFunc: () => {
    console.log(this.value); // undefined
  },
  regularFunc: function() {
    console.log(this.value); // 42
  }
};

obj.arrowFunc(); // undefined
obj.regularFunc(); // 42
```

arrowFunc是一个箭头函数，它没有自己的this，所以this是从定义它的上下文中继承的。在这种情况下，this指向的是全局对象（在浏览器中是window，在Node.js中是global），因此this.value是undefined。regularFunc是一个普通的函数，它的this是在调用时绑定的，因此this指向obj对象，this.value 是 42。

示例2：箭头函数在方法中的使用

```js
function Person() {
  this.age = 0;

  setInterval(() => {
    this.age++; // `this` 指向 Person 实例
    console.log(this.age)
  }, 1000)
}

const person = new Person()
```

setInterval中的箭头函数没有自己的this，它继承了Person构造函数中的this，即Person实例。因此，this.age正确地指向Person实例的age属性，并每秒递增一次。

示例3：箭头函数作为回调

```js
const obj = {
  value: 42,
  method: function() {
    setTimeout(() => {
      console.log(this.value); // 42
    }, 1000);
  }
};

obj.method();
```

setTimeout中的箭头函数没有自己的this，它继承了method方法中的this，即obj对象。因此this.value是42。

### call()、apply()、bind()等方法不能改变箭头函数中this的指向

```js
var id = 'Global';
let fun1 = () => {
    console.log(this.id)
};
fun1();                     // 'Global'
fun1.call({id: 'Obj'});     // 'Global'
fun1.apply({id: 'Obj'});    // 'Global'
fun1.bind({id: 'Obj'})();   // 'Global'
```

### 箭头函数不能作为构造函数使用

构造函数在new的步骤在上面已经说过了，实际上第二步就是将函数中的this指向该对象。 但是由于箭头函数时没有自己的this的，且this指向外层的执行环境，且不能改变指向，所以不能当做构造函数使用。

### 箭头函数没有自己的arguments

箭头函数没有自己的arguments对象。在箭头函数中访问arguments实际上获得的是它外层函数的arguments值。

### 箭头函数没有prototype

### 箭头函数不能用作Generator函数，不能使用yeild关键字
