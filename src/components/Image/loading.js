/**
 * 加载动画
 **/

// Libs
import classnames from 'classnames'
import React, { Fragment } from 'react'
// Styles
import style from './Loading.less'
// Icons
import { IconLoading, IconRefresh } from '@/asserts/icons'
// Utils
import { Context } from "../context"

export default class Loading extends React.PureComponent {
    render() {

        const { show, load, invalidate, onReload, backdrop } = this.props

        return (
            <Fragment>
                {
                    (load || invalidate) &&
                    <div id="zmageLoading" className={classnames(style.loadingContainer, { [style.show]:show })}>
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
}

Loading.contextType = Context
