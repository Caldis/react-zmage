/**
 * 加载动画
 **/

// Libs
import React from 'react'
import classnames from 'classnames'
// Styles
import style from './loading.less'
// Icons
import { Refresh } from '@/asserts/icons'
// Utils
import { ContextConsumer } from "@/components/context"

class Loading extends React.PureComponent {
    render() {

        const { show, load, invalidate, onReload, backdrop } = this.props

        const imageClassNames = classnames(style.loadingContainer, {
            [style.show]: show
        })

        return (
            <div className={imageClassNames}>
                {
                    load &&
                    <div className={style.loading}/>
                }
                {
                    invalidate &&
                    <button className={style.reload} onClick={onReload} style={{ background: backdrop }}>
                        <Refresh/>
                    </button>
                }
            </div>
        )
    }
}

export default ContextConsumer(Loading)