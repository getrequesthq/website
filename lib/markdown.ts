import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { BASE_URL } from '@/lib/site'

// Markdown twins of site pages, served at `<page>.md`, via `Accept: text/markdown`, and to AI crawlers (see proxy.ts).
// The marketing pages are hand-written in content/markdown/ — update them when page copy changes.
const MARKDOWN_DIR = path.join(process.cwd(), 'content/markdown')
const LEGAL_DIR = path.join(process.cwd(), 'content/legal')

const STATIC_PAGES: Record<string, string> = {
  '': 'index.md',
  features: 'features.md',
  pricing: 'pricing.md',
  'use-cases': 'use-cases.md',
  agents: 'agents.md',
}

const LEGAL_PAGES: Record<string, { file: string; title: string }> = {
  'privacy-policy': { file: 'privacy-policy.mdx', title: 'Privacy Policy' },
  'terms-of-use': { file: 'terms-of-use.mdx', title: 'Terms of Use' },
}

// Paths (without leading slash or `.md`) that have a markdown twin.
export function markdownPaths(): string[] {
  return [
    ...Object.keys(STATIC_PAGES),
    ...Object.keys(LEGAL_PAGES),
    'llms',
    'blog',
    ...getAllPosts().map(post => `blog/${post.slug}`),
  ]
}

// Public URL of a page's markdown twin, e.g. '/' -> /index.md, '/pricing' -> /pricing.md
export function markdownUrlFor(pagePath: string): string {
  const clean = pagePath.replace(/^\/+|\/+$/g, '')
  return `${BASE_URL}/${clean || 'index'}.md`
}

export function getMarkdown(pagePath: string): string | null {
  const key = pagePath.replace(/^\/+|\/+$/g, '').replace(/\.md$/, '')
  const normalized = key === 'index' ? '' : key

  if (normalized in STATIC_PAGES) {
    return fs.readFileSync(path.join(MARKDOWN_DIR, STATIC_PAGES[normalized]), 'utf8')
  }

  if (normalized in LEGAL_PAGES) {
    const { file, title } = LEGAL_PAGES[normalized]
    const { content } = matter(fs.readFileSync(path.join(LEGAL_DIR, file), 'utf8'))
    return `# ${title}\n\n${content.trim()}\n`
  }

  if (normalized === 'llms') {
    return fs.readFileSync(path.join(process.cwd(), 'public/llms.txt'), 'utf8')
  }

  if (normalized === 'blog') {
    return blogIndexMarkdown()
  }

  if (normalized.startsWith('blog/')) {
    const post = getPostBySlug(normalized.slice('blog/'.length))
    if (!post || post.draft) return null
    return [
      `# ${post.title}`,
      '',
      `> ${post.description}`,
      '',
      `By ${post.author} · ${post.date} · ${post.readingTime} · Tags: ${post.tags.join(', ')}`,
      '',
      post.content.trim(),
      '',
      '---',
      '',
      `Canonical: ${BASE_URL}/blog/${post.slug} · More posts: ${BASE_URL}/blog.md`,
      '',
    ].join('\n')
  }

  return null
}

export function blogIndexMarkdown(): string {
  const posts = getAllPosts()
  return [
    '# getrequest blog',
    '',
    'Technical articles on API reliability, infrastructure, and developer tooling from the getrequest team.',
    '',
    ...posts.map(post => `- [${post.title}](${BASE_URL}/blog/${post.slug}.md) (${post.date}): ${post.description}`),
    '',
    `RSS: ${BASE_URL}/feed.xml`,
    '',
  ].join('\n')
}

export function notFoundMarkdown(pagePath: string): string {
  return [
    '# 404: Page not found',
    '',
    `There is no page at \`${pagePath}\` on getrequest.io. It may have moved or never existed.`,
    '',
    'Where to go instead:',
    '',
    `- [Site index for agents (llms.txt)](${BASE_URL}/llms.txt)`,
    `- [Homepage (markdown)](${BASE_URL}/index.md)`,
    `- [Sitemap](${BASE_URL}/sitemap.xml)`,
    '- [Documentation](https://docs.getrequest.io)',
    '',
  ].join('\n')
}
