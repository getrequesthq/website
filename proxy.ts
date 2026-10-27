import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BASE_URL = 'https://www.getrequest.io'

// AI assistants and crawlers that get the markdown twin even when they ask for HTML.
const AI_AGENT_UA = /GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|Claude-User|Claude-SearchBot|anthropic-ai|PerplexityBot|Perplexity-User/i

function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false
  let markdownQ = 0
  let htmlQ = 0
  for (const range of accept.toLowerCase().split(',')) {
    const [type, ...params] = range.split(';').map(s => s.trim())
    const qParam = params.find(p => p.startsWith('q='))
    const q = qParam ? Number.parseFloat(qParam.slice(2)) || 0 : 1
    if (type === 'text/markdown') markdownQ = Math.max(markdownQ, q)
    if (type === 'text/html') htmlQ = Math.max(htmlQ, q)
  }
  return markdownQ > 0 && markdownQ >= htmlQ
}

function rewriteToMarkdown(request: NextRequest, pagePath: string, vary: string) {
  const target = request.nextUrl.clone()
  target.pathname = pagePath === '/' ? '/markdown' : `/markdown${pagePath}`
  target.search = ''
  const response = NextResponse.rewrite(target)
  response.headers.set('Vary', vary)
  return response
}

function markdownTwin(pathname: string): string {
  return pathname === '/' ? '/index.md' : `${pathname.replace(/\/$/, '')}.md`
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Leave client-side navigations and non-read requests alone.
  if (!['GET', 'HEAD'].includes(request.method) || request.headers.has('rsc') || request.headers.has('next-router-prefetch')) {
    return NextResponse.next()
  }

  // Explicit markdown URLs: /index.md, /pricing.md, /blog/<slug>.md
  if (pathname.endsWith('.md')) {
    const pagePath = pathname.slice(0, -'.md'.length)
    return rewriteToMarkdown(request, pagePath === '/index' ? '/' : pagePath, 'Accept')
  }

  // ?mode=agent: the homepage gets the agent overview, other pages their markdown twin.
  if (searchParams.get('mode') === 'agent') {
    return rewriteToMarkdown(request, pathname === '/' ? '/agents' : pathname, 'Accept')
  }

  if (prefersMarkdown(request.headers.get('accept'))) {
    return rewriteToMarkdown(request, pathname, 'Accept')
  }

  if (AI_AGENT_UA.test(request.headers.get('user-agent') ?? '')) {
    return rewriteToMarkdown(request, pathname, 'Accept, User-Agent')
  }

  const response = NextResponse.next()
  response.headers.set('Vary', 'Accept')
  response.headers.set('Link', [
    `<${BASE_URL}${markdownTwin(pathname)}>; rel="alternate"; type="text/markdown"`,
    `<${BASE_URL}/sitemap.xml>; rel="sitemap"`,
    `<${BASE_URL}/llms.txt>; rel="describedby"; type="text/plain"`,
    `<${BASE_URL}/.well-known/api-catalog>; rel="api-catalog"`,
    `<${BASE_URL}/.well-known/ard.json>; rel="ard"`,
    `<${BASE_URL}/.well-known/ai-catalog.json>; rel="ai-catalog"`,
  ].join(', '))
  return response
}

export const config = {
  matcher: [
    // Pages and `.md` twins only — not Next internals, the markdown route itself, /.well-known, or static assets.
    '/((?!_next/|markdown(?:/|$)|\\.well-known/|.*\\.(?:png|svg|ico|jpg|jpeg|gif|webp|avif|txt|xml|json|js|css|map|woff2?|webmanifest)$).*)',
  ],
}
