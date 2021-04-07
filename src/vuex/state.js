/* 包含n个状态数据属性的对象 */

/* 暴露的是一个对象, 其包含多个state状态数据 */
export default {
    latitude: 40.10038,     // 纬度 (暂时固定值)
    longitude: 116.36867,   // 经度 (暂时固定值)
    address: {},            // 地址信息对象
    categorys: [],          // 食品分类数组
    shops: [],              // 商家数组
    user: {},               // 用户信息
    token: localStorage.getItem('token_key' || ''),       // 当前用户登录的标记, 已在对应action中保存到了local中
    info: {},               // 商家信息
    goods: [],              // 商家商品列表
    ratings: [],            // 商家评价列表
    cartFoods: [],          // 购物车中所有food数组
}