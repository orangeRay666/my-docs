# HTML + CSS 面试题整理

## 1. 问题：什么是重绘，什么是回流？如何减少回流？

* **重绘（Repaint）**
  * 定义：元素的外观发生改变，但是没有改变布局，浏览器会重新绘制元素的外观，这个过程称为重绘。
  * 触发条件：元素的外观发生改变，例如改变元素的颜色、背景颜色、边框颜色等。
  * 影响：重绘不会改变元素的位置和大小，只是改变了元素的外观。
  * 性能影响：重绘的成本相对较低，因为它只涉及到元素的外观变化，只需要重新绘制已计算好的元素样式，而不是布局变化。

* **回流（Reflow）**
  * 定义：元素的布局发生改变，浏览器需要重新计算元素的位置和大小，这个过程称为回流。
  * 触发条件：元素的布局发生改变，例如改变元素的宽度、高度、位置、隐藏元素等。
  * 影响：回流会导致元素的位置和大小发生改变，可能会影响到其他元素的布局。
  * 性能影响：回流的成本相对较高，因为它涉及到元素的位置和大小的重新计算。

* **减少回流的方法**
  * **使用css动画代替js动画**：CSS动画利用GPU加速，在性能方面比js动画更高效。使用CSS的`transform`和`opacity`属性来实现动画，避免直接操作元素的位置和大小。
  * **使用`requestAnimationFrame`方法**来调度动画帧，来批量操作DOM元素，避免频繁的操作DOM元素，这种方法可以确保动画在最佳实践内进行渲染。
  * **使用`translate3d`开启硬件加速**：将元素的`transform`属性设置为`translate3d(0, 0, 0)`，可以开启元素的硬件加速，从而避免回流，并提高动画的流畅度。
  * **避免频繁的操作布局的样式属性**：当需要对元素进行多次样式修改时，可以考虑合并为一次操作。通过添加/移除css类来一次性改变多个样式，而不是逐个修改。
  * **使用文档片段（DocumentFragment）来批量操作DOM元素**，将元素添加到文档片段中，最后一次性添加到DOM树中，避免频繁的操作DOM元素，从而减少回流的次数。
  * **让元素脱离文档流**：例如将元素的`position`属性设置为`absolute`或`fixed``flost`，可以将元素从文档流中脱离出来，避免对其他元素的影响。
  * **避免使用复杂的选择器**，选择器的复杂度会影响回流的性能。
  * **使用 visibility: hidden 或 display: none 来隐藏元素**，因为仍占空间但是不可见，避免使用`display:none`会将元素从渲染树中移除进而引发回流。


## 2. 问题：Margin塌陷问题如何解决？BFC是什么？怎么触发
**代码块 html**
```html
<html>
<head>
    <style type="text/css">
        .box{
            width:100px;
            heigth:100px;
            background:#000;
        }
        #box1{
            margin-bottom:200px;
        }
        #box2{
            margin-top:100px;
        }
    </style>
</head>
<body>
    <div id="box1" class="box"></div>
    <div id="box2" class="box"></div>
</body>
</html>
```
* **margin塌陷问题：** 上面例子两个div的间隔为200px,取margin重叠的最大值（符合css的外边距合并规则），如果希望间距为300px，可以让每个div触发BFC，
* **BFC定义** 全称叫块级格式化上下文（Block Formatting Context），是一个独立的渲染区域，内部元素的渲染不会影响到外部元素。
* **触发BFC的条件**：
  * 根元素（html）
  * 浮动元素（float 除了none以外的值）
  * 绝对定位元素（position 为 absolute 或 fixed）
  * 行内块元素（display 为 inline-block）
  * 表格单元格（display 为 table-cell）
  * 表格标题（display 为 table-caption）
  * overflow 除了 visible 以外的值（hidden、auto、scroll）



## 3. 问题：如何隐藏一个元素？
|     方法            |    占位     |   点击事件   |
| -------             | :-------:  | :-------:    |
| display:none        |       x    |       x      |
| opacity:0           |      √     |      √      |
| visibility：hidden  |      √     |      x      |
| clip-path:circle(0)  |      √     |      x      |
| position:absolute;top:-999px  | x |      √      |


## 4. 问题：overflow不同值的区别  
| 属性值 | 效果|
| ------- | :------- |
| `visible`(默认值) | 内容超出容器边界时，不剪切内容，显示在容器外部。会覆盖其他元素 |
| `hidden` | 内容超出容器边界时，剪切内容，不显示在容器外部 |
| `scroll` | 内容超出容器边界时，总是显示滚动条，即使内容没有移除也会显示滚动条，但是会被禁用 |l
| `auto` | 内容超出容器边界时，根据需要显示滚动条,跟`scroll`类似不同的是只有溢出内容才会显示滚动条 |
| `inherit` | 从父元素继承overflow属性值 |


## 5. 问题：三栏布局的实现方式（圣杯模型）
三栏布局是常见的网页布局格式，包含固定宽度的左右侧边栏以及一个自适应宽度的主要内容区域
* **Flex布局**
  * 利用Flex布局可以很方便地实现三栏布局，将容器设置为Flex布局，然后将左右侧边栏设置为固定宽度，主要内容区域设置为自适应宽度``flex:1``即可。
```html
<html>
<head>
    <style type="text/css">
        .container{
          display:flex;
        }
        .left,.right{
          width:100px;
        }
        .main{
          flex:1;
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
* **浮动布局**
  * 利用浮动布局可以实现三栏布局，将左右侧边栏设置为固定宽度，主要内容区域设置为自适应宽度。
```html
<html>
<head>
    <style type="text/css">
        .container{
          width:100%;
          overflow:hidden;
        }
        .left{
          width:100px;
          float:left;
        }
        .main{
          margin-left:100px;
          margin-right:100px;
        }
        .right{
          width:100px;
          float:right;
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
* **grid布局**
  * 利用grid布局可以实现三栏布局，将容器设置为Grid布局，然后将左右侧边栏设置为固定宽度，主要内容区域设置为自适应宽度。
```html
<html>
<head>
    <style type="text/css">
        .container{
          display:grid;
          grid-template-columns:100px 1fr 100px;
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
```
* **绝对定位布局**
  * 利用绝对定位布局可以实现三栏布局，将容器设置为相对定位，然后将左右侧边栏设置为固定宽度，主要内容区域设置为自适应宽度。
```html
<html>
<head>
    <style type="text/css">
        .container{
          position:relative;
        }
        .left{
          width:100px;
          position:absolute;
          top:0;
          left:0;
        }
        .main{
          margin-left:100px;
          margin-right:100px;
        }
        .right{
          width:100px;
          position:absolute;
          top:0;
          right:0;
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
```


## 6. 问题：calc()方法
`calc()`是css中的一个函数，用于在计算属性值时进行简单的数学运算。主要用于解决一下问题：

**响应式布局**`calc()`可以根据不同的屏幕尺寸和视口大小，动态调整元素的尺寸或间距。确保页面在不同设备上显示效果良好<br/>
**动态尺寸调整** 可以根据其他元素的尺寸或动态内容的大小来计算元素的尺寸。在构建复杂的布局时非常有用。<br/>
**优化代码** 可以减少不必要的CSS代码和样式属性的硬编码，使代码更加简洁和可维护。<br/>
* 自适应宽度
```css
.container{
  width:calc(100% - 20px);
}
```
* 响应式间距
```css
.container{
  margin:calc(1rem + 5%);
}
```
* 动态尺寸
```css
.container{
  width:calc(50% - 10px); 
  height:calc(2*3em);
  /* 宽度减去10像素 */
  /* 高度是字体的6倍 */
}
```


## 7. 问题：实现一个固定长宽div在屏幕上垂直水平居中
* 利用**Flex布局**可以很方便地实现垂直水平居中，将容器设置为Flex布局，然后将子元素设置为``align-items:center;justify-content:center;``即可。
```css
.container{
  width:300px;
  height:300px;
  display:flex;
  align-items:center;
  justify-content:center;
}
```
* 利用**绝对定位**布局可以实现垂直水平居中，将容器设置为相对定位，然后将子元素设置为绝对定位，再将其 top 和 left 都设置为 50%，将盒子左上角定位到页面中心，最后利用 transform  translate(-50%,-50%) 调整元素中心到页面中心 实现居中。
```css
.container{
  width:300px;
  height:300px;
  position:relative;
}
.container .child{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
```
* 利用**绝对定位**，设置4个方向的值都为0，由于宽高固定，因此对应方向实现平分，从而实现居中。
```css
.container{
  position:relative;
}
.container .child{
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
}
```

## 8. 问题：渐进增强（progressive enhancement）和 优雅降级（graceful degradation）
“渐进增强（progressive enhancement）”和“优雅降级（graceful degradation）”都是一种web开发技术，旨在处理不同的浏览器和设备的兼容问题。

* **渐进增强（progressive enhancement）**
  * 渐进增强的理念是从基本的，核心的功能开始，然后逐渐增强用户体验
  * 首先为所有的用户提供基本的功能和内容，确保网站在所有浏览器和设备上都能正常运行。
  * 随着浏览器能力的增强，逐步添加更多的功能和优化，以提供更好的用户体验。
  * 渐进增强强调的是从用户需求和核心功能出发，然后更具能力来增强效果。
* **优雅降级（graceful degradation）**
  * 优雅降级的理念是先开发出一个功能完善的网站，然后再根据不同的浏览器和设备，逐步减少或删除一些功能和优化，以确保在旧版浏览器或不支持某些功能的设备上能够正常运行。
  * 首先构建适用于现代浏览器的版本，包含高级功能和效果。
  * 针对不支持这些功能的浏览器，提供一个更基本，但仍能可访问的版本，以确保核心功能的正常运行。
  * 优雅降级强调的是在功能丰富的版本的基础上创建简化版本，以确保在旧版浏览器或不支持某些功能的设备上能够正常运行。


## 9. 问题：iframe有哪些优缺点及使用场景
``<frame>``(内联框架)是html中的一个标签，用于在当前页面中嵌入另一个页面。
* **优点**
  * 分离内容：`<frame>`允许将不同开源不同内容的页面嵌套在一起。有助于将内容分隔开，允许不同团队或服务商提供各自的内容
  * 实现跨域通信：`<frame>`可以在不同域名下的页面之间实现通信，这在一些需要跨域交互的场景中非常有用。
  * 安全性: `<frame>`可以提高安全性，因为它将嵌入的页面与主页面隔离开来，防止恶意脚本攻击主页面。
  * 无需刷新：`<frame>`可以在不刷新主页面的情况下加载新的内容，这在一些需要实时更新的场景中非常有用。
* **缺点**
  * 浏览器兼容性问题：不同的浏览器对`<frame>`标签的支持程度不同，可能会导致在某些浏览器中出现显示问题或功能缺失。
  * 性能问题：每个`<frame>`都会增加页面的加载时间，因为每个`<frame>`都需要独立加载，会造成性能问题。
  * 搜索引擎优化seo问题：由于`<frame>`标签会将嵌入的页面视为独立的实体，搜索引擎可能会将其视为不同的页面，从而影响搜索排名。
  * 访问ibility问题：屏幕阅读器可能不会正确处理嵌套的页面内容，因此可能会影响屏幕阅读器等辅助技术的访问性。
* **使用场景**
  * 嵌入广告：可以使用`<frame>`标签嵌入广告，确保广告在所有浏览器和设备上都能正常显示。
  * 跨域通信：如果需要在不同域名下的页面之间实现通信，`<frame>`标签是一个不错的选择。
  * 内容分离：如果需要将不同来源的内容分隔开，`<frame>`标签可以帮助实现这一目标。
  * 安全沙盒：将不信任的内容隔离在一个沙盒中，以提高安全性。


## 10. 问题：css盒子模型
它定义了每个HTML元素周围的一个矩形区域（盒子），这个盒子包含了元素的内容、内边距、边框和外边距。
* **内容（Content）** 内容区域是盒子的中心区域，用于显示元素的实际内容，如文本、图像或其他媒体等。内容的宽度和高度可以通过设置`width`和`height`属性来定义。
* **内边距（Padding）** 内边距是内容区域和边框之间的空间，用于增加元素内容与边框的距离。可以通过设置`padding`属性来定义内边距的大小。
* **边框（Border）** 边框是元素内容区域和内边距区域的边界，用于定义元素的可见框。可以通过设置`border`属性来定义边框的样式、宽度和颜色。
* **外边距（Margin）** 外边距是元素边框和其他元素之间的空间，用于增加元素与其他元素的距离。可以通过设置`margin`属性来定义外边距的大小。
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

## 11. 问题：HTML5特性
* **语义化标签**：HTML5引入了许多语义化标签，如`<header>`、`<nav>`、`<section>`、`<article>`、`<aside>`和`<footer>`等，这些标签可以更好地描述页面的结构和内容，提高了页面的可读性和可访问性。
* **多媒体支持**：HTML5提供了对音频和视频的原生支持，无需使用插件或第三方库。可以使用`<audio>`和`<video>`标签来嵌入音频和视频文件。
* **canvas**:引入`<canvas>`元素，允许通过JS创建和操作图形，用于绘制图表、游戏等。
* **表单增强**：HTML5引入了许多新的表单元素和属性，如日期选择器、颜色选择器、文件上传按钮等，以及对表单数据的验证和提交。
* **本地存储**：HTML5引入了本地存储机制（如`localStorage`和`sessionStorage`），可以在浏览器中存储数据，无需依赖服务器端。
* **Web Workers**：HTML5引入了Web Workers，允许在后台线程中运行脚本，以避免阻塞主线程。这对于处理耗时的任务（如复杂的计算或数据处理）非常有用。
* **webSocket**: HTML5引入了websocket,一种用于实时通信的协议，可以用于实时聊天和多人游戏。
* **地理位置**：HTML5引入了对地理位置的支持，允许网页获取用户的当前位置信息。这在需要根据用户位置提供个性化服务的应用中非常有用。
* **SVG**: HTML5引入了对SVG（可缩放矢量图形）的原生支持，允许直接在网页中嵌入矢量图形，而无需使用图片文件。这使得创建响应式和可缩放的图形变得更加容易。
* **拖放**：HTML5引入拖放API，允许在网页中实现拖放操作。这使得用户可以通过简单的拖放操作来重新组织页面元素或上传文件等。
* **离线应用**：HTML5支持创建离线应用，即使用户没有互联网连接，也可以访问应用的某些功能。这通过`manifest`文件和`Service Worker`实现。
* **新事件API** ：HTML5引入了许多新的事件API，如`deviceorientation`、`devicemotion`、`geolocation`等，用于处理设备传感器数据、用户手势等。
