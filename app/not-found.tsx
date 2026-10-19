import type { Metadata } from 'next'
import Link from 'next/link'
import { DOCS_URL } from '@/lib/urls'

export const metadata: Metadata = {
  title: 'Page not found — getrequest',
  description: 'The page you were looking for doesn’t exist or has moved.',
}

export default function NotFound() {
  return (
    <main id="main">
      <section className="hero" aria-labelledby="not-found-heading">
        <div className="container">
          <div className="hero__inner">
            <span className="hero__label eyebrow">404</span>
            <h1 className="heading-hero hero__title" id="not-found-heading">This endpoint<br />doesn&apos;t exist.</h1>
            <p className="hero__detail">The page you&apos;re looking for was moved, renamed, or never existed. Check the URL, or head back to a page that does.</p>
            <div className="hero__ctas">
              <Link href="/" className="btn btn-primary btn-lg">Back to home →</Link>
              <a href={DOCS_URL} className="btn btn-ghost btn-lg">View docs</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
