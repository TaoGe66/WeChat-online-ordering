import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'index',
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      component: resolve => require(['@/pages/login.vue'], resolve)
    },
    {
      path: '/order',
      component: resolve => require(['@/pages/order.vue'], resolve)
    },
    {
      path: '/success',
      component: resolve => require(['@/pages/success.vue'], resolve)
    },
  ]
})
