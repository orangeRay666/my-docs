# HTML + CSS 面试题整理

#### HTML 部分

1. **什么是 HTML 的语义化？为什么重要？**  
    HTML 的语义化是指使用具有语义意义的标签来构建页面结构，例如使用 `<header>` 表示头部，`<article>` 表示文章内容。语义化有助于提高代码的可读性、可维护性，并且对搜索引擎优化（SEO）和无障碍访问（Accessibility）也有帮助。

2. **HTML5 新增了哪些语义化标签？**  
    HTML5 新增了如 `<header>`、`<footer>`、`<article>`、`<section>`、`<aside>`、`<nav>` 等语义化标签，用于更清晰地描述页面结构。

3. **`meta` 标签的作用有哪些？**  
    `meta` 标签用于定义页面的元信息，例如字符编码（`<meta charset="UTF-8">`）、视口设置（`<meta name="viewport" content="width=device-width, initial-scale=1.0">`）、SEO 关键字和描述等。

4. **如何实现页面的 SEO 优化？**  
    - 使用语义化标签。
    - 合理设置标题（`<title>`）和描述（`<meta>`）。
    - 优化图片的 `alt` 属性。
    - 提高页面加载速度。
    - 使用结构化数据（Schema.org）。

5. **HTML 中的 `defer` 和 `async` 属性有什么区别？**  
    - `defer`：脚本会延迟到 HTML 解析完成后执行，多个脚本按顺序执行。
    - `async`：脚本会异步加载并执行，多个脚本的执行顺序不固定。

#### CSS 部分

1. **CSS 的盒模型是什么？标准盒模型和 IE 盒模型有何区别？**  
    - 标准盒模型：`width` 和 `height` 只包含内容区域。
    - IE 盒模型：`width` 和 `height` 包含内容、内边距和边框。

2. **CSS 中的定位方式有哪些？分别适用于什么场景？**  
    - `static`：默认定位。
    - `relative`：相对定位，用于微调。
    - `absolute`：绝对定位，相对于最近的定位祖先。
    - `fixed`：固定定位，相对于视口。
    - `sticky`：粘性定位，结合 `relative` 和 `fixed`。

3. **什么是伪类和伪元素？举例说明。**  
    - 伪类：用于选择特定状态的元素，例如 `:hover`、`:nth-child()`。
    - 伪元素：用于创建虚拟元素，例如 `::before`、`::after`。

4. **如何优化 CSS 性能？**  
    - 合理使用选择器，避免过于复杂。
    - 合并和压缩 CSS 文件。
    - 使用 CSS 预处理器（如 SASS）。
    - 减少重绘和回流。

#### 综合问题

1. **如何实现一个水平垂直居中的布局？列举至少三种方法。**  
    - 使用 Flexbox：`display: flex; justify-content: center; align-items: center;`。
    - 使用 Grid：`display: grid; place-items: center;`。
    - 使用绝对定位和负边距：`position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`。

2. **如何处理不同浏览器的兼容性问题？**  
    - 使用 CSS 前缀（如 `-webkit-`）。
    - 使用现代化工具（如 Autoprefixer）。
    - 测试主流浏览器。
    - 提供 Polyfill。

3. **如何实现一个多列等高布局？**  
    - 使用 Flexbox：`align-items: stretch;`。
    - 使用 Grid 布局。
    - 使用伪元素和负边距技巧。

4. **如何实现一个自适应宽高的图片容器？**  
    - 使用 `object-fit: cover;`。
    - 使用背景图片：`background-size: cover;`。

5. **如何用 HTML 和 CSS 实现一个简单的导航栏？**  
    - 使用 `<nav>` 标签包裹导航内容。
    - 使用 `ul` 和 `li` 创建菜单项。
    - 使用 CSS 设置布局（如 Flexbox）和样式。