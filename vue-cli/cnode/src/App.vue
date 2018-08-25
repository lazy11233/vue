<template>
  <div id="app">
    <Header/>
    <div class="main">
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import PostList from './components/PostList.vue';

export default {
  name: 'App',
  components: {
    Header,
    PostList
  },
  data: function() {
    return {

    }
  },
  methosds: {

  }
}
</script>

<style>
@import url('./assets/common.css');
.main {
  width: 80%;
  margin: 0 auto;
}
</style>
