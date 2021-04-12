/* 向外暴露路由器对象模块 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

/* 检查用户是否登录时需要查看store中是否有token,
直接通过引入store进行访问, 这是最常规的使用store的方式 */
import store from '@/vuex/store'

/* 声明使用Vue插件 */
Vue.use(VueRouter);

/* 使用全局路由导航守卫时,不能使用直接暴露的方式 */
/* export default new VueRouter({
    mode: 'history',    // 路由没有#
    routes              // 项目中所有路由组成的数组
}) */

/* 实例化 */
const router = new VueRouter({
    mode: 'history',    // 路由路径没有#
    routes              // 项目中所有路由组成的数组
})

/* 
功能: 
    点击进入a/b路由时,必须登陆, 如果没有登陆自动跳转到登陆 
*/

/* 定义全局前置路由 */
const paths = ['/a', '/b']      // 所有需要进行登录检查的路由路径数组
router.beforeEach((to, from, next) => {
    console.log('global beforeEach()调用啦');
    const path = to.path;       // 获取将要访问跳转的路径
    /* 对将要访问的路径是否在需要检查的数组中进行判断 */
    if (paths.indexOf(path) !== -1) {   // 在路径数组中,此时需要检查是否登录
        if (!store.state.user.token) {
            return next('/login');      // 没有登录时,通过next传参方法跳转到登录界面
        }
    }
    /* 其他情况(1.不再路径中;2.在路径中但已登录) ,通过next()不传参数的形式,直接放行*/
    next();
})


export default router;