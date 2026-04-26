import * as React from 'react'
import Zmage from 'react-zmage'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { CodeSnippet } from '@/playground/CodeSnippet'
import { EventLog } from '@/playground/EventLog'
import { useT } from '@/i18n/useT'
import { useThemedBackdrop } from '@/lib/themedBackdrop'

export default function ImperativeMode ({ values }: { values: Record<string, any> }) {
  const { t } = useT()
  const themedBackdrop = useThemedBackdrop()
  const destructorRef = React.useRef<(() => void) | null>(null)
  const onTrigger = () => {
    destructorRef.current?.()
    // WYSIWYG: 直接用面板里的 values (种子已经在 Playground 初始化时填好), 不再注入 FALLBACK
    const userHasSrc = !!values.src
    const userHasSet = Array.isArray(values.set) && values.set.length > 0
    const cover = userHasSrc ? values.src : (userHasSet ? values.set[0]?.src : '')
    const props: Record<string, any> = { ...values, src: cover }
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
