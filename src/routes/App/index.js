import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { default as Home } from '@routes/Home'
import { default as ChatClub } from '@routes/ChatClub'
import { default as ChatClubs } from '@routes/ChatClubs'

export default class App extends Component {
  render() {
    return (
      <Router >
        <Switch >
          <Route path="/chatclubs" exact render={props => <ChatClubs {...props} {...this.props} />} />
          <Route path="/" exact render={props => <ChatClub {...props} {...this.props} />} />
        </Switch >
      </Router >
    )
  }
}
