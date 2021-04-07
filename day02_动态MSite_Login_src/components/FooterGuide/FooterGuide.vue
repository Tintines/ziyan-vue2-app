<template>
    <div class="footer-guide border-1px">
        <div class="guide-item" :class="{on: $route.path==='/msite'}" @click="goto('/msite')">
            <span><i class="iconfont icon-waimai"></i></span>
            <span>首页</span>
        </div>
        <div class="guide-item" :class="{on: $route.path==='/search'}" @click="goto('/search')">
            <span><i class="iconfont icon-search2"></i></span>
            <span>搜索</span>
        </div>
        <div class="guide-item" :class="{on: $route.path==='/order'}" @click="goto('/order')">
            <span><i class="iconfont icon-dingdan"></i></span>
            <span>订单</span>
        </div>
        <div class="guide-item" :class="{on: $route.path==='/profile'}" @click="goto('/profile')">
            <span><i class="iconfont icon-geren"></i></span>
            <span>个人</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'FooterGuide',

        methods: {
            /* 编程式路由跳转:定义函数进行路由跳转,参数为对应跳转路由 */
            /* 方案一: 如果多次点击当前页, 刷新界面 */
            goto(path) {
                if(path!==this.$route.path){
                    this.$router.replace(path);
                } else {
                    /* 发送一般的http请求 ==> 整个界面会刷新显示(ajax页面无刷新更新数据) */
                    window.location = path;
                }

                /* 方法二: 重复点击,不作处理 */
                /* if (path!==this.$route.path) {
                    // 编程式路由跳转
                    this.$router.replace(path)
                } */
            }

            
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixins.styl'

    .footer-guide
        top-border-1px(#ccc)
        position fixed 
        left 0
        bottom 0
        width 100%
        height 50px
        display flex 
        background #fff
        clearFix()
        .guide-item
            width 25%
            display flex 
            flex-direction column
            text-align center
            &.on 
                color $green
            span 
                margin-top 3px
                font-size 12px
                i 
                    font-size 22px

</style>
