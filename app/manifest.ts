import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'getrequest',
    short_name: 'getrequest',
    description: 'API reliability infrastructure for modern teams.',
    start_url: '/',
    display: 'browser',
    background_color: '#06080f',
    theme_color: '#06080f',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  }
}
