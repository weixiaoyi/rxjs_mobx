import { _, formatJson, } from '@utils'
import { forkJoin, from, of, Subject, } from 'rxjs'
import { map, race, retry, catchError, tap, take, share, debounceTime, takeWhile } from 'rxjs/operators'

class Ws {
  constructor(url) {
    this.ws$ = new Subject()
    this.ws = new WebSocket(url)
    this.ws.onopen = () => {
    }
    this.ws.onmessage = (e) => {
      this.ws$.next(formatJson(e.data))
    }
    this.ws.onclose = (e) => {

    }
    this.ws.onerror = (e) => {

    }
  }


  repeatConnect = (e) => {
    if (e.type === 'close' || e.type === 'error') {
      if (_.get(e, 'reason') === 'selfClose') return console.log('主动断开')
      if (this.suddenDead) this.suddenDead()
    }
  }


  close = () => {
    this.ws.close(4000, 'selfClose')
  }
}

export default new Ws('ws://api.weixiaoyi/ws')
