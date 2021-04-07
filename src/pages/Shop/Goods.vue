<template>
    <div>
        <section class="goods">
            <!-- 左侧分类列表 -->
            <div class="menu-wrapper" ref="left">
                <ul ref="leftUl">
                    <li class="menu-item border-1px" v-for="(good, index) in goods" :key="good.name" 
                    :class="{current: index===currentIndex}" @click="clickItem(index)">
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
                            <li class="food-item border-1px" v-for="(food, index) in good.foods" 
                            :key="index" @click="showFood(food)">
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
                                        <CartControl :food="food"/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </section>
        <Food :food="food" ref="food"/>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState} from 'vuex'
    import BScroll from 'better-scroll'
    import Food from '@/components/Food/Food.vue'

    export default {
        name: 'Goods',
        data() {
            return {
                tops: [],    // 右侧每个分类<li>的top值的数组tops: 第一次列表显示后统计后面不再变化
                scrollY: 0,  // 右侧列表滑动的Y轴坐标: scrollY  在滑动过程中不断改变
                food: {}     // 需要显示的food,初始化为空对象,通过绑定事件点击对应的food时,才传入对应的food数据!!!
            }
        },
        
        methods: {
            /* 数据回来后计算右侧所有分类li的top值所组成的数据 */
            /* 只需计算一次!!! */
            /* 使用 _ 来区分是否为事件相关的方法函数 */
            _initTops() {
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
            _initScroll() {
                /* 左侧列表初始化滑动 */
                /* 单一实例化: 
                        将该实例挂载到组件this上!!使得生成一次实例,外部也可以使用 */
                this.leftScroll = new BScroll(this.$refs.left, {
                    click: true         // 分发自定义的click事件,betterscroll默认禁止了click事件
                })   
                
                /* 右侧列表初始化滑动 */
                /* 单一实例化 */
                this.rightScroll = new BScroll(this.$refs.right, {     // 可传入配置选项
                    click: true,        // 分发自定义的click事件
                    probeType: 1,       // 非实时 / 触摸    该参数决定滚动on监听的响应时机
                    // probeType: 2,    // 实时 / 触摸
                    // probeType: 3     // 实时 / 触摸 / 惯性 / 编码
                })
                /* 思路:
                    当你想通过正在进行的操作触发其他事情, 就必然想到绑定监听!!! 
                    由better-scroll来控制滚动,那就去找他提供的监听 */
                /* 给右侧列表绑定滚动scroll 滚动开始监听事件 */
                this.rightScroll.on('scroll', ({x, y}) => {     // eslint-disable-line
                    this.scrollY = Math.abs(y)                  // 更新data状态对应的数据!!!
                })
                /* 给右侧列表绑定滚动scrollEnd 滚动结束事件监听, 获取停止时的最终 scrollY 值 */
                this.rightScroll.on('scrollEnd', ({x, y}) => {  // eslint-disable-line
                    // console.log('scrollEnd', y);
                    this.scrollY = Math.abs(y)                  // 更新data中对应数据
                })
            },

            /* 左侧列表项点击, 右侧滑到具体对应分类 */
            clickItem(index) {
                const top = this.tops[index];   // 获得点击项所在索引值对应的tops数组的对应值
                this.scrollY = top;             // 立即更新scrollY为目标值(立即选中左侧当前分类项:由scrollY计算而来)
                this.rightScroll.scrollTo(0, -top, 300)     // 让右侧列表滑动到对应位置(x, y, time)
            },

            /* 组件间调用方法: 
                父组件调用子组件的方法: ref;
                子组件调用父组件的方法: props */
            /* 点击显示具体食品详情 */
            showFood(food) {
                this.food = food;               // 将对应food食品更新到data对应数据中
                /* 通过this.$refs.food调用子组件的方法 */
                this.$refs.food.toggleShow();   // 在子组件中定义 toggleShow() 方法,然后在父组件中进行调用
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
                /* 右侧滑动时,左侧项目始终选中对应项,并可见 */
                const index = tops.findIndex((top, index) => scrollY >= top && scrollY < tops[index+1])
                if(index!==this.index && this.leftScroll) {         // 当两次下标不同,且this.leftScroll被挂载时
                    /* 将新的下标保存起来,供下次判断使用 */
                    this.index = index;                             // eslint-disable-line
                    const li = this.$refs.leftUl.children[index];   // 获得index对应的资源数li
                    /* 该方法只需要传入需要滑动到的元素和滑动所需时间, 将左侧列表滑动到当前右侧的分类处 */
                    this.leftScroll.scrollToElement(li, 300);       
                }
                return index;
            }
        },

        watch: {
            /* 通过监视vuex中state中的状态数据goods数据的变化,来确定实现 new BScroll() 的时机 */
            goods() {                       // 浅层监视goods数据变化
                this.$nextTick(() => {      // 页面再次更新时调用
                    /* 初始化滑动 */
                    this._initScroll();      // 定义实例化方法
                    /* 统计右侧所有分类li的top值所组成的数组 */
                    this._initTops();
                })
            }
        },

        components: {
            Food
        }

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
                    
        /* 食品容器 */
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
