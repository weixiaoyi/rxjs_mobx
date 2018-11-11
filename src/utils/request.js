import axios from 'axios'
import { _, localSave } from '@utils'
import pathToRegexp from 'path-to-regexp'
import { stringify } from 'qs'

axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
axios.defaults.maxContentLength = 20000000

axios.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

let interval = null


export function request(url = '', options = {}) {
  const { method = 'get', formData = false, params, query, body, needLoop = false, needWatch = true, errHandler, ...rest } = options
  if (params) {
    const toPath = pathToRegexp.compile(url)
    url = toPath(params)
  }
  const transform = formData ? {
    transformRequest: [(data, headers) => {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
      data = stringify(data)
      return data
    }]
  } : {}
  return axios({
    ...{
      method,
      params: query,
      data: body,
      url,
      baseURL: ''
    },
    ...transform,
    ...rest
  })
    .then((res) => {
      return res
    })
    .catch((error) => {
      if (_.has(error, 'response.status')) {
        switch (error.response.status) {
          case 401:
            return Promise.reject(error)
          default:
        }
      }
      if (needWatch) {
        if (_.get(error, 'response.data.ret') === '100100'
          || _.get(error, 'response.data.errStr') === 'token expired') {
        } else {
          if (errHandler) {
            let result
            // 需要单独的错误处理器
            const err = _.get(error, 'response.data')
            result = err ? errHandler(err) : errHandler(error)
            return result
          } else {
            if (_.has(error, 'response.data.errMsg') || _.has(error, 'response.data.errStr')) {
              const message = _.get(error, 'response.data.errMsg') || _.get(error, 'response.data.errStr')
              console.log(message)
            } else {
              if (method === 'get') {
                console.log('数据获取失败')
              } else {
                console.log('操作失败')
              }
            }
          }
        }
        console.log(url + '请求出错')
      }
      if (needLoop) {
        // 发生错误需要重新请求
        clearTimeout(interval)
        interval = setTimeout(() => {
          return new Promise((resolve) => {
            const result = request(url, options)
            resolve(result)
          })
        }, 2000)
      }
    })
}


