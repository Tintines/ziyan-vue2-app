/* 用户模块相关数据管理 */
import {
    RECEIVE_TOKEN,
    RECEIVE_USER,
    RESET_USER,
    RESET_TOKEN,
} from '../mutation-types'
import {
    reqAutoLogin
} from '@/api'

export default {
    state: {
        user: {},               // 用户信息
        token: localStorage.getItem('token_key' || ''),       // 当前用户登录的标记, 已在对应action中保存到了local中
    
    },

    mutations: {
        [RECEIVE_TOKEN] (state, {token}) {
            state.token = token;
        },
    
        [RECEIVE_USER] (state, {user}) {
            state.user = user;
        },
    
        /* 重置类 */
        [RESET_USER] (state) {
            state.user = {};
        },
    
        [RESET_TOKEN] (state) {
            state.user = '';
        },
    },

    actions: {
        /* 保存用户 */
        saveUser ({commit}, user) {
            const token = user.token;
            /* 将token保存到local, 进行定期时间内免登陆 */
            localStorage.setItem('token_key', token);
            /* 将token保存到state */
            commit(RECEIVE_TOKEN, {token});
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
        },

        /* 退出登录,进行一些列清除用户信息操作 */
        logout({commit}) {
            /* 清除保存的token */
            localStorage.removeItem('token_key');
            /* 重置state中的user 和 token */
            commit(RESET_USER);
            commit(RESET_TOKEN);
        },

    },

    getters: {
        
    }
}