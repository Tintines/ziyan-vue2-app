<template>
    <section class="shop-info">
        <div class="content-wrapper">
            <!-- 配送信息 -->
            <section class="section">
                <h3 class="section-title">配送信息</h3>
                <div class="delivery">
                    <span class="delivery-icon">运送描述</span>
                    <div>
                        <span>由商家提供配送: 约40分钟送达 距离4000米由商家提供配送: 约40分钟送达 距离4000米</span>
                        <div class="delivery-money"> 配送费￥2</div>
                    </div>
                </div>
            </section>
            <!-- 活动与服务 -->
            <section class="section">
                <h3 class="section-title">活动与服务</h3>
                <div class="activity">
                    <div class="activity-item activity-green">
                        <span class="content-tag ">支持名字</span>
                    </div>
                    <span class="activity-content">支持内容由商家提供配送: 约40分钟送达 距离4000米由商家提供配送: 约40分钟送达 距离4000米由商家提供配送: 约40分钟送达 距离4000米由商家提供配送: 约40分钟送达 距离4000米</span>
                </div>
            </section>
            <!-- 商家实景照片 -->
            <section class="section">
                <h3 class="section-title">商家实景</h3>
                <div class="pic-wrapper">
                    <ul class="pic-list">
                        <li class="pic-item">
                            <img src="https://fuss10.elemecdn.com/f/7f/d1422ec824a0a9d1fb879c57ab533jpeg.jpeg" alt="">
                        </li>
                        <li class="pic-item">
                            <img src="https://fuss10.elemecdn.com/f/7f/d1422ec824a0a9d1fb879c57ab533jpeg.jpeg" alt="">
                        </li>
                        <li class="pic-item">
                            <img src="https://fuss10.elemecdn.com/f/7f/d1422ec824a0a9d1fb879c57ab533jpeg.jpeg" alt="">
                        </li>
                        <li class="pic-item">
                            <img src="https://fuss10.elemecdn.com/f/7f/d1422ec824a0a9d1fb879c57ab533jpeg.jpeg" alt="">
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
                        <span>哈哈哈哈哈</span>
                    </li>
                    <li>
                        <span class="bold">电话:</span>
                        <span>17772794204</span>
                    </li>
                    <li>
                        <span class="bold">地址:</span>
                        <span>西工区红东方店</span>
                    </li>
                    <li>
                        <span class="bold">营业时间:</span>
                        <span>12:20-19:60</span>
                    </li>
                </ul>
            </section>
        </div>
    </section>
    
</template>

<script type="text/ecmascript-6">
export default {

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
            height 100%            // 关键点2, 子元素定高,且矮于其内部内容撑起的高度
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
                    display flex
                    .activity-item 
                        font-size 13px
                        display flex 
                        .content-tag 
                            flex none               // 关键设置其宽度不变,不受弹性影响
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
