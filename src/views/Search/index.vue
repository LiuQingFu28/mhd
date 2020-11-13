<template>
  <div class="page-search">
    <header class="search-header">
      <div class="header-back" @click="$router.back()"></div>
      <div class="header-search">
        <span class="icon-search"></span>
        <input class="search-input font-24" type="search" placeholder="漫画名丨作者 ^_^" v-model="msg"/>
      </div>
      <div class="header-btn font-30" @click="saveClick(msg)">搜索</div>
    </header>

    <div class="search-main">
      <template v-if = '!msg'>
        <!-- 热门搜索 begin -->
      <section class="search-recommend">
        <div class="title font-26">
          <span class="title-title">大家都在搜</span>
          <span class="title-btn" @click="getHotSearch">
            <span class="icon-refresh" ></span>刷新
          </span>
        </div>

        <div class="recommend-content font-28">
          <span class="recommend-item" v-for = 'item in Hotlist' :key = 'item.id' @click="saveClick(item.keyword)">{{item.keyword}}</span>
        </div>
      </section>
      <!-- 热门搜索 end -->

      <!-- 最近搜索 begin -->
      <section class="search-history"  v-show = 'BeginList'>
        <div class="title font-26">
          <span class="title-title">最近搜索</span>
          <span class="title-btn" @click="removeSearch">
            <span class="icon-del"></span>
          </span>
        </div>
        <div class="history-content font-28">
          <span class="history-item" v-for = 'item in BeginList' :key="item" @click="saveClick(item)">
            <span class="icon-time"></span>
            {{item}}
          </span>
        </div>
      </section>
      <!-- 最近搜索 end -->
      </template>

      <!-- 搜索结果面板 begin -->
      <section class="search-content" v-else>
        <p class="item font-28" v-for = 'item in SearchList' :key="item" @click="saveClick(item)">{{item}}</p>
      </section>

      <!-- 搜索结果面板 end -->
    </div>
  </div>
</template>

<script>
import { getHotSearch, searchIndex } from '@/api/user'
export default {
  name: 'Search',
  data () {
    return {
      msg: '',
      Hotlist: [],
      BeginList: this.getSearch(),
      SearchList: []
    }
  },
  watch: {
    msg (newVal) {
      this.searchIndex(newVal)
    }
  },
  methods: {
    getHotSearch () {
      getHotSearch().then(res => {
        if (res.code === 200) {
          this.Hotlist = res.info.hotWordsList
        } else {
          console.log(res.code_msg)
        }
      })
    },
    saveClick (payload) {
      if (!payload) {
        return
      }
      var tem = window.localStorage.getItem('Search') ? JSON.parse(window.localStorage.getItem('Search')) : []
      if (tem.includes(payload)) {
        this.$router.push('/search-result?name=' + payload)
        return
      }
      tem.push(payload)
      console.log(payload)
      window.localStorage.setItem('Search', JSON.stringify(tem))
      this.$router.push('/search-result?name=' + payload)
    },
    getSearch () {
      var arr = window.localStorage.getItem('Search')
      if (!arr) {
        return
      }
      return JSON.parse(arr)
    },
    removeSearch () {
      this.BeginList = []
      window.localStorage.removeItem('Search')
    },
    searchIndex (name) {
      searchIndex(name).then(res => {
        if (res.code === 200) {
          this.SearchList = res.info
          console.log(res)
        } else {
          console.log(res.code_msg)
        }
      })
    }
  },
  created () {
    this.getHotSearch()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixins.scss";

.page-search {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 14px;
  .search-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    background: #e7370c;
    position: relative;
    border-bottom: 1px solid #dbd9dc;
    .header-back {
      position: absolute;
      top: 50%;
      left: 12px;
      margin-top: -7px;
      width: 24px;
      height: 14px;
      background: url("../../assets/icon/header-back-white.png") no-repeat;
      background-size: 100%;
    }
    .header-btn {
      color: #fff;
      font-weight: 500;
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
    }
    .header-search {
      display: flex;
      align-items: center;
      width: 70%;
      border-radius: 3px;
      position: relative;
      .icon-search {
        width: 14px;
        height: 14px;
        background: url("../../assets/icon/icon-search.png") no-repeat;
        background-size: 100%;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
      }
      .search-input {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 30px;
        padding-right: 10px;
        padding-left: 30px;
        border-radius: 3px;
        outline: none;
        border: none;
      }
    }
  }

  .search-main {
    flex: 1;
    overflow-y: auto;
  }

  .search-recommend,
  .search-history {
    box-sizing: border-box;
    padding: 15px 0;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px 10px;
      border-bottom: 1px solid #e9e9e9;
      .title-title {
        color: #8b8b8b;
      }
      .title-btn {
        display: flex;
        align-items: center;
        color: #8b8b8b;
        .icon-refresh {
          width: 13px;
          height: 12px;
          margin-right: 4px;
          background: url("../../assets/icon/icon-refresh.png") no-repeat;
          background-size: 100%;
        }
        .icon-del {
          width: 13px;
          height: 14px;
          background: url("../../assets/icon/icon-del.png") no-repeat;
          background-size: 100%;
        }
      }
    }
    .recommend-content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 10px;
      margin-top: 15px;
      .recommend-item {
        @include border(#ddd, 20px);
        display: flex;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        height: 32px;
        padding: 0 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        font-weight: 500;
      }
    }
    .history-content {
      padding: 0 10px;
      .history-item {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #e9e9e9;
        .icon-time {
          width: 13px;
          height: 13px;
          margin-right: 6px;
          background: url("../../assets/icon/icon-time.png") no-repeat;
          background-size: 100%;
        }
      }
    }
  }

  .search-content {
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 10px;
    .item {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      height: 40px;
      padding-left: 10px;
      font-weight: 600;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
