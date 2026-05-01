import * as React from 'react'
import { Check, Copy, ExternalLink, Maximize2, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { SegmentedChoice } from '@/components/ui/segmented-choice'
import { Textarea } from '@/components/ui/textarea'
import {
  AGENT_OPTIONS,
  DEPTH_OPTIONS,
  ENVIRONMENT_OPTIONS,
  IMAGE_SOURCE_OPTIONS,
  INTERACTION_OPTIONS,
  MODE_OPTIONS,
} from '@/aiPrompt/options'
import { buildAiPrompt } from '@/aiPrompt/buildPrompt'
import type { AiPromptConfig, PromptChoiceOption, PromptLabels } from '@/aiPrompt/types'
import type { I18nKey } from '@/i18n/dict'
import { useT } from '@/i18n/useT'
import { useCopyToClipboard } from '@/lib/useCopyToClipboard'
import { cn } from '@/lib/utils'

const DEFAULT_CONFIG: AiPromptConfig = {
  agent: 'auto',
  depth: 'auto',
  environment: 'auto',
  mode: 'auto',
  imageSource: 'auto',
  interaction: 'auto',
  projectDescription: '',
}

function translateOptions<T extends string> (
  options: readonly PromptChoiceOption<T>[],
  t: (key: I18nKey) => string,
) {
  return options.map(option => ({
    value: option.value,
    label: t(option.labelKey as I18nKey),
    description: option.descriptionKey ? t(option.descriptionKey as I18nKey) : undefined,
  }))
}

function promptLabels (t: (key: I18nKey) => string): PromptLabels {
  const fromOptions = <T extends string>(options: readonly PromptChoiceOption<T>[]) => Object.fromEntries(
    options.map(option => [option.value, t(option.labelKey as I18nKey)]),
  ) as Record<T, string>

  return {
    agent: fromOptions(AGENT_OPTIONS),
    depth: fromOptions(DEPTH_OPTIONS),
    environment: fromOptions(ENVIRONMENT_OPTIONS),
    mode: fromOptions(MODE_OPTIONS),
    imageSource: fromOptions(IMAGE_SOURCE_OPTIONS),
    interaction: fromOptions(INTERACTION_OPTIONS),
  }
}

export default function AISetup () {
  const { t } = useT()
  const [config, setConfig] = React.useState<AiPromptConfig>(DEFAULT_CONFIG)
  const [imageHidden, setImageHidden] = React.useState(false)
  const { copied, error, copy } = useCopyToClipboard()

  const labels = React.useMemo(() => promptLabels(t), [t])
  const prompt = React.useMemo(() => buildAiPrompt(config, labels), [config, labels])
  const fineTune = config.depth === 'fine'

  const setField = React.useCallback(<K extends keyof AiPromptConfig>(key: K, value: AiPromptConfig[K]) => {
    setConfig(current => ({ ...current, [key]: value }))
  }, [])

  const copyPrompt = React.useCallback(() => {
    void copy(prompt)
  }, [copy, prompt])

  return (
    <div className="grid min-h-[calc(100dvh-3.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.94fr)]">
      <section className="min-w-0 px-4 py-8 sm:px-8 lg:px-12 lg:py-10 xl:px-16">
        <div className="mx-auto flex h-full max-w-3xl min-w-0 flex-col">
          <div>
            <Badge variant="secondary" className="mb-5 gap-1.5 font-mono">
              <Sparkles className="h-3.5 w-3.5" />
              {t('ai.badge')}
            </Badge>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {t('ai.title')}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              {t('ai.subtitle')}
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <SegmentedChoice
              label={t('ai.field.agent')}
              value={config.agent}
              options={translateOptions(AGENT_OPTIONS, t)}
              onValueChange={(value) => setField('agent', value)}
            />

            <div>
              <SegmentedChoice
                label={t('ai.field.depth')}
                value={config.depth}
                options={translateOptions(DEPTH_OPTIONS, t)}
                onValueChange={(value) => setField('depth', value)}
              />
              <div
                className={cn(
                  'grid transition-[grid-template-rows,opacity,transform] duration-[220ms] ease-out motion-reduce:transition-none',
                  config.depth === 'auto' ? 'grid-rows-[1fr] opacity-100 translate-y-0' : 'pointer-events-none grid-rows-[0fr] opacity-0 -translate-y-1',
                )}
                aria-hidden={config.depth !== 'auto'}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="mt-2 rounded-md border border-border bg-muted/30 px-3 py-2 text-xs leading-5 text-muted-foreground">
                    {t('ai.autoTip')}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={cn(
                'grid transition-[grid-template-rows,opacity,transform] duration-[220ms] ease-out motion-reduce:transition-none',
                fineTune ? 'grid-rows-[1fr] opacity-100 translate-y-0' : 'pointer-events-none grid-rows-[0fr] opacity-0 translate-y-2',
              )}
              aria-hidden={!fineTune}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="grid gap-5 pt-1">
                  <SegmentedChoice
                    label={t('ai.field.environment')}
                    value={config.environment}
                    options={translateOptions(ENVIRONMENT_OPTIONS, t)}
                    onValueChange={(value) => setField('environment', value)}
                  />
                  <SegmentedChoice
                    label={t('ai.field.mode')}
                    value={config.mode}
                    options={translateOptions(MODE_OPTIONS, t)}
                    onValueChange={(value) => setField('mode', value)}
                  />
                  <SegmentedChoice
                    label={t('ai.field.imageSource')}
                    value={config.imageSource}
                    options={translateOptions(IMAGE_SOURCE_OPTIONS, t)}
                    onValueChange={(value) => setField('imageSource', value)}
                  />
                  <SegmentedChoice
                    label={t('ai.field.interaction')}
                    value={config.interaction}
                    options={translateOptions(INTERACTION_OPTIONS, t)}
                    onValueChange={(value) => setField('interaction', value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="ai-project-description">{t('ai.field.project')}</Label>
              <Textarea
                id="ai-project-description"
                value={config.projectDescription}
                onChange={(event) => setField('projectDescription', event.target.value)}
                placeholder={t('ai.project.placeholder')}
                className="mt-2 min-h-24 resize-y"
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-medium">{t('ai.preview.title')}</h2>
                <p className="text-xs text-muted-foreground">{t('ai.preview.subtitle')}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Maximize2 className="h-3.5 w-3.5" />
                    {t('ai.preview.expand')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[88dvh] max-w-4xl gap-0 overflow-hidden p-0">
                  <DialogHeader className="border-b border-border px-5 py-4 pr-12">
                    <DialogTitle>{t('ai.preview.title')}</DialogTitle>
                    <DialogDescription>{t('ai.preview.subtitle')}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 p-5">
                    <Textarea
                      readOnly
                      value={prompt}
                      className="h-[62dvh] resize-none border-0 bg-muted/30 font-mono text-xs leading-5 shadow-none focus-visible:ring-0 sm:text-sm"
                    />
                    <Button onClick={copyPrompt}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? t('ai.action.copied') : t('ai.preview.copy')}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Textarea
              readOnly
              value={prompt}
              aria-label={t('ai.preview.title')}
              className="h-28 resize-none bg-muted/25 font-mono text-xs leading-5 text-muted-foreground"
            />
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={copyPrompt} className="min-w-40">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? t('ai.action.copied') : t('ai.action.copy')}
              </Button>
              <Button variant="outline" asChild>
                <a href="/llms.txt" target="_blank" rel="noreferrer">
                  {t('ai.action.openLlms')}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
            {error && <p className="mt-3 text-sm text-destructive">{t('ai.copy.error')}</p>}
          </div>
        </div>
      </section>

      <aside className="relative hidden overflow-hidden border-l border-border bg-muted/30 lg:sticky lg:top-14 lg:block lg:h-[calc(100dvh-3.5rem)]">
        {!imageHidden && (
          <img
            src="/ai-onboarding/prompt-setup.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center brightness-[1.02] saturate-[0.95] transition-[filter] duration-300 dark:brightness-[0.68] dark:contrast-[0.95] dark:saturate-[0.72]"
            onError={() => setImageHidden(true)}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-background/0 dark:bg-background/10" />
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[calc(var(--spacing)*100)] bg-gradient-to-r from-background/20 to-transparent lg:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[calc(var(--spacing)*100)] bg-gradient-to-r from-transparent via-background/45 to-background dark:via-background/65 dark:to-background" />
      </aside>
    </div>
  )
}
