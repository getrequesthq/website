'use client'

import { useEffect } from 'react'
import {
  nextAttribution,
  parseAttributionCookie,
  serializeAttributionCookie,
} from '@/lib/attribution'

// Records where a visitor first came from so the app can attach it at signup. Renders nothing.
export function AttributionCookie() {
  useEffect(() => {
    const attribution = nextAttribution({
      existing: parseAttributionCookie(document.cookie),
      search: window.location.search,
      referrer: document.referrer,
      hostname: window.location.hostname,
      pathname: window.location.pathname,
    })

    if (attribution) document.cookie = serializeAttributionCookie(attribution)
  }, [])

  return null
}
