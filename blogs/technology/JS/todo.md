## 柯里化

```js
// 手撕柯里化
function curry(fn) {
    const curried  = (...args) => {
        if (args.length >= fn.length) {
            return fn(...curry)
        } else {
            return (...moreArgs) => curried(...args, ...moreArgs)
        }
    }
    return curried
}

```