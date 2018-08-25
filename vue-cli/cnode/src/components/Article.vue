<template>
    <div class="article">
        <!-- 如果正在加载显示loading -->
        <div class="loading" v-if="isLoading">
            <!-- 没有加载或者加载中的动图 -->
            <img src="../assets/loading.svg" alt="">
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Article',
        data() {
            return {
                isLoading: false
            }
        }
    }    
</script>
<style scoped>

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
