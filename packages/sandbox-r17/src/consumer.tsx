/**
 * Consumer smoke test — 模拟 R17 严格模式下真实用户代码
 * 验证 react-zmage 发布产物的 types/默认导出/回调推断/SSR 入口/CSS 导出
 */
import React, { StrictMode, useRef } from 'react'
import Zmage from 'react-zmage'
import ZmageSSR from 'react-zmage/ssr'
import 'react-zmage/style.css'

// 1. 默认导出 + JSX 渲染
const _basic = (
  <Zmage src="/x.jpg" alt="t"/>
)

// 2. 回调参数类型推断 (strict mode 下必须能推出 boolean/number, 否则 implicit any 报错)
const _withCallbacks = (
  <Zmage
    src="/x.jpg"
    onBrowsing={(state) => { void (state as boolean) }}
    onZooming={(state) => { void (state as boolean) }}
    onSwitching={(page) => { void (page as number) }}
    onRotating={(deg) => { void (deg as number) }}
  />
)

// 3. ref 转发到 img 元素
function _refForwarding () {
  const ref = useRef<HTMLImageElement>(null)
  return <Zmage src="/x.jpg" ref={ref}/>
}

// 4. set / preset / 受控属性
const _advanced = (
  <Zmage
    src="/x.jpg"
    set={[{ src: '/x.jpg' }, { src: '/y.jpg', alt: 't' }]}
    preset="desktop"
    browsing={false}
    backdrop="#000"
    zIndex={9999}
  />
)

// 5. 命令式调用静态方法
const _imperative = () => {
  const destroy = Zmage.browsing({ src: '/x.jpg' })
  destroy?.()
}

// 6. wrapper 容器
const _wrapper = (
  <Zmage.wrapper>
    <img src="/x.jpg" alt="t"/>
  </Zmage.wrapper>
)

// 7. SSR 入口
const _ssr = (
  <ZmageSSR src="/x.jpg" alt="t"/>
)

// 8. StrictMode 包裹
const _strict = (
  <StrictMode>
    <Zmage src="/x.jpg"/>
  </StrictMode>
)

void _basic; void _withCallbacks; void _refForwarding
void _advanced; void _imperative; void _wrapper; void _ssr; void _strict
