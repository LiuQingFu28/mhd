<template>
  <div class="page-home">
    <header class="index-header">
      <a href="mine.html?cpid=0">
        <div class="header-user">
          <div class="user-btn"></div>
        </div>
      </a>
      <div class="header-logo"></div>
      <a href="search.html?cpid=0">
        <div class="header-search"></div>
      </a>
    </header>
    <Swiper ref = 'xxx' :autoplay = 'autoplay' v-if = 'msg.length'>
      <SwiperItem v-for = 'item in msg' :key = 'item.id'><img :src="item.imageurl" :alt="item.description"></SwiperItem>
    </Swiper>
  </div>
</template>

<script>

// 引入抽离出来的插件
import { Swiper, SwiperItem } from '@/components/Swiper'
import { getBanner } from '@/api/user'
export default {
  name: 'Home',
  components: {
    Swiper,
    SwiperItem
  },
  data: function () {
    return {
      msg: [],
      autoplay: 2000
    }
  },
  methods: {
    changeHandler (payload) {
      console.log('index', payload)
    }
  },
  created () {
    // 利用代理跨域请求数据
    // 使用axios跨域请求数据总结：在根路径建立一个vue.congig.js文件，配置访问的路径，首先创建一个axios的对象，设置中间服务器（vue提供的本地服务器），延迟时间，暴露，在需要的地方引入，封装一个函数，请求想要的数据，在合适的地方调用，拿到数据进行页面的修改
    // 注意：在页面使用v-for加载时会出现错误，因为在数据拿到的时候，swiper就插入进行了实例的创建，解决办法：使用v-if判断数据是否拿到，拿到在进行数据的插入
    getBanner().then(res => {
      // console.log(res.info)
      this.msg = res.info
      // console.log(this.msg)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixins.scss';
.page-home {
  display: flex;
  flex-direction: column;
  height: 100%;
  .index-header {
    @include border-bottom;
    display: flex;
    height: 44px;
    //三者等分平铺
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    .user-btn {
      width: 25px;
      height: 25px;
      background: url(~@/assets/icon/user-btn.png);
      background-size: 100%;
    }
    .header-logo {
      width: 92px;
      height: 28px;
      background: url(~@/assets/logo.png) no-repeat;
      background-size: 100%;
    }
    .header-search {
      width: 25px;
      height: 25px;
      background: url(~@/assets/icon/header-search.png);
      background-size: 100%;
    }
  }
}
</style>
