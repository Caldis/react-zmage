# AI Prompt Onboarding Design

## Goal

Build a dedicated AI Prompt Setup page for the home site. The page helps users generate a structured prompt for their own coding agent so it can integrate `react-zmage` correctly, with Auto as the default path and Fine tune as the advanced path.

## Background

The current home page has a small AI directive in `packages/home/src/routes/Home.tsx`: it copies one line that tells an agent to read `https://zmage.caldis.me/llms.txt`. That path is still useful because it is fast and low-friction.

The new flow should keep that quick path, then add a fuller onboarding page for users who want a guided setup prompt. The reference interaction is Exa's setup prompt flow, but this project needs its own content: React image viewer integration, three usage modes, SSR/RSC entry, styles, presets, controls, animation, gestures, Wrapper mode, and common mistakes.

## Current Project Facts

- `packages/home/src/App.tsx` owns the home site routes. Current routes are `/`, `/playground/*`, and `/docs`.
- `packages/home/src/components/TopNav.tsx` owns the top navigation.
- `packages/home/src/routes/Home.tsx` owns the current Hero AI directive.
- `packages/home/vite.config.mts` copies root `llms.txt` into `docs/llms.txt` during home build.
- Root `llms.txt` is the source of truth for agent-facing package behavior.
- `packages/llms-eval/eval.test.mjs` checks that `llms.txt` agrees with core API contracts.
- `packages/llms-eval/agent-onboarding/rubric.mjs` still tolerates the old `txt` prop and should be corrected during implementation.

## Design Direction

Add a new `/ai` route named `AI Prompt Setup`.

The page should be a practical product tool, not a marketing page. Users arrive, choose Auto or Fine tune, optionally describe their project, preview the generated prompt, and copy it for their coding agent.

Homepage changes should stay small:

- Keep a quick prompt copy action.
- Add a prominent `Build AI prompt` action that links to `/ai`.
- Keep the current `/llms.txt` link available.

## Supported Choice Model

The flow separates real Zmage capability from prompt-only onboarding context.

### Real Zmage Capabilities

These choices map to supported package behavior:

| Choice | Supported by Zmage | Notes |
|---|---|---|
| Component mode | Yes | `<Zmage src="..." />` |
| Imperative mode | Yes | `Zmage.browsing(props)` returns a destructor |
| Wrapper mode | Yes | `<Zmage.Wrapper>` binds descendant `<img>` nodes |
| Single image | Yes | `src` |
| Set gallery | Yes | `set` and `defaultPage` |
| Caption | Yes | top-level `caption`, `set[i].caption` |
| Wrapper captions | Yes | `data-zmage-caption` or nearest `figcaption` when no explicit `set` is supplied |
| `preset="auto"` | Yes | default preset |
| Desktop or mobile preset | Yes | changes default controller, hotKey, animate, and gesture values |
| Controller options | Yes | boolean, partial object, placement, render, color, backdrop |
| Hotkey options | Yes | boolean, string, string array, umbrellas and per-side entries |
| Animate options | Yes | `browsing`, `flip`, `cover` |
| Gesture options | Yes | swipe, dragExit, wheelZoom, pinchZoom, doubleTapZoom, touchAction |
| SSR/RSC entry | Yes | `react-zmage/ssr`, with browser actions only inside client-side execution |

### Prompt-Only Context

These choices guide the generated prompt but are not Zmage props:

| Choice | Purpose |
|---|---|
| Coding agent | Adjust wording for Codex, Claude, Cursor, Devin, or other agents |
| Project environment | Guide the user's agent toward the right import boundary and CSS entry |
| Project description | Give the user's agent local intent and constraints |
| Auto setup depth | Tell the user's agent to inspect files first and choose the right integration path |

## Page Layout

### Desktop

Use a two-column layout after the fixed top nav:

- Left column, about 56 percent width: title, choice flow, project description, copy actions.
- Right column, about 44 percent width: generated illustration, prompt preview, copy state.

The content should start immediately with the tool:

- Title: `Create your react-zmage agent prompt`
- Subtitle: `Choose Auto, or tune the integration details before copying the prompt to your coding agent.`
- Primary action: `Copy setup prompt`
- Secondary action: `Open llms.txt`

### Mobile

Use one column:

- Title and short explanation.
- Illustration as a shallow banner, or hidden behind a compact preview if vertical space is tight.
- Choice flow.
- Prompt preview collapsed by default behind `Preview prompt`.
- Sticky bottom copy button is acceptable if it does not cover content.

## Choice Flow

Default state should be Auto. Users should be able to copy a useful prompt without touching advanced controls.

### Step 1: Coding Agent

Options:

- Auto
- Codex
- Claude
- Cursor
- Devin
- Other

### Step 2: Setup Depth

Options:

- Auto
- Fine tune

Auto tips text:

> Keep Auto if you are not sure. Your agent will inspect your project structure, image source, rendering mode, and styling entry first, then choose the right Zmage mode and props.

### Step 3: Project Environment

Only shown when Fine tune is active.

Options:

- Auto
- Vite / CSR
- Next.js App Router / RSC
- SSR
- CMS / MDX / Markdown
- Event handler only

### Step 4: Usage Mode

Only shown when Fine tune is active.

Options:

- Auto
- Component
- Imperative
- Wrapper

### Step 5: Image Source

Only shown when Fine tune is active.

Options:

- Auto
- Single image
- Set gallery
- Captions
- Wrapper captions

### Step 6: Interaction

Only shown when Fine tune is active.

Options:

- Auto
- Preset auto
- Desktop tools
- Mobile gestures
- No browsing animation
- Custom controller

## Project Description

Add an optional textarea:

Placeholder:

> Describe your app, image source, and what the viewer should do.

This text is copied into the generated prompt. It does not affect Zmage props directly.

## Prompt Preview

The prompt preview should be segmented, not a raw textarea only. Segments:

1. Canonical reference
2. Your Configuration
3. Agent workflow
4. Installation
5. Required imports
6. Recommended integration
7. Configuration guidance
8. Common mistakes to avoid
9. Deliverables

The copy action copies the full assembled prompt.

## Generated Prompt Contract

The generated prompt should use this structure.

```md
> **Canonical reference:** https://zmage.caldis.me/llms.txt
>
> If anything below looks outdated or contradicts real package behavior, fetch that URL first. It is the source of truth for react-zmage usage modes, props, defaults, SSR entry, and common pitfalls. Report staleness back to the user.

---

# react-zmage Setup Guide

## Your Configuration

| Setting | Value |
|---------|-------|
| Coding Tool | {{agent}} |
| Project Environment | {{environment}} |
| Setup Depth | {{depth}} |
| Usage Mode | {{mode}} |
| Image Source | {{imageSource}} |
| Interaction Detail | {{interaction}} |

**Project Description:** {{projectDescription}}

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

```bash
pnpm add react-zmage
```

Use npm, yarn, or bun instead if the project uses one of those.

---

## Required Imports

For normal client-side React:

```tsx
import Zmage from 'react-zmage'
import 'react-zmage/style.css'
```

For SSR or RSC-sensitive code:

```tsx
import Zmage from 'react-zmage/ssr'
import 'react-zmage/style.css'
```

Do not call `Zmage.browsing()` during server render. Call it from event handlers or client effects only.

---

## Recommended Integration

{{dynamicModeInstructions}}

---

## Configuration Guidance

{{dynamicPropGuidance}}

---

## Common Mistakes To Avoid

- Do not forget `import 'react-zmage/style.css'`.
- Do not use `new Zmage()`.
- Do not confuse the static method `Zmage.browsing()` with the controlled `browsing` prop.
- In Wrapper mode, put `src`, `alt`, and native image attributes on child `<img>` elements, not on `<Zmage.Wrapper>`.
- In Wrapper mode, remember that newly injected images are bound after the wrapper re-renders.
- For dark UIs, set `backdrop` and controller colors deliberately.
- For Next.js App Router or RSC, keep interactive viewer usage inside a client boundary.

---

## Deliverables

Return:

1. Install command.
2. Files changed.
3. Final React code.
4. Where `react-zmage/style.css` is imported.
5. Any SSR/RSC notes.
6. Minimal verification steps.
```

## Dynamic Prompt Rules

### Auto Depth

When Setup Depth is Auto:

- Do not force a usage mode.
- Tell the agent to infer mode from project files.
- Still include the three mode definitions.
- Tell the agent to ask at most 3 questions only when inference is not enough.
- Recommend `preset="auto"` unless project evidence suggests a fixed desktop or mobile viewer.

### Fine Tune Depth

When Fine tune is active:

- Use selected environment to guide import and SSR notes.
- Use selected usage mode if not Auto.
- Use selected image source to add `set`, `caption`, or Wrapper caption guidance.
- Use selected interaction profile to add only the relevant prop hints.

### Mode-Specific Guidance

Component mode guidance:

- Replace owned `<img>` elements with `<Zmage>`.
- Preserve native image attributes such as `alt`, `className`, `loading`, `width`, and `height`.
- Use `set` for galleries.

Imperative mode guidance:

- Import `Zmage`.
- Call `Zmage.browsing(props)` from an event handler or client effect.
- Store and call the returned destructor when the host lifecycle needs cleanup.
- Guard server-side execution.

Wrapper mode guidance:

- Wrap the subtree with `<Zmage.Wrapper>`.
- Keep `src`, `alt`, and native image attributes on descendant `<img>` nodes.
- Put viewer config on `<Zmage.Wrapper>`.
- If using shared `set`, clicked image `src` should match `set[i].src`.
- Without explicit `set`, `data-zmage-caption` or nearest `figcaption` can supply caption text.

### Interaction Guidance

Preset auto:

- Use omitted `preset` or `preset="auto"`.
- Explain that auto resolves based on pointer and hover capability on the client.

Desktop tools:

- Prefer controller and hotKey defaults.
- Mention wheel zoom only while already zoomed.

Mobile gestures:

- Prefer `preset="mobile"` only if the page deliberately wants mobile behavior.
- Mention swipe, drag exit, pinch zoom, and double tap zoom.

No browsing animation:

- Use `animate={{ browsing: false }}`.
- Explain that this removes viewer open and close transitions.

Custom controller:

- Use `controller.render` only when the host needs full custom UI.
- Otherwise prefer partial `controller` options.

## Illustration

Use `gpt-image-2` to generate a high-quality raster illustration. Save the final asset to:

`packages/home/public/ai-onboarding/prompt-setup.png`

Prompt:

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

The illustration should support the page without carrying critical information. The UI must still work if the image fails to load.

## Motion

Do not add a new motion library.

Use CSS transitions and existing Radix/Tailwind patterns:

- Option hover and focus: 150ms.
- Auto to Fine tune reveal: opacity and translateY, 220ms.
- Prompt preview segment update: opacity, 180ms.
- Copy success: Copy icon changes to Check for 1500ms.
- Illustration: one-time fade in only.

Only animate `opacity` and `transform`. Do not animate layout properties.

Respect reduced motion:

- If `prefers-reduced-motion: reduce`, remove translate transitions and keep only immediate state changes or short opacity changes.

## React Performance Notes

- Put option definitions in module-level constants.
- Keep state small: store choices and project description only.
- Generate the prompt with a pure `buildPrompt(config)` function.
- Use `useMemo` for prompt assembly.
- Use primitive dependencies for memoized values.
- Use a reusable copy hook with timer cleanup.
- Do not store the full prompt in React state.
- Do not fetch anything at runtime for this page.

## File Boundaries

Create:

- `packages/home/src/routes/AISetup.tsx`: page layout and interaction state.
- `packages/home/src/aiPrompt/types.ts`: setup state and option value types.
- `packages/home/src/aiPrompt/options.ts`: static option definitions and labels.
- `packages/home/src/aiPrompt/buildPrompt.ts`: pure prompt builder.
- `packages/home/public/ai-onboarding/prompt-setup.png`: generated illustration.

Modify:

- `packages/home/src/App.tsx`: add `/ai` route.
- `packages/home/src/components/TopNav.tsx`: add AI Setup nav item.
- `packages/home/src/routes/Home.tsx`: replace the current AI directive block with quick copy plus link to `/ai`.
- `packages/home/src/i18n/de.ts`, `en.ts`, `es.ts`, `fr.ts`, `ja.ts`, `ko.ts`, `zh-CN.ts`: add translated UI copy.
- `packages/llms-eval/agent-onboarding/rubric.mjs`: remove old `txt` prop tolerance.

Do not modify root `llms.txt` unless implementation introduces a new official contract that is not already represented there.

## Accessibility

- All option controls must be real buttons or radio-like controls with clear selected state.
- The copy button must expose success state with text, not only icon change.
- The prompt preview must be keyboard reachable.
- The textarea must have a visible label.
- Focus states must remain visible in light and dark themes.
- Generated illustration must have empty alt text if decorative, or concise alt text if it conveys the three-mode concept.

## Error Handling

- If clipboard write fails, show a small inline failure message and keep the prompt selectable.
- If the illustration fails to load, hide the image area without breaking the prompt flow.
- If project description is empty, generated prompt should use `(Not provided)`.

## Testing Strategy

Implementation should verify:

1. Home build:

```bash
pnpm --filter react-zmage-home run build
```

2. LLM contract tests:

```bash
pnpm --filter llms-eval run test
```

3. Whitespace:

```bash
git diff --check
```

Manual browser review is still needed for actual animation and visual polish. The agent should not claim GUI behavior was fully verified without a human browser check.

## Open Decisions

- The route should be `/ai`.
- The top-nav label should be `AI Setup`.
- Auto should be the default.
- Fine tune should be progressive disclosure, not a separate page.
- The old one-line prompt should stay as a quick action.

These decisions are fixed for the initial implementation unless the maintainer requests changes.
