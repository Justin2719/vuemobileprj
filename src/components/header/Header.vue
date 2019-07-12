<template>
  <div class="header">
    <!-- 背景图片 -->
    <div class="background">
      <img :src="headinfo.avatar" alt="">
    </div>
    <div class="head-info">
      <img :src="headinfo.avatar" alt="">
      <div class="info-content">
        <!-- 标题 -->
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{headinfo.name}}</span>
        </div>
        <div class="desc">
          {{headinfo.description}}/{{headinfo.deliveryTime}}分钟送达
        </div>
        <!-- 优惠 -->
        <div v-if="headinfo.supports" class="discount">
          <span class="icon" :class="classMap[headinfo.supports[0].type]"></span>
          <span class="text">{{headinfo.supports[0].description}}</span>
        </div>
        <!-- 商家优惠数量 -->
        <div class="seller-discount" v-if="headinfo.supports" @click="showDetail">
          <span class="count">{{headinfo.supports.length}}个</span>
          <i class="icon iconfont icon-zuoyoujiantou"></i>
        </div>
      </div>

    </div>
     <!-- 公告区域 -->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{headinfo.bulletin}}</span>
      <i class="icon iconfont icon-zuoyoujiantou"></i>
    </div>

    <!-- 模态框 -->
    <transition name="fade">
      <div class="detail" v-show="detailShow" transition="fade">
        <div class="detail-wrapper">
          <div class="detail-main">
            <h1 class="name">{{headinfo.name}}</h1>
            <div class="star-wrapper">
              <v-star :size="48" :score="headinfo.score"></v-star>
            </div>
          </div>
            <!-- 优惠部分 -->
          <div class="detail-discount">
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <div class="nav">
              <ul class="supports">
                <li class="support-item" v-for="(item,index) in headinfo.supports" :key="index">
                  <span class="icon" :class="classMap[headinfo.supports[index].type]"></span>
                <span class="text">{{headinfo.supports[index].description}}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 商家公告 -->
          <div class="detail-bulletin">
              <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="content">
              <p>{{headinfo.bulletin}}</p>
            </div>
          </div>
        </div>

        <div class="detail-close" @click="hideDetail">
          <i class="iconfont icon-cha"></i>
        </div>

    </div>
    </transition>


  </div>
</template>

<script>
import Star from '@/components/star/Star'
export default {
  props:{
    headinfo: {
      type:Object
    }
  },
  data () {
    return {
      detailShow: false,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  methods: {
    showDetail(){
      this.detailShow = true;
    },
    hideDetail(){
      this.detailShow = false;
    }
  },
  created() {
      // this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    'v-star': Star
  }
}
</script>

<style lang="less" scoped>
  @import 'header.less';
</style>
