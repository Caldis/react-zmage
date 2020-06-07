/**
 * 名称: HMR入口
 * 用途: 承载 React Hot Loader
 **/

// Libs
import React from 'react'
import ReactDOM from 'react-dom'
// App Entry
import App from './index'

ReactDOM.render(<App/>, document.querySelector('#app'))