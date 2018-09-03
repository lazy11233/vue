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
> * ` splice() `可以添加或者删除元素（万能方法）返回删除的元素 1).index(必选)规定添加/删除项目的位置，使用负数可从数组结尾处规定位置; 2) howmany(必选)要删除的项目数量。如果设置为 0，则不会删除项目。 3) item1, ..., itemX(可选)向数组添加(多个)新项目。

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
## 7. v-model双向绑定数据
* ` input `和` textarea `
```html
v-model的用法:
<input type="text" name="name" placeholder="用户名" v-model.lazy="msg">
{{msg}}
多行文本:
<textarea name="textarea" cols="30" rows="10" v-model.lazy="textArea"></textarea>
```
* 单选框:
```html
单选框：
<input type="radio" v-bind:checked="oneradio">
多个单选框：<br>
猫蛋：<input type="radio" name="gender" value="猫蛋" v-model="checkname">
狗蛋：<input type="radio" name="gender" value="狗蛋" v-model="checkname">
翠花：<input type="radio" name="gender" value="翠花" v-model="checkname">
```
多个单选框使用` v-model `绑定` value `的值
* 多个复选框
```html
多个复选框：
    <input type="checkbox" value="猫蛋" v-model="checks">猫蛋
    <input type="checkbox" value="狗蛋" v-model="checks">狗蛋
    <input type="checkbox" value="翠花" v-model="checks">翠花
    现在选中的是：{{checks}}
</div>
<script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js"></script>
<script>
var app = new Vue({
    el: '#app',
    data: {
        checks: []
    },
    methods: {
    }
});
</script>
```
多个复选框,如果绑定的是字符串，则会转化成true，false，与所有绑定的复选框的checked属性相对应
### 7.2 下拉框
* 单选的下拉框
```html
<select name="" id="" v-model="selected" multiple>
    <option value="猫蛋">猫蛋</option>
    <option value="狗蛋">狗蛋</option>
    <option value="翠花">翠花</option>
</select>
<script>
var app = new Vue({
    el: '#app',
    data: {
        selected: []
    },
    methods: {
    }
});
</script>
```
单选下拉框初始化值最好是个字符串，多选下拉框初始化值只能是数组` [] `

## 8. 组件
### 8.1注册组件
* 全局注册：
```html
<div id="app" v-cloak>
    <my-component></my-component>

</div>
<script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js"></script>
<script>
Vue.component('my-component',{
    template: '<div>我是一个组件</div>'
})
</script>
```
* 局部注册
```javascript
var app = new Vue({
    el: '#app',
    data: {

    },
    components: {
        'app-component': {
            template: '<div></div>'
        }
    }
});
```
### 8.2 组件使用的奇淫技巧
* 推荐使用小写字母加上"-"进行命名，如：` my-component `
* template中的内容**必须**被一个DOM元素包裹，也可以嵌套
* 在组件的定义中，除了` template `以外，还有其他选项：` data `,` computed `,` methods `
* **组件中的data必须是一个方法**
### 8.3 父组件给子组件传递数据
* 通过` props `获取父组件传递的单个数据
```html
<div id="app" v-cloak>
    <my-component fu="我是来自父组件中的内容"></my-component>
</div>
<script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js"></script>
<script>
var app = new Vue({
    el: '#app',
    components: {
        'my-component': {
            template: '<div>{{fu}}</div>',
            props: ['fu'],
            data() {
                return {
                }
            }
        },
    }
});
</script>
```
### 8.4 单向数据流
* **解释**:通过` props `传递数据时单向的，也就是父组件数据变化时会传递给子组件，但是反过来不行。
* **目的**： 是尽可能的将父子组件解耦，避免子组件无意中修改了父组件的状态。
* **应用场景**：
    1. 父组件传递初始值进来，子组件将它作为初始值保存起来。(子组件中获取父组传递的数据可以直接通过` this.xxx `)获取。
    2. 将父组件中传递进来的数据通过计算属性重新计算。

```html
<!-- 通过this.xxx获取到父组件传递进来的值。 -->
<div id="app">
        <my-component msg="我是父组件中的数据"></my-component>
    </div>
    <script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js"></script>
    <script>
        var app = new Vue({
            el: '#app',
            data: {

            },
            components: {
                'my-component': {
                    template: "<div>我是子组件<br>{{count}}</div>",
                    props: ['msg'],
                    data() {
                        return {
                            //props中的数据可以通过this.xxx直接获取》
                            count: this.msg
                        }
                    }
                }
            }
        });
    </script>
```
```html
<!-- 将父组件中传递进来的数据使用计算属性 -->
<div :style="fixWidth"></div>
<script>
    'width-component': {
                    template:'<div class="box" :style="fixWidth">我是子组件{{ss}}</div>',
                    props:['ss'],
                    computed: {
                        fixWidth: function () {
                           return {
                               width: this.ss + 'px'
                           }
                        }
                    }
                }
</script>
```
### 8.5 数据验证
` props `接受的数组形式，可以接收多个数据：
```javascript
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```
但是，通常你希望每个 prop 都有指定的值类型。这时，你可以以对象形式列出 prop，这些属性的名称和值分别是 prop 各自的名称和类型：
```javascript
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object
}
```
### 8.6 子组件给父组件传递数据
JavaScript中的设计模式--观察者模式，dispatchEvent和addEventListener这两个方法。Vue组件也有与之类似的一套模式，子组件使用` $emit `来触发事件，父组件使用` $on `来监听子组件的事件。

子传父时，先要自定义一个事件。比如` changetotal `，（**注意:**自定义事件只能使用全部小写或者中横线命名，不要使用驼峰），子组件自己触发这个事件，并传入值` this.$emit("changetotal",argument) `。在父组件中监听这个自定义事件` this.$on("changetotal",value) `。
```html
<div id="app" v-cloak>
    <!-- 需求：通过+ 和- 来给父组件传递数据 -->
    银行卡余额：{{total}}
    <my-component @changetotal="handleTotal"></my-component>
</div>
<script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js"></script>
<script>
var app = new Vue({
    el: '#app',
    data: {
        total: 1000
    },
    methods: {
        handleTotal(value) {
            this.total = value;
        }
    },
    components: {
        'my-component': {
            template: '<div><button @click="handleIncrease">+1000</button><button @click="handleReduce">-1000</button>{{count}}</div>',
            data() {
                return {
                    count: 1000
                }
            },
            methods:{
                handleIncrease() {
                    this.count += 1000;
                    this.$emit('changetotal',this.count);
                },
                handleReduce() {
                    this.count -= 1000;
                    this.$emit('changetotal',this.count);   
                }
            }
        },
    }
});
</script>
```
### 8.7 非父子组件间的通信
首先，在父组件中定义一个bus：
```JavaScript
var app = new Vue({
    el: '#app',
    data: {
        bus: new Vue(),
    }
})
```
假设a组件传递数据给b组件，a组件点击按钮触发传递数据，b组件中要在` created `实例创建时监听对应的事件。
```javascript
'a-component': {
    template: '<div id="a"><button @click="handle">传给b</button></div>',

    data() {
        return {
            aaa: '我是a的内容'
        }
    },
    methods: {
        handle() {
            this.$root.bus.$emit('lala',this.aaa)
        }
    },

}
'b-component': {
    template: '<div id="b">{{bbb}}</div>',
    data() {
        return {
            bbb: '我是b中的内容'
        }
    },
    created() {
        //在b组件创建实例时就监听事件---lala事件。
        this.$root.bus.$on("lala",(value) => {
            this.bbb = value;
        })
    }
}
```
完整实例：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>非父子组件间的通信</title>
    <style>
        [v-cloak] {
            display: none;
        }
        #a {
            background: pink;
        }
        #b {
            background: #bfa;
        }
    </style>
</head>
<body>
<div id="app" v-cloak>
    <a-component></a-component>
    <b-component></b-component>
</div>
<script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js"></script>
<script>
var app = new Vue({
    el: '#app',
    data: {
        bus: new Vue(),//bus中介
    },
    methods: {
        handleTotal(value) {
            this.total = value;
        }
    },
    components: {
        'a-component': {
            template: '<div id="a"><button @click="handle">传给b</button></div>',

            data() {
                return {
                    aaa: '我是a的内容'
                }
            },
            methods: {
                handle() {
                    this.$root.bus.$emit('lala',this.aaa)
                }
            },

        },
        'b-component': {
            template: '<div id="b">{{bbb}}</div>',
            data() {
                return {
                    bbb: '我是b中的内容'
                }
            },
            created() {
                //在b组件创建实例时就监听事件---lala事件。
                this.$root.bus.$on("lala",(value) => {
                    this.bbb = value;
                })
            }
        },
    },
});
</script>
</body>
</html>
```
### 8.8 通过插槽分发内容
为了组件可以组合，我们需要一种方法来混合父组件的内容与子组件自己的模板。这个过程被称为内容分发。插槽就是为了弥补组件的不足。Vue.js实现了一个内容分发api，使用特殊的` slot `元素作为原始内容的插槽。
#### 8.8.1 插槽的用法
在父组件的作用域内直接写入子组件的标签体中，在子组件模板中写入slot。单个插槽的用法。
```html
<my-component>
    <p>{{msg}}</p>
</my-component>
    
<script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js"></script>
<script>
var app = new Vue({
    el: '#app',
    data: {
        msg: '我是插入子组件中的内容'
    },
    methods: {
    },
    components: {
        'my-component' : {
            template:  '<div>子组件\
                            <slot>如果父组件中没有插入内容，我就作为默认出现</slot>\
                        </div>'
        }
    },
    created() {

    }
});
</script>
```
#### 8.8.2 具名插槽
给slot命名，这样我们在父组件中指定slot，就能在指定slot渲染出内容。
```html
<div id="app" v-cloak>
    <name-component>
        <h3 slot="header">我是标题</h3>
        <p slot="container">我是正文内容</p>
        <p slot="footer">底部信息</p>
    </name-component>
</div>
<script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js"></script>
<script>
var app = new Vue({
    el: '#app',
    data: {
        msg: '我是插入子组件中的内容'
    },
    methods: {
    },
    components: {
        'name-component' : {
            template:  
        '<div>子组件\
                <slot name="header"></slot>\
                <slot name="container"></slot>\
                <slot name="footer"></slot>\
        </div>'
        }
    },
});
</script>
```
#### 8.8.3 访问` slot `
通过` this.$slots.slog-name `访问对应的slot。


#### 8.8.4 动态组件
Vue.js给我们提供了一个元素叫` component `,用来动态挂载不同的组件。
实现：使用is特性来实现。
```html
<component :is="thisView"></component>
```
## 9 自定义指令
```javascript
var app = new Vue({
    el: '#app',
    directives: {
        'focus': {
            inserted: function(el) {
                el.focus();
            }
        }
    }
})
```
