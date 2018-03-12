/**
 * 控制层
 * 控制图片切换等
 **/

// React Libs
import React, { Fragment } from 'react'
// React Motion
import { Motion } from 'react-motion'
// Style
import style from './index.less'
// Utils
import { springlization } from '@/utils'

// Controller transform Styles
const defaultMotionStyle = {
    over: 20,
    rotate: 45,
    opacity: 0,
}
const showingMotionStyle = {
    over: 0,
    rotate: 0,
    opacity: 1,
}

export default class Control extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            motionStyle: defaultMotionStyle
        }
    }

    componentWillReceiveProps(nextProps) {
        const { show } = nextProps
        // 随状态切换改变样式
        show ? this.setState({ motionStyle: showingMotionStyle }) : this.setState({ motionStyle: defaultMotionStyle })
    }

    render() {
        const { zoom, page, set, mobile, controller, unmountSelf, toggleZoom, jumpPages } = this.props
        const { motionStyle: ms } = this.state
        return (
            <Motion style={springlization({ over: ms.over, rotate: ms.rotate, opacity: ms.opacity, })}>
                {({ over, rotate, opacity }) =>
                    <Fragment>

                        {/*放大与关闭*/}
                        <div className={style.controls}>
                            {/*放大按钮*/}
                            {!zoom && controller.zoom &&
                                <div
                                    className={style.zoomButton}
                                    onClick={mobile ? ()=>window.open(set[page].src) : toggleZoom}
                                    style={{
                                        opacity,
                                        transform: `rotate(${rotate}deg)`
                                    }}
                                />
                            }

                            {/*关闭按钮*/}
                            {!zoom && controller.close &&
                                <div className={style.closeButton} onClick={zoom ? toggleZoom : unmountSelf}>
                                    <div
                                        className={style.crossLine}
                                        style={{
                                            opacity,
                                            transform: `rotate(${45-rotate}deg)`
                                        }}
                                    />
                                    <div
                                        className={style.crossLine}
                                        style={{
                                            opacity,
                                            transform: `rotate(${-(45-rotate)}deg)`
                                        }}
                                    />
                                </div>
                            }
                        </div>

                        {/*页数指示*/}
                        {set.length>1 && !zoom && controller.pagination &&
                            <div className={style.pages} style={{
                                opacity,
                                transform: `translateY(${over}px)`
                            }}>
                                {
                                    set.map((_, i) =>
                                        i === page ?
                                            <span key={i} className={style.blackDot}/>:
                                            <span key={i} className={style.whiteDot} onClick={()=>jumpPages(i)}/>
                                    )
                                }
                            </div>
                        }

                    </Fragment>
                }

            </Motion>
        )
    }
}