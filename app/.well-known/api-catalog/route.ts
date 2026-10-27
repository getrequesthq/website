import { apiCatalog } from '@/lib/agent-discovery'

export const dynamic = 'force-static'

export function GET() {
  return new Response(JSON.stringify(apiCatalog(), null, 2), {
    headers: {
      'Content-Type': 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
