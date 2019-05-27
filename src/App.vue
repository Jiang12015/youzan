<template>
  <div id="app">
    <div class="container with-bottom-nav" style="min-height: 667px;">
      <div class="content">
        <!-- <div class="js-image-swiper custom-image-swiper custom-image-swiper-single" data-images="1"> -->
          <Swipe :lists='bannerLists' v-if="bannerLists"></Swipe>
        <!-- </div> -->
        <!-- <a href="https://maijia.youzan.com/mars/notice/detail?id=" class="notice"></a> -->
        <div class="section-title">优店推荐</div>
        <div class="section-content shops">
          <div class="shop-wrap">
            <div class="shop-item">
              <a href="https://h5.koudaitong.com/v2/showcase/feature?alias=zjtozpgn">
                <img
                  class="fadeIn"
                  src="https://img.yzcdn.cn/upload_files/2016/09/23/FgQUVNXnvpFKFl1DIN2LXhPA1cxy.png?imageView2/2/w/300/h/0/q/75/format/png"
                >
              </a>
            </div>
            <div class="shop-item">
              <a href="https://h5.koudaitong.com/v2/feature/1e22e3vtu">
                <img
                  class="fadeIn"
                  src="https://img.yzcdn.cn/upload_files/2016/08/03/FqNGnCQS1eq9nIhRg48E_UfFf9K2.png?imageView2/2/w/300/h/0/q/75/format/png"
                >
              </a>
            </div>
            <div class="shop-item">
              <a href="https://h5.koudaitong.com/v2/feature/8oups7zk">
                <img
                  class="fadeIn"
                  src="https://img.yzcdn.cn/upload_files/2016/08/05/Fv5hhMZrtPZQWE7fape0ddEYtSuy.png?imageView2/2/w/300/h/0/q/75/format/png"
                >
              </a>
            </div>
          </div>
        </div>
        <div class="section-content daily">
          <ul></ul>
        </div>
        <div class="line-block line-block-gray">
          <div class="lineblock-title">
            <span class="lineblock-font">最热商品推荐</span>
          </div>
        </div>
        <div class="hot-goods js-waterfull-wrap" data-src>
          <ul
            class="js-list js-lazy"
            data-src
            v-infinite-scroll="getLists"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="30"
          >
            <li v-for="list in lists" :key="list.index">
              <div class="goods-item">
                <a
                  href="https://h5.youzan.com/v2/showcase/goods?alias=2fwig6rnqfq6m&amp;source=yzapp&amp;f_platform=yzapp"
                >
                  <div class="thumb img-box">
                    <img class="fadeIn" :src="list.img">
                  </div>
                  <div class="detail">
                    <div class="title">{{list.name}}</div>
                    <div class="price">￥{{list.price}}</div>
                  </div>
                </a>
              </div>
            </li>
          </ul>
          <div class="loading-more" v-show="loading">
            <span></span>
          </div>
        </div>
        <div class="js-show-find category-guid" style="display: none;"></div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import url from '@/api/api.js'
import Foot from '@/components/Foot'
import Swipe from '@/components/Swipe'
export default {
  data () {
    return {
      lists: null,
      pageNum: 2,
      pageSize: 6,
      loading: false,
      allLoading: false,
      bannerLists: null
    }
  },
  components: {
    Foot,
    Swipe
  },
  methods: {
    getLists () {
      if (this.allLoading) return
      this.loading = true
      this.$http
        .get(url.hotLists, {
          pageNum: this.pageNum,
          pageSize: 6
        })
        .then(res => {
          let curLists = res.data.lists
          // 判断所有数据是否加载完毕
          if (curLists.length < this.pageSize) {
            this.allLoading = true
          }
          if (this.lists) {
            this.lists = this.lists.concat(curLists)
          } else {
            this.lists = curLists
          }
          this.loading = false
          this.pageNum++
        })
    },
    getBanner () {
      this.$http.get(url.banner).then(res => {
        this.bannerLists = res.data.lists
      })
    }
  },
  beforeMount () {
    this.getLists()
    this.getBanner()
  }
}
</script>

<style>
@import "./assets/css/common.css";
@import "./assets/css/index.css";
</style>
