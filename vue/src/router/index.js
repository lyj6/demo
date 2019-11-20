import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/Login.vue'),
    meta: {
      title: '登录',
      type: ''
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
      type: 'login'
    },
    children: [
      {
        path: 'sysParameter',
        name: '系统参数 dict',
        meta: {
          title: '系统参数',
          type: 'login'
        },
        component: () => import('../views/sysParameter/sysParameter')
      },
      {
        path: 'cate',
        name: '产品分类',
        meta: {
          title: '产品分类',
          type: 'login'
        },
        component: () => import('../views/cate/cate')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
