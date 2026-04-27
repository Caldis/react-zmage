/**
 * 文案层
 * 渲染当前页 set[page].caption (string 或 { text, style?, className? })
 **/

// Libs
import classnames from 'classnames'
import React, { useContext, useEffect, useRef, useState } from 'react'
// Style
import style from './Caption.module.less'
// Utils
import { Context } from '../context'
import { CaptionObject, CaptionProp } from '../../types/global'
import { animationDuration } from '../../config/anim'

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
  } = useContext(Context)

  const raw = (Array.isArray(set) ? set[page]?.caption : undefined) as CaptionProp | undefined
  const text = isCaptionObject(raw) ? raw.text : (typeof raw === 'string' ? raw : '')
  const captionKey = `${page}:${text}`
  const lastCaptionKey = useRef(captionKey)
  const switchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [switching, setSwitching] = useState(false)

  useEffect(() => {
    if (lastCaptionKey.current !== captionKey) {
      lastCaptionKey.current = captionKey
      if (show && !zoom && animate?.flip) {
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
  }, [animate?.flip, captionKey, show, zoom])

  useEffect(() => () => {
    if (switchTimer.current !== undefined) {
      clearTimeout(switchTimer.current)
    }
  }, [])

  if (!text) return null

  const userStyle = isCaptionObject(raw) ? raw.style : undefined
  const userClassName = isCaptionObject(raw) ? raw.className : undefined
  const browsingTransitionStyle = animate?.browsing === false && !switching
    ? { transition: 'none' }
    : undefined

  return (
    <div
      id="zmageCaption"
      className={classnames(
        style.caption,
        { [style.show]: !zoom && show, [style.mobile]: presetIsMobile, [style.switching]: switching },
        userClassName,
      )}
      style={{ ...userStyle, ...browsingTransitionStyle }}
    >
      {text}
    </div>
  )
}
