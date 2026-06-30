import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { APP_REGISTER_URL } from '@/lib/urls'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema, webSiteSchema, softwareSchema } from '@/lib/jsonld'
import { TrafficFlow } from '@/components/TrafficFlow'

export const metadata: Metadata = buildMetadata({
  title: 'The API Reliability Infrastructure for Modern Teams',
  description: 'API reliability infrastructure for modern teams. Launch endpoints, observe every request, and replay failures — without managing gateways, servers, or observability stacks.',
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
              <a href="#" className="btn btn-ghost btn-lg">View docs</a>
            </div>
            <p className="hero__note">Free forever · No credit card required</p>

            <div className="hero__window">
              <div className="code-window">
                <div className="code-window__bar">
                  <div className="code-window__dots">
                    <span className="code-window__dot"></span>
                    <span className="code-window__dot"></span>
                    <span className="code-window__dot"></span>
                  </div>
                  <span className="code-window__title">Request Logs [/proj_k8s3]</span>
                  <span className="code-window__copy">copy</span>
                </div>
                <div className="code-window__body">
                  <pre>{`Requests in the last 30 minutes\n
  `}<span className="tok-method-post">POST</span>{`  `}<span className="tok-path">/api/auth/login</span>{`        `}<span className="tok-status-ok">200 OK</span>{`  · `}<span className="tok-dim">43ms</span>{`    `}<span className="tok-dim">just now</span>{`
  `}<span className="tok-method-get">GET</span>{`   `}<span className="tok-path">/api/users/profile</span>{`     `}<span className="tok-status-ok">200 OK</span>{`  · `}<span className="tok-dim">18ms</span>{`    `}<span className="tok-dim">2s ago</span>{`
  `}<span className="tok-method-get">GET</span>{`   `}<span className="tok-path">/api/orders/99</span>{`         `}<span className="tok-status-warn">404</span>{`     · `}<span className="tok-dim">8ms</span>{`     `}<span className="tok-dim">5s ago</span>{`
  `}<span className="tok-method-post">POST</span>{`  `}<span className="tok-path">/api/webhooks/stripe</span>{`   `}<span className="tok-status-ok">201</span>{`     · `}<span className="tok-dim">67ms</span>{`    `}<span className="tok-dim">11s ago</span>{`
`}<span className="log-row-error">{'  '}<span className="tok-method-put">PUT</span>{`   `}<span className="tok-path">/api/settings</span>{`          `}<span className="tok-status-err">500</span>{`     · `}<span className="tok-dim">203ms</span>{`   `}<span className="tok-dim">32s ago</span>{` ←`}</span>{`
`}<span className="tok-dim">↺ Replay  ·  ⎘ Share link  ·  ▼ Inspect headers</span></pre>
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
          <span className="stat__label">Time to first endpoint</span>
        </div>
        <div className="stat">
          <span className="stat__value">100%</span>
          <span className="stat__label">Zero requests lost, ever</span>
        </div>
        <div className="stat">
          <span className="stat__value">&lt; 5ms</span>
          <span className="stat__label">Overhead per proxied request</span>
        </div>
        <div className="stat">
          <span className="stat__value">30d</span>
          <span className="stat__label">Log retention on paid plans</span>
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
              <p className="step__desc">Every incoming request passes through getrequest before reaching your backend. Traffic spikes, bad actors, and sudden load are handled at the relay layer — your infrastructure never sees raw, uncontrolled traffic again.</p>
            </div>
            <div className="step">
              <span className="step__num">02</span>
              <h3 className="step__title">Retain</h3>
              <p className="step__desc">Every relayed request is captured in full — headers, body, status, latency — before it reaches your upstream. Downtime, failed deployments, and infrastructure outages no longer mean lost data. Every request is durably retained.</p>
            </div>
            <div className="step">
              <span className="step__num">03</span>
              <h3 className="step__title">Recover</h3>
              <p className="step__desc">Once your systems are back, replay any retained request with its exact original payload. No manual reconstruction, no asking users to retry. Missed traffic is restored and system consistency is recovered instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRAFFIC FLOW DIAGRAM */}
      <TrafficFlow />

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
              <p className="feature-card__desc">Launch a production-ready API endpoint within seconds. Return mock JSON or proxy any upstream. No servers, no config files, no ops work.</p>
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
              <p className="feature-card__desc">Route traffic to any upstream transparently. getrequest proxies the request, captures the full exchange, and logs everything — zero byte modification.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">▤</div>
              <h3 className="feature-card__title">Usage metering</h3>
              <p className="feature-card__desc">Track request volume across projects. Get pre-limit alerts. Build a reliability baseline from real traffic data before incidents happen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="section section--light" aria-labelledby="pain-heading">
        <div className="container">
          <div className="section__header">
            <span className="label label--light">// the problem</span>
            <h2 className="heading-xl" id="pain-heading">Lost requests are the hidden cost of every downtime event.</h2>
          </div>
          <div className="pain-grid">
            <div className="card--pain">
              <h3 className="card--pain__title">&ldquo;A traffic spike took us down and we lost every request that came in.&rdquo;</h3>
              <p className="card--pain__body">When a sudden spike overwhelms your backend, requests fail silently. Webhook payloads are dropped. Customer actions never process. There is no record of what arrived during the outage.</p>
            </div>
            <div className="card--pain">
              <h3 className="card--pain__title">&ldquo;We deployed a bad build and permanently lost two hours of incoming traffic.&rdquo;</h3>
              <p className="card--pain__body">Deployments fail. Services go down. When your backend is unavailable, every request that arrives is gone forever — unless you have a layer that captures and holds them before they ever reach your infrastructure.</p>
            </div>
            <div className="card--pain">
              <h3 className="card--pain__title">&ldquo;After the incident, we had to ask customers to retry. Half of them didn&apos;t.&rdquo;</h3>
              <p className="card--pain__body">Manual recovery is the default. Engineers reconstruct requests from partial logs, customers are asked to resend, and critical business events are simply written off. Recovery should not require human intervention.</p>
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
                  <th>Requestly</th>
                  <th>Ngrok</th>
                  <th>Build it yourself</th>
                  <th className="col-featured">getrequest</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sync request handling</td>
                  <td><span className="cross">—</span></td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td><span className="tok-dim" style={{ fontSize: '13px' }}>✓ (custom)</span></td>
                  <td className="col-featured"><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(zero-config)</span></td>
                </tr>
                <tr>
                  <td>Async / webhook queuing</td>
                  <td><span className="check">✓</span></td>
                  <td><span className="cross">—</span></td>
                  <td><span className="cross">—</span></td>
                  <td><span className="tok-dim" style={{ fontSize: '13px' }}>✓ (weeks to build)</span></td>
                  <td className="col-featured"><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(built-in)</span></td>
                </tr>
                <tr>
                  <td>Live request inspector</td>
                  <td><span className="tok-dim" style={{ fontSize: '13px' }}>✓ (webhooks only)</span></td>
                  <td><span className="tok-dim" style={{ fontSize: '13px' }}>✓ (browser only)</span></td>
                  <td><span className="tok-dim" style={{ fontSize: '13px' }}>✓ (local tunnel)</span></td>
                  <td><span className="cross">—</span></td>
                  <td className="col-featured"><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(all traffic)</span></td>
                </tr>
                <tr>
                  <td>Request replay</td>
                  <td><span className="check">✓</span></td>
                  <td><span className="cross">—</span></td>
                  <td><span className="cross">—</span></td>
                  <td><span className="tok-dim" style={{ fontSize: '13px' }}>✓ (custom)</span></td>
                  <td className="col-featured"><span className="check">✓</span> <span style={{ fontSize: '12px', color: 'var(--text-light-3)' }}>(one click)</span></td>
                </tr>
                <tr>
                  <td>Mock endpoints</td>
                  <td><span className="cross">—</span></td>
                  <td><span className="check">✓</span></td>
                  <td><span className="cross">—</span></td>
                  <td><span className="tok-dim" style={{ fontSize: '13px' }}>✓ (custom)</span></td>
                  <td className="col-featured"><span className="check">✓</span></td>
                </tr>
                <tr>
                  <td>Production-safe (no tunnel)</td>
                  <td><span className="check">✓</span></td>
                  <td><span className="cross">—</span></td>
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
                <tr>
                  <td>Time to first endpoint</td>
                  <td><span className="tok-dim" style={{ fontSize: '13px' }}>Minutes</span></td>
                  <td><span className="tok-dim" style={{ fontSize: '13px' }}>Minutes</span></td>
                  <td><span className="tok-dim" style={{ fontSize: '13px' }}>Minutes</span></td>
                  <td><span className="tok-dim" style={{ fontSize: '13px' }}>Days–weeks</span></td>
                  <td className="col-featured"><span className="check">{'< 90s'}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="section section--light" aria-labelledby="pricing-heading">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="label label--light">// pricing</span>
            <h2 className="heading-xl" id="pricing-heading">Start free. No credit card required.</h2>
          </div>
          <div className="pricing-grid">
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
              <div className="pricing-card__price">$9<span>/mo</span></div>
              <p className="pricing-card__desc">For active projects with real traffic.</p>
              <hr className="pricing-card__divider" />
              <ul className="pricing-card__features">
                <li className="pricing-card__feature">100,000 requests / month</li>
                <li className="pricing-card__feature">30-day log retention</li>
                <li className="pricing-card__feature">Everything in free</li>
              </ul>
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
              <div className="pricing-card__cta">
                <a href={APP_REGISTER_URL} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Start Pro plan</a>
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
