/* 配置所有路由的数组 */
import MSite from '@/pages/MSite/MSite.vue'
import Search from '@/pages/Search/Search.vue'
import Order from '@/pages/Order/Order.vue'
import Profile from '@/pages/Profile/Profile.vue'
import Login from '@/pages/Login/Login.vue'
import Shop from '@/pages/Shop/Shop.vue'
import Goods from '@/pages/Shop/Goods.vue'
import Ratings from '@/pages/Shop/Ratings.vue'
import Info from '@/pages/Shop/Info.vue'

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
    },
    {
        path: '/shop',
        component: Shop,
        children:[
            {
                path: '/shop/goods',
                component: Goods
            },
            {
                path: 'ratings',
                component: Ratings
            },
            {
                path: '/shop/info',
                component: Info
            }
        ]
    },
    {
        path: '/',
        redirect: '/msite'      // 配置路由重定向
    }
]
