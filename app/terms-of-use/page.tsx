import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/jsonld'
import TermsContent from '@/content/legal/terms-of-use.mdx'

const TITLE = 'Terms of Use'
const DESCRIPTION = "The terms that govern your access to and use of getrequest's websites, applications, APIs, and infrastructure."
const EFFECTIVE_DATE = 'August 12, 2026'

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/terms-of-use',
})

export default function TermsOfUsePage() {
  return (
    <main id="main" className="blog-post">
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: 'https://getrequest.io' },
        { name: 'Terms of Use', url: 'https://getrequest.io/terms-of-use' },
      ])} />

      <header className="blog-post__header">
        <div className="container container--narrow">
          <Link href="/" className="blog-post__back">← Back to home</Link>
          <h1 className="heading-hero blog-post__title">{TITLE}</h1>
          <div className="blog-post__meta">
            <span>Effective date: {EFFECTIVE_DATE}</span>
          </div>
        </div>
      </header>

      <div className="blog-post__body">
        <div className="container container--narrow prose legal-prose">
          <TermsContent />
        </div>
      </div>
    </main>
  )
}
