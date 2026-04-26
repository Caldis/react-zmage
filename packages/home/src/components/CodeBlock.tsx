import * as React from 'react'
import { Highlight, themes, type Language } from 'prism-react-renderer'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/theme'

type Props = {
  code: string
  language?: Language
  showCopy?: boolean
  className?: string
}

export function CodeBlock ({ code, language = 'tsx' as Language, showCopy = true, className }: Props) {
  const { resolved } = useTheme()
  const [copied, setCopied] = React.useState(false)
  const onCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  const theme = resolved === 'dark' ? themes.vsDark : themes.vsLight
  return (
    <div className={cn('relative rounded-lg border border-border bg-muted/40 overflow-hidden flex flex-col', className)}>
      {showCopy && (
        <Button
          size="icon"
          variant="ghost"
          onClick={onCopy}
          className="absolute right-2 top-2 z-10 h-7 w-7 opacity-70 hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      )}
      <Highlight code={code.trim()} language={language} theme={theme}>
        {({ className: cls, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(cls, 'code-block-scroll flex-1 overflow-x-auto p-4 text-sm font-mono leading-6 m-0')}
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
