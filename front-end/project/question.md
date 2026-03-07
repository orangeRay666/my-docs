# 前端构建&工程化 题目整理

## 1. 问题：webpack的理解
**webpack的作用**

Webpack 是一个静态模块打包工具，用于构建和优化 Web 应用程序的前端资源，包括 JavaScript,CSS,图片，字体等。它的主要目标是将项目的所有依赖（模块，资源文件）打包成一个或多个静态资源，用于在浏览器中加载。改善前端开发的工作流程，提高代码的可维护性和性能，解决了模块化，资源管理，性能优化和自动化等多种关键问题。

**webpack打包原理**

把一切都视为模块：不管是 css、JS、Image 还是 html 都可以互相引用，通过定义 entry.js，对所有依赖的文件进行跟踪，将各个模块通过 loader 和 plugins 处理，然后打包在一起。

按需加载：打包过程中 Webpack 通过 Code Splitting 功能将文件分为多个 chunks，还可以将重复的部分单独提取出来作为 commonChunk，从而实现按需加载。把所有依赖打包成一个 bundle.js 文件，通过代码分割成单元片段并按需加载


**核心概念**

- Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。告诉webpack要使用哪个模块作为构建项目的起点，默认为./src/index.js
- output ：出口，告诉webpack在哪里输出它打包好的代码以及如何命名，默认为./dist
- Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
- Plugin：扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情。

## 2. 问题：webpack 的构建流程

1. `读取配置文件`：Webpack 首先会读取项目中的配置文件（通常是 webpack.config.js），该文件包含了项目的构建配置，如入口文件，输出路径，加载器(loaders)，插件(plugins)等。
2. `解析入口文件`：根据配置文件中的入口设置，Webpack 会解析入口文件，以及入口文件所依赖的所有模块。入口文件通常是应用程序的主要 Javascript 文件，但也可以有多个入口点。
3. `依赖解析`：Webpack 分析入口文件和其依赖的模块，构建一个依赖关系图，以确定哪些模块依赖于哪些模块，以及它们之间的依赖关系。
4. `加载器处理`：webpack 使用加载器来处理不同类型的资源文件，如 CSS,图片，字体等。加载器将资源文件转换为 Webpack 可以理解的模块，同时可以应用转换和优化，如压缩，转换为 ES5 等。
5. `插件处理`：Webpack 会根据配置文件中的插件设置，调用相应的插件来处理构建过程中的各种任务，如代码压缩，资源优化，环境变量注入等。
6. `生成输出文件`：根据配置文件中的输出设置，Webpack 会将打包后的资源文件输出到指定的目录中。输出的文件通常包括主 Javascript 文件，CSS 文件，图片，字体等。
7. `优化和压缩`：webpack 可以进行各种优化，包括代码压缩，tree shaking（移除未使用的代码），代码分割（将代码拆分成多个文件，按需加载）,懒加载等，以减小包的大小并提高性能。
8. `生成Source Maps` ：Webpack 可以生成 Source Maps，用于将打包后的代码映射回原始的源代码。这对于调试和错误定位非常有帮助，因为它可以将浏览器中的错误信息指向原始的源代码文件和行号。
9. `输出到指定目录`：根据配置文件中的输出设置，Webpack 会将打包后的资源文件输出到指定的目录中。输出的目录可以是项目的根目录，也可以是自定义的目录。
10. `完成构建`：Webpack 完成所有的构建任务后，会输出打包后的资源文件到指定的目录中，会生成构建报告，包括构建成功或失败的信息，输出文件的大小等。

## 3. 问题：webpack 的热更新原理

1. `监控文件变化`：webpack 的开发服务器会监控项目中所有的模块文件，包括：JS 文件，CSS 文件，模板文件等
2. `模块热替换`：当代码做出更改并保存时，webpack 检测到文件变化，会首先通过热替换插件（如 HotModuleReplacementPlugin）来处理模块的热替换。热替换插件会将变化的模块替换到正在运行的应用程序中，而无需刷新整个页面。
3. `构建更新的模块`：生成的新模块代码会被构建成一个独立的文件或代码块
4. `通知客户端`：webpack 的开发服务器会将更新的模块信息发送给客户端（浏览器）。
5. `浏览器端处理`：浏览器端会接收到新的模块信息，根据信息使用新的模块替换旧的模块。这通常涉及到模块的加载和执行，以及 DOM 的更新。
6. `应用程序状态保持`：热更新还可以保持应用程序的状态。当修改代码不会丢失已有的数据，用户登录状态等
7. `回调处理`：允许在模块更新时执行自定义的回调函数，可以处理特定的逻辑，以确保模块更新后的正确性

## 4. 问题：webpack 常用 Loader(加载器)

- `Babel Loader`：用于将新版 Jvavscript 代码转换为旧版 Javascript 代码，以确保在旧版浏览器中运行。解决不同版本之间的问题。
- `css Loader`: 处理 CSS 文件，使其能够被打包到应用程序中，可以配合其他 Loader（如 style-loader）一起使用，以处理 CSS 的导入，模块化等问题
- `style-loader`：将 CSS 代码注入到 Javascript 中，使样式生效。通常与 css-loader 一起使用，以处理 CSS 的导入和模块化。
- `File-loader`：用于处理文件资源，如图片，字体等。它可以将文件复制到输出目录，并返回文件的 URL 或路径，以便在应用程序中使用。
- `url-loader`：与 file-loader 类似，用于处理文件资源，如图片，字体等。不同之处在于，它可以将小文件（如图片）转换为 base64 编码的字符串，以减少 HTTP 请求次数。
- `Sass/SCSS loader`：用于处理 Sass/SCSS 文件，将其转换为 CSS 文件。通常与 css-loader 和 style-loader 一起使用，以处理 Sass/SCSS 的导入和模块化。
- `Less Loader`：用于处理 Less 文件，将其转换为 CSS 文件。通常与 css-loader 和 style-loader 一起使用，以处理 Less 的导入和模块化。
- `postcss-loader`：用于处理 CSS 文件的后处理，如添加浏览器前缀，自动添加单位等。通常与 css-loader 和 style-loader 一起使用，以处理 CSS 的后处理问题。
- `Image-loader`：用于处理图片资源，如 JPEG，PNG，GIF 等。它可以对图片进行压缩，优化，转换等操作，以减小图片文件的大小。
- `ESLint-loader`：用于在打包过程中检查 Javascript 代码的语法错误和风格问题。它可以与 Babel-loader 一起使用，以确保代码符合项目的规范。
- `TS-loader`：用于处理 Typescript 文件，将其转换为 Javascript 文件。通常与 Babel-loader 一起使用，以确保 Typescript 代码在旧版浏览器中运行。
- `Vue-loader`：用于处理 Vue 组件文件（.vue 文件）。它可以将 Vue 组件的模板，脚本，样式等分离出来，并使用其他 Loader（如 Babel-loader，css-loader 等）进行处理。

## 5. 问题：webpack 常用 Plugin(插件)

- `HtmlWebpackPlugin`：用于生成 HTML 文件。它可以根据模板文件，自动添加打包后的资源文件（如 Javascript，CSS 等）到 HTML 文件中。
- `CleanWebpackPlugin`：用于在每次打包前清理输出目录。它可以确保每次打包都是一个干净的目录，避免旧文件的干扰。
- `MiniCssExtractPlugin`：用于将 CSS 代码提取到独立的文件中。它可以与 css-loader 一起使用，以将 CSS 代码从 Javascript 中分离出来，提高页面的加载速度。
- `CopyWebpackPlugin`：用于复制文件或目录到输出目录。它可以将项目中的静态资源（如图片，字体等）复制到输出目录，以确保在应用程序中可以访问到这些资源。
- `DefinePlugin`：用于定义全局变量。它可以在打包过程中，将指定的变量定义为全局变量，以便在应用程序中使用。
- `UglifyJsPlugin`：用于压缩 Javascript 代码。它可以减小 Javascript 文件的大小，提高页面的加载速度。
- `HotModuleReplacementPlugin`：用于实现模块热替换。它可以在开发过程中，实时替换修改的模块，而无需刷新整个页面。
- `BundleAnalyzerPlugin`：用于分析打包后的代码，生成可视化的报告。它可以帮助开发人员了解代码的组成和依赖关系，以及优化打包配置。
- `ProvidePlugin`：用于提供全局变量。它可以在打包过程中，将指定的变量提供给所有的模块，而无需在每个模块中显式引入。
- `FriendlyErrorsWebpackPlugin`：用于友好的错误提示。它可以在打包过程中，以更易读的方式显示错误信息，帮助开发人员快速定位问题。
- `ESLintPlugin`：用于在打包过程中检查 Javascript 代码的语法错误和风格问题。它可以与 Babel-loader 一起使用，以确保代码符合项目的规范。
- `stylelint-webpack-plugin`：用于在打包过程中检查 CSS 代码的语法错误和风格问题。它可以与 css-loader 一起使用，以确保 CSS 代码符合项目的规范。

## 6. 问题：Loader 和 Plugin 的区别

- `Loader`：用于处理特定类型的文件，如 Javascript，CSS，图片等。它可以将文件转换为 webpack 模块，以便在应用程序中使用。
- `Plugin`：用于执行更复杂的任务，如代码压缩，资源复制，环境变量注入等。它可以在打包过程中，对输出的代码进行额外的处理。

**Loader**

1. `作用`：Loader 用于处理模块中的资源文件，将它们转换为 webpack 可以理解的模块
2. `资源处理`：Loader 处理各种资源文件，如 Javascript，CSS，图片等。它可以将这些资源文件转换为 webpack 模块，以便在应用程序中使用。
3. `模块级别`：Loader 工作在模块级别，通常用于处理单个文件或模块，它们直接与模块的内容交互
4. `配置`：Loader 通过`module.rules`进行配置，规定了哪些文件需要使用哪些 Loader 进行处理。
5. `示例`：Babel loader 用于将 ES6+Javascript 转换为 ES5,CSS Loader 用于加载和处理 CSS 文件等

**Plugin**

1. `作用`：Plugin 用于扩展 webpack 的功能，执行各种自定义构建任务和优化
2. `构建过程控制`：Plugin 可以介入 webpack 的构建过程，在不同的生命周期阶段执行任务，如代码压缩，文件生成，html 注入等
3. `应用级别`：Plugin 工作在应用级别，对整个打包过程进行优化和定制。它们可以在构建过程中，对输出的代码进行额外的处理和转换。
4. `配置`：Plugin 通过`plugins`进行配置，开发这可以根据需要添加不同的插件来扩展构建功能。
5. `示例`：HtmlWebpackPlugin 用于生成 HTML 文件，CleanWebpackPlugin 用于清理输出目录等

## 7. 问题：写一个 loader

```js
// 1. 导出一个函数，该函数接受源代码作为参数
module.exports = function (source) {
  // 2. 执行转换逻辑
  //   这里的示例是将所有的console.log语句移除
  const processedSource = source.replace(/console\.log\((.*)\);/g, "");

  // 3. 返回处理后的源代码
  return processedSource;
};
```

**引用：webpack 配置**

```js
module.exports = {
  // 其他配置
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配所有的.js文件
        use: [
          {
            loader: "./my-loader.js", // 指定自定义的Loader
          },
        ],
      },
    ],
  },
};
```

## 8. 问题：写一个 plugin

```js
class BundleReportPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "BundleReportPlugin",
      (compilation, callback) => {
        // 插件逻辑
        // 可以访问compilation对象，获取打包后的资源信息
        // 可以在输出目录生成报告文件
        const timestamp = new Date().toLocaleString();
        const moduleCount = Object.keys(compilation.modules).length;

        const reportContent = `打包时间：${timestamp}模块数量：${moduleCount}`;

        compilation.assets["bundle-report.txt"] = {
          source: () => reportContent,
          size: () => reportContent.length,
        };

        callback();
      }
    );
  }
}

module.exports = BundleReportPlugin;
```

**引用：webpack 配置**

```js
const BundleReportPlugin = require("./bundle-report-plugin");

module.exports = {
  // 其他配置
  plugins: [
    new BundleReportPlugin({
      // 插件选项
    }),
  ],
};
```

## 9. 问题：webpack 构建速度提升

1. `升级webpack版本`：升级到最新版本的 webpack，通常可以带来性能提升和新功能。
2. `使用持久缓存`：配置 webpack 以生成长期缓存的文件名，在构建时只有修改过的文件需要重新构建
3. `配置最小的loader规则`：只使用必要的 loader，避免加载不必要的文件。例如，只使用 Babel-loader 处理 Javascript 文件，而不是所有的.js 文件。
4. `使用Happypack`: Happypack 是一个多线程 Loader 处理工具，可以加速构建过程
5. `使用thread-loader`: thread-loader 可以将耗时的 loader 任务分配给多个线程并行处理，进一步提升构建速度。
6. `使用DLL（动态链接库）`：将一些不经常改变的依赖库打包成 DLL 文件，在每次构建时只需要重新构建变化的模块，而不是整个项目。
7. `使用缓存`：配置 webpack 的缓存选项，如`cache: true`，可以缓存模块的编译结果，避免重复构建。
8. `减少模块数量`: 优化项目，减少模块和依赖的数量，以减少构建事件
9. `Code Splitting`: 使用 webpack 的代码分割功能，以减少每次构建需要处理的模块数量
10. `优化loader`: 选择高效的 loader,或者编写自定义 loader 以提高处理速度
11. `优化插件`：选择和配置插件，确保它们不会导致构建速度变慢
12. `使用tree shaking`: 启用 webpack 的 tree shaking 功能，它可以移除未使用的代码，进一步减少打包体积。
13. `使用resolve配置`: 通过 webpack 的 resolve 配置来减少模块查找时间，提高构建速度
14. `开发模式和生产模式分离`: 确保区分开发和生成构建模式，以避免不必要的开发工具和代码优化
15. `使用webpack-dev-server`: 开发时使用 webpack-dev-server，它提供了快速的热模块替换和实时刷新功能，无需手动刷新浏览器。
16. `分析工具`：使用 webpack-bundle-analyzer 等工具分析打包体积和依赖关系，以找出性能瓶颈和优化空间。

## 10. 问题：webpack 神奇注释

webpack 的"神奇注释"(Magic Comments)是一种特殊的注释语法，用于在 webpack 打包过程中提供附加的指令和配置信息。这些注释以特殊的格式编写，并可以影响 webpack 的行为。

1. **Chunk 名称注释**：用于动态导入的模块指定生成的 Chunk 文件的名称

```js
import(/* webpackChunkName: "my-chunk" */ "./my-module.js");
```

2. **Chunk 模式注释**：用于指定模块的加载模式，如 lazy lay-once eager 等

```js
import(
  /* webpackChunkName: "my-chunk" */ /* webpackChunkLoading: "lazy" */ "./my-module.js"
);
```

3. **Chunk 预取注释**：用于指定是否在空闲时取预取模块

```js
import(
  /* webpackChunkName: "my-chunk" */ /* webpackChunkLoading: "lazy" */ /* webpackPrefetch: true */ "./my-module.js"
);
```

4. **Chunk 预加载注释**：用于指定是否在当前模块加载后立即预加载模块

```js
import(
  /* webpackChunkName: "my-chunk" */ /* webpackChunkLoading: "lazy" */ "./my-module.js"
);
```

这些神奇注释可以在 webpack 的动态导入中使用，以帮助控制 chunk 的生成，加载模式和优化策略

## 11. 问题：webpack 分包案例

**目的**：尽量按改动频率区分，利用浏览器缓存

1. vendor:第三方 lib 库，基本不会改动，除非依赖版本升级
2. common:业务组件代码的公共部分抽取出来，改动较少
3. entry:不同页面 entry 里业务组件代码的差异部分，会经常改动

## 12. 问题 webpack 和 vite 的区别

**webpack**一个打包工具（对标 Rollup），静态构建，在项目工程化，依赖，打包，构建等过程中发挥作用
**vite**是一个更上层的工具链方案，对标的是（webpack+针对 web 的常用配置+webpack-dev-server）。旨在提供快速的开发体验，她使用 ES 模块（ES modules）和现代浏览器特性来实现即时开发，不需要预构建或编译。

## 13.问题 Babel 的原理

Babel 是一个广泛使用的 Javascript 编译工具，它的主要原理是将新版本的 javascript 代码（通常是 ES6+）转换为向后兼容的 JavaScript 代码，以便在旧版 JavaScript 引擎上运行。
**工作原理**

1. **解析（Parsing）**：Babel 首先将输入的 JavaScript 代码解析成抽象语法树（AST）。AST 是代码的抽象表示，将代码分解成语法树节点，以便后续的分析和转换。
2. **转换（Transformation）**：在 AST 的基础上，Babel 执行一系列插件和转换器，对代码进行修改和转换。这些转换可以包括将新语法转换为旧语法，添加或删除代码，优化代码结构等。转换过程是插件驱动的，每个插件负责特定的抓换任务。
3. **生成（Code Generation）**：一旦所有的转换都完成，Babel 将 AST 转换回 JavaScript 代码。生成的代码通常是经过格式化和压缩的，以提高执行效率。

Babel 的主要功能是将现代 JavaScript 代码转换为 ES5 或更早版本的 JavaScript，以确保它可以在不支持新语法的浏览器和 JavaScript 引擎上运行。这使开发人员能够利用新的语言功能而不用担心向后兼容性问题。此外，Bable 还可以执行其他任务，如模块转换，typescript 支持，flow 类型检查等。Bable 的插件系统允许开发人员创建自定义的转换和功能，以满足项目的需求。

## 14. 问题：模块化与组件化的区别

**模块化**

1. **重点**：模块化主要关注代码的组织和封装，它将代码分割成小的独立单元（模块），每个模块通常负责特定功能或任务
2. **应用领域**：模块化通常用于管理和组织 JavaScript 代码。它适用于将大型代码库分割为可管理的部分，以提高可维护性和可重用性。
3. **特点**：模块化通过导入和导出语法来定义模块之间的依赖关系，例如 CommonJS,ES6 模块，AMD 等。它通常再服务器端（Node.js）和客服端（浏览器）开发中都有应用

**组件化**

1. **重点**：组件化要关注构建用户界面和交互。它将用户界面拆分成金额重用的组件，每个组件包含了特定的 UI 元素和交互逻辑。
2. **应用领域**：组件化通常用于前端开发，特别是用于构建 web 应用程序的用户界面。它有助于将界面分解为独立，可重用的部分，以提高开发效率和用户体验。
3. **特点**：组件化通常使用组件库或框架（如 react,vue,angular）来创建、组合和渲染可重用的 UI 组件。每个组件通常包含 HTML 模板、css 样式和 JavaScript 逻辑。可以嵌套再应用程序的不同位置，以构建复杂的用户界面

综上，模块化主要关注代码的组织和封装，而组件化主要关注构建可重用的用户界面部分。虽然它们在某些方面有相似之处，但它们有不同的目标和应用领域。在实际开发中，通常会同时使用模块化和组件化的概念，以便更好地管理代码和开发用户界面。

## 15. 问题：CommonJS 与 ESM（ECMAScript Modules）的区别

CommonJS 模块通常用于服务器端（Node.js），在浏览器端需要使用工具进行转译或打包。
ESM （ECMAScript Modules）模块是浏览器原生支持的，可以直接在现代浏览器中使用，不需要额外的转译工具。

1. **加载时机**
   - **CommonJS**: 同步加载，模块在运行时（runtime）加载，并且是按需加载的，只有在需要时才会被加载
   - **ESM**: 静态加载的，模块在解析时加载，在代码执行之前就被加载，因此具有更早的加载时机
2. **依赖关系**
   - **CommonJS**: 模块的依赖关系是动态的，意味着模块可以在运行时根据条件加载不同的依赖
   - **ESM**: 模块的依赖关系是静态的，依赖关系是模块加载之前就确定，不能根据条件改变依赖关系
3. **导出方式**
   - **CommonJS**:使用`module.exports`导出模块，使用`require`导入模块，可以导出任意类型的值，包括函数、对象、类等
   - **ESM**:使用`export`导出模块，使用`import`导入模块。导出时需要明确指出导出的变量，函数或类，导入时也需要明确指出导入的内容
4. **全局共享**
   - **CommonJS**:模块在每个模块中都有自己的作用域，不会污染全局作用域
   - **ESM**:模块默认是严格模式（strict mode），变量不会污染全局作用域，模块内部的变量不会被提升
5. **静态分析**
   - **CommonJS**:模块的依赖关系无法在编译时静态分析，这对一些工具的性能和优化产生了挑战
   - **ESM**: 模块的依赖关系可以在编译时进行静态分析，这有助于提高性能和优化
6. **案例**

   - **CommonJS**:

 ```js
   // 模块A.js
   module.exports = function greet(name) {
     return `hello ${name}`;
   };

   // 模块B.js
   const greet = require("./A.js");
   console.log(greet("world"));
```

   - **ESM**:

```js
// 模块A.js
export function greet(name) {
  return `hello ${name}`;
}

// 模块B.js
import { greet } from "./A.js";
console.log(greet("world"));
```
CommonJS和ESM都用于模块化JavaScript，但它们在加载时机，依赖关系，导出方式，全局作用域等方面存在重要的区别。在浏览器端，ESM成为官方的标准，而在服务器node.js中，CommonJS是主要的模块系统。


## 16. 问题：关于服务端渲染（SSR）和客户端渲染（CSR）的区别
1. 我们平常在浏览器页面，是有两种渲染方式的，一种是由浏览器渲染，叫CSR,Clinet-Slide Rendering,这也是绝大部分日常开发的模式。而另一种是由服务端渲染，叫SSR,Server-Side Rendering。
2. 日常的CSR渲染逻辑是后端返回一个空白html,浏览器接收到这个html后，再执行vue的初始化相关的事情，再请求各个接口获取数据，最后再把数据填充在页面上。而SSR，则是由服务端完成这一系列行为，构建好vue,后端从数据库取出要渲染的数据并填充在页面上。这样一来，页面对SEO变得友好，而且减少很多页面请求数据得交互，首屏能更快得完成渲染，但又因为有更多得逻辑在渲染前完成，可能会导致白屏时间过长服务器压力变大，页面跳转也需要频繁得刷新页面，体验不友好。
3. 而在真是得开发中，不少非此即彼的，CSR和SSR都有各自的优缺点，我自己的项目中，一般会根据项目的需求和规模，选择合适的渲染方式。如果是对SEO要求较高的项目，或者是需要快速渲染的项目，我会选择SSR。而如果是对用户体验要求较高的项目，或者是需要频繁交互的项目，我会选择CSR。
（SEO（Search Engine Optimization）是指通过技术手段和内容策略，使网站在搜索引擎中获得更高排名的过程。）


## 17. 问题：单页面应用SPA 与多页面应用MPA 的优劣
**定义**

1. `SPA`:即为单页面应用，不刷新页面，路由跳转是基于特定的实现（如vue-router,react-router等），通过改变URL的hash值或HTML5的history API来实现路由跳转，而非原生浏览器的文档跳转（navigatingacross documents）。
2. `MPA`:即为多页面应用，每个页面都是一个完整的HTML文档，路由跳转是通过刷新页面来实现的。

**优点**

1. SEO友好：由于每个页面都是独立的，所以对搜索引擎更友好
2. 初始加载速度：通常，初次加载页面的速度比SPA快，因为只加载当前页面需要的资源
3. 简单的缩放：服务器端处理可以更容易地缩放应用，因为客户端只承担少部分工作。

**缺点**

1. 用户体验：每次页面跳转都会导致整个页面刷新，可能影响用户体验
2. 资源重新加载：在每个页面上，很多相同的资源（如样式表和脚本）可能需要被重复加载。
3. 前后端耦合： MPA通常涉及到前后端代码更紧密的耦合，可能使得开发和维护变得更复杂

**选择考虑因素（需要根据具体需求和场景进行考虑，不是非此即彼）**：

- 项目规模和复杂性：对于复杂的交互式应用（如在线文档编辑器，社交网络等），SPA可能是更好的选择。而对于简单的内容导向网站，MPA可能更合适
- 用户体验需求：如果需要提供流畅的用户体验和复杂的客户端交互，SPA更有优势
- 搜索引擎优化需求：如果SEO是关键考虑因素，MPA或利用服务器端渲染的SPA可能更合适
- 开发资源和专长：SPA需要前端框架的知识，而MPA可能更依赖于传统的服务器端技术
- 维护和更新：SPA可以更容易地推送更新，因为大部分逻辑都在客户端。MPA则可能需要更频繁地进行服务器端地更新

**怎么配置单页应用？怎么配置多页应用？**

单页应用可以理解为webpack的标准模式，直接在entry中指定单页应用的入口即可，这里不再赘述
多页应用的话，可以使用webpack的 AutoWebPlugin来完成简单自动化的构建，但是前提是项目的目录结构必须遵守他预设的规范。多页应用中要注意的是：
- 每个页面都有公共的代码，可以将这些代码抽离出来，避免重复的加载。比如，每个页面都引用了同一套css样式表
- 随着业务的不断扩展，页面可能会不断的追加，所以一定要让入口的配置足够灵活，避免每次添加新页面还需要修改构建配置


## 18. 问题：localStorage sessionStorage indexDB 区别
1. `localStorage`：
   - 存储容量：通常支持存储大约5-10MB的数据，具体容量因浏览器而异。
   - 生命周期：数据永久存储，除非被显式删除。
   - 数据模型：键值对存储，键和值都是字符串类型，可以通过javascript的`localStorage.setItem(key, value)`和`localStorage.getItem(key)`方法来进行操作。

2. `sessionStorage`：
   - 存储容量：与`localStorage`类似，通常支持存储大约5-10MB的数据，具体容量因浏览器而异。
   - 生命周期：数据在会话结束时被清除，即关闭浏览器标签页或窗口时。
   - 数据模型：与`localStorage`相同，也是键值对存储，键和值都是字符串类型,可以通过javascript的`sessionStorage.setItem(key, value)`和`sessionStorage.getItem(key)`方法来进行操作。

3. `indexDB`：
   - 存储容量：通常支持存储大于10MB的数据，具体容量因浏览器而异。
   - 生命周期：数据可以长期存储，除非被显式删除，不受会话或浏览器关闭影响。
   - 数据模型：基于对象存储，每个数据项都是一个对象，包含键、值、索引等属性。可以通过javascript的`IDBTransaction`和`IDBObjectStore`等对象来进行操作。

- 使用`localStorage`和`sessionStorage`时，适用于相对小的数据，例如用户配置，临时存储等，其中`localStorage`的数据是永久保存的，而`sessionStorage`的数据只在当前会话有效。
- 使用`indexDB`时，适用于需要处理大量结构化数据，需要离线访问和更复杂查询的情况，例如用户个人信息，离线缓存等。



