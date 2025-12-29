# HTML + CSS 面试题整理

## 1. 问题：什么是重绘，什么是回流？如何减少回流？

- **重绘（Repaint）**

  - 定义：元素的外观发生改变，但是没有改变布局，浏览器会重新绘制元素的外观，这个过程称为重绘。
  - 触发条件：元素的外观发生改变，例如改变元素的颜色、背景颜色、边框颜色等。
  - 影响：重绘不会改变元素的位置和大小，只是改变了元素的外观。
  - 性能影响：重绘的成本相对较低，因为它只涉及到元素的外观变化，只需要重新绘制已计算好的元素样式，而不是布局变化。

- **回流（Reflow）**

  - 定义：元素的布局发生改变，浏览器需要重新计算元素的位置和大小，这个过程称为回流。
  - 触发条件：元素的布局发生改变，例如改变元素的宽度、高度、位置、隐藏元素等。
  - 影响：回流会导致元素的位置和大小发生改变，可能会影响到其他元素的布局。
  - 性能影响：回流的成本相对较高，因为它涉及到元素的位置和大小的重新计算。

- **减少回流的方法**
  - **使用 css 动画代替 js 动画**：CSS 动画利用 GPU 加速，在性能方面比 js 动画更高效。使用 CSS 的`transform`和`opacity`属性来实现动画，避免直接操作元素的位置和大小。
  - **使用`requestAnimationFrame`方法**来调度动画帧，来批量操作 DOM 元素，避免频繁的操作 DOM 元素，这种方法可以确保动画在最佳实践内进行渲染。
  - **使用`translate3d`开启硬件加速**：将元素的`transform`属性设置为`translate3d(0, 0, 0)`，可以开启元素的硬件加速，从而避免回流，并提高动画的流畅度。
  - **避免频繁的操作布局的样式属性**：当需要对元素进行多次样式修改时，可以考虑合并为一次操作。通过添加/移除 css 类来一次性改变多个样式，而不是逐个修改。
  - **使用文档片段（DocumentFragment）来批量操作 DOM 元素**，将元素添加到文档片段中，最后一次性添加到 DOM 树中，避免频繁的操作 DOM 元素，从而减少回流的次数。
  - **让元素脱离文档流**：例如将元素的`position`属性设置为`absolute`或` fixed``flost `，可以将元素从文档流中脱离出来，避免对其他元素的影响。
  - **避免使用复杂的选择器**，选择器的复杂度会影响回流的性能。
  - **使用 visibility: hidden 或 display: none 来隐藏元素**，因为仍占空间但是不可见，避免使用`display:none`会将元素从渲染树中移除进而引发回流。

## 2. 问题：Margin 塌陷问题如何解决？BFC 是什么？怎么触发

**代码块 html**

```html
<html>
  <head>
    <style type="text/css">
      .box {
        width: 100px;
        heigth: 100px;
        background: #000;
      }
      #box1 {
        margin-bottom: 200px;
      }
      #box2 {
        margin-top: 100px;
      }
    </style>
  </head>
  <body>
    <div id="box1" class="box"></div>
    <div id="box2" class="box"></div>
  </body>
</html>
```

- **margin 塌陷问题：** 上面例子两个 div 的间隔为 200px,取 margin 重叠的最大值（符合 css 的外边距合并规则），如果希望间距为 300px，可以让每个 div 触发 BFC，
- **BFC 定义** 全称叫块级格式化上下文（Block Formatting Context），是一个独立的渲染区域，内部元素的渲染不会影响到外部元素。
- **触发 BFC 的条件**：
  - 根元素（html）
  - 浮动元素（float 除了 none 以外的值）
  - 绝对定位元素（position 为 absolute 或 fixed）
  - 行内块元素（display 为 inline-block）
  - 表格单元格（display 为 table-cell）
  - 表格标题（display 为 table-caption）
  - overflow 除了 visible 以外的值（hidden、auto、scroll）

## 3. 问题：如何隐藏一个元素？

| 方法                         | 占位 | 点击事件 |
| ---------------------------- | :--: | :------: |
| display:none                 |  x   |    x     |
| opacity:0                    |  √   |    √     |
| visibility：hidden           |  √   |    x     |
| clip-path:circle(0)          |  √   |    x     |
| position:absolute;top:-999px |  x   |    √     |

## 4. 问题：overflow 不同值的区别

| 属性值            | 效果                                                                                    |
| ----------------- | :-------------------------------------------------------------------------------------- | --- |
| `visible`(默认值) | 内容超出容器边界时，不剪切内容，显示在容器外部。会覆盖其他元素                          |
| `hidden`          | 内容超出容器边界时，剪切内容，不显示在容器外部                                          |
| `scroll`          | 内容超出容器边界时，总是显示滚动条，即使内容没有移除也会显示滚动条，但是会被禁用        | l   |
| `auto`            | 内容超出容器边界时，根据需要显示滚动条,跟`scroll`类似不同的是只有溢出内容才会显示滚动条 |
| `inherit`         | 从父元素继承 overflow 属性值                                                            |

## 5. 问题：三栏布局的实现方式（圣杯模型）

三栏布局是常见的网页布局格式，包含固定宽度的左右侧边栏以及一个自适应宽度的主要内容区域

- **Flex 布局**
  - 利用 Flex 布局可以很方便地实现三栏布局，将容器设置为 Flex 布局，然后将左右侧边栏设置为固定宽度，主要内容区域设置为自适应宽度`flex:1`即可。

```html
<html>
  <head>
    <style type="text/css">
      .container {
        display: flex;
      }
      .left,
      .right {
        width: 100px;
      }
      .main {
        flex: 1;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left" style="border:1px solid #000;">Left sidebar</div>
      <div class="main" style="border:1px solid #000;">Main content</div>
      <div class="right" style="border:1px solid #000;">Right sidebar</div>
    </div>
  </body>
</html>
```

- **浮动布局**
  - 利用浮动布局可以实现三栏布局，将左右侧边栏设置为固定宽度，主要内容区域设置为自适应宽度。

```html
<html>
  <head>
    <style type="text/css">
      .container {
        width: 100%;
        overflow: hidden;
      }
      .left {
        width: 100px;
        float: left;
      }
      .main {
        margin-left: 100px;
        margin-right: 100px;
      }
      .right {
        width: 100px;
        float: right;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left" style="border:1px solid #000;">Left sidebar</div>
      <div class="main" style="border:1px solid #000;">Main content</div>
      <div class="right" style="border:1px solid #000;">Right sidebar</div>
    </div>
  </body>
</html>
```

- **grid 布局**
  - 利用 grid 布局可以实现三栏布局，将容器设置为 Grid 布局，然后将左右侧边栏设置为固定宽度，主要内容区域设置为自适应宽度。

```html
<html>
  <head>
    <style type="text/css">
      .container {
        display: grid;
        grid-template-columns: 100px 1fr 100px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left" style="border:1px solid #000;">Left sidebar</div>
      <div class="main" style="border:1px solid #000;">Main content</div>
      <div class="right" style="border:1px solid #000;">Right sidebar</div>
    </div>
  </body>
</html>
```

- **绝对定位布局**
  - 利用绝对定位布局可以实现三栏布局，将容器设置为相对定位，然后将左右侧边栏设置为固定宽度，主要内容区域设置为自适应宽度。

```html
<html>
  <head>
    <style type="text/css">
      .container {
        position: relative;
      }
      .left {
        width: 100px;
        position: absolute;
        top: 0;
        left: 0;
      }
      .main {
        margin-left: 100px;
        margin-right: 100px;
      }
      .right {
        width: 100px;
        position: absolute;
        top: 0;
        right: 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left" style="border:1px solid #000;">Left sidebar</div>
      <div class="main" style="border:1px solid #000;">Main content</div>
      <div class="right" style="border:1px solid #000;">Right sidebar</div>
    </div>
  </body>
</html>
```

## 6. 问题：calc()方法

`calc()`是 css 中的一个函数，用于在计算属性值时进行简单的数学运算。主要用于解决一下问题：

**响应式布局**`calc()`可以根据不同的屏幕尺寸和视口大小，动态调整元素的尺寸或间距。确保页面在不同设备上显示效果良好<br/>
**动态尺寸调整** 可以根据其他元素的尺寸或动态内容的大小来计算元素的尺寸。在构建复杂的布局时非常有用。<br/>
**优化代码** 可以减少不必要的 CSS 代码和样式属性的硬编码，使代码更加简洁和可维护。<br/>

- 自适应宽度

```css
.container {
  width: calc(100% - 20px);
}
```

- 响应式间距

```css
.container {
  margin: calc(1rem + 5%);
}
```

- 动态尺寸

```css
.container {
  width: calc(50% - 10px);
  height: calc(2 * 3em);
  /* 宽度减去10像素 */
  /* 高度是字体的6倍 */
}
```

## 7. 问题：实现一个固定长宽 div 在屏幕上垂直水平居中

- 利用**Flex 布局**可以很方便地实现垂直水平居中，将容器设置为 Flex 布局，然后将子元素设置为`align-items:center;justify-content:center;`即可。

```css
.container {
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

- 利用**绝对定位**布局可以实现垂直水平居中，将容器设置为相对定位，然后将子元素设置为绝对定位，再将其 top 和 left 都设置为 50%，将盒子左上角定位到页面中心，最后利用 transform translate(-50%,-50%) 调整元素中心到页面中心 实现居中。

```css
.container {
  width: 300px;
  height: 300px;
  position: relative;
}
.container .child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- 利用**绝对定位**，设置 4 个方向的值都为 0，由于宽高固定，因此对应方向实现平分，从而实现居中。

```css
.container {
  position: relative;
}
.container .child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
```

## 8. 问题：渐进增强（progressive enhancement）和 优雅降级（graceful degradation）

“渐进增强（progressive enhancement）”和“优雅降级（graceful degradation）”都是一种 web 开发技术，旨在处理不同的浏览器和设备的兼容问题。

- **渐进增强（progressive enhancement）**
  - 渐进增强的理念是从基本的，核心的功能开始，然后逐渐增强用户体验
  - 首先为所有的用户提供基本的功能和内容，确保网站在所有浏览器和设备上都能正常运行。
  - 随着浏览器能力的增强，逐步添加更多的功能和优化，以提供更好的用户体验。
  - 渐进增强强调的是从用户需求和核心功能出发，然后更具能力来增强效果。
- **优雅降级（graceful degradation）**
  - 优雅降级的理念是先开发出一个功能完善的网站，然后再根据不同的浏览器和设备，逐步减少或删除一些功能和优化，以确保在旧版浏览器或不支持某些功能的设备上能够正常运行。
  - 首先构建适用于现代浏览器的版本，包含高级功能和效果。
  - 针对不支持这些功能的浏览器，提供一个更基本，但仍能可访问的版本，以确保核心功能的正常运行。
  - 优雅降级强调的是在功能丰富的版本的基础上创建简化版本，以确保在旧版浏览器或不支持某些功能的设备上能够正常运行。

## 9. 问题：iframe 有哪些优缺点及使用场景

`<frame>`(内联框架)是 html 中的一个标签，用于在当前页面中嵌入另一个页面。

- **优点**
  - 分离内容：`<frame>`允许将不同开源不同内容的页面嵌套在一起。有助于将内容分隔开，允许不同团队或服务商提供各自的内容
  - 实现跨域通信：`<frame>`可以在不同域名下的页面之间实现通信，这在一些需要跨域交互的场景中非常有用。
  - 安全性: `<frame>`可以提高安全性，因为它将嵌入的页面与主页面隔离开来，防止恶意脚本攻击主页面。
  - 无需刷新：`<frame>`可以在不刷新主页面的情况下加载新的内容，这在一些需要实时更新的场景中非常有用。
- **缺点**
  - 浏览器兼容性问题：不同的浏览器对`<frame>`标签的支持程度不同，可能会导致在某些浏览器中出现显示问题或功能缺失。
  - 性能问题：每个`<frame>`都会增加页面的加载时间，因为每个`<frame>`都需要独立加载，会造成性能问题。
  - 搜索引擎优化 seo 问题：由于`<frame>`标签会将嵌入的页面视为独立的实体，搜索引擎可能会将其视为不同的页面，从而影响搜索排名。
  - 访问 ibility 问题：屏幕阅读器可能不会正确处理嵌套的页面内容，因此可能会影响屏幕阅读器等辅助技术的访问性。
- **使用场景**
  - 嵌入广告：可以使用`<frame>`标签嵌入广告，确保广告在所有浏览器和设备上都能正常显示。
  - 跨域通信：如果需要在不同域名下的页面之间实现通信，`<frame>`标签是一个不错的选择。
  - 内容分离：如果需要将不同来源的内容分隔开，`<frame>`标签可以帮助实现这一目标。
  - 安全沙盒：将不信任的内容隔离在一个沙盒中，以提高安全性。

## 10. 问题：css 盒子模型

它定义了每个 HTML 元素周围的一个矩形区域（盒子），这个盒子包含了元素的内容、内边距、边框和外边距。

- **内容（Content）** 内容区域是盒子的中心区域，用于显示元素的实际内容，如文本、图像或其他媒体等。内容的宽度和高度可以通过设置`width`和`height`属性来定义。
- **内边距（Padding）** 内边距是内容区域和边框之间的空间，用于增加元素内容与边框的距离。可以通过设置`padding`属性来定义内边距的大小。
- **边框（Border）** 边框是元素内容区域和内边距区域的边界，用于定义元素的可见框。可以通过设置`border`属性来定义边框的样式、宽度和颜色。
- **外边距（Margin）** 外边距是元素边框和其他元素之间的空间，用于增加元素与其他元素的距离。可以通过设置`margin`属性来定义外边距的大小。

```
+--------------------------------+
|       Margin（外边距）          |
|       Border（边框）            |
|    +--------------------+      |
|    |  Padding（内边距）  |      |
|    |                    |      |
|    |  content（内容）    |      |
|    |                    |      |
|    +--------------------+      |
|                                |
+--------------------------------+

```

## 11. 问题：HTML5 特性

- **语义化标签**：HTML5 引入了许多语义化标签，如`<header>`、`<nav>`、`<section>`、`<article>`、`<aside>`和`<footer>`等，这些标签可以更好地描述页面的结构和内容，提高了页面的可读性和可访问性。
- **多媒体支持**：HTML5 提供了对音频和视频的原生支持，无需使用插件或第三方库。可以使用`<audio>`和`<video>`标签来嵌入音频和视频文件。
- **canvas**:引入`<canvas>`元素，允许通过 JS 创建和操作图形，用于绘制图表、游戏等。
- **表单增强**：HTML5 引入了许多新的表单元素和属性，如日期选择器、颜色选择器、文件上传按钮等，以及对表单数据的验证和提交。
- **本地存储**：HTML5 引入了本地存储机制（如`localStorage`（长期存储，浏览器关闭之后数据不会丢失）和`sessionStorage`（数据在浏览器关闭之后自动删除）），可以在浏览器中存储数据，无需依赖服务器端。
- **Web Workers**：HTML5 引入了 Web Workers，允许在后台线程中运行脚本，以避免阻塞主线程。这对于处理耗时的任务（如复杂的计算或数据处理）非常有用。
- **webSocket**: HTML5 引入了 websocket,一种用于实时通信的协议，可以用于实时聊天和多人游戏。
- **地理位置**：HTML5 引入了对地理位置的支持，允许网页获取用户的当前位置信息。这在需要根据用户位置提供个性化服务的应用中非常有用。
- **SVG**: HTML5 引入了对 SVG（可缩放矢量图形）的原生支持，允许直接在网页中嵌入矢量图形，而无需使用图片文件。这使的创建响应式和可缩放的图形变的更加容易。
- **拖放**：HTML5 引入拖放 API，允许在网页中实现拖放操作。这使的用户可以通过简单的拖放操作来重新组织页面元素或上传文件等。
- **离线应用**：HTML5 支持创建离线应用，即使用户没有互联网连接，也可以访问应用的某些功能。这通过`manifest`文件和`Service Worker`实现。
- **新事件 API** ：HTML5 引入了许多新的事件 API，如`deviceorientation`、`devicemotion`、`geolocation`等，用于处理设备传感器数据、用户手势等。

## 12. 问题：CSS3 特性

- **圆角边框**：通过`border-radius`属性可以实现圆角边框效果，使元素的角变的圆润。
- **阴影和发光效果**：通过`box-shadow`和`text-shadow`属性可以为元素添加阴影和发光效果，使元素看起来更加立体。
- **渐变背景**：通过`linear-gradient`和`radial-gradient`属性可以实现渐变背景效果，包括线性和径向渐变。
- **多列布局**：通过`column-count`和`column-width`属性可以实现多列布局，类似于报纸的排版。
- **变换**：通过`transform`属性可以实现元素的旋转、缩放、倾斜等效果，为元素添加动态效果。
- **过渡效果**：通过`transition`属性可以实现元素属性的平滑过渡效果，为用户交互添加更多的反馈。
- **动画效果**：通过`@keyframes`规则和`animation`属性可以实现元素的动画效果，为页面添加更多的动态元素。
- **2D 和 3D 转换**：通过`transform`属性可以实现元素的 2D 和 3D 转换，如旋转、缩放、倾斜等。
- **字体嵌入**：通过`@font-face`规则可以嵌入自定义字体，使网页可以使用非标准字体。
- **透明度**：通过`opacity`属性可以设置元素的透明度，值范围从 0（完全透明）到 1（完全不透明）。
- **栅栏布局**：通过`grid`布局（Grid Layout）可以实现栅栏布局，将元素按照行或列进行排列。
- **自定义属性**：通过使用 CSS 变量（`var()`）来定义和重用自定义属性。
- **响应式设计**：通过媒体查询（Media Queries）和弹性布局（Flexible Layout）等技术，可以实现响应式设计，使网页在不同设备上都能有良好的显示效果。

## 13. 问题：CSS 中选择器的优先级

1. **!important 规则**： 当一个属性值后面添加`!important`关键字时，该属性值将具有最高优先级，无论其他选择器的优先级如何。
2. **特定性**：特定性值的大小来排序，特定值较大的规则具有更高的优先级，**权重计算方法**：

   - 内联样式：1000
   - ID 选择器：100
   - 类选择器、属性选择器或伪类选择器：10
   - 元素选择器或伪元素选择器：1
   - 通配符选择器（\*）：0
   - 组合选择器（如后代选择器、子选择器、相邻兄弟选择器等）：不影响特定性值

   案例：

   - `#header`:特定性值为 100（1 个 ID 选择器）
   - `.container`:特定值为 10（1 个类选择器）
   - `ul li`:特定值为 2（2 个元素选择器）
   - `*`:特定值为 0

3. **覆盖规则**：如果多个选择器具有相同的特定性值，那么根据它们在样式表中的出现顺序，后出现的规则将覆盖先出现的规则。

## 14. 问题: HTML5 input 元素 type 属性

- **text**:用于接受单行文本输入
- **password**:用于接受密码输入，输入的字符将被隐藏
- **radio**:用于接受单选按钮输入
- **checkbox**:用于接受复选框输入
- **email**:用于接受电子邮件地址输入
- **number**:用于接受数字输入
- **range**:用于接受范围输入，如滑块
- **date**:用于接受日期输入
- **time**:用于接受时间输入
- **datetime-local**:用于接受本地日期和时间输入
- **month**:用于接受月份输入
- **week**:用于接受周输入
- **color**:用于接受颜色选择输入
- **file**:用于接受文件上传输入
- **submit**:用于提交表单数据
- **reset**:用于重置表单数据
- **button**:用于创建自定义按钮

## 15. 问题：CSS 中属性的继承性

**可继承的属性（Inherited Properties）**

1. `color`:控制文本颜色
2. `font`:包括`font-family`,`font-size`,`font-style`,`font-weight`等字体相关属性
3. `line-height`:用于设置行高
4. `letter-spacing`:用于设置字母间距
5. `word-spacing`:用于设置单词间距
6. `text-indent`:用于设置首行缩进
7. `text-align`:用于设置文本对齐方式
8. `direction`:用于设置文本方向
9. `visibility`:用于设置元素的可见性，值可以是`visible`（可见）或`hidden`（隐藏）
10. `text-transform`:用于设置文本转换，如大写、小写、首字母大写等

**不可继承的属性（Non-inherited Properties）**

1. `border`:包括`border-width`,`border-style`,`border-color`等边框相关属性
2. `padding`:用于设置元素内容与边框之间的间距
3. `margin`:用于设置元素与其他元素之间的间距
4. `width`和`height`:用于设置元素的宽度和高度
5. `position`:用于设置元素的定位方式，如`static`、`relative`、`absolute`、`fixed`等
6. `float`:用于设置元素的浮动方式，如`left`、`right`、`none`等
7. `clear`:用于清除元素的浮动影响
8. `display`:用于设置元素的显示方式，如`block`、`inline`、`none`等
9. `overflow`:用于设置元素内容超出容器边界时的处理方式，如`visible`、`hidden`、`scroll`等
10. `z-index`:用于设置元素的堆叠顺序，值越大越靠前
11. `background`:包括`background-color`,`background-image`,`background-repeat`,`background-position`等背景相关属性

## 16. 问题：画一条 0.5px 的线

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style type="text/css">
      .thin-line {
        height: 1px;
        background-color: lightblue;
        transform: scaleY(0.5); /* 缩放Y轴方向，使线高度变为原来的一半 */
        transform-origin: 0 0; /* 变换原点设置为元素的左上角 */
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div class="thin-line"></div>
  </body>
</html>
```

## 17. 问题：position 的值

- **static(静态定位)**
  - 默认值
  - 元素按照文档流正常排列，不受其他定位属性影响
  - `top`,`left`,`bottom`,`right`属性不起作用
- **relative(相对定位)**
  - 将元素的位置相对于其自身在文档流中的位置进行调整
  - 相对定位不脱离文档流，其他元素仍然占据原本的位置
  - `top`,`left`,`bottom`,`right`属性可以设置元素相对于其正常位置的偏移量
- **absolute(绝对定位)**
  - 元素相对于其最近的已定位祖先元素进行定位（具有相对定位或绝对定位的父元素），如果没有就相对于浏览器窗口定位
  - 绝对定位脱离文档流，其他元素会忽略该元素的位置
  - `top`,`left`,`bottom`,`right`属性可以设置元素相对于其最近的已定位祖先元素的偏移量
- **fixed(固定定位)**
  - 元素相对于浏览器窗口进行定位，不随页面滚动而移动
  - 固定定位脱离文档流，其他元素会忽略该元素的位置
  - `top`,`left`,`bottom`,`right`属性可以设置元素相对于浏览器窗口的偏移量
- **sticky(粘性定位)**
  - 元素相对于其正常位置进行定位，直到滚动到某个阈值位置时，才会固定在该位置
  - 通常用于创建粘性导航栏或侧边栏
  - `top`,`left`,`bottom`,`right`属性可以设置元素相对于其正常位置的偏移量

## 18. 问题：什么是浮动，浮动会引起什么问题，有什么解决方案

浮动（float）是 CSS 的一种布局属性，用于控制元素在其父元素中的位置，使元素可以浮动到其父元素的左侧或右侧。

- **导致问题**：
  - 高度塌陷（Collapsing）:浮动元素会脱离文档流，导致父元素高度塌陷,使父元素无法自动适应浮动元素的高度。
  - 元素重叠（Overlapping）：浮动元素会影响其他元素的布局，导致布局错乱
- **解决方案**
  - 清除浮动（Clearing Floats）：在包含浮动元素的父元素之后，可以使用`clear`属性来清除浮动元素对父元素的影响。
  ```css
  .clearfic::after {
    content: "";
    display: block;
    clear: both;
  }
  ```
  - 使用布局技巧：用`flexbox`或`grid`来代替浮动布局
  - 使用`display:inline-block`: 将需要浮动的元素设置为`diaplay:inline-block`,可以模拟浮动效果，但不会导致高度塌陷
  - 使用`position：absolute`:在父元素中创建一个绝对定位的子元素，将需要浮动的元素设置为绝对定位，然后通过设置`top`,`left`,`bottom`,`right`属性来定位元素。
  - 使用`overflow:hidden`：在包含浮动元素的父元素上添加`overflow:hidden`可以清除浮动，但可能会剪切内容

## 19. 问题：line-heigth 和 height 的区别

- **line-heigth(行高)**
  - `line-height` 控制元素 content 高度
  - 用于指定行内元素的文本行的垂直间距，可以影响文本的垂直居中和行距
  - `line-height` 通常用于文本元素，如段落，标签等，以调整文本的行内框中的垂直位置
- **height(高度)**
  - `height` 控制元素的整体高度，不仅包含文本内容还包括内边距和边框
  - 用于指定元素的高度，包括行内元素和块级元素
  - `height` 通常用于设置元素的高度，如设置图片的高度或创建固定高度的容器

**总结** line-height 用于控制文本行的垂直间距，而 height 用于控制元素的整体高度，包括文本内容，内边距和边框

## 20. 问题：设置一个元素的背景颜色会填充的区域

- **内容区域**：背景颜色会填充元素的内容区域，即文本和内联元素所在的区域。
- **内边距区域**：如果元素具有内边距（通过 padding 属性设置），背景颜色也会填充内边距区域。
- **边框区域**：如果元素具有边框（通过 border 属性设置），且背景颜色为 transparent，也会填充边框区域。

背景颜色不会填充元素的外边距区域。外边距是元素与其他元素之间的间距，背景颜色通常不会扩展到外边距。<br/>
这意味着背景颜色将覆盖元素的内容，内边距和边框，但不会覆盖外边距。

## 21. 问题：inline-block,inline 和 block 的区别 块元素，行元素，置换元素的区别

- block ：块级元素 `<div>`,`<p>`,`<h1>`-`<h6>`,`<ul>`,`<ol>`,`<li>`,`<table>`,`<form>`等
  - 块级元素通常以新行开始，占据父元素可用宽度的整个宽度
  - 块级元素可以包含其他块级元素和内联元素
  - 块级元素会独占一行，它们在页面上按从上到下的顺序垂直排序
  - 块级元素可以设置宽高，内边距和外边距，并会自动换行
- inline : 内联元素 如 `a`,`span`,`img`,`input`,`select`,`strong`,`em`,`br`,`button`,
  - 内联元素通常不会导致新行的开始，只占据他们的内容高度。
  - 内联元素通常包含在块级元素内部，可以与其他内联元素在同一行上
  - 内联元素不会独占一行，它们会在同一行内水平排序，直到一行不足以容纳才换行。
  - 内联元素不能设置宽高，内边距和外边距，尺寸由内容决定
  - 内联元素只能包含文本和其他内联元素
- inline-block : 内联块级元素
  - 内联块级元素结合了两者的特点。他们在同一行水平排列，但可以设置宽高，内外边距，同时也会换行
  - 内联块级元素通常用于创建水平排列的块级元素，如按钮或导航链接。
- 置换元素 `<img>`,`<video>`,`<iframe>`
  - 置换元素是一种特殊类型的元素，其内容通常由外部资源（如图像，视频，浏览器默认样式）来替代
  - 置换元素的尺寸和外观通常由外部资源定义，而不是 CSS 样式

## 22. 问题：为什么 img 是 inline 但是可以设置宽高

因为 HTML 规范中对`img`元素的默认样式由特殊的定义。默认情况下，`img`是内联元素，但可以设置宽高是因为`img`元素通常需要具体的宽度和高度信息，以确保图像以正常的尺寸显示，而不会引起页面的重新布局。

## 23. 问题：box-sizing 的作用，如何使用？

`box-sizing`是 CSS 的一个属性，用于控制元素的盒模型如何计算尺寸。它有两个主要取值：

- content-box(默认值)：元素的宽度和高度只包括内容区域，不包括内边距和边框，传统的盒模型。
- border-box：元素的宽度和高度包括内容区域，内边距和边框。意味着设置元素宽高的时候，内边距和边框不会增加元素的总宽高，而会压缩内容区域的空间

```css
/* 设置成border-box模型，宽度是100px,包含了padding和border，内容区域是76px */
.element {
  box-sizing: border-box;
  width: 100px;
  padding: 10px;
  border: 2px solid #000;
}
/* 设置成content-box模型，内容区域就是100px */
.element {
  box-sizing: content-box;
  width: 100px;
  padding: 10px;
  border: 2px solid #000;
}
```

**注意** `box-sizing`通常在全局样式中设置，已确保整个页面使用一致的盒模型。

## 24. 问题：CSS 实现动画

CSS 动画可以通过使用 CSS 的`@keyframes`规则和`animation`属性来实现。以下是实现 CSS 动画的基本步骤：

1. **定义关键帧（keyframes）**：使用`@keyframes`规则定义动画的关键帧，即动画在不同时间点的状态。每个关键帧定义了一个或多个 CSS 属性的值。

```css
@keyframes myAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
```

2. **应用动画**：使用`animation`属性将定义的动画应用到元素上。可以指定动画名称、持续时间、迭代次数、方向等。

```css
.animated-element{
  animation-name:myAnimation;  /*关键帧名称*/
  animation-duration:2s;  /* 持续时间 */
  animation-timing-function:ease-in-out;  /* 动画速度曲线,缓动函数 */
  animation-delay: 0.5s; /* 延迟时间 */
  animation-iteration-count:infinite;  /* 迭代次数 */
  animation-direction:alternate;  /* 动画方向 */
  animation-play-state:paused/running; /* 动画的播放状态*/
  animation-fill-mode：none(默认值)/forwards/backwards/both /* 指定动画结束后元素的状态*/
}
```

3. **触发动画**：默认情况下，动画不会自动触发。可以使用:hover,:active 等伪类选择器或 JavaScript 来触发动画。

```css
.animated-element:hover {
  animation-play-state: paused; /* 暂停动画 */
}
```

```js
// 点击元素时触发动画
element.addEventListener("click", function () {
  this.style.animationPlayState = "running";
});
// 添加class
element.classList.add("animated-element");
```

CSS 动画是一种简单而有效的方法来创建元素的过渡和动画效果。它可以用于实现各种动态效果，如元素的移动、缩放、旋转、颜色变化等，根据需求和创意来定义动画的关键帧和属性。可以在不编写 js 的情况下实现，也可以与 js 一起使用，以响应用户交互或动态生成动画效果。

## 25. 问题：transition 和 animation 的区别

`transition`和`animation`是 CSS 用于创建动画效果的两种不同的属性

**Transition(过渡)**

- `transition`允许元素在状态改变时平滑地过渡到新的样式。它可应用于元素各属性，如颜色，尺寸，位置
- 过渡是由触发状态变换的时间触发的，比如鼠标悬停，焦点获的，类名变化等。
- 过渡通常使用简单的语法定义，包括要过渡的属性，过渡持续时间，过渡的时间函数和延迟时间。
- 过渡通常是在元素的常规和伪类状态之间进行切换，例如 hover focus。

```css
.button {
  transition: background-color 0.3s ease;
}
.button:hover {
  background-color: #ff0000;
}
```

**Animation(动画)**

- `animation`允许元素在多个关键帧之间进行平滑的过渡，实现复杂的动画效果。
- 动画是在元素的状态，时间轴或事件触发下进行的。
- 动画可以更精细的控制动画的每一帧，包括持续时间，循环次数，缓动函数。
- 动画适用于需要多个状态改变和复杂交互的场景，如元素的移动、旋转、缩放等。

```css
@keyframes slideIn {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
.animated-element {
  animation-name: slideIn;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  /* animation:slideIn 1s ease-in-out infinite; */
}
```

**总结**

- 使用`transition`适用于简单的状态变化和过渡效果，如颜色变化、尺寸变化等,适用于鼠标悬停，焦点等触发的状态变化。
- 使用`animation`适用于复杂的动画效果，如元素的移动、旋转、缩放等，需要多个关键帧和更精细的控制。`

## 26. 问题：弹性盒子 flex 布局

Flex 布局的核心概念包括一下几点：

- **容器和项** ：Flex 布局由一个容器（父元素）和多个项（子元素）组成。容器默认采用 Flex 布局，项则是容器的直接子元素，容器元素通过设置`display:flex;`或`display:inline-flex;`来启用 flex 布局。
- **主轴和交叉轴** ：Flex 布局有一个主轴（main axis）和一个交叉轴（cross axis），主轴是项排列的主要发现，而交叉轴是垂直于主轴的方向。默认情况下，主轴是水平方向，交叉轴是垂直方向。
- **弹性布局** ：Flex 布局的核心思想是通过分配容器的可用空间来灵活地调整项的大小和位置。它可以自动调整项的大小，以填充可用空间，同时保持项之间的间距和对齐。
- **对齐和排序** ：Flex 布局提供了各种属性来控制项在主轴和交叉轴上的对齐和排序。可以使用`justify-content`属性来对齐项在主轴上，使用`align-items`属性来对齐项在交叉轴上。还可以使用`align-self`属性来单独控制某个项在交叉轴上的对齐。
- **自动换行** ：当项的总宽度超过容器宽度时，Flex 布局会自动换行，将超出部分的项放到下一行。
- **嵌套支持** ：Flex 布局支持嵌套，即一个项可以包含另一个 Flex 容器，从而实现更复杂的布局结构。
- **flex-direction 属性** ：用于指定主轴的方向，可选值有 row（默认值，主轴为水平方向）、row-reverse（主轴为水平方向，但是项的顺序相反）、column（主轴为垂直方向）、column-reverse（主轴为垂直方向，但是项的顺序相反）。
- **flex-wrap 属性** ：用于指定当项超出容器宽度时是否换行，可选值有 nowrap（默认值，不换行）、wrap（换行）、wrap-reverse（换行，但是项的顺序相反）。
- **justify-content 属性** ：用于指定项在主轴上的对齐方式，可选值有 flex-start（默认值，项向主轴起始端对齐）、flex-end（项向主轴结束端对齐）、center（项在主轴上居中对齐）、space-between（项在主轴上均匀分布，首尾项与容器边缘对齐）、space-around（项在主轴上均匀分布，每个项两侧的间距相等）。
- **align-items 属性** ：用于指定项在交叉轴上的对齐方式，可选值有 flex-start（默认值，项向交叉轴起始端对齐）、flex-end（项向交叉轴结束端对齐）、center（项在交叉轴上居中对齐）、baseline（项的基线对齐）、stretch（默认值，项在交叉轴上拉伸以填充容器高度）。

## 27. 问题：Less 和 SCSS 的区别

Less(Leaner Style Sheets)和 Scss(Sassy css)都是 CSS 处理器，他们添加了一些功能和语法糖帮助开发

- 语法
  - Less:使用较少的特殊字符，如变量以`@`开头，Mixin 以`.`开头，选择器嵌套使用`&`。
  - Scss:类似于 css 语法，使用大括号`{}`和分号`;`来定义块和分隔属性。
- 编译
  - Less:需要使用 Less 编译器将 Less 代码转换为 css 代码。
  - Scss:需要使用 Scss 编译器将 Scss 代码转换为 css 代码。
- 兼容性
  - Less:早期版本对 CSS 语法更宽松，因此较容易于现有的 CSS 文件集成。最新版的 LESS 也支持更严格的 CSS 语法
  - SCSS：采用更接近标准 CSS 的语法，因此对于已经熟悉 CSS 的更好上手
- 生态系统
  - Less：较早出现，有一些基于 less 的工具和库
  - SCSS：在 SASS 的基础上发展而来，与 sass 的生态系统整合紧密
- 特性
  - less:提供一些常见的 CSS 功能，如变量，嵌套，Minxin 等，但在某些高级功能方面不如 SCSS
  - SCSS：具有更丰富的功能集，包括控制指令，函数，循环等
- 扩展名
  - less:扩展名是`.less`
  - SCSS:扩展名是`.scss`

## 28. 问题：CSS3 伪类，伪元素

CSS3 中引入的伪类和伪元素，他们用于选择文档结构中的元素，并使其具有不同的样式和行为，是 CSS 中特殊的选择器，用于更精准的定位和样式化页面元素。

**CSS3 伪类（Pseudo-classes）**：伪类用于选择文档中的特定元素，通常基于他们的胡住哪个太，位置或属性

1. `:hover` 选择鼠标悬停的元素
2. `:active` 选择被点击的元素
3. `:focus` 选择获取焦点的元素，如表单元素
4. `:nth-child(n)` 选择某元素在其父元素的第 n 个位置
5. `:not(selector)` 选择不匹配指定选择器的元素
6. `:first-child` 选择某元素的父元素中的第一个子元素
7. `:last-child` 选择后某元素的父元素中的最后一个子元素

**CSS3 伪元素（Pseudo-elements）**：伪元素用于在文档中生成虚拟元素，通常用于添加样式或内容

1. `::before` 在元素内容之前生成内容，通常用于添加装饰或图标
2. `::after` 在元素内容之后生成内容，也于添加装饰或图标
3. `::first-line` 选择元素的第一行文本，用于样式化段落中的首行文字
4. `::first-letter` 选择元素的第一个字母，用于样式化段落或标题的首字母
5. `::selection` 选择用户高亮的文本，允许自定义选中文本的样式

## 29. 问题：::before 和::after 中双冒号和单冒号的区别

`::before`和`::after`伪元素选择器都用于在元素的内容之前和之后插入生成的内容，通常用于添加额外的样式或内容。在 CSS 中双冒号`::`和单冒号`:`的区别主要在于标准的规范化。双冒号`::`用于伪元素，而单冒号`:`用于伪类。在实际使用中双冒号`::`和单冒号`:`在大多数现代浏览器中通常都可以互换使用，但根据规范还是使用双冒号`::`来表示伪元素。

**总结**

- `::before`和`::after` 是伪元素选择器
- 根据 CSS 规范，应该使用双冒号`::`，如`::before`和`::after `
- 大多数浏览器也允许使用单冒号`:`，但为了规范还是使用`::`

## 30. 问题：响应式布局的实现方案

响应式布局是一种适应不同屏幕尺寸和设计的设计方法，以确保网页在各种设备上都能提供良好的用户体验

- **使用媒体查询（Media Queries）** 媒体查询是 CSS3 的一项功能，允许根据屏幕宽度，高度，分辨率等条件来应用不同的样式。通过在 CSS 中嵌入媒体查询，可以为不同的屏幕尺寸定义不同的样式规则

```css
@media (max-width: 768px) {
  /* 在小屏幕上应用的样式 */
}
@media (min-width: 769px) and (max-width: 1024px) {
  /* 在中等屏幕上应用的央视u */
}
@media (min-width: 1025px) {
  /* 在大屏幕上应用的样式 */
}
```

- **流式布局（Fluid Layout）** 流式布局是一种基于百分比的布局方式，元素的宽度和高度都是基于父容器的百分比来计算的。通过使用流式布局，可以使网页在不同屏幕尺寸上自适应，而不需要使用固定的像素值。

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
.column {
  width: 33%;
}
```

- **弹性布局（Flexible Layout）** 弹性布局是一种基于 flexbox 模型的布局方式，允许元素在容器中自动调整大小和位置。通过使用弹性布局，可以实现复杂的布局结构，如响应式导航栏或网格系统。

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
.column {
  flex: 1 0 33%;
}
```

- **图片大小调整** 使用`max-width:100%;`或`width：100%;`来确保图像能够根据屏幕尺寸缩放，以避免图像在小屏幕上溢出

```css
img {
  max-width: 100%;
  height: auto;
}
```

## 31. 问题：link 标签和 import 标签的区别？

`<link>`标签和`@import`规则都用于引入外部 CSS 文件区别如下:

- **语法和用法**
  - `<link>`标签：在 HTML 文档的`<head>`部分使用，用于引入外部 CSS 文件。它具有自己的属性，例如 rel（关系），href（资源链接），type（MIME 类型）
  ```HTML
  <link rel="stylesheet" type="text/css" href="path/to/file.css">
  ```
  - `@import`规则：在 CSS 文件中使用，用于引入其他 CSS 文件。必须位于 CSS 样式表中，通常位于样式表的顶部，可以用于导入其他 CSS 文件
  ```css
  @import url("path/to/file.css");
  ```
- **加载方式**
  - `<link>`标签：在 HTML 文档加载时并行加载，不会阻塞页面的渲染。
  - `@import`规则：在 CSS 文件加载完成后，才会应用@import 引入的样式。这意味着如果@import 规则位于文件底部，可能会导致页面在加载完成前显示没有样式的情况，会导致页面渲染的延迟。
- **兼容性**
  - `<link>`标签：支持广泛，可以用于所有 HTML 版本
  - `@import`规则：是 CSS2 引入的特性，较旧的浏览器不支持
- **维护和管理**
  - 使用`<link>`标签更容易维护和管理，与 HTML 文档分开，且可以在文档的`<head>`部分轻松找到
  - 使用`@import`时，CSS 代码和引入的 CSS 文件混在一起，可能会导致维护复杂度增加。

## 32. 问题：单行元素的文本省略号实现方式

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style type="text/css">
      .ellipsis-text {
        width: 200px; /* 文本内容的宽度*/
        white-space: nowrap; /* 防止文本换行 */
        overflow: hidden; /* 溢出的文本 */
        text-overflow: ellipsis; /* 显示省略号 */
      }
    </style>
  </head>
  <body>
    <div class="ellipsis-text">dsahdjjkljalsjdklajdklasjdlllllll</div>
  </body>
</html>
```

## 33. 问题：HTML 语义化标签

HTML 语义化标签是指在 HTML 文档中使用具有明确定义和语义含义的标签，以描述文档的结构和内容。提高可访问性，可维护性和搜索引擎优化(SEO)

1. `<header>`：定义文档的页眉，通常包含标题、标志、导航菜单等。
2. `<nav>`：定义导航链接的容器，用于创建导航链接、菜单、目录等。
3. `<main>`：定义文档的主要内容区域，每个文档只能有一个 main 元素。
4. `<article>`：定义独立的文章或内容块，例如博客文章、新闻报道等。
5. `<section>`：定义文档中的节或章节，用于组织内容。
6. `<aside>`：定义与主要内容相关的侧边内容，例如侧边栏、广告等。
7. `<footer>`：定义文档的页脚，通常包含版权信息、联系信息等。
8. `<figure>`：定义独立的内容块，通常包含图片、图表、照片等。
9. `<figcaption>`：定义 figure 元素的标题或说明。
10. `<time>`：定义日期或时间，例如发布时间、预约时间等。

## 34. 问题：px,rpx,vw,vh,rem,em 区别

1. **px（像素）**

- 相对单位，代表屏幕上的一个基本单位，逻辑像素
- 不会根据屏幕尺寸或分辨率自动调整大小
- 在高分辨率屏幕上可能显的很小

2. **rpx(微信小程序)**

- 主要用于微信小程序
- 是相对单位，基于屏幕宽度进行缩放
- 可以在不同设备上报纸一致的布局

3. **vw(视窗宽度单位)**

- 相对单位，表示视窗宽度百分比
- 1vw 等于视窗宽度的 1%
- 用于创建适应不同屏幕宽度的布局

4. **vh(视窗高度单位)**

- 相对单位，表示视窗高度百分比
- 1vw 等于视窗高度的 1%
- 用于创建适应不同屏幕高度的布局

5. **rem(根元素单位)**

- 相对单位，基于根元素（html）的字体大小
- 1rem 等于根元素字体大小
- 用于创建相对带线啊哦的字体和元素，适合响应式设计

6. **em(字体相对单位)**

- 相对单位，基于当前元素的字体大小
- 1em 等于当前元素字体大小
- 通常用于设置相对于父元素的字体大小

## 35. 问题：如何实现小于 12px 的字体效果

`transfrom:scale()` 这个属性只可以缩放可以定义宽高的元素，而行内元素是没有宽高的，我们可以加上一个`display:inline-block`;来实现缩放效果

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        .thin-line {
          font-size: 12px;
          transform: scale(0.7);
          display: inline-block;
        }
    </style>
</head>
<body>
    <div class="thin-line">sss</div>
</body>
</html>
```
