<template>
  <header class="index-header">
    <router-link to = '/My'>
      <div class="header-user">
        <div class="user-btn"></div>
      </div>
    </router-link>
    <div class="header-logo"></div>
    <router-link to = '/Search'>
      <div class="header-search"></div>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'indexHeader'
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixins.scss";
.index-header {
  // border-bottom: 1px solid #ededed;;
  // position: relative;
  // &::after{
  //   content: '';
  //   position: absolute;
  //   width: 100%;
  //   height: 1px;
  //   left: 0px;
  //   bottom: 0px;
  //   background: #ededed;
  //   transform: scaleY(0.5);
  // }
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
    background: url(~@/assets/icon/icon-search.png);
    background-size: 100%;
  }
}
</style>
