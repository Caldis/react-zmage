import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useT } from '@/i18n/useT'
import { cn } from '@/lib/utils'

export type PresetScope = 'desktop' | 'mobile'

const SCOPE_COPY = {
  desktop: {
    short: 'common.presetScope.desktop.short',
    title: 'common.presetScope.desktop.title',
    desc: 'common.presetScope.desktop.desc',
  },
  mobile: {
    short: 'common.presetScope.mobile.short',
    title: 'common.presetScope.mobile.title',
    desc: 'common.presetScope.mobile.desc',
  },
} as const

const SCOPE_CLASS: Record<PresetScope, string> = {
  desktop: 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
  mobile: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
}

export function PresetScopeBadge ({ scope, className }: { scope: PresetScope; className?: string }) {
  const { t } = useT()
  const copy = SCOPE_COPY[scope]

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex cursor-help">
          <Badge
            variant="outline"
            aria-label={t(copy.title)}
            className={cn('h-4 rounded px-1 text-[9px] leading-none', SCOPE_CLASS[scope], className)}
          >
            {t(copy.short)}
          </Badge>
        </span>
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-[260px] text-xs">
        <div className="font-medium">{t(copy.title)}</div>
        <div className="mt-0.5 text-primary-foreground/80">{t(copy.desc)}</div>
      </TooltipContent>
    </Tooltip>
  )
}
