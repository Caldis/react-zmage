import { Heading } from '@/docs/Heading'
import { ParamTable } from '@/docs/ParamTable'
import { useT } from '@/i18n/useT'
import type { I18nKey } from '@/i18n/dict'

const CONTROLLER_KEYS: { k: string; labelKey: I18nKey }[] = [
  { k: 'pagination', labelKey: 'controller.pagination' },
  { k: 'rotate', labelKey: 'controller.rotate' },
  { k: 'rotateLeft', labelKey: 'controller.rotateLeft' },
  { k: 'rotateRight', labelKey: 'controller.rotateRight' },
  { k: 'zoom', labelKey: 'controller.zoom' },
  { k: 'download', labelKey: 'controller.download' },
  { k: 'close', labelKey: 'controller.close' },
  { k: 'flip', labelKey: 'controller.flip' },
  { k: 'flipLeft', labelKey: 'controller.flipLeft' },
  { k: 'flipRight', labelKey: 'controller.flipRight' },
]

function ControllerDetail () {
  const { t } = useT()
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 font-medium">Key</th>
            <th className="px-4 py-2.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {CONTROLLER_KEYS.map(({ k, labelKey }) => (
            <tr key={k}>
              <td className="px-4 py-2.5 font-mono">{k}</td>
              <td className="px-4 py-2.5 text-muted-foreground">{t(labelKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Props () {
  return (
    <section className="mt-12 space-y-4">
      <Heading id="props">Props</Heading>
      <p>Every prop on <code className="rounded bg-muted px-1 font-mono text-xs">BaseType</code> can be passed in any of the three modes.</p>
      <Heading id="props-data" level={3}>Data</Heading>
      <ParamTable group="data" />
      <Heading id="props-preset" level={3}>Preset</Heading>
      <ParamTable group="preset" />
      <Heading id="props-interface" level={3}>Interface &amp; interaction</Heading>
      <ParamTable group="interface" />
      <Heading id="props-controller" level={3}>Controller</Heading>
      <ParamTable group="controller" />
      <ControllerDetail />
      <Heading id="props-hotkey" level={3}>HotKey</Heading>
      <ParamTable group="hotkey" />
      <Heading id="props-animate" level={3}>Animate</Heading>
      <ParamTable group="animate" />
      <Heading id="props-lifecycle" level={3}>Lifecycle</Heading>
      <ParamTable group="lifecycle" />
      <Heading id="props-controlled" level={3}>Controlled</Heading>
      <ParamTable group="controlled" />
    </section>
  )
}
