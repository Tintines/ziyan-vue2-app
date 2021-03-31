/* 包含n个用于间接更新状态数据的方法的对象
方法可以包含异步和逻辑处理代码 */
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS
  } from './mutation-types'  
import {
    reqAddress,
    reqCategorys,
    reqShops
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
    }
}