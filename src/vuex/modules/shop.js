/* 商家模块相关数据管理 */
import Vue from 'vue'
import {
    RECEIVE_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT,
    CLEAR_CART
  } from '../mutation-types' 
import { reqGoods, reqInfo, reqRatings } from '../../api';

export default {
    state: {
        info: {},               // 商家信息
        goods: [],              // 商家商品列表
        ratings: [],            // 商家评价列表
        cartFoods: [],          // 购物车中所有food数组
    },

    mutations: {
        [RECEIVE_INFO] (state, {info}) {
            state.info = info;
        },
    
        [RECEIVE_GOODS] (state, {goods}) {
            state.goods = goods;
        },
    
        [RECEIVE_RATINGS](state, {ratings}) {
            state.ratings = ratings
        },
        
        [ADD_FOOD_COUNT](state, {food}) {
            if(food.count) {    // food有count时,初始化时没有,必然经历了手动添加后才能进入语句
                food.count++
            } else {
                // 如果food中没有count, 给food添加count属性, 值为1
                // 问题: 给响应式对象添加一个新的属性, 没有数据绑定效果(不是响应式的)
                // food.count = 1     非响应式数据绑定
                // 解决: 给响应式对象添加一个响应式属性  Vue.set( target, key, value )
                /* 需要引入Vue */
                Vue.set(food, 'count', 1)   // 添加相应属性'count' 值为1
    
                /* 使CartControl和ShopChart数据共用;原理:同时指向同一个引用数据类型 数组
                当前数量大于1时将当前food添加到购物车数组中 */
                state.cartFoods.push(food); // 此时,count属性包含在food数组中
            }
        },
    
        [REDUCE_FOOD_COUNT](state, {food}) {
            if(food.count>0) {   // 大于0时进入,对food身上的count操作,(添加属性时才使用响应式绑定)
                food.count --
                /* 当food数量变为0时,将当前food从购物车数组中移除 */
                if(food.count===0) {
                    let index = state.cartFoods.indexOf(food);
                    state.cartFoods.splice(index, 1);
                }
            }
        },
    
        [CLEAR_CART] (state) {
            /* 需要先将cartFoods中所food的count变为0 !!! */
            state.cartFoods.forEach(food => food.count = 0);
            /* 再重置购物车数组; 不能直接重置(此时其他组件读到count值还在) */
            state.cartFoods = [];
        },
    },

    actions: {
        /* 异步获取商家信息 */
        async getShopInfo({commit}, callback) {
            const result = await reqInfo();
            if(result.code===0) {
                const info = result.data;
                commit(RECEIVE_INFO, {info});
                /* 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件 */
                typeof callback==='function' && callback();
            }
        },
        /* 获取商家商品列表 */
        async getShopGoods({commit}, callback) {
            const result = await reqGoods();
            if(result.code===0) {
                const goods = result.data;
                commit(RECEIVE_GOODS, {goods});
                /* 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件 */
                typeof callback==='function' && callback();
            }
        },
        /* 获取商家评价列表 */
        async getShopRatings({commit}, callback) {
            const result = await reqRatings();
            if(result.code===0) {
                const ratings = result.data;
                commit(RECEIVE_RATINGS, {ratings})
                typeof callback==='function' && callback();
            }
        },

        /* 更新food中的数量的同步action */
        updateFoodCount({commit}, {isAdd, food}) {
            if(isAdd) {
                commit(ADD_FOOD_COUNT, {food});
            } else {
                commit(REDUCE_FOOD_COUNT, {food});
            }
        }
    },

    getters: {
        /* 总数量 */
        totalCount(state) {
            return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
        },

        /* 总价格 */
        totalPrice(state) {
            return state.cartFoods.reduce((pre, food) => pre + food.count*food.price, 0)
        }
    }
}