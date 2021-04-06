<template>
    <section class="msite">
        <!-- 头部 -->
        <Header :title="address.name || '定位中...'">
            <span class="header_search" slot="left">
                <i class="iconfont icon-sousuo"></i>
            </span>
            <span class="header_login" slot="right">
                <span class="header_login_text">登录|注册</span>
            </span>
        </Header>
        <!-- 导航 -->
        <nav class="msite_nav">
            <swiper class="swiper-container"  :options="swiperOptions" v-if="categorysArr1.length>0">
                <swiper-slide class="swiper-slide" v-for="(cs, index) in categorysArr1" :key="index">
                    <div class="link_to_food" v-for="(c, index) in cs" :key="index">
                        <div class="food-container">
                            <img class="food-img" :src="`https://fuss10.elemecdn.com${c.image_url}`"/>
                        </div>
                        <span>{{c.title}}</span>
                    </div>
                </swiper-slide>    
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div v-else class="swiper-container">
                <img src="./images/msite_back.svg">
            </div>
        </nav>
        <!-- 附近商家 -->
        <div class="msite_shop_list">
            <div class="shop_list_header">
                <i class="iconfont icon-xuanxiang"></i>
                <span class="list_header_title">附近商家</span>
            </div>
            <!-- 商家列表 -->
            <div class="shop_container">
                <ul class="shop_list_ul" v-if="shops.length">
                    <li class="shop_list_li" v-for="shop in shops" :key="shop.id" @click="$router.push('/shop')">
                        <a>
                            <div class="shop_left">
                                <img class="shop_img" :src="`https://fuss10.elemecdn.com${shop.image_path}`">
                            </div>
                            <div class="shop_right">
                                <section class="shop_detail_header">
                                    <h4 class="shop_title ellipsis">{{shop.name}}</h4>
                                    <ul class="shop_detail_ul">
                                        <li class="supports" v-for="(support, index) in shop.supports" :key="index">{{support.icon_name}}</li>
                                    </ul>
                                </section>
                                <section class="shop_rating_order">
                                    <section class="shop_rating_order_left">

                                        <!-- Star组件 -->
                                        <Star :score="shop.rating" :size="24"/>
                                        
                                        <div class="rating_section">
                                            {{shop.rating}}
                                        </div>
                                        <div class="order_section">
                                            月售{{shop.recent_order_num}}单
                                        </div>
                                    </section>
                                    <section class="shop_rating_order_right">
                                        <span class="delivery_style delivery_left">{{shop.delivery_mode.text}}</span>
                                        <span class="delivery_style delivery_right">过时退</span>
                                    </section>
                                </section>
                                <section class="shop_distance">
                                    <div class="shop_delivery_msg">
                                        <span>¥{{shop.float_minimum_order_amount}}起送</span>
                                        <span class="segmentation">/</span>
                                        <span>配送费约¥{{shop.float_delivery_fee}}</span>
                                    </div>
                                </section>
                            </div>
                        </a>
                    </li>
                </ul>
                <!-- 无数据时显示加载图 -->
                <ul v-else>
                    <li>
                        <img src="./images/shop_back.svg" alt="loading">
                    </li>
                    <li>
                        <img src="./images/shop_back.svg" alt="loading">
                    </li>
                    <li>
                        <img src="./images/shop_back.svg" alt="loading">
                    </li>
                    <li>
                        <img src="./images/shop_back.svg" alt="loading">
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import {mapState} from 'vuex'
import chunk from 'lodash/chunk'    // 按需引入的工具函数 ==>打包文件更小


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
        this.$store.dispatch('getShops');      // 页面挂载发送请求

        this.$store.dispatch('getCategory');   // dispatch返回的promise在数据更新且界面更新之后才成功
       
    },
    computed: {
        ...mapState(['address', 'categorys', 'shops']),     // vuex未再细分模块时写法

        /* 方法一: 自定义函数实现二维数组,小数组长度为8 */
        categorysArr1() {
            const {categorys} = this;
            const bigArr = [];
            let smallArr = [];
            categorys.forEach(item => {
                /* 将小数组保存到大数组中(只在第一次事存进去且只保存一次,
                此后只对小数组进行遍历push添加,此时可以保证大数组内只有一个小数组类似[[0,1,2]]) */ 
                if(smallArr.length===0) bigArr.push(smallArr);
                smallArr.push(item);
                if(smallArr.length===8) smallArr = [];
            })
            return bigArr;
        },
        /* 方法二: 使用第三方库实现二维数组 */
        categorysArr2() {
            return chunk(this.categorys, 8);    // 按需引入
        }
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
                            width 23%
                            height 23%
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
                                margin-top 22px
                                margin-bottom 6px
                                display flex
                                align-items center
                                justify-content space-between
                                .shop_rating_order_left
                                    color #ff9a0d

                                    /* start组件 */
                                    
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
                                .shop_rating_order_left
                                        float left
                                        color #ff9a0d
                                        // Star
                                        .rating_section
                                            float left
                                            font-size 14px
                                            color #ff6000
                                            margin-left 4px
                                            margin-top 1px
                                        .order_section
                                            margin-top 2px
                                            float left
                                            font-size 12px
                                            color #666
                                            transform scale(.8)
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
