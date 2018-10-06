import { observable } from 'mobx'
import ModelExtend from './ModelExtend'

export default class DashBoard extends ModelExtend {
  constructor(rootStore) {
    super(rootStore)
  }

  @observable todos2 = []

}