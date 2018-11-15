import { _, formatJson, } from '@utils'
import { Subject, } from 'rxjs'

class Ws {
  constructor({ url, flush = true, }) {
    this.config = {
      url, flush
    }
    this.flush = flush
    this.subscribeRecords = []
    this.promises = []
    this.ws$ = new Subject()
    this.ws = this.createWebsocket()

  }

  createWebsocket = () => {
    const { url } = this.config
    const ws = new WebSocket(url)
    ws.onopen = () => {
      if (this.subscribeRecords.length) {
        this.subscribeRecords.forEach(item => this.sendJson(item))
      }
      if (this.promises.length) {
        this.promises.forEach(item => this.sendJson(item))
        this.promises = []
      }
    }
    ws.onmessage = (e) => {
      this.ws$.next([e, formatJson(e.data)])
    }
    ws.onclose = (e) => {
      console.log(`${url}连接关闭...`, e)
      this.repeatConnect(e)
    }
    ws.onerror = (e) => {
      console.log(`${url}连接错误`, e)
      // 连接错误自动会促发连接关闭，这里不需要再次连接
    }
    return ws
  }

  hasConnected = () => {
    return this.ws.readyState === 1
  }

  sendJson = (obj) => {
    this.ws.send(JSON.stringify(obj))
  }

  send = (obj = {}) => {
    if (this.flush) this.subscribeRecords.push(obj)
    if (!this.hasConnected()) {
      this.promises.push(obj)
    } else {
      this.sendJson(obj)
    }
    return this.ws$
  }


  repeatConnect = (e) => {
    if (e.type === 'close' || e.type === 'error') {
      if (_.get(e, 'reason') === 'selfClose') return console.log('主动断开')
      // new Ws({
      //   ...this.config,
      //   _subscribeRecords: this.subscribeRecords
      // })
      this.ws = this.createWebsocket()
    }
  }


  close = () => {
    this.ws.close(4000, 'selfClose')
  }
}

export default new Ws({ url: 'ws://api.weixiaoyi/ws' })
