import React from 'react'
import { _ } from '@utils'

const Init = (that, self) => {
  that._isMounted = true
  that.childInitStacks = []
  that.shouldComponentUpdate = ((nextProps, nextState) => {
    return !(_.isEqual(nextProps, that.props) && _.isEqual(nextState, that.state))
  })
  that.changeState = (payload = {}, callback) => {
    if (that._isMounted) {
      that.setState(payload, () => {
        _.isFunction(callback) && callback(payload)
      })
    }
  }
  that.componentDidMount = () => {
    self.startInit()
  }
  that.componentWillUnmount = () => {
    that._isMounted = false
  }
}


class MixinParent extends React.Component {
  constructor(props) {
    super(props)
    const { that } = this.props
    that.childInitStacks = []
    Init(that, this)
  }


  startInit = () => {
    const { that = {} } = this.props
    const { startInit } = that
    if (_.isFunction(startInit)) {
      startInit && startInit()
    }
  }

  render() {
    const { children } = this.props
    return (
      <>
        {children}
      </>
    )
  }
}

class MixinChild extends React.Component {
  constructor(props) {
    super(props)
    const { that = {} } = this.props
    Init(that, this)
  }

  startInit = () => {
    const { that = {} } = this.props
    const [startInit, childInitStacks] = [
      _.get(that, 'startInit'),
      _.get(that, 'props.that.childInitStacks')
    ]
    if (_.isFunction(startInit) && _.isArray(childInitStacks)) {
      childInitStacks.push(() => {
        startInit()
      })
    }
  }

  render() {
    const { children } = this.props
    return (
      <>
        {children}
      </>
    )
  }
}

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
  Parent: MixinParent,
  Child: MixinChild,
  Custom: MixinCustom
}




