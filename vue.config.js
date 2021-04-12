const path = require('path')
const px2rem = require('postcss-px2rem')
/* 配置postcs-px2rem */
/* 此时设计稿为375!!! 如果设置成75时,那么控制台展示375*667设备尺寸时,显示尺寸会变成一半 */
/* 即设计稿要是750,那就将控制台显示尺寸调成自定义750*1334 */
const postcss = px2rem({
  remUnit: 37.5       // 设计稿10等分之后的值，等分的比例同页面rem的比例(lib-flexible文件里面修改)是一致的
})

module.exports = {  
  /* Webpack原生配置 */
  configureWebpack:{  
    resolve: {
      extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
      alias: {                              // 路径别名(简写方式)
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
      }
    }
  },

  /* vue-li 脚手架配置, 最终都会转化为Webpack的配置 */
  /* 临时关闭eslint的警告 */
  lintOnSave: false,

  /* 是否开启带编译器的Vue版本,当组件内使用template模板时开启; 正常时不使用 */
  runtimeCompiler: false,

  /* 开发环境使用代理服务器进行转发地址配置!!!
  当打包部署到生产环境,需要使用Nginx反向代理时,需要配置Nginx配置中的转发地址!!!否则404 */
  devServer:{
    proxy:{
      /* 处理以/api开头路径的请求 */
      '/api': {
        target: 'http://localhost:4000',  // 转发的目标地址  http://localhost:4000/api/search/users
        pathRewrite: {
          '^/api' : ''                    // 转发请求时去除路径前面的/api
        },
        changeOrigin: true,               // 支持跨域, 如果协议/主机也不相同, 必须加上
      },
    }
  },
 
  css: { // 添加postcss配置
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },

  /* 国际化i18n配置 */
  pluginOptions: {
    i18n: {
      locale: 'zh_CN',
      fallbackLocale: 'en',
      localeDir: '/language/lang',
      enableInSFC: false
    }
  }
}