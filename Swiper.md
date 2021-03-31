## 真实要了老命
yarn add swiper@5.x vue-awesome-swiper

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  }
}


<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          },
          // 所有配置均为可选（同Swiper配置）
          initialSlide: 0,
          pagination:'.swiper-pagination',
          // pagination: {
          //  el: '.swiper-pagination'
          // },
          loop: true,
          speed: 400,
          direction: 'horizontal',
          paginationClickable: true,
          mousewheelControl: true,
          autoplay: 1000,
          //autoplay: true,
          autoplayDisableOnInteraction: false,
          observer: true,
          observeParents: true,
          debugger: true,
          onTransitionStart (swiper) {
            console.log(swiper)
          }
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      console.log('Current Swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    }
  }
</script>


/* 检查元素将其内部选择器拿出,重写进行覆盖,来控制导航点位置 */
    .swiper-pagination-bullets 
        bottom 2px    
        left 0        // 控制水平位置
        width 100%

<script>
/* 轮播图 */
.swiper-container,
.swiper-slide img {
  width: 322px;
  height: 158px;
}

/* 自定义分页器盒子样式 */
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 10px;
  left: 0;
  width: 6px;
  display: flex;
  justify-content: center;
}

/* 自定义分页器样式 */
.swiper-pagination-bullet {
  width: 6px;
  height: 6px;
  display: inline-block;
  border-radius: 100%
  background: none;
  border: 1px solid #fff;
  opacity: 1;
  box-sizing: border-box;
}

.swiper-pagination-bullet-active {
  background: red;
}


/* stylus已测试 */
/* 自定义分页器盒子样式 */
/deep/.swiper-pagination-bullets 
    bottom 2px
    left 0
    width 100%
    /* display flex
    justify-content center */

/* 自定义分页器样式 */
/deep/.swiper-pagination-bullet 
    width 10px
    height 10px
    display inline-block
    border-radius 100%
    background: #000
    border 1px solid #fff
    opacity 0.2
    box-sizing border-box
    

/deep/.swiper-pagination-bullet-active 
    opacity 1
    background red 



<!-- 老版本初始化处理 -->
/*
  解决swiper轮播不正常的问题?
  方式1: watch + nextTick()
  方式2: callback + nextTick()
  方式3: 利用dipatch()返回的promise
*/

async mounted () {
    // 分发异步action,将数据从后台请求到vuex中
    // 前期需要去服务器端关一下请求后端路由时的权限验证

    // 方式2: callback + nextTick()  此方法要修改actions,是可以传回调函数,配合在对应action进行调用
    /* this.$store.dispatch('getCategorys', ()=>{  //数据已经变了
      this.$nextTick(()=>{
          // swiper对象必须要在列表数据显示之后创建
          new Swiper (this.$refs.sc1, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
      })
    }) */
    this.$store.dispatch('getShops')
    this.$store.dispatch('getAddress')

    /* 方式3: 利用dipatch()返回的promise 配合async await 代码最简洁,
    小细节:因为是异步发送所以要放到发送发送数据方法最后再发送, 且不需要书写nextTick */
    await this.$store.dispatch('getCategorys') // dispatch返回的promise在数据更新且界面更新之后才成功

    // swiper对象必须要在列表数据显示之后创建
    new Swiper('.swiper-container', {   // eslint-disable-line
      loop: true, // 循环模式选项
      pagination: { // 如果需要分页器
        el: '.swiper-pagination'
      }
    })
  },

 

  // 方式1: watch + nextTick()
  watch: { // 非深度监视,只监视到了数据变化,界面此时是否变化不确定
    /**
        * 1.更新数据
        * 2.立即同步调用监视回调函数
        * 3.异步更新界面
        *  */
    /* categorys () {   // categorys初始数据赋值的变化,此时界面不一定变化: [] ==> [...]
        // 必须配合this.$nextTick()
        // $nextTick()将回调延迟到下次DOM更新循环后执行.在修改数据之后立即使用它，然后等待 DOM 更新
        this.$nextTick(()=>{
            // swiper对象必须要在列表数据显示之后创建
            //new Swiper('.swiper-container', {   // eslint-disable-line
            new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            pagination: { // 如果需要分页器
                el: '.swiper-pagination'
            }
            })
        })
        } */
  }

</script>

