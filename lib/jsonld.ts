import { BASE_URL, CONTACT_EMAILS, LEGAL_NAME, POSTAL_ADDRESS, SOCIAL_PROFILES } from '@/lib/site'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'getrequest',
    legalName: LEGAL_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/icon.svg`,
    email: CONTACT_EMAILS.general,
    sameAs: Object.values(SOCIAL_PROFILES),
    address: { '@type': 'PostalAddress', ...POSTAL_ADDRESS },
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'customer support', email: CONTACT_EMAILS.support, availableLanguage: 'English' },
      { '@type': 'ContactPoint', contactType: 'sales', email: CONTACT_EMAILS.general, availableLanguage: 'English' },
    ],
  }
}

// Mirrors the homepage Quickstart section.
export function quickstartHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Put getrequest in front of your API',
    description: 'Create an endpoint, send it a request, and inspect the full exchange in under two minutes. No SDK to install and nothing to deploy.',
    totalTime: 'PT2M',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Create an endpoint and choose an action', text: 'In the getrequest dashboard, create an endpoint and choose Sync API, Async API, or Static API.', url: 'https://docs.getrequest.io/quickstart' },
      { '@type': 'HowToStep', position: 2, name: 'Send a request to its unique URL', text: 'Point your caller at the endpoint URL, https://e.getrequest.io/{endpoint_id}, and send any request.' },
      { '@type': 'HowToStep', position: 3, name: 'Open Logs and inspect the full exchange', text: 'Open Logs to see the request headers, body, response, status, and timing.' },
    ],
  }
}

export function softwareSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'getrequest',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description: 'Scalability as a Service. Put getrequest in front of your API and skip building the infrastructure: queuing, automatic retries, and a full request log, ready for millions of requests.',
    url: BASE_URL,
    softwareHelp: { '@type': 'CreativeWork', url: 'https://docs.getrequest.io' },
    publisher: { '@id': `${BASE_URL}/#organization` },
    featureList: [
      'Sync API: transparent proxy returning the destination response',
      'Async API: immediate 202 with background delivery and automatic retries',
      'Static API: mock JSON endpoints',
      'Searchable request log with headers, body, response, status, and timing',
      'Request replay and bulk retry',
      'Shareable debug links',
      'Endpoint and destination authentication: Bearer, API key, Basic, HMAC',
    ],
    offers: [
      planOffer('Free', '0', 'Free plan: 10,000 requests/month, 7-day log retention. Hard cap at quota.'),
      planOffer('Dev', '29', 'Dev plan: 100,000 requests/month, 30-day log retention, priority support.'),
      planOffer('Pro', '99', 'Pro plan: 1,000,000 requests/month, 30-day log retention, replay, bulk retry, share links.'),
      planOffer('Gro', '399', 'Gro plan: 5,000,000 requests/month, 30-day log retention, everything in Pro at high volume.'),
    ],
  }
}

function planOffer(name: string, price: string, description: string) {
  return {
    '@type': 'Offer',
    name,
    description,
    price,
    priceCurrency: 'USD',
    url: `${BASE_URL}/pricing`,
    availability: 'https://schema.org/InStock',
    priceSpecification: { '@type': 'UnitPriceSpecification', price, priceCurrency: 'USD', billingDuration: 'P1M', unitText: 'month' },
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'getrequest',
    url: BASE_URL,
    publisher: { '@id': `${BASE_URL}/#organization` },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function blogPostingSchema(post: {
  title: string
  description: string
  date: string
  author: string
  slug: string
  tags: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'getrequest',
      url: 'https://www.getrequest.io',
    },
    url: `https://www.getrequest.io/blog/${post.slug}`,
    keywords: post.tags.join(', '),
    mainEntityOfPage: `https://www.getrequest.io/blog/${post.slug}`,
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
