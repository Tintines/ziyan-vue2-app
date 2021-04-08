<template>
    <section class="shop-header">
        <!-- <nav class="shop-nav" style="background-image: url('https://fuss10.elemecdn.com/f/5c/ead54394c3de198d3e6d3e9111bbfpng.png')"> -->
        <!-- style中书写js表达式, 连字符 连接得CSS属性,需写成大驼峰!!! -->
        <nav class="shop-nav" :style="{backgroundImage: `url(${info.bgImg})`}">
            <!-- 编程式跳转 -->
            <a href="" class="back" @click="$router.replace('/msite')">
                <i class="iconfont icon-arrow_left"></i>
            </a>
        </nav>
        <div class="shop-content" @click="isShowBulletin=true">
            <img class="content-image" :src="info.avatar" alt="商家logo">
            <div class="content-header">
                <h2 class="content-title">
                    <span class="content-tag">品牌</span>
                    <span class="content-name ellipsis">{{info.name}}</span>
                    <i class="content-icon"></i>
                </h2>
                <div class="shop-message">
                    <span class="shop-message-detail">{{info.score}}</span>
                    <span class="shop-message-detail">月售{{info.sellCount}}单</span>
                    <span class="shop-message-detail">{{info.description}}<span>约{{info.deliveryTime}}分钟</span></span>
                    <span class="shop-message-detail">距离{{info.distance}}</span>
                </div>
                <span class="shop-notice ellipsis">{{info.bulletin}}</span>
            </div>
        </div>
        <!-- 优惠 -->
        <!-- 
            初始显示异常: Cannot read property '0' of undefined"
            原因:  初始数据是一个空对象, 但表达式: info.supports[0]; 是个三层表达式
                    当info是初始空对象(state中为空),info.supports得到undefined但不会报错;继续info.supports[0] 立即报错
                    表达式分类: 
                        a : 一层表达式
                        a.b : 二层表达式
                    a.b.c : 三层表达式
                    .....
            解决办法:
                思路: 对需要初始数据显示的地方整体进行判断,无数据时隐藏,数据回来再显示
                正确: v-if    在没有数据时不解析/编译这块模板, 不生成标签
                错误: v-show  在没有数据时也会解析/编译这块模板  ==> 导致报错!!!
        -->
        <!-- 在使用info但其初始值为{}时, 通过 v-if="info.supports" 在不编译情况下先进行判断 -->
        <div class="shop-header-discounts" v-if="info.supports" @click="isShowSupports=true">
            <div class="discounts-left">
                <!-- 根据数据中的type值确定对应类名, 可以先将类名初始化成一个数组,在依靠对应type直接进行读取 -->
                <div class="activity" :class="supportClasses[info.supports[0].type]">
                    <span class="content-tag">{{info.supports[0].name}}</span>
                    <span class="activity-content">{{info.supports[0].content}}</span>
                </div>
            </div>
            <!-- 通过显示优惠数组的长度来显示总共几个优惠 -->
            <div class="discounts-right">
                {{info.supports.length}}个优惠<i class="icon1"></i>
            </div>
        </div>

        <!-- 公告区,隐藏状态 -->
        <!-- 添加过渡 xxx-enter-active xxx-leave-active ; xxx-enter xxx-enter-to ; xxx-leave xxx-leave-to 
        需要使用父级引用写在它包裹的第一个class类名下 -->
        <transition name="fade">
            <div class="shop-brief-modal" v-show="isShowBulletin">
                <div class="brief-modal-content">
                    <h2 class="content-title">
                        <span class="content-tag">品牌</span>
                        <span class="content-name">{{info.name}}</span>
                    </h2>
                    <ul class="brief-modal-msg">
                        <li>
                            <h3>{{info.rating}}</h3>
                            <span>评分</span>
                        </li>
                        <li>
                            <h3>{{info.sellCount}}单</h3>
                            <span>月售</span>
                        </li>
                        <li>
                            <h3>约{{info.deliveryTime}}分钟</h3>
                            <span>硅谷专送</span>
                        </li>
                        <li>
                            <h3>{{info.deliveryPrice}}元</h3>
                            <span>配送费用</span>
                        </li>
                        <li>
                            <h3>{{info.distance}}</h3>
                            <span>距离</span>
                        </li>
                    </ul>
                    <h3 class="brief-modal-title">
                        <span>公告</span>
                    </h3>
                    <div class="brief-modal-notice">
                        {{info.bulletin}}
                    </div>
                    <!-- 关闭icon -->
                    <div class="mask-footer" @click="isShowBulletin=false">
                        <span class="iconfont icon-close"></span>
                    </div>
                </div>
                <!-- 方法一遮罩层直接通过父元素的背景设置 -->
                <!-- 方法二遮罩层 -->
                <div class="brief-modal-cover" @click="isShowBulletin=false"></div>
            </div>
        </transition>

        <!-- 优惠活动弹窗,隐藏状态 -->
        <div class="activity-sheet" v-show="isShowSupports">
            <div class="activity-sheet-content">
                <h2 class="activity-sheet-title">优惠活动</h2>
                <ul class="list">
                    <li class="activity-item" :class="supportClasses[support.type]"
                        v-for="(support, index) in info.supports" :key="index">
                        <span class="content-tag">
                            {{support.name}}
                        </span>
                        <span class="activity-content">{{support.content}}</span>
                    </li>
                </ul>
                <div class="activity-sheet-close" @click="isShowSupports=false">
                    <span class="iconfont icon-close"></span>
                </div>
            </div>
            <div class="activity-sheet-cover" @click="isShowSupports=false"></div>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                isShowBulletin: false,      // 公告
                isShowSupports: false,      // 优惠列表
                supportClasses: ['activity-green', 'activity-red', 'activity-orange']   // 标签类名
            }
        },

        computed: {
            // ...mapState(['info'])   // 非vuex模块化写法
            ...mapState({
                info: state => state.shop.info
            })
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixins.styl'
    .shop-header
        width 100%
        background #fff
        // color #fff
        /* 开启BFC */
        overflow hidden
        .shop-nav
            height 40px
            width 100%
            background-size cover 
            background-repeat no-repeat 
            position relative
            &::before           // 背景蒙层
                content ''
                position absolute 
                height 100%
                width 100%
                background-color rgba(119, 103, 137, .43)
            .back
                display block
                height 40px
                width 40px
                .icon-arrow_left
                    position absolute 
                    font-size 20px
                    line-height 40px
                    color #fff
                    font-weight bold
                    padding-left 5px
        .shop-content
            clearFix()              // 处理父子上外边距折叠
            position relative
            display flex 
            justify-content center
            .content-image
                width 66px
                height 66px
                position absolute
                top 0
                /* 通过父元素flex定位 */
                /* left 50%
                margin-left -33px */
                margin-top -33px
                boder-radius 2px
                box-shadow 0 0 12px rgba(0,0,0,.1)
            .content-header
                margin-top 43px
                display flex 
                width 72%
                flex-direction column
                align-items center 

                /* 多元素居中实现省略效果 */
                .content-title
                    display flex 
                    width 200px         // 父元素宽度整体限制超出省略限制阈值,这样可使元素整体居中,并实现省略效果
                    justify-content center
                    align-items center 
                    font-size 20px
                    line-height 24px
                    color #333
                    text-align center 
                    .content-tag
                        flex none       // 该宽度固定所以自身宽度不让受flex影响!!!
                        width 30px
                        height 18px
                        color $green
                        border-radius 2px
                        background-image linear-gradient(90deg, #fff100, #ffe339)
                        font-size 12px
                        line-height 18px
                        font-weight bold
                        margin-right 4px
                    .content-name
                        font-weight 400 
                    .content-icon 
                        width 20px
                        height 18px
                        position relative
                        &::after 
                            content ''
                            border 6px solid #000
                            border-right none
                            border-color transparent transparent transparent rgba(0, 0, 0, .67)
                            position absolute   //变为块元素起决定性因素
                            top 3px
                .shop-message
                    height 12px
                    margin-top 8px
                    font-size 12px
                    color #333
                    .shop-message-detail:not(:last-child)::after        // 添加小点
                        content '\B7'
                        opacity .5
                .shop-notice
                    width 70%
                    font-size 12px
                    font-weight 300
                    color #999
                    margin 8px 0 10px
        .shop-header-discounts 
            display flex 
            justify-content center 
            align-items center
            background #fff
            // width 60%
            // margin-left 20%
            border 1px solid #eee 
            border-right none
            border-left none
            color #666
            padding 5px 8px
            .discounts-left 
                .activity 
                    .content-tag
                        display inline-block 
                        width 28px
                        height 14px
                        color #fff
                        background-color rgb(112, 188, 70)
                        border-radius 2px
                        text-align center 
                        line-height 14px
                        margin-right 5px
            .discounts-right 
                width 50px
                position relative
                .icon1::after 
                    content ''
                    border 4px solid #000
                    border-right none
                    border-color transparent transparent transparent rgba(0, 0, 0, .67)
                    position absolute   // 变为块元素起决定性因素
                    top 2px
                    left 48px   

        /* 商家详情 */
        .shop-brief-modal
            position absolute  
            z-index 888                      
            top 0
            right 0
            left 0
            bottom 0
            // background-color rgba(0, 0, 0, .5)       // 方法一: 背景遮罩层, 此时
            
            /* 通过父级引用,添加过渡, 过渡效果卡顿有问题,是由子元素脱离文档流,父元素高度丢失导致的问题 */
            &.fade-enter-active, &.fade-leave-active    
                transition opacity .3s
            &.fade-enter, &.fade-leave-to
                opacity 0
            &.fade-enter-to, &.fade-leave
                opacity 1

            .brief-modal-content 
                width 90%
                background #fff
                border-radius 5px
                z-index 999
                margin 0 auto
                padding 25px 20px
                box-sizing border-box
                top 20%
                display flex 
                flex-direction column
                align-items center
                /* 当其下父元素还在时,相对它的绝对定位的子元素,向下移动离开子元素爸爸的区域,进去爷爷的区域时,会被裁剪;
                这是我使用方法二遮罩层遇到的原因根结所在!!! 正常情况下该功能实现时,该遮罩层及其上元素完全脱离文档流;
                不能影响遮罩层下方的,任何元素!!!!!!!! */
                /* 此处必须使用: position absolute使其脱离文档流!!!!!!!不然会影响到其下方的元素排列 */
                position absolute           
                left 50%
                transform translateX(-50%)
                .content-title
                    width 80%               // 此处商家名称要全部显示
                    font-size 20px
                    line-height 24px
                    color #333
                    .content-tag
                        text-align center
                        vertical-align middle
                        display inline-block
                        width 30px
                        height 16px
                        color $green
                        border-radius 2px
                        background-image linear-gradient(90deg, #fff100, #ffe339)
                        font-size 12px
                        line-height 18px
                        font-weight bold
                        margin-right 4px
                    .content-name
                        font-weight bold 
                        vertical-align middle       // 两个span水平对齐
                .brief-modal-msg 
                    width 100%
                    display flex 
                    justify-content space-between
                    margin 10px 10px
                    >li 
                        width 100%
                        // flex 1 1 auto
                        text-align center
                        >h3 
                            font-size 14px
                            font-weight bold
                            color #333
                            margin-bottom 8px
                        >p
                            font-size 12px
                            color #999
                .brief-modal-title
                    width 84px
                    background-image linear-gradient(90deg, #fff, $green 50%, #fff)
                    background-repeat no-repeat
                    background-size 100% 1px
                    background-position 50%
                    text-align center
                    >span 
                        font-size 12px
                        color #999
                        font-weight bold
                        background-color #fff
                        padding 0 6px
                .brief-modal-notice 
                    font-size 13px
                    line-height 1.54
                    color #333
                    text-indent 2em
                .mask-footer
                    position absolute 
                    z-index 2000
                    bottom -80px
                    width 24px
                    height 24px
                    padding 6px
                    border 1px solid rgba(255, 255, 255, .7)
                    border-radius 50%
                    text-align center
                    span
                        font-size 20px
                        line-height 24px
                        color rgba(255, 255, 255, .7)
            /* 方法二遮罩层 */
            .brief-modal-cover
                position absolute
                z-index 99
                top 0
                right 0
                left 0
                bottom 0
                background-color rgba(0, 0, 0, .5)

        /* 活动弹出列表 */
        .activity-sheet
            position absolute                       // 子元素脱离文档流父元素必须设置宽高度!!!
            z-index 999                  
            top 0
            right 0
            left 0
            bottom 0
            // background-color rgba(0, 0, 0, .5)   // 方法一: 背景这遮罩层
            .activity-sheet-content 
                /* 此处必须使用: position absolute使其脱离文档流!!!!!!!不然会影响到其下方的元素排列 */
                position absolute           // 高度由内容撑开,只需要绝对定位+bottom为0 即可,高度由内容从下往上顶
                z-index 100
                bottom 0
                left 0
                right 0
                padding 20px 30px
                background-color #f5f5f5
                box-shadow 0 -1px 5px 0 rgba(0, 0, 0, .4)   // 上投影
                color #333
                .activity-sheet-title
                    font-size 20px
                    font-weight 400
                    text-align center 
                    margin-bottom 15px
                .list 
                    font-size 16px
                    // height 160px         // 通过滚动条查看
                    .activity-item
                        margin-bottom 12px
                        font-size 12px
                        &.activity-green    // 不同标签背景颜色
                            .content-tag
                                background-color rgb(112, 188, 70)
                        &.activity-red
                            .content-tag
                                background-color rgb(240, 115, 115)
                        &.activity-orange
                            .content-tag
                                background-color: rgb(241, 136, 79)
                        .content-tag
                            display inline-block
                            width 36px
                            // height 18px
                            line-height 18px
                            border-radius 2px
                            margin-right 10px
                            color #fff
                            text-align center
                        .activity-content
                            font-size 14px
                            line-height 18px
                            vertical-align middle
                .activity-sheet-close                        
                    position absolute 
                    right 6px
                    top 8px
                    width 26px
                    height 26px
                    text-align center
                    >span 
                        font-size 20px
                        line-height 26px
                        margin 0 auto
            /* 方法二: 遮罩层 */
            .activity-sheet-cover
                position absolute
                top 0
                right 0
                left 0
                bottom 0
                background-color rgba(0, 0, 0, .5)

</style>
