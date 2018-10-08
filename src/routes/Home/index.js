import React, { Component } from 'react'
import { Mixin } from '@components'
import { Inject, toJS, isEqual, _ } from '@utils'
import * as styles from './index.less'

export default @Inject(({ homeStore: model }) => ({ model }))

class View extends Component {
  state = {
    val: ''
  }

  startInit = () => {
    const { model: { dispatch } } = this.props

    setInterval(() => {
      dispatch({
          type: 'getExampleSync'
        }
      )
    }, 2000)
  }

  render() {
    const { val } = this.state
    const { model: { todos } } = this.props
    // console.log(toJS(todos))
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
          <input value={val} onChange={(e) => {
            this.changeState({
              val: e.target.value
            })
          }} />
        </div >
      </Mixin.Parent >
    )
  }
}


