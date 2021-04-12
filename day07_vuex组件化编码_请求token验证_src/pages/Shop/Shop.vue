<template>
    <section>
        <!-- 纯展示用 普通组件即可 -->
        <ShopHeader/>
        <div class="tab">
            <!-- 路由链接 -->
            <!-- 路由标签解析之后在页面显示的为a标签 -->
            <router-link class="tab-item" to="/shop/goods" replace>点餐</router-link>
            <router-link class="tab-item" to="/shop/ratings" replace>评价</router-link>
            <router-link class="tab-item" to="/shop/info">商家</router-link>
            <!-- <div class="tab-item">
                <router-link to="/shop/goods" replace>点餐</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/shop/ratings" replace>评价</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/shop/info">商家</router-link>
            </div> -->
        </div>
        <!-- 路游显示区域 -->
        <router-view></router-view>
    </section>
</template>

<script type="text/ecmascript-6">
    import ShopHeader from '@/components/ShopHeader/ShopHeader'
    export default {
        components: {
            ShopHeader
        },
        mounted() {             // mounted 为函数形式
            /* 路由挂载请求对应接口数据, 排在前面的分发请求不要写 await, 
            否则他需要等它数据完全回来页面加载后, 才轮到下面的去分发请求 */
            this.$store.dispatch('getShopInfo')
            this.$store.dispatch('getShopGoods')
            this.$store.dispatch('getShopRatings')
        }
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
