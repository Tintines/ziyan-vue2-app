<template>
    <header class="header">
        <slot name="left"></slot>
        <div class="header_title ellipsis">
            <span class="title_text">{{title}}</span>
        </div>
        <slot name="right"></slot>
    </header>
</template>

<script type="text/ecmascript-6">
export default {
    /* 响应式数据三大来源 props data computed */
    props: {
        title: String
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixins.styl'
    .header
        positon fixed 
        left 0
        right 0
        top 0
        width 100%
        height 45px
        /* 我想通过父元素来设置左右padding来将元素向内挤到正确位置,就必须先设置box-sizing盒模型 */
        box-sizing border-box
        padding 0 15px 0 15px
        z-index 100
        color #fff
        background-color $green
        display flex
        justify-content space-between
        align-items center
        .header_title 
            width 30%
            /* 当不传入左右插槽时,该元素不单独设置居中样式时,居中样式失效
            此时需要将排除flex对其位置影响的的元素设置为绝对定位,使其脱离文档流后再进行定位处理 */
            position absolute
            left 50%
            transform translateX(-50%)
            text-align center
            &.ellipsis
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
            .title_text
                font-size 20px
                

</style>
