import type { AiPromptConfig, PromptLabels } from './types'

const CANONICAL_REFERENCE = 'https://zmage.caldis.me/llms.txt'

const projectDescription = (value: string) => value.trim() || '(Not provided)'

function displayChoice<T extends string> (value: T, labels: Record<T, string>) {
  return labels[value] ?? value
}

function effectiveConfig (config: AiPromptConfig): AiPromptConfig {
  if (config.depth !== 'auto') return config

  return {
    ...config,
    environment: 'auto',
    mode: 'auto',
    imageSource: 'auto',
    interaction: 'auto',
  }
}

function agentGuidance (config: AiPromptConfig, labels: PromptLabels) {
  if (config.agent === 'auto') {
    return [
      'Use the workflow that fits your coding agent. Prefer direct file inspection and small, reviewable edits.',
      'If the agent has tool limits, first ask it to read `llms.txt`, package files, routing files, and the image-rendering components.',
    ].join('\n')
  }

  return `Optimize the workflow for ${displayChoice(config.agent, labels.agent)}. Keep the same technical checks and source-of-truth rules below.`
}

function environmentGuidance (config: AiPromptConfig) {
  if (config.depth === 'auto' || config.environment === 'auto') {
    return [
      '- Detect the framework from package files and routing structure before choosing imports.',
      '- In CSR-only React, import from `react-zmage`.',
      '- In SSR, React Server Components, or code that may run during server render, import from `react-zmage/ssr` and keep viewer opening inside a client boundary or event handler.',
    ].join('\n')
  }

  if (config.environment === 'next-rsc') {
    return [
      '- Use the SSR-safe entry: `import Zmage from "react-zmage/ssr"`.',
      '- Add `"use client"` only to the smallest component that renders or opens the viewer.',
      '- Import `react-zmage/style.css` from the app-level style entry allowed by the project.',
    ].join('\n')
  }

  if (config.environment === 'ssr') {
    return [
      '- Use `react-zmage/ssr` for code that can be evaluated server-side.',
      '- Call `Zmage.browsing()` only after `window` and `document` exist.',
      '- Keep the stylesheet imported once by the client bundle.',
    ].join('\n')
  }

  if (config.environment === 'cms-mdx') {
    return [
      '- Expect image markup to be partially uncontrolled.',
      '- Prefer Wrapper mode unless the project already maps MDX or CMS images into React components.',
    ].join('\n')
  }

  if (config.environment === 'event') {
    return [
      '- Prefer Imperative mode when the viewer opens from a button, command menu, custom thumbnail, or callback.',
      '- Store and call the destructor when the host lifecycle can outlive the viewer.',
    ].join('\n')
  }

  return [
    '- Use the standard client import from `react-zmage`.',
    '- Import `react-zmage/style.css` once from the app entry or root layout used by this Vite app.',
  ].join('\n')
}

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
    'If using a shared `set`, the clicked image `src` should match `set[i].src`. Without explicit `set`, `data-zmage-caption` or nearest `figcaption` can supply caption text.',
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
  const activeConfig = effectiveConfig(config)

  return `> **Canonical reference:** ${CANONICAL_REFERENCE}
>
> If anything below looks outdated or contradicts real package behavior, fetch that URL first. It is the source of truth for react-zmage usage modes, props, defaults, SSR entry, and common pitfalls. Report staleness back to the user.

---

# react-zmage Setup Guide

## Your Configuration

| Setting | Value |
|---------|-------|
| Coding Tool | ${displayChoice(config.agent, labels.agent)} |
| Project Environment | ${displayChoice(activeConfig.environment, labels.environment)} |
| Setup Depth | ${displayChoice(config.depth, labels.depth)} |
| Usage Mode | ${displayChoice(activeConfig.mode, labels.mode)} |
| Image Source | ${displayChoice(activeConfig.imageSource, labels.imageSource)} |
| Interaction Detail | ${displayChoice(activeConfig.interaction, labels.interaction)} |

**Project Description:** ${projectDescription(config.projectDescription)}

---

## Agent Workflow

${agentGuidance(config, labels)}

Before editing code:

1. Inspect the project structure, package manager, React version, routing model, render mode, and CSS entry.
2. Find all existing image-rendering paths: owned React images, generated HTML, MDX, CMS content, galleries, and buttons that open media.
3. Give the user a short interactive intake only when local evidence is missing. Ask no more than 3 concrete questions, for example image source, SSR boundary, or desired mobile gestures.
4. Choose one Zmage mode from the real architecture: Component, Imperative, or Wrapper.
5. Explain the choice briefly, then implement.

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

## Environment Guidance

${environmentGuidance(activeConfig)}

---

## Recommended Integration

${modeInstructions(activeConfig)}

---

## Configuration Guidance

${propGuidance(activeConfig)}

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
