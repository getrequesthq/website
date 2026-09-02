import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { APP_REGISTER_URL } from '@/lib/urls'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, faqSchema } from '@/lib/jsonld'

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description: 'API Reliability Layer pricing. No seat fees, no gateway costs, no observability bills on top.',
  path: '/pricing',
})

const faqItems = [
  {
    question: 'What counts as a request?',
    answer: 'Any HTTP call that passes through a getrequest endpoint URL is counted as one request. Requests that return mock JSON and requests that are forwarded to an upstream are counted equally.',
  },
  {
    question: 'Can I upgrade or downgrade anytime?',
    answer: 'Yes. Plan changes take effect immediately. If you upgrade mid-cycle, you\'re charged the prorated difference. If you downgrade, the change takes effect at the start of your next billing cycle.',
  },
  {
    question: 'What happens when I go over my plan\'s request quota?',
    answer: 'Your endpoints keep operating normally either way. On Free, log capture pauses once you hit 10,000 requests until the cycle resets or you upgrade. On Dev, Pro, and Gro, overage is billed automatically per 10,000 extra requests.',
  },
  {
    question: 'Is overage capped, or can my bill spike unexpectedly?',
    answer: 'Overage on Dev, Pro, and Gro is capped at 120% of your plan\'s quota. Once you hit that cap, we stop billing extra for the rest of the cycle — a traffic spike can\'t produce a surprise bill. Upgrade anytime for a higher included quota.',
  },
  {
    question: 'Is there a free trial for Pro?',
    answer: 'The free plan gives you full access to core features indefinitely. Pro features (request replay, shareable debug links) require a paid plan. Contact us if you need a trial.',
  },
  {
    question: 'Do you offer annual billing?',
    answer: 'Annual billing with a 20% discount is available on request. Contact support to set it up.',
  },
]

export default function PricingPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: 'https://getrequest.io' },
        { name: 'Pricing', url: 'https://getrequest.io/pricing' },
      ])} />
      <JsonLd data={faqSchema(faqItems)} />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container">
          <div className="hero__inner">
            <span className="hero__label">// pricing</span>
            <h1 className="heading-hero hero__title" id="hero-heading">Reliable pricing. No surprises.</h1>
            <p className="hero__sub">Start free, scale as your traffic grows. Every paid plan includes transparent, pay-as-you-go overage.</p>
          </div>
        </div>
      </section>

      {/* PLAN CARDS */}
      <section className="section section--light" id="plans" aria-labelledby="plans-heading">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="label label--light">// plans</span>
            <h2 className="heading-xl" id="plans-heading">Scale as your traffic grows.</h2>
          </div>
          <div className="pricing-grid pricing-grid--4">
            {/* Free */}
            <div className="pricing-card">
              <div className="pricing-card__name">free</div>
              <div className="pricing-card__price">$0<span>/mo</span></div>
              <p className="pricing-card__desc">Relay + Retain at zero cost. Full traffic visibility for side projects, early integrations, and prototypes.</p>
              <hr className="pricing-card__divider" />
              <ul className="pricing-card__features">
                <li className="pricing-card__feature">10,000 requests / month</li>
                <li className="pricing-card__feature">7-day log retention</li>
                <li className="pricing-card__feature">Live request inspector</li>
                <li className="pricing-card__feature">Instant endpoints (mock + forward)</li>
                <li className="pricing-card__feature">Smart forwarding</li>
                <li className="pricing-card__feature">Usage dashboard</li>
                <li className="pricing-card__feature">API key management</li>
              </ul>
              <p className="pricing-card__overage">Hard capped at quota — no overage charges.</p>
              <div className="pricing-card__cta">
                <a href={APP_REGISTER_URL} className="btn btn-ghost-light" style={{ width: '100%', justifyContent: 'center' }}>Get started for free</a>
              </div>
            </div>
            {/* Dev */}
            <div className="pricing-card">
              <div className="pricing-card__name">dev</div>
              <div className="pricing-card__price">$29<span>/mo</span></div>
              <p className="pricing-card__desc">Extended Retain for real workloads — 30-day log retention and 10× the request volume of free.</p>
              <hr className="pricing-card__divider" />
              <ul className="pricing-card__features">
                <li className="pricing-card__feature">100,000 requests / month</li>
                <li className="pricing-card__feature">30-day log retention</li>
                <li className="pricing-card__feature">Everything in free</li>
                <li className="pricing-card__feature">Endpoint management UI</li>
                <li className="pricing-card__feature">JSON mock responses</li>
                <li className="pricing-card__feature">Priority support</li>
              </ul>
              <p className="pricing-card__overage">Then $2.90 per 10,000 extra requests.</p>
              <div className="pricing-card__cta">
                <a href={APP_REGISTER_URL} className="btn btn-primary-dark" style={{ width: '100%', justifyContent: 'center' }}>Get started for free</a>
              </div>
            </div>
            {/* Pro */}
            <div className="pricing-card pricing-card--featured">
              <div className="pricing-card__name">pro</div>
              <div className="pricing-card__price">$99<span>/mo</span></div>
              <p className="pricing-card__desc">Full Relay + Retain + Recover. Request replay and shareable debug links for production teams.</p>
              <hr className="pricing-card__divider" />
              <ul className="pricing-card__features">
                <li className="pricing-card__feature">1,000,000 requests / month</li>
                <li className="pricing-card__feature">30-day log retention</li>
                <li className="pricing-card__feature">Everything in Dev</li>
                <li className="pricing-card__feature pricing-card__feature--pro">Request replay ✦</li>
                <li className="pricing-card__feature pricing-card__feature--pro">Shareable debug links ✦</li>
                <li className="pricing-card__feature">Team access (coming soon)</li>
              </ul>
              <p className="pricing-card__overage">Then $1.90 per 10,000 extra requests.</p>
              <div className="pricing-card__cta">
                <a href={APP_REGISTER_URL} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get started for free</a>
              </div>
            </div>
            {/* Gro */}
            <div className="pricing-card">
              <div className="pricing-card__name">gro</div>
              <div className="pricing-card__price">$399<span>/mo</span></div>
              <p className="pricing-card__desc">High-volume Relay + Retain + Recover. 5× the throughput of Pro for teams running production traffic at scale.</p>
              <hr className="pricing-card__divider" />
              <ul className="pricing-card__features">
                <li className="pricing-card__feature">5,000,000 requests / month</li>
                <li className="pricing-card__feature">30-day log retention</li>
                <li className="pricing-card__feature">Everything in Pro</li>
                <li className="pricing-card__feature">Lowest per-request overage rate</li>
              </ul>
              <p className="pricing-card__overage">Then $0.90 per 10,000 extra requests.</p>
              <div className="pricing-card__cta">
                <a href={APP_REGISTER_URL} className="btn btn-primary-dark" style={{ width: '100%', justifyContent: 'center' }}>Get started for free</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section section--light" aria-labelledby="compare-heading">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="label label--light">// compare plans</span>
            <h2 className="heading-xl" id="compare-heading">Everything side by side.</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>free</th>
                  <th>dev</th>
                  <th className="col-featured">pro</th>
                  <th>gro</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monthly requests</td>
                  <td>10,000</td>
                  <td>100,000</td>
                  <td className="col-featured">1,000,000</td>
                  <td>5,000,000</td>
                </tr>
                <tr>
                  <td>Overage beyond quota</td>
                  <td>—</td>
                  <td>$2.90 / 10,000</td>
                  <td className="col-featured">$1.90 / 10,000</td>
                  <td>$0.90 / 10,000</td>
                </tr>
                <tr>
                  <td>Log retention</td>
                  <td>7 days</td>
                  <td>30 days</td>
                  <td className="col-featured">30 days</td>
                  <td>30 days</td>
                </tr>
                <tr>
                  <td>Live inspector</td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td className="col-featured"><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                </tr>
                <tr>
                  <td>Instant endpoints</td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td className="col-featured"><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                </tr>
                <tr>
                  <td>Smart forwarding</td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td className="col-featured"><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                </tr>
                <tr>
                  <td>JSON mock responses</td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td className="col-featured"><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                </tr>
                <tr>
                  <td>API key management</td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td className="col-featured"><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                </tr>
                <tr>
                  <td>Usage dashboard</td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td className="col-featured"><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                </tr>
                <tr>
                  <td>Request replay</td>
                  <td><span className="cross">—</span></td>
                  <td><span className="cross">—</span></td>
                  <td className="col-featured"><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                </tr>
                <tr>
                  <td>Shareable debug links</td>
                  <td><span className="cross">—</span></td>
                  <td><span className="cross">—</span></td>
                  <td className="col-featured"><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--light" aria-labelledby="faq-heading">
        <div className="container container--narrow">
          <div className="section__header">
            <span className="label label--light">// common questions</span>
            <h2 className="heading-xl" id="faq-heading">Common questions.</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item, i) => (
              <details key={i} className="faq-item">
                <summary>{item.question}</summary>
                <p className="faq-item__body">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="container container--narrow">
          <h2 className="heading-xl cta-section__title" id="cta-heading">Relay. Retain. Recover.</h2>
          <p className="cta-section__sub">No gateway costs, no code changes, no ops overhead. The reliability layer is live in under 2 minutes.</p>
          <a href={APP_REGISTER_URL} className="btn btn-primary btn-lg">Get started →</a>
        </div>
      </section>
    </main>
  )
}
