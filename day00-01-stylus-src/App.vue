<template>
  <div>
    <h1>App 组件</h1>
    <button class="btn btn1">按钮1</button>
    <button class="btn btn2">按钮2</button>
    <ul>
      <li @click="choose(index)" :class="{active: navIndex === index}" v-for="(item, index) in 20" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        navIndex: 0
      }
    },
    methods: {
      choose(index){
        this.navIndex = index
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixins.styl"

  /* 定义变量 */
  $color = green

  /* 定义混合 */
  btnStyle(w, h, bg)
    width w
    height h
    border none
    background bg

  /* 定义函数 */
  add(a, b)
    a + b

  h1
    color $color
  .btn1
    btnStyle(100px, 100px, red)
    box-sizing content-box
    padding add(20px, 30)   // 函数调用传参需要加入一个单位!!!
  .btn2
    btnStyle(200px, 200px, $color)
  ul
    li
      line-height 50px
      bottom-border-1px($color)
      &.active            // 父级引用
        color red

</style>
