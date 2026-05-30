import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  readingTime: string
  draft?: boolean
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug: file.replace('.mdx', ''),
        title: data.title,
        description: data.description,
        date: data.date,
        author: data.author ?? 'Santosh Baggam',
        tags: data.tags ?? [],
        readingTime: readingTime(content).text,
        draft: data.draft ?? false,
      } as PostMeta
    })
    .filter(p => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    author: data.author ?? 'Santosh Baggam',
    tags: data.tags ?? [],
    readingTime: readingTime(content).text,
    draft: data.draft ?? false,
    content,
  }
}

export function getAllTags(): string[] {
  return [...new Set(getAllPosts().flatMap(p => p.tags))].sort()
}
