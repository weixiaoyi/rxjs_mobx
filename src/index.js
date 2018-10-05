import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import './index.less'
import { default as store } from './models'
import { default as Home } from '@routes/Home'
import * as serviceWorker from './serviceWorker'
import 'normalize.css'

// 不允许在动作外部修改状态
configure({ enforceActions: 'always' })


ReactDOM.render(
  <Provider {...store}><Home /></Provider >, document.getElementById('root'))
serviceWorker.unregister();
