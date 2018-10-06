import HomeStore from './HomeStore'
import DashBoardStore from './DashBoardStore'

class RootStore {
  constructor() {
    this.homeStore = new HomeStore(this)
    this.dashBoardStore = new DashBoardStore(this)
  }
}

export default new RootStore()