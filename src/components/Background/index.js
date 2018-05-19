/**
 * 背景层
 * 叠加半透明背景
 **/

// React Libs
import React from 'react'
// Style
import style from './index.less'

export default ({ show, zoom, unmountSelf, toggleZoom }) => {
	return (
		<div
			className={style.backgroundLayer}
			onClick={zoom ? toggleZoom : unmountSelf}
			style={{ opacity: show ? 1 : 0 }}
		/>
	)
}