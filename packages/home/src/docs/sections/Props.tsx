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
]

const GESTURE_KEYS: { k: string; type: string; descKey: I18nKey }[] = [
  { k: 'swipe', type: 'boolean | GestureSwipeOptions', descKey: 'gesture.swipe.desc' },
  { k: 'dragExit', type: 'boolean | GestureDragExitOptions', descKey: 'gesture.dragExit.desc' },
  { k: 'swipe.threshold', type: 'number', descKey: 'gesture.threshold.desc' },
  { k: 'swipe.velocity', type: 'number', descKey: 'gesture.velocity.desc' },
  { k: 'swipe.axisLock', type: 'number', descKey: 'gesture.axisLock.desc' },
  { k: 'swipe.resistance', type: 'number', descKey: 'gesture.resistance.desc' },
  { k: 'dragExit.threshold', type: 'number', descKey: 'gesture.threshold.desc' },
  { k: 'dragExit.velocity', type: 'number', descKey: 'gesture.velocity.desc' },
  { k: 'dragExit.axisLock', type: 'number', descKey: 'gesture.axisLock.desc' },
  { k: 'dragExit.opacity', type: 'boolean', descKey: 'gesture.opacity.desc' },
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
  { path: 'hotKey.close', label: 'hotkey.close' },
  { path: 'hotKey.zoom', label: 'hotkey.zoom' },
  { path: 'hotKey.flip', label: 'hotkey.flip' },
  { path: 'hotKey.rotate', label: 'hotkey.rotate' },
  { path: 'hotKey.download', label: 'hotkey.download' },
  { path: 'animate.browsing', label: 'animate.browsing.desc' },
  { path: 'animate.flip', label: 'animate.flip.desc' },
  { path: 'gesture.swipe', label: 'gesture.swipe' },
  { path: 'gesture.dragExit', label: 'gesture.dragExit' },
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
      <div className="my-6 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
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
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      <TypeCaption name="Set" />
      <table className="w-full text-sm">
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
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      <TypeCaption name={typeName} />
      <table className="w-full text-sm">
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

function ControllerDetail () {
  const { t } = useT()
  return (
    <>
      <SubKeyTable typeName="ControllerSet" rows={CONTROLLER_KEYS} />
      <p className="-mt-4 mb-6 text-xs text-muted-foreground">
        {t('docs.section.props.controller.umbrella')}
      </p>
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
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      <TypeCaption name="Animate" />
      <table className="w-full text-sm">
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
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      <TypeCaption name="GestureSet" />
      <table className="w-full text-sm">
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
      <Heading id="props-set" level={3}>{t('docs.section.props.set.title')}</Heading>
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
