<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="parseInt(count)>0" @click.stop.prevent="decreaseGood">
        <i class="inner icon udmps ki-jian"></i>
      </div>
    </transition>
    <div v-show="parseInt(count)>0">
      <input class="count" type="number" pattern="[0-9]*" inputmode="numeric" v-model.number="incount" @focus.stop.prevent="clickInput" @blur.stop.prevent="changeCount">
    </div>
    <div class="cart-add" @click.stop.prevent="addGood">
      <i class="icon udmps ki-jia"></i>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import {setStore, getStore} from '@/utils/utils'
import {addItem, removeItem, getItemCount} from '@/utils/cartStore'
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
    // incount: function(){
    //   return this.count;
    // }
  },
  methods: {
    addGood (event) {
      this.$store.commit('addGood', this.good)
      this.count ++
      this.incount = this.count
      this.$emit('itemChange')
    },
    decreaseGood (event) {
      this.$store.commit('removeGood', this.good)
      this.count --
      this.incount = this.count
      this.$emit('itemChange')
    },
    getCount () {
      const data = this.$store.state.cartData.data
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === this.good.id) {
          return data[i].count
        }
      }
      return 0
    },
    changeCount () {
      let data
      if (this.incount === '') {
        data = this.incount = 0
      }else{
        data = parseInt(this.incount);
      }
      this.count = data
      this.good.count = isNaN(data) ? 0 : data;
      this.$store.commit('handleCount', this.good) 
    },
    clickInput (e) {
      console.log('clickInput', e)
      const length = e.target.value.length * 2
      setTimeout(function () {
      	e.target.setSelectionRange(length, length)
      }, 0)
    }
  }
}
</script>

<style lang="scss">
  .inner{
    color: #c3a2a5;
    transition: all 0.4s linear;
    transform: rotate(0);
  }
  .move-enter-active, .move-leave-active{
    transition: all 0.4s linear;
  }
  .move-enter, .move-leave-active{
    opacity: 0;
    transform: translate3d(24px, 0, 0);
  }
  .cartcontrol{
    display: flex;
    .count{
      width: 0.96rem;
      border: none;
      text-align: center;
      font-size: 0.48rem;
    }
    .udmps {
      font-size: 0.64rem;
      color: #e21020;
      vertical-align: middle;
    }
  }
</style>
