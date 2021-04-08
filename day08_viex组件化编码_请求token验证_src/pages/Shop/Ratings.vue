<template>
    <section class="ratings" ref="ratings">
        <!-- 该层主要用于包裹元素生成滚动条 -->
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h2 class="score">4.5</h2>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家99%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <div class="title">服务态度</div>
                        <Star :score="info.serviceScore" :size="36"/>
                        <span class="score">4.6</span>
                    </div>
                    <div class="score-wrapper">
                        <div class="title">服务态度</div>
                        <Star :score="info.foodScore" :size="36"/>
                        <span class="score">4.6</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">30分钟</span>
                    </div>
                </div>
            </div>
            <!-- 筛选 -->
            <div class="ratingselect">
                <div class="rating-type">
                    <span class="block positive active">全部
                        <span class="count">9个</span>
                    </span>
                    <span class="block positive">满意
                        <span class="count">9个</span>
                    </span>
                    <span class="block negative">不满意
                        <span class="count">9个</span>
                    </span>
                </div>
                <div class="switch on">
                    <span class="iconfont icon-check_circle"></span>
                    <span class="text">只看有内容的评价</span>
                </div>
            </div>
            <!-- 评论展示区 -->
            <div class="rating-wrapper">
                <ul>
                    <li class="rating-item">
                        <div class="avatar">
                            <img width="28" height="28" src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png" alt="用户头像">
                        </div>
                        <div class="content">
                            <h3 class="name">子砚</h3>
                            <div class="star-wrapper">
                                <!-- 传递数字的写法  :score="3*1" -->
                                <Star :score="3*1" :size="24"/>
                                <span class="delivery">20分钟</span>
                            </div>
                            <span class="text">
                                描述文字描述文字描述文字描述文字
                                描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字
                            </span>
                            <div class="recommend">
                                <span class="iconfont icon-thumb_up"></span>
                                <span class="item">子项</span>
                            </div>
                            <div class="time">2021年2月3日</div>
                        </div>
                    </li>
                    <li class="rating-item">
                        <div class="avatar">
                            <img width="28" height="28" src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png" alt="用户头像">
                        </div>
                        <div class="content">
                            <h3 class="name">子砚</h3>
                            <div class="star-wrapper">
                                <!-- 传递数字的写法  :score="3*1" -->
                                <Star :score="3*1" :size="24"/>
                                <span class="delivery">20分钟</span>
                            </div>
                            <span class="text">
                                描述文字描述文字描述文字描述文字
                                描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字
                            </span>
                            <div class="recommend">
                                <span class="iconfont icon-thumb_up"></span>
                                <span class="item">子项</span>
                            </div>
                            <div class="time">2021年2月3日</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import {mapState} from 'vuex'
    export default {
        computed: {
            // ...mapState(['info', 'ratings'])         // 非vuex组件化写法
            ...mapState({
                info: state => state.shop.info,
                ratings: state => state.shop.ratings
            })
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .ratings
        position absolute 
        top 223px
        bottom 0
        left 0
        right 0
        overflow hidden
        background-color #f3f5f7
        .ratings-content
            width 100%
            height 100%
            // overflow auto            // 手动生成滚动条
            .overview 
                display flex 
                padding 12px 0
                align-items center
                background-color #fff
                .overview-left
                    width 136px
                    box-sizing border-box 
                    border-right 1px solid rgba(7, 17, 27, 0.1)
                    text-align center
                    .score 
                        font-size 24px
                        color rgb(255, 153, 0)
                        line-height 28px
                        margin-bottom 6px
                    .title 
                        font-size 12px
                        color rgb(7, 17, 27)
                        line-height 12px
                        margin-bottom 8px
                    .rank 
                        font-size 12px
                        color rgb(147, 153, 159)
                        line-height 12px
                        transform scale(.9)
                .overview-right
                    flex 1          // 占用剩余空间
                    margin-left 20px
                    .score-wrapper 
                        margin-bottom 8px
                        display flex 
                        align-items center
                        .title
                            font-size 12px
                            color rgb(7, 17, 27)
                            margin-right 8px
                        .star 
                            float none
                            margin-right 8px
                        .score 
                            font-size 14px
                            color: rgb(255, 153, 0)
                            font-weight bold
                    .delivery-wrapper 
                        .title
                            font-size: 12px
                            line-height: 18px
                            color: rgb(7, 17, 27)
                        .delivery
                            margin-left: 9px
                            font-size: 12px
                            color: rgb(147, 153, 159)
            /* 筛选部分 */
            .ratingselect
                margin-top 12px
                background-color #fff
                .rating-type    
                    padding 16px 16px 0
                    display flex 
                    justify-content space-around
                    .block
                        // display inline-block 
                        font-size: 12px
                        color: rgb(77, 85, 93)
                        line-height 16px
                        padding 8px 12px
                        border-radius 2px
                        background: rgba(77, 85, 93, 0.2)
                        &.active 
                            background-color $green 
                            color #fff
                        .count 
                            margin-left 2px
                .switch
                    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
                    color: rgb(147, 153, 159)
                    padding 10px 16px
                    height 20px
                    position relative
                    .iconfont
                        &.icon-check_circle
                            position absolute
                            top 11px
                            font-size 14px
                            line-height 20px
                    &.on 
                        .icon-check_circle
                            color $green
                    .text 
                        margin-left 16px
                        display inline-block
                        font-size 12px
                        line-height 20px

            /* 评论展示区 */            
            .rating-wrapper
                padding 0 16px
                background-color #fff
                .rating-item 
                    display flex 
                    padding 16px 0 10px
                    bottom-border-1px(rgba(7, 17, 27, 0.1)) 
                    .avatar
                        width 28px
                        height 28px
                        margin-right 12px
                        border-radius 50%
                        overflow hidden         // 需要配合裁切,不然图片漏出
                        img 
                            width 100%
                            height 100%
                            display block
                    .content 
                        flex 1
                        position relative
                        .name 
                            font-size 12px
                            line-height 14px
                            color: rgb(7, 17, 27)
                            margin-bottom: 4px
                        .star-wrapper 
                            margin-bottom 6px
                            .star 
                                margin-right 6px
                            .delivery 
                                font-size 12px
                                line-height 12px
                                color rgb(147, 153, 159)

                        .text 
                            font-size 12px
                            line-height 16px
                            color rgb(7, 17, 27)
                            display inline-block
                            margin-bottom 8px
                        .recommend
                            font-size 12px
                            .icon-thumb_up, .icon-thumb_down, .item
                                margin 0 8px 4px 0
                            .icon-thumb_up
                                color $yellow
                                font-size 12px
                            .icon-thumb_down
                                color rgb(147, 153, 159)
                            .item 
                                padding 0 6px
                                border 1px solid rgba(7, 17, 27, 0.1)
                                border-radius 1px
                                color rgb(147, 153, 159)
                                background #fff
                                display inline-block
                                height 14px
                                line-height 14px
                                transform scale(.9)
                        .time
                            position: absolute
                            top: 0
                            right: 0
                            line-height: 12px
                            font-size: 10px
                            color: rgb(147, 153, 159)




</style>
