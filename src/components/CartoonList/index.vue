<template>
  <section class="classify-list">
    <div class="list-item" v-for = '(item,index) in Lists' :key = 'item.id'>
      <div
        class="item-pic"
        :style="`background-image: url(${item.coverurl})`"
      ></div>
      <div class="item-info">
        <div class="info-book font-30">{{item.name}}</div>
        <div class="info-author font-26">{{item.author}}</div>
        <div class="info-fans font-26">{{item.view | formatYi}}</div>
        <div :class="`item-ranking-${(index + 1) > 3 ? 'other' : (index + 1)}`" v-show="isShow">{{(index + 1) | indexFilter }}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CartoonList',
  props: {
    Lists: {
      /*
      list 中每一项数据的结构必须是这样的，为了能够在不同页面上复用这个组件
      {
        id,
        coverurl,        图片地址
        name: item.name, 名字
        author:,         作者
        view             人气
      }
    */
      type: Array,
      default () {
        return []
      }
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    indexFilter (value) {
      if (value > 3) {
        return value
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixins.scss";
.classify-list {
  font-size: 18px;
  .list-item {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 124px;
    padding-left: 10px;
    @include border-bottom;
    position: relative;
    .item-pic {
      flex-shrink: 0;
      width: 80px;
      height: 106px;
      border-radius: 3px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: top;
    }
    .item-info {
      flex: 1;
      margin-left: 10px;
      color: #999;
      overflow: hidden;
      .info-book,
      .info-author,
      .info-fans {
        font-weight: 500;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .info-book {
        color: #333;
      }
      .info-book,
      .info-author {
        margin-bottom: 10px;
      }
    }
    .item-ranking-1,
    .item-ranking-2,
    .item-ranking-3 {
      width: 50px;
      height: 28px;
      margin: auto;
      position: absolute;
      top: 0;
      right: 20px;
      bottom: 0;
    }
    .item-ranking-other {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 26px;
      height: 25px;
      color: #80808f;
      background: url("~@/assets/icon/item-rank-other.png") no-repeat;
      background-size: 100%;
      margin: auto;
      position: absolute;
      top: 0;
      right: 30px;
      bottom: 0;
      font-size: 15px;
    }
    .item-ranking-1 {
      background: url("~@/assets/icon/item-rank-1.png") no-repeat;
      background-size: 100%;
    }
    .item-ranking-2 {
      background: url("~@/assets/icon/item-rank-2.png") no-repeat;
      background-size: 100%;
    }
    .item-ranking-3 {
      background: url("~@/assets/icon/item-rank-3.png") no-repeat;
      background-size: 100%;
    }
  }
}
</style>
