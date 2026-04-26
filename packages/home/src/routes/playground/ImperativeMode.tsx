import * as React from 'react'
import Zmage from 'react-zmage'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { CodeSnippet, buildPropsObject } from '@/playground/CodeSnippet'
import { EventLog } from '@/playground/EventLog'
import { useT } from '@/i18n/useT'
import { useThemedBackdrop } from '@/lib/themedBackdrop'

export default function ImperativeMode ({ values }: { values: Record<string, any> }) {
  const { t } = useT()
  const themedBackdrop = useThemedBackdrop()
  const destructorRef = React.useRef<(() => void) | null>(null)
  const onTrigger = () => {
    destructorRef.current?.()
    const props = buildPropsObject(values)
    if (!props.src && (!props.set || props.set.length === 0)) {
      props.src = '/imgSet/childsDream/1.jpg'
    }
    // user-provided backdrop wins; otherwise fall back to current site theme
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
