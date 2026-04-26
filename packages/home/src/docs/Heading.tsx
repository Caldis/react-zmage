import * as React from 'react'
import { Link as LinkIcon } from 'lucide-react'

type Props = { id: string; level?: 2 | 3; children: React.ReactNode }

export function Heading ({ id, level = 2, children }: Props) {
  const Tag = (`h${level}` as any) as React.ElementType
  return (
    <Tag id={id} className="group scroll-mt-24 flex items-baseline gap-2">
      <span>{children}</span>
      <a
        href={`#${id}`}
        aria-label="Anchor"
        className="opacity-0 transition-opacity group-hover:opacity-60 hover:opacity-100"
        onClick={(e) => {
          e.preventDefault()
          window.history.replaceState(null, '', `#${id}`)
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
      >
        <LinkIcon className="h-3.5 w-3.5" />
      </a>
    </Tag>
  )
}
