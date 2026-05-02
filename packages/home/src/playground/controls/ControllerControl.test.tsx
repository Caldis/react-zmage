import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { TooltipProvider } from '@/components/ui/tooltip'
import { I18nProvider } from '@/i18n/useT'
import { ControllerControl } from './ControllerControl'

function renderNumberInputValues (layout: Record<string, unknown>) {
  const html = renderToStaticMarkup(
    <I18nProvider>
      <TooltipProvider>
        <ControllerControl
          value={{ layout }}
          onChange={() => {}}
        />
      </TooltipProvider>
    </I18nProvider>,
  )

  return Array.from(html.matchAll(/type="number"[^>]*value="([^"]*)"/g), match => match[1])
}

describe('ControllerControl', () => {
  it('shows layout defaults that match core behavior before the user touches sliders', () => {
    expect(renderNumberInputValues({ pagination: { inset: 24 }, caption: { inset: 60 } })).toEqual(['12', '0', '24', '60'])
  })

  it('uses core-aligned fallback values when a layout target is missing', () => {
    expect(renderNumberInputValues({})).toEqual(['12', '0', '24', '60'])
  })
})
