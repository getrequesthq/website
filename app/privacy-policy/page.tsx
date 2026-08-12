import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/jsonld'
import PrivacyContent from '@/content/legal/privacy-policy.mdx'

const TITLE = 'Privacy Policy'
const DESCRIPTION = 'How Get Request Tech, LLC. collects, uses, stores, discloses, and protects information across getrequest\'s websites, applications, and APIs.'
const EFFECTIVE_DATE = 'August 12, 2026'

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  return (
    <main id="main" className="blog-post">
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: 'https://getrequest.io' },
        { name: 'Privacy Policy', url: 'https://getrequest.io/privacy-policy' },
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
          <PrivacyContent />
        </div>
      </div>
    </main>
  )
}
