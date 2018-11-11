import HomeStore from './HomeStore'
import DashBoardStore from './DashBoardStore'
import ChatClub from './ChatClub'

class RootStore {
  constructor() {
    this.homeStore = new HomeStore(this)
    this.dashBoardStore = new DashBoardStore(this)
    this.chatClub = new ChatClub(this)
  }
}

export default new RootStore()