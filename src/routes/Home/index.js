import React, { Component } from 'react'
import { Inject } from '@utils'
import * as styles from './index.less'

export default @Inject(({ homeStore: model }) => ({ model }))

class View extends Component {
  render() {
    const { model: { todos, dispatch } } = this.props
    return (
      <div className={styles.home} >
        {
          todos.map((item, index) => (
            <div key={index} onClick={() => {
              dispatch({
                  type: 'getExample'
                }
              )
            }} >
              {item.name}
            </div >
          ))
        }
      </div >
    )
  }
}


