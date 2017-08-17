import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import index from '@/components/index'
import cube from '@/components/cube'
import column from '@/components/column'
import page from '@/components/page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/cube',
      name: 'cube',
      component: cube
    },
    {
      path: '/column',
      name: 'column',
      component: column
    },
    {
      path: '/page',
      name: 'page',
      component: page
    }
  ]
})
