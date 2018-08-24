<template>
    <div>
        <ul>
            <li>
                <router-link :to="{name:'HelloWorld',params:{worldmsg:'你好world'}}">Hello World</router-link>
            </li>
            <li>
                <router-link :to="{name:'HelloEarth',params:{earthmsg:'你好earth'}}">Hello Earth</router-link>
            </li>
        </ul>
    </div>    
</template>
<script>
export default {
  name: "list"
};
</script>
<style scoped>
li {
  padding: 3px;
  list-style: none;
  font-size: 30px;
}
</style>

