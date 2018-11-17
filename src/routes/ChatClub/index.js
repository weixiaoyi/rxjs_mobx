import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Mixin } from '@components'
import { Inject, _ } from '@utils'
import ws2 from '@services/socketClient2'
import * as styles from './index.less'
import { map, filter } from 'rxjs/operators'


export default @Inject(({ chatClub: model }) => ({ model }))

class View extends Component {
  state = {
    result: '',
    price: '',
    apple: '',
    banana: ''
  }

  startInit = () => {
    const { model: { dispatch } } = this.props
    this.getPriceWs2()

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


  getPriceWs2 = () => {

    ws2.send({
      subscribe: 'apple',
    })
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
        console.log(data, '=============')
        this.changeState({
          banana: data.banana
        })
      })
  }


  render() {
    return (
      <Mixin.Parent that={this} >

        <Link to="/chatclubs" >chatclubs</Link >
        <div >当前chatclub-------------</div >
        <div className={styles.chatClub} >
          {this.state.result ? this.state.result : '没有数据'}
        </div >
        <div >
          apple：{this.state.apple}
          <div />
          banana:{this.state.banana}
        </div >
      </Mixin.Parent >
    )
  }
}


