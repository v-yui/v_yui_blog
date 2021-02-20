## 指令

 指令带有前缀 `v-`，以表示它们是 Vue 提供的特殊 attribute，它们会在渲染的 DOM 上应用特殊的响应式行为。 

- `{{}}` 模板语法将数据渲染进DOM系统。
- `v-bind` 绑定元素attribute，使其与Vue实例中的property一致。
- `v-if` 控制元素是否显示。
- `v-for` 渲染一个数据列表。
- `v-on` 添加一个事件监听器，调用Vue实例中定义的方法。
- `v-model` 表单输入和应用状态的双向绑定。
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

