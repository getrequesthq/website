import { docsMcpServerCard } from '@/lib/agent-discovery'

export const dynamic = 'force-static'

export function GET() {
  return new Response(JSON.stringify(docsMcpServerCard(), null, 2), {
    headers: {
      'Content-Type': 'application/mcp-server-card+json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
