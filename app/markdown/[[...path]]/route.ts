import { getMarkdown, markdownPaths, notFoundMarkdown } from '@/lib/markdown'
import { BASE_URL } from '@/lib/site'

// Internal target of proxy.ts rewrites (`/pricing.md`, `Accept: text/markdown`, AI crawler UAs, `?mode=agent`).
// Unknown paths render at request time so they can return a markdown 404.
export const dynamicParams = true

export function generateStaticParams() {
  return markdownPaths().map(p => ({ path: p === '' ? [] : p.split('/') }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await params
  const pagePath = `/${path.join('/')}`
  const body = getMarkdown(pagePath)
  const canonical = pagePath === '/' || pagePath === '/agents'
    ? BASE_URL
    : pagePath === '/llms' ? `${BASE_URL}/llms.txt` : `${BASE_URL}${pagePath}`

  const headers = {
    'Content-Type': 'text/markdown; charset=utf-8',
    'Vary': 'Accept, User-Agent',
    'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    'Access-Control-Allow-Origin': '*',
  }

  if (body === null) {
    return new Response(notFoundMarkdown(pagePath), { status: 404, headers })
  }

  return new Response(body, {
    headers: { ...headers, 'Link': `<${canonical}>; rel="canonical"` },
  })
}
