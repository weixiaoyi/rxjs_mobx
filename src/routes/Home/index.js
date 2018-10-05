import React, { Component } from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import * as styles from './index.less'


export default @observer(['homeStore'])

class View extends Component {
  render() {
    const { homeStore: { todos, changeTodos } } = this.props

    return (
      <div className={styles.home} >
        {
          todos.map((item, index) => (
            <div key={index} onClick={() => {
              changeTodos()
            }} >
              {item.name}
            </div >
          ))
        }
      </div >
    )
  }
}


