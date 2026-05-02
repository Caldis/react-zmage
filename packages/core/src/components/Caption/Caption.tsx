/**
 * 文案层
 * 渲染当前页 set[page].caption (string 或 { text, style?, className? })
 **/

// Libs
import React, { useContext, useEffect, useRef, useState } from 'react'
// Style
import style from './Caption.module.less'
// Utils
import { Context } from '../context'
import { AnimateFlip, CaptionObject, CaptionProp } from '../../types/global'
import { animationDuration } from '../../config/anim'
import { cx } from '../../utils'
import { selectFlipKind } from '../Image/Image.utils'

const SWITCH_CLASS_BY_FLIP: Record<Exclude<AnimateFlip, 'none'>, string> = {
  fade: 'switchFade',
  crossFade: 'switchCrossFade',
  swipe: 'switchSwipe',
  zoom: 'switchZoom',
}

const isCaptionObject = (v: CaptionProp | undefined): v is CaptionObject =>
  !!v && typeof v === 'object' && typeof (v as CaptionObject).text === 'string'

export default function Caption () {

  const {
    set,
    page,
    show,
    zoom,
    presetIsMobile,
    animate,
    motion,
  } = useContext(Context)

  const raw = (Array.isArray(set) ? set[page]?.caption : undefined) as CaptionProp | undefined
  const text = isCaptionObject(raw) ? raw.text : (typeof raw === 'string' ? raw : '')
  const captionKey = `${page}:${text}`
  const lastCaptionKey = useRef(captionKey)
  const switchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [switching, setSwitching] = useState(false)
  // 当前 flip 类型, caption 切换时跟随它的过渡形态 (而非固定 bottom fadein)
  const rawFlipKind = selectFlipKind(animate)
  const flipKind: AnimateFlip | undefined = rawFlipKind !== false ? rawFlipKind : undefined

  useEffect(() => {
    if (lastCaptionKey.current !== captionKey) {
      lastCaptionKey.current = captionKey
      // flip='none' 时跳过过渡状态, 文字直接刷新
      if (show && !zoom && flipKind && flipKind !== 'none') {
        setSwitching(true)
        if (switchTimer.current !== undefined) {
          clearTimeout(switchTimer.current)
        }
        switchTimer.current = setTimeout(() => {
          switchTimer.current = undefined
          setSwitching(false)
        }, animationDuration)
      }
    }
  }, [flipKind, captionKey, show, zoom])

  useEffect(() => () => {
    if (switchTimer.current !== undefined) {
      clearTimeout(switchTimer.current)
    }
  }, [])

  if (!text) return null

  const userStyle = isCaptionObject(raw) ? raw.style : undefined
  const userClassName = isCaptionObject(raw) ? raw.className : undefined
  const browsingTransitionStyle = !switching
    ? animate?.browsing === false
      ? { transition: 'none' }
      : motion.captionTransition ? { transition: motion.captionTransition } : undefined
    : undefined

  const switchClass = switching && flipKind && flipKind !== 'none'
    ? style[SWITCH_CLASS_BY_FLIP[flipKind as Exclude<AnimateFlip, 'none'>]]
    : undefined

  return (
    <div
      id="zmageCaption"
      className={cx(
        style.caption,
        { [style.show]: !zoom && show, [style.mobile]: presetIsMobile },
        switchClass,
        userClassName,
      )}
      style={{ ...userStyle, ...browsingTransitionStyle }}
    >
      {text}
    </div>
  )
}
