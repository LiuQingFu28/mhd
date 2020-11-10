<template>
  <div class="swiper-container" ref = 'swiper'>
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'
export default {
  name: 'Swiper',
  props: {
    autoplay: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    var that = this
    /* eslint-disable */
    new Swiper(this.$refs.swiper, {
      loop: this.loop, //是否进行循环轮播
      autoplay: this.autoplay ? {
        delay: this.autoplay,
        stopOnLastSlide: false,
        disableOnInteraction: true
      } : false,
      pagination: {//页码
        el: ".swiper-pagination"
      },
      on : {
        slideChangeTransitionEnd: function () {
          that.$emit('change', this.realIndex)//正在执行的对象
        }
      }
    });
    /* eslint-enable */
  }
}
</script>
<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 180PX;
}
</style>
<style lang="scss">
img{
  width: 100%;
  height: 100%;
}
.swiper-pagination-bullet {
  opacity: 1;
  vertical-align: middle;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: hsla(0, 0%, 100%, 0.7);
}

.swiper-pagination-bullet-active {
  width: 20px;
  height: 10px;
  background: url("../../assets/icon/dot.png") no-repeat;
  background-size: 100%;
}
</style>
