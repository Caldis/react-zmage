/**
 * Consumer smoke test — R18 strict mode 下的真实用户代码
 */
import React, { StrictMode, useRef } from 'react'
import Zmage from 'react-zmage'
import ZmageSSR from 'react-zmage/ssr'
import 'react-zmage/style.css'

const _basic = <Zmage src="/x.jpg" alt="t"/>

const _withCallbacks = (
  <Zmage
    src="/x.jpg"
    onBrowsing={(state) => { void (state as boolean) }}
    onZooming={(state) => { void (state as boolean) }}
    onSwitching={(page) => { void (page as number) }}
    onRotating={(deg) => { void (deg as number) }}
  />
)

function _refForwarding () {
  const ref = useRef<HTMLImageElement>(null)
  return <Zmage src="/x.jpg" ref={ref}/>
}

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

const _imperative = () => {
  const destroy = Zmage.browsing({ src: '/x.jpg' })
  destroy?.()
}

const _wrapper = (
  <Zmage.wrapper>
    <img src="/x.jpg" alt="t"/>
  </Zmage.wrapper>
)

const _ssr = <ZmageSSR src="/x.jpg" alt="t"/>

const _strict = (
  <StrictMode>
    <Zmage src="/x.jpg"/>
  </StrictMode>
)

void _basic; void _withCallbacks; void _refForwarding
void _advanced; void _imperative; void _wrapper; void _ssr; void _strict
