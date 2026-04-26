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
  const safeProps = {
    // theme-aligned backdrop is a sensible default; user value (if any) wins via spread below
    backdrop: themedBackdrop,
    ...props,
    src: props.src || '/imgSet/childsDream/1.jpg',
    set: props.set?.length ? props.set : FALLBACK_SET,
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
