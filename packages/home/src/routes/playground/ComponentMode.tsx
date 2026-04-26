import Zmage from 'react-zmage'
import { CodeSnippet, buildPropsObject } from '@/playground/CodeSnippet'
import { useT } from '@/i18n/useT'
import { EventLog } from '@/playground/EventLog'
import { useThemedBackdrop } from '@/lib/themedBackdrop'

const FALLBACK_SET = [
  { src: '/imgSet/childsDream/1.jpg', alt: '童夢 · ONE' },
  { src: '/imgSet/childsDream/2.jpg', alt: '童夢 · TWO' },
]

export default function ComponentMode ({ values }: { values: Record<string, any> }) {
  const { t } = useT()
  const themedBackdrop = useThemedBackdrop()
  const props = buildPropsObject(values)
  // WYSIWYG: panel says X → preview shows X → click opens X. Don't inject FALLBACK_SET when
  // user已经提供了 src 或 set (那会导致点击放大时模态用的是 fallback, 与封面不符).
  const userHasSrc = !!props.src
  const userHasSet = Array.isArray(props.set) && props.set.length > 0
  const safeProps: Record<string, any> = { backdrop: themedBackdrop, ...props }
  if (userHasSet && !userHasSrc) {
    // cover should match set[0] so封面不空白
    safeProps.src = (props.set as { src: string }[])[0]?.src ?? ''
  } else if (!userHasSrc && !userHasSet) {
    // empty state — 展示 demo gallery (cover + modal 都用它)
    safeProps.src = '/imgSet/childsDream/1.jpg'
    safeProps.set = FALLBACK_SET
  }
  // userHasSrc 但 !userHasSet 时, 让 lib 自动构造单图 set=[{src, alt, txt}], 我们什么都不做
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
