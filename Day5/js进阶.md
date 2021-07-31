## JS OOP

创建一个对象通常先定义初始化变量。 尝试在您已有的文件中JavaScript代码下面输入以下内容, 保存刷新页面:

```js
var person = {};
```

如果你在浏览器控制台输入person，然后按下Enter(确认)键，你会得到如下结果：

```
[object Object]
```

恭喜, 你刚创建了你的第一个对象. 干的漂亮! 但这是一个空对象，所以我们做不了更多的事情。像下面一样更新下我们的对象:

```js
var person = {
  name : ['Bob', 'Smith'],
  age : 32,
  gender : 'male',
  interests : ['music', 'skiing'],
  bio : function() {
    alert(this.name[0] + ' ' + this.name[1] + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  },
  greeting: function() {
    alert('Hi! I\'m ' + this.name[0] + '.');
  },

};
```

保存刷新后, 尝试在你的浏览器控制台输入下面的内容:

```js
person.name[0]
person.age
person.interests[1]
person.bio()
person.greeting()
```



嵌套对象

~~~
var  p={
  name : { 
  first : 'Bob',
  last : 'Smith'	
  },
}

p.name.first
p.name.last
~~~



另外一种访问属性的方式是使用括号表示法(bracket notation)，替代这样的代码

```js
person.age
person.name.first
```

Copy to Clipboard

使用如下所示的代码：

```js
person['age']
person['name']['first']
```





#### all is object!





### 构造函数（另类的类）

有些人认为 JavaScript 不是真正的面向对象的语言，比如它没有像许多面向对象的语言一样有用于创建class类的声明。JavaScript 用一种称为**构建函数**的特殊函数来定义对象和它们的特征。构建函数非常有用，因为很多情况下您不知道实际需要多少个对象（实例）。**构建函数**提供了创建您所需对象（实例）的有效方法，将对象的数据和特征函数按需联结至相应对象。

不像“经典”的面向对象的语言，从构建函数创建的新实例的特征并非全盘复制，而是通过一个叫做原形链的参考链链接过去的。所以这并非真正的实例，严格的讲， JavaScript 在对象间使用和其它语言的共享机制不同。

~~~js
function createNewPerson(name) {
  var obj = {};
  obj.name = name;
  obj.greeting = function () {
    alert('Hi! I\'m ' + this.name + '.');
  }
  return obj;
}
~~~

调用

~~~js
var salva = createNewPerson('salva');
salva.name;
salva.greeting();
~~~

一个新的方法

~~~js
//
function Person(name) {
  this.name = name;
  this.greeting = function() {
    alert('Hi! I\'m ' + this.name + '.');
  };
}

var person1 = new Person('Bob');
var person2 = new Person('Sarah');

//之后我们会得到如下的例子

{
  name : 'Bob',
  greeting : function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
}

{
  name : 'Sarah',
  greeting : function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
}
~~~



仔细观察上面的例子，有什么缺点？ 函数部分的问题



修改版

~~~js
function Person(first, last, age, gender, interests) {
  this.name = {
    'first': first,
    'last': last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.bio = function() {
    alert(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  };
  this.greeting = function() {
    alert('Hi! I\'m ' + this.name.first + '.');
  };
};
~~~



### ~~扯淡~~的原型链

JavaScript 常被描述为一种**基于原型的语言 (prototype-based language)**——每个对象拥有一个**原型对象**，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为**原型链 (prototype chain)**，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。

准确地说，这些属性和方法定义在Object的构造器函数(constructor functions)之上的`prototype`属性上，而非对象实例本身。

在传统的 OOP 中，首先定义“类”，此后创建对象实例时，类中定义的所有属性和方法都被复制到实例中。在 JavaScript 中并不如此复制——而是在对象实例和它的构造器之间建立一个链接（它是\_\_proto__属性，是从构造函数的`prototype`属性派生的），之后通过上溯原型链，在构造器中找到这些属性和方法。



一个简单的类

~~~js
function doSomething(){}
console.log( doSomething.prototype );


{
    constructor: ƒ doSomething(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ hasOwnProperty(),
        isPrototypeOf: ƒ isPrototypeOf(),
        propertyIsEnumerable: ƒ propertyIsEnumerable(),
        toLocaleString: ƒ toLocaleString(),
        toString: ƒ toString(),
        valueOf: ƒ valueOf()
    }
}
~~~



在类的prototype中添加内容

~~~js
function doSomething(){}
doSomething.prototype.foo = "bar";
console.log( doSomething.prototype );


{
    foo: "bar",
    constructor: ƒ doSomething(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ hasOwnProperty(),
        isPrototypeOf: ƒ isPrototypeOf(),
        propertyIsEnumerable: ƒ propertyIsEnumerable(),
        toLocaleString: ƒ toLocaleString(),
        toString: ƒ toString(),
        valueOf: ƒ valueOf()
    }
}
~~~



new一个实例

```js
function doSomething(){}
doSomething.prototype.foo = "bar"; // add a property onto the prototype
var doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value"; // add a property onto the object
console.log( doSomeInstancing );


{
    prop: "some value",
    __proto__: {
        foo: "bar",
        constructor: ƒ doSomething(),
        __proto__: {
            constructor: ƒ Object(),
            hasOwnProperty: ƒ hasOwnProperty(),
            isPrototypeOf: ƒ isPrototypeOf(),
            propertyIsEnumerable: ƒ propertyIsEnumerable(),
            toLocaleString: ƒ toLocaleString(),
            toString: ƒ toString(),
            valueOf: ƒ valueOf()
        }
    }
}
```





1.`__proto__`、 `constructor`属性是对象所独有的；
2.`prototype`属性是函数独有的；
3.上面说过js中函数也是对象的一种，那么函数同样也有属性`__proto__`、 `constructor`；



![原型链.png](https://segmentfault.com/img/remote/1460000021232137)



### 1.prototype属性

到底什么是prototype？

```
prototype属性可以看成是一块特殊的存储空间，存储了供“徒弟”、“徒孙”们使用的方法和属性。
```

![prototype属性.png](https://segmentfault.com/img/remote/1460000021232136)

`prototype`设计之初就是为了实现继承，让由特定函数创建的所有实例共享属性和方法，也可以说是让某一个构造函数实例化的所有对象可以找到公共的方法和属性。有了`prototype`我们不需要为每一个实例创建重复的属性方法，而是将属性方法创建在构造函数的原型对象上（prototype）。那些不需要共享的才创建在构造函数中。
继续引用上面的代码，当我们想为通过Parent实例化的所有实例添加一个共享的属性时，

```
Parent.prototype.name = "我是原型属性，所有实例都可以读取到我";
```



### 2.proto属性

```
__proto__属性相当于通往prototype（“琅琊福地”）唯一的路（指针）
让“徒弟”、“徒孙” 们找到自己“师父”、“师父的师父” 提供给自己的方法和属性

```

![proto属性.png](https://segmentfault.com/img/remote/1460000021232139)

通过`__proto__`属性。每个对象都有`__proto__`属性，该属性指向的就是该对象的原型对象。

```
p1.__proto__ === Parent.prototype; // true
```

那么`Parent.prototype`也是对象，那它有隐式原型么？又指向谁？

```
Parent.prototype.__proto__ === Object.prototype; //true

```

构造函数的原型对象上的隐式原型对象指向了Object的原型对象。那么Parent的原型对象就继承了Object的原型对象。由此我们可以验证一个结论，万物继承自Object.prototype。这也就是为什么我们可以实例化一个对象，并且可以调用该对象上没有的属性和方法了。如：



`p1.__proto__`找到了原型对象`Parent.prototype`，也没有找到，又通过`Parent.prototype.__proto__`找到了上一层原型对象Object.prototype。在这一层找到了toString方法。返回该方法供`p1`使用。
当然如果找到Object.prototype上也没找到，就在`Object.prototype.__proto__`中寻找，但是`Object.prototype.__proto__ === null`所以就返回undefined。这就是为什么当访问对象中一个不存在的属性时，返回undefined了。





### 构造函数 constructor属性

![constructor属性.png](https://segmentfault.com/img/remote/1460000021232138)

`p1`的`constructor`属性指向了`Parent`，那么`Parent`就是`p1`的构造函数。同样`Parent`的`constructor`属性指向了`Function`，那么`Function`就是`Parent`的构造函数，然后又验证了`Function`就是根构造函数。

```js
console.log(p1.constructor); // ƒ Parent(){}
```



```js
console.log(Parent.constructor); // ƒ Function() { [native code] }
```



```js
console.log(Function.constructor); // ƒ Function() { [native code] }
```









## ES6入门

https://es6.ruanyifeng.com/



**Let命令**

```javascript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```

```javascript
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```





**解析赋值**

以前，为变量赋值，只能直接指定值。

```javascript
let a = 1;
let b = 2;
let c = 3;
```

ES6 允许写成下面这样。

```javascript
let [a, b, c] = [1, 2, 3];
```



一些栗子

```javascript
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```



对象的解构赋值

```javascript
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"
```





**对象的拓展**

```javascript
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}

// 等同于
const baz = {foo: foo};
```

```javascript
function f(x, y) {
  return {x, y};
}

// 等同于

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}
```







## 异步?

## 产生阻塞的代码

异步技术非常有用，特别是在web编程。当浏览器里面的一个web应用进行密集运算还没有把控制权返回给浏览器的时候，整个浏览器就像冻僵了一样，这叫做**阻塞；**这时候浏览器无法继续处理用户的输入并执行其他任务，直到web应用交回处理器的控制。

~~~js
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  let myDate;
  for(let i = 0; i < 10000000; i++) {
    let date = new Date();
    myDate = date
  }

  console.log(myDate);

  let pElem = document.createElement('p');
  pElem.textContent = 'This is a newly-added paragraph.';
  document.body.appendChild(pElem);
});
~~~





一个**线程**是一个基本的处理过程，程序用它来完成任务。每个线程一次只能执行一个任务:

```html
Task A --> Task B --> Task C
```

JavaScript 传统上是单线程的。即使有多个内核，也只能在单一线程上运行多个任务，此线程称为主线程（**main thread**）。



考虑下面的情况:

```html
Main thread: Task A --> Task B
```

在这种情况下，比如说Task A 正在从服务器上获取一个图片之类的资源，Task B 准备在图片上加一个滤镜。如果开始运行Task A 后立即尝试运行Task B，你将会得到一个错误，因为图像还没有获取到!!!



几种异步方法

## setTimeout()

- 要运行的函数，或者函数引用。
- 表示在执行代码之前等待的时间间隔(以毫秒为单位，所以1000等于1秒)的数字。如果指定值为0(或完全省略该值)，函数将尽快运行（参阅下面的注释，了解为什么它“尽快”而不是“立即”运行）。稍后详述这样做的原因。
- 更多的参数：在指定函数运行时，希望传递给函数的值。

~~~js
// With a named function
let myGreeting = setTimeout(function sayHi() {
  alert('Hello, Mr. Universe!');
}, 2000)

// With a function defined separately
function sayHi() {
  alert('Hello Mr. Universe!');
}

let myGreeting = setTimeout(sayHi, 2000);
~~~

~~~js
function sayHi(who) {
  alert('Hello ' + who + '!');
}


let myGreeting = setTimeout(sayHi, 2000, 'Mr. Universe');
~~~

清除方法：clearTimeout(myGreeting);



## setInterval()

~~~
function displayTime() {
   let date = new Date();
   let time = date.toLocaleTimeString();
   document.getElementById('demo').textContent = time;
}

const createClock = setInterval(displayTime, 1000);setInterval()
~~~

### 立即超时

注意：只要设置了settimeout方法，这行代码无论延迟多少都会被放到最后执行，就算延迟0秒。





## Promises

Promise 对象本质上表示的是一系列操作的中间状态，或者说是未来某时刻一个操作完成或失败后返回的结果。Promise并不保证操作在何时完成并返回结果，但是保证在当前操作成功后执行你对操作结果的处理代码，或在操作失败后，优雅地处理操作失败的情况。

三种状态：Pending，resolve。reject

```js
myPromise
.then(response => {
  doSomething(response);
  runFinalCode();
})
.catch(e => {
  returnError(e);
  runFinalCode();
});
```

```js
function timeoutPromise(message, interval) {
  return new Promise((resolve, reject) => {
    if (message === '' || typeof message !== 'string') {
      reject('Message is empty or not a string');
    } else if (interval < 0 || typeof interval !== 'number') {
      reject('Interval is negative or not a number');
    } else {
      setTimeout(function(){
        resolve(message);
      }, interval);
    }
  });
};
```

### async 关键字 和await一般同时出现



首先，我们使用 `async` 关键字，把它放在函数声明之前

```js
async function hello() { return "Hello" };
hello();
```

你可以使用箭头函数：

```js
let hello = async () => { return "Hello" };
```

这些都基本上是一样的。

要实际使用promise完成时返回的值，我们可以使用`.then()`块，因为它返回的是 promise：

```js
hello().then((value) => console.log(value))
```



使用try catch

```js
async function myFetch() {
  try {
    let response = await fetch('coffee.jpg');
    let myBlob = await response.blob();

    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
  } catch(e) {
    console.log(e);
  }
}

myFetch();
```



### class的由来

JavaScript 语言中，生成实例对象的传统方法是通过构造函数。

```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```

上面这种写法跟传统的面向对象语言（比如 C++ 和 Java）差异很大，很容易让新学习这门语言的程序员感到困惑。

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。

基本上，ES6 的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用 ES6 的`class`改写，就是下面这样。

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
    
}
```

上面代码定义了一个“类”，可以看到里面有一个`constructor()`方法，这就是构造方法，而`this`关键字则代表实例对象。这种新的 Class 写法，本质上与本章开头的 ES5 的构造函数`Point`是一致的。

`Point`类除了构造方法，还定义了一个`toString()`方法。注意，定义`toString()`方法的时候，前面不需要加上`function`这个关键字，直接把函数定义放进去了就可以了。另外，方法与方法之间不需要逗号分隔，加了会报错。

ES6 的类，完全可以看作构造函数的另一种写法。

```javascript
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```

上面代码表明，类的数据类型就是函数，类本身就指向构造函数。

使用的时候，也是直接对类使用`new`命令，跟构造函数的用法完全一致。

```javascript
class Bar {
  doStuff() {
    console.log('stuff');
  }
}

const b = new Bar();
b.doStuff() // "stuff"
```

构造函数的`prototype`属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的`prototype`属性上面。

```javascript
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```

上面代码中，`constructor()`、`toString()`、`toValue()`这三个方法，其实都是定义在`Point.prototype`上面。

因此，在类的实例上面调用方法，其实就是调用原型上的方法。

```javascript
class B {}
const b = new B();

b.constructor === B.prototype.constructor // true
```

上面代码中，`b`是`B`类的实例，它的`constructor()`方法就是`B`类原型的`constructor()`方法。

由于类的方法都定义在`prototype`对象上面，所以类的新方法可以添加在`prototype`对象上面。`Object.assign()`方法可以很方便地一次向类添加多个方法。

```javascript
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```

`prototype`对象的`constructor()`属性，直接指向“类”的本身，这与 ES5 的行为是一致的。

```javascript
Point.prototype.constructor === Point // true
```

### constructor 方法

`constructor()`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor()`方法，如果没有显式定义，一个空的`constructor()`方法会被默认添加。

```javascript
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```

上面代码中，定义了一个空的类`Point`，JavaScript 引擎会自动为它添加一个空的`constructor()`方法。

类必须使用`new`调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用`new`也可以执行。

```javascript
class Foo {
  constructor() {
    return Object.create(null);
  }
}

Foo()
// TypeError: Class constructor Foo cannot be invoked without 'new'
```

### 类的实例

生成类的实例的写法，与 ES5 完全一样，也是使用`new`命令。前面说过，如果忘记加上`new`，像函数那样调用`Class`，将会报错。

```javascript
class Point {
  // ...
}

// 报错
var point = Point(2, 3);

// 正确
var point = new Point(2, 3);
```

与 ES5 一样，实例的属性除非显式定义在其本身（即定义在`this`对象上），否则都是定义在原型上（即定义在`class`上）。

```javascript
//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```

上面代码中，`x`和`y`都是实例对象`point`自身的属性（因为定义在`this`对象上），所以`hasOwnProperty()`方法返回`true`，而`toString()`是原型对象的属性（因为定义在`Point`类上），所以`hasOwnProperty()`方法返回`false`。这些都与 ES5 的行为保持一致。

与 ES5 一样，类的所有实例共享一个原型对象。

```javascript
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true
```

上面代码中，`p1`和`p2`都是`Point`的实例，它们的原型都是`Point.prototype`，所以`__proto__`属性是相等的。



**this 的指向**

类的方法内部如果含有`this`，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

```javascript
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```

上面代码中，`printName`方法中的`this`，默认指向`Logger`类的实例。但是，如果将这个方法提取出来单独使用，`this`会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是`undefined`），从而导致找不到`print`方法而报错。

一个比较简单的解决方法是，在构造方法中绑定`this`，这样就不会找不到`print`方法了。

```javascript
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}
```

另一种解决方法是使用箭头函数。

```javascript
class Obj {
  constructor() {
    this.getThis = () => this;
  }
    printName=(name = 'there')=>{
    this.print(`Hello ${name}`);
  }
 print(text) {
    console.log(text);
  }
}


```



## 静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

上面代码中，`Foo`类的`classMethod`方法前有`static`关键字，表明该方法是一个静态方法，可以直接在`Foo`类上调用（`Foo.classMethod()`），而不是在`Foo`类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

注意，如果静态方法包含`this`关键字，这个`this`指的是类，而不是实例。

```javascript
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world');
  }
}

Foo.bar() // hello
```

上面代码中，静态方法`bar`调用了`this.baz`，这里的`this`指的是`Foo`类，而不是`Foo`的实例，等同于调用`Foo.baz`。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。

父类的静态方法，可以被子类继承。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello'
```

上面代码中，父类`Foo`有一个静态方法，子类`Bar`可以调用这个方法。

静态方法也是可以从`super`对象上调用的。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod() // "hello, too"
```





### class继承

Class 可以通过`extends`关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

```javascript
class Point {
}

class ColorPoint extends Point {
}
```

上面代码定义了一个`ColorPoint`类，该类通过`extends`关键字，继承了`Point`类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个`Point`类。下面，我们在`ColorPoint`内部加上代码。

```javascript
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

上面代码中，`constructor`方法和`toString`方法之中，都出现了`super`关键字，它在这里表示父类的构造函数，用来新建父类的`this`对象。

子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用`super`方法，子类就得不到`this`对象。

```javascript
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor() {
  }
}

let cp = new ColorPoint(); // ReferenceError
```

上面代码中，`ColorPoint`继承了父类`Point`，但是它的构造函数没有调用`super`方法，导致新建实例时报错。

ES5 的继承，实质是先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面（`Parent.apply(this)`）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到`this`上面（所以必须先调用`super`方法），然后再用子类的构造函数修改`this`。

如果子类没有定义`constructor`方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有`constructor`方法。

```javascript
class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```

另一个需要注意的地方是，在子类的构造函数中，只有调用`super`之后，才可以使用`this`关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有`super`方法才能调用父类实例。

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
```

上面代码中，子类的`constructor`方法没有调用`super`之前，就使用`this`关键字，结果报错，而放在`super`方法之后就是正确的。







## 类的 prototype 属性和__proto__属性

大多数浏览器的 ES5 实现之中，每一个对象都有`__proto__`属性，指向对应的构造函数的`prototype`属性。Class 作为构造函数的语法糖，同时有`prototype`属性和`__proto__`属性，因此同时存在两条继承链。

（1）子类的`__proto__`属性，表示构造函数的继承，总是指向父类。

（2）子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。

```javascript
class A {
    toString(){
        
    }
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

上面代码中，子类`B`的`__proto__`属性指向父类`A`，子类`B`的`prototype`属性的`__proto__`属性指向父类`A`的`prototype`属性。







## 闭包

### 闭包是个啥

看了好多五花八门的定义，感觉还是[MDN的](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)最好理解,重点在于：**一个函数访问了父级及以上的作用域变量，就可以称其为一个闭包**~~~那所有函数都是闭包喽~~~，这么说好像还是模糊，看个例子

~~~ javascript
function test(){
    tmpNum=0;
    return ++tmpNum;
}
console.log(test()); //输出1
console.log(test());  //还是输出1

~~~

因为tmpNum1这个变量被js的垃圾回收机制回收掉了，那么无论几次都是输出1,这感觉和c/c++的函数挺像的，既然前两位可以用const，js也有相同的办法去实现

~~~ javascript
function test1(){
    tmpNum=0;
    return ()=>{
        return ++tmpNum;
    }
}
NowNum=test1();
console.log(NowNum()); //1
console.log(NowNum()); //2
~~~

这里用到了ES6的匿名函数，我们返回一个函数，并且把这个函数付给Nownum，每次想加的时候调用这个函数就行。

### 为什么这么写

我们把全局当成一级域，test1函数当做二级域，匿名函数当做三级域，当我们调用NowNum()的时候，执行++tmpNum，但是三级域中显然没有，那么会继续向上冒泡，在二级中发现了这个变量立刻停止冒泡，并且对这个变量进行操作。至于为什么不被回收？因为儿子依赖父亲存在，如果我们把父亲的东西回收了则会对儿子的运行产生影响，因此只有当所有对儿子的调用完成后父子俩才一起被回收。

> 闭包是由函数以及声明该函数的词法环境组合而成的。该环境包含了这个闭包创建时作用域内的任何局部变量

### 更有意思的

~~~ javascript
function CalV(x){  //计算体积
  return (y)=>{
      return (z)=>{
          return x*y*z;  
      }
  }
}  

var addX=CalV(3);//作用域中包含x
var addY=addX(4);//作用域中包含x、y
var addZ=addY(5);//作用域中包含x、y、z
console.log(addZ); //60
console.log(CalV(1)(2)(3)) //6  这样写是不是更清晰一点呢
~~~

~~~ javascript
var makeCounter = ()=> {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }  
};

var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); /* logs 0 */
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); /* logs 2 */
Counter1.decrement();
console.log(Counter1.value()); /* logs 1 */
console.log(Counter2.value()); /* logs 0 */
~~~

看这两个Counter互不干扰，都有这自己词法作用域内的变量，每次调用其中一个，通过改变这个变量的值，会改变这个闭包的词法环境。然而在一个闭包内对变量的修改，不会影响到另外一个闭包中的变量。


### 常见错误

~~~ javascript
for(var i=0;i<10;i++){
    arr[i]=()=>{
        return i;
    }
}
console.log(arr[3]());//10
~~~

为什么是10？因为形成了闭包，arr[3]()依赖着i，由于js是单线程的执行，当我们调用arr[3]()时，上面的loop肯定已经完成了，那么问题来了我们这时候i在哪里？匿名函数内是没有的，继续向上冒泡，诶for循环里有！就它了，因此输出10.
我们不想让他找loop里的i怎么办？
**再加一层！！**
使用自执行函数!

~~~ javascript
arr[i]= ((i)=>{
    return ()=>{
        return i;
    }
})(i);
~~~

这个时候i向上冒泡，冒泡首先碰到的是自执行的(i)，这个就是0,1,2,....成了！

当然，ES6的let可以限制块作用域，可以做到一样的效果，这里不再多提。

下面这个也是同理

~~~ javascript
function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + i;
        result.push( function() {
                console.log(item + ' ' + list[i])
        });
    }
    return result;
}

function testList() {
    var fnlist = buildList([1,2,3]);

    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();
~~~

#### 实现原理

JS 在运行的时候，会为每一个执行函数分配内存空间，我们称这个空间为**作用域对象（Scope Object）**。当调用函数时，函数中分配的本地变量会被存储在这个作用域对象中。我们无法直接使用代码读取这个作用域对象，但是解析器在处理数据的时候会在后台使用它们。

同时可能存在多个作用域对象，所有函数的作用域对象会被环境栈所管理。环境栈中的作用域对象是按顺序访问的，最先能够访问的是当前函数的作用域，如果访问的变量在当前作用域没有，会访问上一层作用域，直到找到全局作用域（Global）对象。如果访问到全局作用域也没有这个对象，会抛出ReferenceError的异常。这就是所谓的作用域链（scope chian)。

闭包之所以能够访问到上一层函数中的局部变量，是因为当变量被捕获之后，即使上一层函数调用完毕出栈了，但是它的作用域对象没有被销毁，所以仍然能够被闭包访问。

#### 闭包的写在后面

如果不是某些特定任务需要使用闭包，在其它函数中创建函数是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响。（当然只是IE自己的回收没处理好的问题，该用就用就行）。