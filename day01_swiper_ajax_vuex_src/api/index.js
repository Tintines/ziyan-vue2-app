/* 包含n个接口请求函数的模块 */
import ajax from './ajax'

/* 1. 根据经纬度获取位置详情, 传递params参数直接跟在路径后面/xxx  区别query参数xxx=yyy&ttt=uuu  !!! */
/* 此处是拼串,所以传的数字或字符串类型都一样,最终都会被拼成字符串 */
export const reqAddress = (longitude, latitude) => ajax(`/position/${latitude},${longitude}`)

/* 2. 获取食品分类列表 */
export const reqCategorys = () => ajax('/index_category')

/* 3. 根据经纬度获取商铺列表, get请求, 传递query参数对象 */
export const reqShops = ({longitude, latitude}) => ajax('/shops', {params: {longitude, latitude}})