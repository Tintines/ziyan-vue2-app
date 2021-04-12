<template>
    <section class="profile">
        <Header title="个 人" class="text_align"/>
        <!-- 通过判断状态中是否存有user._id 来判断用户当前处于什么状态, 若登录,点击去用户信息; 没登录,点击去登陆 -->
        <section class="profile-number" @click="$router.push(user._id ? '/userinfo' : '/login')">
            <a href="javascript:;" class="profile-link">
                <!-- 头像 -->
                <div class="profile_image">
                    <i class="iconfont icon-person"></i>
                </div>
                <div class="user-info">
                    <!-- 使用v-if 来进行判断,是否显示 -->
                    <span v-if="!user.phone" class="user-info-top">{{user.name ? user.name :'登录/注册'}}</span>
                    <div v-if="!user.name">
                        <span class="user-icon">
                            <i class="iconfont icon-shouji icon-mobile"></i>
                        </span>
                        <span class="icon-mobile-number">{{user.phone? user.phone : '暂无绑定手机号'}}</span>
                    </div>
                </div>
                <span class="arrow">
                    <i class="iconfont icon-jiantou1"></i>
                </span>
            </a>
        </section>
        <section class="profile_info_data">
            <div class="info_data_list">
                <a href="javascript:;" class="info_data_link">
                    <span class="info_data_top"><span>0.00</span>元</span>
                    <span class="info_data_bottom">我的余额</span>
                </a>
                <a href="javascript:;" class="info_data_link line">
                    <span class="info_data_top"><span>0</span>个</span>
                    <span class="info_data_bottom">我的优惠</span>
                </a>
                <a href="javascript:;" class="info_data_link">
                    <span class="info_data_top"><span>0.00</span>分</span>
                    <span class="info_data_bottom">我的积分</span>
                </a>
            </div>
        </section>
        <section class="profile_my_order">
            <!-- 我的订单 -->
            <a href="javascript:;" class="my_order">
                <div class="my_order_div">
                    <span class="my_order_icon">
                        <i class="iconfont icon-order-s"></i>
                    </span>
                    <span class="list_title">我的订单</span>
                </div>
                <span>
                    <i class="iconfont icon-jiantou1 jiantou1"></i>
                </span>
            </a>
            <a href="javascript:;" class="my_order">
                <div class="my_order_div">
                    <span class="my_order_icon">
                        <i class="iconfont icon-jifen"></i>
                    </span>
                    <span class="list_title">积分商城</span>
                </div>
                <span>
                    <i class="iconfont icon-jiantou1 jiantou1"></i>
                </span>
            </a>
            <a href="javascript:;" class="my_order">
                <div class="my_order_div">
                    <span class="my_order_icon">
                        <i class="iconfont icon-vip"></i>
                    </span>
                    <span class="list_title">硅谷外卖会员卡</span>
                </div>
                <span>
                    <i class="iconfont icon-jiantou1 jiantou1"></i>
                </span>
            </a>
            <a href="javascript:;" class="my_order">
                <div class="my_order_div">
                    <span class="my_order_icon">
                        <i class="iconfont icon-fuwu"></i>
                    </span>
                    <span class="list_title">服务中心</span>
                </div>
                <span>
                    <i class="iconfont icon-jiantou1 jiantou1"></i>
                </span>
            </a>
        </section>
        <!-- 退出登录 -->
        <!-- 用户登录后才显示退出按钮 -->
        <section v-show="user._id" class="profile_my_order logout">
            <mt-button style="width: 100%" type="danger" @click="logout">退出登陆</mt-button>
        </section>


        <!-- 测试路由导航!!! -->
        <section class="profile_my_order border-1px">
            <router-link to="/a">AAA</router-link>&nbsp;&nbsp;
            <router-link to="/b">BBB</router-link>&nbsp;&nbsp;
            <router-link to="/login">去登陆</router-link>
        </section>
    </section>
    
</template>

<script type="text/ecmascript-6">
    import {mapState} from 'vuex'
    import {MessageBox} from 'mint-ui'

    export default {
        computed: {
            // ...mapState(['user']),   // 非vuex时写法
            ...mapState({
                user: state => state.user.user
            })
        },
        methods: {
            logout() {
                MessageBox.confirm('确认执行此操作?').then(     // 返回的是一个promise对象
                    () => {
                        this.$store.dispatch('logout');
                    },
                    () => {
                        console.log('点击了取消操作');
                    }
                )
            }
        }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixins.styl'
    /* 我的 */
    .profile
        width 100%
        overflow hidden
        /* 通过给主组件天机额外class 修正其出现的问题 */
        .text_align
            text-align center 
        .profile-number
            .profile-link
                clearFix()
                position relative 
                display block 
                background $green
                padding 20px 10px
                .profile_image
                    display block           // 除img下缝隙
                    float left 
                    width 60px
                    height 60px
                    border-radius 50%
                    overflow hidden
                    .icon-person
                        font-size 62px
                        background #e4e4e4
                .user-info 
                    float left 
                    margin 8px 0 0 15px
                    font-size 18px
                    color #fff
                    .user-info-top 
                        font-weight 700
                    div
                        margin-top 4px
                        height 20px
                        .user-icon 
                            line-height 20px
                            margin-left -15px
                            margin-right -6px
                            .icon-mobile 
                                font-size 28px
                        .icon-mobile-number 
                            vertical-align top
                            line-height 20px 
                            font-size 14px
                            color #fff
                .arrow
                    width 12px
                    height 12px
                    position absolute 
                    right 15px
                    top 40%
                    .icon-jiantou1
                        font-weight bold
                        font-size 16px
                        color #fff

        .profile_info_data
            bottom-border-1px(#e4e4e4)
            width 100%
            background #fff
            /* 溢出截断,还可以除掉可能出现的滚动条 */
            overflow hidden
            .info_data_list
                display flex 
                flex-direction row
                // justify-content space-around 
                text-align center 
                .info_data_link
                    width 33%
                    &.line
                        border-right 1px solid #f1f1f1
                        border-left 1px solid #f1f1f1
                    .info_data_top 
                        display block
                        width 100%
                        font-size 14px
                        color #333
                        padding 15px 5px 10px
                        span
                            display inline-block
                            font-size 30px
                            font-weight 700
                            line-height 30px
                            color #f90
                    .info_data_bottom
                        display block
                        font-size 14px
                        color #666
                        font-weight 400
                        padding-bottom 10px
                /* 保留原标签时需要放到后面会影响上面的样式/ 或直接添加新class设置 */
                .info_data_link:nth-child(1) 
                    .info_data_top
                        span
                            color #ff5f3e
                .info_data_link:nth-child(2) 
                    .info_data_top
                        span
                            color #6ac20b     
        .profile_my_order 
            margin-top 10px
            background #fff
            .my_order
                height 40px
                display flex 
                padding 0 12px 0 15px
                font-size 16px
                bottom-border-1px(#e4e4e4)
                /* iconfont 图标处理细节 */
                position relative
                .list_title
                    line-height 40px
                    margin-left 32px
                .iconfont
                    position absolute
                .icon-order-s
                    top 5px
                    font-size 32px
                    color #02a774
                .icon-jifen
                    top 5px
                    font-size 32px
                    color #ff5f3e
                .icon-vip
                    top 9px
                    margin-left 5px
                    font-size 22px
                    color #f90
                .icon-fuwu
                    top 10px
                    margin-left 5px
                    font-size 22px
                    color #02a774
                .jiantou1
                    top 50%
                    transform translateY(-50%)
                    right 12px
                /* 利用父级引用,除掉最后一个元素的下边界 */
                &:last-child 
                    bottom-border-1px(#fff)
            &.logout
                margin-top 50px

</style>
