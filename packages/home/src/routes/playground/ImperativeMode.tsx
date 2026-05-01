import * as React from 'react'
import Zmage from 'react-zmage'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { buildLibProps } from '@/playground/state'
import { useT } from '@/i18n/useT'
import { useThemedBackdrop } from '@/lib/themedBackdrop'

export default function ImperativeMode ({
  values,
}: {
  values: Record<string, any>
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
    <div className="flex h-full min-h-[360px] items-center justify-center rounded-lg border border-border bg-card/30 p-12 lg:min-h-0">
      <Button size="lg" onClick={onTrigger}>
        <Play className="mr-2 h-4 w-4" /> {t('pg.preview.trigger')}
      </Button>
    </div>
  )
}
