import React, { Component } from 'react'
import { Mixin } from '@components'
import { Inject, _ } from '@utils'
import wss from '@services/socketClient'
import ws2 from '@services/socketClient2'
import * as styles from './index.less'

const ws = wss.getSocket()

export default @Inject(({ chatClub: model }) => ({ model }))

class View extends Component {
  state = {
    result: '',
    price: ''
  }

  startInit = () => {
    const { model: { dispatch } } = this.props
    this.getPriceWs2()
    // this.getPriceWs()

    dispatch(
      {
        type: 'getExample1',
        payload: {
          search: 'ahha'
        }
      }
    )
      .then(data => {
        this.changeState({
          result: data
        })
      })
  }

  getPriceWs = () => {
    ws.onConnectPromise()
      .then(() => {
        ws.sendJson({
          subscribe: 'apple',
        })
      })

    ws.listen({
      name: 'price.update',
      subscribe: (e, res) => {
        this.changeState({
          price: _.get(res, 'data.apple')
        })
      },
      unsubscribe: () => {

      },
      restart: this.getPriceWs
    })
  }

  getPriceWs2 = () => {
    const s=ws2.send({
      subscribe: 'apple',
    }).subscribe(([e,data]) => {
      this.changeState({
        price:data.data.apple
      })
    })
  }


  render() {
    return (
      <Mixin.Parent that={this} >
        <div className={styles.chatClub} >
          {this.state.result ? this.state.result : '没有数据'}
        </div >
        <div >
          价格：{this.state.price}
        </div >
      </Mixin.Parent >
    )
  }
}


