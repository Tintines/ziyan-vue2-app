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
                            <input v-model="phone" type="tel" maxlength="11" placeholder="手机号"
                                onfocus="{this.placeholder=''" onblur="this.placeholder='手机号'"
                            >
                            <button class="get_verification " :class="{right_phone_number: isRightPhone}" 
                            :disabled="!isRightPhone" @click.prevent="sendCode">获取验证码</button>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="8" placeholder="验证码">
                        </section>
                        <section class="login_hint">
                            温馨提示: 未注册外卖账号的手机号, 登录时将自动注册, 且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <div :class="{on: !isShowSms}">
                        <section class="login_message">
                            <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名">
                        </section>
                        <section class="login_verification">
                            <!-- 此处是固定字符串值, 写成变量的话要去查找变量对应的值 -->
                            <input :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码">
                            <div class="switch_button" :class="isShowPwd ? 'on' : 'off'" @click="isShowPwd=!isShowPwd">
                                <div class="switch_circle" :class="{right: isShowPwd}"></div>
                                <span class="switch_text">{{isShowPwd ? 'abc' : ''}}</span>
                            </div>
                        </section>
                        <section class="login_message">
                            <input type="text" maxlength="11" placeholder="验证码">
                            <img class="get_verification" src="./images/captcha.svg" alt="captcha">
                        </section>
                    </div>
                    <button class="login_submit">登录</button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>
        </div>
        <a href="javascript:;" class="go_back">
            <i class="iconfont icon-jiantou2"></i>
        </a>

    </section>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'Login',
        data() {
            return {
                isShowSms: true,    // true: 显示短信登陆界面,  false: 显示密码登陆界面
                phone: '',
                isShowPwd: false,   // 密码是否可见, 初始不可见
            }
        },

        computed: {
            isRightPhone() {        // 验证是否手机号码
                return /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone);
            }
        },

        methods: {
            sendCode() {
                alert('-----')
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
                                height 48px
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


</style>
