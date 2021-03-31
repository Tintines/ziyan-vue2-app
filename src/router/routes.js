/* 配置所有路由的数组 */
import MSite from '@/pages/MSite/MSite.vue'
import Search from '@/pages/Search/Search.vue'
import Order from '@/pages/Order/Order.vue'
import Profile from '@/pages/Profile/Profile.vue'
import Login from '@/pages/Login/Login.vue'

/* 将路由数组暴露出去 */
export default [
    {
        path: '/msite',
        component: MSite,
        meta: {                  // 配置路由源信息, 对象内属性随意添加
            isShowFooter: true
        }
    },
    {
        path: '/search',
        component: Search,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/order',
        component: Order,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/',
        redirect: '/msite'      // 配置路由重定向
    }
]
