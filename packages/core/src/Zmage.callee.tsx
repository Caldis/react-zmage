/**
 * 命令式调用组件入口
 **/

// Libs
import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import * as ReactDOMClient from 'react-dom/client'
// Components
import Browser from './components/Browser'
// Utils
import { defProp, getConfigFromProps } from './types/default'
import { getBrowsingAnimationDuration } from './config/anim'
import { getMotionDurationMultiplierFromEvent, isSlowMotionEnabled } from './config/motion'
import type { MotionTriggerEvent } from './config/motion'
import { BaseType } from './types/global'
import { GlobalClickMonitor } from './utils'

const CLICK_MONITOR = new GlobalClickMonitor()

/**
 * 跨 React 版本 mount 适配器
 *
 * - React 18+: 用 react-dom/client 的 createRoot (R19 已彻底删除 ReactDOM.render, 必走此路径)
 * - React 16/17: fallback 到 ReactDOM.render
 *
 * 用静态 import 而非 runtime require:
 * - 之前用 `require('react-dom/client')` 在 ESM bundler (Vite/Next.js client) 里没有全局 `require`,
 *   会被 try/catch 静默吞掉, 落到 R19 已删除的 ReactDOM.render, 第一次调用就抛 "no compatible mount API found".
 * - tsup 已把 'react-dom/client' 标记为 external (见 tsup.config.ts), 因此:
 *   - ESM dist 输出 `import { createRoot } from 'react-dom/client'` — 浏览器 bundler 可解析
 *   - CJS dist 输出 `var { createRoot } = require('react-dom/client')` — Node 可解析
 *   - R16/17 用户的 bundler 会在 build 期就报 "Module not found", 这是比之前"点击时崩溃"更早更响的信号.
 *     R16/17 在 ESM 消费方原本就跑不了 zmage (历史 latent bug), 这里不算回归.
 */
type MountAdapter = {
  mount: (element: ReactElement, container: HTMLElement) => () => void
}

let cachedAdapter: MountAdapter | undefined

const resolveMountAdapter = (): MountAdapter => {
  if (cachedAdapter) return cachedAdapter

  // R18+: 静态 import 的 createRoot (tsup external 保留, 由消费方 bundler 解析)
  const createRoot = (ReactDOMClient as { createRoot?: (container: HTMLElement) => { render: (el: ReactElement) => void; unmount: () => void } }).createRoot

  if (typeof createRoot === 'function') {
    cachedAdapter = {
      mount: (element, container) => {
        const root = createRoot(container)
        root.render(element)
        return () => root.unmount()
      },
    }
    return cachedAdapter
  }

  // Fallback: legacy ReactDOM.render (R16/17)
  // R19 在 type 层 (@types/react-dom@19) 已经删除了 .render / .unmountComponentAtNode 的类型;
  // 但运行时下的 react-dom@16/17 仍然提供这些方法. 这里通过 unknown 双断言保留运行时兼容.
  type LegacyReactDOM = {
    render: (element: ReactElement, container: HTMLElement) => void
    unmountComponentAtNode: (container: HTMLElement) => void
    version?: string
  }
  const legacy = ReactDOM as unknown as LegacyReactDOM
  if (typeof legacy.render !== 'function') {
    throw new Error(
      `react-zmage: no compatible mount API found (react-dom version ${legacy.version ?? 'unknown'}). ` +
      'Ensure react-dom@16.8+ is installed.'
    )
  }
  cachedAdapter = {
    mount: (element, container) => {
      legacy.render(element, container)
      return () => { legacy.unmountComponentAtNode(container) }
    },
  }
  return cachedAdapter
}

type InternalCalleeProps = BaseType & {
  motionDurationMultiplier?: number
};
type Props = InternalCalleeProps;

type State = {
  browsing: boolean;
};

class ReactZmageCallee extends React.Component<Props, State> {
  // Defaults
  static defaultProps = defProp
  // Popup Position
  showPosition = CLICK_MONITOR.currentPosition
  // State
  readonly state = {
    browsing: false,
  }
  // 异步动作句柄
  inBrowsingRaf?: number
  outBrowsingTimer?: ReturnType<typeof setTimeout>

  componentDidMount () {
    this.inBrowsing()
  }

  componentWillUnmount () {
    if (this.inBrowsingRaf !== undefined) {
      cancelAnimationFrame(this.inBrowsingRaf)
      this.inBrowsingRaf = undefined
    }
    if (this.outBrowsingTimer !== undefined) {
      clearTimeout(this.outBrowsingTimer)
      this.outBrowsingTimer = undefined
    }
  }

  inBrowsing = () => {
    this.inBrowsingRaf = requestAnimationFrame(() => {
      this.inBrowsingRaf = undefined
      this.setState({
        browsing: true
      })
    })
  }
  outBrowsing = (event?: MotionTriggerEvent) => {
    const { destructor } = this.props
    const motionDurationMultiplier = getMotionDurationMultiplierFromEvent(event, isSlowMotionEnabled(this.props.animate))
    this.setState({
      browsing: false
    }, () => {
      if (destructor) {
        this.outBrowsingTimer = setTimeout(() => {
          this.outBrowsingTimer = undefined
          destructor()
        }, getBrowsingAnimationDuration(true, motionDurationMultiplier))
      }
    })
  }

  render () {
    const { calleeProps, configProps } = getConfigFromProps(this.props)

    const { browsing } = this.state

    if (browsing) {
      this.showPosition = CLICK_MONITOR.currentPosition
    }

    return (
      <Browser
        // Controlled status
        browsing={browsing}
        // Internal
        coverRef={calleeProps.coverRef}
        coverPos={this.showPosition}
        outBrowsing={this.outBrowsing}
        motionDurationMultiplier={this.props.motionDurationMultiplier}
        // Config
        {...configProps}
      />
    )
  }
}

// 调用函数
const callee = (({ coverRef, ...props }: InternalCalleeProps) => {
  const adapter = resolveMountAdapter()
  // Init env
  const portalEl = document.createElement('div')
  portalEl.id = 'zmagePortal'
  const containerEl = document.body
  containerEl.appendChild(portalEl)
  const ref = React.createRef<ReactZmageCallee>()
  let unmount: (() => void) | undefined
  let destroyed = false
  // Destructor: 卸载 React 树后再移除 DOM 节点
  const destructor = () => {
    if (destroyed) return
    destroyed = true
    if (unmount) {
      const currentUnmount = unmount
      unmount = undefined
      currentUnmount()
    }
    if (portalEl.parentNode === containerEl) {
      containerEl.removeChild(portalEl)
    }
  }
  // Mount target
  unmount = adapter.mount(
    <ReactZmageCallee
      ref={ref}
      coverRef={coverRef}
      destructor={destructor}
      {...props}
    />,
    portalEl
  )
  // Return destructor — 必须返回一个稳定函数, 不能直接返回 ref.current?.outBrowsing.
  // R17 的 ReactDOM.render 同步 commit, ref 在 mount 时立刻可读;
  // R18+ 的 createRoot.render 异步 commit, callee() 返回时 ref 还是 null,
  // 直接读 .current 会让 R18/19 用户拿到 undefined (历史遗留 bug, 在多版本测试矩阵
  // 统一到 R19 之前未被覆盖到).
  //
  // 返回闭包延迟解引用 ref. 语义上"destructor"应当是 force-kill, 因此始终走
  // synchronous unmount + removeChild 路径; 不依赖 setState→setTimeout 的退出动画
  // (那条路径在 R18+ concurrent 渲染下时序不稳定, 且对一个被显式调用的 destroy()
  // 来说"立即生效"比"动画退出"语义上更合适, 也避免和调用方自己的 cleanup 编排打架).
  return destructor
}) as (props: BaseType) => () => void

export default callee
