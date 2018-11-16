import { Server } from 'mock-socket'
import { _, } from '@utils'

let i = 0
let apple = 0
let banana = 10000

class MockServer {
  constructor(url) {
    this.clients = []
    this.server = new Server(url)
    this.server.on('connection', socket => {
      socket.id = _.uniqueId('client_')
      this.clients.push({
        socket,
        id: socket.id
      })
      socket.on('message', (e) => {
        const data = JSON.parse(e)
        const type = data.subscribe || data.unsubscribe
        switch (type) {
          case 'apple': {
            this.handleApple(socket, data)
            break
          }
          case 'banana': {
            this.handleBanana(socket, data)
            break
          }
          default: {
            console.error('message必须指明type是subscribe还是unsubscribe')
          }
        }
      })
      socket.on('close', () => {
        _.splice(this.clients, item => item.id === socket.id)
      })

      if (i < 1) {
        setTimeout(() => {
          i++
          socket.close()
          this.clients = []
        }, 6000)
      }
    })
  }

  broadCast = (clients, obj) => {
    if (this.clients.length) {
      clients.forEach(item => item.socket.send(JSON.stringify(obj)))
    }
  }
  multiCastApple = (obj) => {
    this.broadCast(this.clients.filter(item => item.socket.apple), obj)
  }

  multiCastBanana = (obj) => {
    this.broadCast(this.clients.filter(item => item.socket.banana), obj)
  }

  handleApple = (client, data) => {
    client.apple = !!data.subscribe
  }

  handleBanana = (client, data) => {
    client.banana = !!data.subscribe
  }
}


const mockServer = new MockServer('ws://api.weixiaoyi/ws')
setInterval(() => {
  mockServer.multiCastApple({
    data: {
      apple: apple++,
    }
  })
  mockServer.multiCastBanana({
    data: {
      banana: banana--,
    }
  })
}, 1000)

