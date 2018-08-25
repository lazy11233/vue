<template>
    <div class="article">
        <!-- 如果正在加载显示loading -->
        <div class="loading" v-if="isLoading">
            <!-- 没有加载或者加载中的动图 -->
            <img src="../assets/loading.svg" alt="">
        </div>
        <div v-else>
            <div class="topic_header">
                <div class="topic_title">{{post.title}}</div>
                <div class="changes">
                    <span>发布于{{post.create_at | formatDate}}</span>
                    <span>作者 {{post.author.loginname}}</span>
                    <span>{{post.visit_count}} 次浏览</span>
                    <span>来自 {{post | tabFormatter}}</span>
                </div>
            </div>
            <div v-html="post.content" class="topic_content"></div>
            <div>
                <div class="topbar">回复</div>
                <div v-for="(reply,index) in post.replies" :key="index">
                    <router-link :to="{name:'user_info',params:{name: reply.author.loginname}}">
                        <img :src="reply.author.avatar_url" alt="头像">
                    </router-link>
                    <span>{{reply.author.loginname}}</span>
                    <span>{{index + 1}} 楼</span>
                    <span v-if="reply.ups.length>0">{{reply.ups.length}}</span>
                    <p v-html="reply.content"></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Article',
        data() {
            return {
                isLoading: false,
                post: {},//当前文章的所有内容和属性
            }
        },
        methods: {
            getArticleData() {
                this.$http.get('https://cnodejs.org/api/v1/topic/' + this.$route.params.id).then(res => {
                    if(res.data.success === true) {
                        this.post = res.data.data;
                    }
                    this.isLoading = false;
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        created() {
            this.isLoading = true;
            this.getArticleData();
        }
    }
</script>
<style>
@import url('../assets/markdown-github.css');

.article .loading {
  text-align: center;
  margin: 10px;
}

.article .loading > img {
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
.article .changes>span::before {
    content: "•";
    
}
</style>
