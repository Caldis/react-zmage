import * as React from 'react'
import { Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type ExpandablePanelProps = {
  title: React.ReactNode
  description?: React.ReactNode
  expandLabel: string
  preview: React.ReactNode
  expanded: React.ReactNode
  footer?: React.ReactNode
  className?: string
  previewClassName?: string
  dialogContentClassName?: string
  dialogBodyClassName?: string
}

export function ExpandablePanel ({
  title,
  description,
  expandLabel,
  preview,
  expanded,
  footer,
  className,
  previewClassName,
  dialogContentClassName,
  dialogBodyClassName,
}: ExpandablePanelProps) {
  return (
    <section className={cn('min-w-0 rounded-lg border border-border bg-card/30', className)}>
      <div className="flex items-start justify-between gap-3 border-b border-border px-3 py-2.5">
        <div className="min-w-0">
          <h2 className="text-sm font-medium leading-5">{title}</h2>
          {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 shrink-0 gap-1.5 px-2.5 text-xs">
              <Maximize2 className="h-3.5 w-3.5" />
              {expandLabel}
            </Button>
          </DialogTrigger>
          <DialogContent className={cn('max-h-[88dvh] max-w-5xl gap-0 overflow-hidden p-0', dialogContentClassName)}>
            <DialogHeader className="border-b border-border px-5 py-4 pr-12">
              <DialogTitle>{title}</DialogTitle>
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
            <div className={cn('space-y-3 p-5', dialogBodyClassName)}>
              {expanded}
              {footer}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className={cn('p-3', previewClassName)}>
        {preview}
      </div>
    </section>
  )
}
