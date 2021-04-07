<template>
    <section class="goods">
        <!-- 左侧分类列表 -->
        <div class="menu-wrapper" ref="left">
            <ul>
                <li class="menu-item" v-for="(good, index) in goods"
                :key="good.name" :class="{current: index===currentIndex}">
                    <!-- 使用v-if对是否有图标进行判断, 没有图标就不解析不去显示 -->
                    <img class="item-icon" v-if="good.icon" :src="good.icon" alt="aa">
                    <span class="text">{{good.name}}</span>
                </li>
            </ul>
        </div>
        <!-- 右侧分类展示 -->
        <div class="foods-wrapper" ref="right">
            <ul ref="rightUl">
                <!-- 大类 -->
                <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
                    <h3 class="title">{{good.name}}</h3>
                    <!-- 具体小类 -->
                    <ul>
                        <li class="food-item" v-for="(food, index) in good.foods" :key="index">
                            <!-- 菜图标 -->
                            <div class="icon">
                                <img :src="food.icon" >
                            </div>
                            <div class="content">
                                <h4 class="name">{{food.name}}</h4>
                                <div class="desc">{{food.description}}</div>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <!-- 使用v-if处理没有原价就不解析不去显示的问题 -->
                                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    CarControl加减器组件
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import {mapState} from 'vuex'
    import BScroll from 'better-scroll'
    export default {
        name: 'Goods',
        data() {
            return {
                tops: [],   // 右侧每个分类<li>的top值的数组tops: 第一次列表显示后统计后面不再变化
                scrollY: 0  // 右侧列表滑动的Y轴坐标: scrollY  在滑动过程中不断改变
            }
        },
        
        methods: {
            /* 数据回来后计算右侧所有分类li的top值所组成的数据 */
            /* 只需计算一次!!! */
            initTops() {
                const tops = [];
                let top = 0;        // 起始值为0
                tops.push(top);     // 将起始值放到数组中
                /* 给爸爸ref="rightUl" ,来找儿子,儿子数量不确定
                this.$refs.rightUl.children 得到的是li元素伪数组, 
                需要转变成真数组,然后使用数组的方法进行遍历 */
                /* 方法一: es6语法 lis=Array.from(this.$refs.rightUl.children) */
                /* 方法二: es5语法 */
                const lis = Array.prototype.slice.call(this.$refs.rightUl.children)
                lis.forEach(li => {
                    top += li.clientHeight;     // 每个li的高度: li.clientHeight
                    tops.push(top);             // 每计算一次,重新赋值后,放入一次
                })
                /* 更新data中的tops数据 */
                this.tops = tops;
            },

            /* 初始化BScroll */
            initScroll() {
                /* 左侧列表初始化滑动 */
                new BScroll(this.$refs.left, {})   
                
                /* 右侧列表初始化滑动 */
                const rightScroll = new BScroll(this.$refs.right, {     // 可传入配置选项
                    probeType: 1,       // 非实时 / 触摸    该参数决定滚动on监听的响应时机
                    // probeType: 2,    // 实时 / 触摸
                    // probeType: 3     // 实时 / 触摸 / 惯性 / 编码
                })
                /* 思路:
                    当你想通过正在进行的操作触发其他事情, 就必然想到绑定监听!!! 
                    由better-scroll来控制滚动,那就去找他提供的监听 */
                /* 给右侧列表绑定滚动scroll 滚动开始监听事件 */
                rightScroll.on('scroll', ({x, y}) => {      // eslint-disable-line
                    this.scrollY = Math.abs(y)              // 更新data状态对应的数据!!!
                })
                /* 给右侧列表绑定滚动scrollEnd 滚动结束事件监听, 获取停止时的最终 scrollY 值 */
                rightScroll.on('scrollEnd', ({x, y}) => {   // eslint-disable-line
                    // console.log('scrollEnd', y);
                    this.scrollY = Math.abs(y)              // 更新data中对应数据
                })

            }
        },

        computed: {
            ...mapState(['goods']),
            
            /* 计算当前右侧scrollY 所处tops距离值区间的index值 */
            currentIndex() {
                const {scrollY, tops} = this;
                /* top为tops遍历的当前的值; tops[index+1]为紧挨着的那个值 */
                /* findIndex找不到返回-1, 所以必须先给tops计算产生值之后才能调用该方法 */

                /* 错误简写写法,需要省略{}和return  */
                // return tops.findIndex((top, index) => {scrollY >= top && scrollY < tops[index+1]}) 
                return tops.findIndex((top, index) => scrollY >= top && scrollY < tops[index+1])
                
            }
        },

        watch: {
            /* 通过监视vuex中state中的状态数据goods数据的变化,来确定实现 new BScroll() 的时机 */
            goods() {                       // 浅层监视goods数据变化
                this.$nextTick(() => {      // 页面再次更新时调用
                    /* 初始化滑动 */
                    this.initScroll();      // 定义实例化方法
                    /* 统计右侧所有分类li的top值所组成的数组 */
                    this.initTops();
                })
            }
        },

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .goods 
        background-color #fff
        width 100%

        /* 确定视口中实现滚动条!!!!!!父元素绝对定位,bottom等于确定值,overflow为hidden很关键, 
        子元素只需要高度大于父元素, overflow auto即可实现 */
        position absolute
        z-index 88
        top 223px
        bottom 0
        overflow hidden                     // 关键点
        display flex                        // 也是关键点

        .menu-wrapper
            // overflow auto                // 测试能否正确自动生成滚动条
            width 80px
            background #f3f5f7
            /* 使用newswiper 时,除去该属性,使用插件来实现 */
            .menu-item 
                height 54px
                line-height 54px
                box-sizing border-box
                padding 0 12px
                text-align center
                font-size 12px
                &:not(:last-child)          // 细节: 除去最后子元素的下边框
                    bottom-border-1px(rgba(7, 17, 27, 0.1))
                &.current
                    background-color #fff
                    color $green
                    font-weight bold
                    font-size 14px
                .item-icon 
                    display inline-block
                    width 12px
                    height 12px
                    vertical-align middle
                    margin-right 2px
                .text 
                    display inline-block
                    vertical-align middle
                    /* 子元素继承的样式优先级最低,所以给他的父元素设置统一样式, 激活时单独设置字体大小即可 */
                    /* font-size 12px */
                    
        /* foods-wrapper */
        .foods-wrapper
            // overflow auto             // 测试能否正确自动生成滚动条  
            padding-left 14px
            /* 要什么自行车!!! flex布局中,当然要通过flex自身的宽度自适应来解决宽度问题啊!!! */
            flex 1                       // 剩余空间占比: 占1份
            // width calc(100%-84px)     // 失效状态
            ul 
                .title
                    // height 26px
                    line-height 26px
                    width 100%
                    font-size 12px
                    color rgb(147, 153, 159)
                    background-color #f3f5f7
                    box-sizing border-box
                    border-left 2px solid #d9dde1       // 细节,设置边框时就需要考虑是否需要设置盒模型
                .food-item 
                    display flex 
                    margin 18px
                    margin-left 0
                    position relative
                    padding-bottom 18px
                    &:not(:last-child)          // 排除法
                        bottom-border-1px(rgba(7, 17, 27, 0.1))
                    &:last-child                // 通过设置margin-bottom使每一大类最后一个子元素抵消每个子元素设置的padding-bottom
                        margin-bottom 0
                    .icon
                        width 57px
                        height 57px
                        img 
                            width 100%
                            height 100%
                            // display inline-block
                    .content 
                        margin-left 8px
                        .name 
                            line-height 14px
                            font-size 14px
                            font-weight bold
                            color rgb(7, 17, 27)
                        .desc, .extra
                            line-height 12px
                            font-size 12px
                            color: rgb(147, 153, 159)
                            margin 8px 0 6px
                        .extra
                            .count 
                                margin-right 10px
                        .price 
                            font-weight 700
                            line-height 20px
                            .now
                                margin-right 6px
                                font-size 14px
                                color rgb(240, 20, 20)
                            .old
                                font-size: 12px
                                color rgb(147, 153, 159)
                                text-decoration line-through
                                display inline-block
                                transform scale(0.8)
                        .cartcontrol-wrapper
                            position absolute 
                            right 0
                            bottom 12px
                            


</style>
