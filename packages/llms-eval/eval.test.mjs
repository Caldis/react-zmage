import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { createRequire } from 'node:module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..', '..')
const corePkgDir = join(repoRoot, 'packages', 'core')
const llmsTxt = readFileSync(join(repoRoot, 'docs', 'llms.txt'), 'utf8')
const corePkg = JSON.parse(readFileSync(join(corePkgDir, 'package.json'), 'utf8'))
const globalTs = readFileSync(join(corePkgDir, 'src', 'types', 'global.ts'), 'utf8')
const defaultTs = readFileSync(join(corePkgDir, 'src', 'types', 'default.ts'), 'utf8')
const indexTs = readFileSync(join(corePkgDir, 'src', 'index.ts'), 'utf8')

// --- Static tests ---

test('npm package name in llms.txt matches core package.json', () => {
  assert.equal(corePkg.name, 'react-zmage')
  assert.match(llmsTxt, /published to npm as `react-zmage`/)
})

test('default export documented as forwardRef component matches index.ts', () => {
  assert.match(llmsTxt, /forwardRef/)
  // index.ts re-exports default from ./Zmage; Zmage.tsx uses React.forwardRef
  const zmageTsx = readFileSync(join(corePkgDir, 'src', 'Zmage.tsx'), 'utf8')
  assert.match(zmageTsx, /React\.forwardRef</)
  assert.match(indexTs, /export \{ default \} from '\.\/Zmage'/)
})

test('subpath react-zmage/style.css declared in exports', () => {
  assert.ok(corePkg.exports['./style.css'], 'exports["./style.css"] missing')
  assert.match(llmsTxt, /react-zmage\/style\.css/)
})

test('subpath react-zmage/ssr declared in exports', () => {
  assert.ok(corePkg.exports['./ssr'], 'exports["./ssr"] missing')
  assert.match(llmsTxt, /react-zmage\/ssr/)
})

test('backdrop default value matches code', () => {
  // grep code: backdrop: '#FFFFFF'
  const m = defaultTs.match(/backdrop:\s*'([^']+)'/)
  assert.ok(m, 'backdrop default not found in default.ts')
  const codeDefault = m[1]
  // Find the API-table row for backdrop (markdown row starting with `|` containing "backdrop")
  const backdropLine = llmsTxt.split('\n').find(
    (line) => /^\s*\|/.test(line) && /\bbackdrop\b/i.test(line) && /#[0-9A-Fa-f]{3,8}/.test(line)
  )
  assert.ok(backdropLine, 'no API-table row in llms.txt declares backdrop default as a hex color')
  const docMatch = backdropLine.match(/#[0-9A-Fa-f]{3,8}/)
  assert.equal(docMatch[0].toUpperCase(), codeDefault.toUpperCase(),
    `llms.txt says backdrop ${docMatch[0]} but code says ${codeDefault}`)
})

test('preset default value matches code and llms.txt', () => {
  assert.match(defaultTs, /const\s+DEFAULT_PRESET:\s*Preset\s*=\s*'auto'/,
    'default.ts should define DEFAULT_PRESET as auto')
  assert.match(defaultTs, /\bpreset:\s*DEFAULT_PRESET\b/,
    'defProp.preset should use DEFAULT_PRESET')
  const presetLine = llmsTxt.split('\n').find(
    (line) => /^\s*\|\s*`preset`\s*\|/.test(line)
  )
  assert.ok(presetLine, 'no API-table row in llms.txt declares the preset prop')
  assert.match(presetLine, /\|\s*`'auto'`\s*\|/,
    'llms.txt preset row should document auto as the default')
  assert.match(presetLine, /Omitting `preset` uses `'auto'`/,
    'llms.txt preset row should document omitted preset behavior')
})

test('all packages/... links in llms.txt resolve to local files', () => {
  const re = /\(https:\/\/github\.com\/Caldis\/react-zmage\/blob\/master\/(packages\/[^)]+?)\)/g
  const missing = []
  let m
  while ((m = re.exec(llmsTxt)) !== null) {
    const rel = m[1]
    const local = join(repoRoot, rel)
    if (!existsSync(local)) missing.push(rel)
  }
  assert.deepEqual(missing, [], `missing local files referenced in llms.txt: ${missing.join(', ')}`)
})

test('React peerDep range supports 16.8 through 19', () => {
  const range = corePkg.peerDependencies.react
  // Doc: "React 16.8 through 19"
  assert.match(llmsTxt, /React 16\.8 through 19/)
  assert.match(range, />=\s*16\.8/, `peer range "${range}" should allow >=16.8`)
  assert.match(range, /<\s*20/, `peer range "${range}" should cap below 20`)
})

test('Zmage.browsing return value is destructor (callee returns destroy fn)', () => {
  // Source-level signature check: callee in Zmage.callee.tsx must return a function
  const callee = readFileSync(join(corePkgDir, 'src', 'Zmage.callee.tsx'), 'utf8')
  // Find the exported callee and ensure a destructor is returned
  assert.match(callee, /return\s+(?:\(\s*\)\s*=>|destroy|destructor|function)/,
    'callee does not appear to return a destructor')
  assert.match(llmsTxt, /Returns a destructor/i)
})

test('caption prop wired across types, defaults and llms.txt (no legacy txt residue)', () => {
  // global.ts declares CaptionProp union + caption?: CaptionProp on BaseParams + Set
  assert.match(globalTs, /export\s+type\s+CaptionProp\s*=\s*string\s*\|\s*CaptionObject/,
    'CaptionProp union missing in types/global.ts')
  assert.match(globalTs, /\bcaption\?:\s*CaptionProp\b/, 'caption?: CaptionProp missing in types/global.ts')
  assert.doesNotMatch(globalTs, /\btxt\?:\s*string\b/, 'legacy txt declaration must be removed from global.ts')
  // default.ts mirrors caption in defProp (string is valid in the union)
  assert.match(defaultTs, /\bcaption:\s*''/, 'caption default missing in defProp')
  assert.doesNotMatch(defaultTs, /\btxt:\s*''/, 'legacy txt default must be removed from defProp')
  // llms.txt API table lists caption
  const captionLine = llmsTxt.split('\n').find(
    (line) => /^\s*\|/.test(line) && /`caption`/.test(line)
  )
  assert.ok(captionLine, 'no API-table row in llms.txt declares the caption prop')
})

test('hotKey umbrellas + per-side custom-descriptor surface wired across types and llms.txt', () => {
  // global.ts: HotKey interface exists, umbrellas remain boolean-only, per-side keys widened to HotKeyValue
  assert.match(globalTs, /export\s+interface\s+HotKey\b/, 'HotKey interface missing in types/global.ts')
  assert.match(globalTs, /\bflip\?:\s*boolean\b/, 'HotKey.flip umbrella must stay boolean-only in types/global.ts')
  assert.match(globalTs, /\brotate\?:\s*boolean\b/, 'HotKey.rotate umbrella must stay boolean-only in types/global.ts')
  // HotKeyValue alias = boolean | string | string[] (the descriptor surface for consumers)
  assert.match(globalTs, /export\s+type\s+HotKeyValue\s*=\s*boolean\s*\|\s*string\s*\|\s*string\[\]/,
    'HotKeyValue alias must be exported as `boolean | string | string[]` from types/global.ts')
  // Per-side keys all typed as HotKeyValue
  for (const k of ['close', 'zoom', 'flipLeft', 'flipRight', 'rotateLeft', 'rotateRight', 'download']) {
    assert.match(globalTs, new RegExp(`\\b${k}\\?:\\s*HotKeyValue\\b`),
      `HotKey.${k} should be typed as HotKeyValue in types/global.ts`)
  }
  // default.ts: defPreset adds rotate + download to both desktop and mobile hotKey
  assert.match(defaultTs, /desktop:[\s\S]*?hotKey:[\s\S]*?\brotate:\s*true\b/,
    'defPreset.desktop.hotKey.rotate=true missing in default.ts')
  assert.match(defaultTs, /desktop:[\s\S]*?hotKey:[\s\S]*?\bdownload:\s*false\b/,
    'defPreset.desktop.hotKey.download=false missing (download is opt-in)')
  // llms.txt API table row for hotKey must mention umbrellas + all per-side + cross-platform Mod+S
  const hotKeyLine = llmsTxt.split('\n').find(
    (line) => /^\s*\|\s*`hotKey`\s*\|/.test(line)
  )
  assert.ok(hotKeyLine, 'no API-table row in llms.txt declares the hotKey prop')
  for (const term of ['flip', 'flipLeft', 'flipRight', 'rotateLeft', 'rotateRight', 'download']) {
    assert.match(hotKeyLine, new RegExp(`\\b${term}\\b`), `llms.txt hotKey row missing ${term}`)
  }
  assert.match(hotKeyLine, /Mod\+S/, 'llms.txt hotKey row should document the cross-platform Mod+S download default')
})

test('hideOnDblClick + onError prop wired across types, defaults and llms.txt', () => {
  // global.ts: hideOnDblClick on InterfaceAndInteractionParams; onError on LifeCycleParams
  assert.match(globalTs, /\bhideOnDblClick\?:\s*boolean\b/, 'hideOnDblClick missing in types/global.ts')
  assert.match(globalTs, /\bonError\?:\s*\(e:\s*SyntheticEvent/, 'onError missing in types/global.ts')
  // default.ts: hideOnDblClick has a false default in defProp
  assert.match(defaultTs, /\bhideOnDblClick:\s*false\b/, 'hideOnDblClick default missing in defProp')
  // llms.txt API rows
  const dblLine = llmsTxt.split('\n').find(
    (line) => /^\s*\|\s*`hideOnDblClick`\s*\|/.test(line)
  )
  assert.ok(dblLine, 'no API-table row in llms.txt declares hideOnDblClick')
  const onErrLine = llmsTxt.split('\n').find(
    (line) => /^\s*\|\s*`onError`\s*\|/.test(line)
  )
  assert.ok(onErrLine, 'no API-table row in llms.txt declares onError')
})

test('loadingDelay prop wired across types, defaults and llms.txt', () => {
  // global.ts: loadingDelay on InterfaceAndInteractionParams
  assert.match(globalTs, /\bloadingDelay\?:\s*number\b/, 'loadingDelay missing in types/global.ts')
  // default.ts: loadingDelay default = 200 in defProp (anti-flicker delay before loading shows)
  assert.match(defaultTs, /\bloadingDelay:\s*200\b/, 'loadingDelay default missing in defProp')
  // llms.txt API row
  const line = llmsTxt.split('\n').find(
    (line) => /^\s*\|\s*`loadingDelay`\s*\|/.test(line)
  )
  assert.ok(line, 'no API-table row in llms.txt declares loadingDelay')
})

test('controller visual keys (backdrop + color) declared in ControllerSet and llms.txt', () => {
  // global.ts: ControllerSet declares the visual keys
  assert.match(globalTs, /export\s+interface\s+ControllerSet\b/, 'ControllerSet interface missing in types/global.ts')
  // Match the optional string fields anywhere inside the interface body (not pinned to top-level
  // because TS lets fields appear in any order)
  assert.match(globalTs, /\bbackdrop\?:\s*string\b/, 'ControllerSet.backdrop missing in types/global.ts')
  assert.match(globalTs, /\bcolor\?:\s*string\b/, 'ControllerSet.color missing in types/global.ts')
  // llms.txt controller row must mention both visual keys (require `controller` as the first cell
  // to skip preset row prose)
  const controllerLine = llmsTxt.split('\n').find(
    (line) => /^\s*\|\s*`controller`\s*\|/.test(line)
  )
  assert.ok(controllerLine, 'no API-table row in llms.txt declares the controller prop')
  assert.match(controllerLine, /controller\.backdrop|`backdrop`/, 'llms.txt controller row missing the backdrop visual key')
  assert.match(controllerLine, /controller\.color|`color`/, 'llms.txt controller row missing the color visual key')
})

test('controller placement and custom render API wired across types, defaults and llms.txt', () => {
  for (const sym of ['ControllerPlacement', 'ControllerRender', 'ControllerRenderState', 'ControllerRenderActions', 'ControllerRenderSlots']) {
    assert.match(globalTs, new RegExp(`export\\s+(?:interface|type)\\s+${sym}\\b`), `${sym} missing in types/global.ts`)
    assert.match(indexTs, new RegExp(`\\b${sym}\\b`), `${sym} missing from public type exports`)
    assert.match(llmsTxt, new RegExp(`\\b${sym}\\b`), `${sym} missing in llms.txt`)
  }
  assert.match(globalTs, /\bplacement\?:\s*ControllerPlacement\b/, 'ControllerSet.placement missing in types/global.ts')
  assert.match(globalTs, /\brender\?:\s*ControllerRender\b/, 'ControllerSet.render missing in types/global.ts')
  assert.match(defaultTs, /desktop:[\s\S]*?controller:[\s\S]*?\bplacement:\s*'top-right'/, 'desktop controller.placement default missing in default.ts')
  assert.match(defaultTs, /mobile:[\s\S]*?controller:[\s\S]*?\bplacement:\s*'top-right'/, 'mobile controller.placement default missing in default.ts')
  const controllerLine = llmsTxt.split('\n').find(
    (line) => /^\s*\|\s*`controller`\s*\|/.test(line)
  )
  assert.ok(controllerLine, 'no API-table row in llms.txt declares the controller prop')
  for (const term of ['controller.placement', 'controller.render', 'state', 'actions', 'slots', 'top-right', 'bottom-center']) {
    assert.match(controllerLine, new RegExp(term), `llms.txt controller row missing ${term}`)
  }
  assert.match(controllerLine, /\(args: \{ state: ControllerRenderState; actions: ControllerRenderActions; slots: ControllerRenderSlots \}\) => ReactNode/,
    'llms.txt controller row should document the controller.render function signature')
  assert.match(controllerLine, /return `null`/,
    'llms.txt controller row should document that returning null hides the custom controller layer')
})

test('controller overlay layout API wired across types and llms.txt', () => {
  for (const sym of ['ControllerOverlayLayout', 'ControllerLayoutTargets', 'ControllerLayoutTarget', 'ControllerLayoutInset', 'ControllerLayoutInsetValue']) {
    assert.match(globalTs, new RegExp(`export\\s+(?:interface|type)\\s+${sym}\\b`), `${sym} missing in types/global.ts`)
    assert.match(indexTs, new RegExp(`\\b${sym}\\b`), `${sym} missing from public type exports`)
    assert.match(llmsTxt, new RegExp(`\\b${sym}\\b`), `${sym} missing in llms.txt`)
  }
  assert.match(globalTs, /\blayout\?:\s*ControllerOverlayLayout\b/, 'ControllerSet.layout missing in types/global.ts')
  const controllerLine = llmsTxt.split('\n').find(
    (line) => /^\s*\|\s*`controller`\s*\|/.test(line)
  )
  assert.ok(controllerLine, 'no API-table row in llms.txt declares the controller prop')
  for (const term of ['controller.layout', 'ControllerOverlayLayout', 'toolbar', 'pagination', 'caption', 'layout.mobile']) {
    assert.match(controllerLine, new RegExp(term), `llms.txt controller row missing ${term}`)
  }
  assert.match(controllerLine, /number values are px/, 'llms.txt controller row should document numeric layout units')
  assert.match(controllerLine, /scalar `inset` maps to `bottom`/, 'llms.txt controller row should document scalar inset semantics')
})

test('gesture prop wired across types, defaults and llms.txt', () => {
  assert.match(globalTs, /export\s+interface\s+GestureSet\b/, 'GestureSet interface missing in types/global.ts')
  assert.match(globalTs, /export\s+interface\s+GestureSwipeOptions\b/, 'GestureSwipeOptions interface missing in types/global.ts')
  assert.match(globalTs, /export\s+interface\s+GestureDragExitOptions\b/, 'GestureDragExitOptions interface missing in types/global.ts')
  assert.match(globalTs, /export\s+interface\s+GestureWheelZoomOptions\b/, 'GestureWheelZoomOptions interface missing in types/global.ts')
  assert.match(globalTs, /export\s+interface\s+GesturePinchZoomOptions\b/, 'GesturePinchZoomOptions interface missing in types/global.ts')
  assert.match(globalTs, /export\s+interface\s+GestureDoubleTapZoomOptions\b/, 'GestureDoubleTapZoomOptions interface missing in types/global.ts')
  assert.match(globalTs, /export\s+type\s+GestureTouchAction\b/, 'GestureTouchAction type missing in types/global.ts')
  assert.match(globalTs, /\bgesture\?:\s*boolean\s*\|\s*GestureSet\b/, 'gesture prop missing from FunctionalParams')
  assert.match(defaultTs, /desktop:[\s\S]*?gesture:[\s\S]*?\bswipe:\s*false\b/, 'desktop gesture.swipe=false missing in default.ts')
  assert.match(defaultTs, /desktop:[\s\S]*?gesture:[\s\S]*?\bdragExit:\s*false\b/, 'desktop gesture.dragExit=false missing in default.ts')
  assert.match(defaultTs, /desktop:[\s\S]*?gesture:[\s\S]*?\bwheelZoom:\s*\{\s*\.\.\.defaultGestureWheelZoomOptions\s*\}/, 'desktop gesture.wheelZoom should use default options in default.ts')
  assert.match(defaultTs, /desktop:[\s\S]*?gesture:[\s\S]*?\bpinchZoom:\s*false\b/, 'desktop gesture.pinchZoom=false missing in default.ts')
  assert.match(defaultTs, /desktop:[\s\S]*?gesture:[\s\S]*?\bdoubleTapZoom:\s*false\b/, 'desktop gesture.doubleTapZoom=false missing in default.ts')
  assert.match(defaultTs, /desktop:[\s\S]*?gesture:[\s\S]*?\btouchAction:\s*'managed'(?:\s+as\s+const)?\b/, 'desktop gesture.touchAction=managed missing in default.ts')
  assert.match(defaultTs, /defaultGestureSwipeOptions:[\s\S]*?\bthreshold:\s*120\b/, 'default gesture.swipe threshold missing in default.ts')
  assert.match(defaultTs, /defaultGestureDragExitOptions:[\s\S]*?\bthreshold:\s*80\b/, 'default gesture.dragExit threshold missing in default.ts')
  assert.match(defaultTs, /defaultGestureWheelZoomOptions:[\s\S]*?\bstep:\s*0\.12\b/, 'default gesture.wheelZoom step missing in default.ts')
  assert.match(defaultTs, /defaultGestureWheelZoomOptions:[\s\S]*?\bmaxScale:\s*4\b/, 'default gesture.wheelZoom maxScale missing in default.ts')
  assert.match(defaultTs, /defaultGestureWheelZoomOptions:[\s\S]*?\breverse:\s*false\b/, 'default gesture.wheelZoom reverse=false missing in default.ts')
  assert.match(defaultTs, /defaultGestureWheelZoomOptions:[\s\S]*?\bexitGuardDuration:\s*1000\b/, 'default gesture.wheelZoom exitGuardDuration=1000 missing in default.ts')
  assert.match(defaultTs, /defaultGesturePinchZoomOptions:[\s\S]*?\bmaxScale:\s*4\b/, 'default gesture.pinchZoom maxScale missing in default.ts')
  assert.match(defaultTs, /defaultGesturePinchZoomOptions:[\s\S]*?\bresetBelowFit:\s*true\b/, 'default gesture.pinchZoom resetBelowFit=true missing in default.ts')
  assert.match(defaultTs, /defaultGesturePinchZoomOptions:[\s\S]*?\bcenter:\s*'gesture'/, 'default gesture.pinchZoom center=gesture missing in default.ts')
  assert.match(defaultTs, /defaultGestureDoubleTapZoomOptions:[\s\S]*?\bscale:\s*1\b/, 'default gesture.doubleTapZoom scale=1 missing in default.ts')
  assert.match(defaultTs, /defaultGestureDoubleTapZoomOptions:[\s\S]*?\binterval:\s*300\b/, 'default gesture.doubleTapZoom interval=300 missing in default.ts')
  assert.match(defaultTs, /defaultGestureDoubleTapZoomOptions:[\s\S]*?\bdistance:\s*32\b/, 'default gesture.doubleTapZoom distance=32 missing in default.ts')
  assert.match(defaultTs, /mobile:[\s\S]*?gesture:[\s\S]*?\bswipe:\s*\{\s*\.\.\.defaultGestureSwipeOptions\s*\}/, 'mobile gesture.swipe should use default options in default.ts')
  assert.match(defaultTs, /mobile:[\s\S]*?gesture:[\s\S]*?\bdragExit:\s*\{\s*\.\.\.defaultGestureDragExitOptions\s*\}/, 'mobile gesture.dragExit should use default options in default.ts')
  assert.match(defaultTs, /mobile:[\s\S]*?gesture:[\s\S]*?\bwheelZoom:\s*false\b/, 'mobile gesture.wheelZoom=false missing in default.ts')
  assert.match(defaultTs, /mobile:[\s\S]*?gesture:[\s\S]*?\bpinchZoom:\s*\{\s*\.\.\.defaultGesturePinchZoomOptions\s*\}/, 'mobile gesture.pinchZoom should use default options in default.ts')
  assert.match(defaultTs, /mobile:[\s\S]*?gesture:[\s\S]*?\bdoubleTapZoom:\s*\{\s*\.\.\.defaultGestureDoubleTapZoomOptions\s*\}/, 'mobile gesture.doubleTapZoom should use default options in default.ts')
  assert.match(defaultTs, /mobile:[\s\S]*?gesture:[\s\S]*?\btouchAction:\s*'managed'(?:\s+as\s+const)?\b/, 'mobile gesture.touchAction=managed missing in default.ts')
  const gestureLine = llmsTxt.split('\n').find(
    (line) => /^\s*\|\s*`gesture`\s*\|/.test(line)
  )
  assert.ok(gestureLine, 'no API-table row in llms.txt declares the gesture prop')
  for (const term of ['swipe', 'dragExit', 'wheelZoom', 'pinchZoom', 'doubleTapZoom', 'touchAction', 'threshold', 'velocity', 'axisLock', 'step', 'minScale', 'maxScale', 'reverse', 'exitGuardDuration', 'resetBelowFit', 'interval', 'distance']) {
    assert.match(gestureLine, new RegExp(`\\b${term}\\b`), `llms.txt gesture row missing ${term}`)
  }
})

test('animate.cover wired across types, defaults and llms.txt', () => {
  assert.match(globalTs, /export\s+interface\s+AnimateCoverOptions\b/, 'AnimateCoverOptions interface missing in types/global.ts')
  assert.match(globalTs, /\bcover\?:\s*boolean\s*\|\s*AnimateCoverOptions\b/, 'Animate.cover missing from types/global.ts')
  assert.match(globalTs, /\bslowMotion\?:\s*boolean\b/, 'Animate.slowMotion missing from types/global.ts')
  for (const key of ['objectFit', 'clip', 'radius']) {
    assert.match(defaultTs, new RegExp(`defaultAnimateCoverOptions:[\\s\\S]*?\\b${key}:\\s*true\\b`), `default animate.cover.${key}=true missing in default.ts`)
  }
  assert.match(defaultTs, /desktop:[\s\S]*?animate:[\s\S]*?\bcover:\s*\{\s*\.\.\.defaultAnimateCoverOptions\s*\}/, 'desktop animate.cover should use default options in default.ts')
  assert.match(defaultTs, /mobile:[\s\S]*?animate:[\s\S]*?\bcover:\s*\{\s*\.\.\.defaultAnimateCoverOptions\s*\}/, 'mobile animate.cover should use default options in default.ts')
  assert.match(defaultTs, /desktop:[\s\S]*?animate:[\s\S]*?\bslowMotion:\s*false\b/, 'desktop animate.slowMotion=false missing in default.ts')
  assert.match(defaultTs, /mobile:[\s\S]*?animate:[\s\S]*?\bslowMotion:\s*false\b/, 'mobile animate.slowMotion=false missing in default.ts')
  const animateLine = llmsTxt.split('\n').find(
    (line) => /^\s*\|\s*`animate`\s*\|/.test(line)
  )
  assert.ok(animateLine, 'no API-table row in llms.txt declares the animate prop')
  for (const term of ['AnimateCoverOptions', 'objectFit', 'clip', 'radius', 'legacy cover geometry', 'slowMotion', 'Shift', '10x']) {
    assert.match(animateLine, new RegExp(term), `llms.txt animate row missing ${term}`)
  }
})

test('public type symbols present in types/global.ts', () => {
  for (const sym of ['BaseType', 'Set', 'Preset', 'ControllerSet', 'ControllerPlacement', 'ControllerOverlayLayout', 'ControllerLayoutTargets', 'ControllerLayoutTarget', 'ControllerLayoutInset', 'ControllerLayoutInsetValue', 'ControllerRender', 'ControllerRenderState', 'ControllerRenderActions', 'ControllerRenderSlots', 'HotKey', 'Animate', 'AnimateCoverOptions', 'GestureSet', 'GestureWheelZoomOptions', 'GesturePinchZoomOptions', 'GestureDoubleTapZoomOptions', 'GestureTouchAction']) {
    const re = new RegExp(`(?:export\\s+(?:interface|type)\\s+${sym}\\b)`)
    assert.match(globalTs, re, `${sym} not exported from types/global.ts`)
    assert.match(llmsTxt, new RegExp(`\\b${sym}\\b`), `${sym} not mentioned in llms.txt`)
  }
})

// --- Runtime tests (require built dist) ---

const distMjs = join(corePkgDir, 'dist', 'index.mjs')
const distSsrMjs = join(corePkgDir, 'dist', 'ssr', 'index.mjs')
const distCss = join(corePkgDir, 'dist', 'index.css')
const distAvailable = existsSync(distMjs) && existsSync(distSsrMjs) && existsSync(distCss)

test('built dist files exist for declared exports', { skip: !distAvailable && 'core/dist not built' }, () => {
  assert.ok(existsSync(distMjs), 'dist/index.mjs missing')
  assert.ok(existsSync(distSsrMjs), 'dist/ssr/index.mjs missing')
  assert.ok(existsSync(distCss), 'dist/index.css missing')
})

test('runtime: default export is a ForwardRef object with browsing + Wrapper statics',
  { skip: !distAvailable && 'core/dist not built' },
  async () => {
    // Resolve react/react-dom from core's installed deps
    const coreRequire = createRequire(join(corePkgDir, 'package.json'))
    const reactPath = coreRequire.resolve('react')
    // Make 'react' resolvable for the dynamic import of dist
    const React = (await import(pathToFileURL(reactPath).href)).default ??
                  await import(pathToFileURL(reactPath).href)
    const expectedSymbol = React.forwardRef(() => null).$$typeof

    const mod = await import(pathToFileURL(distMjs).href)
    const Zmage = mod.default
    assert.equal(typeof Zmage, 'object', 'default export should be ForwardRef object')
    assert.equal(Zmage.$$typeof, expectedSymbol,
      'default export $$typeof does not match react.forwardRef symbol')
    assert.equal(typeof Zmage.render, 'function',
      'forwardRef object should expose a .render function')
    assert.equal(typeof Zmage.browsing, 'function',
      'Zmage.browsing should be a function')
    assert.ok(Zmage.Wrapper, 'Zmage.Wrapper should exist')
  })
