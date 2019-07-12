<template>
 <div class="allstar">
    <div class="star-item" :class="starType">
      <span v-for="(item,index) in itemClasses" :class="item" class="star" :key="index"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size;
    },
    itemClasses() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasHalf = (score % 1 !== 0);
      let integer = Math.floor(score);
      for (let i=0; i<integer; i++){
        result.push('on');
      }
      if (hasHalf) {
        result.push('half');
      }
      while (result.length < 5){
        result.push('off');
      }
      return result;
    }
  }
}
</script>

<style lang="less" scoped>
  @import 'star.less';
</style>
