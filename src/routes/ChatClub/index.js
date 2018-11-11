import React, { Component } from 'react'
import { Mixin } from '@components'
import { Inject } from '@utils'
import * as styles from './index.less'

export default @Inject(({ chatClub: model }) => ({ model }))

class View extends Component {
  state = {
    result: ''
  }

  startInit = () => {
    const { model: { dispatch } } = this.props
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


  render() {
    return (
      <Mixin.Parent that={this} >
        <div className={styles.chatClub} >
          {this.state.result ? this.state.result : '没有数据'}
        </div >
      </Mixin.Parent >
    )
  }
}


