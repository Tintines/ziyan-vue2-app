<template>
  <div>
    B11111组件
  </div>
</template>
<script>


  export default {

    // 适用于路由组件没有缓存,若路由设置了缓存,切换时 mounted  beforeDestroy 生命周期钩子失效
    /* mounted () {
      console.log('b1 mounted()')
      this.intervalId = setInterval(() => {
        console.log('做些事件...')
      }, 1000)
    }, */

    /* beforeDestroy() {
      clearInterval(this.intervalId)
    }, */

    /* 
      适用于路由组件开启了缓存 
    */
    // 在当前组件对象被创建前调用, 不能直接访问this(不是组件对象)
    // 但可以通过next(component => {}), 在回调函数中等待组件创建后,再执行回调函数可通过this访问组件对象
    beforeRouteEnter (to, from, next) {     // 在进入该组件之前进行一些操作
      next(component => {                   // 此时通过传入组件形参, 访问组件并对组件进行相关操作
        component.intervalId = setInterval(() => {
          console.log('做些事件...')
        }, 1000)
        next()                              // 操作完之后, 必须调用 next()  进行放行
      })
    },

    // 在当前组件离开前调用, 可以访问this
    beforeRouteLeave (to, from, next) {     // 在离开该组件时进行一些操作
      clearInterval(this.intervalId)  ;     // 此时可以通过this直接访问到之前挂载到组件身上的属性或方法
      next();                               // 操作完之后, 必须调用 next()  进行放行
    }
    
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>