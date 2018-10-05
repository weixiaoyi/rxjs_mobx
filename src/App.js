import React, { Component } from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import './App.css'

@observer(['homeStore'])
class App extends Component {
  render() {
    const { homeStore: { todos, changeTodos } } = this.props

    return (
      <div className="App1" >
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

export default App
