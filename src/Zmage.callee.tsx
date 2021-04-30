/**
 * 命令式调用组件入口
 **/

// Libs
import React from 'react'
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
    browsing: true,
  }

  outBrowsing = () => {
    const { destructor } = this.props
    this.setState({ browsing: false })
    destructor && setTimeout(destructor, animationDuration)
  }

  render () {
    const { calleeProps, configProps } = getConfigFromProps(this.props)

    const { browsing } = this.state

    const coverTarget = calleeProps.coverRef
      ? { coverRef: calleeProps.coverRef } // 如果有封面引用, 则取其坐标
      : {
        coverPos: browsing
          ? CLICK_MONITOR.currentPosition
          : this.showPosition,
      } // 否则根据鼠标点击坐标记录

    console.log('coverTarget', CLICK_MONITOR, CLICK_MONITOR.currentPosition)

    return (
      <Browser
        // Controlled status
        browsing={browsing}
        // Internal
        {...coverTarget}
        outBrowsing={this.outBrowsing}
        // Config
        {...configProps}
      />
    )
  }
}

// 弹窗对象
const RENDER = {
  REF: React.createRef<ReactZmageCallee>(),
  CONTAINER: undefined as HTMLElement,
  PORTAL: undefined as HTMLElement,
}
// 调用函数
const callee = ({ coverRef, ...props }: BaseType) => {
  console.log('coverRef', coverRef)
  // Init env
  RENDER.PORTAL = document.createElement('div')
  RENDER.PORTAL.id = 'zmagePortal'
  RENDER.CONTAINER = document.body
  RENDER.CONTAINER.appendChild(RENDER.PORTAL)
  // Mount target
  ReactDOM.render(
    <ReactZmageCallee
      ref={RENDER.REF}
      coverRef={coverRef}
      destructor={() => RENDER.CONTAINER.removeChild(RENDER.PORTAL)}
      {...props}
    />,
    RENDER.PORTAL
  )
  // Return destructor
  return RENDER.REF.current.outBrowsing
}

export default callee
