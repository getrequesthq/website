// First-touch attribution for the signup flow. The app (app.getrequest.io/register) reads the
// `gr_attribution` cookie this writes — a URI-encoded JSON object — and stores it with the new
// account. The cookie lives on the parent domain so both sites can see it.
export const ATTRIBUTION_COOKIE = 'gr_attribution'
export const ATTRIBUTION_DOMAIN = 'getrequest.io'
const MAX_AGE_SECONDS = 90 * 24 * 60 * 60
const MAX_VALUE_LENGTH = 200
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number] | 'referrer' | 'landing_page', string>>

const isOwnHost = (host: string) => host === ATTRIBUTION_DOMAIN || host.endsWith(`.${ATTRIBUTION_DOMAIN}`)

const hasSignal = (a: Attribution | null) =>
  Boolean(a && (a.utm_source || a.utm_medium || a.utm_campaign || a.referrer))

export function parseAttributionCookie(cookieHeader: string): Attribution | null {
  const match = cookieHeader.match(new RegExp(`(?:^|; )${ATTRIBUTION_COOKIE}=([^;]*)`))
  if (!match) return null

  try {
    const parsed = JSON.parse(decodeURIComponent(match[1]))
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

/**
 * Returns the attribution to store for this page view, or null to leave the cookie as is.
 * First touch wins: an existing cookie is only replaced when it carries no signal (a direct
 * visit) and this visit does (UTMs or an external referrer).
 */
export function nextAttribution(input: {
  existing: Attribution | null
  search: string
  referrer: string
  hostname: string
  pathname: string
}): Attribution | null {
  if (!isOwnHost(input.hostname)) return null

  const params = new URLSearchParams(input.search)
  const next: Attribution = {}

  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) next[key] = value.slice(0, MAX_VALUE_LENGTH)
  }

  try {
    const referrerHost = input.referrer ? new URL(input.referrer).hostname : ''
    if (referrerHost && !isOwnHost(referrerHost)) next.referrer = input.referrer.slice(0, MAX_VALUE_LENGTH)
  } catch {
    // malformed referrer: ignore it
  }

  if (input.existing && (hasSignal(input.existing) || !hasSignal(next))) return null

  next.landing_page = input.pathname.slice(0, MAX_VALUE_LENGTH)
  return next
}

export function serializeAttributionCookie(attribution: Attribution): string {
  return (
    `${ATTRIBUTION_COOKIE}=${encodeURIComponent(JSON.stringify(attribution))}` +
    `; max-age=${MAX_AGE_SECONDS}; path=/; domain=.${ATTRIBUTION_DOMAIN}; SameSite=Lax; Secure`
  )
}
