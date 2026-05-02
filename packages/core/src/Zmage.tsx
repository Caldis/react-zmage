/**
 * 常规组件入口
 **/

// Libs
import React, { Fragment } from 'react'
import type { RefAttributes } from 'react'
// Components
import callee from './Zmage.callee'
import wrapper from './Zmage.wrapper'
import Browser from './components/Browser'
// Utils
import { defProp, getConfigFromProps } from './types/default'
import { getMotionDurationMultiplierFromEvent, isSlowMotionEnabled, motionDefaultDurationMultiplier } from './config/motion'
import { BaseType } from './types/global'

// 已知规划项 (详见 ROADMAP.md):
// - 按钮颜色 / 主题配置
// - 移动端拖拽翻页
// - 禁用移动端的滑动退出
// - Safari 全屏模式下无法锁定滚动 (FIXME)

type PropsType = BaseType

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
  coverRef: { current: HTMLImageElement | null } = { current: null }
  // 打开浏览层时的指针位置
  browsingPosition?: Coordinate
  motionDurationMultiplier = motionDefaultDurationMultiplier
  // Flags
  isBrowsingControlled = ('browsing' in this.props)
  // State
  readonly state = {
    // 浏览
    browsing: false,
  }

  componentDidUpdate (prevProps: PropsType) {
    if (this.isBrowsingControlled && prevProps.browsing && !this.props.browsing) {
      this.browsingPosition = undefined
      this.motionDurationMultiplier = motionDefaultDurationMultiplier
    }
  }

  /* 切换查看状态 */
  inBrowsing = () => {
    if (this.isBrowsingControlled) {
      this.props.onBrowsing?.(true)
    } else {
      this.setState({ browsing: true })
    }
  }
  outBrowsing = () => {
    this.browsingPosition = undefined
    this.motionDurationMultiplier = motionDefaultDurationMultiplier
    if (this.isBrowsingControlled) {
      this.props.onBrowsing?.(false)
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
            this.browsingPosition = { x: e.clientX, y: e.clientY }
            this.motionDurationMultiplier = getMotionDurationMultiplierFromEvent(e, isSlowMotionEnabled(configProps.animate))
            this.inBrowsing()
            typeof coverProps.onClick === 'function' && coverProps.onClick(e)
          }}
          onError={coverProps.onError}
          ref={(ref) => {
            if (typeof coverProps.forwardedRef === 'function') {
              coverProps.forwardedRef(ref)
            } else if (coverProps.forwardedRef && typeof coverProps.forwardedRef === 'object') {
              coverProps.forwardedRef.current = ref
            }
            if (this.coverRef) {
              this.coverRef.current = ref
            }
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
          coverPos={this.browsingPosition}
          outBrowsing={this.outBrowsing}
          motionDurationMultiplier={this.motionDurationMultiplier}
          // Config
          {...configProps}
        />

      </Fragment>
    )
  }
}

// 转发 Ref 到 Cover 图片
//
// 类型说明:
// - 显式声明为 (props) => JSX.Element | null 的 callable + 静态方法的交叉类型
// - 不直接用 ForwardRefExoticComponent，避开 @types/react@18+ 中
//   ReactPortal extends ReactElement & { children: required } 引起的
//   "ReactElement | null is not assignable to ReactNode" 已知问题
//   (相同代码原本在 R17 可用，R18+ 会报 TS2786)
// - JSX.Element 由各 React 版本的 JSX namespace 自行定义，跨版本均为合法返回
// - 也修复了原 ForwardRefExoticComponent 与显式 call signature 交叉时
//   导致严格模式下 callback prop 参数无法上下文推断 (state/page/deg implicit any) 的问题
export type ReactZmageComponent =
  & ((props: BaseType & RefAttributes<HTMLImageElement>) => React.JSX.Element | null)
  & {
    displayName?: string
    browsing: typeof callee
    Browsing: typeof callee
    wrapper: typeof wrapper
    Wrapper: typeof wrapper
  }

export type ForwardedComponent = ReactZmageComponent

const forwardedReactZmage = React.forwardRef<HTMLImageElement | null, BaseType>(
  (props, ref) =>
    <ReactZmage {...props} forwardedRef={ref}/>
) as unknown as ReactZmageComponent

// 命令式调用组件
forwardedReactZmage.browsing = callee
forwardedReactZmage.Browsing = callee // Alias browsing
// HTML转换容器
forwardedReactZmage.wrapper = wrapper
forwardedReactZmage.Wrapper = wrapper // Alias wrapper

export default forwardedReactZmage
