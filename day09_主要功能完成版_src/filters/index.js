import Vue from 'vue'
// import moment from 'moment'              // 整体引入moment, 此时不能按需打包
import format from 'date-fns/format'        // date-fns更小巧

// 自定义过滤器
/* 只适用局部模块定义 */
Vue.filter('date-format', function (value, formatStr='yyy-MM-dd kk:mm:ss') {
    return format(value, formatStr)
})

// 全部引入定义
// Vue.filter('date-format', function (value, formatStr='YYYY-MM-DD HH:mm:ss') {
//   return moment(value).format(formatStr)
// })

/* 需要在入口js文件中 进行加载*/