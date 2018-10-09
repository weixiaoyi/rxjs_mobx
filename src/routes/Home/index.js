import React, { Component } from 'react'
import { Mixin } from '@components'
import { Inject, toJS, isEqual, _, R, createSubject } from '@utils'
import * as styles from './index.less'

const {
  debounceTime, takeWhile
} = R

export default @Inject(({ homeStore: model }) => ({ model }))

class View extends Component {
  state = {
    val: ''
  }

  startInit = () => {
    this.changeExample()
  }

  changeExample = (v) => {
    const { model: { dispatch } } = this.props
    if (this.changeExample$) {
      return this.changeExample$.next(v)
    }
    this.changeExample$ = createSubject()
    this.changeExample$.pipe(
      debounceTime(500),
      takeWhile(v => this._isMounted)
    )
      .subscribe(v => {
          dispatch({
            type: 'getExample1',
            payload: v
          })
        }
      )
  }

  render() {
    const { changeExample } = this
    const { val } = this.state
    const { model: { todos } } = this.props
    return (
      <Mixin.Parent that={this} >
        <div className={styles.home} >
          {
            todos.map((item, index) => (
              <div key={index} >
                {item.name}
              </div >
            ))
          }
          <input value={val} onChange={(e) => {
            const value = e.target.value
            this.changeState({
              val: value
            }, () => {
              changeExample(value)
            })
          }} />
        </div >
      </Mixin.Parent >
    )
  }
}


