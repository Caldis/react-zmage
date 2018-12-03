// Context 管理器

// React libs
import React, { createContext } from 'react'
// Config
import { defType, defProp } from '@/config/default'

export const Context = createContext({
    // Wrapper's Props
    // 内部
    cover: defProp.cover,
    remove: defProp.remove,
    // 基础数据
    set: defProp.set,
    // 功能控制
    controller: defProp.controller,
    preset: defProp.preset,
    // 界面样式
    backdrop: defProp.backdrop,
    mobile: defProp.mobile,
    edge: defProp.edge,
    // Wrapper's State
    show: false,
    zoom: false,
    page: 0,
    rotate: 0,
})

export const ContextConsumer = (Component) => props =>
    <Context.Consumer>
        { context => <Component {...{...context, ...props}}/> }
    </Context.Consumer>