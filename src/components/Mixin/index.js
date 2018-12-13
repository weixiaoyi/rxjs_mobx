import React from 'react'
import { _ } from '@utils'

class MixinCustom extends React.Component {
  constructor(props) {
    super(props)
    this._isMounted = true
  }

  componentDidMount() {
    _.isFunction(this.startInit) && this.startInit()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  changeState = (payload = {}, callback) => {
    if (this._isMounted) {
      this.setState(payload, () => {
        _.isFunction(callback) && callback(payload)
      })
    }
  }
}


export default {
  Custom: MixinCustom
}




