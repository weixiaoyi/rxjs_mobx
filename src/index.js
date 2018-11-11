import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'

import { default as Home } from '@routes/Home'
import { default as ChatClub } from '@routes/ChatClub'
import { default as store } from './models'
import './index.less'
import * as serviceWorker from './serviceWorker'
import 'normalize.css'

// 不允许在动作外部修改状态
configure({ enforceActions: 'always' })


ReactDOM.render(
  <Provider {...store}><ChatClub /></Provider >,
  document.getElementById('root'))
serviceWorker.unregister()
