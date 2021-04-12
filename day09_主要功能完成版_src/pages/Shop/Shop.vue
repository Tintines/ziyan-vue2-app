<template>
    <section>
        <!-- 纯展示用 普通组件即可 -->
        <ShopHeader/>
        <div class="tab">
            <!-- 路由链接 -->
            <!-- 路由标签解析之后在页面显示的为a标签 -->
            <!-- 死静态商家数据 -->
            <!-- <router-link class="tab-item" to="/shop/goods" replace>点餐</router-link>
            <router-link class="tab-item" to="/shop/ratings" replace>评价</router-link>
            <router-link class="tab-item" to="/shop/info">商家</router-link> -->
            <!-- 动态商家数据, 需要加 冒号: 和 携带params 参数 -->
            <router-link class="tab-item" :to="`/shop/${id}/goods`" replace>点餐</router-link>
            <router-link class="tab-item" :to="`/shop/${id}/ratings`" replace>评价</router-link>
            <router-link class="tab-item" :to="`/shop/${id}/info`" replace>商家</router-link>
        </div>
        <!-- 路由显示区域 -->
        <router-view></router-view>
    </section>
</template>

<script type="text/ecmascript-6">
    import {mapState} from 'vuex'
    import ShopHeader from '@/components/ShopHeader/ShopHeader'
    import {saveCartFoods} from '@/utils'
    export default {
        name: 'Shop',
        props: ['id'],         // 声明接收通过地址栏路径传递过来的params参数,是个数组格式
        components: {
            ShopHeader
        },

        mounted() {             // mounted 为函数形式
            /* 路由挂载请求对应接口数据, 排在前面的分发请求不要写 await, 
            否则他需要等它数据完全回来页面加载后, 才轮到下面的去分发请求 */
            // 死固定商家数据
            // this.$store.dispatch('getShopInfo')
            // this.$store.dispatch('getShopGoods')
            // this.$store.dispatch('getShopRatings')

            /* 根据请求路径params参数,动态请求对应商家数据 */
            // const id = this.$route.params.id         // 常规写法
            const id = this.id;                         // 通过声明props参数后的写法
            this.$store.dispatch('getShop', id);        // 分发action 请求对应ID的商家数据

            /* 页面刷新,组件卸载时,需要将最新的cartFoods存储起来;
            通过给窗口绑定一个卸载(刷新)监听;刷新时调用, window.onunload = ()=>{} */
            window.addEventListener('unload', () => {
                const {shop: {id}, cartFoods} = this.shop;  // 对模块数据shop的多层解构赋值
                saveCartFoods(id, cartFoods);   // 调用该工具函数保存当前商家的购物车数据
            })
        },

        computed: {
            ...mapState({
                /* 少写一层,相当于此时shop结构为 {shop: {}, cartFoods: []}, 需要啥再从shop身上进行读取 */
                shop: state => state.shop
            }),
        },

        /* 
            若该路由被keep-alive; 则该回调函数不会被调用!!!
            处理办法: 
                1. 不让该组件keep-alive
                2. 使用组件导航守卫 beforeRouteLeave()
        */
        /* Vue组建的生命周期钩子在页面刷新导致组件卸载时,不会触发;
        beforeDestroy, 在页面刷新时,不会执行,所以当你更改数据后再刷新页面时,
        需要靠其他原生window监听事件,来重新保存最新的数据 */
        /* 在手动退出商家界面导致卸载组件时进行调用 */
        beforeDestroy() {
            const {shop: {id}, cartFoods} = this.shop;      // 多层结构赋值
            saveCartFoods(id, cartFoods);       // 调用该工具函数保存当前商家的购物车数据
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .tab
        height 40px
        width 100%
        background #fff
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        display flex 
        justify-content space-around
        align-items center
        text-align center 
        .tab-item
            display inline-block    
            width 100%
            line-height 40px
            position relative
            font-size 14px
            &.router-link-active            // 路由链接激活时自带class名称
                color $green
                font-weight bold
                font-size 16px
                &::after 
                    content ''
                    position absolute 
                    width 34px
                    height 2px
                    background-color $green
                    left 50%
                    margin-left -17px
                    bottom 0
</style>
