/**
 * 控制层
 * 控制图片切换等
 **/

// Libs
import React, { Fragment } from 'react'
// Context
import { ContextConsumer } from "@/components/context"
// Style
import style from './index.less'
// Icons
import { DownloadIcon, RotateLeftIcon, RotateRightIcon, ZoomIcon, ArrowLeftIcon, ArrowRightIcon, CloseIcon } from '@/asserts/icons'
// Utils
import { withShowingStatus, downloadFromLink } from '@/utils'

class Control extends React.PureComponent {

    withShow = (className) => {
        const { show, zoom } = this.props
        return withShowingStatus(className, !zoom&&show, style.show)
    }

    handleDownload = () => {
        const { page, set } = this.props
        downloadFromLink(set[page].src)
    }

    render() {

        const { zoom, page, set, backdrop, mobile, controller, unmountSelf, toggleRotate, toggleZoom, toPages, toPrevPage, toNextPage } = this.props

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
                            <RotateLeftIcon/>
                        </div>
                    }
                    {
                        controller.rotate &&
                        <div
                            id="zmageControlRotateRight"
                            className={this.withShow(style.rotateRight)}
                            onClick={toggleRotate("right")}
                        >
                            <RotateRightIcon/>
                        </div>
                    }

                    {/*下载*/}
                    {
                        controller.download &&
                        <div
                            id="zmageControlDownload"
                            className={this.withShow(style.download)}
                            onClick={this.handleDownload}
                        >
                            <DownloadIcon/>
                        </div>
                    }

                    {/*放大*/}
                    {
                        controller.zoom &&
                        <div
                            id="zmageControlZoom"
                            className={this.withShow(style.zoom)}
                            onClick={mobile ? ()=>window.open(set[page].src) : toggleZoom}
                        >
                            <ZoomIcon/>
                        </div>
                    }

                    {/*关闭*/}
                    {
                        controller.close &&
                        <div
                            id="zmageControlClose"
                            className={this.withShow(style.close)}
                            onClick={zoom ? toggleZoom : unmountSelf}
                        >
                            <CloseIcon/>
                        </div>
                    }

                </div>

                {/*翻页控制*/}
                {
                    Array.isArray(set) && set.length>1 && controller.flip &&
                    <Fragment>
                        <div
                            id="zmageControlFlipLeft"
                            className={this.withShow(style.flipLeft)}
                            style={{ backgroundColor: backdrop }}
                            onClick={toPrevPage}
                        >
                            <ArrowLeftIcon/>
                        </div>
                        <div
                            id="zmageControlFlipRight"
                            className={this.withShow(style.flipRight)}
                            style={{ backgroundColor: backdrop }}
                            onClick={toNextPage}
                        >
                            <ArrowRightIcon/>
                        </div>
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
                                    <span key={i} className={style.whiteDot} onClick={()=>toPages(i)}/>
                            )
                        }
                    </div>
                }

            </Fragment>
        )
    }
}

export default ContextConsumer(Control)