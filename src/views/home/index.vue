<template>
  <div class="home">
    <p class="title">— 如您需要 —</p>
    <div class="help">
      <button @click="callWaiter">呼叫前台</button>
      <button @click="feedBack">投诉建议</button>
    </div>
    <div class="desk-info">
      <p class="list">
        <span>桌位</span>
        <span>19号桌</span>
      </p>
      <p class="list">
        <span>当前点餐用户</span>
        <span>头像</span>
      </p>
      <p class="list">
        <span>我的订单（含历史订单）</span>
        <span>4</span>
      </p>
    </div>
    <p class="title">— 商品列表 —</p>
    <div class="goods-warp">
      <div class="good-item" v-for="(good, index) in data" :key="good.id">
        <img src="../../assets/logo.png" alt="">
        <div class="item-info">
          <h2>{{good.name}} {{index}}</h2>
          <p>￥{{good.price}}</p>
          <p class="option">
            <span>{{good.type}}</span>
            <good-control :good="good" @selectChange="itemChange"></good-control>
          </p>
        </div>
      </div>
    </div>
    <div class="cart-bar">
      <shop-cart></shop-cart>
    </div>
  </div>
</template>

<script>
import GoodControl from '@/components/GoodControl'
import ShopCart from '@/components/ShopCart'
export default {
  components: {
    GoodControl,
    ShopCart
  },
  data () {
    return {
      data: {
        good1: {
          id: 1,
          name: '可口可乐',
          price: 87,
          type: '瓶装'
        },
        good2: {
          id: 1,
          name: '可口可乐',
          price: 87,
          type: '瓶装'
        },
        good3: {
          id: 1,
          name: '可口可乐',
          price: 87,
          type: '瓶装'
        }
      },
      goods: [
        {id: 1, name: '可口可乐', price: 87, type: '瓶装'},
        {id: 2, name: '可口可乐', price: 80, type: '瓶装'},
        {id: 3, name: '可口可乐', price: 18, type: '瓶装'},
        {id: 4, name: '可口可乐', price: 82, type: '瓶装'},
        {id: 5, name: '可口可乐', price: 38, type: '瓶装'},
        {id: 6, name: '可口可乐', price: 68, type: '瓶装'},
        {id: 7, name: '可口可乐', price: 89, type: '瓶装'}
      ]
    }
  },
  methods: {
    itemChange() {
      console.log('0000')
    },
    callWaiter() {},
    feedBack() {}
  }
}
</script>
<style scoped lang="scss">
.home{
  .title, .help{
    text-align: center;
  }
  .help, .desk-info, .goods-warp{
    background-color: #fff;
    margin-bottom: 12px;
    padding: 12px 12px;
  }
  .title{
    padding: 12px;
    background-color: #FFF;
    margin-bottom: 8px;
  }
  .list{
    display: flex;
    justify-content: space-between;
  }
  .good-item{
    display: flex;
    border-bottom: 1px solid #ececec;
    padding: 8px 0;
    img{
      width: 96px;
      height: 96px;
    }
    .option{
      display: flex;
      justify-content: space-between;
    }
    .item-info{
      flex: 1;
    }
  }
  .cart-bar{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
