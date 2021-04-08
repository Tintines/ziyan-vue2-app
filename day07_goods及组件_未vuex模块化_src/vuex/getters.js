/* 包含n个基于state状态数据的getter计算属性方法的对象 */

/* 暴露的是一个对象, 其包含多个基于state状态数据的getter计算属性方法 */
export default {
    /* 总数量 */
    totalCount(state) {
        return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
    },

    /* 总价格 */
    totalPrice(state) {
        return state.cartFoods.reduce((pre, food) => pre + food.count*food.price, 0)
    }
}