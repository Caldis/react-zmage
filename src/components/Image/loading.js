/**
 * 加载动画
 **/

// Libs
import React, { Fragment } from 'react'
import classnames from 'classnames'
// Styles
import style from './Loading.less'
// Icons
import { IconLoading, IconRefresh } from '@/asserts/icons'
// Utils
import { Context } from "../context"

export default class Loading extends React.PureComponent {
    render() {

        const { show, load, invalidate, onReload, backdrop } = this.props

        const imageClassNames = classnames(style.loadingContainer, {
            [style.show]: show
        })

        return (
            <Fragment>
                {
                    (load || invalidate) &&
                    <div id="zmageLoading" className={imageClassNames}>
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