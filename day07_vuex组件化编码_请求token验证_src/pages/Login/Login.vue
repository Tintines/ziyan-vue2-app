<template>
    <section class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">硅谷外卖</h2>
                <div class="login_header_title">
                    <a href="javascript:;" :class="{on: isShowSms}" @click="isShowSms=true">短信登录</a>
                    <a href="javascript:;" :class="{on: !isShowSms}" @click="isShowSms=false">密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form>
                    <div :class="{on: isShowSms}">
                        <section class="login_message">
                            <input name="phone" v-model="phone" v-validate="'required|mobile'" type="text" maxlength="11" placeholder="手机号"
                                onfocus="this.placeholder=''" onblur="this.placeholder='手机号'">
                            <!-- 按钮button 需要组织表单默认行为, 给div img 等添加的点击事件 则不需要添加阻止默认行为 -->
                            <button class="get_verification " :class="{right_phone_number: isRightPhone && !computeTime}" 
                            :disabled="!isRightPhone || computeTime>0" @click.prevent="sendCode">{{computeTime>0 ? `短信已发送${computeTime}s` : '获取验证码'}}</button>

                            <!-- 表单验证文字项 对应表单中的 name 属性 -->
                            <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>

                        </section>
                        <section class="login_verification">
                            <input name="code" v-model="code" type="text" maxlength="8" placeholder="验证码"
                                v-validate="{required: true, regex: /^\d{6}$/}"
                            >
                            <!-- 验证不通过展示的文字 -->
                            <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>

                        </section>
                        <section class="login_hint">
                            温馨提示: 未注册外卖账号的手机号, 登录时将自动注册, 且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <div :class="{on: !isShowSms}">
                        <section class="login_message">
                            <input name="name" v-model="name" v-validate="'required'" type="text" maxlength="11" placeholder="手机/邮箱/用户名">
                            <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                        </section>
                        <section class="login_verification">
                            <!-- 此处是固定字符串值, 写成变量的话要去查找变量对应的值 -->
                            <input :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码"
                                name="ped" v-model="pwd" v-validate="'required'"
                            >
                            <div class="switch_button" :class="isShowPwd ? 'on' : 'off'" @click="isShowPwd=!isShowPwd">
                                <div class="switch_circle" :class="{right: isShowPwd}"></div>
                                <span class="switch_text">{{isShowPwd ? 'abc' : ''}}</span>
                            </div>
                            <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
                        </section>
                        <section class="login_message">
                            <input type="text" maxlength="11" placeholder="验证码" name="captcha" v-model="captcha"
                                v-validate="{required: true, regex: /^[0-9a-zA-Z]{4}$/}"
                            >
                            <!-- <img class="get_verification" src="/api/captcha" alt="captcha"> -->
                            <!-- 一加载就使用自己原本的src进行跨域请求!!! 再次调用时才会使用到我们定义的获取新验证码的方法 -->
                            <!-- 这里用到本地服务器转发请求的方法简化路径的写法 完整路径http://localhost:4000/captcha -->
                            <img ref="captcha" class="get_verification" src="/api/captcha" @click="updateCaptcha" alt="captcha">
                            <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                        </section>
                    </div>
                    <!-- {{$t('login_login')}} 应用国际化写法 -->
                    <button class="login_submit" @click.prevent="login">{{$t('login_login')}}</button>
                </form>
                <a href="javascript:;" class="about_us">{{$t('login_aboutUs')}}</a>
            </div>
        </div>
        <a href="javascript:;" class="go_back" @click="$router.replace('/profile')">
            <i class="iconfont icon-jiantou2"></i>
        </a>
        <button class="lang" @click.prevent="toggleLanguage">{{$t('languages')}}</button>
    </section>
</template>

<script type="text/ecmascript-6">
    import {Toast, MessageBox} from 'mint-ui'
    export default {
        name: 'Login',
        data() {
            return {
                isShowSms: true,    // true: 显示短信登陆界面,  false: 显示密码登陆界面
                isShowPwd: false,   // 密码是否可见, 初始不可见
                phone: '',          // 手机号
                code: '',           // 短信验证码
                name: '',           // 用户名
                pwd: '',            // 密码
                captcha: '',        // 图形验证码
                computeTime: 0      // 验证码倒计时初始时间
            }
        },


        computed: {
            /* 验证是否手机号码 */
            isRightPhone() {        
                return /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone);
            }
        },

        methods: {
            /* 发送验证码 */
            async sendCode() {
                /* 倒计时效果 */
                this.computeTime = 60;
                const intervalId = setInterval(() => {
                  this.computeTime -- ;
                  if(this.computeTime<=0) {
                      this.computeTime = 0;
                      clearInterval(intervalId);
                  }
                }, 1000);

                /* 向服务器发请求, 此时不需要数据共享,直接通过api接口发送即可 */
                const result = await this.$API.reqSendCode(this.phone);
                console.log(result);
                if (result.code===0) {
                    Toast('验证码短信已发送');
                } else {
                    /* 发送失败停止倒计时, 并使得发送按钮可再次被点击 */
                    this.computeTime = 0;
                    MessageBox('提示', result.msg || '发送失败');
                }
            },

            /* 更新验证码 */
            updateCaptcha() {
                /* 通过ref属性修改该src值, 同时通过img标签发送请求处理兼容IE时,需要加上 时间戳 */
                this.$refs.captcha.src = `http://localhost:4000/captcha?time=${Date.now()}`;
            },

            /* 完成登录验证 */
            async login() {
                /* 1. 进行前台表单验证 */
                let names;
                /* 对不同的登录方式进行判断, 得到相应的表单验证数组 */
                if(this.isShowSms) {
                    names = ['phone', 'code']
                } else {
                    names = ['name', 'pew', 'captcha']
                }
                /* 通过validateAll方法, 对指定names的表单项进行验证: 返回布尔值 */
                const success = await this.$validator.validateAll(names);
                /* 2. 如果验证通过, 发送登录的请求 */
                let result;             // 定义在函数外部, 这样可以统一处理这两个请求的结果,而不需要额外定义变量
                if(success) {
                    /* 2.1 收集表单项 */
                    const {isShowSms, phone, code, name, ped, captcha} = this;
                    /* 2.2 判断用户登录的方式 */
                    if(isShowSms) {     // 短信登录
                        /* 之前直接通过$API发送请求拿到的数据没经过vuex中action发送管理,现在需要把请求回来的数据交给vuex进行管理
                        区别: 有的方法直接通过action在其内部调用api方法进行 接口的请求 */
                        result = await this.$API.reqSmsLogin({phone, code});
                    } else {            // 密码登录
                        result = await this.$API.reqPwdLogin({name, ped, captcha});
                        this.updateCaptcha();       // 更新图形验证码
                        this.captcha = '';          // 清空之前的验证码
                    }

                    /* 3. 根据请求结果, 做不同响应处理 */
                    if(result.code===0) {           // 登录成功
                        const user = result.data;
                        /* 将user包含token保存到vuex中的状态state中 */
                        this.$store.dispatch('saveUser', user);  

                        /* 登录成功直接跳转个人中心, 直接replace */
                        this.$router.replace({path: '/profile'});
                    } else {                        // 登录失败
                        MessageBox('提示', result.msg);
                    }
                }
            },

            /* 切换语言 */
            toggleLanguage() {
                /* 根据当前语言得到新语言 */
                const locale = this.$i18n.locale === 'en' ? 'zh_CN' : 'en';
                /* 制定新的语言 */
                this.$i18n.locale = locale;

                /* 将新的语言保存到localStorage中, 使得页面刷新,i18n.js语言初始化可以优先从localStorage中读取 */
                localStorage.setItem('locale_key', locale);
            }
        }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixins.styl'
    .loginContainer
        width 100%
        height 100%
        background #fff
        .loginInner
            padding-top 60px
            width 80%
            margin 0 auto
            position relative
            .login_header
                .login_logo
                    font-size 40px
                    font-weight bold 
                    color $green
                    text-align center
                .login_header_title
                    padding-top 40px
                    text-align center
                    &>a
                        color #333
                        font-size 14px
                        padding-bottom 4px
                        &:first-child
                            margin-right 40px
                        &.on
                            color $green
                            font-weight 700
                            border-bottom 2px solid $green
            .login_content
                >form
                    >div 
                        display none 
                        &.on
                            display block
                        input 
                            width 100%
                            height 100%
                            padding-left 10px
                            box-sizing border-box
                            border 1px solid #ddd
                            border-radius 4px
                            outline none 
                            font 400 14px Arial 
                            &:focus
                                border 1px solid $green
                            &::placeholder      // 修改placeholder样式
                                color #ccc
                        .login_message
                            position relative 
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff
                            .get_verification
                                position absolute
                                top 50%
                                transform translateY(-50%)
                                right 10px
                                border none
                                color #ccc
                                font-size 14px
                                background transparent
                                &.right_phone_number
                                    color $green
                                &.onComputeTime     // 倒计时文本样式
                                    color #ccc
                        .login_verification
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff

                            /* 账号登录 */
                            .switch_button
                                width 30px
                                height 16px
                                font-size 12px
                                line-height 16px
                                color #fff
                                border 1px solid #ddd
                                border-radius 8px
                                padding 0 6px
                                position absolute 
                                right 10px
                                top 50%
                                transform translateY(-50%)
                                transition background-color .3s, border-color .3s
                                &.off
                                    background #fff
                                    .switch_text
                                        float right 
                                        color #ddd
                                &.on
                                    background $green
                                >.switch_circle
                                    position absolute 
                                    top -1px
                                    left -1px
                                    width 16px
                                    height 16px
                                    border 1px solid #ddd
                                    border-radius 50%
                                    background #fff
                                    box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                                    transition transform .3s
                                    &.right 
                                        transform translateX(27px)
                                    /* 短信登录样式结束 */

                        .login_hint
                            margin-top 12px
                            color #999
                            font-size 12px
                            line-height 20px
                            >a 
                                color $green
                    .login_submit     
                        position absolute       // 子绝父相 loginInner
                        top 400px
                        width 100%
                        height 42px
                        // margin-top 300px
                        border-radius 4px
                        background #4cd96f
                        color #fff
                        text-align center 
                        font-size 16px
                        line-height 42px
                        border 0
                .about_us
                    position absolute
                    left 50%
                    transform translateX(-50%)
                    top 450px
                    font-size 12px
                    text-align center 
                    color #999
        .go_back 
            position absolute 
            top 5px
            left 5px
            width 30px
            height 30px
            text-align center
            >.iconfont
                display inline-block
                line-height 30px
                font-size 20px
                color #999
        .lang
            position absolute 
            top 16px
            right 8px
            border none 
            color #41d9aa
            font-size 12px
            background-color transparent

</style>
