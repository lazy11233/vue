<template>
  <div id="app">
    <Header/>
    <PostList/>
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

<style scoped>

</style>
