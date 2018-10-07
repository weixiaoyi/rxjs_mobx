import React, { Component } from 'react'
import { Mixin } from '@components'
import { Inject } from '@utils'
import * as styles from './index.less'

export default @Inject(({ homeStore: model }) => ({ model }))

class View extends Component {
  startInit = () => {
    const { model: { dispatch } } = this.props

    // dispatch({
    //     type: 'getExampleSync'
    //   }
    // )

    dispatch({
        type: 'getExampleRace'
      }
    )
  }

  render() {
    const { model: { todos } } = this.props
    return (
      <Mixin.Parent that={this} >
        <div className={styles.home} >
          {
            todos.map((item, index) => (
              <div key={index} onClick={() => {

              }} >
                {item.name}
              </div >
            ))
          }
        </div >
      </Mixin.Parent >
    )
  }
}


