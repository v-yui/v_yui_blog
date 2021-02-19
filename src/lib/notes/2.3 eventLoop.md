 一个event loop有一个或者多个task队列。当用户代理安排一个任务，必须将该任务增加到相应的event loop的一个tsak队列中。 每一个task都来源于指定的任务源，比如可以为鼠标、键盘事件提供一个task队列，其他事件又是一个单独的队列。可以为鼠标、键盘事件分配更多的时间，保证交互的流畅。task也被称为macrotask，通常任务源包括：

- **DOM操作任务源：**此任务源被用来相应dom操作，例如一个元素以非阻塞的方式[插入文档](https://html.spec.whatwg.org/multipage/infrastructure.html#insert-an-element-into-a-document)。
- **用户交互任务源：**此任务源用于对用户交互作出反应，例如键盘或鼠标输入。响应用户操作的事件（例如[click](https://w3c.github.io/uievents/#event-type-click)）必须使用task队列。
- **网络任务源：**网络任务源被用来响应网络活动。
- **history traversal任务源：**当调用history.back()等类似的api时，将任务插进task队列。
-  `setTimeout`、`setInterval`、`setImmediate`也是task任务源 。

每个event loop都有一个microtask队列，通常task任务源与microtasks互不相关。通常被认为是microtask任务源的有：`process.nextTick`、promises、`Object.observe`、MutationObserver。

注意：Promise/A+规范提及promise的then可采用macro-task或micro-task，故浏览器可能有不同的实现机制，但通常认为promise属于microtasks队列。

task和microtask都是推入栈中执行的。JS只有一个主线程，主线程有一个栈，每个函数执行时都会生成执行上下文并将其推入栈中，函数执行完毕后执行上下文从栈弹出。

事件循环过程较难语言叙述，具体执行例子可看：[从event loop规范探究javaScript异步及浏览器更新渲染时机—>完整异步过程](https://github.com/aooy/blog/issues/5)。

