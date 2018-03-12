/* eslint-disable */
/**
 * 获取 url 中 token 值
 */
export const getUrlQuery = (name) => {
  var result = window.location.search.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'))
  if (result == null || result.length < 1)
    return undefined
  return decodeURIComponent(result[1])
}

/**
 * 格式化时间
 */
function add0 (m) {
  return m < 10 ? '0' + m : m
}

// 返回时间对象
export const getDealTime = (number) => {
  let time = new Date(number * 1000)
  return {
    y: time.getFullYear(),
    m: add0(time.getMonth() + 1),
    d: add0(time.getDate()),
    h: add0(time.getHours()),
    mm: add0(time.getMinutes()),
    s: add0(time.getSeconds())
  }
}

export const format = (number) => {
  let time = getDealTime(number)
  return time.m + '/' + time.d + '/ ' + time.h + ':' + time.mm
}

export const sysTime = (number) => {
  let time = getDealTime(number)
  return time.y + '.' + time.m + '.' + time.d
}

/*
 * 通过时长返回时间
 * */
export const timeLine = (number) => {
  let minuteCale = Math.floor(number / 60)
  if (minuteCale < 1) {
    return number + '秒'
  }
  let hoursCale = Math.floor(minuteCale / 60)
  let second = add0(number - minuteCale * 60)
  if (hoursCale < 1) {
    return add0(minuteCale) + '分' + second + '秒'
  }
  return add0(hoursCale) + '小时' + second + '分' + second + '秒'

}
/**
 * 存储 sessionStorage
 */
export const setSession = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

/**
 * 获取 sessionStorage
 */
export const getSession = (name, isObj) => {
  if (!name) return
  if (isObj) {
    return JSON.parse(window.sessionStorage.getItem(name))
  } else {
    return window.sessionStorage.getItem(name)
  }
}

/**
 * 存储 localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取 localStorage
 */
export const getStore = (name, isObj) => {
  if (!name) return
  if (isObj) {
    return JSON.parse(window.localStorage.getItem(name))
  } else {
    return window.localStorage.getItem(name)
  }
}

/**
 * 删除 localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 删除 sessionStorage
 */
export const removeSession = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}

export const payOrder = orderId => {
  return new Promise(async (resolve, reject) => {
    const data = {
      order_id: orderId,
      pay_type: 'wx_pub'
    }
    const { fetchAPI } = require('./ajaxUtil')
    const pingpp = require('pingpp-js')
    const chargeResult = await fetchAPI('POST', '/api/pingpp/charge/', {data})
    console.log('chargeResult', chargeResult)
    pingpp.createPayment(chargeResult, function(result, err){
      console.log('pingpp', result, err)
      
      if (result == "success") {
        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
        alert('支付成功')
        resolve()
      } else if (result == "fail") {
        // charge 不正确或者微信公众账号支付失败时会在此处返回
        alert('支付失败')
        reject()
      } else if (result == "cancel") {
        // 微信公众账号支付取消支付
        alert('已取消支付')
        reject()
      }
    });
  })
}





