import axios from 'axios'
import { Indicator, Toast } from 'mint-ui'
import env from '../../config/dev.env'
import Raven from 'raven-js'

// 处理ajax请求
function doAjax (config) {
  console.log(env.API_URL)
  // Indicator.open({
  //   text: '加载中...',
  //   spinnerType: 'fading-circle'
  // })
  return axios(config).then((res) => {
    if (typeof res.data === 'object' && typeof res.data.status === 'undefined') {
      res.data.status = true
    }
    // Indicator.close()
    return res.data
  }).catch((error) => {
    return { status: false, error: error.message }
  })
}

export default {
  doGetRequest (config) {
    config.method = 'GET'
    config.url = `${config.url}`
    return doAjax(config)
  },
  doPostRequest (config) {
    config.method = 'POST'
    config.url = `${config.url}`
    return doAjax(config)
  }
}

export const fetchAPI = (method, url, data) => {
  // Indicator.open({
  //   text: '加载中...',
  //   spinnerType: 'fading-circle'
  // })
  console.log('000000000')
  return new Promise((resolve, reject) => {
    axios({
      ...data,
      method,
      url
    }).then(response => {
      // Indicator.close()
      resolve(response.data)
    }).catch(e => {
      Raven.captureException(e)
      Indicator.close()
      Toast('网络异常')
      reject(e)
    })
  })
}
