<template>
  <span class="cartcontrol">
    <transition name="move">
      <i class="inner icon udmps ki-jian cart-decrease" v-show="count > 0" @click.stop.prevent="decreaseGood"></i>
    </transition>
    <span v-show="count > 0" class="cart-count">{{incount}}</span>
    <i class="icon udmps ki-jia cart-add" @click.stop.prevent="addGood"></i>
  </span>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    good: {
      type: Object
    }
  },
  data () {
    return {
      shopping_num: 0,
      goodItem: {},
      cartList: [],
      count: 0,
      incount: 0
    }
  },
  created () {
    this.count = this.getCount();
    this.incount = this.count;
  },
  computed: {
  },
  methods: {
    addGood (event) {
      this.count++
      this.incount = this.count
      this.$store.commit('addGood', this.good)
      this.$emit('selectChange')
    },
    decreaseGood (event) {
      this.count--
      this.incount = this.count
    },
    getCount () {
      const data = this.$store.state.cartData.data
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === this.good.id) {
          return data[i].count
        }
      }
      return 0
    }
  }
}
</script>

<style lang="scss">
.cartcontrol{
  display: flex;
  .inner{
    display: inline-block;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
    transition: all 0.4s linear;
    transform: rotate(0);
  }
  .move-enter-active, .move-leave-active{
    transition: all 0.4s linear;
  }
  .move-enter, .move-leave-active{
    opacity: 0;
    transform: translate3d(24px, 0, 0);

    .inner{
      transform: rotate(180deg)
    }
  }
  .cart-decrease{
    display: inline-block;
    padding: 6px;
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  .cart-count{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    color: rgb(147, 153, 159);
  }
  .cart-add{
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
}
</style>
