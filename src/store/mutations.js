import {
  addItem,
  removeItem
} from '@/utils/cartStore'

export default {
  addGood(state, good) {
    console.log(good)
    state.cartData = addItem(good)
  },
  removeItem(state, good) {
    state.cartData = removeItem(good)
  }
}
