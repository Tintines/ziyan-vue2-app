/* 包含n个用于间接更新状态数据的方法的对象
方法可以包含异步和逻辑处理代码 */
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECETIVE_TOKEN,
    RECEIVE_USER
  } from './mutation-types'  
import {
    reqAddress,
    reqCategorys,
    reqShops,
    reqAutoLogin
} from '@/api'

/* 暴露的是一个对象, 其包含多个用于分发对应mutation函数从而间接更新state状态数据函数方法 */
export default {
    /* 获取当前地址信息对象的异步action */
    async getAddress({commit, state}) {
        /* 从状态中获取固定经纬度数据, 以后去换成动态值即可 */
        const {longitude, latitude} = state;
        const result = await reqAddress(longitude, latitude);   // 发送异步请求
        if(result.code===0) {                                   // 请求成功后提交给对应mutation
            const address = result.data;
            commit(RECEIVE_ADDRESS, address);
        }
    },

    /* 获取商品分类数组的异步action  不一定需要传递参数(由对应接口来确定) */
    async getCategory({commit}) {
        const result = await reqCategorys();
        if(result.code===0) {
            const categorys = result.data;
            commit(RECEIVE_CATEGORYS, categorys);
        }
    },

    /* 获取商家数组的异步action */
    async getShops({commit, state}) {
        /* 先从状态中获取固定所需经纬度 */
        const {longitude, latitude} = state;
        const result = await reqShops({longitude, latitude});
        if(result.code===0) {
            const shops = result.data;
            commit(RECEIVE_SHOPS, shops);
        }
    },

    /* 保存用户 */
    saveUser ({commit}, user) {
        const token = user.token;
        /* 将token保存到local, 进行定期时间内免登陆 */
        localStorage.setItem('token_key', token);
        /* 将token保存到state */
        commit(RECETIVE_TOKEN, {token});
        /* 删除user内部的token */
        delete user.token;
    
        /* 将user保存到state */
        commit(RECEIVE_USER, {user})
    },

    /* 自动登录的action */
    async autoLogin({commit, state}) {
        if(state.token && !state.user._id) {    // 状态当前有token,该state中状态初始化先从local中读取没有则为'' 且当前用户没有登录
            const result = await reqAutoLogin();
            if(result.code===0) {
                const user = result.data;       // 服务器返回的数据,此时不包含token
                commit(RECEIVE_USER, {user})    // 存储到状态中!! 就不需要重走登录流程获取用户信息的流程了
            }
        }
    }



}
