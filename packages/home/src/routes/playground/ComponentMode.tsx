import Zmage from 'react-zmage'
import { CodeSnippet, buildRuntimeProps } from '@/playground/CodeSnippet'
import { useT } from '@/i18n/useT'
import { EventLog } from '@/playground/EventLog'
import { useThemedBackdrop } from '@/lib/themedBackdrop'

export default function ComponentMode ({ values }: { values: Record<string, any> }) {
  const { t } = useT()
  const themedBackdrop = useThemedBackdrop()
  // WYSIWYG: panel = source of truth. buildRuntimeProps 只剥 schema 默认空值
  // (避免 controller={}/hotKey={}/animate={} 覆盖 lib defPreset), 但保留种子的 src/alt/set.
  const props = buildRuntimeProps(values)
  const userHasSrc = !!props.src
  const userHasSet = Array.isArray(props.set) && props.set.length > 0
  const cover = userHasSrc ? props.src : (userHasSet ? props.set[0]?.src : '')
  const safeProps: Record<string, any> = {
    backdrop: themedBackdrop,
    ...props,
    src: cover,
  }
  return (
    <div className="space-y-6">
      <CodeSnippet values={values} mode="component" />
      <div className="rounded-lg border border-border bg-card/30 p-6">
        <div className="mx-auto max-w-md">
          <Zmage {...(safeProps as any)} className="w-full rounded-md" />
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">{t('pg.preview.tip')}</p>
      </div>
      <EventLog />
    </div>
  )
}
