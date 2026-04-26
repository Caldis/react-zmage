import { Switch } from '@/components/ui/switch'

type Props = { events: string[]; value: ((...a: any[]) => void) | undefined; onChange: (v: any) => void }

export function CallbackControl ({ events, value, onChange }: Props) {
  const enabled = typeof value === 'function' && (value as any).__zmageLog === true
  return (
    <Switch
      checked={enabled}
      onCheckedChange={(c) => {
        if (c) {
          const name = events[0]
          const fn: any = (...args: any[]) => {
            window.dispatchEvent(new CustomEvent('zmage-pg-event', { detail: { name, args } }))
          }
          fn.__zmageLog = true
          fn.__name = name
          onChange(fn)
        } else {
          onChange(undefined)
        }
      }}
    />
  )
}
