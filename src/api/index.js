import axios from 'axios'
import Raven from 'raven-js'

let api = axios.create({
  baseURL: '',
  timeout: 1000,
  withCredentials: true,
  headers: {
    // 'Accept': 'application/json'
  }
})

export let wechatLogin = () => {
  let appid = process.env.WX_APPID
  console.log('process.env', process.env)
  let redirectUri = encodeURIComponent(window.location.href)
  let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  window.location = url
}

export let loginRequired = (user) => {
  console.log('loginRequired', user)
  if (!user) {
    wechatLogin()
  }
}

export let fetch = (method, url, data, forceLogin = true) => {
  return new Promise((resolve, reject) => {
    axios({
      ...data,
      method: method,
      url: url
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      if (forceLogin && err.response.status === 401) {
        console.log('未登录')
        wechatLogin()
      } else if (err.response.status === 403) {
        console.log('无权限')
        alert('您没有权限访问该页面')
        window.history.back()
      } else {
        Raven.captureException(err)
        console.log('fetch err', err)
      }
      reject(err)
    })
  })
}

// 获取数据
export let loadGoodData = () => {}

export let loadUserData = () => {
  return new Promise((resolve, reject) => {
    let user = null
    let cacheKey = 'authUserJsonStr'
    let authUserJsonStr = sessionStorage.getItem(cacheKey)
    if (authUserJsonStr) {
      user = JSON.parse(sessionStorage.getItem(cacheKey))
      resolve(user)
    } else {
      fetch('GET', '/api/auth_info/', {}, false).then((data) => {
      // fetch('GET', '/api/fake_login/?key=zmkm&uid=10', {}, false).then((data) => {
        user = data
        sessionStorage.setItem(cacheKey, JSON.stringify(user))
        resolve(user)
      }).catch(() => {
        resolve(null)
      })
    }
  })
}

export let logoutUser = () => {
  let cacheKey = 'authUserJsonStr'
  console.log('退出登录')
  fetch('DELETE', '/api/auth_info/').then(result => {
    console.log('退出登录成功')
    sessionStorage.removeItem(cacheKey)
    window.location.reload()
  })
}

export const getBoards = () => {
  return api.get('/api/boards/')
}

export const getAdminBoards = () => {
  return api.get('/admin/api/boards/')
}
