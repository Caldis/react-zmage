/**
 * 名称: HMR入口
 * 用途: 用于承载 React Hot Loader
 **/

// React Libs
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// App Entry
import Components from './index'

const render = (App) =>
    ReactDOM.render(
        <AppContainer>
	        <App/>
        </AppContainer>,
        document.querySelector('#app')
    )
render(Components)

if (module.hot) {
    module.hot.accept('@/index', () => {
        const NextApp = require('@/index')
        render(NextApp)
    })
}