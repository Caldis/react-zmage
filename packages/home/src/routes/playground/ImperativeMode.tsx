import * as React from 'react'
import Zmage from 'react-zmage'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { CodeSnippet } from '@/playground/CodeSnippet'
import { buildLibProps } from '@/playground/state'
import { EventLog } from '@/playground/EventLog'
import { useT } from '@/i18n/useT'
import { useThemedBackdrop } from '@/lib/themedBackdrop'

export default function ImperativeMode ({
  values,
  touched,
  hideDefaults,
  onHideDefaultsChange,
}: {
  values: Record<string, any>
  touched: ReadonlySet<string>
  hideDefaults: boolean
  onHideDefaultsChange: (v: boolean) => void
}) {
  const { t } = useT()
  const themedBackdrop = useThemedBackdrop()
  const destructorRef = React.useRef<(() => void) | null>(null)
  const onTrigger = () => {
    destructorRef.current?.()
    const props = buildLibProps(values)
    const userHasSrc = !!props.src
    const userHasSet = Array.isArray(props.set) && props.set.length > 0
    const cover = userHasSrc ? props.src : (userHasSet ? props.set[0]?.src : '')
    props.src = cover
    if (!props.backdrop) props.backdrop = themedBackdrop
    destructorRef.current = (Zmage as any).browsing(props)
  }
  React.useEffect(() => () => { destructorRef.current?.() }, [])

  return (
    <div className="space-y-6">
      <CodeSnippet
        values={values}
        touched={touched}
        hideDefaults={hideDefaults}
        onHideDefaultsChange={onHideDefaultsChange}
        mode="imperative"
      />
      <div className="flex justify-center rounded-lg border border-border bg-card/30 p-12">
        <Button size="lg" onClick={onTrigger}>
          <Play className="mr-2 h-4 w-4" /> {t('pg.preview.trigger')}
        </Button>
      </div>
      <EventLog />
    </div>
  )
}
