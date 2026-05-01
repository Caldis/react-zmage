import Zmage from 'react-zmage'
import { buildLibProps } from '@/playground/state'
import { useT } from '@/i18n/useT'
import { useThemedBackdrop } from '@/lib/themedBackdrop'

export default function ComponentMode ({
  values,
}: {
  values: Record<string, any>
}) {
  const { t } = useT()
  const themedBackdrop = useThemedBackdrop()
  // livedemo 用不带 touched 的 buildLibProps, 永远剥 schema 默认空对象 (controller={}/hotKey={}/animate={})
  // 否则会覆盖 lib defPreset 让 modal 退化成无控件状态.
  const props = buildLibProps(values)
  const userHasSrc = !!props.src
  const userHasSet = Array.isArray(props.set) && props.set.length > 0
  const cover = userHasSrc ? props.src : (userHasSet ? props.set[0]?.src : '')
  const safeProps: Record<string, any> = {
    backdrop: themedBackdrop,
    ...props,
    src: cover,
  }
  return (
    <div className="flex h-full min-h-[360px] flex-col items-center justify-center rounded-lg border border-border bg-card/30 p-6 lg:min-h-0">
      <div className="mx-auto w-full max-w-md">
        <Zmage {...(safeProps as any)} className="w-full rounded-md" />
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">{t('pg.preview.tip')}</p>
    </div>
  )
}
