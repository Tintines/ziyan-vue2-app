<template>
  <div>
    <h2>动态组件</h2>
    <button @click="toggle">切换</button>
    <!-- 通过component标签,配合:is 指定组件保存到data中的初始值进行显示, 用来代替路由组件  -->
    <!-- 动态组件不缓存时,切换时直接死亡式切换 -->
    <component :is="currentComp"/>

   <h2>缓存动态组件</h2>
   <!-- 将组件进行缓存,区别路由组件缓存;都一样 -->
    <!-- 动态组件进行缓存,切换时不会死亡 -->
   <keep-alive>
     <component :is="currentComp"/>
   </keep-alive>
    
    <!-- 动态加载组件 
    (对应路由组件懒加载!!!) -->
    <h2>异步组件(对应路由组件懒加载!!!)</h2>
    <async-component1/>
    <async-component2/>
    <async-component3/>
    <async-component4/>

  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import DynamicComponent1 from './DynamicComponent'
  import DynamicComponent2 from './DynamicComponent2'

  // 定义全局组件为一个异步工厂函数; 
  /* 写法一: 
  函数内部直接写组件内容 */
  Vue.component('async-component1', function (resolve, reject) {
    setTimeout(function () {
      // 将组件定义对象(component definition)传递给 resolve 回调函数
      resolve({
        /* 
        此时去配置中修改启用带有template编译器的Vue的版本!!! 
        */
        template: '<div>I am async!</div>'
      })
    }, 1000)
  })

  /* 写法二: 不需要启用带编译器的Vue版本
  定义外部组件,然后内部引入即可 */
  Vue.component('async-component2', function (resolve) {
    // 这个特殊的 require 语法
    // 将指示 webpack 自动将构建后的代码，
    // 拆分到不同的 bundle 中，然后通过 Ajax 请求加载。
    setTimeout(() => {
      require(['./AsyncComponent2.vue'], resolve)
    }, 2000);
  })

  Vue.component( // 全局异步组件
    'async-component3',
    // `import` 函数返回一个 Promise.
    /* () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          import('./AsyncComponent2.vue').then(resolve)
        }, 3000);
      })
    } */
    (resolve) => {
      setTimeout(() => {
        import('./AsyncComponent2.vue').then(resolve)
      }, 3000);
    }

    /* 此写法,由于组件标签在页面中,该函数也没定时器,会被立即调用,
    但是会被单独打包 ,代码分割 ;
    这是实现路由懒加载的前提 */
    // () => import('./AsyncComponent2.vue')
  )
  
  // Promise.resolve(value)
  // Promise.resolveDelay(value, time)

  export default {
    name: 'ComponentTest',

    data () {
      return {
        currentComp: 'DynamicComponent1'
      }
    },

    methods: {
      toggle () {
        this.currentComp = this.currentComp==='DynamicComponent1' ? 'DynamicComponent2': 'DynamicComponent1'
      }
    },

    components: {
      DynamicComponent1,
      DynamicComponent2,
      'async-component4': () => import('./AsyncComponent2.vue') // 局部异步组件
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
