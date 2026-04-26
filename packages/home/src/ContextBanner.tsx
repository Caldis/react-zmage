import zmagePkg from 'react-zmage/package.json'
import * as React from 'react'

export function ContextBanner () {
  return (
    <div className="fixed bottom-3 right-3 z-[9999] rounded-md border border-border bg-background/80 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
      <span className="font-mono">react-zmage v{zmagePkg.version}</span>
      <span className="mx-2 opacity-50">·</span>
      <span>React {React.version}</span>
    </div>
  )
}
