---
title: call vs apply vs bind
date: 2024/07/01
tags:
 - javascript
categories:
 - javascript
---

## 相同点

都是改变this指向和函数的调用，call和apply功能类似，只是传参不同

## 区别

- bind与call和apply的区别在于它返回的是一个函数，不会立即执行，bind是创建时执行，其余是调用时执行时
- 传参上call传入的是参数列表，apply传入的是数组

### call实现

```js
call(this, param1,param2)
```

### apply实现

记忆技巧： apply-a-array

```js
apply(this, [params1, param2])
```

### bind实现

```js
bind(this, param1, param2, param3)
```

### 手撕bind

```js
Function.prototype.myBind = function () {
    const _this = this
    const args = Array.prototype.slice.call(arguments)
    const newThis = args.shift()

    return function() {
        return _this.myApply(newThis, args)
    }
}
```

### 手撕apply

```js
Function.prototye.myApply = function(context) {
    context = context || window
    // 挂载执行函数
    context.fn = this
    let result = arguments[1] ? context.fn(...arguments[1]) : context.fn()
    delete context.fn()
    return result
}
```
