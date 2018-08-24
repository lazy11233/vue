import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloEarth from '@/components/HelloEarth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloworld/:worldmsg',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/helloearth/:earthmsg',
      name: 'HelloEarth',
      component: HelloEarth
    }
  ]
})
