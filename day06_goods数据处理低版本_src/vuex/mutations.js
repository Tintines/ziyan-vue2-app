/* 包含n个用于直接更新状态数据的方法的对象;
该方法不能包含异步或逻辑处理代码 */
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
    RECEIVE_RATINGS
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
    
}