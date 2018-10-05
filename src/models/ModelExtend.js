import { observable, action, toJS, } from 'mobx'

export default class ModelExtend {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @action
  changeModel = (name, payload) => {
    this[name] = payload
  }
}