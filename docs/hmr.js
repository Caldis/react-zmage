/**
 * 名称: HMR入口
 * 用途: 承载 React Hot Loader
 **/

// Libs
import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
// App Entry
import App from './index'

const HMRApp = hot(module)(App)
ReactDOM.render(<HMRApp/>, document.querySelector('#app'))