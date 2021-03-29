import Vue from 'vue'
/* 默认等分10份, 其他等分份数需要点进去去设置 */
import 'lib-flexible/flexible'    // 淘宝适配, postcss-px2rem  lib-flexible 都要下载配合使用

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')





