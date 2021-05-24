/**
 * 样式控制
 **/

// Libs
import { RefObject } from 'react'
// Utils
import { calcFitScale, getInnerHeight, getScrollWidth, numberOfStyleUnits } from '@/utils'
import { animationTransition } from '@/config/anim'
import { ContextType } from '@/components/context'
import { AnimateFlip } from '@/types/global'

export interface ImageStyleType {
  _type: 'cover' | 'browsing' | 'zooming'
  _behavior?: 'merge'
  x?: number
  y: number
  opacity?: number
  scale?: number
  rotate?: number
  radius?: number
}

/* 获取当前图片样式 */
export const getCurrentImageStyle = (context: ContextType, imageRef: RefObject<HTMLImageElement>, touchProfile: TouchProfile) => {
  const { show, zoom } = context
  if (show) {
    if (zoom) {
      return getZoomingStyle(context, imageRef)
    } else {
      return getBrowsingStyle(context, imageRef)
    }
  } else {
    return getCoverStyle(context, imageRef, touchProfile)
  }
}

/* 获取封面样式 */
export const getCoverStyle = (context: ContextType, _imageRef?: RefObject<HTMLImageElement>, touchProfile?: TouchProfile): ImageStyleType => {
  const { coverRef, coverPos, rotate, pageIsCover } = context
  if (touchProfile && touchProfile.phase === TOUCH_BEHAVIOR_PHASE.END) {
    const offset = touchProfile.getCurrentOffset()
    return {
      _type: 'cover',
      _behavior: 'merge',
      y: offset.y > 0 ? getInnerHeight() : -getInnerHeight()
    }
  }
  if (coverRef.current) {
    // 从封面唤出
    const { naturalWidth } = coverRef.current
    const { top, left, width, height } = coverRef.current.getBoundingClientRect()
    const { opacity, borderRadius } = window.getComputedStyle(coverRef.current)
    return pageIsCover ? {
      _type: 'cover',
      x: -getScrollWidth() / 2 + left + width / 2,
      y: -getInnerHeight() / 2 + top + height / 2,
      opacity: Number(opacity) || 1,
      scale: naturalWidth ? width / naturalWidth : 1,
      rotate: rotate - rotate % 360,
      radius: numberOfStyleUnits(borderRadius, { ref: width }),
    } : {
      _type: 'cover',
      x: 0,
      y: -getInnerHeight(),
      opacity: 0,
      scale: naturalWidth ? width / naturalWidth : 1,
      rotate: rotate - rotate % 360,
      radius: numberOfStyleUnits(borderRadius, { ref: width }),
    }
  } else if (coverPos) {
    // 从 Callee 唤出
    // 获取以鼠标指针为起始点的封面样式
    return {
      _type: 'cover',
      x: coverPos.x ? coverPos.x - getScrollWidth() / 2 : 0,
      y: coverPos.y ? coverPos.y - getInnerHeight() / 2 : 0,
      opacity: 0,
      scale: 0,
      rotate: 0,
      radius: 0,
    }
  } else {
    // Fallback
    // 获取以屏幕中心为起始点的封面样式
    return {
      _type: 'cover',
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0,
      rotate: 0,
      radius: 0,
    }
  }
}

/* 获取浏览样式 */
export const getBrowsingStyle = (context: ContextType, imageRef: RefObject<HTMLImageElement>): ImageStyleType => {
  const { radius, edge, rotate } = context
  const { naturalWidth = 0, naturalHeight = 0 } = imageRef.current || {}
  const scale = calcFitScale(naturalWidth, naturalHeight, edge)
  return {
    _type: 'browsing',
    x: 0,
    y: 0,
    opacity: 1,
    scale,
    rotate,
    radius,
  }
}

/* 获取缩放样式 */
export const getZoomingStyle = (context: ContextType, imageRef: RefObject<HTMLImageElement>, {
  clientX: mouseX = getScrollWidth() / 2,
  clientY: mouseY = getInnerHeight() / 2
} = {}): ImageStyleType => {
  const { radius, edge, rotate } = context
  const { naturalWidth = 0, naturalHeight = 0 } = imageRef.current || {}
  // 随鼠标位移偏移量
  const saveEdge = edge || 50
  const viewWidth = getScrollWidth()
  const viewHeight = getInnerHeight()
  const rangeX = naturalWidth - viewWidth + (2 * saveEdge)
  const rangeY = naturalHeight - viewHeight + (2 * saveEdge)
  const imgPosX = naturalWidth > viewWidth ? ((naturalWidth - viewWidth) / 2 + saveEdge) - (rangeX * (mouseX / viewWidth)) : 0
  const imgPosY = naturalHeight > viewHeight ? ((naturalHeight - viewHeight) / 2 + saveEdge) - (rangeY * (mouseY / viewHeight)) : 0
  // 返回位置
  return {
    _type: 'zooming',
    x: imgPosX,
    y: imgPosY,
    opacity: 1,
    scale: 1,
    rotate,
    radius,
  }
}

/* 动画属性 */
const CROSS_FADE_OFFSET = 30
const SWIPE_GAP = 10
const ZOOM_OVERFLOW = 0.08

export interface ImageAnimateType {
  offset: number
  overflow: number
  opacity: number
}

export const getAnimateConfig = (type?: AnimateFlip): ImageAnimateType => {
  let offset = 0, overflow = 0, opacity = 1
  switch (type) {
  case 'fade':
    opacity = 0
    break
  case 'crossFade':
    offset = CROSS_FADE_OFFSET
    opacity = 0
    break
  case 'swipe':
    offset = getScrollWidth() + SWIPE_GAP
    break
  case 'zoom':
    overflow = ZOOM_OVERFLOW
    opacity = 0
    break
  }
  return { offset, overflow, opacity }
}

/**
 * 触控行为管理
 */
// const TOUCH_UPDATE_PERIOD = 1
const TOUCH_BEHAVIOR_THRESHOLD = 5
const TOUCH_SPEED_THRESHOLD = 0.35
const TOUCH_DISTANCE_THRESHOLD = { x: 120, y: 80 }

export enum TOUCH_BEHAVIOR_PHASE {
  BEGIN = 'BEGIN',
  MOVING = 'MOVING',
  END = 'END',
}

export enum TOUCH_BEHAVIOR_TYPE {
  IDLE = 'IDLE',
  SWIPING = 'SWIPING',
  LIVING = 'LIVING',
}

export interface TouchProfileProps {
  origin?: Coordinate
}

export class TouchProfile {

  protected updateCounter: number
  protected begin: {
    time: number
    origin: Coordinate
    offset: Coordinate
  }
  protected current: {
    origin: Coordinate
    offset: Coordinate
  }

  public phase: TOUCH_BEHAVIOR_PHASE
  public behavior: TOUCH_BEHAVIOR_TYPE

  constructor (props?: TouchProfileProps) {
    this.updateCounter = 0
    this.phase = TOUCH_BEHAVIOR_PHASE.BEGIN
    this.behavior = TOUCH_BEHAVIOR_TYPE.IDLE
    this.begin = {
      time: new Date().getTime(),
      origin: props?.origin || { x: 0, y: 0 },
      offset: { x: 0, y: 0 },
    }
    this.current = {
      origin: props?.origin || { x: 0, y: 0 },
      offset: { x: 0, y: 0 },
    }
  }

  public getCurrentOffset = () => {
    return {
      x: this.current.origin.x - this.begin.origin.x,
      y: this.current.origin.y - this.begin.origin.y
    }
  }
  public getCurrentDistance = () => {
    const offset = this.getCurrentOffset()
    return {
      x: Math.abs(offset.x),
      y: Math.abs(offset.y),
    }
  }
  public getTouchConfig = ({ enableSwiping, enableLiving } = { enableSwiping: false, enableLiving: false }) => {
    let transition
    const touch = { x: 0, y: 0 }
    if (this.phase === TOUCH_BEHAVIOR_PHASE.MOVING) {
      const offset = this.getCurrentOffset()
      if (this.behavior === TOUCH_BEHAVIOR_TYPE.SWIPING && enableSwiping) {
        touch.x = offset.x
        transition = 'none'
      } else if (this.behavior === TOUCH_BEHAVIOR_TYPE.LIVING && enableLiving) {
        touch.y = offset.y
        transition = 'none'
      }
    }
    if (this.phase === TOUCH_BEHAVIOR_PHASE.END) {
      transition = animationTransition(2)
    }
    return { touch, transition }
  }

  public update = (props: TouchProfileProps) => {
    // 会卡帧
    // // 更新计数
    // this.updateCounter++
    // // 根据周期决定是否更新
    // if (this.updateCounter%TOUCH_UPDATE_PERIOD===0) {
    // 更新阶段属性
    this.phase = TOUCH_BEHAVIOR_PHASE.MOVING
    // 更新坐标属性
    this.current.origin = props.origin || { x: 0, y: 0 }
    // 初次更新行为属性
    if (this.behavior !== TOUCH_BEHAVIOR_TYPE.IDLE) {
      const distance = this.getCurrentDistance()
      if (distance.x > distance.y) {
        if (distance.x > TOUCH_BEHAVIOR_THRESHOLD) {
          this.behavior = TOUCH_BEHAVIOR_TYPE.SWIPING
        }
      } else {
        if (distance.y > TOUCH_BEHAVIOR_THRESHOLD) {
          this.behavior = TOUCH_BEHAVIOR_TYPE.LIVING
        }
      }
    }
    return this
    // }
  }
  public end = () => {
    // 更新阶段属性
    this.phase = TOUCH_BEHAVIOR_PHASE.END
    // 时间间隔
    const interval = new Date().getTime() - this.begin.time
    // 更新行为属性, 如果对应速度小于阈值, 则视为无操作
    const distance = this.getCurrentDistance()
    if ((this.behavior === TOUCH_BEHAVIOR_TYPE.SWIPING && (distance.x / interval < TOUCH_SPEED_THRESHOLD && distance.x < TOUCH_DISTANCE_THRESHOLD.x)) ||
      (this.behavior === TOUCH_BEHAVIOR_TYPE.LIVING && (distance.y / interval < TOUCH_SPEED_THRESHOLD && distance.y < TOUCH_DISTANCE_THRESHOLD.y))
    ) {
      this.behavior = TOUCH_BEHAVIOR_TYPE.IDLE
    }
    return this
  }
}
