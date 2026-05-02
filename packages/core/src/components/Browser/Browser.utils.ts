// Libs
import { CSSProperties, RefObject } from 'react'
// Utils
import { isInteger } from '../../utils'
import { ControllerLayoutInset, ControllerLayoutTargets, ControllerOverlayLayout, ControllerSet, Set } from '../../types/global'

/* 计算默认页面 */
export const pageDefault = (defaultPage: number, set: Set[]) => {
  return isInteger(defaultPage) && defaultPage < set.length - 1 ? defaultPage : set.length - 1
}
/* 检测当前页面是否为封面 */
// 仅靠 src 比较: 旧版本里有个 `page === 0 ||` 的硬编码短路, 假设第 0 页一定是 cover.
// 当消费者传 defaultPage > 0 (例如 hero 三图轮播, 各自 defaultPage=0/1/2) 后,
// 用户从 defaultPage 切回 page 0 时 cover.src ≠ set[0].src, 应该走 fly-out close 动画;
// 旧短路错误地返回 true 让它尝试回到 cover 位置, 表现为关闭时图片不飞走而是缩回原身位.
export const pageIsCover = (coverRef: RefObject<HTMLImageElement>, set: Set[], page: number) => {
  return coverRef?.current?.getAttribute('src') === set[page]?.src
}
/* 获取页面数据 */
export const pageSet = (coverRef: RefObject<HTMLImageElement>, defaultPage: number, set: Set[]) => {
  const page = pageDefault(defaultPage, set)
  return {
    page,
    pageIsCover: pageIsCover(coverRef, set, page),
  }
}

/* 显示/隐藏封面 */
export const showCover = (coverRef: RefObject<HTMLImageElement>) => {
  if (coverRef?.current) {
    coverRef.current.style.visibility = 'visible'
  }
}
export const hideCover = (coverRef: RefObject<HTMLImageElement>, onHidden?: () => void) => {
  if (!coverRef?.current) return undefined
  // 隐藏太快会闪
  return setTimeout(() => {
    if (coverRef?.current) {
      coverRef.current.style.visibility = 'hidden'
    }
    onHidden?.()
  }, 100)
}

type OverlayStyle = CSSProperties & Record<`--zmage-${string}`, string>
type Edge = 'top' | 'right' | 'bottom' | 'left'
type OverlayTarget = keyof ControllerLayoutTargets

const EDGES: Edge[] = ['top', 'right', 'bottom', 'left']
const OVERLAY_TARGETS: OverlayTarget[] = ['toolbar', 'pagination', 'caption']

const toCssLength = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return `${value}px`
  if (typeof value === 'string' && value.trim()) return value.trim()
  return undefined
}

const normalizeInset = (inset: ControllerLayoutInset | undefined): Partial<Record<Edge, string>> | undefined => {
  if (typeof inset === 'number' || typeof inset === 'string') {
    const bottom = toCssLength(inset)
    return bottom ? { bottom } : undefined
  }
  if (!inset || typeof inset !== 'object') return undefined
  const next: Partial<Record<Edge, string>> = {}
  EDGES.forEach(edge => {
    const value = toCssLength(inset[edge])
    if (value) next[edge] = value
  })
  return Object.keys(next).length > 0 ? next : undefined
}

const isInsetObject = (inset: ControllerLayoutInset | undefined): inset is Exclude<ControllerLayoutInset, number | string | undefined> => {
  return !!inset && typeof inset === 'object'
}

const mergeLayoutTargets = (
  base: ControllerOverlayLayout | undefined,
  override: ControllerLayoutTargets | undefined,
): ControllerLayoutTargets => {
  const merged: ControllerLayoutTargets = {}
  OVERLAY_TARGETS.forEach(target => {
    const baseTarget = base?.[target]
    const overrideTarget = override?.[target]
    if (baseTarget || overrideTarget) {
      const next = { ...baseTarget, ...overrideTarget }
      if (isInsetObject(baseTarget?.inset) && isInsetObject(overrideTarget?.inset)) {
        next.inset = { ...baseTarget.inset, ...overrideTarget.inset }
      }
      merged[target] = next
    }
  })
  return merged
}

const applyInsetVars = (style: OverlayStyle, target: OverlayTarget, inset: ControllerLayoutInset | undefined) => {
  const edges = normalizeInset(inset)
  if (!edges) return

  EDGES.forEach(edge => {
    const value = edges[edge]
    if (value) {
      style[`--zmage-${target}-${edge}-offset`] = value
    }
  })

  if (edges.top && !edges.bottom) {
    style[`--zmage-${target}-bottom-offset`] = 'auto'
  }
  if (edges.bottom && !edges.top) {
    style[`--zmage-${target}-top-offset`] = 'auto'
  }
  if (edges.right && !edges.left) {
    style[`--zmage-${target}-left-offset`] = 'auto'
    style[`--zmage-${target}-translate-x`] = '0'
  }
  if (edges.left && !edges.right) {
    style[`--zmage-${target}-right-offset`] = 'auto'
    style[`--zmage-${target}-translate-x`] = '0'
  }
}

export const getControllerLayoutStyle = (
  controller: ControllerSet | undefined,
  presetIsMobile: boolean,
): CSSProperties | undefined => {
  const layout = controller?.layout
  if (!layout) return undefined

  const targets = mergeLayoutTargets(layout, presetIsMobile ? layout.mobile : undefined)
  const style: OverlayStyle = {}

  OVERLAY_TARGETS.forEach(target => {
    applyInsetVars(style, target, targets[target]?.inset)
  })

  return Object.keys(style).length > 0 ? style : undefined
}
