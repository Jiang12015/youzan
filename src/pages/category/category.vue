<template>
  <div id="category">
   <div v-cloak>
      <div class="container with-bottom-nav" style="min-height: 667px;">
          <div class="custom-search js-search-bar">
            <form>
              <input type="search" class="custom-search-input" autocomplete="off" name="keyword" value="" placeholder="搜索更赞的商品">
              <span class="icon-custom-search"></span>
            </form>
            <button class="custom-search-type-selection-btn">商品</button>
            <span class="cancel">取消</span>
            <div class="search-type-dropdown-menu" style="display: none;">
              <span class="search-type-dropdown-menu-indicator">
                  <i></i>
              </span>
              <div class="drop-menu-content">
                <div class="search-type-goods">
                  <i class="icon-goods"></i>
                  <span>商品</span>
                </div>
                <div class="search-type-dropdown-menu-divider"></div>
                <div class="search-type-shop">
                  <i class="icon-shop"></i>
                  <span>店铺</span>
                </div>
              </div>
            </div>
          </div>
          <div class="search-content" style="display: none;"></div>
          <div class="content">
            <div class="class-nav">
              <div id="scroll-nav" style="height: 100%;">
                <ul class="nav" id="scroll-nav-content" style="transform: translate3d(0px, 0px, 0px);">
                  <li class="category-name js-category-name"
                    v-for="(list,index) in topLists"
                    :key="list.id"
                    :class="{active: index === topIndex}"
                    @click="getSubList(index,list.id)"
                    :data-cid="list.id">
                    {{list.name}}
                    </li>
                </ul>
              </div>
            </div>
            <div class="class-category">
              <div id="scroll-main-wrap" class="main-content">
                <div id="scroll-main-content" class="js-main-content inner-content" style="transform: translate3d(0px, 0px, 0px);" v-if = "topIndex === 0">
                  <div class="hot-wrap">
                    <div class="hot-goods">
                      <div class="hot-title">
                        <p class="pull-left">热销商品榜</p>
                        <a href="https://maijia.youzan.com/mars/rank/hotgoods" class="pull-right icon-right">更多</a>
                      </div>
                      <ul>
                        <li class="goods-item" v-for="(list,index) in rankData.hotGoods" :key="list.id">
                          <a :href="'goods.html?id='+list.id">
                            <div class="thumb badge center-img">
                              <img :src="list.img">
                              <span class="num">{{index+1}}</span>
                            </div>
                            <div class="detail">
                              <div class="title">{{list.name}}</div>
                              <div class="price">￥{{list.price | keepTwoNum}}</div>
                              <div class="recommend">
                                <span>推荐值:</span>
                                <span>{{list.recomend}}</span>
                              </div>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="hot-shops" style="position: relative;">
                      <div class="hot-title">
                        <p class="pull-left">TOP店铺榜</p>
                        <a href="https://maijia.youzan.com/mars/rank/hotshops" class="pull-right icon-right">更多</a>
                      </div>
                      <ul>
                        <li class="shop-item" v-for="(list,index) in rankData.hotShops" :key="index">
                          <div class="shop-title">
                            <span class="badge">{{index+1}}</span>
                            <a :href="list.clickUrl">{{list.name}}</a>
                            <span class="follows"> / 关注度: {{list.follows}}</span>
                          </div>
                          <ul class="shop-images">
                            <li v-for="img in list.imgs" :key="img.index">
                              <a href="https://h5.youzan.com/v2/showcase/homepage?kdt_id=10695955&amp;source=yzapp">
                                <img :src="img">
                              </a>
                            </li>
                          </ul>
                        </li>

                      </ul>
                    </div>
                    <div class="hot-keywords">
                      <div class="hot-title">
                        <p class="pull-left">热搜词排行</p>
                      </div>
                      <ul class="keywords-list">
                        <li v-for="(list,index) in rankData.hotKeywords" :key="index">
                          <a href="javascript:;" class="js-hot-keyword">{{list}}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div id="scroll-main-content" class="js-main-content inner-content" style="transform: translate3d(0px, 0px, 0px);" v-if = "topIndex > 0 && subData">
                  <h3 class="category-title">热门品牌 </h3>
                  <ul class="category-content">
                    <li
                      class="category-item js-category-item"
                      v-for="list in subData.brandList"
                      :key = "list.id"
                      :data-item-id="list.id"
                      :data-item-name="list.name">
                      <img :src="list.img" alt="list.name" class="category-img">
                      <span class="category-item-name">{{list.name}}</span>
                    </li>
                  </ul>
                  <h3 class="category-title"> 热门分类  </h3>
                  <ul class="category-content">
                    <li class="category-item js-category-item"
                      v-for="list in subData.categoryList"
                      :key = "list.id"
                      @click = "goToSearch(list)"
                      :data-item-id="list.id"
                      :data-item-name="list.name">
                      <img :src="list.img" alt="list.name" class="category-img">
                      <span class="category-item-name">{{list.name}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <Foot></Foot>
    <div class="loading-more" v-show="loading"><span></span></div>
  </div>
</template>

<script>

import Foot from '@/components/Foot'
import url from '@/api/api.js'
export default {
  data () {
    return {
      topLists: null,
      topIndex: null,
      subData: null,
      rankData: null,
      loading: true
    }
  },
  components: {
    Foot
  },
  filters: {
    keepTwoNum (value) {
      value = Number(value)
      return value.toFixed(2)
    }
  },
  created () {
    Promise.all([this.getTopList(), this.getSubList(0)]).then(res => {
      // this.loading = false;
    })
  },
  methods: {
    getTopList () {
      this.$http.get(url.topList).then(res => {
        this.topLists = res.data.lists
      }).catch(res => {
        console.log('获取一级目录失败！')
      })
    },
    getSubList (index, id) {
      if (index === 0) {
        return this.getRank()
      } else {
        this.$http.get(url.subList, { id }).then(res => {
          this.topIndex = index
          this.subData = res.data.data
        }).catch(res => {
          console.log('获取二级目录失败！')
        })
      }
    },
    getRank () {
      this.$http.get(url.rank).then(res => {
        this.rankData = res.data.data
        this.topIndex = 0
      }).catch(res => {
        console.log('获取综合排行失败！')
      })
    },
    goToSearch (list) {
      location.href = `search.html?keyword=${list.name}&id=${list.id}`
    }
  }
}

</script>

<style>
@import "../../assets/css/category.css";
@import "../../assets/css/common.css";

</style>
