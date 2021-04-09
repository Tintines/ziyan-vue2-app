<template>
    <section class="cartcontrol">
        <!-- 该对应food中后续手动增加或减少保存了count属性时,进行显示 -->
        <transition name="move">
            <div class="iconfont icon-remove_circle_outline" 
            v-if="food.count>0" @click.stop="updateFoodCount(false)"></div>
        </transition>
        <!-- 该对应food中后续手动增加或减少保存了count属性时再进行显示 -->
        <div class="cart-count" v-if="food.count>0">{{food.count}}</div>
        <!-- 当点击项时间的下方的其他元素还绑定有其他事件时, 上面的点击事件需要阻止其冒泡 -->
        <div class="iconfont icon-add_circle" @click.stop="updateFoodCount(true)"></div>
    </section>
</template>

<script type="text/ecmascript-6">
    import throttle from 'lodash/throttle'      // 节流
    export default {
        props: {
            food: Object        // 由父组件通过标签属性传递过来,对应当前的具体食品
        },

        methods: {
            /* 一个函数实现两种功能, 通过传递得的参数加以区分 */
            /* 使用throttle对原函数进行包裹节流此时不能使用箭头函数; 
            对处理事件的函数节流处理, 传入回调函数 和 间隔时间 */
            /* 默认throttle点击一次响应两次,且第二次在设置的时间后执行;
            此时需要配置{trailing: false} 使得1s内多次点击时,也只响应第一次点击 */
            updateFoodCount: throttle(function (isAdd) {
                /*  问题1: 不应该直接在此更新, 这个数据不是当前组件的数据(数据谁的,更新数据的行为就在哪)
                    问题2: 开始count值是undefined, 原数据中不存在,是通过后期自己添加的 */
                // this.food.count++
                /* 传参参数设计: 是＋还是－, 对谁进行该操作? */
                this.$store.dispatch('updateFoodCount', {isAdd, food: this.food})
            }, 1000, {trailing: false})
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .cartcontrol
        .icon-remove_circle_outline
            display inline-block
            padding 6px
            font-size 20px
            line-height 20px
            color $green
            &.move-enter-active, &.move-leave-active 
                transition all .5s
            &.move-enter, &.move-leave-to 
                opacity 0
                transform translateX(15px) rotate(180deg)
        .cart-count 
            display inline-block
            width 12px
            padding-top 6px
            font-size 16px
            line-height 20px
            text-align center 
            vertical-align top 
            color: rgb(147, 153, 159)
        .icon-add_circle 
            display inline-block
            padding 6px
            font-size 20px
            line-height 20px
            color $green
</style>
