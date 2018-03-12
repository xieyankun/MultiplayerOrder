<template>
  <div>
    <div class="shopcart">
      <div class="content" @click.stop.prevent="toggleList">
        <div class="logo-wrap" :class="{'highlight': totalCount > 0}">
          <span class="cart">
            <i class="icon udmps ki-cart" :class="{'highlight': totalCount > 0}"></i>
          </span>
          <span class="num">{{ $store.state.cartData.count }}</span>
        </div>
        <p class="totalPrice">￥{{$store.getters.totalPrice}}</p>
        <button>去结账</button>
      </div>

      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="item in cartData" :key="item.id">
                <span class="name">{{item.name}}</span>
                <div class="price">
                  <span>￥{{item.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <good-control :good="item" v-on:selectChange="itemChange"></good-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>

</template>

<script>
/* eslint-disable */
import GoodControl from '@/components/GoodControl'
export default {
  props: {
  },
  components: {
    GoodControl
  },
  data () {
    return {
      fold: true
    }
  },
  created () {
  },
  computed: {
    totalPrice() {
      const { data } = state.cartData
      let totalPrice = 0
      for (let i = 0; i < data.length; i++) {
        let good = data[i]
        if (good.select) {
          totalPrice += good.price * good.count
        }
      }
      return totalPrice
    },
    totalCount() {
      return this.$store.state.cartData.count;
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      return show;
    },
    cartData() {
      return this.$store.state.cartData.data
    }
  },
  methods: {
    itemChange() {
      console.log('pppp')
    },
    toggleList() {
      console.log(this.fold)
      this.fold = !this.fold
      console.log(this.fold)
    },
    hideList() {
      this.fold = true
    },
    empty() {}
  }
}
</script>

<style lang="scss">
.shopcart{
  .content{
    display: flex;
    justify-content: space-between;
    font-size: 32px;
    background: #18314d;
    color: #FFF;
    z-index: 999;
  }
  .logo-wrap{
    width: 58px;
    height: 58px;
    border-radius: 50%;
    position: relative;
    top: -12px;
    background: #18314d;
    text-align: center;
  }
  .totalPrice{
    flex: 1;
  }
  i{
    font-size: 32px;
  }
  button{
    width: 40%;
  }
  .cart{
    margin-top: 8px;
    display: block;
  }
  .num{
    font-size: 12px;
    position: absolute;
    top: 8px;
    right: 0;
    background: red;
    padding: 0 4px;
    border-radius: 8px;
  }
}
.shopcart-list{
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  transform: translate3d(0, -100%, 0);

  &.fold-enter-active, &.fold-leave-active{
    transition: all 0.5s;
  }
  &.fold-enter, &.fold-leave-active{
    transform: translate3d(0, 0, 0)
  }
  .list-header{
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);

    .title{
      float: left;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }

    .empty{
      float: right;
      font-size: 12px;
      color: rgb(0, 160, 220);
    }
  }

  .list-content{
    padding: 0 18px;
    max-height: 217px;
    overflow: auto;
    background: #fff;
    .food{
      position: relative;
      padding: 12px 0;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;

      .name{
        line-height: 24px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .price{
        position: absolute;
        right: 90px;
        bottom: 12px;
        line-height: 24px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(240, 20, 20);
      }
      .cartcontrol-wrapper{
        position: absolute;
        right: 0;
        bottom: 6px;
      }
    }
  }
}

.list-mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  // backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter-active, &.fade-leave-active{
    transition: all 0.5s
  }

  &.fade-enter, &.fade-leave-active{
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }

}







</style>
