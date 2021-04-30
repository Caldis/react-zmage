/**
 * HTML渲染容器组件入口
 **/

// Libs
import React from 'react'
// Components
import callee from './Zmage.callee'
// Utils
import { defProp } from '@/types/default'
import { BaseType } from '@/types/global'

type Props = BaseType

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
    const { children, ...restProps } = this.props
    if (this.wrapperRef.current) {
      this.wrapperRef.current.querySelectorAll('img').forEach(item => {
        if (!item.getAttribute('zmage') && item.getAttribute('src')) {
          // Add processed flag
          item.setAttribute('zmage', String(Date.now()))
          // Add browser
          item.style.cursor = 'zoom-in'
          item.addEventListener('click', () => callee({ coverRef: { current: item }, ...restProps }))
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
