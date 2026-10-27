import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BASE_URL, DOCS_MCP_URL } from '@/lib/site'

// Agent skills mirrored from github.com/getrequesthq/agent-skills — keep content/skills/ in sync with that repo.
const SKILLS_DIR = path.join(process.cwd(), 'content/skills')

export interface AgentSkill {
  name: string
  description: string
  content: string
}

export function getAgentSkills(): AgentSkill[] {
  if (!fs.existsSync(SKILLS_DIR)) return []
  return fs.readdirSync(SKILLS_DIR)
    .filter(dir => fs.existsSync(path.join(SKILLS_DIR, dir, 'SKILL.md')))
    .sort()
    .map(dir => {
      const content = fs.readFileSync(path.join(SKILLS_DIR, dir, 'SKILL.md'), 'utf8')
      const { data } = matter(content)
      return { name: data.name ?? dir, description: data.description ?? '', content }
    })
}

export function agentSkillsIndex() {
  return {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: getAgentSkills().map(skill => ({
      name: skill.name,
      type: 'skill-md',
      description: skill.description,
      url: `/.well-known/agent-skills/${skill.name}/SKILL.md`,
      digest: `sha256:${crypto.createHash('sha256').update(skill.content).digest('hex')}`,
    })),
  }
}

export function docsMcpServerCard() {
  return {
    $schema: 'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json',
    name: 'io.getrequest/docs',
    title: 'getrequest docs',
    version: '1.0.0',
    description: 'Search and read the getrequest documentation: endpoint actions (Sync, Async, Static API), retries, authentication, limits, error responses, and replay.',
    websiteUrl: 'https://docs.getrequest.io',
    icons: [
      { src: `${BASE_URL}/icon.svg`, mimeType: 'image/svg+xml', sizes: ['any'] },
      { src: `${BASE_URL}/icon-512.png`, mimeType: 'image/png', sizes: ['512x512'] },
    ],
    remotes: [{ type: 'streamable-http', url: DOCS_MCP_URL }],
    url: DOCS_MCP_URL,
    transport: 'streamable-http',
    kind: 'docs',
  }
}

// Served at both /.well-known/ai-catalog.json and /.well-known/ard.json (Agentic Resource Discovery).
export function aiCatalog() {
  const skills = getAgentSkills()
  return {
    specVersion: '1.0',
    host: {
      displayName: 'getrequest',
      identifier: 'did:web:www.getrequest.io',
      documentationUrl: 'https://docs.getrequest.io',
    },
    entries: [
      {
        identifier: 'urn:air:getrequest.io:mcp:docs',
        displayName: 'getrequest docs MCP server',
        type: 'application/mcp-server-card+json',
        url: `${BASE_URL}/.well-known/mcp/server-card.json`,
        description: 'Search and read the getrequest documentation: endpoint actions, retries, authentication, limits, error responses, and replay.',
        tags: ['documentation', 'developer-docs', 'mcp', 'api-reliability', 'webhooks'],
        capabilities: ['search_docs', 'read_docs'],
        representativeQueries: [
          'how do getrequest async retries work',
          'what does a 504 from getrequest mean',
          'how do I verify Stripe webhooks with getrequest',
        ],
        auth: { status: 'none' },
        trustManifest: { identity: 'did:web:www.getrequest.io', identityType: 'did' },
      },
      {
        identifier: 'urn:air:getrequest.io:skills:index',
        displayName: 'getrequest agent skills',
        type: 'application/json',
        url: `${BASE_URL}/.well-known/agent-skills/index.json`,
        description: 'Agent skills for integrating an API with getrequest, capturing and verifying webhooks, and troubleshooting failed requests.',
        tags: ['agent-skills', 'integration', 'webhooks', 'troubleshooting'],
        capabilities: skills.map(skill => skill.name),
        auth: { status: 'none' },
        trustManifest: { identity: 'did:web:www.getrequest.io', identityType: 'did' },
      },
      {
        identifier: 'urn:air:getrequest.io:docs:llms-txt',
        displayName: 'getrequest llms.txt',
        type: 'text/plain',
        url: `${BASE_URL}/llms.txt`,
        description: 'Navigation index of getrequest pages, docs, and machine-readable resources for language models.',
        tags: ['llms-txt', 'documentation'],
        auth: { status: 'none' },
      },
    ],
  }
}

// RFC 9727 API catalog. getrequest has no public management API yet, so this points at the endpoint gateway and its docs.
export function apiCatalog() {
  return {
    linkset: [
      {
        anchor: `${BASE_URL}/`,
        item: [
          { href: 'https://e.getrequest.io/', title: 'getrequest endpoint gateway (https://e.getrequest.io/{endpoint_id})' },
        ],
        'service-doc': [
          { href: 'https://docs.getrequest.io/guides/reference', type: 'text/html', title: 'Limits, timeouts & error responses' },
          { href: 'https://docs.getrequest.io/llms.txt', type: 'text/plain', title: 'getrequest docs index for LLMs' },
        ],
        'service-meta': [
          { href: `${BASE_URL}/.well-known/ai-catalog.json`, type: 'application/json', title: 'AI catalog' },
        ],
        describedby: [
          { href: `${BASE_URL}/agents.md`, type: 'text/markdown', title: 'getrequest for AI agents' },
        ],
      },
    ],
  }
}
