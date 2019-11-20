import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui'
import moment from 'moment'
import 'normalize.css'
import VueElementExtends from 'vue-element-extends'
import 'vue-element-extends/lib/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import api from './api/api'
import './assets/icon/iconfont.css'
import './assets/icon/iconfont.js'
import VueRouter from 'vue-router';
// //定义全局变量
// Vue.prototype.$post = post;
// Vue.prototype.$get = get;
Vue.use(api)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueElementExtends)
Vue.use(moment);
Vue.prototype.$http = axios
axios.defaults.baseURL = '/api'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  const type = to.meta.type

  // 判断该路由是否需要登录权限
  if (type === 'login') {
    if (window.localStorage.getItem('userInfo')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()  // 确保一定要有next()被调用
  }
})


new Vue({
  router,
  store,
  render: h => h(App),
  components: { App },
}).$mount('#app')


