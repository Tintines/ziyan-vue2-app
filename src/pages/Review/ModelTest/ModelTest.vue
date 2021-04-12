<template>
  <div>
    <input type="text" v-model="name"> 
    <span>{{name}}</span>
    <br>
    <!-- 
      什么时候绑定自定义? 什么时候绑定原生?
     -->

    
    <!-- 
      $event: 代表分发事件时传递的数据
      浏览器自动分发事件时, 会传递一个包含所有相关事件数据的对象(event)
    -->
    <!-- v-model双向数据绑定原理:,
    通过动态:value, 及对输入框进行输入事件监听 即@input  -->
    <input type="text" :value="name" @input="name=$event.target.value">
    <!-- 此时底层会判断fn是否为一个函数 -->
    <input type="text" :value="name" @input="fn">
    <span>{{name}}</span>  
    <hr>


    <!-- 
      在组件中绑定v-model想实现的效果:
      基于自定义组件标签的双向数据绑定;之前学的都是基于原生标签的双向数据绑定,且没有实现针对组件标签的双向数据绑定
    -->
    <!-- 通过v-model给自定义组件(只是组件内部包含有input标签)绑定 自定义v-model 双向数据监听!!! 
    区别给普通form等标签绑定双向数据绑定 ;
    v-bind单向数据绑定 -->
    <!-- 此时内部需要接收知道组件进行了数据绑定 -->
    <!-- 原理: 组件内部要去读取value值; 并进行监听在特定时期分发自定义input事件及指定最新的input值
    此处的v-model相当于给子组件传递了动态value,给子组件绑定了一个自定义的input监听!!!
    所以在子组件内部,需要 1.先声明接收该动态value值, 2.给内部的input绑定原生的@input监听,
    在监听的回调里面,分发自定义的 input事件, 同时指定最新的input值,作为数据传递给父组件内部,进行显示!!! -->
    <MyInput v-model="name3"></MyInput>
    <span>{{name3}}</span>
    
    <!-- 此时:value @input 都是自定义的 -->
    <MyInput :value="name4" @input="name4=$event"></MyInput>
    <MyInput :value="name4" @input="handleInput2"></MyInput>
    <span>{{name4}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import MyInput from './MyInput.vue'
  export default {
    data () {
      return {
        name: 'tom',
        name2: 'Jack',
        name3: 'Bob',
        name4: 'Cat'
      }
    },

    methods: {
      handleInput (event) { // 浏览器分发事件时, 指定的数据是event对象(包含所有相关数据)
        this.name2 = event.target.value
      },

      handleInput2 (value) { // 自定义事件监听, 接收什么数据是分发自定义事件时指定,内部组件进行的分发数据
        this.name4 = value
      }
    },

    components: {
      MyInput
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
