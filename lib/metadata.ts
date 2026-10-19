import type { Metadata } from 'next'

const BASE_URL = 'https://www.getrequest.io'
const SITE_NAME = 'getrequest'

// Static share image (the getrequest mark), served as a plain file so every crawler gets a 200 PNG with no redirect.
export const OG_IMAGE = { url: '/og.png', width: 1200, height: 630, type: 'image/png', alt: 'getrequest' }
const DEFAULT_DESCRIPTION = 'The API Reliability Layer for modern teams. Relay traffic safely, retain every request before it hits your backend, and recover from failures without losing a single payload.'

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  ogTitle,
  type = 'website',
}: {
  title: string
  description?: string
  path?: string
  ogTitle?: string
  type?: 'website' | 'article'
}): Metadata {
  const url = `${BASE_URL}${path}`
  const resolvedOgTitle = ogTitle ?? title

  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: resolvedOgTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedOgTitle,
      description,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  }
}
