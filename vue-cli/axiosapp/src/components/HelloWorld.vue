<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="getData">发送请求</button>
    <ul>
      <li v-for="(item,index) in items" :key="index">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

//将axios全局挂载到Vue上。
Vue.prototype.$http = axios;

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '我是axios',
      items: []
    }
  },
  methods: {
    getData() {
      this.$http.get('http://cnodejs.org/api/v1/topics',{
        params: {
          page: 1,
          limit: 10
        }
      }).then((res) => {
        this.items = res.data.data;
      }).catch((err) => {
        console.log(err);
      })
      // this.$http.get('http://cnodejs.org/api/v1/topics').then( (res) => {
      //   this.itmes = res.data.data;
      // }).catch((err) => {
      //   console.log(err);
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
