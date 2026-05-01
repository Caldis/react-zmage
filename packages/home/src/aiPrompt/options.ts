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
