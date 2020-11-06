/**
 * 控制层
 * 控制图片切换, 缩放
 **/

// Libs
import classnames from 'classnames'
import React, { Fragment } from 'react'
// Style
import style from './Control.less'
// Asserts
import { IconDownload, IconRotateLeft, IconRotateRight, IconZoom, IconArrowLeft, IconArrowRight, IconClose, IconCopy } from '@/asserts/icons'
// Utils
import { Context } from '../context'
import { downloadFromLink } from '@/utils'

export default class Control extends React.PureComponent {

    render() {

        const {
            // Data
            set,
            // Preset
            preset,
            presetIsMobile,
            presetIsDesktop,
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
            handleCopy,
        } = this.context

        return (
            <Fragment>

                {/*控制按钮*/}
                <div
                    id="zmageControl"
                    className={classnames(style.controls, { [style.show]: !zoom && show })}
                    style={{ backgroundColor: backdrop }}
                >

                    {/*旋转*/}
                    {
                        controller.rotate &&
                        <div
                            id="zmageControlRotateLeft"
                            className={classnames(style.rotateLeft, { [style.show]: !zoom && show })}
                            onClick={toggleRotate("left")}
                        >
                            <IconRotateLeft />
                        </div>
                    }
                    {
                        controller.rotate &&
                        <div
                            id="zmageControlRotateRight"
                            className={classnames(style.rotateRight, { [style.show]: !zoom && show })}
                            onClick={toggleRotate("right")}
                        >
                            <IconRotateRight />
                        </div>
                    }

                    {/*下载*/}
                    {
                        controller.download &&
                        <div
                            id="zmageControlDownload"
                            className={classnames(style.download, { [style.show]: !zoom && show })}
                            onClick={() => downloadFromLink(this.context.set[this.context.page].src)}
                        >
                            <IconDownload />
                        </div>
                    }
                    {/*复制*/}
                    {
                        controller.copy &&
                        <div
                            id="zmageControlCopy"
                            className={classnames(style.copy, { [style.show]: !zoom && show })}
                            onClick={() => handleCopy(this.context.set[this.context.page].src)}
                        >
                            <IconCopy />
                        </div>
                    }

                    {/*放大*/}
                    {
                        controller.zoom &&
                        <div
                            id="zmageControlZoom"
                            className={classnames(style.zoom, { [style.show]: !zoom && show })}
                            onClick={presetIsMobile ? () => window.open(set[page].src) : toggleZoom}
                        >
                            <IconZoom />
                        </div>
                    }

                    {/*关闭*/}
                    {
                        controller.close &&
                        <div
                            id="zmageControlClose"
                            className={classnames(style.close, { [style.show]: !zoom && show })}
                            onClick={zoom ? toggleZoom : outBrowsing}
                        >
                            <IconClose />
                        </div>
                    }

                </div>

                {/*翻页控制*/}
                {
                    Array.isArray(set) && set.length > 1 && controller.flip &&
                    <Fragment>
                        {
                            (loop || page !== 0) &&
                            <div
                                id="zmageControlFlipLeft"
                                className={classnames(style.flipLeft, { [style.show]: !zoom && show })}
                                style={{ backgroundColor: backdrop }}
                                onClick={toPrevPage}
                            >
                                <IconArrowLeft />
                            </div>
                        }
                        {
                            (loop || page !== set.length - 1) &&
                            <div
                                id="zmageControlFlipRight"
                                className={classnames(style.flipRight, { [style.show]: !zoom && show })}
                                style={{ backgroundColor: backdrop }}
                                onClick={toNextPage}
                            >
                                <IconArrowRight />
                            </div>
                        }
                    </Fragment>
                }

                {/*页数指示*/}
                {
                    Array.isArray(set) && set.length > 1 && controller.pagination &&
                    <div
                        id="zmageControlPagination"
                        className={classnames(style.pages, { [style.show]: !zoom && show, [style.mobile]: presetIsMobile })}
                        style={{ backgroundColor: backdrop }}
                    >
                        {
                            set.map((_, i) =>
                                i === page ?
                                    <span key={i} id="zmageControlPaginationActive" className={style.blackDot} /> :
                                    <span key={i} className={style.whiteDot} onClick={() => toPage(i)} />
                            )
                        }
                    </div>
                }

            </Fragment>
        )
    }
}

Control.contextType = Context
