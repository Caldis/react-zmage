import * as React from 'react'

type CopyState = {
  copied: boolean
  error: string
  copy: (text: string) => Promise<boolean>
  reset: () => void
}

export function useCopyToClipboard (resetDelay = 1500): CopyState {
  const [copied, setCopied] = React.useState(false)
  const [error, setError] = React.useState('')
  const timer = React.useRef<number | undefined>(undefined)

  const clearTimer = React.useCallback(() => {
    if (timer.current !== undefined) {
      window.clearTimeout(timer.current)
      timer.current = undefined
    }
  }, [])

  const reset = React.useCallback(() => {
    clearTimer()
    setCopied(false)
    setError('')
  }, [clearTimer])

  const copy = React.useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setError('')
      clearTimer()
      timer.current = window.setTimeout(() => setCopied(false), resetDelay)
      return true
    } catch (err) {
      setCopied(false)
      setError(err instanceof Error ? err.message : 'Clipboard write failed')
      return false
    }
  }, [clearTimer, resetDelay])

  React.useEffect(() => clearTimer, [clearTimer])

  return { copied, error, copy, reset }
}
