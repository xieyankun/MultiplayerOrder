
const CART_KEY = 'CART'

const initCartData = {
  data: [],
  count: 0,
  totalPrice: 0
}

// let saveData = function (data) {
//   localStorage.setItem(CART_KEY, JSON.stringify(data))
// }

export let loadCartData = function () {
  let dataStr = localStorage.getItem(CART_KEY)
  console.log(dataStr)
  try {
    return JSON.parse(dataStr) || initCartData
  } catch (e) {
    console.error(e)
    return initCartData
  }
}

export let addItem = function (targetItem) {
  let CartData = loadCartData()
  let flag = false

  for (let i = 0; i < CartData.data.length; i++) {
    let item = CartData.data[i]
    if (item.id === targetItem.id) {
      item.count++
      flag = true
      break
    }
  }
  if (!flag) {
    targetItem.count = 1
    targetItem.select = true
    CartData.data.push(targetItem)
  }
  if (targetItem.select === true) {
    CartData.count += 1
  }

  // saveData(data)
  return CartData
}

export let removeItem = function (targetItem) {
  let data = loadCartData()
  return data
}

export let getItemCount = function (good) {
  let data = loadCartData()
  for (let i = 0; i < data.data.length; i++) {
    if (data.data[i].id === good.id) {
      return data.data[i].count
    }
  }
  return 0
}

export let getTotalCount = function () {
  let data = loadCartData()
  return data.count
}

export let clearCartStore = function () {
  let { data } = loadCartData()
  const newData = []
  console.log('clearCartStore', data)
  for (let i = 0; i < data.length; i++) {
    if (!data[i].select) {
      newData.push(data[i])
    }
  }
  return {
    data: newData,
    count: newData.length
  }
}
