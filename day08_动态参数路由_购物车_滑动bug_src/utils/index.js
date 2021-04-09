/* 包含一些工具函数的模块 */
import Vue from 'vue'

/* 
保存指定商家的购物车数据到sessionStorage, 关闭了浏览器或当期那页面,数据消失
shopId_key: {foodId1: count1, foodId2: count2}
array.reduce(): 累计累加生成一个数值/数组/对象
*/
export function saveCartFoods(shopId, cartFoods) {
    /* 根据cartFoods生成包含所有count数量的对象容器 */
    const cartCounts = cartFoods.reduce((pre, food) => {
        /* 向pre中不断添加属性, 以食物id字符串形式作为属性key; 每遍历一次就往里面添加一次 */
        /* 此处属性名是不确定的!!! 所以使用 [] 存储的形式 */
        pre[food.id] = food.count ;
        return pre;     // 每次遍历都必须return返回pre
    }, {})
    /* 保存到sessionStorage中时,需要先将对象转变成json对象 */
    sessionStorage.setItem(shopId + '_key', JSON.stringify(cartCounts));
}

/* 
读取sessionStorage中的cartCounts;
接收对应的shop参数, 读取localStorage后,加工生成并返回一个cartFoods 
shopId_key: {foodId1: count1, foodId2: count2}
*/
export function getCartFoods(shop) {
    const cartFoods = [];
    /* 从sessionStorage中读取cartCounts , 可能有 也可能 没有!!! */
    const cartCounts = JSON.parse(sessionStorage.getItem(shop.id + '_key')) || {};
    /* 遍历找到所有需要添加响应式count属性的food */
    shop.goods.forEach(good => {                    // 得到大类    
        good.foods.forEach(food => {                // 得到大类中的小类
            /* 取出food在cartCounts中可能保存的count属性(可能没有) */
            const count = cartCounts[food.id];      // cartCounts为对象类型
            if(count>0) {                           // 有count 才进行添加恢复其count属性
                // food.count = count  此方法为非响应式添加属性
                Vue.set(food, 'count', count);      // 对food进行 响应式添加 count属性
                cartFoods.push(food);               // 将包含有count属性的food添加到目标数组中
            }
        })
    })
    return cartFoods;
}