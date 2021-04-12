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

/* 导航守卫测试 */
import A from '@/pages/Test/A.vue'
import B from '@/pages/Test/B.vue'
import B1 from '@/pages/Test/B1.vue'
import B2 from '@/pages/Test/B2.vue'

/* Vue面试拓展 */
import Review from '@/pages/Review/Review.vue'
import SlotTest from '@/pages/Review/SlotTest/SlotTest.vue'
import MixinTest from '@/pages/Review/MixinTest/MixinTest.vue'
import ComponentTest from '@/pages/Review/ComponentTest/ComponentTest.vue'
import EventTest from '@/pages/Review/EventTest/EventTest.vue'
import ModelTest from '@/pages/Review/ModelTest/ModelTest.vue'
import ReactiveTest from '@/pages/Review/ReactiveTest/ReactiveTest.vue'
import LifeTest from '@/pages/Review/LifeTest/LifeTest.vue'


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
        // name: 'shop',
        /* 将路径中的params参数转换成标签属性传递给子路由组件 */
        path: '/shop/:id',   // 需要进行params传参占位符, 通常子路由使用 this.$route.params.id 获取值
        /* 通过 props 解耦 */
        /* 布尔模式 */
        props: true,  // 此时可通过子路由声明 props: ['id'] 直接读取,子路由直接 {{id}} 取值
        /* 函数模式 */
        // props: toRoute => ({id: toRoute.params.id})
        component: Shop,
        children:[
            {
                // path: '/shop/goods',    // 未使用params传参时写法
                path: 'goods',             // 路径中有params参数时写法
                component: Goods
            },
            {
                path: 'ratings',
                component: Ratings
            },
            {
                path: 'info',
                component: Info
            },
            {
                path: '',
                redirect: 'goods'
            }
        ]
    },


    /* 路由导航测试 */
    {
        path: '/a',
        component: A
    },
    {
        path: '/b',
        component: B,
        children: [
            {
                path: '/b/b1',
                component: B1 
            },
            {
                path: '/b/b1',
                component: B2 
            },
        ] 
    },

    /* Vue面试拓展 */
    {
        path: '/review',
        component: Review,
        children: [
            {
                path: '/review/slot',
                component: SlotTest 
            },
            {
                path: '/review/mixin',
                component: MixinTest 
            },
            {
                path: '/review/component',
                component: ComponentTest
            },
            {
                path: '/review/event',
                component: EventTest
            },
            {
                path: '/review/model',
                component: ModelTest
            },
            {
                path: '/review/reactive',
                component: ReactiveTest
            },
            {
                path: '/review/life',
                component: LifeTest
            }
        ] 
    },


    /* 配置路由重定向 */
    {
        path: '/',
        redirect: '/msite'      // 配置路由重定向
    }
]
