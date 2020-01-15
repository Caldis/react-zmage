/**
 * 背景层
 * 叠加半透明背景
 **/

// Libs
import React from 'react'
// Style
import style from './Background.less'
// Utils
import { Context } from "../context"

export default class Background extends React.Component {
	render() {

		const { show, zoom } = this.props
		const { backdrop, outBrowsing, toggleZoom, presetIsDesktop } = this.context

		return (
			<div
				id="zmageBackground"
				className={style.backgroundLayer}
				onClick={zoom ? toggleZoom : outBrowsing}
				style={{
					opacity: show ? 1 : 0,
					background: backdrop || "",
					transitionDelay: presetIsDesktop
						? show ? '.15s' : '0s'
						: show ? '0s' : '.15s'
				}}
			/>
		)
	}
}

Background.contextType = Context
