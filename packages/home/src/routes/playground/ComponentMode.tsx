import Zmage from 'react-zmage'
import { CodeSnippet } from '@/playground/CodeSnippet'
import { useT } from '@/i18n/useT'
import { EventLog } from '@/playground/EventLog'
import { useThemedBackdrop } from '@/lib/themedBackdrop'

export default function ComponentMode ({ values }: { values: Record<string, any> }) {
  const { t } = useT()
  const themedBackdrop = useThemedBackdrop()
  // WYSIWYG: panel 完全是 source of truth; 种子值在 Playground.tsx 初始化时已经写入面板.
  // 这里只负责把 values 透给 Zmage, 必要时补 cover src (用户给了 set 但没给 src).
  const userHasSrc = !!values.src
  const userHasSet = Array.isArray(values.set) && values.set.length > 0
  const cover = userHasSrc ? values.src : (userHasSet ? values.set[0]?.src : '')
  const safeProps: Record<string, any> = {
    backdrop: themedBackdrop,
    ...values,
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
