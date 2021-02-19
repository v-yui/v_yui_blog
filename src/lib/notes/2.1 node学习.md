# node

### REPL

在控制台使用node时省略文件名，则会在REPL模式中使用。REPL是可交互的，编写代码时若按下tab键则REPL会尝试自动补全内容；在对象名后加“·”再按下tab可查看该对象属性&方法。REPL还有一些特殊的命令：

- `.help`: 显示点命令的帮助。
- `.editor`: 启用编辑器模式，可以轻松地编写多行 JavaScript 代码。当处于此模式时，按下 ctrl-D 可以运行编写的代码。
- `.break`: 当输入多行的表达式时，输入 `.break` 命令可以中止进一步的输入。相当于按下 ctrl-C。
- `.clear`: 将 REPL 上下文重置为空对象，并清除当前正在输入的任何多行的表达式。
- `.load`: 加载 JavaScript 文件（相对于当前工作目录）。
- `.save`: 将在 REPL 会话中输入的所有内容保存到文件（需指定文件名）。
- `.exit`: 退出 REPL（相当于按下两次 ctrl-C）。





### 输出

`console` 模块提供与命令行交互的方法，基本与浏览器console对象相同。`console.log()`打印传入的字符串，可传入格式说明符，如：`%s` 、`%d`、`%i`、`%o`分别会格式化变量为字符串、数字、其整数部分、对象。`console.clear()`会清除控制台（其行为可能取决于所使用的控制台）。  `console.count()` 会对字符串的打印次数进行计数，并在旁打印计数。`console.trace()` 打印函数的调用堆栈踪迹。`console.error`会打印到 `stderr` 流。 





# npm

`npm install`语句会在`node_modules`文件夹（不存在则创建）中安装项目所需的内容；后跟包名则安装特定软件包；加`-g`标志则安装到全局位置，全局位置使用`npm root -g`可查看；还可跟`--save` 或`--save-dev` 标志，分别将包安装为默认的生产依赖项(对应package.json的dependencies)和开发依赖项(对应devDependencies)。开发依赖在生产环境中并不需要，install时设置`--production`标志可仅安装生产依赖项。

`npm update`更新包到限制的版本。`npm uninstall`卸载软件包，卸载的操作标志要与安装对应。

`npm list`可查看已安装的npm软件包（包括它们的依赖包）的最新版本；若仅获取顶层软件包，则使用后缀`--depth=0`；也可以指定包名来获取特定软件包的版本。要查看软件包在npm的最新版本，使用`npm view <name> version`。`npm outdated`列出过时的软件包列表。

要在代码中使用安装的包，使用`require`导入；若软件包是可执行文件，默认情况下它会把可执行文件放到`node_modules/.bin/`文件夹下。可输入其路径运行，5.2版本后的npm中包含的npx可直接以`npx <name>`格式运行。若在package.json中指定命令行任务，使用`npm run <task-name>`来运行。



## package.json

 `package.json` 文件是项目的清单。它是用于工具的配置中心，也是npm和yarn存储所有已安装软件包的名称和版本的地方。其内容没有硬性要求，除了必须遵守JSON格式，否则以编程方式访问其属性的程序无法读取它。

下面是一些可以使用的属性：

-  `name` ：设置应用程序或软件包的名称。 必须少于 214 个字符，且不能包含空格，只能包含小写字母、连字符或下划线，当包在npm上发布时会基于此获得它的URL。
- `author`：列出软件包的作者名称。
- `contributors`：列出包的贡献者数组。
- `bugs`： 链接到软件包的问题跟踪器，最常用的是GitHub的issues页面。
- `homepage` ： 设置软件包的主页。 
- `version`：指定软件包当前版本。遵循语义版本控制记法，三个数字分别代表主版本号、次版本号、补丁版本号。
- `license`：指定软件包的许可证。
- `keywords`：包含与软件包功能相关的关键字数组。
- `description`：包含对软件包的简短描述。
- `repository`：指定此程序包仓库所在的位置。
- `main`：设置软件包的入口点。当在应用程序中导入此软件包时，应用程序会在该位置搜索模块的导出。
- `private`：设置为 true可防止被意外发布到npm上。
- `scripts`：定义一组可以运行的node脚本，这些脚本是命令行应用程序， 可通过`npm run XXXX` 或 `yarn XXXX` 来运行。
- `dependencies`：设置作为生产依赖安装的npm软件包列表。
-  `devDependencies`：设置作为开发依赖安装的npm软件包列表。
- `engines`： 设置此包/要运行的Node.js或其他命令的版本。
- `browserslist`： 用于告知要支持哪些浏览器（及其版本）。 

可使用[semver表示法](http://nodejs.cn/learn/semantic-versioning-using-npm)设置软件包要升级到的版本。

package.json 还可承载命令特有的配置，例如 Babel、ESLint 等，它们都有特有的属性，例如 eslintConfig、babel等，命令特有的属性可以在相应的命令/项目文档中找到如何使用它们。



###  package-lock.json

package-lock.json旨在跟踪被安装的每个软件包的确切版本，以便产品以相同方式被100％复制，即使软件包的维护者更新了包。 



## npx

npx 可以运行使用 Node.js 构建并通过 npm 仓库发布的代码。  运行 `npx commandname` 会自动地在项目的 `node_modules` 文件夹中找到命令的正确引用，而无需知道确切的路径，也不需要在全局和用户路径中安装软件包。可以在本地运行全局安装的npm命令。可以使用@指定版本号来运行，还可以直接从URL运行任意代码片段。 





## 事件循环

关于JS的事件循环机制可查看其他笔记，此处不赘述。

事件循环进行一次完整行程称为一个滴答。Node的事件循环机制最重要的部分就是`process.nextTick()`，传给它的函数将会在下一次滴答前执行，即尽快执行而不是排入队列。



 传入Node提供的`setImmediate()`的任何函数都是在事件循环的下一个迭代中执行的回调，与延时为0的`setTimeout( `相似。



## 事件触发器

Node的`events`模块提供`EventEmitter`类，用于处理事件，使用`on()`添加在事件出发时执行的回调函数，`emit()`用触发事件。如下：

```JavaScript
eventEmitter.on('start', () => {
  console.log('开始')
})
eventEmitter.emit('start') // 额外参数会传给事件监听器
```

另外还有其他与事件交互方法：

- `once()`: 添加单次监听器。
- `removeListener()` / `off()`: 从事件中移除事件监听器。
- `removeAllListeners()`: 移除事件的所有监听器。