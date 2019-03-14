/**
 * 加载动画
 **/

// Libs
import React from 'react'
import classnames from 'classnames'
// Styles
import style from './loading.less'
// Icons
import { LoadingIcon, RefreshIcon } from '@/asserts/icons'
// Utils
import { ContextConsumer } from "@/components/context"

class Loading extends React.PureComponent {
    render() {

        const { show, load, invalidate, onReload, backdrop } = this.props

        const imageClassNames = classnames(style.loadingContainer, {
            [style.show]: show
        })

        return (
            <div id="zmageLoading" className={imageClassNames}>
                {
                    load &&
                    <div className={style.loading}>
                        <LoadingIcon/>
                    </div>
                }
                {
                    invalidate &&
                    <button className={style.reload} onClick={onReload} style={{ background: backdrop }}>
                        <RefreshIcon/>
                    </button>
                }
            </div>
        )
    }
}

export default ContextConsumer(Loading)