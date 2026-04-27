/**
 * 文案层
 * 渲染当前页 set[page].caption (string 或 { text, style?, className? })
 **/

// Libs
import classnames from 'classnames'
import React, { useContext } from 'react'
// Style
import style from './Caption.module.less'
// Utils
import { Context } from '../context'
import { CaptionObject, CaptionProp } from '../../types/global'

const isCaptionObject = (v: CaptionProp | undefined): v is CaptionObject =>
  !!v && typeof v === 'object' && typeof (v as CaptionObject).text === 'string'

export default function Caption () {

  const {
    set,
    page,
    show,
    zoom,
    presetIsMobile,
  } = useContext(Context)

  const raw = (Array.isArray(set) ? set[page]?.caption : undefined) as CaptionProp | undefined
  const text = isCaptionObject(raw) ? raw.text : (typeof raw === 'string' ? raw : '')
  if (!text) return null

  const userStyle = isCaptionObject(raw) ? raw.style : undefined
  const userClassName = isCaptionObject(raw) ? raw.className : undefined

  return (
    <div
      id="zmageCaption"
      className={classnames(
        style.caption,
        { [style.show]: !zoom && show, [style.mobile]: presetIsMobile },
        userClassName,
      )}
      style={userStyle}
    >
      {text}
    </div>
  )
}
