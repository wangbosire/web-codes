```javascript
(function () {
  var a = b = 3;
})()

console.log(typeof a) // undefined
console.log(typeof b) // number
// 因为声明var a = b = 3;相当于
b = 3
var a = b
// b最终成为一个全局变量（因为它不在var关键字后面），因此它仍然在作用域内，即使在封闭函数之外
```

实现 x == 1 && x == 2 && x == 3
```javascript

var x = {
  value: 0,
  valueOf() {
    return ++this.value
  }
}
// 这两个效果是一样的， 重写那个会优先用到那个
var x = {
  value: 0,
  toString() {
    return ++this.value
  }
}

console.log(x == 1 && x == 2 && x == 3)
```
