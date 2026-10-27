import { getAllPosts } from '@/lib/blog'

// NLWeb Schema Map: which schema.org types each page publishes as JSON-LD. Referenced from robots.txt.
export const dynamic = 'force-static'

const BASE_URL = 'https://www.getrequest.io'

const PAGES: { path: string; types: string[] }[] = [
  { path: '/', types: ['Organization', 'WebSite', 'SoftwareApplication', 'HowTo'] },
  { path: '/pricing', types: ['FAQPage', 'BreadcrumbList'] },
  { path: '/features', types: ['BreadcrumbList'] },
  { path: '/use-cases', types: ['BreadcrumbList'] },
  { path: '/blog', types: ['BreadcrumbList'] },
]

export function GET() {
  const today = new Date().toISOString().slice(0, 10)
  const entries = [
    ...PAGES.map(p => ({ loc: `${BASE_URL}${p.path === '/' ? '/' : p.path}`, types: p.types, lastmod: today })),
    ...getAllPosts().map(post => ({ loc: `${BASE_URL}/blog/${post.slug}`, types: ['BlogPosting', 'BreadcrumbList'], lastmod: post.date })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<schemamap xmlns="http://www.nlweb.ai/schemas/schemamap/0.1">
${entries.map(e => `  <url>
    <loc>${e.loc}</loc>
${e.types.map(t => `    <schema>https://schema.org/${t}</schema>`).join('\n')}
    <lastmod>${e.lastmod}</lastmod>
  </url>`).join('\n')}
  <feed>
    <loc>${BASE_URL}/feed.xml</loc>
    <type>rss</type>
  </feed>
</schemamap>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
