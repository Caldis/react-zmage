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
