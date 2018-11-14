import { _, formatJson, } from '@utils'
import { forkJoin, from, of, Subject, } from 'rxjs'
import { map, race, retry, catchError, tap, take, share, debounceTime, takeWhile } from 'rxjs/operators'

class Ws {
  constructor({ url, flush = true }) {
    this.subscribeRecords = []
    this.promises = []
    this.ws$ = new Subject()
    this.ws = new WebSocket(url)
    this.ws.onopen = () => {
      if (this.promises.length) {
        this.promises.forEach(item => this.send(item))
        this.promises = []
      }
    }
    this.ws.onmessage = (e) => {
      this.ws$.next([e, formatJson(e.data)])
    }
    this.ws.onclose = (e) => {
      console.log(`${url}连接关闭...`, e)
      this.repeatConnect(e)
    }
    this.ws.onerror = (e) => {
      console.log(`${url}连接错误`, e)
      // 连接错误自动会促发连接关闭，这里不需要再次连接
    }
  }

  hasConnected = () => {
    return this.ws.readyState === 1
  }

  send = (obj = {}) => {
    this.subscribeRecords.push(obj)
    if (!this.hasConnected()) {
      this.promises.push(obj)
    } else {
      this.ws.send(JSON.stringify(obj))
    }
    return this.ws$
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

export default new Ws({ url: 'ws://api.weixiaoyi/ws' })
