import { addItem, removeItem, clearCartStore, cancelItem, handleItem, seletItem, selectAll, selectAllStatus } from '@/utils/cartStore'

export default {
  addGood (state, good) {
    state.cartData = addItem(good)
  },
  removeGood (state, good) {
    state.cartData = removeItem(good)
  },
  clearCart (state) {
    state.cartData = clearCartStore()
  },
  selectAddress (state, address) {
    state.address = seletItem(address)
  },
  cancelGood (state, good) {
    state.cartData = cancelItem(good)
  },
  selectAllStatus (state) {
    state.selectAllStatus = selectAllStatus()
  },
  handleCount (state, good) {
    state.cartData = handleItem(good)
  },
  isSelectAll (state, status) {
    console.log(status)
    state.cartData = selectAll(status)
  },
  saveOrder (state, order) {
    state.order = order
  },
  saveRemark (state, data) {
    console.log('saveRemark', data)
    state.tags = data.tags
    state.markInfo = data.markInfo
  },
  initRemark (state) {
    state.tags = [
      { word: '上批有货要退', isActive: false },
      { word: '特殊放货位置', isActive: false },
      { word: '配带检测报告', isActive: false }
    ]
    state.markInfo = ''
  }
}
