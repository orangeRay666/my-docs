# JavaScript 面试题整理

## 1. 问题：闭包
* 当一个函数内部定义了另一个函数，并且内部函数引用了外部函数的变量，就形成了闭包。当内部函数从外部函数返回时，它会保留对外部函数作用域的引用，即使在外部函数执行完毕后，仍然可以继续访问这些变量。
* 闭包是指有权访问另一个函数作用域中变量的函数，创建闭包最常见的方法就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量，利用闭包可以突破作用链域
* 闭包的特性：
    * 函数嵌套函数
    * 内部函数可以引用外层的参数和变量
    * 参数和变量不会被垃圾回收机制回收

说说对闭包得理解
* 使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染，缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄漏。在js中，函数即闭包，只有函数才会产生作用域的概念。
* 闭包的最大用处有两个：一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中。
* 闭包的另一个用处，是封装对象的私有属性和私有方法。
* 好处：能够实现封装和缓存等
* 坏处：就是消耗内存，使用不当会造成内存泄漏

使用闭包的注意点：
* 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能会导致内存泄漏。
* 解决方法：在退出函数之前，将不适用的局部变量全部删除
* 闭包在IE中会导致内存泄漏的原因是，IE的垃圾回收机制是基于引用计数的，当一个对象的引用计数为0时，就会被垃圾回收机制回收。但是，闭包会导致外部函数的引用计数增加，所以外部函数不会被垃圾回收机制回收。

```js
const accumulation = function(initValue = 0){
    let value = initValue
    return function(num){
        value += num
        return value
    }
}

for(var i=0;i<10;i++){
    (function (index){
        setTimeout(function(){
            console.log(index)
        },1000)
    })(i);
}
```

## 2. 问题：如何判断object为空
* 常用方法：
    * `Object.keys(obj).length === 0`
    * `JSON.stringify(obj) === '{}'`
    * `for in` 循环判断是否有属性
* 以上方法不太严谨处理不了 `const obj = {[Symbol('a')]:1}`这种情况
* 更严谨的方法： `Reflect.ownKeys(obj).length === 0`
   

## 3. 问题：强制类型转换，隐式类型转换
* 强制类型转换：使用 `Number()`, `String()`, `Boolean()` 等函数进行显式转换。
```javascript
var num = Number('123') // 123  强制将字符串转换为数字
var str = String(123) // '123'  强制将数字转换为字符串
var bool = Boolean(0) // false  强制将数字转换为布尔值
```
* 隐式类型转换：在某些情况下，JavaScript 会自动进行类型转换，例如在进行数学运算时。
```javascript
var num = 123 + '456' // '123456'  数字和字符串相加，数字会被转换为字符串
true == 1  // true  布尔值和数字比较，布尔值会被转换为数字
false == 0  // true  布尔值和数字比较，布尔值会被转换为数字
```


## 4. 问题：==和===的区别
* `==` 运算符会进行类型转换，然后比较值是否相等。
* `===` 运算符不会进行类型转换，只有在类型和值都相等时才返回 `true`。
```javascript
1 == '1' // true  数字和字符串比较，字符串会被转换为数字
1 === '1' // false  数字和字符串比较，类型不同，返回 false
true == 1  // true  布尔值和数字比较，布尔值会被转换为数字
true === 1 // false  布尔值和数字比较，类型不同，返回 false
```
**补充问题**： 当a=?以下代码成立
```javascript
if (a == 1 && a == 2 && a == 3) {
    console.log('a等于1、2、3')
}
```
```javascript
var a = {
    i: 1,
    valueOf: function () {
        return this.i++
    }
}
if (a == 1 && a == 2 && a == 3) {
    console.log('a等于1、2、3')
}
```

## 5. 问题：javascript的数据类型有哪些
* 基本数据类型：
    * 数字（Number）：表示数值，包括整数和浮点数，整数（如：123）浮点数（如：123.456）特殊数值（如：NaN、Infinity、-Infinity）
    * 字符串（String）：表示文本数据，使用单引号（'）或双引号（"）括起来，由零个或多个字符组成的序列（如：'hello'）
    * 布尔值（Boolean）：表示逻辑值，只有两个值：`true` 和 `false`
    * 空值（Null）：表示空值或不存在的对象引用（如：null）, 是一个特殊的对象值，用于表示空引用或空对象,给`typeof`传一个`null`会返回`object`。
    * 未定义（Undefined）：表示变量未被赋值（如：let a; console.log(a) // undefined）
    * 符号（Symbol）：表示唯一的标识符，用于对象属性的键（如：Symbol('a')）
* 引用数据类型：
    * 对象（Object）：表示复杂的数据结构，用于存储键值对（如：{a: 1, b: 2}）
    * 数组（Array）：表示有序的元素集合，每个元素都有一个索引（如：[1, 2, 3]）
    * 函数（Function）：表示可执行的代码块，用于封装可重复使用的逻辑（如：function () { console.log('hello') }）
* 其他引用类型：
    * 日期（Date）：表示日期和时间，用于处理日期和时间相关的操作（如：new Date()）
    * 正则表达式（RegExp）：表示模式匹配，用于在字符串中进行搜索和替换操作（如：/abc/）
    * 映射（Map）：表示键值对的集合，键可以是任意类型（如：new Map()）
    * 集合（Set）：表示唯一值的集合，集合中的值不能重复（如：new Set()）
* 在ECMAScript 2020（ES11） 中正式被添加BigInt的数据类型。用于大整数的表示和操作：
    * 结尾用n表示（如：123n）
* 基础类型存放于栈，变量记录原始值;引用类型存放于堆，变量记录引用地址。
   

## 6. 问题：javascript变量在内存中的堆栈存储
* 基础类型存放于栈，引用类型回存放在堆
* 案例：以下代码为什么输出`50 30`?
```javascript
function fn(obj){
    obj = {m: 50}
    console.log(obj.m)  // 输出50
}
let o = {m: 30}
fn(o)
console.log(o.m)    // 输出 30
```
* 解析
    * 当执行`let o = {m: 30}`时，相当于在堆内存开辟一块空间，存储`{m: 30}`，同时利用变量`o`记录该堆内存地址,`o`存放于栈。
    <img src="./img/js-q6.png" alt="question-6-1" />
    * 接着执行`fn(o)`时，将`o`变量作为实参传递给`fn`函数，相当于将`o`变量的引用地址复制一份传递给`fn`函数的参数`obj`。
    * 然后在`fn`函数中，将`obj`参数赋值为`{m: 50}`，相当于在堆内存开辟一块空间，存储`{m: 50}`，并将引用地址赋值给`obj`参数。
     <img src="./img/js-q6-1.png" alt="question-6-1" />
    * 然后执行`console.log(obj.m)`会根据新的引用地址，找到`{m: 50}`，输出的是`50`。
    * 而在全局作用域中，`o`变量记录的引用地址仍然是`{m: 30}`的地址，所以`console.log(o.m)`输出的是`30`。


## 7. 问题：JS单线程设计的目的
javascript是浏览器的脚本语言，主要用途是进行页面的一系列交互操作以及用户互动，多线程编程通常会引发竞态条件，死锁和资源竞争等问题，而单线程设计可以避免这些问题，多线程操作的话会出现不可预测的冲突。

假设有两个线程同时执行，一个线程修改了共享数据，而另一个线程在读取该数据时，就会出现竞态条件。为了避免这种情况，javascript采用了单线程设计，即只有一个线程在执行javascript代码，其他线程都在等待。

如果有多个任务需要执行，javascript会将这些任务放到任务队列中，按照先进先出的顺序依次执行。每个任务执行完成后，会检查是否有其他任务需要执行，如果有，就会将其放到任务队列中，也就是我们熟知的事件循环，微任务队列，宏任务队列。如果真的需要开辟一个新线程处理逻辑，也可以通过webworker实现。


## 8. 问题：如何判断javascript的数据类型
* **typeof操作符**：返回一个表示数据类型的字符串，包括`number`、`string`、`boolean`、`object`、`function`、`symbol`、`undefined`、`bigint`。
```javascript
typeof 123 // 'number'
typeof 'hello' // 'string'
typeof true // 'boolean'
typeof {a: 1} // 'object'
typeof function () {} // 'function'
typeof Symbol('a') // 'symbol'
typeof undefined // 'undefined'
typeof 123n // 'bigint'
typeof null // 'object'
```
* **instanceof操作符**：用于判断一个对象是否是某个构造函数的实例，返回一个布尔值。
```javascript
let arr = [1, 2, 3]
arr instanceof Array // true
var obj = {a: 1}
obj instanceof Object // true
function Fn() {}
let fn = new Fn()
fn instanceof Fn // true
```
* **Object.prototype.toString.call()**：返回一个表示对象类型的字符串,获取更详细的数据类型信息，包括`[object Object]`、`[object Array]`、`[object Function]`等。
```javascript
Object.prototype.toString.call(123) // '[object Number]'
Object.prototype.toString.call('hello') // '[object String]'
Object.prototype.toString.call(true) // '[object Boolean]'
Object.prototype.toString.call({a: 1}) // '[object Object]'
Object.prototype.toString.call(function () {}) // '[object Function]'
Object.prototype.toString.call(Symbol('a')) // '[object Symbol]'
Object.prototype.toString.call(undefined) // '[object Undefined]'
Object.prototype.toString.call(123n) // '[object BigInt]'
Object.prototype.toString.call(null) // '[object Null]'
```
* Array.isArray()：用于判断一个对象是否是数组，返回一个布尔值。
```javascript
Array.isArray([1, 2, 3]) // true
Array.isArray({a: 1}) // false
```


## 9. 问题：ES每个版本引入了什么内容
ECMScript是一种用于编写JavaScript的标准化脚本语言，每个版本都引入了新的功能和语法。以下是每个版本引入的主要内容：
* **ECMAScript 2015（ES6）**：引入了`let`和`const`关键字、箭头函数、模板字符串、解构赋值、默认参数、剩余参数、扩展运算符、Symbol数据类型、Promise对象、Generator函数、for...of循环等。
* **ECMAScript 2016（ES7）**：引入了指数运算符（**）、Array.prototype.includes()方法等。
* **ECMAScript 2017（ES8）**：引入了async/await语法、Object.values()方法、Object.entries()方法、String.padStart()方法、String.padEnd()方法等。
* **ECMAScript 2018（ES9）**：引入了Rest/Spread属性、异步迭代器、Promise.prototype.finally()方法、正则表达式命名捕获组等。
* **ECMAScript 2019（ES10）**：引入了Array.prototype.flat()方法、Array.prototype.flatMap()方法、Object.fromEntries()方法、String.trimStart()方法、String.trimEnd()方法等。
* **ECMAScript 2020（ES11）**：引入了可选链操作符（?.）、空值合并运算符（??）、BigInt数据类型、globalThis对象、动态导入（import()）等。
* **ECMAScript 2021（ES12）**：引入了逻辑赋值运算符（&&=、||=）、数字分隔符（_）、Promise.allSettled()方法、String.prototype.replaceAll()方法等。
* **ECMAScript 2022（ES13）**：引入了类字段（class fields）、私有属性（private properties）、私有方法（private methods）、静态属性（static properties）等。


## 10. 问题：let声明变量的特性
1. **块级作用域**
```javascript
for(var i=0;i<10;++i){
    setTimeout(()=>{
        console.log(i)
    },1000)
}
// 1秒后输出10个10，循环体变量i会渗透到循环体外部，所以在setTimeout 1秒的过程中，i的值实质变成了10，因此会在1秒后输出10个10
for(let i=0;i<10;++i){
    setTimeout(()=>{
        console.log(i)
    },1000)
}
// 使用let后问题消失，每个循环体都有自己的i变量，不会渗透到循环体外部，let是块级作用域，仅局限于循环体内部
for(var i=0;i<10;++i){
    (function (index){
        setTimeout(()=>{
            console.log(index)
        },1000)
    })(i)
}
// 如果用var定义，可通过在循环体内添加一个立即执行函数，把迭代变量的作用域保护起来。
```
2. **暂时性死区**
```javascript
// 用let声明变量时，在变量声明前使用该变量会报错，这是因为let声明的变量会绑定到所在的块级作用域，而不是全局作用域。
console.log(i) // ReferenceError: i is not defined
let i = 10
```
3. **同级作用域下不可重复声明**
```javascript
// 用let声明变量时，在同一个作用域内不能重复声明同一个变量，否则会报错。
let i = 10
let i = 20 // SyntaxError: Identifier 'i' has already been declared
```
4. **全局声明会挂在Script作用域下，不会挂在window**


## 11. 问题：变量提升&函数提升（优先级）
```javascript
console.log(s);
var s = 2;
function s(){}
console.log(s);

// 输出
// [function :s]
// 2
```
* var在会变量提升
* 优先级：函数提升 > 变量提升
* 代码演变过程
```javascript
function s(){}
console.log(s)  // f s(){}
s = 2;
console.log(s)  //2

```

## 12. 问题：如何判断对象相等
JSON.stringify(obj1) === JSON.stringify(obj2)


## 13. 问题：null和undefined的区别
`undefined`
* 当声明了一个变量但未初始化时，它的值为`undefined`
* 当访问对象属性或数组元素中不存在的属性或索引时，也会返回`undefined`
* 当函数没有返回值时，默认返回`undefined`
* 如果函数的参数没有传递或没有被提供值，函数内的对应参数的值为`undefined`
```javascript
let x
console.log(x)  // `undefined`

const obj = {}
console.log(obj.name)   // `undefined`

function exampleFunc(){}
console.log(exampleFunc())   // `undefined`

function add(a,b){
    return a+b
}
console.log(add(2))   // 2 + `undefined`   NaN
```

`null`
* `null`是一个特殊的关键字，表示一个空对象指针
* 它通常用于显式的指示一个变量或属性的值是空的，`null`是一个赋值的操作，用来表示“没有值”或“空”
* `null`通常需要开发人员主动分配给变量，而不是自动分配的默认值
* `null`是原型链的顶层，所有对象都继承自`Object`原型对象，`object`原型对象的原型是`null`
```javascript
const a = null;
console.log(a)   // null

const obj = {a:1}
const proto = obj.__proto__
console.log(proto.__proto__)  // null
```


## 14. 问题：用setTimeout来实现倒计时，与setInterval的区别
* `setTimeout`是在指定的时间后执行一次回调函数，而`setInterval`是在指定的时间间隔内重复执行回调函数
* `setTimeout`只执行一次回调函数，而`setInterval`会一直执行回调函数，直到被清除
* `setTimeout`的回调函数执行完成后，会自动清除定时器，而`setInterval`的回调函数执行完成后，需要手动清除定时器，否则会一直执行下去
```javascript
const countDown = (count) => {
    setTimeout(()=>{
        count--;
        if(count>0){
            countDown(count)
        }
    },1000)
}
countDown(10)

 let count = 10
 let timer = setInterval(() => {
    count--;
    if(count<=0){
        clearInterval(timer)
        timer = null;
    }
 },1000)
```
* **setTimeout**: 每隔1s生成一个任务，等待1s后执行，执行完成之后再生成下一个任务，等待1s后执行，如此循环，所以每个人物之间的间隔是1s
* **setInterval**: 无视执行时间，每隔1s往任务队列中添加一个任务，等待执行，这样会导致任务执行间隔小于1s，甚至会堆积。当任务执行时间大于任务间隔时间，会导致消费跟不上生产。


## 15. 问题：JS事件循环机制-宏任务微任务如何工作的？
1. 同步任务直接执行
2. 遇到微任务放到微任务队列（Promise.then / process.nextTick 等等）
3. 遇到宏任务放到宏任务队列（setTimeout / setInterval 等等）
4. 执行完所有同步任务
5. 执行微任务队列中的任务
6. 执行宏任务队列中的任务
 <img src="./img/js-q15.png" alt="question-15" />

## 16. 问题：事件循环-一下代码输出结果
```javascript
setTimeout(()=>{
    console.log('timeout')
},0)
function test(){
    consoel.log('test')
    return Promise.resolve().then(()=>{
        test()
    });
}
test()
```
**答案** 会持续输出test  不会输出timeout
**解析** 微任务优先级高于宏任务，Promise.then callback会挂在到微任务队列，而setTimeout callback会挂在到宏任务队列，每次在执行微任务队列时，又重新执行test(),test运行会网微任务队列添加一个任务，导致死循环，宏任务队列始终没机会，所以不会输出timeout。

## 17. 问题：什么是内存泄漏
内存泄漏是指应用程序中的内存不在被使用但仍然被占用，导致内存消耗逐渐增加，最终可能导致应用程序性能下降或奔溃。内存泄漏通常是由于开发编写代码未正确释放不在需要的对象或数据而导致
**特征**：程序对内存失去控制
* 意外的全局变量
```javascript
function fn(){
    // 这个变量会变成全局变量，并可能导致内存泄漏
    myObject = {/*...*/}
}
```
* 闭包：闭包可能会无意中持有对不再需要的变量或对象的引用，从而阻止他们被垃圾回收
```javascript
function fn(){
    const data = [/*大量数据*/]
    return ()=>{
        // 闭包持有data引用，导致data无法被垃圾回收
        console.log(data)
    }
}
const closure = fn()
// 当closure不再被引用时，它仍然保留着data的引用，导致内存泄漏
```
* 事件监听器：忘记移除事件监听可能会导致内存泄漏，因为与监听器相关联的对象将无法被垃圾回收
```js
function createListener(){
    const element = document.getElementById('myElement')
    element.addEventListener('click',()=>{
        console.log('click')
    })
}
// 忘记移除事件监听,即使‘myElement’元素被移除了，事件监听仍然存在，导致内存泄漏
createListener() 
// 正确移除事件监听
element.removeEventListener('click',clickHandler)
```
* 循环引用：循环引用指的是两个或多个对象相互引用，形成一个循环，导致它们无法被垃圾回收
```javascript
function createCycle(){
    const obj1 = {}
    const obj2 = {}
    obj1.ref = obj2
    obj2.ref = obj1
}
// 当createCycle执行完成后，obj1和obj2都无法被垃圾回收，因为它们相互引用
```
* 定时器`setTimeout/setInterval`：忘记清除定时器可能会导致内存泄漏，特别是回调函数持有对大型对象引用时
```javascript
function createTimer(){
    const data = [/* 大量数据 */]o
    setInterval(()=>{
        console.log('timer')
    },1000)
}
// 忘记清除定时器,导致定时器一直运行，内存泄漏
createTimer()
// 正确清除定时器
clearInterval(timer)
```


## 18. 问题：
## 19. 问题：
## 20. 问题：
## 21. 问题：
## 22. 问题：
## 23. 问题：
## 24. 问题：
