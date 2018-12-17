/**
 * 加载动画
 **/

// Libs
import React from 'react'
// Styles
import style from './loading.less'
// Icons
import { Refresh } from '@/asserts/icons'
// Utils
import { ContextConsumer } from "@/components/context"

class Loading extends React.PureComponent {
    render() {

        const { didInvalidate, onReload, backdrop } = this.props;

        return (
            <div className={style.loadingContainer}>
                {
                    didInvalidate
                        ? <button
                            className={style.reload}
                            onClick={onReload}
                            style={{ background: backdrop }}
                        ><Refresh/></button>
                        : <div className={style.loading}/>
                }
            </div>
        )
    }
}

export default ContextConsumer(Loading)