import { observable, action, toJS, } from 'mobx'
import ModelExtend from './ModelExtend'

export default class Home extends ModelExtend {
  constructor(rootStore) {
    super(rootStore)
  }

  @observable todos = [
    { name: '1' },
    { name: '2' }
  ]
}