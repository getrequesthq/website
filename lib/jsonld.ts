const BASE_URL = 'https://getrequest.io'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'getrequest',
    url: BASE_URL,
    logo: `${BASE_URL}/icon.svg`,
    sameAs: [],
  }
}

export function softwareSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'getrequest',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description: 'API reliability infrastructure for modern teams. Launch endpoints, observe every request, replay failures.',
    url: BASE_URL,
    offers: [
      { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Dev', price: '9', priceCurrency: 'USD', billingIncrement: 'P1M' },
      { '@type': 'Offer', name: 'Pro', price: '99', priceCurrency: 'USD', billingIncrement: 'P1M' },
    ],
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'getrequest',
    url: BASE_URL,
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
      url: 'https://getrequest.io',
    },
    url: `https://getrequest.io/blog/${post.slug}`,
    keywords: post.tags.join(', '),
    mainEntityOfPage: `https://getrequest.io/blog/${post.slug}`,
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
