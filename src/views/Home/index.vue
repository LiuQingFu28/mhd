<template>
  <div class="page-home">
    <indexHeader></indexHeader>
    <div class="index-main">
      <Swiper ref="xxx" :autoplay="autoplay" v-if="msg.length">
        <SwiperItem v-for="item in msg" :key="item.id"
          ><img :src="item.imageurl" :alt="item.description"
        /></SwiperItem>
      </Swiper>
      <indexNav></indexNav>
      <indexRecomment v-for = 'item in List' :key = 'item.specialid' :info = 'item'></indexRecomment>
      <div class="my-icp">
        <a
          class="record"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011202006214"
          target="_blank"
        >
          <img
            class="img"
            src="https://wechatapp.zhuishushenqi.com/mhd/201711/gongan.jpg"
          />
          <div>沪公网安备 31011202006214号</div>
        </a>
        <div class="licence">
          增值电信业务经营许可证沪B2-20170022
          <br />网络文化经营许可证沪网文（2016）3206-227号
          <br />出版物经营许可证新出发沪批字第U7659号
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入抽离出来的插件
import { Swiper, SwiperItem } from '@/components/Swiper'
import { getBanner, getIndexRecomment } from '@/api/user'
import indexHeader from './components/indexHeader'
import indexNav from './components/indexNav'
import indexRecomment from './components/indexRecommend'
export default {
  name: 'Home',
  components: {
    Swiper,
    SwiperItem,
    indexHeader,
    indexNav,
    indexRecomment
  },
  data: function () {
    return {
      msg: [],
      autoplay: 2000,
      List: []
    }
  },
  methods: {
    changeHandler (payload) {
      console.log('index', payload)
    },
    getBanner () {
      // 下载轮播图的数据
      getBanner()
        .then(res => {
          // 漫画岛 的每一个接口 都有 code 的字段
          // 如果字段是 200 的话，这个接口是ok
          if (res.code === 200) {
            this.msg = res.info
          } else {
            // 不ok，就在页面上报错
            // 在这里我们先通过 alert 进行报错，后期 我们可以用一下 vant 组件库的组件
            alert(res.code_msg)
          }
        })
    },
    getIndexRecomment () {
      getIndexRecomment()
        .then(res => {
          if (res.code === 200) {
            this.List = res.info
          } else {
            // 不ok，就在页面上报错
            // 在这里我们先通过 alert 进行报错，后期 我们可以用一下 vant 组件库的组件
            alert(res.code_msg)
          }
        })
    }
  },
  created () {
    // 利用代理跨域请求数据
    // 使用axios跨域请求数据总结：在根路径建立一个vue.congig.js文件，配置访问的路径，首先创建一个axios的对象，设置中间服务器（vue提供的本地服务器），延迟时间，暴露，在需要的地方引入，封装一个函数，请求想要的数据，在合适的地方调用，拿到数据进行页面的修改
    // 注意：在页面使用v-for加载时会出现错误，因为在数据拿到的时候，swiper就插入进行了实例的创建，解决办法：使用v-if判断数据是否拿到，拿到在进行数据的插入
    this.getBanner()
    this.getIndexRecomment()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixins.scss";
.page-home {
  .index-main {
    flex: 1;
    overflow-y: auto;
  }
  .my-swiper {
    img {
      width: 100%;
    }
  }
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 16px;
  .my-icp {
    padding: 5px 0;
    font-size: 12px;
    .record {
      display: flex;
      align-items: center;
      justify-content: center;
      .img {
        width: 15px;
        height: 15px;
        margin-right: 4px;
      }
    }
    .licence {
      margin-top: 4px;
      text-align: center;
    }
  }
}
</style>
