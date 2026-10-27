import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
  // Markdown twins for unknown paths render at request time (markdown 404s), so the route needs its sources at runtime.
  outputFileTracingIncludes: {
    '/markdown/[[...path]]': ['./content/**/*', './public/llms.txt'],
  },
  async redirects() {
    return [
      { source: '/docs', destination: 'https://docs.getrequest.io', permanent: false },
      { source: '/docs/llms.txt', destination: 'https://docs.getrequest.io/llms.txt', permanent: false },
    ]
  },
}

export default withMDX(nextConfig)
