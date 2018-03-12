import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import { loadCartData } from '@/utils/cartStore'

Vue.use(Vuex)

const state = {
  cartData: loadCartData()
}

const getters = {
  totalGoodsCount: state => {
    console.log(state)
    const { data } = state.cartData
    let count = 0
    for (let i = 0; i < data.length; i++) {
      count += data[i].count
    }
    return count
  },
  selectedGoodsCount: state => {
    const { data } = state.cartData
    let sum = 0
    for (let i = 0; i < data.length; i++) {
      let good = data[i]
      if (good.select) {
        sum += good.count
      }
    }
    return sum
  },
  totalPrice(state) {
    const { data } = state.cartData
    let totalPrice = 0
    for (let i = 0; i < data.length; i++) {
      let good = data[i]
      if (good.select) {
        totalPrice += good.price * good.count
      }
    }
    return totalPrice
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
