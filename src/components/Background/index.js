/**
 * 背景层
 * 叠加半透明背景
 **/

// React Libs
import React from 'react'
// Style
import style from './index.less'

export default class Background extends React.Component {
	constructor(props) {
		super(props)
	}

    bgOverlayStyle = show => show ? {backgroundColor: 'rgba(255,255,255,1)'} : {backgroundColor: 'rgba(255,255,255,0)'}

	render() {
        const { show, zoom, unmountSelf, toggleZoom } = this.props
		return (
			<div
				className={style.backgroundLayer}
				onClick={zoom ? toggleZoom : unmountSelf}
				style={this.bgOverlayStyle(show)}
			/>
		)
	}
}