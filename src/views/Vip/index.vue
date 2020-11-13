<template>
  <div class = 'page-vip'>
    <NormalHeader title="Vip"></NormalHeader>
    <div class="classify-main">
      <CartoonList :Lists = 'lists'></CartoonList>
    </div>
  </div>
</template>

<script>
import CartoonList from '@/components/CartoonList'
import NormalHeader from '@/components/NormalHeader'
import { getVip } from '@/api/user'
import { unformat } from '@/utils/apiHelp'
export default {
  name: 'Vip',
  data () {
    return {
      list: []
    }
  },
  computed: {
    lists () {
      return this.list.map(item => {
        return {
          id: item.bookstore_id,
          name: item.bigbook_name,
          author: item.bigbook_author,
          coverurl: item.coverurl,
          view: item.bigbookview
        }
      })
    }
  },
  components: {
    CartoonList,
    NormalHeader
  },
  methods: {
    getVip () {
      getVip().then(res => {
        this.list = JSON.parse(unformat(res.info)).comicsList
      })
    }
  },
  created () {
    this.getVip()
  }
}
</script>

<style lang = 'scss' scoped>
  .page-classify {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    height: 100%;
  .classify-main {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
