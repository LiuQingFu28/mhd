<template>
  <nav class="index-nav">
    <router-link to = '/Classify'>
      <div class="nav-item">
        <i class="iconfont icon-icon_addmessage"></i>
        <p class="nav-text font-24">分类</p>
      </div>
    </router-link>
    <router-link to = '/Ranking'>
      <div class="nav-item">
        <i class="iconfont icon-icon_addresslist"></i>
        <p class="nav-text font-24">排行</p>
      </div>
    </router-link>
    <router-link to = '/Vip'>
      <div class="nav-item">
        <i class="iconfont icon-icon_addressbook"></i>
        <p class="nav-text font-24">VIP专区</p>
      </div>
    </router-link>
    <router-link to = '/Hello/History'>
      <div class="nav-item">
        <i class="iconfont icon-icon_at"></i>
        <p class="nav-text font-24">历史</p>
      </div>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'indexNav'
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixins.scss";
.index-nav {
  @include border-bottom;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 100px;
  .nav-item {
    .iconfont {
      font-size: 52px;
      line-height: 1.2;
    }
    .nav-text {
      color: #8d8d8d;
      font-weight: 500;
      text-align: center;
    }
  }
}
</style>
