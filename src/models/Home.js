import { observable, action, toJS, } from 'mobx'

export default class Home {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable todos = [
    { name: '1' },
    { name: '2' }
  ]

  @action
  changeTodos = () => {
    this.todos = [
      { name: '3' },
      { name: '4' }
    ]
  }
}