# 算法题整理

## --功能编程--
## 1. 问题：拓扑排序-求模块依赖关系

```js
const dependencies = {
  a: ["b", "c"],
  b: ["c"],
  c: [],
  d: ["a", "b"],
};

// 输出：['c', 'b', 'a', 'd']
function getLoadOrder(dependencies) {
  const visited = new Set();     // 用来记录已经访问的模块
  const loadOrder = [];     // 最终加载顺序
  function dfs(module) {
    if (visited.has(module)) return; // 如果模块以访问，直接返回
    visited.add(module); // 标记为访问过
    const deps = dependencies[module] || [];
    for (const dep of deps) {
      dfs(dep); // 递归访问依赖模块
    }
    loadOrder.push(module); // 将模块加入结果
  }

  // 遍历所有模块，确保每个模块都被访问到
  for (const module of Object.keys(dependencies)) {
    dfs(module);
  }

  return loadOrder;
}

console.log(getLoadOrder(dependencies));
```



## 2. 问题：求笛卡尔积
```js
const fn = (list) => {
  let result = [[]]

  function _fn(preList,curRow){
    const dtoRes = []
    preList.forEach(preRow => {
      curRow.forEach(curRow => {
        dtoRes.push([].concat(preRow).concat([curRow]))
      })
    })
    result = dtoRes
  }

  for(let i =0;i<list.length;++i){
    _fn(result,list[i])
  }
  return result.map(item => item.join('-'))
}

const arr = [
  ['戴尔','惠普','联想'],
  ['16G','32G'],
  ['1T','2T']
]
console.log(fn(arr))

```


## 3. 问题：并发任务控制
```js
async function timeout(time){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

class SuperTask{
  // 代码实现
  constructor({poolSize}){
    this.waiting = []
    this.poolSize = poolSize || 2
    this.runningTaskCount = 0
  }
  setPoolSize(poolSize){
    this.poolSize = poolSize
    this.runTask()
  }
  add(fn){
    return new Promise(resolve => {
      this.waiting.push({fn,resolve})
      this.runTask()
    })
  }
  runTask(){
    while(this.runningTaskCount < this.poolSize && this.waiting.length > 0){
      const {fn,resolve} = this.waiting.shift()
      this.runningTaskCount++
      fn().then(()=>{
        resolve()
        this.runningTaskCount--
        this.runTask()
      })
    }
  }
}

const superTask = new SuperTask({poolSize :2})
function addTask(time,name){
  const label = `任务${name},完成`
  console.time(label)
  superTask.add(()=>timeout(time)).then(()=>{
    console.timeEnd(label)
  })
}

addTask(10000,1)  // 10s后输出：任务1,完成
addTask(5000,2)   // 5s后输出：任务2,完成
addTask(3000,3)  // 8s后输出：任务3,完成
addTask(4000,4)  // 11s后输出：任务4,完成
addTask(5000,5)  // 12s后输出：任务5,完成
setTimeout(() => {
  superTask.setPoolSize(5)
}, 7000);

```


## 4. 问题：多维数组将为一维数组
```js
const arr = [1,2,[3,4,[5,6]]]
function flatten(arr){
  return arr.reduce((pre,cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  },[])
}
console.log(flatten(arr))
```



## 5. 问题：找到页面所有a标签的href属性
```js
Array.from(document.getElementsByTagName('a')).map(item => item.href)
```


## 6. 问题：如何给按钮绑定两个事件
```js
const btn = document.getElementById('btn')

btn.addEventListener('click',()=>{
  console.log('点击事件')
})
btn.addEventListener('click',()=>{
  console.log('点击事件2')
})
```


## 7. 问题：实现拖拉拽功能
```html
<div id="box" style="width: 100px;height: 100px;background-color: red;position: absolute;left:0;top:0"></div>
<script>
const box = document.getElementById('box')

let moving = false
let xBuffer = 0
let yBuffer = 0

document.addEventListener('mousedown',(e)=>{
  if(moving && e.target.id !== 'box') return
  const {clientX,clientY} = e
  const {left,top} = box.style
  moving = true
  xBuffer = clientX - Number(left.substr(0,left.indexOf('px')))
  yBuffer = clientY - Number(top.substr(0,top.indexOf('px')))
})

document.addEventListener('mousemove',(e)=>{
  if(!moving) return
  const {clientX,clientY} = e
  box.style.left = clientX - xBuffer + 'px'
  box.style.top = clientY - yBuffer + 'px'
})

document.addEventListener('mouseup',(e)=>{
  if(!moving) return
  moving = false
})
</script>
```

## 8. 问题：原地打乱数组（数组洗牌）
```js
// 输入：[1,2,3,4,5,6,7,8,9]
// 输出：[2,1,4,3,6,5,8,7,9]
function shuffle(arr){
  for(let i = arr.length - 1;i>0;i--){
    const randomIndex = Math.floor(Math.random() * i)
    // [arr[i],arr[randomIndex]] = [arr[randomIndex],arr[i]]
    const temp = arr[i]
    arr[i] = arr[randomIndex]
    arr[randomIndex] = temp
  }
  return arr
}

const arr = [1,2,3,4,5,6,7,8,9]
console.log(shuffle(arr))
```

不能用Array.sort方法来打乱数组的原因：
Array.sort方法是不稳定的排序算法，即相等的元素的相对顺序可能会改变。在极端下数组不会被打乱，有50%的概率原封不动。
```js
const arr = [1,2]
arr.sort((a,b) => Math.random() > 0.5 ? 1:-1)
console.log(arr)
```


## 9. 问题：对象深拷贝
```js
// 方案1
JSON.parse(JSON.stringify())

// 方案2
const deepClone = function(obj){
  if(typeof obj !== 'object' || obj === null) return obj
  let copyObj;
  if(Array.isArray(obj)){
    copyObj = []
    for(let i = 0;i<obj.length;++i){
      copyObj.push(deepClone(obj[i]))
    }
  }else if(obj instanceof Set){
    copyObj = new Set([...obj])
  }else if(obj instanceof Map){
    copyObj = new Map([...obj])
  }else{
    copyObj = {}
    Reflect.ownKeys(obj).forEach(key => {
      copyObj[key] = deepClone(obj[key])
    })
  }

  return copyObj
}

const obj = {
  [Symbol('a')]:'111',
  set:new Set([1,2,3]),
  map:new Map([['a',1],['b',2]]),
  a:1,
  b:'2',
  c:true,
  d:[{
    d1:1
  },{
    d2:2
  }],
  e:{
    e1:1,
    e2:2
  },
  f:function(){
    console.log('function',123)
  }
}

const fObj = deepClone(obj)
console.log(fObj)

fObj.f = function(){
  console.log('function',456)
}
obj.f()
fObj.f()

fObj.d[0].d1 = 100
console.log(obj.d[0].d1)
console.log(fObj.d[0].d1)

fObj.e.e1 = 100
console.log(obj.e.e1)
console.log(fObj.e.e1)

fObj.set.add(4)
console.log(obj.set)
console.log(fObj.set)

fObj.map.set('a',3)
console.log(obj.map)
console.log(fObj.map)

Reflect.ownKeys(fObj).forEach(key => {
  obj[key] = 1
})
console.log(obj)
console.log(fObj)

```

## 10. 问题：判断对象是否存在循环引用
```js
// visited = new WeakSet() 用于记录已访问对象的WeakSet（默认值为新的WeakSet）
// 使用WeakSet避免内存泄漏（WeakSet中的引用是弱引用)
function hasCircularReference(obj,visited = new WeakSet()){
   // 1. 检查是否为对象
  if(obj && typeof obj === 'object'){
    // 2. 如果对象已经在visited中，说明存在循环引用
    if(visited.has(obj)) return true
     // 3. 将当前对象添加到visited中
    visited.add(obj)
     // 4. 遍历对象的所有属性（包括Symbol属性）
    const keys = Reflect.ownKeys(obj)
    for(let i = 0;i<keys.length;++i){
      // 5. 递归检查每个属性值
      if(hasCircularReference(obj[keys[i]],visited)) return true
    }
    // 6. 回溯：从visited中移除当前对象
    visited.delete(obj)
  }
  // 7. 没有发现循环引用
  return false
}

const obj = {a:1}
obj[Symbol('d')] = obj
console.log(hasCircularReference(obj))
```


## 11. 问题：实现一个柯里化函数  add
1. add(1,2,3).valueOf()   // 6
2. add(1)(2)(3).valueOf() // 6
3. add(1)(2)(3,4).valueOf() // 10
```js
const curry = (...args1) => {
  let params = args1

  const addFn = (...args2) => {
    params = params.concat(args2)
    return addFn
  }

  addFn.valueOf = () => {
    return params.reduce((pre,cur) => {
      return pre + cur;
    },0)
  }
  return addFn
}
```


## 12. 问题：通用柯里化高阶方法
```js
const curry = (fn) => {
  let params = []
  const curried = (...args) => {
    if(args.length <= 0){
      const allParams = params
      params = []
      return fn(...allParams)
    }
    params = params.concat(args)
    return curried
  }
  return curried
}

function add(...args){
  const result = args.reduce((pre,cur) => pre + cur,0)
  console.log(result)
}
add(1,2,3)

const currAdd = curry(add)
currAdd(1)(2)(3)()
currAdd(1)(2)(3,4)()


function logger(...args){
  let content = ''
  for(let i = 0;i<args.length;++i){
    content += args[i]
  }
  console.log(content)
}

```

## 13. 问题：字符串"abcde"反转
```js
// 方案1
const str = 'abcde'
console.log(str.split('').reverse().join(''))

// 方案2
const str = 'abcde'
const resultStr = Array.from(str).reduce((pre,cur) => cur + pre,'')
console.log(resultStr)

```


## 14. 问题：实现一个防抖函数
当事件触发之后，会设定一个定时器，在指定的延迟时间后再执行相应的操作，如果再延迟时间内再次触发了同一个事件，那么就会清除之前的定时器，并重新设置新的定时器直到事件触发完成
```js
function debounce(fn,delay){
  let timer
  return function(...args){
    clearTimeout(timer)
    
    timer = setTimeout(() => {
      fn.apply(this,args)
      timer = null
    },delay)
  }
}
document.addEventListener('scroll',debounce(() => {
  console.log('scroll')
},1000))
```

## 15. 问题：实现一个节流函数
当事件触发之后，会设定一个定时器，在指定的延迟时间后再执行相应的操作，如果在延迟时间内再次触发了同一个事件，那么就会忽略该事件，直到延迟时间结束后再执行一次操作
```js
function throttle(fn,delay){
  let timer
  return function(...args){
    if(timer){
      return
    }
    timer = setTimeout(() => {
      fn.apply(this,args)
      timer = null
    },delay)
  }
}
document.addEventListener('scroll',throttle(() => {
  console.log('scroll')
},1000))
```


## 16. 问题：实现一个方法，能上传多张图片，保持单次N张上传，n张里如果有1张上传超哥，然后补上1张，就一直维持N张上传
```js
const urls = ['url1','url2','url3','url4','url5','url6','url7']

// 模拟上传
const uploadImg = (url) => {
  return new Promise(resolve => {
   console.log(`上传图片${url}`)
   setTimeout(() => {
     resolve(url)
     console.log(`图片${url}上传成功`)
   },Math.random() * 3000)
  })
}

// 1. 并发5张
// 2. 补充间隔100ms,上传下一张
const warpRequest = (imgList) => {
  // 请求状态标记位
  const resultMap = {};
  imgList.forEach(url => {
    resultMap[url] = false
  });

  let index = 0

  return new Promise(resolve =>{
    const download = () => {
      // 跳出条件
      if(index >= imgList.length){
        if(!Object.keys(resultMap).find(key => resultMap[key] === false)){
          resolve(resultMap)
        }
        return
      }

      // 上传图片
      const tempUrl = imgList[index]
      uploadImg(tempUrl).then(res => {
        resultMap[res] = true
       setTimeout(() => {
        download()
       },100)
      })

      ++index
    }
    while(index < 5){
      download()
    }
  })
}

(async () => {
  const res = await warpRequest(urls)
  console.log(res)
})();

```


## 17. 问题：获取当前日期（年-月-日 时：分）
```js
function formatDateTime(currentDate){
  const year = currentDate.getFullYear()
  const month = (currentDate.getMonth() + 1).toString().padStart(2,'0')  // 月份从0开始，需要+1
  const day = currentDate.getDate().toString().padStart(2,'0') 
  const hour = currentDate.getHours().toString().padStart(2,'0')
  const minute = currentDate.getMinutes().toString().padStart(2,'0')
  const second = currentDate.getSeconds().toString().padStart(2,'0')

  return `${year}-${month}-${day} ${hour}:${minute}`
}

console.log(formatDateTime(new Date()))
```

## 18. 问题：实现一个once函数，传入函数参数只执行一次
```js
function once(fn){
  let called = false
  return function(...args){
    if(!called){
      called = true
      return fn.apply(this,args)
    }
  }
}

const doSomethingOnce = once(() => {
  console.log('do something once')
})

doSomethingOnce()
doSomethingOnce()
```


## 19. 问题：实现一个私有变量，用get,set可以访问，不能直接访问
```js
const privateName = Symbol();

class Person{
  constructor(name){
    this[privateName] = name
  }
  getName(){
    return this[privateName]
  }
  setName(name){
    this[privateName] = name
  }
}

const person = new Person('张三')
console.log(person.getName())
person.setName('李四')
console.log(person.getName())
```


## 20. 问题：将原生的ajax封装成promise
```js
function ajax(url,method,data){
  return new Promise((resolve,reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method,url,true)
    xhr.onload = () => {
      if(xhr.status >= 200 && xhr.status < 300){
        resolve(xhr.responseText)
      }else{
        reject(new Error(xhr.statusText))
      }
    }
    xhr.onerror = () => {
      reject(new Error(xhr.statusText))
    }

    if(data){
      xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8')
      xhr.send(JSON.stringify(data))
    }else{
      xhr.send()
    }
    
  })
}

ajax('https://www.baidu.com','GET').then(res => {
  console.log(res)
})
.catch(err => {
  console.log(err)
})

```


## 21. 问题：实现sleep效果
```js
async function sleep(time){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    },time)
  })
}

(async () => {
  console.log('start')
  await sleep(2000)
  console.log('end')
})()
```


## 22. 问题：实现下载图片的功能
```js
function downloadImg(src,filename){
 let image = new Image()
 image.src = src
 image.setAttribute('crossOrigin','anonymous')
 image.onload = () => {
  let canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  let ctx = canvas.getContext('2d')
  ctx.drawImage(image,0,0,image.width,image.height)
  let a = document.createElement('a')
  a.href = canvas.toDataURL('image/png')
  a.download = filename
  a.click()
 }
}
```

## 23. 问题：实现前端添加水印
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="watermark-container" style="position: relative;width:200px;height:200px;background-color: #f0f0f0;"></div>

  <script>
    function addWatermark(text){
      const container = document.getElementById('watermark-container')
      const canvas = document.createElement('canvas')
      canvas.width = 200  // 水印宽度
      canvas.height = 150  // 水印高度
      const ctx = canvas.getContext('2d')
      ctx.font = '20px serif'
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.rotate(-Math.PI/6)  // 水印旋转角度
      ctx.fillText(text,50,100)

      container.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`
      container.style.backgroundRepeat = 'repeat'   // 水印重复

    }
    addWatermark('水印')
  </script>

</body>
</html>
```

