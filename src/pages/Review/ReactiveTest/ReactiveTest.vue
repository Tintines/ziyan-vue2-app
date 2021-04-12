<template>
  <div>
    <h1>Vue的响应式原理</h1>
    <button @click="update1">更新1</button> &nbsp;
    <button @click="update2">更新2</button>&nbsp;
    <button @click="update3">更新3</button>&nbsp;
    <button @click="update4">更新4</button>&nbsp;

    <p>a==={{a}}</p>
    <p>b==={{b}}</p>
    <p>c.d==={{c.d}}</p>
    <p>c.e==={{c.e}}</p>
    <hr>
    <Reactive1 :a="a"></Reactive1>
  </div>
</template>

<script type="text/ecmascript-6">
  import Reactive1 from './Reactive1'
  /* 只有data中属性是响应式的, 只在组件对象上的属性不是响应式的
    data中所有层次属性都是响应式的 */
  export default {
    data () {
      this.b = 'b11' // data返回的数据中没有, 所以不是响应式的数据
      return {       // 组件对象上的a/c/c.d属性都是响应的
        a: 'a11',
        c: {
          d: 'd111'
        }
      }
    },

    methods: {
      update1 () {
       this.a = 'a22'
       this.c.d = 'd222'
      },

      update2 () {
        this.b = 'b22'
      },

      update3 () {
        // this.c.e = 'c2222'
        /* 组件内部使用$set即组件自身上的方法; 
        组件外部使用set,但是需要引入Vue,因为set是Vue上的方法,用法:Vue.set */
        this.$set(this.c, 'e', 'c222')
      },

      update4 () {
        this.c.e = 'eeeee'
      }
    },

    components: {
      Reactive1
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
