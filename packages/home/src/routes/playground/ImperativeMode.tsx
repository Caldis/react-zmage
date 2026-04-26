import * as React from 'react'
import Zmage from 'react-zmage'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { CodeSnippet, buildPropsObject } from '@/playground/CodeSnippet'
import { EventLog } from '@/playground/EventLog'
import { useT } from '@/i18n/useT'
import { useThemedBackdrop } from '@/lib/themedBackdrop'

const FALLBACK_SET = [
  { src: '/imgSet/childsDream/1.jpg', alt: '童夢 · ONE' },
  { src: '/imgSet/childsDream/2.jpg', alt: '童夢 · TWO' },
]

export default function ImperativeMode ({ values }: { values: Record<string, any> }) {
  const { t } = useT()
  const themedBackdrop = useThemedBackdrop()
  const destructorRef = React.useRef<(() => void) | null>(null)
  const onTrigger = () => {
    destructorRef.current?.()
    const props = buildPropsObject(values)
    // WYSIWYG: 跟 ComponentMode 同步 — 用户填什么就触发什么; 全空时给 demo gallery
    const userHasSrc = !!props.src
    const userHasSet = Array.isArray(props.set) && props.set.length > 0
    if (!userHasSrc && !userHasSet) {
      props.src = '/imgSet/childsDream/1.jpg'
      props.set = FALLBACK_SET
    } else if (userHasSet && !userHasSrc) {
      props.src = (props.set as { src: string }[])[0]?.src ?? ''
    }
    if (!props.backdrop) props.backdrop = themedBackdrop
    destructorRef.current = (Zmage as any).browsing(props)
  }
  React.useEffect(() => () => { destructorRef.current?.() }, [])

  return (
    <div className="space-y-6">
      <CodeSnippet values={values} mode="imperative" />
      <div className="flex justify-center rounded-lg border border-border bg-card/30 p-12">
        <Button size="lg" onClick={onTrigger}>
          <Play className="mr-2 h-4 w-4" /> {t('pg.preview.trigger')}
        </Button>
      </div>
      <EventLog />
    </div>
  )
}
