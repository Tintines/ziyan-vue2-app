<template>
  <div>
    <h1>App 组件</h1>
    <p>测试适配</p>
    <div class="box">
      box
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixins.styl"
  h1 
    font-size 10px
  p
    width 375px
    height 100px
    background green
    
  .box
    width 750px
    height 750px
    background red
    font-size 200px

</style>
