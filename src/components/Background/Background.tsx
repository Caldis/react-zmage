/**
 * 背景层
 * 叠加半透明背景
 **/

// Libs
import React, { useContext } from 'react'
// Style
import style from './Background.less'
// Utils
import { Context } from "../context"

type Props = {
	show: boolean
	zoom: boolean
}

export default function Background({ show, zoom }: Props) {

	const { backdrop, outBrowsing, toggleZoom, presetIsDesktop } = useContext(Context)

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
					: show ? '0s' : '.35s'
			}}
		/>
	)
}
