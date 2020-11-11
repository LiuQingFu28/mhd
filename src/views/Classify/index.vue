<template>
  <div class = 'page-classify'>
    <NormalHeader title="分类"></NormalHeader>
    <div class="classify-main">
      <HeaderType :types = 'types' @abc = 'fn1'></HeaderType>
      <CartoonList :Lists = 'lists'></CartoonList>
    </div>
  </div>
</template>

<script>
import CartoonList from '@/components/CartoonList'
import HeaderType from '@/components/HeaderType'
import NormalHeader from '@/components/NormalHeader'
import { getIndexClassify, getTypesList } from '@/api/user'
import { unformat } from '@/utils/apiHelp'
export default {
  name: 'Classify',
  components: {
    CartoonList,
    HeaderType,
    NormalHeader
  },
  data () {
    return {
      types: [],
      cartoonList: []
    }
  },
  computed: {
    lists () {
      return this.cartoonList.map(item => {
        return {
          id: item.bigbook_id,
          name: item.bigbook_name,
          author: item.bigbook_author,
          coverurl: item.bigcoverurl,
          view: item.bigbookview
        }
      })
    }
  },
  methods: {
    getIndexClassify () {
      return getIndexClassify().then(res => {
        if (res.code === 200) {
          this.types = res.info
        } else {
          alert(res.code_msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    fn1 (payload) {
      this.getTypesList(payload.data.targetargument)
    },
    getTypesList (subject) {
      getTypesList(subject).then(res => {
        if (res.code === 200) {
          // console.log(JSON.parse(unformat(res.info)).comicsList)
          this.cartoonList = JSON.parse(unformat(res.info)).comicsList
        } else {
          alert(res.code_msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  async created () {
    await this.getIndexClassify()
    this.getTypesList(this.types[0].targetargument)
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
