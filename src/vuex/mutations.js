/* 包含n个用于直接更新状态数据的方法的对象;
该方法不能包含异步或逻辑处理代码 */
import Vue from 'vue'
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER,
    RECEIVE_TOKEN,
    RESET_USER,
    RESET_TOKEN,
    RECEIVE_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT
} from './mutation-types'

/* 暴露的是一个对象, 其包含多个用于更新state数据状态的mutation函数方法 */
export default {    
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
    }
}