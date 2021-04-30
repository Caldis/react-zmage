/**
 * 客制的 Portal 组件
 * 直接将子元素插入到 DOM 對象
 **/

// Libs
import React, { ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

type Props = {
  id?: string
  target?: HTMLElement
  zIndex?: number
  className?: string
  children: ReactNode
}

export default function Portal ({ id, target, zIndex, className, children }: Props) {

  // Wrapper
  const [wrapper] = useState(target || document.body)

  // Append into Wrapper
  const [container] = useState(() => {
    const container = document.createElement('figure')
    id && (container.id = id)
    className && (container.className = className)
    zIndex && (container.style.zIndex = String(zIndex))
    wrapper?.appendChild(container)
    return container
  })

  // Remove from Wrapper
  useEffect(() => {
    return () => {
      wrapper?.removeChild(container)
    }
  }, [])

  return ReactDOM.createPortal(children, container)
}
