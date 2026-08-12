'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

const GTM_ID = 'GTM-TFWRCPJR'
const DISMISSED_KEY = 'gr_cookie_notice_dismissed'

export function CookieConsent() {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    setDismissed(window.localStorage.getItem(DISMISSED_KEY) === '1')
  }, [])

  function dismiss() {
    window.localStorage.setItem(DISMISSED_KEY, '1')
    setDismissed(true)
  }

  return (
    <>
      <Script id="gtm-script" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {!dismissed && (
        <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie notice">
          <div className="cookie-banner__inner">
            <p className="cookie-banner__text">
              We use cookies to run and improve this site. See our{' '}
              <Link href="/privacy-policy" className="cookie-banner__link">Privacy Policy</Link> for details.
            </p>
            <div className="cookie-banner__actions">
              <button type="button" className="btn btn-primary btn-sm" onClick={dismiss}>Got it</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
