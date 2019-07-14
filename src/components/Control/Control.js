/**
 * 控制层
 * 控制图片切换, 缩放
 **/

// Libs
import React, { Fragment } from 'react'
// Style
import style from './Control.less'
// Asserts
import { IconDownload, IconRotateLeft, IconRotateRight, IconZoom, IconArrowLeft, IconArrowRight, IconClose } from '@/asserts/icons'
// Utils
import { Context } from '../context'
import { env } from '@/utils/env'
import { withShowingStatus, downloadFromLink } from '@/utils'

export default class Control extends React.PureComponent {

    withShow = (className) => {
        const { show, zoom } = this.props
        return withShowingStatus(className, !zoom && show, style.show)
    }

    render() {

        const {
            // Data
            set,
            // Control
            controller,
            // Styles & interactive
            backdrop, loop,
            // Status
            zoom, page,
            // Action
            outBrowsing,
            toPage,
            toPrevPage,
            toNextPage,
            toggleZoom,
            toggleRotate,
        } = this.context

        return (
            <Fragment>

                {/*控制按钮*/}
                <div
                    id="zmageControl"
                    className={this.withShow(style.controls)}
                    style={{ backgroundColor: backdrop }}
                >

                    {/*旋转*/}
                    {
                        controller.rotate &&
                        <div
                            id="zmageControlRotateLeft"
                            className={this.withShow(style.rotateLeft)}
                            onClick={toggleRotate("left")}
                        >
                            <IconRotateLeft/>
                        </div>
                    }
                    {
                        controller.rotate &&
                        <div
                            id="zmageControlRotateRight"
                            className={this.withShow(style.rotateRight)}
                            onClick={toggleRotate("right")}
                        >
                            <IconRotateRight/>
                        </div>
                    }

                    {/*下载*/}
                    {
                        controller.download &&
                        <div
                            id="zmageControlDownload"
                            className={this.withShow(style.download)}
                            onClick={() => downloadFromLink(this.context.set[this.context.page].src)}
                        >
                            <IconDownload/>
                        </div>
                    }

                    {/*放大*/}
                    {
                        controller.zoom &&
                        <div
                            id="zmageControlZoom"
                            className={this.withShow(style.zoom)}
                            onClick={env.isMobile ? ()=>window.open(set[page].src) : toggleZoom}
                        >
                            <IconZoom/>
                        </div>
                    }

                    {/*关闭*/}
                    {
                        controller.close &&
                        <div
                            id="zmageControlClose"
                            className={this.withShow(style.close)}
                            onClick={zoom ? toggleZoom : outBrowsing}
                        >
                            <IconClose/>
                        </div>
                    }

                </div>

                {/*翻页控制*/}
                {
                    Array.isArray(set) && set.length>1 && controller.flip &&
                    <Fragment>
                        {
                            loop || page!==0 &&
                            <div
                                id="zmageControlFlipLeft"
                                className={this.withShow(style.flipLeft)}
                                style={{ backgroundColor: backdrop }}
                                onClick={toPrevPage}
                            >
                                <IconArrowLeft/>
                            </div>
                        }
                        {
                            loop || page!==set.length-1 &&
                            <div
                                id="zmageControlFlipRight"
                                className={this.withShow(style.flipRight)}
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
                    Array.isArray(set) && set.length>1 && controller.pagination &&
                    <div
                        id="zmageControlPagination"
                        className={this.withShow(style.pages)}
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
}

Control.contextType = Context