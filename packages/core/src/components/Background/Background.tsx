/**
 * 背景层
 * 叠加半透明背景
 **/

// Libs
import React, { useContext } from 'react'
// Style
import style from './Background.module.less'
// Utils
import { Context } from '../context'

type Props = {
  show: boolean
  zoom: boolean
}

export default function Background ({ show, zoom }: Props) {

  const { animate, backdrop, outBrowsing, toggleZoom, presetIsDesktop, motion } = useContext(Context)
  const browsingAnimationDisabled = animate?.browsing === false
  const transitionDelay = browsingAnimationDisabled
    ? '0s'
    : show && presetIsDesktop
      ? motion.backgroundShowDelay
      : '0s'

  return (
    <div
      id="zmageBackground"
      className={style.backgroundLayer}
      onClick={zoom ? () => toggleZoom() : outBrowsing}
      style={{
        opacity: show ? 1 : 0,
        background: backdrop || '',
        transition: browsingAnimationDisabled ? 'none' : motion.backgroundTransition,
        transitionDelay,
      }}
    />
  )
}
