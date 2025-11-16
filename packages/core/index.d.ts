/**
 * Type definitions for react-zmage
 * @Project https://github.com/caldis/react-zmage
 */

import React from 'react'
import { BaseType } from './src/types/global'

type Props = BaseType & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
class ReactZmage extends React.Component<Props> {
  // 命令式调用组件
  static browsing (props: BaseType): void
  // HTML内容转换容器
  static wrapper: ReactZmageWrapper
}

declare const _default: React.NamedExoticComponent<Props>
export default _default
