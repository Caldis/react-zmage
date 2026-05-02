/**
 * 控制层
 * 控制图片切换, 缩放
 **/

// Libs
import React, { ComponentType, CSSProperties, Fragment, RefObject, useContext, useEffect, useRef } from 'react'
// Style
import style from './Control.module.less'
// Asserts
import {
  IconArrowLeft,
  IconArrowRight,
  IconClose,
  IconDownload,
  IconRotateLeft,
  IconRotateRight,
  IconZoom
} from '../../asserts/icons'
// Utils
import { Context } from '../context'
import { ControllerItem, ControllerPlacement, ControllerRenderActions, ControllerRenderSlots, ControllerRenderState, ControllerSet } from '../../types/global'
import { cx, downloadFromLink } from '../../utils'

type IconComponent = ComponentType<{ color?: string }>
const CONTROLLER_PLACEMENTS = new Set<ControllerPlacement>([
  'top-right',
  'top-left',
  'bottom-right',
  'bottom-left',
  'top-center',
  'bottom-center',
  'left-center',
  'right-center',
])

function resolveControllerPlacement (placement: ControllerSet['placement']): ControllerPlacement {
  return typeof placement === 'string' && CONTROLLER_PLACEMENTS.has(placement)
    ? placement
    : 'top-right'
}

const PLACEMENT_CLASS: Record<ControllerPlacement, string> = {
  'top-right': style.topRight,
  'top-left': style.topLeft,
  'bottom-right': style.bottomRight,
  'bottom-left': style.bottomLeft,
  'top-center': style.topCenter,
  'bottom-center': style.bottomCenter,
  'left-center': style.leftCenter,
  'right-center': style.rightCenter,
}

function getControllerItem (
  item: ControllerItem,
  Icon: IconComponent,
  id: string,
  className: string,
  onClick: () => void,
  show: boolean,
  zoom: boolean,
  child?: React.JSX.Element,
  itemStyle?: CSSProperties,
  disabled?: boolean,
  innerRef?: RefObject<HTMLDivElement>,
  defaultColor?: string,
) {
  if (typeof item === 'boolean' || typeof item === 'string') {
    // Flag or Color: item-as-string (per-button override) 仍优先, 否则 fallback 到 defaultColor (controllerColor)
    // disabled 时不渲染 onClick, 避免 pointer-events:none 在某些浏览器下被穿透或被外层重置
    return !!item && (
      <div ref={innerRef} id={id} className={className} style={itemStyle} onClick={disabled ? undefined : onClick}>
        {child || <Icon color={typeof item === 'string' ? item : (defaultColor || '')}/>}
      </div>
    )
  } else if (React.isValidElement(item)) {
    return React.cloneElement(item as React.ReactElement<{ show?: boolean; zoom?: boolean; disabled?: boolean; color?: string; onClick?: () => void }>, { show, zoom, onClick, disabled, color: defaultColor })
  }
  return null
}

export default function Control () {

  const {
    // Data
    set,
    // Preset
    presetIsMobile,
    // Control
    controller, animate,
    // Styles & interactive
    backdrop, loop,
    // Status
    show, zoom, page, canZoom, zoomShakeKey,
    // Action
    outBrowsing,
    toPage,
    toPrevPage,
    toNextPage,
    toggleZoom,
    toggleRotate,
  } = useContext(Context)

  // 放大按钮禁用态: 仅在桌面端 (移动端按钮走 window.open, 与 canZoom 无关)
  const zoomDisabled = !presetIsMobile && !canZoom

  const controllerParams = (controller || {}) as ControllerSet
  // 控件容器底色 / 图标默认色: 用户显式传 controller.backdrop / controller.color 时生效,
  // 否则容器沿用顶层 backdrop, 图标用 currentColor (向前兼容).
  // 解耦原因: backdrop="black" 时控件容器跟蒙版同色, 黑底黑图标无法辨认 (issue #129).
  const effectiveControllerBackdrop = controllerParams.backdrop ?? backdrop
  const controllerColor = controllerParams.color
  // 用 ref + reflow 强制重放 shake 动画 (CSS class 重复添加不会自动重启动画)
  const zoomButtonRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (zoomShakeKey === 0) return
    const el = zoomButtonRef.current
    if (!el) return
    el.classList.remove(style.shake)
    void el.offsetWidth
    el.classList.add(style.shake)
  }, [zoomShakeKey])

  const browsingTransitionStyle = animate?.browsing === false ? { transition: 'none' } : undefined
  const placement = resolveControllerPlacement(controllerParams.placement)
  const handleMobileZoom = () => {
    const current = Array.isArray(set) ? set[page] : undefined
    if (!current) {
      return
    }
    if (typeof window !== 'undefined' && typeof window.open === 'function') {
      window.open(current.src)
    } else {
      toggleZoom()
    }
  }

  const rotateLeftItem = controllerParams.rotateLeft || controllerParams.rotate
  const rotateRightItem = controllerParams.rotateRight || controllerParams.rotate
  const hasToolbar = !!(
    rotateLeftItem ||
    rotateRightItem ||
    controllerParams.download ||
    controllerParams.zoom ||
    controllerParams.close
  )
  const toolbarSlot = hasToolbar ? (
    // 控制按钮
    <div
      id="zmageControl"
      data-placement={placement}
      className={cx(style.controls, PLACEMENT_CLASS[placement], { [style.show]: !zoom && show })}
      style={{ backgroundColor: effectiveControllerBackdrop, ...browsingTransitionStyle }}
    >
      {
        getControllerItem(
          rotateLeftItem,
          IconRotateLeft,
          'zmageControlRotateLeft',
          cx(style.rotateLeft, { [style.show]: !zoom && show }),
          toggleRotate('left'),
          show,
          zoom,
          undefined,
          browsingTransitionStyle,
          undefined,
          undefined,
          controllerColor
        )
      }
      {
        getControllerItem(
          rotateRightItem,
          IconRotateRight,
          'zmageControlRotateRight',
          cx(style.rotateRight, { [style.show]: !zoom && show }),
          toggleRotate('right'),
          show,
          zoom,
          undefined,
          browsingTransitionStyle,
          undefined,
          undefined,
          controllerColor
        )
      }
      {
        getControllerItem(
          controllerParams.download,
          IconDownload,
          'zmageControlDownload',
          cx(style.download, { [style.show]: !zoom && show }),
          () => set[page]?.src && downloadFromLink(set[page].src),
          show,
          zoom,
          undefined,
          browsingTransitionStyle,
          undefined,
          undefined,
          controllerColor
        )
      }
      {
        getControllerItem(
          controllerParams.zoom,
          IconZoom,
          'zmageControlZoom',
          cx(style.zoom, { [style.show]: !zoom && show, [style.disabled]: zoomDisabled }),
          presetIsMobile ? handleMobileZoom : () => toggleZoom(),
          show,
          zoom,
          undefined,
          browsingTransitionStyle,
          zoomDisabled,
          zoomButtonRef,
          controllerColor
        )
      }
      {
        getControllerItem(
          controllerParams.close,
          IconClose,
          'zmageControlClose',
          cx(style.close, { [style.show]: !zoom && show }),
          zoom ? () => toggleZoom() : outBrowsing,
          show,
          zoom,
          undefined,
          browsingTransitionStyle,
          undefined,
          undefined,
          controllerColor
        )
      }
    </div>
  ) : null

  const flipLeftSlot = Array.isArray(set) && set.length > 1 && (loop || page !== 0)
    ? getControllerItem(
      (controllerParams.flipLeft || controllerParams.flip),
      IconArrowLeft,
      'zmageControlFlipLeft',
      cx(style.flipLeft, { [style.show]: !zoom && show }),
      toPrevPage,
      show,
      zoom,
      undefined,
      browsingTransitionStyle,
      undefined,
      undefined,
      controllerColor
    )
    : null
  const flipRightSlot = Array.isArray(set) && set.length > 1 && (loop || page !== set.length - 1)
    ? getControllerItem(
      (controllerParams.flipRight || controllerParams.flip),
      IconArrowRight,
      'zmageControlFlipRight',
      cx(style.flipRight, { [style.show]: !zoom && show }),
      toNextPage,
      show,
      zoom,
      undefined,
      browsingTransitionStyle,
      undefined,
      undefined,
      controllerColor
    )
    : null
  const paginationSlot = Array.isArray(set) && set.length > 1
    ? (React.isValidElement(controllerParams.pagination)
      ? React.cloneElement(controllerParams.pagination as React.ReactElement<{ show: boolean; zoom: boolean; onClick: (target: number) => void }>, { show, zoom, onClick: toPage })
      : !!controllerParams.pagination && (
        <div
          id="zmageControlPagination"
          className={cx(style.pages, { [style.show]: !zoom && show, [style.mobile]: presetIsMobile })}
          style={{ backgroundColor: effectiveControllerBackdrop, ...browsingTransitionStyle }}
        >
          {
            set.map((_, i) =>
              i === page ?
                <span key={i} id="zmageControlPaginationActive" className={style.blackDot}/> :
                <span key={i} className={style.whiteDot} onClick={() => toPage(i)}/>
            )
          }
        </div>
      ))
    : null

  const total = set.length
  const current = set[page]
  const canPrev = total > 1 && (loop || page > 0)
  const canNext = total > 1 && (loop || page < total - 1)
  const canDownload = typeof current?.src === 'string' && current.src.length > 0
  const actions: ControllerRenderActions = {
    close: outBrowsing,
    zoom: () => {
      if (!zoom && !canZoom) return
      toggleZoom()
    },
    rotateLeft: toggleRotate('left'),
    rotateRight: toggleRotate('right'),
    prev: toPrevPage,
    next: toNextPage,
    toPage,
    download: () => {
      if (current?.src) downloadFromLink(current.src)
    },
  }
  const state: ControllerRenderState = {
    show,
    zoom,
    page,
    total,
    canZoom,
    canPrev,
    canNext,
    canDownload,
    preset: presetIsMobile ? 'mobile' : 'desktop',
    placement,
    current,
  }
  const slots: ControllerRenderSlots = {
    Toolbar: toolbarSlot,
    Pagination: paginationSlot,
    FlipLeft: flipLeftSlot,
    FlipRight: flipRightSlot,
  }

  if (typeof controllerParams.render === 'function') {
    return <Fragment>{controllerParams.render({ state, actions, slots })}</Fragment>
  }

  return (
    <Fragment>
      {toolbarSlot}
      {flipLeftSlot}
      {flipRightSlot}
      {paginationSlot}
    </Fragment>
  )
}
