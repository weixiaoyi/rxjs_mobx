import { resOk, getRes, _, observable, action, runInAction, processResult, R } from '@utils'
import { getExample1, getExample2 } from '@services/home'
import ModelExtend from './ModelExtend'

const { forkJoin, map, from, race } = R

export default class Home extends ModelExtend {
  constructor(rootStore) {
    super(rootStore)
  }

  @observable todos = [
    { name: '1' },
    { name: '2' }
  ]

  getExampleSync = () => {
    forkJoin(getExample1(), getExample2())
      .pipe(map(v => {
        return v.map(item => processResult(item))
      }))
      .subscribe(([a, b]) => this.changeModel('todos', a.concat(b)))
  }

  getExampleRace = () => {
    from(getExample1())
      .pipe(
        race(getExample2()),
        map(v => processResult(v)))
      .subscribe(v => this.changeModel('todos', v))
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