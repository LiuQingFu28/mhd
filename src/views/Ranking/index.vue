<template>
  <div class = 'page-ranking'>
    <NormalHeader title="排行榜"></NormalHeader>
    <div class="classify-main">
      <HeaderType :types = 'types' @abc = 'fn2'></HeaderType>
      <CartoonList :Lists = 'lists' :isShow = 'true'></CartoonList>
    </div>
  </div>
</template>

<script>
import CartoonList from '@/components/CartoonList'
import HeaderType from '@/components/HeaderType'
import NormalHeader from '@/components/NormalHeader'
import { getRankList } from '@/api/user'
import { unformat } from '@/utils/apiHelp'
export default {
  name: 'Ranking',
  data () {
    return {
      types: [
        { id: 1, description: '热搜榜', ranktype: 6 },
        { id: 2, description: '人气榜', ranktype: 1 },
        { id: 3, description: '畅销榜', ranktype: 4 },
        { id: 4, description: '新书榜', ranktype: 2 },
        { id: 5, description: '完结榜', ranktype: 5 },
        { id: 6, description: '免费榜', ranktype: 3 }
      ],
      cartoonList: []
    }
  },
  computed: {
    lists () {
      return this.cartoonList.map(item => {
        return {
          id: item.bigbookid,
          name: item.name,
          author: item.author,
          coverurl: item.coverurl,
          view: item.sales
        }
      })
    }
  },
  components: {
    CartoonList,
    HeaderType,
    NormalHeader
  },
  methods: {
    getRankList (subject) {
      getRankList(subject).then(res => {
        if (res.code === 200) {
          // console.log(JSON.parse(unformat(res.info)).ranklist)
          this.cartoonList = JSON.parse(unformat(res.info)).ranklist
        } else {
          alert(res.code_msg)
        }
      })
    },
    fn2 (payload) {
      this.getRankList(payload.data.ranktype)
    }
  },
  created () {
    this.getRankList(this.types[0].ranktype)
  }
}
</script>

<style lang = 'scss' scoped>
  .page-classify {
    font-size: 18px;
    display: flex;
    flex-direction: column;
    height: 100%;
  .classify-main {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
