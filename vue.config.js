const path = require('path')
module.exports = {
  configureWebpack:{
    resolve: {
      extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
      alias: { // 路径别名(简写方式)
          // 表示精准匹配   带vue编译器
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
      }
    }
  },
  devServer:{
    proxy:{
      /* 处理以/api开头路径的请求 */
      '/api': {
        target: 'http://localhost:4000', // 转发的目标地址  http://localhost:4000/api/search/users
        pathRewrite: {
          '^/api' : ''  // 转发请求时去除路径前面的/api
        },
        changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
      },
    }
  }
}