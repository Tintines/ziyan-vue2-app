/* 商家模块相关数据管理 */
import Vue from 'vue'
import {
    // RECEIVE_INFO,
    // RECEIVE_GOODS,
    // RECEIVE_RATINGS,
    RECEIVE_SHOP,           // 包含以上三个
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT,
    CLEAR_CART,
    } from '../mutation-types' 
import { 
    // reqGoods, 
    // reqInfo, 
    // reqRatings,
    reqShop                 // 包含以上三个
} from '../../api';
import {getCartFoods} from '@/utils'    // 引入工具函数

export default {
    state: {
        // info: {},               // 商家信息
        // goods: [],              // 商家商品列表
        // ratings: [],            // 商家评价列表
        shop: {},            // 包含以上三个
        cartFoods: []        // 购物车中所有food数组
    },

    mutations: {
        /* [RECEIVE_INFO] (state, {info}) {
            state.info = info;
        },
        [RECEIVE_GOODS] (state, {goods}) {
            state.goods = goods;
        },
        [RECEIVE_RATINGS](state, {ratings}) {
            state.ratings = ratings
        }, */

        /* 1. 接收一个新的商家数据 
           2. 重置上一个商家数据: 使用形参默认值 */
        [RECEIVE_SHOP](state, {shop={}, cartFoods=[]}) {
            state.shop = shop;
            state.cartFoods = cartFoods;
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
        /* async getShopInfo({commit}, callback) {
            const result = await reqInfo();
            if(result.code===0) {
                const info = result.data;
                commit(RECEIVE_INFO, {info});
                // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
                typeof callback==='function' && callback();
            }
        }, */
        /* 获取商家商品列表 */
        /* async getShopGoods({commit}, callback) {
            const result = await reqGoods();
            if(result.code===0) {
                const goods = result.data;
                commit(RECEIVE_GOODS, {goods});
                // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
                typeof callback==='function' && callback();
            }
        }, */
        /* 获取商家评价列表 */
        /* async getShopRatings({commit}, callback) {
            const result = await reqRatings();
            if(result.code===0) {
                const ratings = result.data;
                commit(RECEIVE_RATINGS, {ratings})
                typeof callback==='function' && callback();
            }
        }, */

        /* 根据params参数指定id获取对应商家数据的异步action */
        async getShop({commit, state}, id) {
            /* 防止重复请求当前商家, 进行判断 */
            if(id==state.shop.id) { return }
            /* 当前请求另一个商家, 则清除上一个商家的数据 */
            if(state.shop.id) {
                // 值为空容器中不带shop数据对象,配合对应mutation中设置对应的形参默认值为{},实现清除操作
                commit(RECEIVE_SHOP, {})
            }
            /* 此时发送请求,请求对应商家shop数据,并更新到状态中 */
            const result = await reqShop(id);
            if(result.code===0) {
                const shop = result.data;
                /* 在每次进入不同商家,商家数据回来后, 对之前是否对该商家食物加入过购物车,并存储到sessionStorage中;
                先从sessionStorage 中读取对应的 之前可能存储的食物和数量 */
                /* 需要从sessionStorage中读取对应食物和数量,并据此 加工传入的对应shop中的食物对象,
                生成包含有 动态count属性 的cartFoods数组!!! */
                const cartFoods = getCartFoods(shop);       // 定义工具函数 getCartFoods
                commit(RECEIVE_SHOP, {shop, cartFoods});    // 将加工后返回的cartFoods数组,更新到状态中
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
        },

        /* 推荐评价总数量 */
        positiveSize (state) {
            const ratings = state.shop.ratings
            return !ratings ? 0 : ratings.reduce((total, rating) => total + (rating.rateType===0 ? 1 : 0), 0)
        }
    }
}