import React, { Component } from 'react'
import { toJS } from 'mobx'
import { observer, inject, } from 'mobx-react'
import * as styles from './index.less'

export default @observer(['homeStore'])

class View extends Component {
  componentDidMount() {
    const { homeStore: { getExample } } = this.props
    getExample()
  }

  render() {
    const { homeStore: { todos, changeModel } } = this.props
    return (
      <div className={styles.home} >
        {
          todos.map((item, index) => (
            <div key={index} onClick={() => {
              changeModel('todos', [
                { name: '3' },
                { name: '4' }
              ])
            }} >
              {item.name}
            </div >
          ))
        }
      </div >
    )
  }
}


