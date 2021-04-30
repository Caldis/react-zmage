/**
 * 常规组件入口
 **/

// Libs
import React, { Fragment } from 'react'
// Components
import callee from './Zmage.callee'
import wrapper from './Zmage.wrapper'
import Browser from './components/Browser'
// Utils
import { defProp, getConfigFromProps } from './types/default'
import { BaseType } from '@/types/global'

// TODO:FEATURE 按钮颜色配置
// TODO:FEATURE 移动端的拖拽翻页
// TODO:ENHANCE 禁用移动端的滑动退出
// FIXME: Safari 全屏模式下无法锁定滚动

interface PropsType extends BaseType {}

interface StateType {
  browsing: boolean
}

// 图片查看器
class ReactZmage extends React.Component<PropsType, StateType> {

  // Defaults
  static defaultProps = defProp

  // Components
  public static browsing = callee
  public static Browsing = callee // Alias browsing
  public static wrapper = wrapper
  public static Wrapper = wrapper // Alias wrapper

  // Refs
  coverRef: { current: HTMLImageElement } = { current: undefined }
  // Flags
  isBrowsingControlled = this.props.hasOwnProperty('browsing')
  // State
  readonly state = {
    // 浏览
    browsing: false,
  }

  /* 切换查看状态 */
  inBrowsing = () => {
    if (this.isBrowsingControlled) {
      this.props.onBrowsing(true)
    } else {
      this.setState({ browsing: true })
    }
  }
  outBrowsing = () => {
    if (this.isBrowsingControlled) {
      this.props.onBrowsing(false)
    } else {
      this.setState({ browsing: false })
    }
  }

  render () {

    const { coverProps, controlledProps, configProps, restProps } = getConfigFromProps(this.props)

    const { browsing: internalBrowsing } = this.state

    return (
      <Fragment>

        {/*封面图片*/}
        <img
          className={coverProps.className}
          style={{ cursor: 'zoom-in', ...coverProps.style }}
          src={coverProps.src} alt={coverProps.alt}
          onClick={(e) => {
            this.inBrowsing()
            typeof coverProps.onClick === 'function' && coverProps.onClick(e)
          }}
          ref={(ref) => {
            coverProps.forwardedRef && (coverProps.forwardedRef.current = ref)
            this.coverRef && (this.coverRef.current = ref)
          }}
          {...restProps}
        />

        {/*查看叠层*/}
        <Browser
          // Controlled status
          isBrowsingControlled={this.isBrowsingControlled}
          browsing={this.isBrowsingControlled ? controlledProps.browsing : internalBrowsing}
          // Internal
          coverRef={this.coverRef}
          outBrowsing={this.outBrowsing}
          // Config
          {...configProps}
        />

      </Fragment>
    )
  }
}

// 转发 Ref 到 Cover 图片
export interface ForwardedComponent extends React.ForwardRefExoticComponent<BaseType & React.RefAttributes<HTMLImageElement>> {
  browsing: typeof callee
  Browsing: typeof callee
  wrapper: typeof wrapper
  Wrapper: typeof wrapper
}

const forwardedReactZmage = React.forwardRef<HTMLImageElement, BaseType>(
  (props, ref) =>
    <ReactZmage {...props} forwardedRef={ref}/>
) as ForwardedComponent
 
// 命令式调用组件
forwardedReactZmage.browsing = callee
forwardedReactZmage.Browsing = callee // Alias browsing
// HTML转换容器
forwardedReactZmage.wrapper = wrapper
forwardedReactZmage.Wrapper = wrapper // Alias wrapper

export default forwardedReactZmage
