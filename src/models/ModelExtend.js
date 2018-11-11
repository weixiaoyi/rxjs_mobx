import { observable, action, toJS, } from 'mobx'
import { _ } from '@utils'

export default class ModelExtend {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @action
  changeModel = (k, v) => {
    if (k) {
      this[`${k}_prev`] = this[k]
      _.set(this, `${k}`, v)
    } else {
      console.error('changeModel参数的k是必须参数')
    }
  }

  dispatch = (payloads = {}) => {
    const { type, payload } = payloads
    const setLoading = (status) => {
      if (_.has(this, `loading.${type}`)) {
        this.changeModel(`loading.${type}`, status)
      }
    }
    if (type && this[type]) {
      setLoading(true)
      return this[type](payload)
        .then(res => {
          setLoading(false)
          return res
        })
    } else {
      console.error('dispatch参数的type是必须参数,并且必须存在这个方法')
    }
  }
}