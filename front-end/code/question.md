# 算法题整理

## --代码编程--
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


