import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import { loadData, loadAddress } from '@/utils/cartStore'

Vue.use(Vuex)

const state = {
  cartData: loadData(),
  address: loadAddress(),
  user: null,
  isAddress: true,
  order: {
    goodsCartList: [],
    showImg: [],
    totalNum: 0,
    emergencyFee: '0',
    selected: '',
    date: '',
    time: '',
    remark: '',
    exist: '',
    pay_type: '1'
  },
  tags: [
    { word: '上批有货要退', isActive: false },
    { word: '特殊放货位置', isActive: false },
    { word: '配带检测报告', isActive: false }
  ],
  markInfo: '',
  selectAllStatus: true,
  isempty: false
}

const getters = {
  isempty: state => {
    const data = state.cartData
    let status = false
    if (data.data.length === 0) {
      status = true
    }
    return status
  },
  exportShopCart: state => {
    const data = state.cartData
    let exportData = {
      count: 0,
      data: []
    }
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].select) {
        exportData.data.push(data.data[i])
        exportData.count += data.data[i].count
      }
    }
    return exportData
  },
  selectGoodsList: state => {
    const { data } = state.cartData
    const list = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].select) list.push(data[i])
    }
    return list
  },
  totalGoodsCount: state => {
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
  selectedGoodsPrice: state => {
    const { data } = state.cartData
    let sum = 0
    for (let i = 0; i < data.length; i++) {
      let good = data[i]
      if (good.select) {
        let price = state.user.is_vip ? good.customer_price : good.normal_price
        sum += price * good.count
      }
    }
    return sum
  },
  orderImages: state => {
    const { data } = state.cartData
    let images = []
    for (var i = 0; i < data.length; i++) {
      if (data[i].select && i < 3) {
        images.push(data[i])
      }
    }
    return images
  },
  orderRemark: state => {
    let str = ''
    for (let i = 0; i < state.tags.length; i++) {
      let tag = state.tags[i]
      if (tag.isActive) {
        str += tag.word
      }
    }
    return str + state.markInfo || ''
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
