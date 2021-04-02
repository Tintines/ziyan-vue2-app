import Vue from 'vue'
/* 默认等分10份, 其他等分份数需要点进去去设置;
淘宝适配, postcss-px2rem  lib-flexible 都要下载配合使用 */
import 'lib-flexible/flexible'    
import {Button} from 'mint-ui'

import App from './App.vue'
import router from './router'
import store from './vuex/store'
import Header from './components/Header/Header.vue'
import './validate/validate'        // 直接引入表单验证自定义文件
/* 有的请求方法不需要被vuex管理,则可以直接将全部方法暴露出去,并挂载到全局$API,并通过它进行调用 */
import * as API from '@/api'        // 将API对象挂载到Vue的原型对象上 步骤一
import Star from '@components/Star/Star'
import i18n from './language/i18n'           // 引入国际化组件 并全局注册

Vue.config.productionTip = false

Vue.prototype.$API = API            // 将API对象挂载到Vue的原型对象上 步骤二

/* 注册全局组件 */
Vue.component('Header', Header)     // Header
Vue.component('Star', Star)         // Star
Vue.component(Button.name, Button)  // mt-button
new Vue({
  render: h => h(App),
  /* 注册路由, 
  组件都能使用 $router和 $route  <router-link> 和 <router-view/> */
  router,  

  /* 注册store
  所有组件都能看到: $store */
  store,

  /* 注册i18n
  所有组件都能看到$t() */
  i18n
}).$mount('#app')





