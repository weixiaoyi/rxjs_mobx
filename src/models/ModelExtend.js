import { observable, action, toJS, } from 'mobx'
import { _ } from '@utils'

export default class ModelExtend {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @action
  changeModel = (k, v) => {
    if (k) {
      this[k] = v
    } else {
      console.error('changeModel参数的k是必须参数')
    }
  }

  dispatch = (payloads = {}) => {
    const { type, payload } = payloads
    if (type && this[type]) {
      this[type](payload)
    } else {
      console.error('dispatch参数的type是必须参数,并且必须存在这个action')
    }
  }
}