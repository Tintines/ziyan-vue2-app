/* 使用mockjs提供mock接口数据 */
import Mock from 'mockjs'
import data from './data.json'      // 模拟单个商家固定数据,不需要路径传参;开发用调试用

import shops from './shops.json'    // 模拟多个商家不同的不同数据,通过params传参获取;接近真实环境

/* 定义mock接口,路径为api主文件中经过base_URL基础路径的地址;如 '/api/goods' */ 
/* 此时未针对特定商家!! */
Mock.mock('/api/goods', {code: 0, data: data.goods})    // 传入json数据,自动解析成js对象
Mock.mock('/api/ratings', {code: 0, data: data.ratings})
Mock.mock('/api/info', {code: 0, data: data.info})

/* 重点: 通过路径传参,获取对应ID商家的数据 */
/* 根据请求在id参数返回对应的商家数据,注意请求商家的  路径/api/shop/12 为shop路由具体中的店铺 */
Mock.mock(/^\/api\/shop\/\d+$/, function (options) {    // options参数中,包含发送的路径 /api/shop/12
    // console.log(options);
    const id = options.url.substring(10);           // 截取路径中传递的params参数
    const shop = shops.find(shop => shop.id==id);   // 从模拟数据中查找对应ID的商家数据
    /* 返回查找到的商家数据, 若数据库中没有对应的params对应的商家时, 默认返回第一个商家shops[0] */
    return Mock.mock({code: 0, data: shop || shops[0]});
})

/* 不需要暴露,直接在主js 中进入执行即可 */
/* 测试是否运行 */
// console.log('mockServer执行了.....');