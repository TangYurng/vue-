import Vue from 'vue'
import Router from 'vue-router'
import Home from '../home/index'
import One from '../tables/One'
import Two from '../tables/Two'
import Three from '../tables/Three'
import Four from '../tables/Four'
import Five from '../tables/Five'

Vue.use(Router)

// 当后退时，滚动条在顶部，不在原来的位置上
let router = new Router({
//路由
  routes: [
    {
        path: '/',
        redirect: '/home'
    },
    {
      path: '/home',
      name:'Home',
      component: Home,
    },
    {
      path: '/1',
      name: 'one',
      component: One
    },
    {
      path: '/2',
      name: 'two',
      component: Two
    },
    {
      path: '/3',
      name: 'three',
      component: Three
    },
    {
      path: '/4',
      name: 'four',
      component: Four
    },
    {
      path: '/5',
      name: 'five',
      component: Five
    },
  ]
})


export default router