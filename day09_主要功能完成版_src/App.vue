<template>
  <div>   <!-- 此标签是页面最顶级外部包裹的标签, index.html中的 <div id="app"></div>最终会被销毁 -->
    <!-- 显示路由组件 -->
    <!-- 在它管理的路由间进行切换, 路由组件不会死亡 
    进行排除或包含特定组件时,需要先给组件指定特定name属性!!! -->
    <keep-alive exclude="Shop">
      <router-view></router-view>
    </keep-alive>

    <!-- 显示一般组件, 使用v-show 只显示带有路由源信息isShowFooter属性的路由 -->
    <FooterGuide v-show="$route.meta.isShowFooter"></FooterGuide>
  </div>
</template>

<script>
  /* 引入一般组件 */
  import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'

  export default {
    /* mounted方法先执行完毕,内部的函数需等待await后的promise执行完毕再继续执行;类似 ,setTimeout函数 
      此处await 后面的所有代码相当于放在.then中的成功回调函数进行执行, 
      .then很快执行, 但.then内部的成功回调函数异步执行 */
    mounted(){
      /* 页面挂载后分发对应action异步获取adress并保存到state */
      /* 直接通过调用this.$store.dispatch() 方法分发对应action即可,无需引入对应函数!!! */
      this.$store.dispatch('getAddress');

      /* 根据token自动登录 */
      this.$store.dispatch('autoLogin')
    },

    components: {
      FooterGuide
    }
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
