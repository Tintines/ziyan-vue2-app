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
</script>