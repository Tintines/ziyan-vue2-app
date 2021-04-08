<template>
    <section>
        <div class="shopcart">
            <div class="content">
                <div class="content-left" @click="toggleShow">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{highlight: totalCount>0}">
                            <i class="iconfont icon-shopping_cart" :class="{highlignt: totalCount>0}"></i>
                        </div>
                        <div class="num" v-show="totalCount">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{highlight: totalCount>0}">￥{{totalPrice}}</div>
                    <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
                </div>
                <div class="content-right">
                    <div class="pay" :class="payClass">{{payText}}</div>
                </div>
            </div>
            <transition name="move">
                <!-- 此时必须使用v-show,缓存之前添加的样式!!! 不然使用v-if时,后生成的标签之前的样式添加不上,不能回头 -->
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h2 class="title">购物车</h2>
                        <span class="empty" @click="clearCart">清空</span>
                    </div>
                    <div class="list-content" ref="foods">
                        <ul>
                            <li class="food" v-for="(food) in cartFoods" :key="food.name">
                                <span class="name">{{food.name}}</span>
                                <div class="price"><span>￥{{food.price}}</span></div>
                                <div class="cartcontrol-wrapper">
                                    <CartControl :food="food"/>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <!-- 遮罩层 -->
        <transition>
            <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
        </transition>
    </section>
</template>

<script type="text/ecmascript-6">
    import {mapState, mapGetters} from 'vuex'
    import BScroll from 'better-scroll'
    import {MessageBox} from 'mint-ui'
    import {CLEAR_CART} from '@/vuex/mutation-types.js'
    export default {
        data() {
            return {
                isShow: false
            }
        },

        computed: {
            ...mapState(['info', 'cartFoods']),
            ...mapGetters(['totalCount', 'totalPrice']),

            /* 通过总价格和最低价格比较来确定该 class 值 */
            payClass() {
                const {totalPrice} = this;
                const {minPrice} = this.info;
                return minPrice > totalPrice ? 'not-enough' : 'enough';
            },

            /* 计算得到显示文字信息 */
            payText() {
                const {totalPrice} = this;
                const {minPrice} = this.info;
                if(totalPrice===0) {
                    return `￥${minPrice}元起送`
                } else if(totalPrice<minPrice) {
                    return `还差￥${minPrice-totalPrice}元起送`
                } else {
                    return '去结算'
                }
            },

            /* 由是否添加有购物项,来确定是显示还是隐藏 */
            listShow() {
                /* 若没有购物项, 直接隐藏 */
                if(this.totalCount===0) {
                    this.isShow = false;        // eslint-disable-line
                    return false
                }
                /* 
                    问题: 如果创建了多个scroll对象, 点击时会导致事件有多次响应
                    解决: 让Bscroll对象只创建一个
                    单例: 单一的实例
                    思路
                    1. 创建前: 判断对象不存在
                    2. 创建后: 保存对象
                */
                /* 如果当前isShow为true, 则购物车列表即将显示 */
                if(this.isShow) {
                    this.$nextTick(() => {      // 下次更新渲染时调用
                        if(!this.scroll) {      // 还没生成实例
                            /* 生成一个实例对象,并保存在该组件this上,用于下次显示进行判断 */
                            this.scroll = new BScroll(this.$refs.foods, {click: true}); // eslint-disable-line
                        } else {
                            /* 当内容不断增高,高于父元素高度时,重新计算子元素总高度,并进行刷新,来决定是否形成滑动 */
                            this.scroll.refresh();
                        }
                    })
                }
                return this.isShow;
            },
        },

        methods: {
            /* 遮罩切换 */
            toggleShow() {
                /* 只有当购物车项不为空时才进行切换 */
                if (this.totalCount>0) {
                    this.isShow = !this.isShow;
                }
            },

            /* 清空列表 */
            clearCart() {
                MessageBox.confirm('确定清除吗?').then(
                    () => {
                        this.$store.commit(CLEAR_CART)
                    }
                )
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  /* 样式没动 */
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: $green
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition all .5s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateY(0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: opacity 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>