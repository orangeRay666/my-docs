# vue 题目

## 1. 问题：vue2 不能监听数组下标原因

- vue2 使用 Object.defineProperty()来监听对象属性的变化，而数组的下标是对象的属性，所以不能直接监听数组下标。
- Object.defineProperty()是可以劫持数组的

```js
const arr = [1, 2, 3, 4];
Object.keys(arr).forEach(function (key) {
  Object.defineProperty(arr, key, {
    get: function () {
      console.log("key:" + key);
    },
    set: function (newVal) {
      console.log("value:" + newVal);
    },
  });
});
arr[1];
arr[2] = 4;

// 输出 key:1
// value:4
```

- 真实情况： 是 Object.defineProperty 可以劫持数组而 vue2 没有用来劫持数组
- 原因：Object.defineProperty()是属性级别的劫持，如果按上面代码的方式劫持，随着数组长度增加，会有很大的性能损耗，导致框架的性能不稳定，因此 vue2 放弃一定的用户便利性，提供$set 方法去操作数组，以最大程度保证框架的性能稳定。

```js
// Vue2 示例
data() {
    return {
        list: ['a', 'b', 'c']
    }
}

// 不会触发响应式更新
this.list[0] = 'x'  // ❌ 不会触发视图更新
this.list.length = 0  // ❌ 不会触发视图更新


// ✅ 正确的方式 - 使用变异方法
this.list.splice(0, 1, 'x')  // 替换第一个元素
this.list.push('new item')    // 添加新元素

// ✅ 使用 Vue.set 或 this.$set
this.$set(this.list, 0, 'x')

// ✅ 使用新数组替换
this.list = [...this.list.slice(0, 0), 'x', ...this.list.slice(1)]
```

## 2. 问题：vue2 和 vue3 的具体区别

1. **响应式系统**：
   - Vue2 使用`Object.defineProperty`来实现其响应式系统。这种方法有一些限制，例如无法检测属性的添加或删除，以及无法直接处理数组索引和长度的变化。
   - Vue3 使用了基于 ES6 的`Proxy`对象来实现响应式系统。`Proxy`可以直接监听对象的变化，包括属性的添加、删除、数组索引的变化等，因此 Vue3 可以更灵活地处理响应式需求。
2. **组合式 API**：
   - Vue2 主要通过选项式 API（如 data,methods,computed 等）来组织代码。
   - Vue3 则引入了组合式 API（如 ref,reactive,computed,watch），允许开发者更灵活地组织代码，并且可以更好地利用 Vue3 的新特性。
3. **性能相关**：
   - Vue3 在性能方面有显著提升。他包括更小的打包大小，更快的虚拟 DOM 重写，更高效的组件初始化等
   - Vue2 相比之下在性能方面相对较慢，尤其是在处理大型应用和复杂组件时
4. **TypeScript 支持**：
   - Vue3 从一开始就以 TypeScript 编写，提供了更好的类型检查和开发体验。
   - Vue2 则需要额外的类型定义文件（如`.d.ts`文件）来支持 TypeScript。
5. **新特性和改进**：
   - Vue3 引入了多个新特性，如 Teleport,Fragment,Suspense 等，这些特性使得组件的组织和渲染更加灵活。
6. **Fragment**：
   - Vue2 要求每个组件必须有一个单独的根节点
   - Vue3 允许多个根节点（Fragment），这使得组件模块可以有多个并列的根元素。
7. **自定义渲染器 API**：
   - Vue3 提供了自定义渲染器 API，允许开发者创建自己的渲染逻辑
8. **更好的模块化**：
   - Vue3 对内部模块进行了更好的分离，使 tree-shaking 更加有效，有助于减少最终的打包体积
9. **静态元素提升（Static Hoisting）**：
   - Vue2 中，模块中的所有元素在每次重新渲染时都会被创建新的虚拟节点（VNode），包括静态元素（不变的 HTML 和文本）
   - Vue3 引入了静态元素提升的概念。在编译模块时，vue3 会检测出静态内容并将其提升，意味着这些内容只在初始渲染时创建一次。后续的渲染中，静态内容会被重用，从而减少了渲染开销和提升了性能。
10. **虚拟节点静态标记（Patch Flag）**
    - Vue2 在更新组件时，会进行相对全面的虚拟 DOM 比较，这可能会导致性能开销
    - Vue3 引入了 Path Flag 这是一种优化技术，他在编译时标记虚拟节点的动态部分。这样在组件更新时 Vue 只选哟关注这些被标记的部分，而不是整个组件树，从而显著提升了性能
11. **生命周期变化**
    - Vue2 提供了一系列的生命周期钩子，如 created mounted updated destroyed 等
    - Vue3 对这些生命周期钩子进行了重命名和调整，以更好的与 composition API 配合。例如 beforeDestory 和 destoryed 分别更名为 beforeUnmount 和 unmounted。此外，Vue3 还引入了新的生命周期钩子，如 onMounted,onUpdated,onUnmounted 等，这些钩子更符合组合式 API 的风格。
12. **打包体积优化**
    - Vue2 打包体积相对较大，尤其是在包含了全框架的所有特性时
    - Vue3 进行了大量的打包体积优化。他采用了更有效的树摇（Tree-shaking）机制，允许去除未使用的代码部分。这意味着如果你只使用 vue 的一部分功能，最终打包出来的文件会更小


## 3. 问题：vue 的通讯方式

通讯用于组件间数据传递与共享

- **vue 中有 8 种常规的通讯方式**

  - 通过 props 传递
  - 通过$emit 触发自定义事件
  - 使用 ref
  - EventBus
  - $parent或$root
  - attrs 与 listeners
  - Provide 与 Inject
  - Vuex

- **组件间通信的分类可以分成以下**
  - 父子关系的组件数据传递选择 props 与$emit 进行传递，也可选择 ref
  - 兄弟组件之间的通信（EventBus）其次可以选择$parent 进行传递
  - 祖先与后代组件数据传递可选择 attrs 与 listeners 或者 Provide 与 Inject
  - Vuex 状态管理（全局状态共享）

## 4. 问题：vue 的常用修饰符

```html
1、表单修饰符 （1）.lazy
在默认情况下，v-model在每次input事件触发后将输入框的值与数据进行同步，可以添加lazy修饰符，从而转为在change事件之后进行同步
<input v-model.lazy="message" />

（2）.number 如果想自动将用户的输入值转为数值类型，可以添加number修饰符
<input v-model.number="age" type="number" />

（3）.trim 如果要自动过滤用户输入的首尾空格，可以添加trim修饰符
<input v-model.trim="message" />

2、事件修饰符 （1）.stop 阻止单击事件继续传播，即停止事件的冒泡
<div @click="divClick">
  <button @click.stop="btnClick">点击我</button>
</div>

（2）.prevent 阻止标签的默认事件
<a href="https://www.baidu.com" target="_blank" @click.prevent="clickJump"
  >点击跳转</a
>

（3）.capture 事件先在有capture修饰符的元素捕获，然后再在目标元素触发
<!-- 这里先执行divClick 然后再执行btnClick -->
<div @click.capture="divClick">
  <button @click="btnClick">点击我</button>
</div>

（4）.self 只有事件目标是当前元素时触发回调,即事件不是从内部元素触发的
<!-- 这里点击按钮不会触发divClick，只有点击test才会触发 -->
<div @click.self="divClick">
  test
  <button @click="btnClick">点击我</button>
</div>

（5）.once 事件只触发一次
<a v-on:click.once="aClick">点击我</a>

（6）.passive
.passive修饰符尤其能提升移动端的性能，传统上，滚动事件监听器会阻止滚动事件的默认行为。这意味着如果你在一个滚动容器种监听滚动事件，并且在事件处理程序种执行了某些操作（例如更新DOM或执行计算密集型任务），浏览器会等待事件处理程序执行完毕后在执行滚动操作，着可能导致滚动不平滑或卡顿。
.passive修饰符的作用是告诉浏览器，滚动事件监听器不会阻止滚动事件的默认行为，因为浏览器可以在滚动事件监听器执行时立即进行滚动操作，从而是西安更加流畅的滚动体验。
使用.passive修饰符可以提高页面的响应性能，尤其是在处理大量滚动事件时。但是.passive修饰符只在支持addEventListener方法的浏览器中有效，并且只能用于滚动事件监听器。
<!-- 滚动事件的默认行为（即滚动行为）将会立即触发 -->
<!-- 而不会等待handleScroll执行完毕 -->
<!-- 这其中包含`event.preventDefault()`的情况 -->
<div @scroll.passive="handleScroll">
  <!-- 内容 -->
</div>
```

## 5. 问题：vue2 初始化过程做了哪些事情

1. 构造函数初始化

```js
// Vue 构造函数
function Vue(options) {
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }
  this._init(options); // 核心初始化方法
}
```

2. \_init()方法 - 核心初始化流程

```js
Vue.prototype._init = function (options) {
  const vm = this;

  // 合并配置项
  if (options && options._isComponent) {
    // 组件初始化
    initInternalComponent(vm, options);
  } else {
    // 根实例初始化
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    );
  }

  // 初始化生命周期
  initLifecycle(vm);

  // 初始化事件系统
  initEvents(vm);

  // 初始化渲染函数
  initRender(vm);

  // 调用 beforeCreate 钩子
  callHook(vm, "beforeCreate");

  // 初始化依赖注入
  initInjections(vm);

  // 初始化响应式数据
  initState(vm);

  // 初始化 provide
  initProvide(vm);

  // 调用 created 钩子
  callHook(vm, "created");

  // 如果提供了 el 选项，则自动挂载
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
};
```

**初始化过程总结**

1. 配置合并：合并全局配置和实例配置
2. 生命周期初始化：建立组件关系树
3. 事件系统初始化：处理父组件传递的事件
4. 渲染函数初始化：创建虚拟 DOM 相关函数
5. 调用 beforeCreate 钩子
6. 依赖注入初始化
7. 响应式数据初始化（核心）：
   - 初始化 props、methods、data、computed、watch
   - 建立数据响应式系统
   - 代理 data 到实例
8. provide 初始化
9. 调用 created 钩子
10. 自动挂载（如果提供了 el 选项）

## 6. 问题：created 和 mounted 这两个生命周期的区别

- **`created`生命周期钩子**：
  - `created`生命周期钩子在组件实例被创建之后立即被调用
  - 在这个阶段，组件实例已经被创建，但它的模块还没有渲染到 DOM 中。可以在这个阶段执行一些与数据初始化和逻辑相关的任务，但无法访问到已经渲染的 DOM 元素
  - 通常用于进行数据的初始化，设置初始状态，艰辛异步请求（例如获取数据），以及数据准备好后执行逻辑
  - 不能操作 DOM 元素，因为 DOM 还没有被渲染
- **`mounted`生命周期钩子**：
  - `mounted`生命周期钩子在组件实例被挂载到 DOM 之后被调用
  - 在这个阶段，组件实例的模块已经渲染到 DOM 中，并且可以访问到 DOM 元素，这通常用于执行需要访问 DOM 的任务，例如操作 DOM 元素，添加事件监听器，或执行与 DOM 相关的操作
  - 通常用于进行 DOM 操作、初始化第三方库、发送网络请求等需要依赖 DOM 的任务
  - 可以操作 DOM 元素，因为 DOM 已经被渲染

## 7. 问题：vue 的$nextTick 是如何实现的

- 当调用`this.$nextTick(callback)`时，会将`callback`函数存储在一个队列中，以便稍后执行。
- 检查当前是否正在进行 DOM 更新周期。如果是，它会将`callback`函数推到一个专门用于在更新周期结束后执行的队列中
- 如果当前不在 DOM 更新周期中，Vue.js 会使用 JavaScript 的`Promise`或`MutationObserver`，具体取决于浏览器支持情况，来创建一个微任务（microtask）。
- 微任务是 JavaScript 引擎在执行栈清空后立即执行的任务。因此，`callback`函数会在下一个微任务中被执行，这就确保了它在下一次 DOM 更新周期之前执行
- 一旦当前的执行栈清空，JavaScript 引擎就会检查并执行微任务队列中的任务，其中包括`$nextTick`队列中的任务。

## 8. 问题：为什么 vue 中的 data 是一个 function 而不是普通 object

- 因为 vue 组件是可复用的，而每个组件实例都应该有自己的独立数据副本。如果 data 是一个普通 object，所有组件实例都会共享同一个数据对象，这会导致数据污染和不可预测的行为。
- 为了避免这个问题，vue 将 data 定义为一个 function，每个组件实例在创建时会调用这个 function 来返回一个新的数据对象。这样每个组件实例都有自己独立的数据副本，互不干扰。
- 同时，将 data 定义为一个 function 也符合 vue 的组件化设计思想，每个组件都是一个独立的模块，应该有自己的状态管理。

## 9. 问题：vue 的父组件和子组件生命周期钩子函数执行顺序

- **加载渲染过程**：父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
- **子组件更新过程**：父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
- **父组件更新过程**：父 beforeUpdate -> 父 updated
- **父组件销毁过程**：父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

## 10. 问题：watch 和 computed 有什么区别

- **`computed`**

  - 计算属性：`computed`是用于创建计算属性的方式，它依赖于 Vue 的响应式系统来进行数据追踪。当依赖的数据发生变化时，计算属性会自动重新计算，而且旨在必要时才重新计算
  - 缓存： 计算属性具有缓存机制，只有在它依赖的数据发生变化时，计算属性才会重新计算，这意味着多次访问同一个计算属性会返回相同的结果，而不会重新计算。
  - 无副作用： 计算属性应当是无副作用的，他们只是基于数据的计算，并不会修改数据本身
  - 用于模板中： 计算属性通常用于模板中，以便在模板中显示派生数据
  - 必须同步：只对同步代码中的依赖响应

- **`watch`**
  - 监听数据：`watch`用于监听数据变化，你可以监听一个或多个数据的变化，以执行自定义的响应操作
  - 副作用操作：`watch`中的回调函数可以执行副作用操作，例如发送网络请求，手动操作 DOM，或执行其他需要的逻辑
  - 不缓存： `watch`中的回调函数会在依赖数据变化时立即被触发，不会像`computed`那样具有缓存机制
  - 用于监听数据变化： `watch`通常用于监听数据的变化，而不是用于在模板中显示数据
  - 支持异步：在检测数据变化后，可进行同步或异步操作

## 12. 问题：computed 的机制，缓存了什么？为什么不支持异步？

- Vue.js 中的`computed`属性确实具有缓存机制，这个缓存机制实际上是指对计算属性的指进行了缓存。当你在模板中多次访问同一个计算属性时，Vue.js 只会计算一次这个属性的值，然后将结果缓存起来，以后再次访问时会直接返回缓存的结果，而不会重新计算。
- 假设你有一个计算属性`fullName`,它依赖于`firstName`和`lastName`。当`firstName`或`lastName`发生变化时，`fullName`会自动重新计算。但是，假设你在模板中多次访问`fullName`，Vue.js 只会计算一次`fullName`的值，然后将结果缓存起来。以后再次访问`fullName`时，Vue.js 会直接返回缓存的结果，而不会重新计算。

- vue 设计层面决定了 computed 不支持异步，computed 的定义，“依赖值改变 computed 值就会改变”，所以这里必须是同步的，否则就可能“依赖值改变但 computed 值未改变”，一旦 computed 支持异步，computed 就违背了定义，会变得不稳定。相反，watch 的定义是“监听的数据改变后，它做某件事”，那 watch 在监听变化后，做同步异步都可以，并不违背定义。

```js
// 有效
computed:{
   async value(){
      return this.a + this.b  // 有效
   }
}

// 无效
computed:{
   async value(){   // 外部接住promise
      const res = await new Promise(resolve => {
         setTimeout(() => {
            resolve(this.a + this.b)
         }, 1000)
      })
      console.log(res)  // 输出
      return res;
   }
}
```

## 13. 问题：vue3 中 ref 和 reactive 的区别，区分 ref 和 reactive 的原因

- ref 生成响应式对象，主要用于处理基础数据类型（如数字、字符串、布尔值）
- reactive 代理整个对象，主要用于处理引用类型（如对象、数组）

```js
// ref 返回一个包含 .value 属性的对象
const count = ref(0)
console.log(count) // { value: 0 }
// ref 需要通过 .value 访问
console.log(count.value) // 0

// reactive 返回一个Proxy代理对象
const state = reactive({ count: 0 })
console.log(state) // Proxy { count: 0 }
// reactive 直接访问属性
console.log(state.count) // 0


// ref - 模板中自动解包，无需 .value
<template>
  <div>{{ count }}</div>  <!-- 自动解包 -->
</template>

// reactive - 直接访问属性
<template>
  <div>{{ state.count }}</div>
</template>

```

1. **模板解包**：基础数据类型（如数字，字符串，布尔值）不是对象，因此无法直接被`proxy`拦截。`proxy`可以拦截对象级别的操作，如属性访问、赋值、枚举等。使用`ref`创建的响应式引用在 Vue 模板中被自动解包。这意味着当你在模板中使用`ref`创建的变量时，可以直接使用而不需要每次都通过`.value`访问。如果使用`proxy`来处理基础类型，这种自动解包可能就无法实现，从而增加了模板中的代码复杂性。

2. **API 可读性**：Vue3 提供了`ref`和`reactive`两种创建响应式对象的方式。`ref`用于创建基础类型的响应式引用，而`reactive`用于创建引用类型的响应式对象。这两种方式的 API 设计不同，`ref`返回的是一个对象，而`reactive`返回的是一个代理对象。这使得在模板中使用`ref`创建的变量时，不需要额外的`.value`访问，而在`reactive`创建的对象中，需要通过属性访问来获取值。

3. **内存性能考虑**：虽然这可能不是主要因素，但使用`proxy`可能会比使用简单的 getter 和 setter 占用更多内存资源，尤其是在处理大量数据时。考虑到基础数据类型的简单性，使用更轻量级的解决方案（如 getter 和 setter）可能是一个更有效的选择

Vue3 在处理基础数据类型时选择使用 ref 和 getter/setter 是基于对效率、简洁性、API 设计和开发者体验的综合考虑。这种方法为不同类型的数据提供了适当的响应式解决方案，同时保持了框架的整体一致性和易用性。


## 14. 问题：Vue响应式Observer、Dep、Watcher
vue 响应式系统由 Observer、Dep、Watcher 三部分组成。

- Observer：负责将数据转换为响应式对象，当数据发生变化时，会通知 `Dep` 进行更新。
- Dep：依赖收集器，负责收集依赖（`Watcher`）并在数据变化时通知它们进行更新。
- Watcher：响应式依赖，当依赖的响应式数据发生变化时，会自动调用回调函数进行更新。

在数据被读的时候，触发`get`方法，执行`Dep`来收集依赖，也就是收集`Watcher`
在数据被改的时候，触发`set`方法，通过对应的所有依赖`watcher`去执行更新


