import * as React from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window { gtag?: (...args: any[]) => void }
}

/** Fires `page_view` to GA on every react-router location change (initial mount + every navigate). */
export function useAnalyticsPageviews () {
  const { pathname, hash } = useLocation()
  React.useEffect(() => {
    if (typeof window.gtag !== 'function') return
    window.gtag('event', 'page_view', {
      page_path: pathname + hash,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, hash])
}
