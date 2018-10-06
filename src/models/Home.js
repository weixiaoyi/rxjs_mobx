import { observable, action, runInAction } from 'mobx'
import { getExample } from '@services/home'
import { resOk, getRes } from '@utils'
import ModelExtend from './ModelExtend'

export default class Home extends ModelExtend {
  constructor(rootStore) {
    super(rootStore)
  }

  @observable todos = [
    { name: '10' },
    { name: '2' }
  ]

  @action
  getExample = async () => {
    const data = getRes(await getExample())
    if (resOk(data)) {
      this.changeModel('todos', data.data)
    }
  }
}