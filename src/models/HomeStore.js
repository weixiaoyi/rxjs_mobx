import { resOk, getRes, _, observable, action, runInAction, processResult } from '@utils'
import { getExample1, getExample2 } from '@services/home'
import ModelExtend from './ModelExtend'

import { forkJoin } from 'rxjs'
import { map, filter, switchMap } from 'rxjs/operators'

export default class Home extends ModelExtend {
  constructor(rootStore) {
    super(rootStore)
  }

  @observable todos = [
    { name: '1' },
    { name: '2' }
  ]

  getExample = () => {
    forkJoin(getExample1(), getExample2())
      .pipe(map(v => {
        return v.map(item => processResult(item))
      }))
      .subscribe(v => console.log(v))

  }

  getExample1 = async () => {
    const data = getRes(await getExample1())
    if (resOk(data)) {
      this.changeModel('todos', _.get(data, 'data'))
    }
  }

  getExample2 = async () => {
    const data = getRes(await getExample2())
    if (resOk(data)) {
      this.changeModel('todos', _.get(data, 'data'))
    }
  }
}