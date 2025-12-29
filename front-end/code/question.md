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
  const visited = new Set();
  const loadOrder = [];
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
