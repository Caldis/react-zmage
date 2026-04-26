/**
 * 命令式调用组件入口
 **/

// Libs
import React, { ReactElement, RefObject } from 'react'
import ReactDOM from 'react-dom'
// Components
import Browser from './components/Browser'
// Utils
import { defProp, getConfigFromProps } from './types/default'
import { animationDuration } from './config/anim'
import { BaseType } from './types/global'
import { GlobalClickMonitor } from './utils'

const CLICK_MONITOR = new GlobalClickMonitor()

/**
 * 跨 React 版本 mount 适配器
 *
 * - React 18+: 用 react-dom/client 的 createRoot (R19 已彻底删除 ReactDOM.render, 必走此路径)
 * - React 16/17: fallback 到 ReactDOM.render
 *
 * 用 require + try-catch 做运行时探测, 而不是静态 import:
 * - 静态 `import 'react-dom/client'` 会让 R16/17 用户在 install 时 bundler 报 "Module not found"
 * - 动态 require 让 R16/17 环境抛错并被 catch, 平滑降级到 legacy 路径
 */
type MountAdapter = {
  mount: (element: ReactElement, container: HTMLElement) => () => void
}

let cachedAdapter: MountAdapter | undefined

const resolveMountAdapter = (): MountAdapter => {
  if (cachedAdapter) return cachedAdapter

  // 探测 createRoot (R18+ via react-dom/client)
  let createRoot: ((container: HTMLElement) => { render: (el: ReactElement) => void; unmount: () => void }) | undefined
  try {
    // 用 require 而非 import, 让构建产物在 R16/17 消费方不会因找不到子路径而 build error
    // tsup external 配置已经把 'react-dom/client' 标记为外部, 不会被 bundle
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    createRoot = require('react-dom/client').createRoot
  } catch {
    // R16/17 环境无 react-dom/client 子路径; ESM 无 require 全局 — 都走 fallback
  }

  if (typeof createRoot === 'function') {
    cachedAdapter = {
      mount: (element, container) => {
        const root = createRoot!(container)
        root.render(element)
        return () => root.unmount()
      },
    }
    return cachedAdapter
  }

  // Fallback: legacy ReactDOM.render (R16/17)
  // 在 R19 + ESM 且无 require 的环境下这里也会被走到, 此时 ReactDOM.render 已被删除, 会立即抛错提示用户
  if (typeof (ReactDOM as { render?: unknown }).render !== 'function') {
    throw new Error(
      `react-zmage: no compatible mount API found (react-dom version ${(ReactDOM as { version?: string }).version ?? 'unknown'}). ` +
      'In React 19+ ESM environments, ensure react-dom/client is resolvable at runtime.'
    )
  }
  cachedAdapter = {
    mount: (element, container) => {
      ReactDOM.render(element, container)
      return () => { ReactDOM.unmountComponentAtNode(container) }
    },
  }
  return cachedAdapter
}

type Props = BaseType;

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
  outBrowsing = () => {
    const { destructor } = this.props
    this.setState({
      browsing: false
    }, () => {
      if (destructor) {
        this.outBrowsingTimer = setTimeout(() => {
          this.outBrowsingTimer = undefined
          destructor()
        }, animationDuration)
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
        // Config
        {...configProps}
      />
    )
  }
}

// 弹窗对象
const RENDER: {
  REF: RefObject<ReactZmageCallee>,
  CONTAINER: HTMLElement,
  PORTAL: HTMLElement,
  UNMOUNT?: () => void,
} = {
  REF: React.createRef<ReactZmageCallee>(),
  CONTAINER: undefined as unknown as HTMLElement,
  PORTAL: undefined as unknown as HTMLElement,
}
// 调用函数
const callee = ({ coverRef, ...props }: BaseType) => {
  const adapter = resolveMountAdapter()
  // Init env
  RENDER.PORTAL = document.createElement('div')
  RENDER.PORTAL.id = 'zmagePortal'
  RENDER.CONTAINER = document.body
  RENDER.CONTAINER.appendChild(RENDER.PORTAL)
  // Destructor: 卸载 React 树后再移除 DOM 节点
  const portalEl = RENDER.PORTAL
  const containerEl = RENDER.CONTAINER
  const destructor = () => {
    if (RENDER.UNMOUNT) {
      RENDER.UNMOUNT()
      RENDER.UNMOUNT = undefined
    }
    if (portalEl.parentNode === containerEl) {
      containerEl.removeChild(portalEl)
    }
  }
  // Mount target
  RENDER.UNMOUNT = adapter.mount(
    <ReactZmageCallee
      ref={RENDER.REF}
      coverRef={coverRef}
      destructor={destructor}
      {...props}
    />,
    RENDER.PORTAL
  )
  // Return destructor
  return RENDER.REF.current?.outBrowsing
}

export default callee
