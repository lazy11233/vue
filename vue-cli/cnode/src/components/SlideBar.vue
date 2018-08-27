<template>
    <div class="authorinfo">
        <div class="authorsummay">
            <div>作者</div>
            <router-link :to="{
                name:'user_info',
                params:{
                    name:userinfo.loginname
                    //TODO
                }}"><img :src="userinfo.avatar_url" alt=""></router-link>
        </div>
        <div class="recent_topics"></div>
            <div>作者最近主题</div>
            <ul>
                <li v-for="(list,index) in topiclimitby5" :key="index">
                    <router-link :to="{
                        name: 'post_content',
                        params: {
                            id:list.id,
                            name:list.author.loginname
                        }
                    }">
                        {{list.title}}
                    </router-link>
                </li>
            </ul>
        <div class="recent_replies">
            <div>作者最近回复</div>
            <ul>
                <li v-for="(list,index) in replylimitby5" :key="index">
                    <router-link :to="{
                        name: 'post_content',
                        params: {
                            id:list.id,
                            name:list.author.loginname
                        }
                    }">
                        {{list.title}}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>    
</template>
<script>
    export default {
        name: 'SlideBar',
        data() {
            return {
                userinfo: {}
            }
        },
        methods: {
            getUserInfo() {
                this.$http.get(`http://cnodejs.org/api/v1/user/${this.$route.params.name}`).then(res => {
                    this.userinfo = res.data.data;
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        created() {
            this.getUserInfo();
        },
        computed: {
            topiclimitby5() {
                if(this.userinfo.recent_topics) {
                    return this.userinfo.recent_topics.slice(0,5);
                }
            },
            replylimitby5() {
                if(this.userinfo.recent_replies) {
                    return this.userinfo.recent_replies.slice(0,5);
                }
            }
        },
        //检测路由变化
        watch: {
        }
    }
</script>
<style scoped>

</style>

