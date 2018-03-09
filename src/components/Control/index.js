/**
 * 控制层
 * 控制图片切换等
 **/

// React Libs
import React,{ Fragment } from 'react'
// Style
import style from './index.less'

export default class Control extends React.Component {
    constructor(props) {
        super(props)
    }

    // 放大按钮样式
    zoomStyle = show =>
        show ? {
            WebkitClipPath: "polygon(0 65%, 65% 0, 100% 0, 100% 35%, 35% 100%, 0 100%)",
            MozClipPath: "polygon(0 65%, 65% 0, 100% 0, 100% 35%, 35% 100%, 0 100%)",
            MsClipPath: "polygon(0 65%, 65% 0, 100% 0, 100% 35%, 35% 100%, 0 100%)",
            OClipPath: "polygon(0 65%, 65% 0, 100% 0, 100% 35%, 35% 100%, 0 100%)",
            clipPath: "polygon(0 65%, 65% 0, 100% 0, 100% 35%, 35% 100%, 0 100%)",
            opacity: 1
        } : {
            WebkitClipPath: "polygon(0 100%, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%)",
            MozClipPath: "polygon(0 100%, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%)",
            MsClipPath: "polygon(0 100%, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%)",
            OClipPath: "polygon(0 100%, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%)",
            clipPath: "polygon(0 100%, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%)",
            opacity: 0
        }
    // 关闭按钮样式
    lineL = show =>
        show ? {
            WebkitTransform: 'translate(-50%, -50%) rotate(45deg)',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            opacity: 1
        } : {
            WebkitTransform: 'translate(-50%, -50%) rotate(0)',
            transform: 'translate(-50%, -50%) rotate(0)',
            opacity: 0
        }
    lineR = show =>
        show ? {
            WebkitTransform: 'translate(-50%, -50%) rotate(-45deg)',
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            opacity: 1
        } : {
            WebkitTransform: 'translate(-50%, -50%) rotate(0)',
            transform: 'translate(-50%, -50%) rotate(0)',
            opacity: 0
        }

    // 切换按钮样式
    prevStyle = show =>
        show ? {
            left: 0,
            opacity: 1
        } : {
            left: -55,
            opacity: 0
        }
    nextStyle = show =>
        show ? {
            right: 0,
            opacity: 1
        } : {
            right: -55,
            opacity: 0
        }

    // 页数指示样式
    pagesStyle = show =>
        show ? {
            bottom: 0,
            opacity: 1
        } : {
            bottom: -31,
            opacity: 0
        }

    // 图片标题样式
    altStyle = show =>
        show ? {
            WebkitClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            MozClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            MsClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            OClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1
        } : {
            WebkitClipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            MozClipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            MsClipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            OClipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            opacity: 0
        }

    render() {
        const { show, zoom, page, imageSet, controller, unmountSelf, toggleZoom, switchPages } = this.props
        const hasMultipleImage = imageSet.length > 1
        return (
            <Fragment>

	            <div className={style.controls}>
		            {/*放大按钮*/}
		            {!zoom && controller.zoom &&
		            <div className={style.zoomButton} style={this.zoomStyle(show)} onClick={toggleZoom}/>}

		            {/*关闭按钮*/}
		            {!zoom && controller.close &&
		            <div className={style.closeButton} onClick={zoom ? toggleZoom : unmountSelf}>
			            <div className={style.crossLine} style={this.lineL(show)}/>
			            <div className={style.crossLine} style={this.lineR(show)}/>
		            </div>}
	            </div>

                {/*切换按钮*/}
                {hasMultipleImage && !zoom && controller.flip &&
                <div className={style.switchButton} style={this.prevStyle(show)} onClick={switchPages("prev")}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                        <path d="M0-.5h24v24H0z" fill="none"/>
                    </svg>
                </div>}
                {hasMultipleImage && !zoom && controller.flip &&
                <div className={style.switchButton} style={this.nextStyle(show)} onClick={switchPages("next")}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                        <path d="M0-.25h24v24H0z" fill="none"/>
                    </svg>
                </div>}

                {/*页数指示*/}
                {hasMultipleImage && !zoom && controller.pagination &&
                <div className={style.pages} style={this.pagesStyle(show)}>
                    <span>{`${page+1} / ${imageSet.length}`}</span>
                </div>}

                {/*图片标题*/}
                {!zoom && controller.title &&
                <div className={style.imgAlt} style={this.altStyle(show)}>
                    {imageSet[page].alt || imageSet.alt}
                </div>}

            </Fragment>
        )
    }
}