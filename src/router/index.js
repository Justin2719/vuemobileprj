import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/Goods'
import Sellers from '@/components/sellers/Sellers'
import Comments from '@/components/comments/Comments'

Vue.use(Router)

export default new Router({
  //设置路由链接选中样式必需
  'linkActiveClass': 'active',
  routes: [
    // 默认选中商品路由
    { path: '/', component: Goods },
    { path: '/goods', component: Goods },
    { path: '/sellers', component: Sellers },
    { path: '/comments', component: Comments }
  ]
})
