import * as React from 'react'
import { Highlight, themes, type Language } from 'prism-react-renderer'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/theme'
import { useCopyToClipboard } from '@/lib/useCopyToClipboard'

type Props = {
  code: string
  language?: Language
  showCopy?: boolean
  /** Rendered in the floating top-right cluster, to the left of the Copy button. */
  actions?: React.ReactNode
  className?: string
}

export function CodeBlock ({ code, language = 'tsx' as Language, showCopy = true, actions, className }: Props) {
  const { resolved } = useTheme()
  const { copied, copy } = useCopyToClipboard()
  const onCopy = () => {
    void copy(code)
  }
  const theme = resolved === 'dark' ? themes.vsDark : themes.vsLight
  return (
    <div className={cn('relative flex min-w-0 max-w-full flex-col overflow-hidden rounded-lg border border-border bg-muted/40', className)}>
      {(actions || showCopy) && (
        <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
          {actions}
          {showCopy && (
            <Button
              size="icon"
              variant="ghost"
              onClick={onCopy}
              className="h-7 w-7 opacity-70 hover:opacity-100"
              aria-label="Copy code"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
          )}
        </div>
      )}
      <Highlight code={code.trim()} language={language} theme={theme}>
        {({ className: cls, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(cls, 'code-block-scroll m-0 min-w-0 max-w-full flex-1 overflow-x-auto p-4 font-mono text-sm leading-6')}
            style={{ ...style, backgroundColor: 'transparent', background: 'transparent' }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, k) => <span key={k} {...getTokenProps({ token })} />)}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
