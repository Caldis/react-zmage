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
    <>
      <div className="my-6 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 font-medium">{t('docs.section.props.controller.keyHeader')}</th>
              <th className="px-4 py-2.5 font-medium">{t('docs.section.props.controller.descHeader')}</th>
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
      <p className="-mt-4 mb-6 text-xs text-muted-foreground">
        {t('docs.section.props.controller.umbrella')}
      </p>
    </>
  )
}

export function Props () {
  const { t } = useT()
  return (
    <section className="mt-12 space-y-4">
      <Heading id="props">{t('docs.section.props.title')}</Heading>
      <p>{t('docs.section.props.intro')}</p>
      <Heading id="props-data" level={3}>{t('group.data')}</Heading>
      <ParamTable group="data" />
      <Heading id="props-preset" level={3}>{t('group.preset')}</Heading>
      <ParamTable group="preset" />
      <Heading id="props-interface" level={3}>{t('docs.section.props.interface')}</Heading>
      <ParamTable group="interface" />
      <Heading id="props-controller" level={3}>{t('group.controller')}</Heading>
      <ParamTable group="controller" />
      <ControllerDetail />
      <Heading id="props-hotkey" level={3}>{t('group.hotkey')}</Heading>
      <ParamTable group="hotkey" />
      <Heading id="props-animate" level={3}>{t('group.animate')}</Heading>
      <ParamTable group="animate" />
      <Heading id="props-lifecycle" level={3}>{t('group.lifecycle')}</Heading>
      <ParamTable group="lifecycle" />
      <Heading id="props-controlled" level={3}>{t('group.controlled')}</Heading>
      <ParamTable group="controlled" />
    </section>
  )
}
