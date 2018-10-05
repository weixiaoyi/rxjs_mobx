import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react'
import { configure } from 'mobx';
import './index.css'
import { default as store } from './models'
import App from './App'
import * as serviceWorker from './serviceWorker';

// 不允许在动作外部修改状态
configure({ enforceActions: 'always' });



ReactDOM.render(
  <Provider {...store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
