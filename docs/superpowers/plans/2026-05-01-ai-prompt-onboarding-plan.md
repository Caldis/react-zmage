# AI Prompt Onboarding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/ai` AI Prompt Setup page, reuse existing home UI primitives, keep the homepage quick prompt, generate a gpt-image-2 illustration, and fix the stale onboarding rubric prop list.

**Architecture:** Put prompt semantics in `packages/home/src/aiPrompt/*` as pure data and a pure builder. Pass translated option labels into the builder so copied prompts contain user-facing labels, not raw internal enum values. Put reusable UI in `packages/home/src/components/ui/*` and `packages/home/src/lib/useCopyToClipboard.ts`. Keep `AISetup.tsx` focused on page state, layout, and composition.

**Tech Stack:** React 19, Vite, React Router, Radix Tabs, Tailwind CSS v4 utilities, lucide-react icons, prism-react-renderer, static public assets, node:test for existing llms-eval checks.

---

## File Structure

- `packages/home/src/lib/useCopyToClipboard.ts`: shared clipboard hook with copied/error state and timer cleanup.
- `packages/home/src/components/ui/segmented-choice.tsx`: shared Radix Tabs-backed segmented choice field.
- `packages/home/src/components/ui/textarea.tsx`: shared textarea primitive matching the existing Input vocabulary.
- `packages/home/src/aiPrompt/types.ts`: value unions and `AiPromptConfig`.
- `packages/home/src/aiPrompt/options.ts`: module-level option definitions.
- `packages/home/src/aiPrompt/buildPrompt.ts`: pure prompt builder and dynamic guidance helpers.
- `packages/home/src/aiPrompt/buildPrompt.test.ts`: focused Vitest coverage for Auto labels and fine-tune guidance.
- `packages/home/package.json`: add a home-local `test` script and Vitest dev dependency if needed.
- `packages/home/src/routes/AISetup.tsx`: `/ai` page layout and local state.
- `packages/home/src/App.tsx`: route registration.
- `packages/home/src/components/TopNav.tsx`: top nav and mobile nav link.
- `packages/home/src/routes/Home.tsx`: replace current AI directive with quick copy plus `/ai` link, and consume shared copy hook.
- `packages/home/src/components/CodeBlock.tsx`: consume shared copy hook without changing visible behavior.
- `packages/home/src/i18n/*.ts`: add nav, page, option, action, and error copy in all seven locales.
- `packages/home/public/ai-onboarding/prompt-setup.png`: generated gpt-image-2 illustration.
- `packages/llms-eval/agent-onboarding/rubric.mjs`: remove stale `txt` prop from `VALID_PROPS`.

## Review Corrections Applied

- Do not hide the fine-tune region with `hidden`; collapse it with animatable grid rows, opacity, and transform.
- Do not put only `max-h` on `CodeBlock`; wrap prompt preview in a vertical scroll container.
- Do not write raw enum values such as `next-rsc` or `wrapper-caption` into the generated prompt; pass translated labels to `buildAiPrompt`.
- Keep a mobile-friendly collapsed preview control so the long prompt does not dominate narrow screens.
- Treat `gpt-image-2` generation as a real asset step, and validate that the PNG exists and is non-trivial before final build.
- Register `/ai` before the catch-all route.
- Keep `onError` once in the llms-eval valid prop set.

## Task 1: Shared UI Primitives And Copy Hook

**Files:**
- Create: `packages/home/src/lib/useCopyToClipboard.ts`
- Create: `packages/home/src/components/ui/segmented-choice.tsx`
- Create: `packages/home/src/components/ui/textarea.tsx`
- Modify: `packages/home/src/components/CodeBlock.tsx`
- Modify: `packages/home/src/routes/Home.tsx`

- [ ] **Step 1: Create the shared clipboard hook**

Create `packages/home/src/lib/useCopyToClipboard.ts`:

```ts
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
```

- [ ] **Step 2: Create the shared segmented choice field**

Create `packages/home/src/components/ui/segmented-choice.tsx`:

```tsx
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
  return (
    <div className={cn('min-w-0', className)}>
      <div className="mb-2">
        <div className="text-sm font-medium text-foreground">{label}</div>
        {description && <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>}
      </div>
      <Tabs value={value} onValueChange={(next) => onValueChange(next as T)}>
        <TabsList
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
              <span className="truncate">{option.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
```

- [ ] **Step 3: Create a shared textarea primitive**

Create `packages/home/src/components/ui/textarea.tsx`:

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'

export { Textarea }
```

- [ ] **Step 4: Update `CodeBlock` to use the shared hook**

In `packages/home/src/components/CodeBlock.tsx`, add:

```ts
import { useCopyToClipboard } from '@/lib/useCopyToClipboard'
```

Replace:

```tsx
const [copied, setCopied] = React.useState(false)
const onCopy = async () => {
  await navigator.clipboard.writeText(code)
  setCopied(true)
  setTimeout(() => setCopied(false), 1500)
}
```

with:

```tsx
const { copied, copy } = useCopyToClipboard()
const onCopy = () => {
  void copy(code)
}
```

- [ ] **Step 5: Update `Home.tsx` to use the shared hook**

In `packages/home/src/routes/Home.tsx`, remove the local `useCopyToClipboard` function and add:

```ts
import { useCopyToClipboard } from '@/lib/useCopyToClipboard'
```

Keep `NpmChip` and the AI copy action behavior unchanged.

- [ ] **Step 6: Run a focused build check**

Run:

```bash
pnpm --filter react-zmage-home run build
```

Expected: build passes, with `docs/index.html`, `docs/404.html`, and `docs/assets/*` refreshed by Vite if output hashes change.

## Task 2: Prompt Types, Options, And Builder

**Files:**
- Create: `packages/home/src/aiPrompt/types.ts`
- Create: `packages/home/src/aiPrompt/options.ts`
- Create: `packages/home/src/aiPrompt/buildPrompt.ts`
- Create: `packages/home/src/aiPrompt/buildPrompt.test.ts`
- Modify: `packages/home/package.json`

- [ ] **Step 1: Create setup types**

Create `packages/home/src/aiPrompt/types.ts`:

```ts
export type AgentTool = 'auto' | 'codex' | 'claude' | 'cursor' | 'devin' | 'other'
export type SetupDepth = 'auto' | 'fine'
export type ProjectEnvironment = 'auto' | 'vite' | 'next-rsc' | 'ssr' | 'cms-mdx' | 'event'
export type UsageMode = 'auto' | 'component' | 'imperative' | 'wrapper'
export type ImageSource = 'auto' | 'single' | 'set' | 'caption' | 'wrapper-caption'
export type InteractionProfile =
  | 'auto'
  | 'preset-auto'
  | 'desktop-tools'
  | 'mobile-gestures'
  | 'no-browsing-animation'
  | 'custom-controller'

export type AiPromptConfig = {
  agent: AgentTool
  depth: SetupDepth
  environment: ProjectEnvironment
  mode: UsageMode
  imageSource: ImageSource
  interaction: InteractionProfile
  projectDescription: string
}

export type PromptLabels = {
  agent: Record<AgentTool, string>
  depth: Record<SetupDepth, string>
  environment: Record<ProjectEnvironment, string>
  mode: Record<UsageMode, string>
  imageSource: Record<ImageSource, string>
  interaction: Record<InteractionProfile, string>
}

export type PromptChoiceOption<T extends string> = {
  value: T
  labelKey: string
  descriptionKey?: string
}
```

- [ ] **Step 2: Create option definitions**

Create `packages/home/src/aiPrompt/options.ts`:

```ts
import type {
  AgentTool,
  ImageSource,
  InteractionProfile,
  ProjectEnvironment,
  PromptChoiceOption,
  SetupDepth,
  UsageMode,
} from './types'

export const AGENT_OPTIONS: readonly PromptChoiceOption<AgentTool>[] = [
  { value: 'auto', labelKey: 'ai.option.auto', descriptionKey: 'ai.option.agent.auto.desc' },
  { value: 'codex', labelKey: 'ai.option.agent.codex' },
  { value: 'claude', labelKey: 'ai.option.agent.claude' },
  { value: 'cursor', labelKey: 'ai.option.agent.cursor' },
  { value: 'devin', labelKey: 'ai.option.agent.devin' },
  { value: 'other', labelKey: 'ai.option.other' },
]

export const DEPTH_OPTIONS: readonly PromptChoiceOption<SetupDepth>[] = [
  { value: 'auto', labelKey: 'ai.option.depth.auto', descriptionKey: 'ai.option.depth.auto.desc' },
  { value: 'fine', labelKey: 'ai.option.depth.fine', descriptionKey: 'ai.option.depth.fine.desc' },
]

export const ENVIRONMENT_OPTIONS: readonly PromptChoiceOption<ProjectEnvironment>[] = [
  { value: 'auto', labelKey: 'ai.option.auto' },
  { value: 'vite', labelKey: 'ai.option.env.vite' },
  { value: 'next-rsc', labelKey: 'ai.option.env.nextRsc' },
  { value: 'ssr', labelKey: 'ai.option.env.ssr' },
  { value: 'cms-mdx', labelKey: 'ai.option.env.cmsMdx' },
  { value: 'event', labelKey: 'ai.option.env.event' },
]

export const MODE_OPTIONS: readonly PromptChoiceOption<UsageMode>[] = [
  { value: 'auto', labelKey: 'ai.option.auto' },
  { value: 'component', labelKey: 'ai.option.mode.component' },
  { value: 'imperative', labelKey: 'ai.option.mode.imperative' },
  { value: 'wrapper', labelKey: 'ai.option.mode.wrapper' },
]

export const IMAGE_SOURCE_OPTIONS: readonly PromptChoiceOption<ImageSource>[] = [
  { value: 'auto', labelKey: 'ai.option.auto' },
  { value: 'single', labelKey: 'ai.option.image.single' },
  { value: 'set', labelKey: 'ai.option.image.set' },
  { value: 'caption', labelKey: 'ai.option.image.caption' },
  { value: 'wrapper-caption', labelKey: 'ai.option.image.wrapperCaption' },
]

export const INTERACTION_OPTIONS: readonly PromptChoiceOption<InteractionProfile>[] = [
  { value: 'auto', labelKey: 'ai.option.auto' },
  { value: 'preset-auto', labelKey: 'ai.option.interaction.presetAuto' },
  { value: 'desktop-tools', labelKey: 'ai.option.interaction.desktopTools' },
  { value: 'mobile-gestures', labelKey: 'ai.option.interaction.mobileGestures' },
  { value: 'no-browsing-animation', labelKey: 'ai.option.interaction.noBrowsingAnimation' },
  { value: 'custom-controller', labelKey: 'ai.option.interaction.customController' },
]
```

- [ ] **Step 3: Create the prompt builder**

Create `packages/home/src/aiPrompt/buildPrompt.ts`. The builder stays pure, but it receives translated labels from the route so prompt text matches the current UI language and does not leak internal enum values.

```ts
import type { AiPromptConfig, PromptLabels } from './types'

const CANONICAL_REFERENCE = 'https://zmage.caldis.me/llms.txt'

const displayChoice = <T extends string>(value: T, labels: Record<T, string>) => labels[value] ?? value
const projectDescription = (value: string) => value.trim() || '(Not provided)'

function modeInstructions (config: AiPromptConfig) {
  if (config.depth === 'auto' || config.mode === 'auto') {
    return [
      'Use Auto mode selection. Inspect the codebase first, then choose the integration path from real project evidence.',
      '',
      '- Component: use this when the app owns the image markup.',
      '- Imperative: use this when the viewer opens from a button, callback, or non-image event.',
      '- Wrapper: use this when images come from CMS, MDX, markdown, or uncontrolled HTML.',
      '',
      'Ask at most 3 concise questions only if the right path cannot be inferred from local files.',
    ].join('\n')
  }

  if (config.mode === 'component') {
    return [
      'Use Component mode.',
      '',
      'Replace owned `<img>` elements with `<Zmage>` and preserve native image attributes such as `alt`, `className`, `loading`, `width`, and `height`.',
      '',
      'Use `set` when the host image belongs to a gallery.',
    ].join('\n')
  }

  if (config.mode === 'imperative') {
    return [
      'Use Imperative mode.',
      '',
      'Call `Zmage.browsing(props)` from an event handler or client effect. Store the returned destructor when the host lifecycle needs cleanup.',
      '',
      'Do not call `Zmage.browsing()` during server render.',
    ].join('\n')
  }

  return [
    'Use Wrapper mode.',
    '',
    'Wrap the uncontrolled image subtree with `<Zmage.Wrapper>`. Keep `src`, `alt`, and native image attributes on descendant `<img>` nodes. Put viewer config on `<Zmage.Wrapper>`.',
    '',
    'If using shared `set`, the clicked image `src` should match `set[i].src`. Without explicit `set`, `data-zmage-caption` or nearest `figcaption` can supply caption text.',
  ].join('\n')
}

function propGuidance (config: AiPromptConfig) {
  const lines = [
    '- Prefer omitted `preset` or `preset="auto"` unless project evidence requires a fixed desktop or mobile setup.',
  ]

  if (config.environment === 'next-rsc' || config.environment === 'ssr') {
    lines.push('- For SSR or RSC-sensitive code, import from `react-zmage/ssr` and keep interactive usage inside a client boundary.')
  }

  if (config.imageSource === 'set') {
    lines.push('- Use `set` plus `defaultPage` for multi-image galleries.')
  }

  if (config.imageSource === 'caption') {
    lines.push('- Use `caption` on the top-level image or `set[i].caption` for per-image captions.')
  }

  if (config.imageSource === 'wrapper-caption') {
    lines.push('- In Wrapper mode without explicit `set`, use `data-zmage-caption` or the nearest `figcaption` for viewer captions.')
  }

  if (config.interaction === 'desktop-tools') {
    lines.push('- Keep desktop controller and hotKey defaults unless the host UI has a reason to hide tools. Wheel zoom applies while already zoomed.')
  } else if (config.interaction === 'mobile-gestures') {
    lines.push('- Use mobile gesture defaults when the host deliberately wants touch-first behavior: swipe, drag exit, pinch zoom, and double tap zoom.')
  } else if (config.interaction === 'no-browsing-animation') {
    lines.push('- Use `animate={{ browsing: false }}` when open and close transitions should be disabled.')
  } else if (config.interaction === 'custom-controller') {
    lines.push('- Use `controller.render` only when the host needs a fully custom controller; otherwise prefer partial `controller` options.')
  }

  return lines.join('\n')
}

export function buildAiPrompt (config: AiPromptConfig, labels: PromptLabels) {
  return `> **Canonical reference:** ${CANONICAL_REFERENCE}
>
> If anything below looks outdated or contradicts real package behavior, fetch that URL first. It is the source of truth for react-zmage usage modes, props, defaults, SSR entry, and common pitfalls. Report staleness back to the user.

---

# react-zmage Setup Guide

## Your Configuration

| Setting | Value |
|---------|-------|
| Coding Tool | ${displayChoice(config.agent, labels.agent)} |
| Project Environment | ${displayChoice(config.environment, labels.environment)} |
| Setup Depth | ${displayChoice(config.depth, labels.depth)} |
| Usage Mode | ${displayChoice(config.mode, labels.mode)} |
| Image Source | ${displayChoice(config.imageSource, labels.imageSource)} |
| Interaction Detail | ${displayChoice(config.interaction, labels.interaction)} |

**Project Description:** ${projectDescription(config.projectDescription)}

---

## Agent Workflow

Before editing code:

1. Inspect the project structure.
2. Find the package manager, framework, routing model, React version, CSS entry, and existing image rendering code.
3. If the right integration path cannot be inferred from local files, ask at most 3 concise questions.
4. Choose one Zmage mode:
   - Component: use this when the app owns the image markup.
   - Imperative: use this when the viewer opens from a button, callback, or non-image event.
   - Wrapper: use this when images come from CMS, MDX, markdown, or uncontrolled HTML.
5. Explain the chosen mode briefly, then implement.

If this setup is Auto, make the choices from the codebase instead of asking the user to decide every prop.

---

## Installation

Use the package manager already used by the project.

\`\`\`bash
pnpm add react-zmage
\`\`\`

Use npm, yarn, or bun instead if the project uses one of those.

---

## Required Imports

For normal client-side React:

\`\`\`tsx
import Zmage from 'react-zmage'
import 'react-zmage/style.css'
\`\`\`

For SSR or RSC-sensitive code:

\`\`\`tsx
import Zmage from 'react-zmage/ssr'
import 'react-zmage/style.css'
\`\`\`

Do not call \`Zmage.browsing()\` during server render. Call it from event handlers or client effects only.

---

## Recommended Integration

${modeInstructions(config)}

---

## Configuration Guidance

${propGuidance(config)}

---

## Common Mistakes To Avoid

- Do not forget \`import 'react-zmage/style.css'\`.
- Do not use \`new Zmage()\`.
- Do not confuse the static method \`Zmage.browsing()\` with the controlled \`browsing\` prop.
- In Wrapper mode, put \`src\`, \`alt\`, and native image attributes on child \`<img>\` elements, not on \`<Zmage.Wrapper>\`.
- In Wrapper mode, remember that newly injected images are bound after the wrapper re-renders.
- For dark UIs, set \`backdrop\` and controller colors deliberately.
- For Next.js App Router or RSC, keep interactive viewer usage inside a client boundary.

---

## Deliverables

Return:

1. Install command.
2. Files changed.
3. Final React code.
4. Where \`react-zmage/style.css\` is imported.
5. Any SSR/RSC notes.
6. Minimal verification steps.
`
}
```

- [ ] **Step 4: Add focused prompt builder tests**

Create `packages/home/src/aiPrompt/buildPrompt.test.ts` with Vitest assertions that:

- Auto choices render as translated labels, not raw enum values.
- Fine-tuned choices such as `next-rsc`, `wrapper-caption`, and `no-browsing-animation` render with human labels in the configuration table.
- Auto mode guidance tells the downstream Agent to inspect the project before asking questions.

Add a home-local test script:

```json
"test": "vitest run src/aiPrompt/buildPrompt.test.ts"
```

Add `vitest` to `packages/home/package.json` dev dependencies only if `pnpm --filter react-zmage-home exec vitest --version` cannot resolve it.

- [ ] **Step 5: Run prompt builder tests**

Run:

```bash
pnpm --filter react-zmage-home run test
```

Expected: focused tests pass.

## Task 3: AI Setup Route UI

**Files:**
- Create: `packages/home/src/routes/AISetup.tsx`
- Modify after Task 5 image generation: `packages/home/src/routes/AISetup.tsx`

- [ ] **Step 1: Create `AISetup.tsx`**

Create `packages/home/src/routes/AISetup.tsx`:

```tsx
import * as React from 'react'
import { Check, Copy, ExternalLink, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/CodeBlock'
import { Label } from '@/components/ui/label'
import { SegmentedChoice } from '@/components/ui/segmented-choice'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useT } from '@/i18n/useT'
import { useCopyToClipboard } from '@/lib/useCopyToClipboard'
import { cn } from '@/lib/utils'
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
  const [previewOpen, setPreviewOpen] = React.useState(false)
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
    <div className="mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:py-14">
      <section className="min-w-0">
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

        <div className="mt-8 space-y-7">
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
            {config.depth === 'auto' && (
              <p className="mt-2 rounded-md border border-border bg-muted/30 px-3 py-2 text-xs leading-5 text-muted-foreground">
                {t('ai.autoTip')}
              </p>
            )}
          </div>

          <div
            className={cn(
              'grid transition-[grid-template-rows,opacity,transform] duration-[220ms] ease-out motion-reduce:transition-none',
              fineTune ? 'grid-rows-[1fr] opacity-100 translate-y-0' : 'pointer-events-none grid-rows-[0fr] opacity-0 translate-y-2',
            )}
            aria-hidden={!fineTune}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="grid gap-6 pt-1">
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
              className="mt-2"
            />
          </div>

          <div className="flex flex-wrap gap-3">
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
            <Button variant="outline" className="lg:hidden" onClick={() => setPreviewOpen(current => !current)}>
              {previewOpen ? t('ai.preview.hide') : t('ai.preview.show')}
            </Button>
          </div>
          {error && <p className="text-sm text-destructive">{t('ai.copy.error')}</p>}
        </div>
      </section>

      <aside className={cn('min-w-0 lg:sticky lg:top-20 lg:block lg:self-start', previewOpen ? 'block' : 'hidden')}>
        {!imageHidden && (
          <img
            src="/ai-onboarding/prompt-setup.png"
            alt=""
            className="mb-5 block aspect-[16/10] w-full rounded-lg border border-border bg-muted/30 object-cover"
            onError={() => setImageHidden(true)}
          />
        )}
        <div className="rounded-lg border border-border bg-card/40">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <h2 className="text-sm font-medium">{t('ai.preview.title')}</h2>
              <p className="text-xs text-muted-foreground">{t('ai.preview.subtitle')}</p>
            </div>
          </div>
          <Separator />
          <div className="max-h-[560px] overflow-y-auto">
            <CodeBlock
              code={prompt}
              language={'markdown' as any}
              className="rounded-none border-0 bg-transparent"
              actions={(
                <Button size="sm" variant="outline" onClick={copyPrompt}>
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? t('ai.action.copied') : t('ai.preview.copy')}
                </Button>
              )}
              showCopy={false}
            />
          </div>
        </div>
      </aside>
    </div>
  )
}
```

- [ ] **Step 2: Run build and capture first integration errors**

Run:

```bash
pnpm --filter react-zmage-home run build
```

Expected before i18n work: TypeScript may fail because new `ai.*` i18n keys are not in `I18nDict`. Continue to Task 4 to add keys.

## Task 4: Routes, Navigation, Homepage Entry, And I18n

**Files:**
- Modify: `packages/home/src/App.tsx`
- Modify: `packages/home/src/components/TopNav.tsx`
- Modify: `packages/home/src/routes/Home.tsx`
- Modify: `packages/home/src/i18n/de.ts`
- Modify: `packages/home/src/i18n/en.ts`
- Modify: `packages/home/src/i18n/es.ts`
- Modify: `packages/home/src/i18n/fr.ts`
- Modify: `packages/home/src/i18n/ja.ts`
- Modify: `packages/home/src/i18n/ko.ts`
- Modify: `packages/home/src/i18n/zh-CN.ts`

- [ ] **Step 1: Add `/ai` route**

In `packages/home/src/App.tsx`, add:

```ts
import AISetup from './routes/AISetup'
```

Add route before the catch-all route:

```tsx
<Route path="/ai" element={<AISetup />} />
```

- [ ] **Step 2: Add top nav item**

In `packages/home/src/components/TopNav.tsx`, change `links` to:

```ts
const links = [
  { to: '/ai', key: 'nav.ai' as const },
  { to: '/playground', key: 'nav.playground' as const },
  { to: '/docs', key: 'nav.docs' as const },
]
```

- [ ] **Step 3: Replace homepage AI directive with quick copy and setup link**

In `packages/home/src/routes/Home.tsx`, keep `AIDirective` but change the rendered actions to:

```tsx
<div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
  <Button size="sm" variant="outline" asChild>
    <Link to="/ai">
      <Bot aria-hidden className="h-3.5 w-3.5" />
      {t('hero.ai.build')}
    </Link>
  </Button>
  <button
    onClick={() => copy(directive)}
    aria-label={t('hero.ai.copyLabel')}
    className="group inline-flex max-w-full cursor-pointer items-center gap-2 rounded-md border border-border/60 bg-muted/30 px-3 py-1.5 font-mono text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
  >
    <span className="min-w-0 break-words text-left">{t('hero.ai.quick')}</span>
    {copied
      ? <Check className="h-3.5 w-3.5 text-foreground" />
      : <Copy className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100" />}
  </button>
  <a
    href="/llms.txt"
    target="_blank"
    rel="noreferrer"
    className="text-muted-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
  >
    {t('hero.ai.viewLlms')}
  </a>
</div>
```

Remove the old inline `Bot` from the quick-copy button if it visually crowds the action row.

- [ ] **Step 4: Add Chinese i18n keys first**

In `packages/home/src/i18n/zh-CN.ts`, add keys near existing nav/hero/page keys:

```ts
'nav.ai': 'AI Setup',
'hero.ai.build': '生成 AI Prompt',
'hero.ai.quick': '复制快速 Prompt',
'hero.ai.copyLabel': '复制 AI 快速提示词',
'hero.ai.viewLlms': '查看 llms.txt →',
'ai.badge': 'Agent Prompt',
'ai.title': '创建 react-zmage 集成 Prompt',
'ai.subtitle': '保持 Auto 让 Agent 自己判断, 或手动细调后复制给你的编码 Agent。',
'ai.field.agent': '你使用哪个 Agent?',
'ai.field.depth': '设置深度',
'ai.field.environment': '项目环境',
'ai.field.mode': '使用模式',
'ai.field.imageSource': '图片来源',
'ai.field.interaction': '交互策略',
'ai.field.project': '项目描述',
'ai.autoTip': '不确定就保持 Auto。你的 Agent 会先检查项目结构、图片来源、渲染方式和样式入口, 再选择合适的 Zmage 模式与参数。',
'ai.project.placeholder': '描述你的应用、图片来源, 以及查看器需要完成什么。',
'ai.action.copy': '复制 setup prompt',
'ai.action.copied': '已复制',
'ai.action.openLlms': '打开 llms.txt',
'ai.copy.error': '复制失败。请从预览区手动选择 prompt。',
'ai.preview.title': 'Setup prompt',
'ai.preview.subtitle': '会随左侧选择实时更新',
'ai.preview.copy': '复制',
'ai.preview.show': '预览 prompt',
'ai.preview.hide': '收起预览',
'ai.option.auto': 'Auto',
'ai.option.other': 'Other',
'ai.option.agent.codex': 'Codex',
'ai.option.agent.claude': 'Claude',
'ai.option.agent.cursor': 'Cursor',
'ai.option.agent.devin': 'Devin',
'ai.option.agent.auto.desc': '让 prompt 适配通用编码 Agent。',
'ai.option.depth.auto': 'Auto',
'ai.option.depth.auto.desc': '让 Agent 先读项目再决定。',
'ai.option.depth.fine': 'Fine tune',
'ai.option.depth.fine.desc': '手动指定集成偏好。',
'ai.option.env.vite': 'Vite / CSR',
'ai.option.env.nextRsc': 'Next.js App Router / RSC',
'ai.option.env.ssr': 'SSR',
'ai.option.env.cmsMdx': 'CMS / MDX / Markdown',
'ai.option.env.event': 'Event handler only',
'ai.option.mode.component': 'Component',
'ai.option.mode.imperative': 'Imperative',
'ai.option.mode.wrapper': 'Wrapper',
'ai.option.image.single': 'Single image',
'ai.option.image.set': 'Set gallery',
'ai.option.image.caption': 'Captions',
'ai.option.image.wrapperCaption': 'Wrapper captions',
'ai.option.interaction.presetAuto': 'Preset auto',
'ai.option.interaction.desktopTools': 'Desktop tools',
'ai.option.interaction.mobileGestures': 'Mobile gestures',
'ai.option.interaction.noBrowsingAnimation': 'No browsing animation',
'ai.option.interaction.customController': 'Custom controller',
```

- [ ] **Step 5: Add matching English i18n keys**

In `packages/home/src/i18n/en.ts`, add:

```ts
'nav.ai': 'AI Setup',
'hero.ai.build': 'Build AI prompt',
'hero.ai.quick': 'Copy quick prompt',
'hero.ai.copyLabel': 'Copy quick AI prompt',
'hero.ai.viewLlms': 'view llms.txt →',
'ai.badge': 'Agent Prompt',
'ai.title': 'Create your react-zmage agent prompt',
'ai.subtitle': 'Keep Auto so your agent can decide, or fine tune the setup before copying it to your coding agent.',
'ai.field.agent': 'Which agent are you using?',
'ai.field.depth': 'Setup depth',
'ai.field.environment': 'Project environment',
'ai.field.mode': 'Usage mode',
'ai.field.imageSource': 'Image source',
'ai.field.interaction': 'Interaction strategy',
'ai.field.project': 'Project description',
'ai.autoTip': 'Keep Auto if you are not sure. Your agent will inspect your project structure, image source, rendering mode, and styling entry first, then choose the right Zmage mode and props.',
'ai.project.placeholder': 'Describe your app, image source, and what the viewer should do.',
'ai.action.copy': 'Copy setup prompt',
'ai.action.copied': 'Copied',
'ai.action.openLlms': 'Open llms.txt',
'ai.copy.error': 'Copy failed. Select the prompt from the preview manually.',
'ai.preview.title': 'Setup prompt',
'ai.preview.subtitle': 'Updates as you choose options',
'ai.preview.copy': 'Copy',
'ai.preview.show': 'Preview prompt',
'ai.preview.hide': 'Hide preview',
'ai.option.auto': 'Auto',
'ai.option.other': 'Other',
'ai.option.agent.codex': 'Codex',
'ai.option.agent.claude': 'Claude',
'ai.option.agent.cursor': 'Cursor',
'ai.option.agent.devin': 'Devin',
'ai.option.agent.auto.desc': 'Make the prompt work for a general coding agent.',
'ai.option.depth.auto': 'Auto',
'ai.option.depth.auto.desc': 'Let the agent inspect the project first.',
'ai.option.depth.fine': 'Fine tune',
'ai.option.depth.fine.desc': 'Manually specify integration preferences.',
'ai.option.env.vite': 'Vite / CSR',
'ai.option.env.nextRsc': 'Next.js App Router / RSC',
'ai.option.env.ssr': 'SSR',
'ai.option.env.cmsMdx': 'CMS / MDX / Markdown',
'ai.option.env.event': 'Event handler only',
'ai.option.mode.component': 'Component',
'ai.option.mode.imperative': 'Imperative',
'ai.option.mode.wrapper': 'Wrapper',
'ai.option.image.single': 'Single image',
'ai.option.image.set': 'Set gallery',
'ai.option.image.caption': 'Captions',
'ai.option.image.wrapperCaption': 'Wrapper captions',
'ai.option.interaction.presetAuto': 'Preset auto',
'ai.option.interaction.desktopTools': 'Desktop tools',
'ai.option.interaction.mobileGestures': 'Mobile gestures',
'ai.option.interaction.noBrowsingAnimation': 'No browsing animation',
'ai.option.interaction.customController': 'Custom controller',
```

- [ ] **Step 6: Add German i18n keys**

In `packages/home/src/i18n/de.ts`, add:

```ts
'nav.ai': 'AI Setup',
'hero.ai.build': 'AI Prompt erstellen',
'hero.ai.quick': 'Schnellen Prompt kopieren',
'hero.ai.copyLabel': 'Schnellen AI Prompt kopieren',
'hero.ai.viewLlms': 'llms.txt ansehen →',
'ai.badge': 'Agent Prompt',
'ai.title': 'Erstelle deinen react-zmage Agent Prompt',
'ai.subtitle': 'Lass Auto aktiv, damit dein Agent selbst entscheidet, oder stimme die Einrichtung vor dem Kopieren fein ab.',
'ai.field.agent': 'Welchen Agent verwendest du?',
'ai.field.depth': 'Setup-Tiefe',
'ai.field.environment': 'Projektumgebung',
'ai.field.mode': 'Nutzungsmodus',
'ai.field.imageSource': 'Bildquelle',
'ai.field.interaction': 'Interaktionsstrategie',
'ai.field.project': 'Projektbeschreibung',
'ai.autoTip': 'Lass Auto aktiv, wenn du unsicher bist. Dein Agent prüft zuerst Projektstruktur, Bildquelle, Rendering-Modus und Style-Einstieg und wählt dann den passenden Zmage-Modus und die passenden Props.',
'ai.project.placeholder': 'Beschreibe deine App, die Bildquelle und was der Viewer leisten soll.',
'ai.action.copy': 'Setup Prompt kopieren',
'ai.action.copied': 'Kopiert',
'ai.action.openLlms': 'llms.txt öffnen',
'ai.copy.error': 'Kopieren fehlgeschlagen. Wähle den Prompt manuell in der Vorschau aus.',
'ai.preview.title': 'Setup Prompt',
'ai.preview.subtitle': 'Aktualisiert sich mit deinen Optionen',
'ai.preview.copy': 'Kopieren',
'ai.preview.show': 'Prompt ansehen',
'ai.preview.hide': 'Vorschau ausblenden',
'ai.option.auto': 'Auto',
'ai.option.other': 'Other',
'ai.option.agent.codex': 'Codex',
'ai.option.agent.claude': 'Claude',
'ai.option.agent.cursor': 'Cursor',
'ai.option.agent.devin': 'Devin',
'ai.option.agent.auto.desc': 'Macht den Prompt passend für einen allgemeinen Coding Agent.',
'ai.option.depth.auto': 'Auto',
'ai.option.depth.auto.desc': 'Der Agent prüft zuerst das Projekt.',
'ai.option.depth.fine': 'Fine tune',
'ai.option.depth.fine.desc': 'Integrationswünsche manuell festlegen.',
'ai.option.env.vite': 'Vite / CSR',
'ai.option.env.nextRsc': 'Next.js App Router / RSC',
'ai.option.env.ssr': 'SSR',
'ai.option.env.cmsMdx': 'CMS / MDX / Markdown',
'ai.option.env.event': 'Event handler only',
'ai.option.mode.component': 'Component',
'ai.option.mode.imperative': 'Imperative',
'ai.option.mode.wrapper': 'Wrapper',
'ai.option.image.single': 'Single image',
'ai.option.image.set': 'Set gallery',
'ai.option.image.caption': 'Captions',
'ai.option.image.wrapperCaption': 'Wrapper captions',
'ai.option.interaction.presetAuto': 'Preset auto',
'ai.option.interaction.desktopTools': 'Desktop tools',
'ai.option.interaction.mobileGestures': 'Mobile gestures',
'ai.option.interaction.noBrowsingAnimation': 'No browsing animation',
'ai.option.interaction.customController': 'Custom controller',
```

- [ ] **Step 7: Add Spanish i18n keys**

In `packages/home/src/i18n/es.ts`, add:

```ts
'nav.ai': 'AI Setup',
'hero.ai.build': 'Crear prompt de AI',
'hero.ai.quick': 'Copiar prompt rápido',
'hero.ai.copyLabel': 'Copiar prompt rápido de AI',
'hero.ai.viewLlms': 'ver llms.txt →',
'ai.badge': 'Agent Prompt',
'ai.title': 'Crea tu prompt de agente para react-zmage',
'ai.subtitle': 'Mantén Auto para que tu agente decida, o ajusta la configuración antes de copiarla a tu agente de código.',
'ai.field.agent': '¿Qué agente usas?',
'ai.field.depth': 'Nivel de configuración',
'ai.field.environment': 'Entorno del proyecto',
'ai.field.mode': 'Modo de uso',
'ai.field.imageSource': 'Fuente de imágenes',
'ai.field.interaction': 'Estrategia de interacción',
'ai.field.project': 'Descripción del proyecto',
'ai.autoTip': 'Mantén Auto si no estás seguro. Tu agente revisará primero la estructura del proyecto, la fuente de imágenes, el modo de renderizado y la entrada de estilos, y luego elegirá el modo y las props correctas de Zmage.',
'ai.project.placeholder': 'Describe tu app, la fuente de imágenes y lo que debe hacer el visor.',
'ai.action.copy': 'Copiar setup prompt',
'ai.action.copied': 'Copiado',
'ai.action.openLlms': 'Abrir llms.txt',
'ai.copy.error': 'No se pudo copiar. Selecciona el prompt manualmente desde la vista previa.',
'ai.preview.title': 'Setup prompt',
'ai.preview.subtitle': 'Se actualiza con tus opciones',
'ai.preview.copy': 'Copiar',
'ai.preview.show': 'Ver prompt',
'ai.preview.hide': 'Ocultar vista previa',
'ai.option.auto': 'Auto',
'ai.option.other': 'Other',
'ai.option.agent.codex': 'Codex',
'ai.option.agent.claude': 'Claude',
'ai.option.agent.cursor': 'Cursor',
'ai.option.agent.devin': 'Devin',
'ai.option.agent.auto.desc': 'Hace que el prompt funcione con un agente de código general.',
'ai.option.depth.auto': 'Auto',
'ai.option.depth.auto.desc': 'Permite que el agente inspeccione primero el proyecto.',
'ai.option.depth.fine': 'Fine tune',
'ai.option.depth.fine.desc': 'Define manualmente las preferencias de integración.',
'ai.option.env.vite': 'Vite / CSR',
'ai.option.env.nextRsc': 'Next.js App Router / RSC',
'ai.option.env.ssr': 'SSR',
'ai.option.env.cmsMdx': 'CMS / MDX / Markdown',
'ai.option.env.event': 'Event handler only',
'ai.option.mode.component': 'Component',
'ai.option.mode.imperative': 'Imperative',
'ai.option.mode.wrapper': 'Wrapper',
'ai.option.image.single': 'Single image',
'ai.option.image.set': 'Set gallery',
'ai.option.image.caption': 'Captions',
'ai.option.image.wrapperCaption': 'Wrapper captions',
'ai.option.interaction.presetAuto': 'Preset auto',
'ai.option.interaction.desktopTools': 'Desktop tools',
'ai.option.interaction.mobileGestures': 'Mobile gestures',
'ai.option.interaction.noBrowsingAnimation': 'No browsing animation',
'ai.option.interaction.customController': 'Custom controller',
```

- [ ] **Step 8: Add French i18n keys**

In `packages/home/src/i18n/fr.ts`, add:

```ts
'nav.ai': 'AI Setup',
'hero.ai.build': 'Créer un prompt AI',
'hero.ai.quick': 'Copier le prompt rapide',
'hero.ai.copyLabel': 'Copier le prompt AI rapide',
'hero.ai.viewLlms': 'voir llms.txt →',
'ai.badge': 'Agent Prompt',
'ai.title': 'Créez votre prompt agent pour react-zmage',
'ai.subtitle': 'Gardez Auto pour laisser votre agent décider, ou ajustez la configuration avant de la copier dans votre agent de code.',
'ai.field.agent': 'Quel agent utilisez-vous ?',
'ai.field.depth': 'Niveau de configuration',
'ai.field.environment': 'Environnement du projet',
'ai.field.mode': 'Mode d’utilisation',
'ai.field.imageSource': 'Source des images',
'ai.field.interaction': 'Stratégie d’interaction',
'ai.field.project': 'Description du projet',
'ai.autoTip': 'Gardez Auto si vous hésitez. Votre agent inspectera d’abord la structure du projet, la source des images, le mode de rendu et l’entrée des styles, puis choisira le bon mode Zmage et les bonnes props.',
'ai.project.placeholder': 'Décrivez votre app, la source des images et ce que le viewer doit faire.',
'ai.action.copy': 'Copier le setup prompt',
'ai.action.copied': 'Copié',
'ai.action.openLlms': 'Ouvrir llms.txt',
'ai.copy.error': 'La copie a échoué. Sélectionnez le prompt manuellement dans l’aperçu.',
'ai.preview.title': 'Setup prompt',
'ai.preview.subtitle': 'Se met à jour avec vos options',
'ai.preview.copy': 'Copier',
'ai.preview.show': 'Voir le prompt',
'ai.preview.hide': 'Masquer l’aperçu',
'ai.option.auto': 'Auto',
'ai.option.other': 'Other',
'ai.option.agent.codex': 'Codex',
'ai.option.agent.claude': 'Claude',
'ai.option.agent.cursor': 'Cursor',
'ai.option.agent.devin': 'Devin',
'ai.option.agent.auto.desc': 'Rend le prompt compatible avec un agent de code général.',
'ai.option.depth.auto': 'Auto',
'ai.option.depth.auto.desc': 'Laissez l’agent inspecter le projet d’abord.',
'ai.option.depth.fine': 'Fine tune',
'ai.option.depth.fine.desc': 'Spécifiez manuellement les préférences d’intégration.',
'ai.option.env.vite': 'Vite / CSR',
'ai.option.env.nextRsc': 'Next.js App Router / RSC',
'ai.option.env.ssr': 'SSR',
'ai.option.env.cmsMdx': 'CMS / MDX / Markdown',
'ai.option.env.event': 'Event handler only',
'ai.option.mode.component': 'Component',
'ai.option.mode.imperative': 'Imperative',
'ai.option.mode.wrapper': 'Wrapper',
'ai.option.image.single': 'Single image',
'ai.option.image.set': 'Set gallery',
'ai.option.image.caption': 'Captions',
'ai.option.image.wrapperCaption': 'Wrapper captions',
'ai.option.interaction.presetAuto': 'Preset auto',
'ai.option.interaction.desktopTools': 'Desktop tools',
'ai.option.interaction.mobileGestures': 'Mobile gestures',
'ai.option.interaction.noBrowsingAnimation': 'No browsing animation',
'ai.option.interaction.customController': 'Custom controller',
```

- [ ] **Step 9: Add Japanese i18n keys**

In `packages/home/src/i18n/ja.ts`, add:

```ts
'nav.ai': 'AI Setup',
'hero.ai.build': 'AI Prompt を作成',
'hero.ai.quick': 'クイック Prompt をコピー',
'hero.ai.copyLabel': 'クイック AI Prompt をコピー',
'hero.ai.viewLlms': 'llms.txt を表示 →',
'ai.badge': 'Agent Prompt',
'ai.title': 'react-zmage 用の Agent Prompt を作成',
'ai.subtitle': 'Auto のままにすると Agent が判断します。必要なら細かく指定してからコーディング Agent にコピーできます。',
'ai.field.agent': 'どの Agent を使いますか?',
'ai.field.depth': '設定の深さ',
'ai.field.environment': 'プロジェクト環境',
'ai.field.mode': '使用モード',
'ai.field.imageSource': '画像ソース',
'ai.field.interaction': 'インタラクション方針',
'ai.field.project': 'プロジェクト説明',
'ai.autoTip': '迷ったら Auto のままで構いません。Agent が先にプロジェクト構造、画像ソース、レンダリング方式、スタイル入口を確認し、適切な Zmage モードと props を選びます。',
'ai.project.placeholder': 'アプリ、画像ソース、viewer に求める動作を説明してください。',
'ai.action.copy': 'setup prompt をコピー',
'ai.action.copied': 'コピーしました',
'ai.action.openLlms': 'llms.txt を開く',
'ai.copy.error': 'コピーに失敗しました。プレビューから prompt を手動で選択してください。',
'ai.preview.title': 'Setup prompt',
'ai.preview.subtitle': '選択に合わせて更新されます',
'ai.preview.copy': 'コピー',
'ai.preview.show': 'Prompt をプレビュー',
'ai.preview.hide': 'プレビューを閉じる',
'ai.option.auto': 'Auto',
'ai.option.other': 'Other',
'ai.option.agent.codex': 'Codex',
'ai.option.agent.claude': 'Claude',
'ai.option.agent.cursor': 'Cursor',
'ai.option.agent.devin': 'Devin',
'ai.option.agent.auto.desc': '一般的なコーディング Agent 向けの prompt にします。',
'ai.option.depth.auto': 'Auto',
'ai.option.depth.auto.desc': 'Agent に先にプロジェクトを確認させます。',
'ai.option.depth.fine': 'Fine tune',
'ai.option.depth.fine.desc': '統合方針を手動で指定します。',
'ai.option.env.vite': 'Vite / CSR',
'ai.option.env.nextRsc': 'Next.js App Router / RSC',
'ai.option.env.ssr': 'SSR',
'ai.option.env.cmsMdx': 'CMS / MDX / Markdown',
'ai.option.env.event': 'Event handler only',
'ai.option.mode.component': 'Component',
'ai.option.mode.imperative': 'Imperative',
'ai.option.mode.wrapper': 'Wrapper',
'ai.option.image.single': 'Single image',
'ai.option.image.set': 'Set gallery',
'ai.option.image.caption': 'Captions',
'ai.option.image.wrapperCaption': 'Wrapper captions',
'ai.option.interaction.presetAuto': 'Preset auto',
'ai.option.interaction.desktopTools': 'Desktop tools',
'ai.option.interaction.mobileGestures': 'Mobile gestures',
'ai.option.interaction.noBrowsingAnimation': 'No browsing animation',
'ai.option.interaction.customController': 'Custom controller',
```

- [ ] **Step 10: Add Korean i18n keys**

In `packages/home/src/i18n/ko.ts`, add:

```ts
'nav.ai': 'AI Setup',
'hero.ai.build': 'AI Prompt 만들기',
'hero.ai.quick': '빠른 Prompt 복사',
'hero.ai.copyLabel': '빠른 AI Prompt 복사',
'hero.ai.viewLlms': 'llms.txt 보기 →',
'ai.badge': 'Agent Prompt',
'ai.title': 'react-zmage Agent Prompt 만들기',
'ai.subtitle': 'Auto를 유지하면 Agent가 직접 판단합니다. 필요하면 세부 설정을 조정한 뒤 코딩 Agent에 복사할 수 있습니다.',
'ai.field.agent': '어떤 Agent를 사용하나요?',
'ai.field.depth': '설정 깊이',
'ai.field.environment': '프로젝트 환경',
'ai.field.mode': '사용 모드',
'ai.field.imageSource': '이미지 소스',
'ai.field.interaction': '인터랙션 전략',
'ai.field.project': '프로젝트 설명',
'ai.autoTip': '확실하지 않으면 Auto를 유지하세요. Agent가 먼저 프로젝트 구조, 이미지 소스, 렌더링 방식, 스타일 진입점을 확인한 뒤 적절한 Zmage 모드와 props를 선택합니다.',
'ai.project.placeholder': '앱, 이미지 소스, viewer가 해야 할 일을 설명하세요.',
'ai.action.copy': 'setup prompt 복사',
'ai.action.copied': '복사됨',
'ai.action.openLlms': 'llms.txt 열기',
'ai.copy.error': '복사에 실패했습니다. 미리보기에서 prompt를 직접 선택하세요.',
'ai.preview.title': 'Setup prompt',
'ai.preview.subtitle': '선택에 따라 업데이트됩니다',
'ai.preview.copy': '복사',
'ai.preview.show': 'Prompt 미리보기',
'ai.preview.hide': '미리보기 접기',
'ai.option.auto': 'Auto',
'ai.option.other': 'Other',
'ai.option.agent.codex': 'Codex',
'ai.option.agent.claude': 'Claude',
'ai.option.agent.cursor': 'Cursor',
'ai.option.agent.devin': 'Devin',
'ai.option.agent.auto.desc': '일반 코딩 Agent에 맞는 prompt를 만듭니다.',
'ai.option.depth.auto': 'Auto',
'ai.option.depth.auto.desc': 'Agent가 먼저 프로젝트를 살펴보게 합니다.',
'ai.option.depth.fine': 'Fine tune',
'ai.option.depth.fine.desc': '통합 선호도를 직접 지정합니다.',
'ai.option.env.vite': 'Vite / CSR',
'ai.option.env.nextRsc': 'Next.js App Router / RSC',
'ai.option.env.ssr': 'SSR',
'ai.option.env.cmsMdx': 'CMS / MDX / Markdown',
'ai.option.env.event': 'Event handler only',
'ai.option.mode.component': 'Component',
'ai.option.mode.imperative': 'Imperative',
'ai.option.mode.wrapper': 'Wrapper',
'ai.option.image.single': 'Single image',
'ai.option.image.set': 'Set gallery',
'ai.option.image.caption': 'Captions',
'ai.option.image.wrapperCaption': 'Wrapper captions',
'ai.option.interaction.presetAuto': 'Preset auto',
'ai.option.interaction.desktopTools': 'Desktop tools',
'ai.option.interaction.mobileGestures': 'Mobile gestures',
'ai.option.interaction.noBrowsingAnimation': 'No browsing animation',
'ai.option.interaction.customController': 'Custom controller',
```

- [ ] **Step 11: Run build**

Run:

```bash
pnpm --filter react-zmage-home run build
```

Expected: build passes. If TypeScript reports missing i18n keys, add the same keys to every locale file.

## Task 5: gpt-image-2 Illustration Asset

**Files:**
- Create directory: `packages/home/public/ai-onboarding/`
- Create: `packages/home/public/ai-onboarding/prompt-setup.png`

- [ ] **Step 1: Generate the illustration using gpt-image-2**

Use the image generation workflow with `gpt-image-2` and this prompt:

```text
Use case: ui-mockup
Asset type: website onboarding illustration
Primary request: a refined product-style illustration for a React image viewer AI prompt setup page
Scene/backdrop: quiet off-white workspace with subtle grid texture and a blue inspection panel
Subject: image thumbnails flowing into a fullscreen viewer, with three labeled integration branches: Component, Imperative, Wrapper
Style/medium: polished 3D UI illustration, soft lighting, clean product documentation aesthetic
Composition/framing: wide right-side hero artwork with generous negative space, no heavy text
Color palette: tinted neutral whites, graphite text, restrained blue accent
Constraints: no brand logos, no watermark, keep text minimal and legible, avoid dark stock-like atmosphere
```

- [ ] **Step 2: Move the selected output into the public asset path**

Ensure the final file path is:

```text
packages/home/public/ai-onboarding/prompt-setup.png
```

- [ ] **Step 3: Validate the asset exists and is non-trivial**

Run:

```powershell
$asset = 'packages/home/public/ai-onboarding/prompt-setup.png'
if (!(Test-Path $asset) -or (Get-Item $asset).Length -lt 100000) {
  throw "Missing or too-small AI onboarding image: $asset"
}
```

Expected: command exits successfully.

- [ ] **Step 4: Run home build**

Run:

```bash
pnpm --filter react-zmage-home run build
```

Expected: Vite copies the public asset into `docs/ai-onboarding/prompt-setup.png`.

## Task 6: llms-eval Rubric Cleanup

**Files:**
- Modify: `packages/llms-eval/agent-onboarding/rubric.mjs`

- [ ] **Step 1: Remove stale `txt` prop tolerance**

In `VALID_PROPS`, replace:

```js
'src', 'alt', 'txt', 'set', 'defaultPage',
```

with:

```js
'src', 'alt', 'caption', 'set', 'defaultPage',
```

- [ ] **Step 2: Add currently supported props that the rubric is missing**

Ensure `VALID_PROPS` includes:

```js
'gesture', 'hideOnDblClick', 'loadingDelay',
```

and lifecycle prop:

```js
'onError',
```

The final relevant block should be:

```js
const VALID_PROPS = new Set([
  'src', 'alt', 'caption', 'set', 'defaultPage',
  'preset',
  'controller', 'hotKey', 'animate', 'gesture',
  'hideOnScroll', 'hideOnDblClick', 'coverVisible', 'backdrop', 'zIndex', 'radius', 'edge', 'loop', 'loadingDelay',
  'onBrowsing', 'onZooming', 'onSwitching', 'onRotating', 'onError',
  'browsing',
  'className', 'style', 'id', 'onClick', 'onLoad', 'title', 'role',
  'children', 'ref', 'key',
  'width', 'height', 'srcSet', 'sizes', 'loading', 'decoding', 'fetchPriority',
  'crossOrigin', 'referrerPolicy', 'useMap', 'tabIndex', 'draggable',
  'data-testid',
])
```

- [ ] **Step 3: Run llms-eval tests**

Run:

```bash
pnpm --filter llms-eval run test
```

Expected: all static llms-eval tests pass.

## Task 7: Final Verification And Commit

**Files:**
- All files touched by Tasks 1-6.

- [ ] **Step 1: Run home build**

Run:

```bash
pnpm --filter react-zmage-home run build
```

Expected: build passes.

- [ ] **Step 2: Run home prompt tests**

Run:

```bash
pnpm --filter react-zmage-home run test
```

Expected: prompt builder tests pass.

- [ ] **Step 3: Run llms-eval**

Run:

```bash
pnpm --filter llms-eval run test
```

Expected: tests pass.

- [ ] **Step 4: Check whitespace**

Run:

```bash
git diff --check
```

Expected: no output.

- [ ] **Step 5: Review changed files**

Run:

```bash
git status --short
git diff --stat
```

Expected changed file groups:

```text
packages/home/src/aiPrompt/*
packages/home/package.json
packages/home/src/components/ui/segmented-choice.tsx
packages/home/src/components/ui/textarea.tsx
packages/home/src/lib/useCopyToClipboard.ts
packages/home/src/routes/AISetup.tsx
packages/home/src/App.tsx
packages/home/src/components/TopNav.tsx
packages/home/src/routes/Home.tsx
packages/home/src/components/CodeBlock.tsx
packages/home/src/i18n/*.ts
packages/home/public/ai-onboarding/prompt-setup.png
packages/llms-eval/agent-onboarding/rubric.mjs
docs/*
```

`docs/*` changes are expected after home build.

- [ ] **Step 6: Commit implementation**

Stage only related files:

```bash
git add packages/home/src/aiPrompt packages/home/package.json pnpm-lock.yaml packages/home/src/components/ui/segmented-choice.tsx packages/home/src/components/ui/textarea.tsx packages/home/src/lib/useCopyToClipboard.ts packages/home/src/routes/AISetup.tsx packages/home/src/App.tsx packages/home/src/components/TopNav.tsx packages/home/src/routes/Home.tsx packages/home/src/components/CodeBlock.tsx packages/home/src/i18n packages/home/public/ai-onboarding packages/llms-eval/agent-onboarding/rubric.mjs docs
git commit -m "feat(home): add ai prompt onboarding"
```

Expected: commit succeeds with only related implementation and generated docs assets.
