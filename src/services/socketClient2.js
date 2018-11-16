import { _, formatJson, } from '@utils'
import { Subject, } from 'rxjs'

class Ws {
  constructor({ url, buffer = null, interceptor = v => v, beforeSend, afterSend, bufferWhen }) {
    this.config = {
      url,
      buffer,
      interceptor,
      bufferWhen,
      beforeSend,
      afterSend
    }
    this.subscribeRecords = []
    this.promises = []
    this.ws$ = new Subject()
    this.ws = this.createWebsocket()
  }

  createWebsocket = () => {
    const { url } = this.config
    const ws = new WebSocket(url)
    ws.onopen = () => {
      console.log(`${url}连接开启.....`)
      if (this.subscribeRecords.length) {
        this.subscribeRecords.forEach(item => this.sendJson(undefined, item))
      }
      if (this.promises.length) {
        this.promises.forEach(item => this.sendJson(undefined, item))
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

  sendJson = (message, obj) => {
    const { afterSend } = this.config
    this.ws.send(JSON.stringify(obj))
    if (_.isFunction(afterSend)) {
      afterSend(message, obj)
    }
  }

  bufferWhen = (message, obj) => {
    const { bufferWhen, buffer } = this.config
    if (_.isFunction(bufferWhen)) {
      return bufferWhen(message, obj)
    }
    return buffer === true || (buffer !== false && obj._buffer === true)
  }

  send = (message = {}) => {
    try {
      let obj = _.cloneDeep(message)
      const { interceptor, buffer, beforeSend } = this.config
      if (_.isFunction(interceptor)) obj = interceptor(obj)
      if (!_.isObject(obj)) throw('send的参数或经interceptor处理后的结果必须是对象格式')
      if (this.bufferWhen(message, obj)) {
        this.subscribeRecords.push(obj)
      }
      if (_.isNumber(buffer) && buffer) {
        this.subscribeRecords = this.subscribeRecords.slice(-1, -Number(buffer))
      }
      if (_.isFunction(beforeSend)) {
        beforeSend(message, obj)
      }
      if (!this.hasConnected()) {
        this.promises.push(obj)
      } else {
        this.sendJson(message, obj)
      }
    } catch ( error ) {
      console.error(error)
    }
    return this.ws$
  }


  repeatConnect = (e) => {
    if (e.type === 'close' || e.type === 'error') {
      if (_.get(e, 'reason') === 'selfClose') return console.log('主动断开')
      this.ws = this.createWebsocket()
    }
  }


  close = () => {
    this.ws.close(4000, 'selfClose')
  }
}

export default new Ws({
  url: 'ws://api.weixiaoyi/ws',
  buffer: true
})
