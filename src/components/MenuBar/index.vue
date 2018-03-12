<template>
  <div class="k-menubar">
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home">
        <router-link to="/home" class="u-tab" v-bind:class="$route.path.indexOf('home') !== -1? 'isSlt' : ''">
          <!-- <img src="../../assets/home.png"> -->
          <i class="icon udmps ki-home"></i>
          <p>首页</p>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="classify">
        <router-link to="/classify" class="u-tab" v-bind:class="$route.path.indexOf('classify') !== -1? 'isSlt' : ''">
          <i class="icon udmps ki-classify"></i>
          <p>分类</p>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="quickOrder">
        <router-link to="/quickOrder" class="u-tab " v-bind:class="$route.path.indexOf('quickOrder') !== -1? 'isSlt' : ''">
          <div class="main-menu">
            <i class="icon udmps ki-dingdan big-order"></i>
          </div>
          <i class="icon udmps ki-order hide-order"></i>
          <p>快速下单</p>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="shoppingCart">
        <router-link to="/shoppingCart" class="u-tab" v-bind:class="$route.path.indexOf('shoppingCart') !== -1? 'isSlt' : ''">
          <i class="icon udmps ki-cart"></i>
          <span class="num">{{ $store.getters.selectedGoodsCount }}</span>
          <p>购物车</p>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="my">
        <router-link to="/my" class="u-tab" v-bind:class="$route.path.indexOf('my') !== -1? 'isSlt' : ''">
          <i class="icon udmps ki-my"></i>
          <p>我的</p>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: 'index'
    }
  },
  watch: {
  }
}
</script>

<style lang="scss">
  .isSlt{
    color: #e21020;
  }
  .k-menubar{
    .mint-tab-item-label{
      font-size: 0.373333rem;
    }
    p{
      margin-top: 8px;
    }
    .big-order{
      font-size: 1.2rem;
      color: #e21020;
    }
    .hide-order{
      color: #fff;
    }
    .mint-tab-item{
      position: relative;
    }
    .u-tab{
      .mint-tab-item{
        padding: 0.16rem 0;
      }
      img{
        width: 0.64rem;
        height: 0.64rem;
      }
      .num{
        position: absolute;
        display: block;
        background: red;
        color: #fff;
        width: 56px;
        height: 56px;
        line-height: 56px;
        border-radius: 50%;
        top: 0;
        right: 44px;
      }
    }
    .page-tabbar {
      overflow: hidden;
      height: 100vh;
    }

    .page-wrap {
      overflow: auto;
      height: 100%;
      padding-bottom: 100px;
    }
    .main-menu{
      width: 1.28rem;
      height: 1.28rem;
      margin: 0 auto;
      position: absolute;
      left: 50%;
      top: -0.533333rem;
      transform: translate(-50%);
      // border: 1px solid #eee;
      border-radius: 50%;
      color: #FFF;
      background-color: #fff;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
