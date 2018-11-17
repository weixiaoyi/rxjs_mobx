import '@babel/polyfill';
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import '@services/socketServer'
import App from '@routes/App'
import { default as store } from './models'
import './index.less'
import * as serviceWorker from './serviceWorker'
import 'normalize.css'

// 不允许在动作外部修改状态
configure({ enforceActions: 'always' })


ReactDOM.render(
  <Provider {...store}><App /></Provider >,
  document.getElementById('root'))
serviceWorker.unregister()
