/**
 * 客制的 Portal 组件
 * 直接将子元素插入到 DOM 對象
 **/

// Libs
import { CSSProperties, ReactNode, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

type Props = {
  id?: string
  target?: HTMLElement | null
  zIndex?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
}

export default function Portal ({ id, target, zIndex, className, style, children }: Props) {
  if (typeof document === 'undefined') {
    return null
  }

  const parent = target || document.body
  const container = useMemo(() => document.createElement('figure'), [])
  const [attached, setAttached] = useState(false)
  const styleKeysRef = useRef<string[]>([])

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
    styleKeysRef.current.forEach(key => container.style.removeProperty(key))
    styleKeysRef.current = []
    const nextStyle = (style || {}) as Record<string, string | number | null | undefined>
    Object.keys(nextStyle).forEach(key => {
      const value = nextStyle[key]
      if (value == null) return
      container.style.setProperty(key, String(value))
      styleKeysRef.current.push(key)
    })
  }, [id, className, zIndex, style, container])

  useLayoutEffect(() => {
    parent.appendChild(container)
    setAttached(true)
    return () => {
      parent.removeChild(container)
    }
  }, [parent, container])

  return attached ? ReactDOM.createPortal(children, container) : null
}
