import Vue from 'vue'
/* 默认等分10份, 其他等分份数需要点进去去设置;
淘宝适配, postcss-px2rem  lib-flexible 都要下载配合使用 */
import 'lib-flexible/flexible'    

import App from './App.vue'
import router from './router'
import store from './vuex/store'
import Header from './components/Header/Header.vue'

Vue.config.productionTip = false
/* 注册全局组件 */
Vue.component('Header', Header)

new Vue({
  render: h => h(App),
  /* 注册路由, 
  组件都能使用 $router和 $route  <router-link> 和 <router-view/> */
  router,  

  /* 注册store
  所有组件都能看到: $store */
  store
}).$mount('#app')





