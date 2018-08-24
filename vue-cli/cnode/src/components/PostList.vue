<template>
    <div>
        <div class="loading">
            <!-- 没有加载或者加载中的动图 -->
            <img src="../assets/loading.svg" alt="" v-if="isLoading">
        </div>
        <!-- 帖子列表 -->
        <div id="post_box">
            <ul>
                <li v-for="(post,index) in posts" :key="index">
                    <!-- 头像 -->
                    <a href="#">
                        <img :src="post.author.avatar_url" alt="">
                    </a>
                    <!-- 回复/浏览 -->
                    <span>
                        <span class="replay_count">{{post.reply_count}}</span>
                        <span class="count_seperator">/</span>
                        <span class="visit_count">{{post.visit_count}}</span>
                    </span>
                    <!-- 标题 -->
                    <span>{{post.title}}</span>
                    <!-- 最终回复时间 -->
                    <span>{{post.last_reply_at}}</span>
                </li>
            </ul>
        </div>

    </div>
</template>
<script>

export default {
  name: "PostList",
  data() {
    return {
      isLoading: false,
      currentIndex: 1,
      posts: []
    };
  },
  methods: {
      getData() {
          this.$http.get('https://cnodejs.org/api/v1/topics',{
              page: this.currentIndex,
              limit: 10
          }).then(res => {
              this.isLoading = false;
              this.posts = res.data.data;
              console.log(posts);
              this.currentIndex++;
          }).catch(err => {
              console.log(err);
          })

      }
  },
  created() {
      this.isLoading = true;
      this.getData();
  },
};
</script>
<style scoped>
a {
    text-decoration: none;
}
ul,li {
    list-style:none;
}
#post_box {
    width: 1000px;
    margin: 0 auto;
}

.loading {
  text-align: center;
  margin: 10px;
}
.loading > img {
  width: 30px;
  animation: loading 3s linear infinite;
}
@keyframes loading {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

