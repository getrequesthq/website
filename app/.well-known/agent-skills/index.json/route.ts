import { agentSkillsIndex } from '@/lib/agent-discovery'

export const dynamic = 'force-static'

export function GET() {
  return Response.json(agentSkillsIndex(), {
    headers: { 'Access-Control-Allow-Origin': '*' },
  })
}
