import { getAgentSkills } from '@/lib/agent-discovery'

export const dynamicParams = false

export function generateStaticParams() {
  return getAgentSkills().map(skill => ({ name: skill.name }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const skill = getAgentSkills().find(s => s.name === name)
  if (!skill) return new Response('Not found', { status: 404 })
  return new Response(skill.content, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Access-Control-Allow-Origin': '*' },
  })
}
