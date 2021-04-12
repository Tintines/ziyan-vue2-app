<template>
  <ul>
    <!-- 遍历生成多个插槽!!! 全部指定默认数据!! -->
    <li
    v-for="todo in todos"
    v-bind:key="todo.id"
  >
    <slot :todo="todo"> <!-- 将todo数据传给外部使用者, 外部决定修改哪个默认的插槽 -->
      <!-- 这里是回退内容(fallback content) -->
      <span>{{todo.text}}</span>
    </slot>
  </li>
     
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        todos: [
          {text: '吃饭1', isComplete: false},
          {text: '吃饭2', isComplete: true},
          {text: '吃饭3', isComplete: false},
        ]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
