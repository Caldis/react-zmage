/**
 * 控制层
 * 控制图片切换, 缩放
 **/

// Libs
import classnames from 'classnames'
import React, { ComponentType, Fragment, useContext } from 'react'
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
import { ControllerItem, ControllerSet } from '../../types/global'
import { downloadFromLink } from '../../utils'

type IconComponent = ComponentType<{ color?: string }>

function getControllerItem (
  item: ControllerItem,
  Icon: IconComponent,
  id: string,
  className: string,
  onClick: () => void,
  show: boolean,
  zoom: boolean,
  child?: JSX.Element,
) {
  if (typeof item === 'boolean' || typeof item === 'string') {
    // Flag or Color
    return !!item && (
      <div id={id} className={className} onClick={onClick}>
        {child || <Icon color={typeof item === 'string' ? item : ''}/>}
      </div>
    )
  } else if (React.isValidElement(item)) {
    return React.cloneElement(item, { show, zoom, onClick })
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
    controller,
    // Styles & interactive
    backdrop, loop,
    // Status
    show, zoom, page,
    // Action
    outBrowsing,
    toPage,
    toPrevPage,
    toNextPage,
    toggleZoom,
    toggleRotate,
  } = useContext(Context)

  const controllerParams = (controller || {}) as ControllerSet

  return (
    <Fragment>

      {/*控制按钮*/}
      <div
        id="zmageControl"
        className={classnames(style.controls, { [style.show]: !zoom && show })}
        style={{ backgroundColor: backdrop }}
      >

        {/*旋转*/}
        {
          getControllerItem(
            (controllerParams.rotateLeft || controllerParams.rotate),
            IconRotateLeft,
            'zmageControlRotateLeft',
            classnames(style.rotateLeft, { [style.show]: !zoom && show }),
            toggleRotate('left'),
            show,
            zoom
          )
        }
        {
          getControllerItem(
            (controllerParams.rotateRight || controllerParams.rotate),
            IconRotateRight,
            'zmageControlRotateRight',
            classnames(style.rotateRight, { [style.show]: !zoom && show }),
            toggleRotate('right'),
            show,
            zoom
          )
        }

        {/*下载*/}
        {
          getControllerItem(
            controllerParams.download,
            IconDownload,
            'zmageControlDownload',
            classnames(style.download, { [style.show]: !zoom && show }),
            () => downloadFromLink(set[page].src),
            show,
            zoom
          )
        }

        {/*放大*/}
        {
          getControllerItem(
            controllerParams.zoom,
            IconZoom,
            'zmageControlZoom',
            classnames(style.zoom, { [style.show]: !zoom && show }),
            presetIsMobile ? () => window.open(set[page].src) : toggleZoom,
            show,
            zoom
          )
        }

        {/*关闭*/}
        {
          getControllerItem(
            controllerParams.close,
            IconClose,
            'zmageControlClose',
            classnames(style.close, { [style.show]: !zoom && show }),
            zoom ? toggleZoom : outBrowsing,
            show,
            zoom
          )
        }

      </div>

      {/*翻页控制*/}
      {
        Array.isArray(set) && set.length > 1 &&
        <Fragment>
          {
            (loop || page !== 0) &&
            getControllerItem(
              (controllerParams.flipLeft || controllerParams.flip),
              IconArrowLeft,
              'zmageControlFlipLeft',
              classnames(style.flipLeft, { [style.show]: !zoom && show }),
              toPrevPage,
              show,
              zoom
            )
          }
          {
            (loop || page !== set.length - 1) &&
            getControllerItem(
              (controllerParams.flipRight || controllerParams.flip),
              IconArrowRight,
              'zmageControlFlipRight',
              classnames(style.flipRight, { [style.show]: !zoom && show }),
              toNextPage,
              show,
              zoom
            )
          }
        </Fragment>
      }

      {/*页数指示*/}
      {
        (Array.isArray(set) && set.length > 1) &&
        (React.isValidElement(controllerParams.pagination)
          ? React.cloneElement(controllerParams.pagination as React.ReactElement<{ show: boolean; zoom: boolean; onClick: (target: number) => void }>, { show, zoom, onClick: toPage })
          : !!controllerParams.pagination && (
            <div
              id="zmageControlPagination"
              className={classnames(style.pages, { [style.show]: !zoom && show, [style.mobile]: presetIsMobile })}
              style={{ backgroundColor: backdrop }}
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
      }
    </Fragment>
  )
}
