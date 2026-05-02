/**
 * HTML渲染容器组件入口
 **/

// Libs
import React from 'react'
// Components
import callee from './Zmage.callee'
// Utils
import { defProp } from './types/default'
import { getMotionDurationMultiplierFromEvent } from './config/motion'
import { BaseType, Set } from './types/global'

type Props = BaseType

const readCaptionFromNode = (item: HTMLImageElement) => {
  const explicit = item.getAttribute('data-zmage-caption')?.trim()
  if (explicit) return explicit

  const figure = item.closest('figure')
  const figcaption = figure?.querySelector('figcaption')?.textContent?.trim()
  return figcaption || undefined
}

const findSetIndexBySrc = (set: Set[] | undefined, src: string) => {
  if (!Array.isArray(set) || set.length === 0) return -1
  return set.findIndex(item => item.src === src)
}

export default class ReactZmageWrapper extends React.Component<Props> {

  // Default
  static defaultProps = defProp

  // Refs
  wrapperRef = React.createRef<HTMLDivElement>()

  componentDidMount () {
    this.tryAttachBrowserToImage()
  }

  componentDidUpdate () {
    this.tryAttachBrowserToImage()
  }

  tryAttachBrowserToImage = () => {
    const { children: _children, ...restProps } = this.props
    void _children
    if (this.wrapperRef.current) {
      this.wrapperRef.current.querySelectorAll('img').forEach(item => {
        if (!item.getAttribute('zmage') && item.getAttribute('src')) {
          // Add processed flag
          item.setAttribute('zmage', String(Date.now()))
          // Add browser
          item.style.cursor = 'zoom-in'
          // 关键: 用被点击 <img> 自身的 src/alt 覆盖从 props 合并 (defaultProps) 进来的空字符串.
          // 否则 wrapperProps.src='' 会盖掉 coverRef 里 item 的实际 src, callee 落到 set=[{src:''}]
          // 路径, 模态层渲染 src="" 触发浏览器 "empty src" 警告 + 模态空白.
          const itemSrc = item.getAttribute('src') || ''
          const itemAlt = item.getAttribute('alt') || undefined
          const itemCaption = readCaptionFromNode(item)
          const itemSetIndex = findSetIndexBySrc(restProps.set, itemSrc)
          item.addEventListener('click', (event) => callee({
            ...restProps,
            coverRef: { current: item },
            src: itemSrc,
            alt: itemAlt,
            caption: itemCaption ?? restProps.caption,
            defaultPage: itemSetIndex >= 0 ? itemSetIndex : restProps.defaultPage,
            motionDurationMultiplier: getMotionDurationMultiplierFromEvent(event),
          } as BaseType & { motionDurationMultiplier: number }))
        }
      })
    }
  }

  render () {

    const { children } = this.props

    return (
      <div ref={this.wrapperRef}>
        {children}
      </div>
    )
  }
}
