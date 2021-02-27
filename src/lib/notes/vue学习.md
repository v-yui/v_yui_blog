## 实例

 当一个 Vue 实例被创建时，它将 `data` 对象中的所有的 property 加入到 Vue 的**响应式系统**中。当这些 property 的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。 （ 唯一的例外是使用 `Object.freeze()`，这会阻止修改现有的 property，也意味着响应系统无法再*追踪*变化。 ）

 除了数据 property，Vue 实例还暴露了一些有用的实例 property 与方法。它们都有前缀 `$`，以便与用户定义的 property 区分开来。例如： ` vm.$el === document.getElementById('example')  `。

`vm.$emit` 触发当前实例上的事件。附加参数都会传给监听器回调 。

 特殊变量`$event` 可以将原始DOM事件传入v-on内联语句。



### 指令

 指令带有前缀 `v-`，以表示它们是 Vue 提供的特殊 attribute。 指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。 

- `{{}}`：“Mustache”语法将数据渲染进DOM系统，支持单个JS表达式（ 模板表达式都被放在沙盒中，只能访问全局变量的一个[白名单](https://github.com/vuejs/vue/blob/v2.6.10/src/core/instance/proxy.js#L9)，如 Math和 Date 。不能在模板表达式中试图访问用户定义的全局变量。 ）。绑定style时，对于需要添加前缀的property，vue会自动侦测并添加。
- `v-bind`：缩写`:` 绑定表达式到元素attribute，使其与实例中的property一致。 表达式结果的类型除了字符串之外，还可以是对象或数组。 
- `v-if`：控制元素是否显示，只有当条件为真时才会渲染（另外还有`v-else`、`v-else-if`）。与其相似的`v-show`则不论如何都会被渲染，只是简单的进行显示与否的切换，v-if 切换时开销更大。
- `v-for`：渲染一个数据列表，若为数组则可接收第二个参数index；若为对象可接受key、index。也接受整数来重复模板如`v-for="n in 10"`。优先级低于v-if，即二者一起使用时v-if将重复运行于每个item。在组件上使用时，`key`是
- `v-on`：缩写`@` 添加一个事件监听器，调用Vue实例中定义的方法。事件修饰符如下(可串联使用)：
  - `.stop` - 调用 `event.stopPropagation()`。
  - `.prevent` - 调用 `event.preventDefault()`。
  - `.capture` - 添加事件侦听器时使用 capture 模式。
  - `.self` - 事件是从侦听器绑定的元素本身触发时才触发回调。
  - `.{keyCode | keyAlias}` - 事件是从特定键触发时才触发回调(可使用按键别名，具体见[文档](https://cn.vuejs.org/v2/guide/events.html))。
  - `.native` - 监听组件根元素的原生事件。
  - `.once` - 只触发一次回调。
  - `.left` - (2.2.0) 点击鼠标左键时触发。
  - `.right` - (2.2.0) 点击鼠标右键时触发。
  - `.middle` - (2.2.0) 点击鼠标中键时触发。
  - `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器
- `v-model`：表单输入和应用状态的双向绑定。 本质上是语法糖，监听用户输入事件以更新数据，并对极端场景进行特殊处理(各种用法见[文档](https://cn.vuejs.org/v2/guide/forms.html))。 
- `v-once`：执行一次性插值，当数据改变时不更新插值处内容。
- `v-html`：输出真正的HTML。

注意： 从 2.6.0 开始 ，可用方括号语法接受JS表达式作动态参数，动态参数是有限制的：它预期会求出字符串，异常情况下则值为 null ；且某些字符如引号和空格是无效的。 浏览器会把 attribute 名全部强制转为小写 。

```HTML
<div id="app">
        <p>{{ dt1 }}</p>
        <p v-bind:title="dt2">
            鼠标悬停几秒钟查看此处动态绑定的提示信息！
        </p>
        <p v-if="dt3">显示中···</p>
        <ol>
            <li v-for="item in dt4">{{ item.text }}</li>
        </ol>
        <button v-on:click="alertMsg">alert！</button>
        <input v-model="dt6">
    </div>
```

```javascript
var app = new Vue({
        el: '#app',
        data: {
            dt1: 'Hello!',
            dt2: '页面加载于 ' + new Date().toLocaleString(),
            dt3: true,
            dt4: [
                { text: '第一行' },
                { text: '第二行' }
            ],
            dt6: '双向绑定的数据。'
        },
        methods: {
            alertMsg: function() {
                alert('来自v-on绑定事件的提示！')
            }
        }
    })
```



### 模板语法

Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。

在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。（也可以不用模板，直接写渲染 (render) 函数，使用可选的 JSX 语法。）



### 计算&侦听属性

```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
   	  // 声明了计算属性 reversedMessage
      // 提供的函数将用作vm.reversedMessage 的 getter 函数
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  },
    // 侦听属性——一种更通用的观察和响应 Vue 实例上数据变动的方式
    watch: {
        // 当messge发生变动就会被触发
        message: function (newMsg, oldMsg) {
            alert('过去的message' + oldMsg);
        }
    }
})
```



### 组件

组件是可复用的Vue实例，所以与`new Vue`接收相同的各种选项如data、watch等。每用一次组件，就会有一个它的新实例被创建。注意，组件的data选项必须是函数，以保证每个实例都能维护独立的数据。

 Prop 是在组件上注册的一些自定义 attribute，当一个值传递给一个 prop attribute 时，它就会成为该组件实例的一个 property。 props选项用于包含这个prop数组列表。

