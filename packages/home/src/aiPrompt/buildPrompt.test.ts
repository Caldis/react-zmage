import { describe, expect, it } from 'vitest'
import { buildAiPrompt } from './buildPrompt'
import type { AiPromptConfig, PromptLabels } from './types'

const labels: PromptLabels = {
  agent: {
    auto: 'Auto',
    codex: 'Codex',
    claude: 'Claude',
    cursor: 'Cursor',
    devin: 'Devin',
    other: 'Other',
  },
  depth: {
    auto: 'Auto',
    fine: 'Fine tune',
  },
  environment: {
    auto: 'Auto',
    vite: 'Vite / CSR',
    'next-rsc': 'Next.js App Router / RSC',
    ssr: 'SSR',
    'cms-mdx': 'CMS / MDX / Markdown',
    event: 'Event handler only',
  },
  mode: {
    auto: 'Auto',
    component: 'Component',
    imperative: 'Imperative',
    wrapper: 'Wrapper',
  },
  imageSource: {
    auto: 'Auto',
    single: 'Single image',
    set: 'Set gallery',
    caption: 'Captions',
    'wrapper-caption': 'Wrapper captions',
  },
  interaction: {
    auto: 'Auto',
    'preset-auto': 'Preset auto',
    'desktop-tools': 'Desktop tools',
    'mobile-gestures': 'Mobile gestures',
    'no-browsing-animation': 'No browsing animation',
    'custom-controller': 'Custom controller',
  },
}

const baseConfig: AiPromptConfig = {
  agent: 'auto',
  depth: 'auto',
  environment: 'auto',
  mode: 'auto',
  imageSource: 'auto',
  interaction: 'auto',
  projectDescription: '',
}

describe('buildAiPrompt', () => {
  it('uses translated Auto labels and tells the agent to inspect the project', () => {
    const prompt = buildAiPrompt(baseConfig, labels)

    expect(prompt).toContain('| Coding Tool | Auto |')
    expect(prompt).toContain('| Project Environment | Auto |')
    expect(prompt).toContain('turning existing images into a fullscreen')
    expect(prompt).toContain('Ask the user short follow-up questions until the scope is concrete')
    expect(prompt).toContain('Implement one pilot change on a representative image path')
  })

  it('ignores stale fine-tune choices when setup depth is Auto', () => {
    const prompt = buildAiPrompt({
      ...baseConfig,
      depth: 'auto',
      environment: 'next-rsc',
      mode: 'wrapper',
      imageSource: 'wrapper-caption',
      interaction: 'custom-controller',
    }, labels)

    expect(prompt).toContain('| Project Environment | Auto |')
    expect(prompt).toContain('| Usage Mode | Auto |')
    expect(prompt).toContain('| Image Source | Auto |')
    expect(prompt).toContain('| Interaction Detail | Auto |')
    expect(prompt).toContain('Use Auto mode selection')
    expect(prompt).not.toContain('Use Wrapper mode.')
    expect(prompt).not.toContain('Use `controller.render`')
  })

  it('uses human labels for fine-tuned choices instead of raw enum values', () => {
    const prompt = buildAiPrompt({
      ...baseConfig,
      depth: 'fine',
      environment: 'next-rsc',
      mode: 'wrapper',
      imageSource: 'wrapper-caption',
      interaction: 'no-browsing-animation',
      projectDescription: 'A Next.js gallery sourced from MDX.',
    }, labels)

    expect(prompt).toContain('| Project Environment | Next.js App Router / RSC |')
    expect(prompt).toContain('| Usage Mode | Wrapper |')
    expect(prompt).toContain('| Image Source | Wrapper captions |')
    expect(prompt).toContain('| Interaction Detail | No browsing animation |')
    expect(prompt).not.toContain('next-rsc')
    expect(prompt).not.toContain('wrapper-caption')
    expect(prompt).not.toContain('no-browsing-animation')
  })
})
