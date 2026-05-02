import type { BaseType } from 'react-zmage'

export const siteZmageAnimate = {
  slowMotion: true,
} satisfies NonNullable<BaseType['animate']>

export const siteZmageController = {
  layout: {
    pagination: { inset: { bottom: '1.35rem' } },
    caption: { inset: { bottom: '4rem' } },
    mobile: {
      pagination: { inset: { bottom: '2.75rem' } },
      caption: { inset: { bottom: '5.25rem' } },
    },
  },
} satisfies NonNullable<BaseType['controller']>

export function withSiteSlowMotion (animate?: BaseType['animate']): BaseType['animate'] {
  if (animate === false) return false
  return {
    ...(typeof animate === 'object' && animate ? animate : {}),
    slowMotion: true,
  }
}
