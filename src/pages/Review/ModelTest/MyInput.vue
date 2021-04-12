<template>
  <div>
    <!--@input此处为原生事件浏览器自动分发; 手动通过$emit分发自定义input事件 $emit('input', $event.target.value)-->
    <input type="text" :value="value" @input="$emit('input', $event.target.value)">
    <!-- 区别react写事件语句时需要包裹一层 () => {} 函数防止直接进行调用!!!-->
    <!-- 而Vue中我们自己没有包裹函数,但实际上它底层相当于使用 function($event) { } 进行包裹,
    这也就是为什么我可以在内部直接使用$event的原因所在 -->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    /* 需要先声明value值 */
    props: ['value']
  }
  
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
