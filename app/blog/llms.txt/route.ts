import { blogIndexMarkdown } from '@/lib/markdown'

export const dynamic = 'force-static'

export function GET() {
  return new Response(blogIndexMarkdown(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
