export { default } from './Zmage'
export type {
  ReactZmageComponent,
  ForwardedComponent,
  ReactZmageComponent as ReactZmageSSRComponent,
} from './Zmage'
// 公共类型 — 供消费方做配置对象类型注解 (`const config: BaseType = {...}`)
export type {
  BaseType,
  BaseParams,
  PresetParams,
  FunctionalParams,
  InterfaceAndInteractionParams,
  LifeCycleParams,
  ControlledParams,
  Set,
  Preset,
  ControllerItem,
  ControllerSet,
  HotKey,
  Animate,
  AnimateFlip,
} from './types/global'
