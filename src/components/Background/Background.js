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
		const { backdrop, outBrowsing, toggleZoom } = this.context

		return (
			<div
				id="zmageBackground"
				className={style.backgroundLayer}
				onClick={zoom ? toggleZoom : outBrowsing}
				style={{
					opacity: show ? 1 : 0,
					background: backdrop || "",
					transitionDelay: show ? '.3s' : '0s'
				}}
			/>
		)
	}
}

Background.contextType = Context
