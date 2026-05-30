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
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
