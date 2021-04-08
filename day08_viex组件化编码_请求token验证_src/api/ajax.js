/* 
    对axios进行二次封装成一个能发送ajax请求的函数
    1. 统一处理请求异常
    2. 异步请求成功返回的数据不是response, 而是response.data
    3. 对请求体参数进行urlencoded处理, 而不是使用默认的json格式(后台接口可能不支持这种传参)
    4. 配置请求超时时间
    5. 通过请求头携带token数据
    6. 请求loading
*/
import axios from 'axios'
import qs from 'qs'
import {Indicator, Toast, MessageBox} from 'mint-ui'

import store from '@/vuex/store'
import router from '@/router'

/* 创建axios实例,通过实例进行发送请求 */
const instance = axios.create({
    // baseURL: 'http://localhost:4000',  // 直接配置完整请求地址,会出现请求跨域问题
    baseURL: '/api',                      // 配置标识地址/api ,通过本地服务器配置,来代理转发请求http://localhost:4000
    timeout: 20000                        // 4. 配置请求超时时间阈值
})

/* 添加请求拦截器 */
instance.interceptors.request.use((config)=>{
    /* 开启请求loading */
    Indicator.open();

    /* 3. 对请求体参数进行urlencode处理, 而不使用默认的json方式(后台接口可能不支持该种参数携带方式) */
    const data = config.data;
    if (data instanceof Object) {           // 是post请求体参数
        config.data = qs.stringify(data);   // 将post请求体参数 转成 urlencoded格式
    }
    /* 5. 通过请求头携带token数据 */
    /* vuex未模块化之前写法,直接从state中读取 */
    // const token = store.state.token;
    /* vuex模块化之后写法, 从对应模块中获取数据, 但要经过总state !!! */
    const token = store.state.user.token;

    /* 当有token时发送请求时同样进行添加 */
    if(token) {
        config.headers['Authorization'] = token;
    } else {    
        /* 若当前接口需要token校验(在接口中自定义该项属性),但没有token时,不发送请求,直接进入错误流程 */
        const needCheck = config.headers.needCheck;
        if(needCheck) {     // 没有token,但又需要token校验,则不发送,并抛出错误信息
            throw new Error('没有登录,不能发送请求!')
        }
        /* 没有token, 但不要对token校验, 则放行!!! */
    }
    return config;
})

/* 添加响应拦截器 */
instance.interceptors.response.use(
    response => {       // 成功的回调
        /* 关闭请求loading */
        Indicator.close();

        /* 2. 异步请求成功的数据不是response, 而是response.data */
        return response.data;
    },  
    error => {           // 失败的回调
        /* 关闭请求loading */
        Indicator.close();
        
        const response = error.response;
        if(!response) {   // 没发送请求的错误
            const path = router.currentRoute.path;  // 获取当前所处路径
            if(path!=='/login') {
                router.replace('/login');
                Toast(error.message)
            }

        } else {         // 请求发送成功,但请求失败
            // 如果响应状态码是401, 且当前没在登陆页面, 退出登陆(清除数据) 跳到登陆页面
            if(error.response.status===401) {
                const path = router.currentRoute.path;
                if(path!=='/login'){
                    store.dispatch('logout');
                    router.replace('/login');
                    Toast(error.response.data.message || '登录失败,请重新登录')
                }
            } else if(error.response.status===404){     // status为: 404: 提示访问的资源不存在
                MessageBox('提示', '访问的资源不存在')
            } else {
                /* 1. 统一处理请求异常 */
                MessageBox('提示', '请求出错: ' + error.message)
            }
        }
        
        return new Promise(() => {})    // 返回一个pending状态的promise => 中断promie链
    }
)

export default instance;