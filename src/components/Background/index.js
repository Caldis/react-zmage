/**
 * 背景层
 * 叠加半透明背景
 **/

// React Libs
import React from 'react'
// React Motion
import { Motion, spring } from 'react-motion'
// Style
import style from './index.less'

export default ({ show, zoom, unmountSelf, toggleZoom }) => {
	return (
		<Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(show ? 1 : 0) }}>
			{({ opacity }) =>
                <div
                    className={style.backgroundLayer}
                    onClick={zoom ? toggleZoom : unmountSelf}
                    style={{ opacity }}
                />
			}
		</Motion>
	)
}