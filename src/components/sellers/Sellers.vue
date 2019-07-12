<template>
  <div class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{headinfo.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="headinfo.score"></star>
          <span class="text">({{headinfo.ratingCount}})</span>
          <span class="text">月售{{headinfo.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{headinfo.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{headinfo.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{headinfo.deliveryTime}}</span>元
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite($event)">
          <i class="iconfont icon-aixin" :class="{'active':favorite}"></i>
          <span>{{favoriteText}}</span>
        </div>
      </div>
      <!-- <split></split> -->
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{headinfo.bulletin}}</p>
        </div>
        <ul v-if="headinfo.supports" class="supports">
          <li class="support-item" v-for="(item, index) in headinfo.supports">
            <span class="icon" :class="classMap[headinfo.supports[index].type]"></span>
            <span class="text">{{headinfo.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <!-- <split></split> -->
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in headinfo.pics">
              <img :src="pic" width="120" height="120">
            </li>
          </ul>
        </div>
      </div>
      <!-- <split></split> -->
      <div class="info">
        <div class="title  border-1px">商家信息</div>
        <ul>
          <li class="info-item" v-for="info in headinfo.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/Star.vue';
  // import split from '../split/split.vue';
  import BScroll from 'better-scroll';
  import {savaToLocal, loadFromlLocal} from '../../common/js/store';
  export default {
    props: {
      headinfo: {
        type: Object
      }
    },
    components: {
      star
      // split
    },
    data() {
      return {
        favorite: (() => {
          return loadFromlLocal(this.headinfo.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    created() {
      if (!this.picScroll) {
        if (this.headinfo.pics) {
          this.$nextTick(() => {
            let picWidth = 120;
            let margin = 6;
            let width = (picWidth + margin) * this.headinfo.pics.length - margin;
            this.$refs.picList.style.width = width + 'px';
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          });
        }
      } else {
        this.picScroll.refresh();
      }
      if (!this.scroll) {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$el, {click: true});
        });
      } else {
        this.scroll.refresh();
      }
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      _initScroll() {
      },
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        savaToLocal(this.headinfo.id, 'favorite', this.favorite);
      }
    }
  };
</script>
<style lang="less" scoped>
  @import "./seller.less";
</style>
