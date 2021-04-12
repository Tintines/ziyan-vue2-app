<template>
    <section class="shop-info">
        <div class="content-wrapper">
            <!-- 配送信息 -->
            <section class="section">
                <h3 class="section-title">配送信息</h3>
                <div class="delivery">
                    <span class="delivery-icon">{{info.description}}</span>
                    <div>
                        <span>由商家提供配送: 约{{info.deliveryTime}}分钟送达 距离{{info.distance}}</span>
                        <div class="delivery-money"> 配送费￥{{info.deliveryPrice}}</div>
                    </div>
                </div>
            </section>
            <!-- 活动与服务 -->
            <section class="section">
                <h3 class="section-title">活动与服务</h3>
                <div class="activity">
                    <div class="activity-item" v-for="(support, index) in info.supports" :class="supportClasses[support.type]" :key="index">
                        <span class="content-tag ">{{support.name}}</span>
                        <span class="activity-content">{{support.content}}</span>
                    </div>
                </div>
            </section>
            <!-- 商家实景照片 -->
            <section class="section">
                <h3 class="section-title">商家实景</h3>
                <div class="pic-wrapper">
                    <ul class="pic-list" ref="picsUl">
                        <li class="pic-item" v-for="pic in info.pics" :key="pic">
                            <img :src="pic" alt="商家实景图片">
                        </li>
                    </ul>
                </div>
            </section>
            <!-- 商家地址信息 -->
            <section class="section">
                <h3 class="section-title">商家信息</h3>
                <ul class="detail">
                    <li>
                        <span class="bold">品类:</span>
                        <span>{{info.category}}</span>
                    </li>
                    <li>
                        <span class="bold">电话:</span>
                        <span>{{info.phone}}</span>
                    </li>
                    <li>
                        <span class="bold">地址:</span>
                        <span>{{info.address}}</span>
                    </li>
                    <li>
                        <span class="bold">营业时间:</span>
                        <span>{{info.workTime}}</span>
                    </li>
                </ul>
            </section>
        </div>
    </section>
    
</template>

<script type="text/ecmascript-6">
    import {mapState} from 'vuex'
    import BScroll from 'better-scroll'
    export default {
        name: 'Info',
        data() {
            return {
                supportClasses: ['activity-green', 'activity-red', 'activity-orange']
            }
        },
        computed: {
            ...mapState({
                info: state => state.shop.shop.info || {},
            })
        },
        mounted() {
            if(this.info.name) {    // 从其他路由切换过来,组件挂载后,此时数据已经存在
                this._initScroll();
            }
        },
        watch: {
            info () {               // 对computed中info数据进行监视,数据回来后再进行初始化
                this.$nextTick(() => {
                    this._initScroll();
                })
            }
        },
        methods: {
            _initScroll () {
                /* 整体默认垂直滑动 */
                new BScroll('.shop-info', { click: true})
                /* 通过操作原生DOM给ul指定样式宽度, Vue中能不用时尽量不用 */
                const ul=  this.$refs.picsUl;
                const liWidth = 120;                    // 指定li的宽度
                const space = 6;                        // 指定间距
                const liCount = this.info.pics.length;  // 获取商家图片数组的总长度,即li的个数
                const width = (liWidth + space)*liCount - space;
                ul.style.width = width + 'px';          // 原生操作DOM
                /* 商家实景局部图片水平滑动 */
                new BScroll('.pic-wrapper', {
                    click: true,
                    scrollX: true                       // 水平滑动
                })
            }
        }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .shop-info 
        width 100%
        background #f3f5f7
        /* 关键设置,定高视口大小 */
        position absolute 
        top 223px
        bottom 0
        overflow hidden            // 关键点1
        .content-wrapper
            width 100%
            // height 100%            // 关键点2,子元素高度高于父元素,且矮于其内部内容撑起的高度
            // overflow auto          // 测试自动生成滚动条
            .section
                font-size 14px
                color #666
                background-color #fff
                box-sizing border-box
                padding 16px 16px 16px
                // bottom-border-1px(#eee)
                &:not(:last-child)
                    margin-bottom 12px
                .section-title
                    color #666
                    font-weight 500 
                    line-height 16px
                .delivery
                    margin-top 6px
                    font-size 13px
                    line-height 18px
                    display flex
                    .delivery-icon 
                        flex none               // 关键:对子元素设置使其宽度不变,不受弹性影响!!!!!!!
                        width 55px
                        height 18px
                        font-size 12px
                        margin-right -6px
                        display block
                        background-color #0097ff
                        color #fff
                        border-radius 2px
                        text-align center
                        transform scale(.8)
                        transform-origin 0
                    .delivery-money
                        margin-top 3px

                /* 活动二 */
                .activity
                    margin-top 6px
                    font-size 13px
                    line-height 18px
                    .activity-item 
                        font-size 13px
                        display flex 
                        flex-direction row
                        .content-tag 
                            flex none               // 关键设置其宽度不变,不受弹性影响
                            width 55px
                            height 18px
                            font-size 12px
                            display block
                            background-color #0097ff
                            color #fff
                            border-radius 2px
                            text-align center
                            transform scale(.8)
                            transform-origin 0
                        .activity-content
                            flex none
                        &.activity-green
                            .content-tag 
                                background-color rgb(112, 188, 70)
                /* 实景照片 */
                .pic-wrapper
                    width 100%
                    margin-top 6px
                    overflow hidden
                    .pic-list
                        overflow-x auto
                        display flex            // 设置flex 目的是上li元素水平排列!!!!
                        .pic-item
                            margin-right 6px
                            flex none           // 解决子元素尺寸收到flex影响
                            width 120px
                            height 90px
                            img 
                                display block   // 去除间隙
                                width 100%
                                height 100%
                /* 商家信息 */
                .detail
                    margin-top 6px
                    width 100%
                    li  
                        display flex 
                        justify-content space-between
                        line-height 16px
                        font-size 13px
                        padding 6px 0 4px
                        bottom-border-1px(#ddd)
                        &:first-child           // 抵消第一个li中与标题之间的距离,使每个小项与标题之间的margin-top都为一致!!!
                            margin-top -6px    
                        .bold
                            margin-right 6px
                            font-weight 400 
                            color #666
</style>
