<template>
    <div>
        <div class="loading" v-if="isLoading">
            <!-- 没有加载或者加载中的动图 -->
            <img src="../assets/loading.svg" alt="">
        </div>
        <!-- 帖子列表 -->
        <div id="post_box">
            <ul>
                <li class="toolbar">
                    <span class="topic_tab">全部</span>
                    <span class="topic_tab">精华</span>
                    <span class="topic_tab">分享</span>
                    <span class="topic_tab">问答</span>
                    <span class="topic_tab">招聘</span>
                </li>
                <li v-for="(post,index) in posts" :key="index" class="cell">
                    <!-- 头像 -->
                    <a href="#" class="user_avatar">
                        <img :src="post.author.avatar_url" alt="">
                    </a>
                    <!-- 回复/浏览 -->
                    <span class="reply_count">
                        <span class="count_of_replies">{{post.reply_count}}</span><span class="count_seperator">/</span><span class="count_of_visits">{{post.visit_count}}</span>
                    </span>
                    <!-- 帖子的分类 -->
                    <span :class="[{post_good:(post.good === true),post_top:(post.top === true),topiclist_tab:(post.good != true && post.top != true)}]">{{post | tabFormatter}}</span>
                    <!-- 标题 -->
                    <span class="post_title">
                        <a href="#">{{post.title}}</a>
                    </span>
                    <!-- 最终回复时间 -->
                    <span class="last_time">{{post.last_reply_at | formatDate}}</span>
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

.cell {
    padding: 10px;
    font-size: 14px;
}

.cell:hover {
    background-color: #f6f6f6;
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

.user_avatar {
    display: inline-block;
}

.user_avatar img{
    width: 30px;
    height: 30px;
    border-radius: 4px;
}

.count_of_replies {
    color: #9e78c0;
}

.reply_count {
    width: 70px;
    display: inline-block;
    text-align: center;
}
.count_of_visits {
    font-size: 14px;
    color: #aaa;
}
.post_title {
    font-size: 16px;
}

.last_time {
    float: right;
}
.post_top,.post_good {
    background-color: #80bd01;
    font-size: 14px;
    color : #fff;
    padding: 2px 4px;
    border-radius: 3px;
}
.topiclist_tab {
    background-color: #e5e5e5;
    font-size: 14px;
    color : #999;
    padding: 2px 4px;
    border-radius: 3px;
}
.toolbar {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
    font-size: 16px;
}
.topic_tab {
    margin: 0 10px;
    color: #80bd01;
}
</style>

