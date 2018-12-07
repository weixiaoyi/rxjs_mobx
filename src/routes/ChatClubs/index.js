import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Mixin } from '@components'
import { Inject, _ } from '@utils'
import ws2 from '@services/socketClient2'
import * as styles from './index.less'

export default @Inject(({ chatClub: model }) => ({ model }))

class View extends Mixin.Custom {
  state = {
    result: '',
    price: ''
  }

  startInit = () => {
    const { model: { dispatch } } = this.props
    this.getPriceWs2()
  }

  getPriceWs2 = () => {
    const s = ws2.send({
      subscribe: 'banana',
    })
      .subscribe(([e, data]) => {
        if (data.banana) {
          this.changeState({
            price: data.banana
          })
        }
      })
  }


  render() {
    return (
      <div>
        <Link to="/" >chatclub</Link >
        <div className={styles.chatClub} >
          {this.state.result ? this.state.result : '没有数据'}
        </div >
        <div >
          价格：{this.state.price}
        </div >
      </div>
    )
  }
}


