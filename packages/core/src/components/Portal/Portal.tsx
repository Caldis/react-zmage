/**
 * 客制的 Portal 组件
 * 直接将子元素插入到 DOM 對象
 **/

// Libs
import { ReactNode, useLayoutEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'

type Props = {
  id?: string
  target?: HTMLElement
  zIndex?: number
  className?: string
  children: ReactNode
}

export default function Portal ({ id, target, zIndex, className, children }: Props) {
  if (typeof document === 'undefined') {
    return null
  }

  const parent = target || document.body
  const container = useMemo(() => document.createElement('figure'), [])

  // Sync attributes when props change
  useLayoutEffect(() => {
    if (id) {
      container.id = id
    } else {
      container.removeAttribute('id')
    }
    if (typeof className === 'string') {
      container.className = className
    } else {
      container.removeAttribute('class')
    }
    if (typeof zIndex === 'number') {
      container.style.zIndex = String(zIndex)
    } else {
      container.style.removeProperty('z-index')
    }
  }, [id, className, zIndex, container])

  useLayoutEffect(() => {
    parent.appendChild(container)
    return () => {
      parent.removeChild(container)
    }
  }, [parent, container])

  return ReactDOM.createPortal(children, container)
}
