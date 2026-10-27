import { getMarkdown, markdownPaths } from '@/lib/markdown'

// Every markdown twin concatenated, for agents that want the whole site in one fetch. /llms.txt is the short index.
export const dynamic = 'force-static'

export function GET() {
  const sections = markdownPaths()
    .filter(p => p !== 'llms' && p !== 'agents')
    .map(p => getMarkdown(`/${p}`))
    .filter((body): body is string => body !== null)

  return new Response(sections.join('\n\n---\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
