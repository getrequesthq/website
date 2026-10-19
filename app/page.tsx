import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { APP_REGISTER_URL, DOCS_URL } from '@/lib/urls'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema, webSiteSchema, softwareSchema } from '@/lib/jsonld'
import { FlightRecorder } from '@/components/home/FlightRecorder'
import { ReliabilityStory } from '@/components/home/ReliabilityStory'
import { ProductTour } from '@/components/home/ProductTour'
import { Quickstart } from '@/components/home/Quickstart'

// [capability, hookdeck, svix, ngrok, diy, getrequest] — null = no, '' = yes, text = yes with qualifier
const COMPARE: [string, ...(string | null)[]][] = [
  ['Sync request handling', null, null, '', 'custom', 'no config'],
  ['Async delivery with retries', '', 'outbound', null, 'weeks to build', 'built in'],
  ['Live request inspector', 'webhooks only', 'sender-side logs', 'local tunnel', null, 'all traffic'],
  ['Request replay', '', 'per message + bulk', '', 'custom', 'single + bulk'],
  ['Mock endpoints', 'custom response', null, null, 'custom', ''],
  ['Production-safe (no tunnel)', '', '', null, '', ''],
  ['Shareable debug links', null, null, null, null, '30-day links'],
]

const PLANS = [
  { name: 'Free', price: '$0', quota: '10,000 / mo', retention: '7 days', over: 'Hard cap (429)', desc: 'Inspector, all three actions, endpoint auth.', cta: 'Start free' },
  { name: 'Dev', price: '$29', quota: '100,000 / mo', retention: '30 days', over: '$2.90 / 10k', desc: 'Everything in Free, plus priority support.', cta: 'Start Dev' },
  { name: 'Pro', price: '$99', quota: '1,000,000 / mo', retention: '30 days', over: '$1.90 / 10k', desc: 'Adds replay, bulk retry, and share links.', cta: 'Start Pro', featured: true },
  { name: 'Gro', price: '$399', quota: '5,000,000 / mo', retention: '30 days', over: '$0.90 / 10k', desc: 'Everything in Pro at high volume.', cta: 'Start Gro' },
]

export const metadata: Metadata = buildMetadata({
  title: 'The API Reliability Layer for Modern Teams',
  description: 'getrequest sits between your callers and your API. It relays every request, records the full exchange, retries async deliveries automatically, and lets you replay what failed.',
  path: '/',
})

export default function HomePage() {
  return (
    <main id="main">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={webSiteSchema()} />
      <JsonLd data={softwareSchema()} />

      {/* HERO */}
      <section className="hx" aria-labelledby="hero-heading">
        <div className="container">
          <div className="hx__head">
            <span className="eyebrow">API Reliability Layer</span>
            <h1 className="hx__title" id="hero-heading">Your backend can fail.<br /><span>Not your business integrations.</span></h1>
            <div className="hx__aside">
              <p className="hx__sub">getrequest sits in front of your backend as a reliability layer — so traffic spikes, downtime, or failed deployments never result in lost requests.</p>
              <div>
                <div className="hx__ctas">
                  <a href={APP_REGISTER_URL} className="btn btn-primary btn-lg">Start for free →</a>
                  <a href={DOCS_URL} className="btn btn-ghost btn-lg">Documentation</a>
                </div>
                <p className="hx__note">Free plan · 10,000 requests/month · no card</p>
              </div>
            </div>
          </div>
          <FlightRecorder />
        </div>
      </section>

      <div className="spec" aria-label="Product facts">
        <div className="container spec__grid">
          <div className="spec__item">
            <div className="spec__v">&lt; 2<small>min</small></div>
            <div className="spec__k">From signup to your first logged request</div>
          </div>
          <div className="spec__item">
            <div className="spec__v">6<small>attempts</small></div>
            <div className="spec__k"><a href={`${DOCS_URL}/guides/async-api`}>Per async delivery, over about 36 minutes</a></div>
          </div>
          <div className="spec__item">
            <div className="spec__v">4<small>auth types</small></div>
            <div className="spec__k"><a href={`${DOCS_URL}/guides/authentication`}>Bearer, API key, Basic, HMAC, both directions</a></div>
          </div>
          <div className="spec__item">
            <div className="spec__v">7–30<small>days</small></div>
            <div className="spec__k"><Link href="/pricing">Searchable log retention, by plan</Link></div>
          </div>
        </div>
      </div>

      <ReliabilityStory />
      <ProductTour />
      <Quickstart />

      {/* SHIPPING TODAY */}
      <section className="section section--dark ship" aria-labelledby="ship-heading">
        <div className="container">
          <div className="sx-head">
            <span className="eyebrow">Built for how you ship now</span>
            <h2 className="heading-xl" id="ship-heading">You ship faster with AI tools. Your safety net should keep up.</h2>
            <p className="sx-head__lede">More of your code is generated, reviewed fast, and deployed the same day. getrequest is a plain HTTP URL, so it works with whatever you or your tools write. No SDK, no framework, no agent integration to set up.</p>
          </div>
          <div className="ship__grid">
            <div className="ship__item">
              <span className="ship__k">Static API</span>
              <h3 className="ship__t">Ship the frontend before the backend.</h3>
              <p className="ship__d">Your generated UI needs an API today. Return the exact JSON shape it expects, then switch the action to Sync API when the real handler lands. The URL never changes.</p>
            </div>
            <div className="ship__item">
              <span className="ship__k">Inspector</span>
              <h3 className="ship__t">See what the generated client actually sent.</h3>
              <p className="ship__d">When an assistant writes the integration, the log shows the headers and body that really arrived, not the ones you assumed. Search them to find the malformed field.</p>
            </div>
            <div className="ship__item">
              <span className="ship__k">Authentication</span>
              <h3 className="ship__t">Keep a record of what your agents call.</h3>
              <p className="ship__d">Put an endpoint in front of the API an agent’s tool calls. Every call is logged with its response. Calls with a missing or wrong credential get a 401 and are logged too.</p>
            </div>
            <div className="ship__item">
              <span className="ship__k">Replay</span>
              <h3 className="ship__t">Deploy fast. Recover what the bad deploy dropped.</h3>
              <p className="ship__d">When a handler breaks in production, failed requests stay on record. Async deliveries keep retrying while you fix it. Then replay the rest, one at a time or in bulk.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section section--dark cmp" aria-labelledby="compare-heading">
        <div className="container">
          <div className="sx-head">
            <span className="eyebrow">Alternatives</span>
            <h2 className="heading-xl" id="compare-heading">Where getrequest fits.</h2>
            <p className="sx-head__lede">Each of these tools does part of the job well. getrequest covers sync and async request flows in one place, with nothing to host.</p>
          </div>
          <div className="cmp__wrap" tabIndex={0} role="region" aria-label="Comparison table">
            <table className="comparison-table cmp__table">
              <thead>
                <tr>
                  <th scope="col">Capability</th>
                  <th scope="col">Hookdeck</th>
                  <th scope="col">Svix</th>
                  <th scope="col">Ngrok</th>
                  <th scope="col">Build it yourself</th>
                  <th scope="col" className="col-featured">getrequest</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([cap, ...cells]) => (
                  <tr key={cap}>
                    <th scope="row">{cap}</th>
                    {cells.map((c, i) => (
                      <td key={i} className={i === cells.length - 1 ? 'col-featured' : undefined}>
                        {c === null ? <span className="cross" aria-label="No">—</span> : <><span className="check" aria-label="Yes">✓</span>{c && <span className="cmp__q">{c}</span>}</>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="cmp__note">Svix focuses on outbound webhook delivery (sending events to your customers), not inbound request capture, so several rows reflect a different focus rather than a gap. Based on public documentation as of October 2026.</p>
        </div>
      </section>

      {/* PRICING */}
      <section className="section section--dark px" aria-labelledby="pricing-heading">
        <div className="container">
          <div className="px__head">
            <div className="sx-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Pricing</span>
              <h2 className="heading-xl" id="pricing-heading">Priced by requests. Every plan logs every one.</h2>
            </div>
            <Link href="/pricing" className="btn btn-ghost">Compare all plans →</Link>
          </div>
          <div className="px__grid">
            {PLANS.map((p) => (
              <div key={p.name} className={`px__plan${p.featured ? ' px__plan--featured' : ''}`}>
                <div className="px__top">
                  <span className="px__name">{p.name}</span>
                  {p.featured && <span className="px__tag">Replay &amp; bulk retry</span>}
                </div>
                <div className="px__price">{p.price}<span>/mo</span></div>
                <dl className="px__facts">
                  <div><dt>Requests</dt><dd>{p.quota}</dd></div>
                  <div><dt>Retention</dt><dd>{p.retention}</dd></div>
                  <div><dt>Over quota</dt><dd>{p.over}</dd></div>
                </dl>
                <p className="px__desc">{p.desc}</p>
                <a href={APP_REGISTER_URL} className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'} px__cta`}>{p.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fx" aria-labelledby="cta-heading">
        <div className="container fx__inner">
          <p className="fx__log" aria-hidden="true">
            <span className="fx__m">POST</span> e.getrequest.io/aB3dEf7gH9jK2mN4 <span className="fx__err">502</span> <span className="fx__arrow">→ kept</span> <span className="fx__arrow">→ replayed</span> <span className="fx__ok">201</span>
          </p>
          <h2 className="fx__title" id="cta-heading">The next outage is already on someone’s calendar.<br /><span>Have the requests on record when it happens.</span></h2>
          <div className="hx__ctas fx__ctas">
            <a href={APP_REGISTER_URL} className="btn btn-primary btn-lg">Start for free →</a>
            <a href={DOCS_URL} className="btn btn-ghost btn-lg">Documentation</a>
          </div>
          <p className="hx__note">Free plan · 10,000 requests/month · no card</p>
        </div>
      </section>
    </main>
  )
}
