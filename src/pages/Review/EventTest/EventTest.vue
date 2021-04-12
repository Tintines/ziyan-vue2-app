<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 情况一: HTML标签 ,添加原生事件监听,直接@click
    浏览器自动分发事件 -->
    <button @click="test1">测试原生事件</button>

    <hr>
    <!-- 情况二: 组件标签,添加原生事件监听@click后需要添加.native修饰符!!!,此时可以被浏览器直接分发!!!
    此时相当于和HTML绑定事件监听一样
    需要添加.native修饰符,此时该点击事件被加到整个子组件身上(点击子组件区域都会响应) -->
    <Event1 @click.native="test2"/>

    <hr>
    <!-- 情况三: 组件标签,添加 自定义事件监听@click 只是名字也叫click和原生没关系,不能直接被浏览器分发; 
    需要自己在 子组件内部去定义 去手动分发该自定义名字事件; 对应方法在父组件写即可!!! -->
    <!-- 自定义监听只存在于组件标签上; 原生标签人家内部就有,你碰不到 -->
    <Event2 @click="test3" @xxx="test4" />

  </div>
</template>

<script type="text/ecmascript-6">
  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'

  export default {

    methods: {
      test1 () {
        alert('test1()')
      },
      test2 (event) {
        alert('test2()')
      },
     
      /* 定义方法,通过形参 接收子组件分发的 自定义事件及 该事件响应的数据!!!  */
      test3 (data) {
        alert('click test3()  ' + data )
      },
      test4 (data) {
        alert('xxx test4()  ' + data )
      }
    },

    components: {
      Event1,
      Event2,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
