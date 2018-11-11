import React, { Component } from 'react'
import { Mixin } from '@components'
import { Inject } from '@utils'
import * as styles from './index.less'

export default @Inject(({ chatClub: model }) => ({ model }))

class View extends Component {
  state = {}

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
  }


  render() {
    return (
      <Mixin.Parent that={this} >
        <div className={styles.chatClub} >
          ahhah
        </div >
      </Mixin.Parent >
    )
  }
}


