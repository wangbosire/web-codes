中对类一直都是短板，ES 6 提供了关键字 class
```javascript
// 相对于下面更加简洁
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  getPoint() {
    const { x, y } = this
    return { x, y }
  }
}

// 与上面效果相等
function Point(x, y) {
  this.x = x
  this.y = y
}

Point.prototype.getPoint = function () {
  const { x, y } = this
  return { x, y }
}
```
constructor 方法  
和 ES5 一样，constructor 方法是 new 命令生成对象时自动调用的方法，如果没有指明改方法，会有一个默认的空方法 constructor(){}，
另外，class 定义的对象，不用 new 是无法运行的，和函数加 () 是有些区别的。
class 不存在变量提升，

### class 继承
class 可以通过 extends 来继承，
```javascript
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  getPoint() {
    const { color } = this
    return Object.assign({}, { color }, super.getPoint())// 调用父类的getPoint()
  }
}
```
子类必须通过 constructor 中的 super 来获得父类的 this，否则会报错，
```javascript
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor() {
  }
}

let cp = new ColorPoint(); // ReferenceError
```
如果子类没有 constructor 方法，会默认执行
```javascript
constructor(...args) {
  super(...args);
}
```
类中的 \_\_proto__ 和 prototype 方法子类的 \_\_proto__ 指向父类，子类的 prototype 的 \_\_proto__ 指向 父类的 prototype，
```javascript
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```
super 的作用是相当于把 子类的 this 拿到父类中去跑一下，如果 B 继承 A，则 super 方法相对于A.prototype.constructor.call(this)。但是如果不写 super 函数又会报错，而且 super 只能用在 构造函数中。

-----
ES5 是无法继承原生构造函数的，比如 Number，Array，String 等，主要是因为元素函数的内部 this 无法拿到，继承的函数绑定不了。

ES6 允许继承原生构造函数
```javascript
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

let arr = new MyArray();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined
```
下面是一个继承 Error 的例子：
```javascript
class ExtendableError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}

class MyError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

var myerror = new MyError('ll');
myerror.message // "ll"
myerror instanceof Error // true
myerror.name // "MyError"
myerror.stack
// Error
//     at MyError.ExtendableError
//     ...
```

### class 的取值与存值函数
get 和 set 分别是关键字，用于取值和存值，可以通过对函数重写取值和存值的方法，
```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```
### class 的静态方法
如果加上关键字 static，表示 class 的静态方法，不会能被实例调用，而是直接通过类来调用。
```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod() // TypeError: foo.classMethod is not a function
```
这个静态方法也是可以继承的，
```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod(); // 'hello'
```
### class 的静态属性和实例属性
静态属性指的是Class本身的属性，即Class.propname，而不是定义在实例对象（this）上的属性。
#### new.target
new.target 用来表示是否用 new 关键字来实例对象。在 ES5 中：
```javascript
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```
只有通过 new 才是被允许的。

在class 中，new.target 表示同样的意思，但是子类继承父类，此时的调用子类的话， 父类的 new.target 表示子类的，由此，可以做出如下的函数：
```javascript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```
此方法用于表示，Shape 只能被用来继承，而不能被实例化
