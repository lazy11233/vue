## 1.Vue的基本介绍和概述
* vue的模式
> ` MVVM `模式，视图层和数据层的双向绑定，让我们无序去关心DOM操作的事情，更多的精力放在数据和业务逻辑上去。
* 简述MVVM模式
> ` MVVM `是把` MVC `模型中的` Cotroller `和` MVP `里的` Presenter `改成了` ViewModel `,也就是` Model + view + ViewModel `。View的变化会自动更新到` ViewModel`,` ViewModel `是业务逻辑层对数据处理（比如增删改查）。
* Vue的优点：
    1. 轻量化
    2. **双向数据绑定**
    3. **指令**
    4. 插件化
## 2.数据绑定，指令，事件
### 2.1.1 vue实例和数据绑定
```html
<div id="app">
    {{msg}}
</div>
<script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js"></script>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            msg: '我的第一个vue应用'
        }
    })
</script>
```
通过构造函` new Vue() `可以创建一个Vue的根实例，并启动Vue应用的入口。
1. 必不可少的选项就是` el `，` el `用于指定一个页面中已存在的DOM元素来**挂载**` Vue `实例。可以使html标签，也可以是CSS选择器（` #app `）。
2. 通过Vue是咧的` data `选项，可以声明应用内需要双向绑定的数据。建议所有会用到的数据都预先在` data `内声明,这样不至于将数据散落在业    务逻辑中，难以维护。
3. 挂载成功后，我们可以通过` app.$el `来访问该元素。Vue提供了很多常用的实例属性和方法，都以` $ `开头。
### 2.1.2 生命周期钩子
![lifecycle.png](https://upload-images.jianshu.io/upload_images/12203679-4c41d559fd9d94c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> * created 实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，$el还不可用。
> * mounted el挂载到实例上后调用，一般我们第一个业务逻辑会从这开始，相当于jQuery中的$(document).reday();
> * beforeDestory 实例销毁之前调用，主要解绑一些使用addEventListener监听的事件。

### 2.1.3 文本插值和表达式
语法使用双大括号是最基本的文本插值方法，它会自动将我们双向绑定的数据实时显示出来。
> 用法
```html
{{msg}}
<hr>
{{6+6*3}}---进行简单的运算
<hr>
{{ 5>3?msg:"woqu"}} ---三目运算
<hr>
{{if(5>3){msg}}}---编译报错
```
*注意*：文本插值的形式，其中不能书写表达式，支持单个表达式。
` {{var a = 6}} `其实是多行表达式:` var a; a = 6; `
### 2.1.4 过滤器
> Vue支持在` {{}} `插值的尾部添加管道符` | `对数据进行过滤，经常用于格式化文本，比如字母全部大写，货币自动补全。过滤的规则是自定义的，通过给Vue实例添加选项` filters `来设置。
```html
<div id="app">
当前的时间是:{{currentTime | timeFormatter}}
</div>
<script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js"></script>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            currentTime: new Date(),
        },
        filters: {
            timeFormatter(time) {
                var currentDate = new Date(time);
                var year = currentDate.getFullYear();
                var month = currentDate.getMonth() + 1;
                var day = currentDate.getDate();
                var hour = currentDate.getHours();
                var min = currentDate.getMinutes() + '';
                var sec = currentDate.getSeconds() + '';
                min = min.length > 1 ? min : '0' + min;
                sec = sec.length > 1 ? sec : '0' + sec;
                return year + '年' + month + '月' + day + '日 ' +  hour + ':' + min + ':' + sec;
            }
        }
    });
    setInterval(() =>{
        app.currentTime = new Date();
    },1000)
</script>
```
### 2.1.5 指令
> 指令（Directives）是Vue模板中最常用的一项功能，它带有前缀` v- `，能帮我们快速完成DOM操作。循环渲染、显示、隐藏等
* ` v-text `解析文本，作用和` {{}} `一样，innerText
* ` v-html `解析html，在页面中直接解析标签innerHTML。
* ` v-bind `v-bind的基本用途是动态更新HTML元素上的属性，比如` class `等
* ` v-on `绑定事件监听器
```html
<div id="app">
    v-text: 解析文本，和{{}}作用一样：
    <button v-text="btn"></button>
    <hr>
    v-html: 解析HTML,和innerHTML
    <div v-html="btns"></div>
    <hr>
    v-bind: 动态更新HTML元素上的属性，如class。
    <div v-bind:class="className"></div>
    <hr>
    <button v-on:click="handler">点击我弹窗</button>
</div>
<script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js"></script>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            btn: '我是一个按钮',
            btns: '<button>按钮1</button><button>按钮2</button>',
            className: "active"
        },
        methods: {
            handler() {
                alert("click me");
            }
        }
    });
</script>
```
## 3.计算属性
在一个计算属性里可以完成各种复杂的逻辑，包括运算、函数调用等，只要最终返回一个结果就可以了。计算属性还可以依赖多个Vue实例中的数据，**只要其中一个发生变化，计算属性就会重新执行，试图也会重新更新**
```html
<div id="app">
    {{msg.split(",").reverse().join(',')}}
    <hr>
    {{reverMsg}}
</div>
<script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js"></script>
<script>
//需求：翻转一个字符串
var app = new Vue({
    el: '#app',
    data: {
        msg: '123,456,789'
    },
    computed: {
        reverMsg: function() {
            return this.msg.split(',').reverse().join(',');
        }
    }
})
</script>
```
 ### 3.1 getter和setter
> * 如果计算属性后面直接跟一个` function `，默认的就是getter函数
```javascript
    computed: {
        fullName: {
            get: function() {
                return this.firstName + ',' +this.lastName;
            },
            set: function(newValue) {
                var name = newValue.split(',');
                this.firstName = name[0];
                this.lastName = name[0];
            }
        }
    }
```
## 4.v-bind以及class与style的绑定
应用场景：DOM元素动态绑定一些class类名或style样式。
```html
<div :class="bg">红色</div>
对象语法：
<div :class="{red: isRed}"></div>
数组语法：
<div :class="[class1,class2]">数组</div>
数组和对象混用:
<div :class="[{active: isRed},class2]"></div>
```
## 5.Vue的内置指令
### 5.1.1 v-cloak
` v-cloak `一般与` display:none `结合使用
> 作用：解决初始化慢导致页面闪动的最佳实践
```css
[v-cloak] {
    display: none;
}
```
### 5.1.3 v-once
> 定义他的元素和组件只渲染一次,之后再修改数据都不会渲染数据
### 5.1.4 条件渲染指令
> ` v-if `判断条件是否满足来切换元素的渲染与否。可与` v-else `搭配使用

**注意:** ` v-if `和` v-else `的页面元素复用模式,增加唯一的` key `阻止页面元素渲染。
```html
<input type="text" placeholder="用户名" v-if="type==='name'" key="name">
<input type="text" placeholder="密码" v-else>
```
### 5.1.5 v-show
> 和` v-if `使用方式一样。
### 5.1.6 v-show和v-if的区别
* ` v-if `实时渲染，改变DOM结构
* ` v-show `改变元素的` display `的属性值。
### 5.1.7 v-for
> 用法：遍历多个对象,或遍历对象中的属性。
```html
<div id="app" v-cloak>
    v-for遍历对象：
    <ul>
        <li v-for="(method,index) in vueMethods" :key="index">{{method.name}}</li>
    </ul>
    v-for遍历对象的多个属性：
    <ul>
        <li v-for="v in nvshen">{{v}}</li>
    </ul>
</div>
<script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js"></script>
<script>
var app = new Vue({
    el: '#app',
    data: {
        vueMethods: [
            {name: '多思考'},
            {name: '多练习'},
            {name: '好好听课'}
        ],
        nvshen: {
            age: 18,
            sex: 'nv',
            heigh: 170
        }
    },
    methods: {
    }
})
</script>
```
### 5.1.8 数组更新
> * ` push ` 、 ` pop ` 、` shift ` 、` unshift `、` sort `、`  `动态修改数组后，数组会自动刷新页面上相关的数据显示。
> ` splice() `可以添加或者删除元素（万能方法）返回删除的元素 1).index(必选)规定添加/删除项目的位置，使用负数可从数组结尾处规定位置; 2) howmany(必选)要删除的项目数量。如果设置为 0，则不会删除项目。 3) item1, ..., itemX(可选)向数组添加(多个)新项目。

**注意:** 直接修改数组的长度和数组中某一项并不能实时刷新页面。
```html
<div id="app" v-cloak>
    <div v-for="study in arr">{{study}}</div>
    <button @click="changeLength">直接改变数组长度</button>
    <button @click="changeItem">直接改变数组指定项</button>
</div>
<script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js"></script>
<script>
var app = new Vue({
    el: '#app',
    data: {
        arr: ['book','pen','pencil']   
    },
    methods: {
        changeLength() {
            this.arr.length = 1;
        },
        changeItem() {
            this.arr[0] = 'alice';
        }

    }
});
</script>
```
上面的例子中，点击按钮会直接改变数组的内容和长度，但是页面却没有实时刷新。
解决上述问题的方法是：

* ` Vue.set(app.arr,1,"π") `通过Vue的` set() `方法。
* 通过数组方法` splice() `
## 6.方法与事件
* 绑定一个事件：
```html
<button @click="handlecount(1)">+1</button>
```
### 6.1 事件修饰符
在vue中阻止事件冒泡：
```html
<div class="box" @click="boxclick">
    <button @click="btnclick">点我</button>
</div>
```
修改后：
```html
<div class="box" @click="boxclick">
    <button @click.stop="btnclick">点我</button>
</div>
```
* ` .stop="xxx" `阻止事件的传播
```html
<a href="https://www.baidu.com" @click.prevent="preventDefault">百度一下</a>
```
* ` .prevent="xxx" `阻止事件的默认动作,a标签的href跳转、表单的默认提交。
```html
<button @click.once="alertMsg">弹窗</button>
```
* ` .once="xxx" `只执行一次的事件
```html
<input type="text" @keyup.13="submitMe">
<!-- 分割线 -->
<input type="text" @keyup.enter="submitMe">
```
* ` .13="xxx" `监听键盘事件,13表示回车
## 7. 组件
