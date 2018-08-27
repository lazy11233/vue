<template>
    <div class="pagination">
        <button @click="changeBtn">首页</button>
        <button @click="changeBtn">上一页</button>
        <button v-if="jduge">...</button>
        <button v-for="(btn,index) in pagebtns" :key="index" 
        :class="[{currentPage:btn===currentPage},'pagebtn']"
        @click="changeBtn(btn)"
        >
            {{btn}}
        </button>
        <button @click="changeBtn">下一页</button>
    </div>    
</template>
<script>
import $ from 'jquery'
    export default {
        name: 'Pagination',
        data() {
            return {
                pagebtns: [1,2,3,4,5,'...'],
                currentPage: 1,
                jduge:false,
            }
        },
        methods: {
            changeBtn(page) {
                //点击上一页，下一页，首页
                console.log(page);
                if(typeof page != 'number') {
                    switch(page.target.innerText) {
                        case '上一页':
                            $('button.currentPage').prev().click();
                            break;
                        case '下一页':
                            $('button.currentPage').next().click();
                            break;
                        case '首页':
                            this.pagebtns = [1,2,3,4,5,'...'];
                            this.changeBtn(1);
                            break;
                        default:
                            break;
                    }
                    return;
                }
                this.currentPage = page;
                if(page > 4) {
                    this.jduge = true;
                }else {
                    this.jduge = false;
                }
                this.currentPage = page;
                if(page === this.pagebtns[4]) {
                    this.pagebtns.shift();//移除第一个元素
                    this.pagebtns.splice(4,0,this.pagebtns[3]+1);//添加最后一个
                }else if(page === this.pagebtns[0] && page != 1){
                    this.pagebtns.unshift(this.pagebtns[0] - 1);
                    this.pagebtns.splice(5,1);
                }
                this.$emit('handleList',this.currentPage);
            }
        }
    }
</script>
<style scoped>

</style>

