import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ScrollAnimations } from '@/components/ScrollAnimations'

const GTM_ID = 'GTM-TFWRCPJR'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://getrequest.io'),
  title: {
    default: 'getrequest — API Reliability Layer · Relay · Retain · Recover',
    template: '%s — getrequest',
  },
  description: 'The API Reliability Layer for modern teams. Relay traffic safely, retain every request before it hits your backend, and recover from failures without losing a single payload.',
  openGraph: {
    siteName: 'getrequest',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} data-scroll-behavior="smooth">
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <a className="skip-link" href="#main">Skip to content</a>
        <Nav />
        {children}
        <Footer />
        <ScrollAnimations />
      </body>
    </html>
  )
}
