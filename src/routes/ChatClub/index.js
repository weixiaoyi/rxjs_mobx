import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Mixin } from '@components'
import { _, Inject } from '@utils'
import ws2 from '@services/socketClient2'
import * as styles from './index.less'
import { filter, map } from 'rxjs/operators'


export default @Inject(({ chatClub: model }) => ({ model }))

class ChatClub extends Mixin.Custom {
  state = {
    result: '',
    price: '',
    apple: '',
    banana: ''
  }


  startInit = () => {
    const { model: { dispatch } } = this.props
    this.getPriceWs2()
    //
    // dispatch(
    //   {
    //     type: 'getExample1',
    //     payload: {
    //       search: 'ahha'
    //     }
    //   }
    // )
    //   .then(data => {
    //     this.changeState({
    //       result: data
    //     })
    //   })
  }


  getPriceWs2 = () => {
    ws2.send({
      subscribe: 'apple',
    })
      .pipe(
        filter(v => {
          return v[1].apple
        })
      )
      .subscribe(([e, data]) => {
        this.changeState({
          apple: data.apple
        })
      })

    ws2.send({
      subscribe: 'banana',
    })
      .pipe(
        filter(v => {
          return v[1].banana
        })
      )
      .subscribe(([e, data]) => {
        this.changeState({
          banana: data.banana
        })
      })
  }


  render() {

    return (
      <div >
        <Link to="/chatclubs" >chatclubs</Link >
        <div >当前chatcl------------</div >
        <div className={styles.chatClub} >
          {this.state.result ? this.state.result : '没有数据hahah'}
        </div >
        <div >
          apple：{this.state.apple}
          <div />
          banana:{this.state.banana}
        </div >
      </div >
    )
  }
}


