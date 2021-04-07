<template>
    <section class="food">
        <div class="food-content">
            <div class="image-header">
                <img src="http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750">
                <span class="foodpanel-desc">主、辅料:水、大米、南瓜、冰糖等</span>
                <div class="back">
                    <i class="iconfont icon-arrow_left"></i>
                </div>
            </div>
            <div class="content">
                <h2 class="title">南瓜粥</h2>
                <div class="detail">
                    <span class="sell-count">月售91份</span>
                    <span class="rating">好评率100%</span>
                </div>
                <div class="price">
                    <span class="now">￥9</span>
                    <span class="old">￥</span>
                </div>
                <div class="cartcontrol-wrapper">
                    cartcontrol组件
                </div>
            </div>
        </div>
        <!-- 遮罩层 -->
        <div class="food-cover"></div>
    </section>
</template>

<script type="text/ecmascript-6">
    export default {

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .food
        position absolute 
        left 0
        right 0
        top 0
        bottom 0
        z-index 1000
        .food-content 
            width 80%
            height 50%
            position absolute 
            z-index 200
            left 50%
            top 50%
            transform translate(-50%, -50%)
            background #fff
            border-radius 4px
            overflow hidden    // 截掉溢出的图片圆角
            .image-header 
                width 100%
                height 225px
                position relative
                &::before 
                    content ''
                    width 100%
                    height 100%
                    position absolute
                    z-index 20
                    background-image linear-gradient(to top, rgba(0,0,0,.5), transparent 80px)
                img 
                    width 100%
                    height 100%
                    position relative
                .foodpanel-desc 
                    font-size 12px
                    color #ddd
                    position absolute
                    z-index 30 
                    left 0
                    bottom 0
                    padding 0 0 6px 6px
                .back 
                    position absolute 
                    top 10px
                    left 10px
                    .icon-arrow_left
                        display inline-block
                        font-size 20px
                        color #fff
            .content 
                padding 18px
                .title
                    font-size 14px
                    font-weight 700
                    color rgb(7, 17, 27)
                    margin-bottom 8px
                .detail
                    margin-bottom 18px
                    .sell-count, .rating
                        font-size 12px
                        color: rgb(147, 153, 159)
                    .sell-count 
                        margin-right 12px
                .price
                    .now 
                        font-size 14px
                        margin-right 8px
                        color: rgb(240, 20, 20)
                    .old
                        font-size: 12px
                        color: rgb(147, 153, 159)
                        text-decoration: line-through
                .cartcontrol-wrapper 
                    position absolute 
                    right 16px
                    bottom 16px
                
        /* 遮罩层 */
        .food-cover
            position absolute 
            top 0
            bottom 0
            left 0
            right 0
            background-color rgba(0,0,0,.5)
</style>
