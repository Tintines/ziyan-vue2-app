/* vuex最核心的管理对象store */
import Vue from 'vue'
import Vuex from 'vuex'

/* 根mutations actions getters */
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
/* 模块话 */
import msite from './modules/msite'
import shop from './modules/shop'
import user from './modules/user'

/* 使用Vuex插件 */
Vue.use(Vuex)

export default new Vuex.Store({
    mutations,
    actions,
    getters,
    modules: {
        msite,
        user,
        shop
    }
})

/* 
模块化后总的state的结构形式:
{
  msite: {},
  user: {},
  shop: {}
}
*/