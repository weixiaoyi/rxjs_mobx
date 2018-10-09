import { resOk, getRes, _, observable, action, runInAction, processResult, R } from '@utils'
import { getExample1, getExample2, getExample3 } from '@services/home'
import ModelExtend from './ModelExtend'

const {
  forkJoin, map,
  from, race, tap,
} = R

let i = 0

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
      .subscribe(([a, b]) => {
        this.changeModel('todos', [
          {
            name: i++,
          }
        ])
        return true
      })
  }

  getExampleRace = () => {
    from(getExample1())
      .pipe(
        race(from(getExample2())),
        map(v => processResult(v)),
        tap(v => console.log(v))
      )
      .subscribe(v => this.changeModel('todos', v))
  }

  getExample1 = async (v) => {
    const data = getRes(await getExample1())
    if (resOk(data)) {
      this.changeModel('todos', [
        {
          name: v,
        }
      ])
      return v
    }
  }

  getExample2 = async () => {
    const data = getRes(await getExample2())
    if (resOk(data)) {
      this.changeModel('todos', _.get(data, 'data'))
    }
  }
}