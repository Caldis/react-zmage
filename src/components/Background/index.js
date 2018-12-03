/**
 * 背景层
 * 叠加半透明背景
 **/

// Libs
import React from 'react'
// Context
import { ContextConsumer } from "@/components/context"
// Style
import style from './index.less'

export default ContextConsumer(({ show, zoom, backdrop, unmountSelf, toggleZoom }) => {
	return (
		<div
			className={style.backgroundLayer}
			onClick={zoom ? toggleZoom : unmountSelf}
			style={{
				opacity: show ? 1 : 0,
                background: backdrop || "",
				transitionDelay: show ? '.3s' : '0s'
			}}
		/>
	)
})