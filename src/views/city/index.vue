<template>
  <div class = 'page-city'>
    <NormalHeader :title = "`城市 - ${curCityName}`" :showRight = 'false'></NormalHeader>
    <div class = 'city-main'>
      <div class = 'left' ref = 'scrollLeft'>
        <div class = 'city-index-section' v-for = 'item in cityList' :key = "item.py" :ref = "`section-${item.py}`">
          <p>{{ item.py }}</p>
          <ul>
            <li v-for = "city in item.list" :key = 'city.cityId' @click="SET_CURCITY(city)">{{ city.name }}</li>
          </ul>
        </div>
      </div>
      <div class = 'right'>
        <ul>
          <li v-for = 'item in cityPy' :key="item" @click="goto(item)">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import NormalHeader from '@/components/NormalHeader'
import { getCityList } from '@/api/city'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'City',
  data () {
    return {
      cities: []
    }
  },
  components: {
    NormalHeader
  },
  computed: {
    ...mapGetters('city', ['curCityName']),
    cityList () {
      const result = []
      this.cities.forEach(item => {
        const py = item.pinyin.substr(0, 1).toUpperCase()
        const index = result.findIndex(item => item.py === py)
        if (index > -1) {
          result[index].list.push(item)
        } else {
          result.push({
            py: py,
            list: [item]
          })
        }
      })
      return result.sort((a, b) => a.py.charCodeAt() - b.py.charCodeAt())
    },
    cityPy () {
      return this.cityList.map(item => {
        return item.py
      })
    }
  },
  methods: {
    ...mapMutations('city', ['SET_CURCITY']),
    getCityList () {
      getCityList().then(res => {
        this.cities = res.data.data.cities
      }).catch(err => {
        console.log(err)
        alert('网络异常，请稍后重试')
      })
    },
    goto (payload) {
      const top = this.$refs[`section-${payload}`][0].offsetTop
      // console.log(top)
      this.$refs.scrollLeft.scrollTop = top
    }
  },
  created () {
    this.getCityList()
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/styles/mixins.scss';
.page-city{
  display: flex;
  flex-direction: column;
  height: 100%;
  .city-main {
    flex: 1;
    overflow: hidden;
    display: flex;
  }
  .left{
    flex: 1;
    height: 100%;
    overflow-y: auto;
    position: relative;
    .city-index-section{
      @include border-bottom;
      padding-left: 15px;
      p{
        @include border-bottom;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
      }
      li{
        @include border-bottom;
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: 16px;
      }
    }
  }
  .right{
    width: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    li{
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
