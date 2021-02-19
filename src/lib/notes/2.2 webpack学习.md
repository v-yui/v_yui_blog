# 使用

webpack 动态打包所有依赖，并生成依赖图，使每个模块明确表述它自身的依赖，避免打包未使用的模块。

## 基础

创建目录结构如下：

```diff
  |- package.json
  |- /dist
  	|- index.html
  |- /src
  	|- index.js
```



`webpack.config.js` 基础配置：

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

Tip： 如果 `webpack.config.js` 存在，则 `webpack` 命令将默认选择使用它。 使用 `--config` 选项则可以传递任何名称的配置文件。 



## 管理

 webpack 最出色的功能之一就是，除了引入 JavaScript，还可以通过 loader 或内置的 [Asset Modules](https://webpack.docschina.org/guides/asset-modules/) 引入任何其他类型的文件。 



### 加载CSS

要在JS中 import CSS文件，首先需要安装 **style-loader** 和 **css-loader**：

```shell
npm install --save-dev style-loader css-loader
```

webpack.config.js 添加配置：

```javascript
module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-lader', 'css-loader']
      }
    ],
  },
```

 webpack 根据正则表达式，来确定要查找的文件，并提供给指定的 loader。此示例中，所有以 `.css` 结尾的文件，都将被提供给 `style-loader` 和 `css-loader`。  模块 loader 可以**链式调用**。链中的每个 loader 都将对资源进行转换。链会逆序执行。第一个 loader 将其结果（被转换后的资源）传递给下一个 loader，所以，要保证loder的先后顺序。最后，webpack 期望链中的**最后的 loader 返回 JavaScript**。 

*其他loader使用方法相似，以此类推。*



### 分离入口

在entry中添加新路径作为入口起点，修改output为对应生成的文件名。如：

```JavaScript
module.exports = {
  entry: './src/index.js',
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
   output: {
    filename: 'bundle.js',
    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```



### HtmlWebpackPlugin 

HtmlWebpackPlugin 可以生成项目的主入口HTML文件，并管理其中引入的JS，CSS等资源。安装如下：

```shell
npm install --save-dev html-webpack-plugin
```

webpack.config.js 添加配置：

```javascript
plugins: [
    new HtmlWebpackPlugin({
      title: 'HtmlWebpackPlugin的输出',
    }),
  ]
```



### 清理dist

 webpack 将生成文件并放置在 `/dist` 文件夹中，但是它不会追踪哪些文件是实际在项目中用到的，通常推荐在每次构建前都清理`/dist`文件夹。

安装清理插件：`npm install --save-dev clean-webpack-plugin`



## 开发

### 错误追踪

使用webpack打包源代码，很难追踪到error和warning的原始位置。为此，JS提供`source maps`功能，将编译后的代码映射回原始代码。

webpack.config.js中添加`devtool: 'inline-source-map'`



### 自动编译

 webpack 提供几种能在代码发生变化后自动编译代码的方式：



#### watch mode

 你可以指示 webpack "watch" 依赖图中所有文件的更改。如果其中一个文件被更新，代码将被重新编译，不必再去手动运行整个构建。 要看到修改后的效果仍需要手动刷新浏览器。

在package.json中添加`"watch": "webpack --watch"`，若不想触发后删除index.html，可以在CleanWebpackPlugin中配置cleanStaleWebpackAssets选项来实现。



#### webpack-dev-server

 `webpack-dev-server` 为你提供了一个简单的 web server，并且具有 live reloading(实时重新加载) 功能。 

安装`npm install --save-dev webpack-dev-server`

修改 配置文件，告知 dev server，从什么位置查找文件： 

```javascript
devServer: {
    contentBase: './dist',
  },
```

  以上配置告知 `webpack-dev-server`，将 `dist` 目录下的文件 serve 到 `localhost:8080` 下。（译注：serve，将资源作为 server 的可访问文件） 

webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server 根路径上的真实文件一样。如果你的页面希望在其他不同路径中找到 bundle 文件，则可以通过 dev server 配置中的 [`publicPath`](https://webpack.docschina.org/configuration/dev-server/#devserverpublicpath-) 选项进行修改。 



#### webpack-dev-middleware

 `webpack-dev-middleware` 是一个封装器(wrapper)，它可以把 webpack 处理过的文件发送到一个 server。 `webpack-dev-server` 在内部使用了它，然而它也可以作为单独的 package 来使用，以便根据需求进行自定义设置。 

安装：`npm install --save-dev express webpack-dev-middleware`

配置暂不做叙述。









## [性能](https://webpack.docschina.org/guides/build-performance/)

更新webpack和node到最新版本， 较新的版本能够建立更高效的模块树以及提高解析速度。 

 将 loader 应用于最少数量的必要模块；通过使用 `include` 字段，仅将 loader 应用在实际需要将其转换的模块。

 每个额外的 loader/plugin 都有其启动时间。尽量少地使用工具。 