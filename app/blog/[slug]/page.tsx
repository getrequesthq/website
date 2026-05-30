import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { buildMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, blogPostingSchema } from '@/lib/jsonld'
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

  // Dynamically import the MDX file
  const { default: MDXContent } = await import(`@/content/blog/${slug}.mdx`)

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
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
