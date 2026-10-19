import type { Metadata } from 'next'
import { OG_IMAGE } from '@/lib/metadata'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import './flight.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import { CookieConsent } from '@/components/CookieConsent'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.getrequest.io'),
  title: {
    default: 'getrequest — API Reliability Layer · Relay · Retain · Recover',
    template: '%s — getrequest',
  },
  description: 'getrequest sits between your callers and your API. It relays every request, records the full exchange, retries async deliveries automatically, and lets you replay what failed.',
  openGraph: {
    siteName: 'getrequest',
    type: 'website',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: [{ url: '/favicon.ico' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Nav />
        {children}
        <Footer />
        <ScrollAnimations />
        <CookieConsent />
      </body>
    </html>
  )
}
