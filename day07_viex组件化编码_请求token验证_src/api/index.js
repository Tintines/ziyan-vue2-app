/* 包含n个接口请求函数的模块 */
import ajax from './ajax'

/* 1. 根据经纬度获取位置详情, 传递params参数直接跟在路径后面/xxx  区别query参数xxx=yyy&ttt=uuu  !!! */
/* 此处是拼串,所以传的数字或字符串类型都一样,最终都会被拼成字符串 */
export const reqAddress = (longitude, latitude) => ajax(`/position/${latitude},${longitude}`)

/* 2. 获取食品分类列表 */
export const reqCategorys = () => ajax('/index_category',{
    /* 仅仅用来测试该接口需要token验证的情况!!! */
    headers: {
        needCheck: true
    }
})

/* 3. 根据经纬度获取商铺列表, get请求, 传递query参数对象 */
export const reqShops = ({longitude, latitude}) => ajax('/shops', {params: {longitude, latitude}})

/* 4. 发送短信验证码 */
export const reqSendCode = (phone) => ajax('/sendcode', {params: {phone}})

/* 5. 手机号验证码登录 */
export const reqSmsLogin = ({phone, code}) => ajax.post('/login_sms', {phone, code})

/* 6. 用户名密码登录 */
export const reqPwdLogin = ({name, pwd, captcha}) => ajax.post('/login_pwd', {name, pwd, captcha})

/* 7. 自动登录 */
export const reqAutoLogin = () => ajax.get('/auto_login')

/* 根据mock数据返回相应的数据 */
/* 获取goods */
export const reqGoods = () => ajax('/goods')
/* 获取ratings */
export const reqRatings = () => ajax('/ratings')
/* 获取info */
export const reqInfo = () => ajax('/info')