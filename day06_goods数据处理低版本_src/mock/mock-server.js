/* 使用mockjs提供mock接口数据 */
import Mock from 'mockjs'
import data from './data.json'

/* 定义mock接口,路径为api主文件中经过base_URL基础路径的地址;如 '/api/goods' */ 
Mock.mock('/api/goods', {code: 0, data: data.goods})    // 传入json数据,自动解析成js对象
Mock.mock('/api/ratings', {code: 0, data: data.ratings})
Mock.mock('/api/info', {code: 0, data: data.info})

/* 不需要暴露,直接在主js 中进入执行即可 */
console.log('mockServer执行了.....');