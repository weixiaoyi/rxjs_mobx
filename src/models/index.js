import Home from './Home'
import DashBoard from './DashBoard'

class RootStore {
  constructor() {
    this.homeStore = new Home(this)
    this.dashBoardStore = new DashBoard(this)
  }
}

export default new RootStore()