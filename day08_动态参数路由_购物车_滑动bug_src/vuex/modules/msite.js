/* 首页模块相关数据管理 */
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
  } from '../mutation-types'  
import {
    reqAddress,
    reqCategorys,
    reqShops,
} from '@/api'

export default {
    state: {
        latitude: 40.10038,     // 纬度 (暂时固定值)
        longitude: 116.36867,   // 经度 (暂时固定值)
        address: {},            // 地址信息对象
        categorys: [],          // 食品分类数组
        shops: [],              // 商家数组
    },

    mutations: {
        /* 定义使用变量名来, 引入目标值时, 需要使用 [变量名] 来读取到最终的目标值 */
        [RECEIVE_ADDRESS] (state, address) {
            state.address = address;            // 将调用该mutation传过来的参数adress 赋值更新给对应state中保存的Adress属性
        },

        [RECEIVE_CATEGORYS] (state, categorys) {
            state.categorys = categorys;
        },

        [RECEIVE_SHOPS] (state, shops) {
            state.shops = shops;
        },
    },

    actions: {
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
    },

    getters: {

    }
}