<template>
  <div>
    <h2>Event2组件</h2>
    <!-- 模板对象中读取属性不需要通过this!!!!!!!!!!!! -->
    <!-- 通过Vue中 $emit() 去分发 自定义事件 ,
    内部第一个参数为自定义事件名!!!第二个参数为该自定义事件对应的 数据,需要父组件定义方法(方法名随意),接收该数据 !!-->
    <!-- @click="$emit('click', 123)" 此时外部的@click 为原生点击事件 -->
    <button @click="$emit('click', 123)">分发自定义click事件</button><br>
    <button @click="$emit('xxx', 'atguigu')">分发自定义xxx事件</button><br>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
