import { Heading } from '@/docs/Heading'
import { ParamTable } from '@/docs/ParamTable'
import { CodeBlock } from '@/components/CodeBlock'
import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'
import { defPreset } from '@/schema/param-schema'

const CONTROLLER_KEYS: { k: string; descKey: I18nKey }[] = [
  { k: 'pagination', descKey: 'controller.pagination.desc' },
  { k: 'rotate', descKey: 'controller.rotate.desc' },
  { k: 'rotateLeft', descKey: 'controller.rotateLeft.desc' },
  { k: 'rotateRight', descKey: 'controller.rotateRight.desc' },
  { k: 'zoom', descKey: 'controller.zoom.desc' },
  { k: 'download', descKey: 'controller.download.desc' },
  { k: 'close', descKey: 'controller.close.desc' },
  { k: 'flip', descKey: 'controller.flip.desc' },
  { k: 'flipLeft', descKey: 'controller.flipLeft.desc' },
  { k: 'flipRight', descKey: 'controller.flipRight.desc' },
  { k: 'backdrop', descKey: 'controller.backdrop.desc' },
  { k: 'color', descKey: 'controller.color.desc' },
  { k: 'placement', descKey: 'controller.placement.desc' },
  { k: 'render', descKey: 'controller.render.desc' },
]

const CONTROLLER_RENDER_ROWS: { k: string; type: string }[] = [
  { k: 'state', type: 'ControllerRenderState' },
  { k: 'state.show', type: 'boolean' },
  { k: 'state.zoom', type: 'boolean' },
  { k: 'state.page', type: 'number' },
  { k: 'state.total', type: 'number' },
  { k: 'state.canZoom', type: 'boolean' },
  { k: 'state.canPrev', type: 'boolean' },
  { k: 'state.canNext', type: 'boolean' },
  { k: 'state.canDownload', type: 'boolean' },
  { k: 'state.preset', type: "'desktop' | 'mobile'" },
  { k: 'state.placement', type: 'ControllerPlacement' },
  { k: 'state.current', type: 'Set | undefined' },
  { k: 'actions', type: 'ControllerRenderActions' },
  { k: 'actions.close', type: '() => void' },
  { k: 'actions.zoom', type: '() => void' },
  { k: 'actions.rotateLeft', type: '() => void' },
  { k: 'actions.rotateRight', type: '() => void' },
  { k: 'actions.prev', type: '() => void' },
  { k: 'actions.next', type: '() => void' },
  { k: 'actions.toPage', type: '(page: number) => void' },
  { k: 'actions.download', type: '() => void' },
  { k: 'slots', type: 'ControllerRenderSlots' },
  { k: 'slots.Toolbar', type: 'ReactNode' },
  { k: 'slots.Pagination', type: 'ReactNode' },
  { k: 'slots.FlipLeft', type: 'ReactNode' },
  { k: 'slots.FlipRight', type: 'ReactNode' },
  { k: 'return', type: 'ReactNode' },
]

const HOTKEY_KEYS: { k: string; descKey: I18nKey }[] = [
  { k: 'close', descKey: 'hotkey.close.desc' },
  { k: 'zoom', descKey: 'hotkey.zoom.desc' },
  { k: 'flip', descKey: 'hotkey.flip.desc' },
  { k: 'flipLeft', descKey: 'hotkey.flipLeft.desc' },
  { k: 'flipRight', descKey: 'hotkey.flipRight.desc' },
  { k: 'rotate', descKey: 'hotkey.rotate.desc' },
  { k: 'rotateLeft', descKey: 'hotkey.rotateLeft.desc' },
  { k: 'rotateRight', descKey: 'hotkey.rotateRight.desc' },
  { k: 'download', descKey: 'hotkey.download.desc' },
]

const ANIMATE_KEYS: { k: string; type: string; descKey: I18nKey }[] = [
  { k: 'browsing', type: 'boolean', descKey: 'animate.browsing.desc' },
  { k: 'flip', type: "'fade' | 'crossFade' | 'swipe' | 'zoom' | 'none'", descKey: 'animate.flip.desc' },
  { k: 'cover', type: 'boolean | AnimateCoverOptions', descKey: 'animate.cover.desc' },
  { k: 'cover.objectFit', type: 'boolean', descKey: 'animate.cover.objectFit.desc' },
  { k: 'cover.clip', type: 'boolean', descKey: 'animate.cover.clip.desc' },
  { k: 'cover.radius', type: 'boolean', descKey: 'animate.cover.radius.desc' },
]

const GESTURE_KEYS: { k: string; type: string; descKey: I18nKey }[] = [
  { k: 'swipe', type: 'boolean | GestureSwipeOptions', descKey: 'gesture.swipe.desc' },
  { k: 'dragExit', type: 'boolean | GestureDragExitOptions', descKey: 'gesture.dragExit.desc' },
  { k: 'wheelZoom', type: 'boolean | GestureWheelZoomOptions', descKey: 'gesture.wheelZoom.desc' },
  { k: 'pinchZoom', type: 'boolean | GesturePinchZoomOptions', descKey: 'gesture.pinchZoom.desc' },
  { k: 'doubleTapZoom', type: 'boolean | GestureDoubleTapZoomOptions', descKey: 'gesture.doubleTapZoom.desc' },
  { k: 'touchAction', type: "'managed' | 'auto' | 'manipulation' | 'none'", descKey: 'gesture.touchAction.desc' },
  { k: 'swipe.threshold', type: 'number', descKey: 'gesture.threshold.desc' },
  { k: 'swipe.velocity', type: 'number', descKey: 'gesture.velocity.desc' },
  { k: 'swipe.axisLock', type: 'number', descKey: 'gesture.axisLock.desc' },
  { k: 'swipe.resistance', type: 'number', descKey: 'gesture.resistance.desc' },
  { k: 'dragExit.threshold', type: 'number', descKey: 'gesture.threshold.desc' },
  { k: 'dragExit.velocity', type: 'number', descKey: 'gesture.velocity.desc' },
  { k: 'dragExit.axisLock', type: 'number', descKey: 'gesture.axisLock.desc' },
  { k: 'dragExit.opacity', type: 'boolean', descKey: 'gesture.opacity.desc' },
  { k: 'wheelZoom.step', type: 'number', descKey: 'gesture.wheelZoom.step.desc' },
  { k: 'wheelZoom.smooth', type: 'boolean', descKey: 'gesture.wheelZoom.smooth.desc' },
  { k: 'wheelZoom.minScale', type: "'fit' | number", descKey: 'gesture.wheelZoom.minScale.desc' },
  { k: 'wheelZoom.maxScale', type: 'number', descKey: 'gesture.wheelZoom.maxScale.desc' },
  { k: 'wheelZoom.center', type: "'pointer' | 'viewport'", descKey: 'gesture.wheelZoom.center.desc' },
  { k: 'wheelZoom.reverse', type: 'boolean', descKey: 'gesture.wheelZoom.reverse.desc' },
  { k: 'wheelZoom.exitGuardDuration', type: 'number', descKey: 'gesture.wheelZoom.exitGuardDuration.desc' },
  { k: 'pinchZoom.minScale', type: "'fit' | number", descKey: 'gesture.pinchZoom.minScale.desc' },
  { k: 'pinchZoom.maxScale', type: 'number', descKey: 'gesture.pinchZoom.maxScale.desc' },
  { k: 'pinchZoom.resetBelowFit', type: 'boolean', descKey: 'gesture.pinchZoom.resetBelowFit.desc' },
  { k: 'pinchZoom.center', type: "'gesture' | 'viewport'", descKey: 'gesture.pinchZoom.center.desc' },
  { k: 'doubleTapZoom.scale', type: 'number', descKey: 'gesture.doubleTapZoom.scale.desc' },
  { k: 'doubleTapZoom.minScale', type: "'fit' | number", descKey: 'gesture.doubleTapZoom.minScale.desc' },
  { k: 'doubleTapZoom.maxScale', type: 'number', descKey: 'gesture.doubleTapZoom.maxScale.desc' },
  { k: 'doubleTapZoom.center', type: "'tap' | 'viewport'", descKey: 'gesture.doubleTapZoom.center.desc' },
  { k: 'doubleTapZoom.interval', type: 'number', descKey: 'gesture.doubleTapZoom.interval.desc' },
  { k: 'doubleTapZoom.distance', type: 'number', descKey: 'gesture.doubleTapZoom.distance.desc' },
]

const SET_FIELDS: { k: string; type: string; required?: boolean; descKey: I18nKey }[] = [
  { k: 'src', type: 'string', required: true, descKey: 'set.src.desc' },
  { k: 'alt', type: 'string', descKey: 'set.alt.desc' },
  { k: 'caption', type: "string | { text, style?, className? }", descKey: 'set.caption.desc' },
  { k: 'className', type: 'string', descKey: 'set.className.desc' },
  { k: 'style', type: 'CSSStyleDeclaration', descKey: 'set.style.desc' },
]

type PresetRow = { path: string; label: I18nKey }
const PRESET_ROWS: PresetRow[] = [
  { path: 'controller.pagination', label: 'controller.pagination' },
  { path: 'controller.rotate', label: 'controller.rotate' },
  { path: 'controller.zoom', label: 'controller.zoom' },
  { path: 'controller.download', label: 'controller.download' },
  { path: 'controller.close', label: 'controller.close' },
  { path: 'controller.flip', label: 'controller.flip' },
  { path: 'controller.placement', label: 'controller.placement' },
  { path: 'hotKey.close', label: 'hotkey.close' },
  { path: 'hotKey.zoom', label: 'hotkey.zoom' },
  { path: 'hotKey.flip', label: 'hotkey.flip' },
  { path: 'hotKey.rotate', label: 'hotkey.rotate' },
  { path: 'hotKey.download', label: 'hotkey.download' },
  { path: 'animate.browsing', label: 'animate.browsing.desc' },
  { path: 'animate.flip', label: 'animate.flip.desc' },
  { path: 'animate.cover', label: 'animate.cover.desc' },
  { path: 'gesture.swipe', label: 'gesture.swipe' },
  { path: 'gesture.dragExit', label: 'gesture.dragExit' },
  { path: 'gesture.wheelZoom', label: 'gesture.wheelZoom' },
  { path: 'gesture.pinchZoom', label: 'gesture.pinchZoom' },
  { path: 'gesture.doubleTapZoom', label: 'gesture.doubleTapZoom' },
  { path: 'gesture.touchAction', label: 'gesture.touchAction' },
]

function readPresetValue (preset: 'desktop' | 'mobile', path: string): unknown {
  const [group, key] = path.split('.') as ['controller' | 'hotKey' | 'animate' | 'gesture', string]
  const bucket = defPreset[preset][group] as Record<string, unknown>
  return bucket[key]
}

function PresetCell ({ value }: { value: unknown }) {
  const display = typeof value === 'string' ? `'${value}'` : typeof value === 'object' && value !== null ? '{…}' : String(value)
  return <code className="font-mono text-xs">{display}</code>
}

function PresetDetail () {
  const { t } = useT()
  return (
    <>
      <p className="text-sm text-muted-foreground">
        {t('docs.section.props.preset.intro')}
      </p>
      <div className="my-6 overflow-x-auto rounded-lg border border-border">
        <table className="min-w-[720px] w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 font-medium">{t('docs.section.props.preset.subParamHeader')}</th>
              <th className="px-4 py-2.5 font-medium">{t('docs.section.props.preset.desktopHeader')}</th>
              <th className="px-4 py-2.5 font-medium">{t('docs.section.props.preset.mobileHeader')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {PRESET_ROWS.map(({ path, label }) => (
              <tr key={path}>
                <td className="px-4 py-2.5">
                  <span className="font-mono text-xs">{path}</span>
                  <span className="ml-2 text-muted-foreground">{t(label)}</span>
                </td>
                <td className="px-4 py-2.5">
                  <PresetCell value={readPresetValue('desktop', path)} />
                </td>
                <td className="px-4 py-2.5">
                  <PresetCell value={readPresetValue('mobile', path)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function SetDetail () {
  const { t } = useT()
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <TypeCaption name="Set" />
      <table className="min-w-[720px] w-full text-sm">
        <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 font-medium">{t('docs.section.props.controller.keyHeader')}</th>
            <th className="px-4 py-2.5 font-medium">{t('docs.section.props.animate.typeHeader')}</th>
            <th className="px-4 py-2.5 font-medium">{t('docs.section.props.controller.descHeader')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {SET_FIELDS.map(({ k, type, required, descKey }) => (
            <tr key={k}>
              <td className="px-4 py-2.5 font-mono align-top">
                {k}
                {required && <span className="ml-1.5 text-[9px] text-destructive">{t('common.required')}</span>}
              </td>
              <td className="px-4 py-2.5 align-top font-mono text-xs text-muted-foreground">{type}</td>
              <td className="px-4 py-2.5 text-muted-foreground">{t(descKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function WrapperScopeDetail () {
  const { t } = useT()
  return (
    <div className="my-6 rounded-lg border border-border bg-muted/25 p-4 text-sm">
      <p className="font-medium">{t('docs.section.props.wrapperScope.title')}</p>
      <p className="mt-2 text-muted-foreground">{t('docs.section.props.wrapperScope.intro')}</p>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted-foreground">
        <li>{t('docs.section.props.wrapperScope.data')}</li>
        <li>{t('docs.section.props.wrapperScope.config')}</li>
        <li>{t('docs.section.props.wrapperScope.lifecycle')}</li>
        <li>{t('docs.section.props.wrapperScope.controlled')}</li>
      </ul>
    </div>
  )
}

function TypeCaption ({ name }: { name: string }) {
  return (
    <div className="border-b border-border px-4 py-2 font-mono text-xs text-muted-foreground">
      {name}
    </div>
  )
}

function SubKeyTable ({ typeName, rows }: { typeName: string; rows: { k: string; descKey: I18nKey }[] }) {
  const { t } = useT()
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <TypeCaption name={typeName} />
      <table className="min-w-[720px] w-full text-sm">
        <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 font-medium">{t('docs.section.props.controller.keyHeader')}</th>
            <th className="px-4 py-2.5 font-medium">{t('docs.section.props.controller.descHeader')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map(({ k, descKey }) => (
            <tr key={k}>
              <td className="px-4 py-2.5 font-mono align-top">{k}</td>
              <td className="px-4 py-2.5 text-muted-foreground">{t(descKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TypeOnlyTable ({ typeName, rows }: { typeName: string; rows: { k: string; type: string }[] }) {
  const { t } = useT()
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <TypeCaption name={typeName} />
      <table className="min-w-[720px] w-full text-sm">
        <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 font-medium">{t('docs.section.props.controller.keyHeader')}</th>
            <th className="px-4 py-2.5 font-medium">{t('docs.section.props.animate.typeHeader')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map(({ k, type }) => (
            <tr key={k}>
              <td className="px-4 py-2.5 font-mono align-top">{k}</td>
              <td className="px-4 py-2.5 align-top font-mono text-xs text-muted-foreground">{type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ControllerDetail () {
  const { t } = useT()
  return (
    <>
      <SubKeyTable typeName="ControllerSet" rows={CONTROLLER_KEYS} />
      <p className="-mt-4 mb-6 text-xs text-muted-foreground">
        {t('docs.section.props.controller.umbrella')}
      </p>
      <h4 className="mt-4 mb-2 text-sm font-semibold">{t('docs.section.props.controller.renderTitle')}</h4>
      <p className="mb-2 text-xs text-muted-foreground">{t('docs.section.props.controller.renderIntro')}</p>
      <TypeOnlyTable typeName="ControllerRender" rows={CONTROLLER_RENDER_ROWS} />
      <CodeBlock code={`<Zmage
  src="photo.jpg"
  set={[
    { src: 'photo.jpg', alt: 'Cover' },
    { src: 'detail.jpg', alt: 'Detail' },
  ]}
  controller={{
    placement: 'bottom-center',
    render: ({ state, actions, slots }) => {
      if (!state.show) return null

      return (
        <div className="my-zmage-controls" data-placement={state.placement}>
          <button type="button" disabled={!state.canPrev} onClick={actions.prev}>
            Prev
          </button>
          <span>
            {state.page + 1} / {state.total}
          </span>
          <button type="button" disabled={!state.canNext} onClick={actions.next}>
            Next
          </button>
          <button type="button" disabled={!state.zoom && !state.canZoom} onClick={actions.zoom}>
            {state.zoom ? 'Fit' : 'Zoom'}
          </button>
          {state.canDownload && (
            <button type="button" onClick={actions.download}>
              Download
            </button>
          )}
          <button type="button" onClick={actions.close}>
            Close
          </button>

          {/* Reuse built-in pieces only where you want them. */}
          {slots.Pagination}
        </div>
      )
    },
  }}
/>`} language={'tsx' as any} />
    </>
  )
}

function HotKeyDetail () {
  const { t } = useT()
  return (
    <>
      <SubKeyTable typeName="HotKey" rows={HOTKEY_KEYS} />
      <p className="-mt-4 mb-3 text-xs text-muted-foreground">
        {t('docs.section.props.hotkey.umbrella')}
      </p>
      <h4 className="mt-4 mb-2 text-sm font-semibold">{t('docs.section.props.hotkey.customTitle')}</h4>
      <p className="mb-2 text-xs text-muted-foreground">{t('docs.section.props.hotkey.customIntro')}</p>
      <CodeBlock code={`// Enable Cmd/Ctrl+S to download (off by default — opt in)
<Zmage src="..." hotKey={{ download: true }} />

// Rebind rotate to A / D, keep download default
<Zmage src="..." hotKey={{ rotate: false, rotateLeft: 'KeyA', rotateRight: 'KeyD' }} />

// Add Q as a second close key alongside the default Escape
<Zmage src="..." hotKey={{ close: ['Escape', 'KeyQ'] }} />

// Custom download shortcut (Mod = ⌘ on macOS, Ctrl on Windows/Linux)
<Zmage src="..." hotKey={{ download: 'Mod+Shift+D' }} />`} language={'tsx' as any} />
      <p className="mt-3 mb-1 text-xs font-medium text-muted-foreground">{t('docs.section.props.hotkey.cheatsheetTitle')}</p>
      <ul className="mb-6 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
        <li>
          <span className="font-mono">'S'</span> → <span className="font-mono">'KeyS'</span>,{' '}
          <span className="font-mono">'1'</span> → <span className="font-mono">'Digit1'</span>{' '}
          ({t('docs.section.props.hotkey.cheatsheet.shorthand')})
        </li>
        <li>
          <span className="font-mono">'ArrowLeft' / 'ArrowRight' / 'ArrowUp' / 'ArrowDown'</span>{' '}
          ({t('docs.section.props.hotkey.cheatsheet.arrows')})
        </li>
        <li>
          <span className="font-mono">'BracketLeft' ([) / 'BracketRight' (]) / 'Comma' / 'Period' / 'Slash'</span>{' '}
          ({t('docs.section.props.hotkey.cheatsheet.punct')})
        </li>
        <li>
          <span className="font-mono">'Space' / 'Enter' / 'Tab' / 'Backspace' / 'Escape'</span>{' '}
          ({t('docs.section.props.hotkey.cheatsheet.whitespace')})
        </li>
        <li>
          <span className="font-mono">'Mod+' / 'Cmd+' / 'Ctrl+' / 'Shift+' / 'Alt+'</span>{' '}
          ({t('docs.section.props.hotkey.cheatsheet.modifier')})
        </li>
      </ul>
    </>
  )
}

function AnimateDetail () {
  const { t } = useT()
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <TypeCaption name="Animate" />
      <table className="min-w-[720px] w-full text-sm">
        <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 font-medium">{t('docs.section.props.controller.keyHeader')}</th>
            <th className="px-4 py-2.5 font-medium">{t('docs.section.props.animate.typeHeader')}</th>
            <th className="px-4 py-2.5 font-medium">{t('docs.section.props.controller.descHeader')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {ANIMATE_KEYS.map(({ k, type, descKey }) => (
            <tr key={k}>
              <td className="px-4 py-2.5 font-mono align-top">{k}</td>
              <td className="px-4 py-2.5 align-top font-mono text-xs text-muted-foreground">{type}</td>
              <td className="px-4 py-2.5 text-muted-foreground">{t(descKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function GestureDetail () {
  const { t } = useT()
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <TypeCaption name="GestureSet" />
      <table className="min-w-[720px] w-full text-sm">
        <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 font-medium">{t('docs.section.props.controller.keyHeader')}</th>
            <th className="px-4 py-2.5 font-medium">{t('docs.section.props.animate.typeHeader')}</th>
            <th className="px-4 py-2.5 font-medium">{t('docs.section.props.controller.descHeader')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {GESTURE_KEYS.map(({ k, type, descKey }) => (
            <tr key={k}>
              <td className="px-4 py-2.5 font-mono align-top">{k}</td>
              <td className="px-4 py-2.5 align-top font-mono text-xs text-muted-foreground">{type}</td>
              <td className="px-4 py-2.5 text-muted-foreground">{t(descKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Props () {
  const { t } = useT()
  return (
    <section className="mt-12 space-y-4">
      <Heading id="props">{t('docs.section.props.title')}</Heading>
      <p>{t('docs.section.props.intro')}</p>
      <WrapperScopeDetail />
      <Heading id="props-data" level={3}>{t('group.data')}</Heading>
      <ParamTable group="data" />
      <SetDetail />
      <Heading id="props-preset" level={3}>{t('group.preset')}</Heading>
      <ParamTable group="preset" />
      <Heading id="props-preset-bundles" level={3}>{t('docs.section.props.preset.title')}</Heading>
      <PresetDetail />
      <Heading id="props-interface" level={3}>{t('docs.section.props.interface')}</Heading>
      <ParamTable group="interface" />
      <Heading id="props-controller" level={3}>{t('group.controller')}</Heading>
      <ParamTable group="controller" />
      <ControllerDetail />
      <Heading id="props-hotkey" level={3}>{t('group.hotkey')}</Heading>
      <ParamTable group="hotkey" />
      <HotKeyDetail />
      <Heading id="props-animate" level={3}>{t('group.animate')}</Heading>
      <ParamTable group="animate" />
      <AnimateDetail />
      <Heading id="props-gesture" level={3}>{t('group.gesture')}</Heading>
      <ParamTable group="gesture" />
      <GestureDetail />
      <Heading id="props-lifecycle" level={3}>{t('group.lifecycle')}</Heading>
      <ParamTable group="lifecycle" />
      <Heading id="props-controlled" level={3}>{t('group.controlled')}</Heading>
      <ParamTable group="controlled" />
    </section>
  )
}
