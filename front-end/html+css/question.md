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
  *  overflow 除了 visible 以外的值（hidden、auto、scroll）