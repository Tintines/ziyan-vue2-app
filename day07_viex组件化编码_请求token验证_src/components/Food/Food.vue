<template>
    <!-- v-show显示隐藏,可缓存标签,除了v-if控制的标签 -->
    <section class="food" v-show="isShow">
        <div class="food-content">
            <div class="image-header">
                <!-- 图片懒加载,该库已被mint-ui包含,可不下载 -->
                <!-- 解决组件使用v-show隐藏标签,内部某些标签切换重新更新时残留之前的标签缓存所出现的bug问题 -->
                <!-- v-if="isShow",用于解决上面使用v-show="isShow"时,标签缓存导致loading加载完后
                先显示的还是之前的图片,然后才瞬间切换新的图片; 
                解决原理:对应出现bug的标签添加v-if="isShow" 隐藏时干掉之前的标签,干掉其图片缓存  -->
                <!-- v-lazy 代替 :src -->
                <img v-lazy="food.image" v-if="isShow">
                <span class="foodpanel-desc">{{food.info}}</span>
                <div class="back" @click="toggleShow">
                    <i class="iconfont icon-arrow_left"></i>
                </div>
            </div>
            <div class="content">
                <h2 class="title">{{food.name}}</h2>
                <div class="detail">
                    <span class="sell-count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                </div>
            </div>
        </div>
        <!-- 遮罩层 -->
        <div class="food-cover" @click="toggleShow"></div>
    </section>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            food: Object
        },

        data() {
            return {
                isShow: false
            }
        },

        methods: {
            /* 显示与隐藏切换 */
            toggleShow() {
                console.log('-----');
                this.isShow = !this.isShow;
            }
        }
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
                    z-index 200
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
            z-index 10
            top 0
            bottom 0
            left 0
            right 0
            background-color rgba(0,0,0,.5)
</style>
