import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ScrollAnimations } from '@/components/ScrollAnimations'

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
    default: 'getrequest — API Reliability Infrastructure for Modern Teams',
    template: '%s — getrequest',
  },
  description: 'API reliability infrastructure for modern teams. Launch endpoints, observe every request, and replay failures — without managing gateways, servers, or observability stacks.',
  openGraph: {
    siteName: 'getrequest',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Nav />
        {children}
        <Footer />
        <ScrollAnimations />
      </body>
    </html>
  )
}
