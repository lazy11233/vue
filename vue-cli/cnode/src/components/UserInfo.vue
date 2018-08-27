<template>
    <div class="user_info">
        <div class="loading" v-if="isLoading">
            <!-- 没有加载或者加载中的动图 -->
            <img src="../assets/loading.svg" alt="">
        </div>
        <div class="information">
            <section>
                <img :src="userinfo.avatar_url" alt="头像">
                <span>{{userinfo.loginname}}</span>
                <span>{{userinfo.score}}积分</span>
                <a :href="githome" target="_blank">{{githome}}</a>
                <span>注册时间 {{userinfo.create_at | formatDate}} </span>
            </section>
            <section class="replies">
                <p>回复的主题</p>
                <ul>
                    <li v-for="(reply,index) in userinfo.recent_replies" :key="index">
                        <router-link :to="{
                            name: 'post_content',
                            params: {id: reply.id}}">{{reply.title}}</router-link>
                    </li>
                </ul>
            </section>
            <section class="topics">
                <p>创建的主题</p>
                <ul>
                    <li v-for="(item,index) in userinfo.recent_topics" :key="index">
                        <router-link :to="{
                            name: 'post_content',
                            params: {
                                id: item.id
                            }
                        }">
                            {{item.title}}
                        </router-link>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'UserInfo',
        data() {
            return {
                isLoading: false,
                userinfo: {},
                githome: ''
            }
        },
        methods: {
            getUserInfo() {
                this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`).then(res => {
                    this.userinfo = res.data.data;
                    this.githome = `https://github.com/${this.userinfo.githubUsername}`
                    this.isLOading = false;
                }).catch( err =>{
                    console.log(err);
                })
            }
        },
        created() {
            this.isLOading = true;
            this.getUserInfo();
        }
    }
</script>
<style scoped>
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
</style>

