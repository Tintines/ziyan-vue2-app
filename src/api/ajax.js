/* 
    对axios进行二次封装成一个能发送ajax请求的函数
    1. 统一处理请求异常
    2. 异步请求成功返回的数据不是response, 而是response.data
    3. 对请求体参数进行urlencoded处理, 而不是使用默认的json格式(后台接口可能不支持这种传参)
    4. 配置请求超时时间
    5. 通过请求头携带token数据
*/
import axios from 'axios'
import qs from 'qs'

/* 创建axios实例,通过实例进行发送请求 */
const instance = axios.create({
    // baseURL: 'http://localhost:4000',  // 直接配置完整请求地址,会出现请求跨域问题
    baseURL: '/api',                      // 配置标识地址/api ,通过本地服务器配置,来代理转发请求http://localhost:4000
    timeout: 20000                        // 4. 配置请求超时时间阈值
})

/* 添加请求拦截器 */
instance.interceptors.request.use((config)=>{
  /* 3. 对请求体参数进行urlencode处理, 而不使用默认的json方式(后台接口可能不支持该种参数携带方式) */
  const data = config.data;
  if (data instanceof Object) {         // 是post请求体参数
    config.data = qs.stringify(data);   // 将post请求体参数 转成 urlencoded格式
  }
  return config;
})

/* 添加响应拦截器 */
instance.interceptors.response.use(
    response => {
        /* 2. 异步请求成功的数据不是response, 而是response.data */
        return response.data;
    },
    error => {
        console.log("请求出错"+error.message);
        /* 1. 统一处理请求异常 */
        return new Promise(() => {})    // 返回一个pending状态的promise => 中断promie链
    }
)

export default instance;