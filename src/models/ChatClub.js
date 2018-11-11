import { resOk, getRes, _, observable, action, runInAction, processResult, R } from '@utils'
import { getExample1, } from '@services/chatClub'
import ModelExtend from './ModelExtend'

const {
  forkJoin, map,
  from, race, tap,
} = R

export default class ChatClub extends ModelExtend {
  constructor(rootStore) {
    super(rootStore)
  }


  getExample1 = async ({ search }) => {
    const data = getRes(await getExample1({ search }))
    if (resOk(data)) {

      this.changeModel('todos', [
        {
          name: search,
        }
      ])
      return data.data
    }
  }
}