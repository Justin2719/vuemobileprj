<template>
  <div id="app">
      <!-- 头部 -->
      <v-header :headinfo="headinfo"></v-header>
      <!-- 我是tab切换 -->
      <div class="ele-tab">
        <div class="tab-item">
          <router-link to='/goods'>商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to='/comments'>评论</router-link>
        </div>
        <div class="tab-item">
          <router-link to='/sellers'>商家</router-link>
        </div>
      </div>
       <router-view :headinfo="headinfo"></router-view>
  </div>
</template>

<script>
import Header from '@/components/header/Header';
import data from '@/common/json/data.json';

export default {
  data() {
    return {
      headinfo: {}
    }
  },
  created () {
    this.headinfo = data.seller;
    console.log(this.headinfo);

  },
  components: {
    'v-header': Header
  }
}
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  .ele-tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .tab-item {
      flex: 1;
      text-align: center;
      a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
      }
      .active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
