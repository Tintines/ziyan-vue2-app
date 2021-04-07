<template>
    <section class="msite">
        <!-- 头部 -->
        <Header title="xxxxxxxxssssssss">
            <span class="header_search" slot="left">
                <i class="iconfont icon-sousuo"></i>
            </span>
            <span class="header_login" slot="right">
                <span class="header_login_text">登录|注册</span>
            </span>
        </Header>
        <!-- 导航 -->
        <nav class="msite_nav">
            <swiper class="swiper-container" ref="mySwiper" :options="swiperOptions">
                <swiper-slide class="swiper-slide">
                    <div class="link_to_food">
                        <div class="food-container">
                            <img class="food-img" src="./images/nav/1.jpg" />
                        </div>
                        <span>甜品饮品</span>
                    </div>
                    <div class="link_to_food">
                        <div class="food-container">
                            <img src="./images/nav/1.jpg" />
                        </div>
                        <span>甜品饮品</span>
                    </div>
                    <div class="link_to_food">
                        <div class="food-container">
                            <img src="./images/nav/1.jpg" />
                        </div>
                        <span>甜品饮品</span>
                    </div>
                    <div class="link_to_food">
                        <div class="food-container">
                            <img src="./images/nav/1.jpg" />
                        </div>
                        <span>甜品饮品</span>
                        </div>
                    <div class="link_to_food">
                        <div class="food-container">
                            <img src="./images/nav/1.jpg" />
                        </div>
                        <span>甜品饮品</span>
                    </div>
                    <div class="link_to_food">
                        <div class="food-container">
                            <img src="./images/nav/1.jpg" />
                        </div>
                        <span>甜品饮品</span>
                    </div>
                    <div class="link_to_food">
                        <div class="food-container">
                            <img src="./images/nav/1.jpg" />
                        </div>
                        <span>甜品饮品</span>
                    </div>
                    <div class="link_to_food">
                        <div class="food-container">
                            <img src="./images/nav/1.jpg" />
                        </div>
                        <span>甜品饮品</span>
                    </div>
                </swiper-slide>
                <swiper-slide class="swiper-slide">Slide 2</swiper-slide>
                <swiper-slide class="swiper-slide">Slide 3</swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </nav>
        <!-- 附近商家 -->
        <div class="msite_shop_list">
            <div class="shop_list_header">
                <i class="iconfont icon-xuanxiang"></i>
                <span class="list_header_title">附近商家</span>
            </div>
            <!-- 商家列表 -->
            <div class="shop_container">
                <ul class="shop_list_ul">
                    <li class="shop_list_li">
                        <a>
                            <div class="shop_left">
                                <img class="shop_img" src="./images/shop/1.jpg">
                            </div>
                            <div class="shop_right">
                                <section class="shop_detail_header">
                                    <h4 class="shop_title ellipsis">锄禾日当午，汗滴禾下土</h4>
                                    <ul class="shop_detail_ul">
                                        <li class="supports">保</li>
                                        <li class="supports">准</li>
                                        <li class="supports">票</li>
                                    </ul>
                                </section>
                                <section class="shop_rating_order">
                                    <section class="shop_rating_order_left">
                                        <div class="star star-24">
                                        <span class="star-item on"></span>
                                        <span class="star-item on"></span>
                                        <span class="star-item on"></span>
                                        <span class="star-item half"></span>
                                        <span class="star-item off"></span>
                                        </div>
                                        <div class="rating_section">
                                        3.6
                                        </div>
                                        <div class="order_section">
                                        月售106单
                                        </div>
                                    </section>
                                    <section class="shop_rating_order_right">
                                        <span class="delivery_style delivery_right">硅谷专送</span>
                                    </section>
                                </section>
                                <section class="shop_distance">
                                    <div class="shop_delivery_msg">
                                        <span>¥20起送</span>
                                        <span class="segmentation">/</span>
                                        <span>配送费约¥5</span>
                                    </div>
                                </section>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
    data() {
        return {
            data: {},
            swiperOptions: {
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                loop: true,
            },
        }
    },
    mounted() {
        // 这边就可以使用swiper这个对象去使用swiper官网中的那些方法
        console.log("Current Swiper instance object", this.swiper);
        // this.swiper.slideTo(1, 1000, false);
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.$swiper;
        },
    },
    components: {
        Swiper,
        SwiperSlide,
    },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.msite
    width 100%
    /* 顶部导航 */
    .header_search
        width 25px
        .icon-sousuo
            font-size 25px
    .header_login
        font-size 14px
    /* 轮播导航 */
    .msite_nav
        bottom-border-1px(#e4e4e4)
        margin-top 15px
        padding-bottom 20px
        height 145px
        background #fff
        .swiper-container
            --swiper-pagination-color $green    // 设置分页器颜色
            width 100%
            height 165px
            position relative
            .swiper-slide
                height 100%
                display flex
                flex-wrap wrap              // 是否换行
                .link_to_food
                    width 25%
                    text-align center
                    .food-container
                        width 100%
                        img
                            position relative
                            margin 0 auto
                            display block
                            width 50px
                            height 50px
                    span
                        display block
                        width 100%
                        font-size 13px
                        color #666
            /* 检查元素将其内部选择器拿出,重写进行覆盖,来控制导航点位置 */
            .swiper-pagination-bullets 
                bottom 2px      // 控制垂直位置
                left 0          // 控制水平位置
                width 100%

    /* 附近商家 */
    .msite_shop_list
        margin-top 10px
        background #fff
        /* 列表头部 */
        .shop_list_header
            padding 5px 10px 0
            color #666
            .iconfont 
                font-weight 500
                margin 0 5px 
            .list_header_title
                font-size 14px
                line-height 20px
                font-weight 400
        /* 商铺列表 */
        .shop_container
            margin-bottom 50px
            .shop_list_ul
                .shop_list_li
                    bottom-border-1px(#f1f1f1)
                    width 100%
                    >a
                        clearFix()
                        display block
                        box-sizing border-box
                        padding 15px 8px
                        width 100%
                        .shop_left
                            float left
                            box-sizing border-box
                            width 70px
                            height 70px
                            padding-right 10px
                            .shop_img
                                display block   
                                width 100%
                                height 100%
                        .shop_right
                            float right
                            width 77%
                            height 16px
                            .shop_detail_header
                                clearFix()
                                width 100%
                                padding-top 6px
                                .shop_title
                                    float left
                                    width 200px
                                    color #333
                                    font-size 16px
                                    height 16px
                                    line-height 16px
                                    font-weight 700
                                    &::before
                                        vertical-align top          // 伪元素转成行内块后和父元素平齐关键
                                        content '品牌'
                                        display inline-block
                                        font-size 11px
                                        line-height 16px
                                        color #333
                                        background-color #ffd930
                                        padding 0 2px
                                        border-radius 2px
                                        margin-right 5px
                                .shop_detail_ul
                                    float right
                                    margin-right 7px
                                    .supports
                                        float left
                                        font-size 10px
                                        color #999
                                        border 1px solid #f1f1f1
                                        padding 0 2px
                                        border-radius 2px
                            .shop_rating_order
                                width 100%
                                height 16px
                                margin-top 16px
                                margin-bottom 6px
                                display flex
                                align-items center
                                justify-content space-between
                                .shop_rating_order_left
                                    color #ff9a0d
                                    .star //2x图 3x图
                                        float left
                                        .star-item
                                            display inline-block    
                                            background-repeat no-repeat
                                        &.star-48
                                            .star-item
                                                width 20px
                                                height 20px
                                                margin-right 22px
                                                background-size 20px 20px
                                                &:last-child
                                                    margin-right: 0
                                                &.on
                                                    bg-image('./images/stars/star48_on')
                                                &.half
                                                    bg-image('./images/stars/star48_half')
                                                &.off
                                                    bg-image('./images/stars/star48_off')
                                        &.star-36
                                            .star-item
                                                width 15px
                                                height 15px
                                                margin-right 6px
                                                background-size 15px 15px
                                                &:last-child
                                                    margin-right 0
                                                &.on
                                                    bg-image('./images/stars/star36_on')
                                                &.half
                                                    bg-image('./images/stars/star36_half')
                                                &.off
                                                    bg-image('./images/stars/star36_off')
                                        &.star-24
                                            .star-item
                                                width 10px
                                                height 10px
                                                margin-right 3px
                                                background-size 10px 10px
                                                &:last-child
                                                    margin-right 0
                                                &.on
                                                    bg-image('./images/stars/star24_on')
                                                &.half
                                                    bg-image('./images/stars/star24_half')
                                                &.off
                                                    bg-image('./images/stars/star24_off')
                                    .rating_section
                                        float left
                                        font-size 12px
                                        color #ff6000
                                        margin-left 4px
                                    .order_section
                                        float left
                                        font-size 12px
                                        color #666
                                        transform scale(.8)
                                .shop_rating_order_right
                                    .delivery_style
                                        // transform-origin 35px 0
                                        vertical-align top
                                        transform scale(.7)
                                        display inline-block
                                        font-size 12px
                                        padding 1px
                                        border-radius 2px
                                    .delivery_right
                                        color #02a774
                                        border 1px solid #02a774
                            .shop_distance
                                clearFix()
                                width 100%
                                font-size 12px
                                .shop_delivery_msg
                                    float left
                                    transform-origin 0
                                    color #666
                                .segmentation
                                    color #ccc

    


</style>
