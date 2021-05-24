/**
 * 命令式调用组件入口
 **/

// Libs
import React, { RefObject } from 'react'
import ReactDOM from 'react-dom'
// Components
import Browser from './components/Browser'
// Utils
import { defProp, getConfigFromProps } from '@/types/default'
import { animationDuration } from '@/config/anim'
import { BaseType } from '@/types/global'
import { GlobalClickMonitor } from '@/utils'

const CLICK_MONITOR = new GlobalClickMonitor()

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

  componentDidMount () {
    this.inBrowsing()
  }

  inBrowsing = () => {
    requestAnimationFrame(() => {
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
      destructor && setTimeout(destructor, animationDuration)
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
} = {
  REF: React.createRef<ReactZmageCallee>(),
  CONTAINER: undefined as unknown as HTMLElement,
  PORTAL: undefined as unknown as HTMLElement,
}
// 调用函数
const callee = ({ coverRef, ...props }: BaseType) => {
  // Init env
  RENDER.PORTAL = document.createElement('div')
  RENDER.PORTAL.id = 'zmagePortal'
  RENDER.CONTAINER = document.body
  RENDER.CONTAINER.appendChild(RENDER.PORTAL)
  // Destructor
  const destructor = () => RENDER.CONTAINER.removeChild(RENDER.PORTAL)
  // Mount target
  ReactDOM.render(
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
