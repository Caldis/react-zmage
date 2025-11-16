/**
 * 加载动画
 **/

// Libs
import classnames from 'classnames'
import React, { Fragment, MouseEventHandler } from 'react'
// Styles
import style from './Loading.less'
// Icons
import { IconLoading, IconRefresh } from '../../asserts/icons'

type Props = {
  show: boolean
  load: boolean
  invalidate: boolean
  onReload?: MouseEventHandler
  backdrop?: string
}

export default function Loading ({ show, load, invalidate, onReload, backdrop }: Props) {
  return (
    <Fragment>
      {
        (load || invalidate) &&
        <div id="zmageLoading" className={classnames(style.loadingContainer, { [style.show]: show })}>
          {
            load &&
            <div className={style.loading}>
              <IconLoading/>
            </div>
          }
          {
            invalidate &&
            <button className={style.reload} onClick={onReload} style={{ background: backdrop }}>
              <IconRefresh/>
            </button>
          }
        </div>
      }
    </Fragment>
  )
}
