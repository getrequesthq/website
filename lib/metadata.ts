import type { Metadata } from 'next'

const BASE_URL = 'https://getrequest.io'
const SITE_NAME = 'getrequest'
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
      images: [
        {
          url: `/og?title=${encodeURIComponent(resolvedOgTitle)}&desc=${encodeURIComponent(description.slice(0, 120))}`,
          width: 1200,
          height: 630,
          alt: resolvedOgTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedOgTitle,
      description,
      images: [`/og?title=${encodeURIComponent(resolvedOgTitle)}&desc=${encodeURIComponent(description.slice(0, 120))}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  }
}
