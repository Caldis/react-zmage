/**
 * 控制层
 * 控制图片切换, 缩放
 **/

// Libs
import classnames from 'classnames'
import React, { Fragment, useContext } from 'react'
// Style
import style from './Control.less'
// Asserts
import {
  IconArrowLeft,
  IconArrowRight,
  IconClose,
  IconDownload,
  IconRotateLeft,
  IconRotateRight,
  IconZoom
} from '@/asserts/icons'
// Utils
import { Context } from '../context'
import { downloadFromLink } from '@/utils'
import { ControllerType } from '@/types/global'

export default function Control() {

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

  const controllerParams = (controller || {}) as ControllerType

  return (
    <Fragment>

      {/*控制按钮*/}
      <div
        id="zmageControl"
        className={classnames(style.controls, { [style.show]:!zoom&&show })}
        style={{ backgroundColor: backdrop }}
      >

        {/*旋转*/}
        {
          controllerParams.rotate &&
          <div
            id="zmageControlRotateLeft"
            className={classnames(style.rotateLeft, { [style.show]:!zoom&&show })}
            onClick={toggleRotate('left')}
          >
            <IconRotateLeft/>
          </div>
        }
        {
          controllerParams.rotate &&
          <div
            id="zmageControlRotateRight"
            className={classnames(style.rotateRight, { [style.show]:!zoom&&show })}
            onClick={toggleRotate('right')}
          >
            <IconRotateRight/>
          </div>
        }

        {/*下载*/}
        {
          controllerParams.download &&
          <div
            id="zmageControlDownload"
            className={classnames(style.download, { [style.show]:!zoom&&show })}
            onClick={() => downloadFromLink(set[page].src)}
          >
            <IconDownload/>
          </div>
        }

        {/*放大*/}
        {
          controllerParams.zoom &&
          <div
            id="zmageControlZoom"
            className={classnames(style.zoom, { [style.show]:!zoom&&show })}
            onClick={presetIsMobile ? ()=>window.open(set[page].src) : toggleZoom}
          >
            <IconZoom/>
          </div>
        }

        {/*关闭*/}
        {
          controllerParams.close &&
          <div
            id="zmageControlClose"
            className={classnames(style.close, { [style.show]:!zoom&&show })}
            onClick={zoom ? toggleZoom : outBrowsing}
          >
            <IconClose/>
          </div>
        }

      </div>

      {/*翻页控制*/}
      {
        Array.isArray(set) && set.length>1 && controllerParams.flip &&
        <Fragment>
          {
            (loop || page!==0) &&
                <div
                  id="zmageControlFlipLeft"
                  className={classnames(style.flipLeft, { [style.show]:!zoom&&show })}
                  style={{ backgroundColor: backdrop }}
                  onClick={toPrevPage}
                >
                  <IconArrowLeft/>
                </div>
          }
          {
            (loop || page!==set.length-1) &&
                <div
                  id="zmageControlFlipRight"
                  className={classnames(style.flipRight, { [style.show]:!zoom&&show })}
                  style={{ backgroundColor: backdrop }}
                  onClick={toNextPage}
                >
                  <IconArrowRight/>
                </div>
          }
        </Fragment>
      }

      {/*页数指示*/}
      {
        Array.isArray(set) && set.length>1 && controllerParams.pagination &&
        <div
          id="zmageControlPagination"
          className={classnames(style.pages, { [style.show]:!zoom&&show, [style.mobile]:presetIsMobile })}
          style={{ backgroundColor: backdrop }}
        >
          {
            set.map((_, i) =>
              i === page ?
                <span key={i} id="zmageControlPaginationActive" className={style.blackDot}/>:
                <span key={i} className={style.whiteDot} onClick={()=>toPage(i)}/>
            )
          }
        </div>
      }

    </Fragment>
  )
}
