<template>
  <div class="good">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" :class="{'current':currentIndex === index}" @click="selectMenu(index, $event)">
          <span class="text">
            <span v-if="item.type>0" class="icon" :class="classMap[item.type]"> </span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>

    <div class="food-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="good-list good-list-hook">
          <!-- 分类 -->
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(item,index) in item.foods" :key="index" class="food-item" @click="selectFood(food, $event)">
              <!-- 商品 -->
              <img :src="item.image" alt="">
              <div class="content">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc">{{item.description}}</p>
                <div class="extra">
                  <span class="count">月售{{item.sellCount}}</span><span class="item">好评{{item.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{item.price}}</span><span class="old"
                    v-show="item.oldPrice">￥{{item.oldPrice}}</span>
                </div>
                <div class="cartControl-wrapper">
                  <!-- <cartControl :food="food" @increment="incrementTotal"></cartControl> -->
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="shopcart">
      购物车区域
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import data from '@/common/json/data.json';
export default {
  props: {
    headinfo: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrolly: 0,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  computed: {
    currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrolly >= height && this.scrolly < height2)) {
            return i;
          }
        }
        return 0;
    }
  },
  created () {
    this.goods = data.goods;
     this.$nextTick(() => {
        this._initScroll();
        this._calculateHeight();
    });
  },
  methods: {
    _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          probeType: 3,
          click: true
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrolly = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('good-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
       selectMenu(index, event) {
        if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
        let foodList = this.$refs.foodWrapper.getElementsByClassName('good-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
  }
}
</script>

<style lang="less" scoped>
  @import "goods.less";
</style>
