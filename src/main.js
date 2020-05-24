// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import i18n from '././lang/lang'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueRouter from 'vue-router'
import routes from './router'
import store from './vuex/store'
import Vuex from 'vuex'
//require('../node_modules/bootstrap/dist/css/bootstrap.css')
import jwtDecode from 'jwt-decode'
import { decode } from 'jsonwebtoken'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)


Vue.config.productionTip = false

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path === '/login') {
    localStorage.removeItem('usertoken')
  }

  if (!localStorage.usertoken && to.path !== '/login') {
    next({ path: 'login'})
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  //el: '#app',
  //template: '<App/>',
  i18n,
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

