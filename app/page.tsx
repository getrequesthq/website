import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { APP_REGISTER_URL, DOCS_URL } from '@/lib/urls'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema, webSiteSchema, softwareSchema } from '@/lib/jsonld'
import { GRMark, Crumbs } from '@/components/dashboard-mockup'

export const metadata: Metadata = buildMetadata({
  title: 'The API Reliability Layer for Modern Teams',
  description: 'API reliability layer for modern teams. Launch endpoints, observe every request, and replay failures — without managing gateways, servers, or observability stacks.',
  path: '/',
})

export default function HomePage() {
  return (
    <main id="main">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={webSiteSchema()} />
      <JsonLd data={softwareSchema()} />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container">
          <div className="hero__inner">
            <span className="hero__label">// api reliability layer</span>
            <h1 className="heading-hero hero__title" id="hero-heading">Never lose an<br />API request.</h1>
            <p className="hero__sub">Relay traffic safely. Retain every request.<br />Recover from failures.</p>
            <p className="hero__detail">getrequest sits in front of your backend as a reliability layer — so traffic spikes, downtime, or failed deployments never result in lost requests.</p>
            <div className="hero__ctas">
              <a href={APP_REGISTER_URL} className="btn btn-primary btn-lg">Start for free →</a>
              <a href={DOCS_URL} className="btn btn-ghost btn-lg">View docs</a>
            </div>
            <p className="hero__note">Free forever · No credit card required</p>

            <div className="hero__window">
              <div className="dm-frame dm-frame--hero">
                <div className="dm-frame__bar">
                  <GRMark />
                  <Crumbs items={['Projects', 'Production', 'Logs']} />
                  <span className="dm-badge dm-badge--live" style={{ marginLeft: 'auto' }}>Live</span>
                </div>
                <div className="dm-frame__body">
                  <p className="dm-hint" style={{ marginBottom: 10 }}>Requests in the last 30 minutes</p>
                  <div className="dm-list">
                    <div className="dm-row-item">
                      <span className="dm-method dm-method--post">POST</span>
                      <span className="dm-row-item__path">HubSpot sync</span>
                      <span className="dm-badge dm-badge--ok">200 OK</span>
                      <span className="dm-row-item__meta">43ms · just now</span>
                    </div>
                    <div className="dm-row-item">
                      <span className="dm-method dm-method--post">POST</span>
                      <span className="dm-row-item__path">Message delivery</span>
                      <span className="dm-badge dm-badge--ok">200 OK</span>
                      <span className="dm-row-item__meta">18ms · 2s ago</span>
                    </div>
                    <div className="dm-row-item">
                      <span className="dm-method dm-method--get">GET</span>
                      <span className="dm-row-item__path">Get order</span>
                      <span className="dm-badge dm-badge--warn">404</span>
                      <span className="dm-row-item__meta">8ms · 5s ago</span>
                    </div>
                    <div className="dm-row-item dm-row-item--active" style={{ borderBottom: 'none' }}>
                      <span className="dm-method dm-method--post">POST</span>
                      <span className="dm-row-item__path">Stripe webhook</span>
                      <span className="dm-badge dm-badge--ok">201</span>
                      <span className="dm-row-item__meta">67ms · 11s ago</span>
                    </div>
                  </div>
                  <div className="dm-btn-row" style={{ marginTop: 14 }}>
                    <span className="dm-btn dm-btn--outline">↺ Replay</span>
                    <span className="dm-btn dm-btn--outline">⎘ Share link</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      {/* <div className="social-proof" aria-label="Used by engineering teams">
        <div className="container">
          <div className="social-proof__inner">
            <span className="social-proof__label">Trusted by engineering teams at —</span>
            <div className="social-proof__logos">
              <span className="social-proof__name">Reelo</span>
              <span className="social-proof__name">Petpooja</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* STATS BAR */}
      <div className="stats-bar text-center" aria-label="Product metrics">
        <div className="stat">
          <span className="stat__value">&lt; 90s</span>
          <span className="stat__label">From signup to a live endpoint</span>
        </div>
        <div className="stat">
          <span className="stat__value">100%</span>
          <span className="stat__label">Of requests captured before your backend sees them</span>
        </div>
        <div className="stat">
          <span className="stat__value">6</span>
          <span className="stat__label">
            <a href={`${DOCS_URL}/guides/async-api`} className="stat__link">Automatic retries per async delivery →</a>
          </span>
        </div>
        <div className="stat">
          <span className="stat__value">30d</span>
          <span className="stat__label">
            <Link href="/pricing" className="stat__link">Log retention on paid plans →</Link>
          </span>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section section--dark" id="how-it-works" aria-labelledby="how-heading">
        <div className="container">
          <div className="section__header">
            <span className="label">// how it works</span>
            <h2 className="heading-xl" id="how-heading">Three stages. Complete reliability.</h2>
          </div>
          <div className="steps">
            <div className="step">
              <span className="step__num">01</span>
              <h3 className="step__title">Relay</h3>
              <p className="step__desc">Every request passes through getrequest before it reaches your backend. Spikes and bad actors never touch your infrastructure.</p>
              <div className="dm-frame dm-frame--mini step__mock">
                <div className="dm-frame__body">
                  <div className="dm-row-item" style={{ paddingTop: 0, borderBottom: 'none' }}>
                    <span className="dm-method dm-method--post">POST</span>
                    <span className="dm-row-item__path">/checkout</span>
                    <span className="dm-badge dm-badge--ok">relayed</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="step">
              <span className="step__num">02</span>
              <h3 className="step__title">Retain</h3>
              <p className="step__desc">Headers, body, status, latency — captured before your backend ever sees it. Success or failure, both are durably retained.</p>
              <div className="dm-frame dm-frame--mini step__mock">
                <div className="dm-frame__body">
                  <div className="dm-list">
                    <div className="dm-row-item" style={{ paddingTop: 0 }}>
                      <span className="dm-method dm-method--post">POST</span>
                      <span className="dm-row-item__path">Stripe webhook</span>
                      <span className="dm-badge dm-badge--ok">captured</span>
                    </div>
                    <div className="dm-row-item" style={{ borderBottom: 'none' }}>
                      <span className="dm-method dm-method--put">PUT</span>
                      <span className="dm-row-item__path">/api/settings</span>
                      <span className="dm-badge dm-badge--err">captured</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="step">
              <span className="step__num">03</span>
              <h3 className="step__title">Recover</h3>
              <p className="step__desc">Replay any retained request with its exact original payload. One click, no reconstruction.</p>
              <div className="dm-frame dm-frame--mini step__mock">
                <div className="dm-frame__body">
                  <div className="dm-row-item" style={{ paddingTop: 0 }}>
                    <span className="dm-method dm-method--put">PUT</span>
                    <span className="dm-row-item__path">/api/settings</span>
                    <span className="dm-badge dm-badge--err">500</span>
                  </div>
                  <div className="dm-btn-row" style={{ margin: '8px 0' }}>
                    <span className="dm-btn dm-btn--primary" style={{ fontSize: 11, padding: '4px 10px' }}>↺ Replay</span>
                  </div>
                  <div className="dm-row-item" style={{ paddingTop: 0, borderBottom: 'none' }}>
                    <span className="dm-method dm-method--put">PUT</span>
                    <span className="dm-row-item__path">/api/settings</span>
                    <span className="dm-badge dm-badge--ok">200 OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES OVERVIEW */}
      <section className="section section--dark" aria-labelledby="features-heading">
        <div className="container">
          <div className="section__header">
            <span className="label">// capabilities</span>
            <h2 className="heading-xl" id="features-heading">The complete API reliability stack.</h2>
            <p className="section__sub">Relay traffic safely, retain every request durably, and recover from failures instantly — without managing gateways, queues, or observability pipelines.</p>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">⚡</div>
              <h3 className="feature-card__title">Instant endpoints</h3>
              <p className="feature-card__desc">Launch a production-ready API endpoint within seconds. Mock a response with Static API, or proxy live with Sync or Async API. No servers, no config files, no ops work.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">◎</div>
              <h3 className="feature-card__title">Live inspector</h3>
              <p className="feature-card__desc">Total visibility into every request the moment it lands. Headers, body, status, latency — your observability layer, included by default.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">↺</div>
              <h3 className="feature-card__title">Request replay</h3>
              <p className="feature-card__desc">Re-fire any captured request with original headers and body intact. Confirm a fix, reproduce a failure, validate a change — with one click.</p>
              <span className="feature-card__badge">Pro</span>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">⎘</div>
              <h3 className="feature-card__title">Shareable debug links</h3>
              <p className="feature-card__desc">Generate a permanent link to any captured request. Paste it in Slack, a Jira ticket, or a PR. Full request and response — no account required to view.</p>
              <span className="feature-card__badge">Pro</span>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">→</div>
              <h3 className="feature-card__title">Smart forwarding</h3>
              <p className="feature-card__desc">Sync API routes traffic to any upstream transparently, proxying the request body byte-for-byte and logging the full exchange — no rewriting, no reformatting.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">▤</div>
              <h3 className="feature-card__title">Usage metering</h3>
              <p className="feature-card__desc">Track request volume across projects. Get pre-limit alerts. Build a reliability baseline from real traffic data before incidents happen.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">⇢</div>
              <h3 className="feature-card__title">Async delivery</h3>
              <p className="feature-card__desc">Async API acknowledges the caller instantly and delivers to your backend in the background — with automatic retries. Built for webhooks and any fire-and-forget traffic.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">⚿</div>
              <h3 className="feature-card__title">Built-in authentication</h3>
              <p className="feature-card__desc">Require a credential on incoming requests, and attach one to your outbound calls — two independent settings, no code required.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">⇋</div>
              <h3 className="feature-card__title">Bulk retry</h3>
              <p className="feature-card__desc">Recover from an outage in one action. Retry a manual selection or an entire filtered set, paced automatically so it never re-overwhelms your backend.</p>
              <span className="feature-card__badge">Pro</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section section--light" aria-labelledby="compare-heading">
        <div className="container">
          <div className="section__header">
            <span className="label label--light">// vs the alternatives</span>
            <h2 className="heading-xl" id="compare-heading">Why teams choose getrequest.</h2>
            <p className="section__sub section__sub--light">Every alternative solves one piece. getrequest is the only layer that handles sync and async request flows end-to-end — with zero downtime and no infra to manage.</p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Capability</th>
                  <th>Hookdeck</th>
                  <th>Svix</th>
                  <th>Ngrok</th>
                  <th>Build it yourself</th>
                  <th className="col-featured">getrequest</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sync request handling</td>
                  <td><span className="cross">—</span></td>
                  <td><span className="cross">—</span></td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(custom)</span></td>
                  <td className="col-featured"><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(zero-config)</span></td>
                </tr>
                <tr>
                  <td>Async / webhook queuing</td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(outbound)</span></td>
                  <td><span className="cross">—</span></td>
                  <td><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(weeks to build)</span></td>
                  <td className="col-featured"><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(built-in)</span></td>
                </tr>
                <tr>
                  <td>Live request inspector</td>
                  <td><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(webhooks only)</span></td>
                  <td><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(sender-side logs)</span></td>
                  <td><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(local tunnel)</span></td>
                  <td><span className="cross">—</span></td>
                  <td className="col-featured"><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(all traffic)</span></td>
                </tr>
                <tr>
                  <td>Request replay</td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(per-message + bulk)</span></td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(custom)</span></td>
                  <td className="col-featured"><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(one click)</span></td>
                </tr>
                <tr>
                  <td>Mock endpoints</td>
                  <td><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(custom response)</span></td>
                  <td><span className="cross">—</span></td>
                  <td><span className="cross">—</span></td>
                  <td><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(custom)</span></td>
                  <td className="col-featured"><span className="check">✓</span></td>
                </tr>
                <tr>
                  <td>Production-safe (no tunnel)</td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td><span className="cross">—</span></td>
                  <td><span className="check">✓</span></td>
                  <td className="col-featured"><span className="check">✓</span></td>
                </tr>
                <tr>
                  <td>Zero downtime on changes</td>
                  <td><span className="cross">—</span></td>
                  <td><span className="cross">—</span></td>
                  <td><span className="cross">—</span></td>
                  <td><span className="cross">—</span></td>
                  <td className="col-featured"><span className="check">✓</span></td>
                </tr>
                <tr>
                  <td>Shareable debug links</td>
                  <td><span className="cross">—</span></td>
                  <td><span className="cross">—</span></td>
                  <td><span className="cross">—</span></td>
                  <td><span className="cross">—</span></td>
                  <td className="col-featured"><span className="check">✓</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-light-3)', marginTop: 'var(--space-4)' }}>Svix specializes in reliable outbound webhook delivery (sending events to your customers), not inbound request capture — several rows reflect that different focus rather than a gap.</p>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="section section--light" aria-labelledby="pricing-heading">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="label label--light">// pricing</span>
            <h2 className="heading-xl" id="pricing-heading">Start free. No credit card required.</h2>
          </div>
          <div className="pricing-grid pricing-grid--4">
            <div className="pricing-card">
              <div className="pricing-card__name">free</div>
              <div className="pricing-card__price">$0<span>/mo</span></div>
              <p className="pricing-card__desc">For side projects, prototyping, and exploration.</p>
              <hr className="pricing-card__divider" />
              <ul className="pricing-card__features">
                <li className="pricing-card__feature">10,000 requests / month</li>
                <li className="pricing-card__feature">7-day log retention</li>
                <li className="pricing-card__feature">Live inspector</li>
                <li className="pricing-card__feature">Instant endpoints</li>
                <li className="pricing-card__feature">Smart forwarding</li>
                <li className="pricing-card__feature">Usage dashboard</li>
              </ul>
              <div className="pricing-card__cta">
                <a href={APP_REGISTER_URL} className="btn btn-ghost-light" style={{ width: '100%', justifyContent: 'center' }}>Get started free</a>
              </div>
            </div>
            <div className="pricing-card">
              <div className="pricing-card__name">dev</div>
              <div className="pricing-card__price">$29<span>/mo</span></div>
              <p className="pricing-card__desc">For active projects with real traffic.</p>
              <hr className="pricing-card__divider" />
              <ul className="pricing-card__features">
                <li className="pricing-card__feature">100,000 requests / month</li>
                <li className="pricing-card__feature">30-day log retention</li>
                <li className="pricing-card__feature">Everything in free</li>
              </ul>
              <p className="pricing-card__overage">+$2.90 / 10,000 over quota</p>
              <div className="pricing-card__cta">
                <a href={APP_REGISTER_URL} className="btn btn-primary-dark" style={{ width: '100%', justifyContent: 'center' }}>Start Dev plan</a>
              </div>
            </div>
            <div className="pricing-card pricing-card--featured">
              <div className="pricing-card__name">pro</div>
              <div className="pricing-card__price">$99<span>/mo</span></div>
              <p className="pricing-card__desc">For teams that need the full stack.</p>
              <hr className="pricing-card__divider" />
              <ul className="pricing-card__features">
                <li className="pricing-card__feature">1,000,000 requests / month</li>
                <li className="pricing-card__feature">30-day log retention</li>
                <li className="pricing-card__feature">Everything in Dev</li>
                <li className="pricing-card__feature pricing-card__feature--pro">Request replay ✦</li>
                <li className="pricing-card__feature pricing-card__feature--pro">Shareable debug links ✦</li>
              </ul>
              <p className="pricing-card__overage">+$1.90 / 10,000 over quota</p>
              <div className="pricing-card__cta">
                <a href={APP_REGISTER_URL} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Start Pro plan</a>
              </div>
            </div>
            <div className="pricing-card">
              <div className="pricing-card__name">gro</div>
              <div className="pricing-card__price">$399<span>/mo</span></div>
              <p className="pricing-card__desc">For high-volume production traffic.</p>
              <hr className="pricing-card__divider" />
              <ul className="pricing-card__features">
                <li className="pricing-card__feature">5,000,000 requests / month</li>
                <li className="pricing-card__feature">30-day log retention</li>
                <li className="pricing-card__feature">Everything in Pro</li>
              </ul>
              <p className="pricing-card__overage">+$0.90 / 10,000 over quota</p>
              <div className="pricing-card__cta">
                <a href={APP_REGISTER_URL} className="btn btn-primary-dark" style={{ width: '100%', justifyContent: 'center' }}>Start Gro plan</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="container container--narrow">
          <h2 className="heading-xl cta-section__title" id="cta-heading">Relay. Retain. Recover. From day one.</h2>
          <p className="cta-section__sub">The API Reliability Layer that ensures no incoming request is ever lost — even when your backend isn&apos;t ready to receive it.</p>
          <a href={APP_REGISTER_URL} className="btn btn-primary btn-lg">Start for free →</a>
          <p className="cta-section__note">No credit card required · Free plan available · Cancel anytime</p>
        </div>
      </section>
    </main>
  )
}
