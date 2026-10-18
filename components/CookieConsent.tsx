'use client'

import { useEffect, useSyncExternalStore } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { AttributionCookie } from '@/components/AttributionCookie'
import { ATTRIBUTION_COOKIE, ATTRIBUTION_DOMAIN } from '@/lib/attribution'

const GTM_ID = 'GTM-TFWRCPJR'
// Not the old `gr_cookie_notice_dismissed` key: "Got it" only acknowledged a notice, so those
// visitors are asked again rather than being treated as having consented.
const CONSENT_KEY = 'gr_cookie_consent'

type Consent = 'accepted' | 'declined'

const listeners = new Set<() => void>()
let trackingLoadedThisPage = false

function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY)
    return value === 'accepted' || value === 'declined' ? value : null
  } catch {
    return null
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener('storage', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', listener)
  }
}

function setConsent(next: Consent | null) {
  try {
    if (next) window.localStorage.setItem(CONSENT_KEY, next)
    else window.localStorage.removeItem(CONSENT_KEY)
  } catch {
    // storage unavailable: the choice just won't persist across visits
  }

  if (next === 'declined') {
    document.cookie = `${ATTRIBUTION_COOKIE}=; max-age=0; path=/; domain=.${ATTRIBUTION_DOMAIN}`

    // Tag Manager was already loaded this page view: reload so it stops running.
    if (trackingLoadedThisPage) {
      window.location.reload()
      return
    }
  }

  listeners.forEach((listener) => listener())
}

// Tag Manager and the attribution cookie run only after "Accept". Until the visitor chooses (or
// after they decline) neither is loaded. The server snapshot is 'pending' so nothing renders or
// loads before hydration.
export function CookieConsent() {
  const consent = useSyncExternalStore<Consent | null | 'pending'>(subscribe, readConsent, () => 'pending')

  useEffect(() => {
    if (consent === 'accepted') trackingLoadedThisPage = true
  }, [consent])

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
          <AttributionCookie />
        </>
      )}

      {consent === null && (
        <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie notice">
          <div className="cookie-banner__inner">
            <p className="cookie-banner__text">
              We use cookies to run and improve this site and to understand where visitors come from. See our{' '}
              <Link href="/privacy-policy" className="cookie-banner__link">Privacy Policy</Link> for details.
            </p>
            <div className="cookie-banner__actions">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConsent('declined')}>Decline</button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setConsent('accepted')}>Accept</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Lets a visitor change their mind: clearing the stored choice shows the banner again.
export function CookieSettingsButton() {
  return (
    <button type="button" className="footer__link footer__link--button" onClick={() => setConsent(null)}>
      Cookie settings
    </button>
  )
}
