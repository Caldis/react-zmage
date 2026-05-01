import * as React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export type SegmentedChoiceOption<T extends string> = {
  value: T
  label: string
  description?: string
  disabled?: boolean
}

type SegmentedChoiceProps<T extends string> = {
  label: string
  description?: string
  value: T
  options: readonly SegmentedChoiceOption<T>[]
  onValueChange: (value: T) => void
  className?: string
  listClassName?: string
  compact?: boolean
}

export function SegmentedChoice<T extends string> ({
  label,
  description,
  value,
  options,
  onValueChange,
  className,
  listClassName,
  compact = false,
}: SegmentedChoiceProps<T>) {
  const choiceId = React.useId()

  return (
    <div className={cn('min-w-0', className)}>
      <div className="mb-2">
        <div id={choiceId} className="text-sm font-medium text-foreground">{label}</div>
        {description && <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>}
      </div>
      <Tabs value={value} onValueChange={(next) => onValueChange(next as T)}>
        <TabsList
          aria-labelledby={choiceId}
          className={cn(
            'h-auto max-w-full flex-wrap justify-start gap-1 bg-muted/40 p-1',
            compact ? 'text-xs' : 'text-sm',
            listClassName,
          )}
        >
          {options.map(option => (
            <TabsTrigger
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              title={option.description ?? option.label}
              className={cn(
                'min-w-0 max-w-full whitespace-normal text-left',
                compact ? 'px-2 py-1 text-xs' : 'px-3 py-1.5',
              )}
            >
              <span className="break-words leading-5">{option.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
