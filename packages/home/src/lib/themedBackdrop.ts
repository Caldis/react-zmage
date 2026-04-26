import { useTheme } from './theme'

/**
 * Returns a backdrop color string aligned with the current site theme.
 *
 * The lib (`react-zmage`) is theme-agnostic by design — it only accepts a
 * `backdrop` prop (default `#FFFFFF`). When the site is dark and we omit
 * `backdrop`, the modal opens with a white panel and any white control-bar
 * icons become invisible. This hook gives demo/docs callers a single source
 * of truth for "the backdrop that matches the current page chrome".
 *
 * Playground component/imperative/wrapper modes still let the user override
 * `backdrop` explicitly via the schema — we only apply this as a default
 * when the user hasn't picked one.
 */
export function useThemedBackdrop (): string {
  const { resolved } = useTheme()
  return resolved === 'dark' ? '#0a0a0a' : '#fafafa'
}
