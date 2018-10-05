import { observable } from "mobx"

export default class DashBoard {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable todos2 = []

}