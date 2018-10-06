import { resOk, getRes, _, observable, action, runInAction } from '@utils'
import { getExample } from '@services/home'
import ModelExtend from './ModelExtend'

export default class Home extends ModelExtend {
  constructor(rootStore) {
    super(rootStore)
  }

  @observable todos = [
    { name: '1' },
    { name: '2' }
  ]

  getExample = async () => {
    const data = getRes(await getExample())
    if (resOk(data)) {
      this.changeModel('todos', _.get(data, 'data'))
    }
  }
}