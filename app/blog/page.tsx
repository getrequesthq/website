import { getAllPosts, getAllTags } from '@/lib/blog'
import { formatPostDate } from '@/lib/format'
import { buildMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/jsonld'
import Link from 'next/link'

export const metadata = buildMetadata({
  title: 'Blog',
  description: 'Technical articles on API reliability, developer infrastructure, debugging, and building production-grade API systems.',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: 'https://getrequest.io' },
        { name: 'Blog', url: 'https://getrequest.io/blog' },
      ])} />

      <section className="hero" aria-labelledby="blog-heading">
        <div className="container">
          <div className="hero__inner">
            <span className="hero__label">// blog</span>
            <h1 className="heading-hero hero__title" id="blog-heading">API reliability,<br />in depth.</h1>
            <p className="hero__sub">Technical writing on API infrastructure, developer tooling, and building reliable systems.</p>
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          {posts.length === 0 ? (
            <p style={{ color: 'var(--text-light-2)', textAlign: 'center', padding: '4rem 0' }}>
              First posts coming soon.
            </p>
          ) : (
            <div className="blog-grid">
              {posts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <article className="post-card">
                    <div className="post-card__tags">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="post-card__tag">{tag}</span>
                      ))}
                    </div>
                    <h2 className="post-card__title">{post.title}</h2>
                    <p className="post-card__excerpt">{post.description}</p>
                    <div className="post-card__meta">
                      <span>{formatPostDate(post.date)}</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
