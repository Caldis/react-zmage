export { default } from './Zmage'
// NOTE — do NOT add `export { default as browsing } from './Zmage.callee'` etc.
// Doing so changes the tsup CJS emit from `module.exports = Zmage` to
// `exports.default = Zmage; exports.browsing = …`, which breaks every
// `const Zmage = require('react-zmage')` consumer. The `Zmage.browsing` and
// `Zmage.Wrapper` static accessors already serve the same use case via the
// default export. Real tree-shaking would require a custom CJS shim that
// reattaches named exports onto a single `module.exports` value — out of scope.
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
  ControllerPlacement,
  ControllerLayoutInsetValue,
  ControllerLayoutInset,
  ControllerLayoutTarget,
  ControllerLayoutTargets,
  ControllerOverlayLayout,
  ControllerRender,
  ControllerRenderActions,
  ControllerRenderSlots,
  ControllerRenderState,
  ControllerSet,
  GestureSet,
  GestureSwipeOptions,
  GestureDragExitOptions,
  GestureWheelZoomOptions,
  GesturePinchZoomOptions,
  GestureDoubleTapZoomOptions,
  GestureTouchAction,
  HotKey,
  Animate,
  AnimateFlip,
  AnimateCoverOptions,
} from './types/global'
