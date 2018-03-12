
const CART_KEY = 'CART'
const ADDRESS_KEY = 'ADDRESS'
// const CART_ITEM_COUNT_KEY = 'CART_ITEM_COUNT'
const initData = {
  data: [],
  count: 0
}
const initAddress = {
  address: {},
  isSelect: 0
}

export let loadData = function () {
  let dataStr = localStorage.getItem(CART_KEY)
  try {
    return JSON.parse(dataStr) || initData
  } catch (e) {
    console.error(e)
    return initData
  }
}

// 加载地址
export let loadAddress = function () {
  let dataStr = localStorage.getItem(ADDRESS_KEY)
  try {
    return JSON.parse(dataStr) || initAddress
  } catch (e) {
    console.error(e)
    return initAddress
  }
}

let saveData = function (data) {
  localStorage.setItem(CART_KEY, JSON.stringify(data))
}
let saveAddress = function (data) {
  localStorage.setItem(ADDRESS_KEY, JSON.stringify(data))
}

export let addItem = function (targetItem) {
  let data = loadData()
  let flag = false
  for (let i = 0; i < data.data.length; i++) {
    let item = data.data[i]
    if (item.id === targetItem.id) {
      item.count ++
      flag = true
      break
    }
  }

  if (!flag) {
    targetItem.count = 1
    targetItem.select = true
    data.data.push(targetItem)
  }
  if (targetItem.select === true) {
    data.count += 1
  }
  console.log('addItem', data)
  saveData(data)
  return data
}

// 选择地址
export let seletItem = function (targetSelect) {
  console.log('targetSelect', targetSelect)
  let data = loadAddress()
  data.address = targetSelect
  saveAddress(data)
  return data
}

export let removeItem = function (targetItem) {
  let data = loadData()
  let index = null
  for (let i = 0; i < data.data.length; i++) {
    let item = data.data[i]
    if (item.id === targetItem.id) {
      index = i
      break
    }
  }
  let item = data.data[index]
  if (item.count > 1) {
    item.count --
  } else {
    console.log('remove item from data', targetItem)
    data.data.splice(index, 1)
  }

  data.count -= 1
  saveData(data)
  return data
}

export let getItemCount = function (good) {
  let data = loadData()
  for (let i = 0; i < data.data.length; i++) {
    if (data.data[i].id === good.id) {
      return data.data[i].count
    }
  }
  return 0
}

export let getTotalCount = function () {
  let data = loadData()
  return data.count
}

export let clearCartStore = function () {
  let { data } = loadData()
  const newData = []
  console.log('clearCartStore', data)
  for (let i = 0; i < data.length; i++) {
    if (!data[i].select) {
      newData.push(data[i])
    }
  }
  saveData({
    data: newData,
    count: newData.length
  })
  console.log('clearCartStore', data, newData)
  return {
    data: newData,
    count: newData.length
  }
}

export let cancelItem = function (targetItem) {
  let data = loadData()
  let newData = data.data
  console.log('data----------------')
  console.log(targetItem)
  console.log(data)

  for (var i = 0; i < newData.length; i++) {
    if (newData[i].id === targetItem.id) {
      if (!targetItem.select) {
        newData[i].select = false
        data.count = data.count - newData[i].count
        break
      } else {
        newData[i].select = true
        data.count = data.count + newData[i].count
        break
      }
    }
  }
  saveData(data)
  return data
}

export let handleItem = function (targetItem) {
  let data = loadData()
  console.log(targetItem)

  let index = null
  for (let i = 0; i < data.data.length; i++) {
    let item = data.data[i]
    if (item.id === targetItem.id) {
      index = i
    }
  }
  if (targetItem.count && targetItem.count > 0) {
    data.data[index].count = targetItem.count
  } else {
    data.data.splice(index, 1)
  }
  saveData(data)
  return data
}

export let selectAll = function (status) {
  let data = loadData()
  console.log(status)
  if (status) {
    console.log('----')
    for (var i = 0; i < data.data.length; i++) {
      data.data[i].select = true;
    }
  } else {
    console.log('====')
    for (var i = 0; i < data.data.length; i++) {
      data.data[i].select = false;
    }
  }
  saveData(data)
  return data
}

export let selectAllStatus = function () {
  let {data} = loadData()
  let status = true;
  for (var i = 0; i < data.length; i++) {
    if(!data[i].select) status = false
  }
  console.log('=================')
  console.log(data)
  console.log(status)
  return status
}


