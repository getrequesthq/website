import { notFound } from 'next/navigation'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { formatPostDate } from '@/lib/format'
import { buildMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, blogPostingSchema } from '@/lib/jsonld'
import { useMDXComponents } from '@/mdx-components'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: 'article',
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  // Compile the post body at runtime. post.content already has its
  // frontmatter stripped (by gray-matter in getPostBySlug) — statically
  // importing the raw .mdx file instead would feed the unstripped
  // frontmatter block into the MDX compiler, which has no YAML-frontmatter
  // awareness and renders it as literal content (a stray `---` reads as a
  // thematic break, and the frontmatter's key: value lines get swallowed
  // into the heading that follows via Markdown's setext-heading syntax).
  const { default: MDXContent } = await evaluate(post.content, {
    ...runtime,
    useMDXComponents: () => useMDXComponents({}),
  })

  return (
    <main id="main" className="blog-post">
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: 'https://getrequest.io' },
        { name: 'Blog', url: 'https://getrequest.io/blog' },
        { name: post.title, url: `https://getrequest.io/blog/${slug}` },
      ])} />
      <JsonLd data={blogPostingSchema(post)} />

      <header className="blog-post__header">
        <div className="container container--narrow">
          <Link href="/blog" className="blog-post__back">← Back to blog</Link>
          <div className="blog-post__tags">
            {post.tags.map(tag => (
              <span key={tag} className="blog-post__tag">{tag}</span>
            ))}
          </div>
          <h1 className="heading-hero blog-post__title">{post.title}</h1>
          <div className="blog-post__meta">
            <span>{post.author}</span>
            <span>{formatPostDate(post.date)}</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </header>

      <div className="blog-post__body">
        <div className="container container--narrow prose">
          <MDXContent />
        </div>
      </div>
    </main>
  )
}
