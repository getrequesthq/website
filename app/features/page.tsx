import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { APP_REGISTER_URL, DOCS_URL } from '@/lib/urls'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/jsonld'
import { GRMark, Crumbs } from '@/components/dashboard-mockup'

export const metadata: Metadata = buildMetadata({
  title: 'Features',
  description: 'Relay every API request safely. Retain every payload before it reaches your backend. Recover from failures with one-click replay. The API Reliability Layer — no code changes required.',
  path: '/features',
})

export default function FeaturesPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: 'https://getrequest.io' },
        { name: 'Features', url: 'https://getrequest.io/features' },
      ])} />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container">
          <div className="hero__inner">
            <span className="hero__label">// api reliability layer</span>
            <h1 className="heading-hero hero__title" id="hero-heading">Relay. Retain. Recover.</h1>
            <p className="hero__sub">A protective reliability layer that sits in front of your backend — relaying traffic safely, retaining every request before it reaches your infrastructure, and recovering from failures on demand.</p>
            <div className="hero__ctas">
              <a href={APP_REGISTER_URL} className="btn btn-primary btn-lg">Start for free →</a>
              <Link href="/pricing" className="btn btn-ghost btn-lg">See pricing</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 01 — Instant endpoints (dark) */}
      <section className="feature-section feature-section--dark" id="instant-endpoints" aria-labelledby="f01-heading">
        <div className="container">
          <div className="feature-section__layout">
            <div>
              <span className="feature-section__label">Relay — 01</span>
              <h2 className="heading-lg feature-section__title" id="f01-heading">Instant endpoints.</h2>
              <p className="feature-section__body">Launch a production-ready API endpoint in under 60 seconds. No gateway config, no server to provision, no deployment pipeline. Define your method and action — getrequest generates a unique URL and handles the rest.</p>
              <p className="feature-section__secondary">Every endpoint picks one of three actions: <strong>Static API</strong> for a mock JSON response, <strong>Sync API</strong> to forward and wait for the real reply, or <strong>Async API</strong> to acknowledge instantly and deliver in the background. Switch between them without downtime. The infrastructure layer ships with your first request.</p>
              <ul className="feature-section__list">
                <li className="feature-section__list-item">Live in under 60 seconds, zero config</li>
                <li className="feature-section__list-item">Static, Sync, or Async — pick per endpoint</li>
                <li className="feature-section__list-item">No servers, no gateways, no ops overhead</li>
                <li className="feature-section__list-item">Edit or delete endpoints at any time</li>
              </ul>
            </div>
            <div>
              <div className="dm-frame">
                <div className="dm-frame__bar">
                  <GRMark />
                  <Crumbs items={['Projects', 'Production', 'Endpoints', 'New']} />
                </div>
                <div className="dm-frame__body">
                  <div className="dm-row">
                    <label className="dm-label">API Name</label>
                    <div className="dm-input">Login</div>
                  </div>
                  <div className="dm-row">
                    <label className="dm-label">Methods</label>
                    <div className="dm-methods">
                      <span className="dm-method-pill">GET</span>
                      <span className="dm-method-pill dm-method-pill--active">POST</span>
                      <span className="dm-method-pill">PUT</span>
                      <span className="dm-method-pill">DELETE</span>
                    </div>
                  </div>
                  <div className="dm-row">
                    <label className="dm-label">Action</label>
                    <div className="dm-actions">
                      <div className="dm-action dm-action--active">
                        <div className="dm-action__title">Static API</div>
                        <div className="dm-action__desc">Fixed JSON response</div>
                      </div>
                      <div className="dm-action">
                        <div className="dm-action__title">Sync API</div>
                        <div className="dm-action__desc">Forward &amp; wait</div>
                      </div>
                      <div className="dm-action">
                        <div className="dm-action__title">Async API</div>
                        <div className="dm-action__desc">Ack &amp; deliver later</div>
                      </div>
                    </div>
                  </div>
                  <div className="dm-row">
                    <label className="dm-label">Response — 200 OK</label>
                    <div className="dm-json">{'{'}<br />
                      &nbsp;&nbsp;<span className="dm-k">&quot;status&quot;</span>: <span className="dm-s">&quot;success&quot;</span>,<br />
                      &nbsp;&nbsp;<span className="dm-k">&quot;token&quot;</span>: <span className="dm-s">&quot;eyJhbGc...&quot;</span><br />
                      {'}'}
                    </div>
                  </div>
                  <div className="dm-btn-row">
                    <span className="dm-btn dm-btn--primary">Create</span>
                    <span className="dm-btn dm-btn--outline">Cancel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 02 — Live inspector (light) */}
      <section className="feature-section feature-section--light" id="live-inspector" aria-labelledby="f02-heading">
        <div className="container">
          <div className="feature-section__layout feature-section__layout--reverse">
            <div>
              <span className="feature-section__label">Retain — 01</span>
              <h2 className="heading-lg feature-section__title" id="f02-heading">Live request inspector.</h2>
              <p className="feature-section__body">Total observability into every request — headers, body, status code, latency — the moment it lands. No log aggregation pipeline. No custom instrumentation. No Datadog bill. Observability is built into the infrastructure layer.</p>
              <p className="feature-section__secondary">Whether you&apos;re validating a webhook, auditing third-party traffic, or monitoring a live integration, you have a complete picture without writing a single line of logging code.</p>
              <ul className="feature-section__list">
                <li className="feature-section__list-item">100% request capture, nothing dropped</li>
                <li className="feature-section__list-item">Full headers, body, and response</li>
                <li className="feature-section__list-item">Real-time stream, no refresh</li>
                <li className="feature-section__list-item">Searchable log history up to 30 days</li>
              </ul>
            </div>
            <div>
              <div className="dm-frame">
                <div className="dm-frame__bar">
                  <GRMark />
                  <Crumbs items={['Projects', 'Production', 'Logs']} />
                  <span className="dm-badge dm-badge--live" style={{ marginLeft: 'auto' }}>Live</span>
                </div>
                <div className="dm-frame__body">
                  <div className="dm-list">
                    <div className="dm-row-item">
                      <span className="dm-method dm-method--get">GET</span>
                      <span className="dm-row-item__path">/api/users/profile</span>
                      <span className="dm-badge dm-badge--ok">200</span>
                      <span className="dm-row-item__meta">18ms</span>
                    </div>
                    <div className="dm-row-item dm-row-item--active">
                      <span className="dm-method dm-method--post">POST</span>
                      <span className="dm-row-item__path">/api/auth/login</span>
                      <span className="dm-badge dm-badge--ok">200</span>
                      <span className="dm-row-item__meta">43ms</span>
                    </div>
                    <div className="dm-row-item">
                      <span className="dm-method dm-method--put">PUT</span>
                      <span className="dm-row-item__path">/api/settings</span>
                      <span className="dm-badge dm-badge--err">500</span>
                      <span className="dm-row-item__meta">203ms</span>
                    </div>
                  </div>
                  <div className="dm-row" style={{ marginTop: 14 }}>
                    <label className="dm-label">Request body</label>
                    <div className="dm-json">{'{ '}<span className="dm-k">&quot;user&quot;</span>: <span className="dm-s">&quot;alice&quot;</span>, <span className="dm-k">&quot;action&quot;</span>: <span className="dm-s">&quot;login&quot;</span>{' }'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 03 — Request replay (dark) */}
      <section className="feature-section feature-section--dark" id="request-replay" aria-labelledby="f03-heading">
        <div className="container">
          <div className="feature-section__layout">
            <div>
              <span className="feature-section__label">Recover — 01</span>
              <span className="feature-section__badge">Pro</span>
              <h2 className="heading-lg feature-section__title" id="f03-heading">Request replay.</h2>
              <p className="feature-section__body">Recover from failures with certainty. Re-fire any captured request with one click — exact headers, body, and method preserved. Confirm a fix works before it ships. Reproduce production failures locally without reconstructing the context.</p>
              <p className="feature-section__secondary">Reliability isn&apos;t just about preventing failures — it&apos;s about recovering fast when they happen. Replay closes the gap between &ldquo;we got an error report&rdquo; and &ldquo;we confirmed the fix.&rdquo;</p>
              <ul className="feature-section__list">
                <li className="feature-section__list-item">Exact original payload, headers, and method</li>
                <li className="feature-section__list-item">Fresh response captured for comparison</li>
                <li className="feature-section__list-item">Confirm fixes before merging</li>
                <li className="feature-section__list-item">Reproduce production failures locally</li>
              </ul>
            </div>
            <div>
              <div className="dm-frame">
                <div className="dm-frame__bar">
                  <GRMark />
                  <Crumbs items={['Projects', 'Production', 'Logs', 'req_8xm2k9p']} />
                </div>
                <div className="dm-frame__body">
                  <div className="dm-row">
                    <label className="dm-label">Original — captured 2 hrs ago</label>
                    <div className="dm-row-item" style={{ paddingTop: 0 }}>
                      <span className="dm-method dm-method--put">PUT</span>
                      <span className="dm-row-item__path">/api/settings</span>
                      <span className="dm-badge dm-badge--err">500</span>
                      <span className="dm-row-item__meta">203ms</span>
                    </div>
                    <div className="dm-json" style={{ marginTop: 8 }}>
                      <span className="dm-k">&quot;error&quot;</span>: <span className="dm-s">&quot;Cannot read property &apos;id&apos; of null&quot;</span>
                    </div>
                  </div>
                  <div className="dm-btn-row" style={{ margin: '14px 0' }}>
                    <span className="dm-btn dm-btn--primary">↺ Replay</span>
                    <span className="dm-hint">Exact original headers + body</span>
                  </div>
                  <div className="dm-row">
                    <label className="dm-label">Replay result — fix deployed</label>
                    <div className="dm-row-item" style={{ paddingTop: 0, borderBottom: 'none' }}>
                      <span className="dm-method dm-method--put">PUT</span>
                      <span className="dm-row-item__path">/api/settings</span>
                      <span className="dm-badge dm-badge--ok">200 OK</span>
                      <span className="dm-row-item__meta">31ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 04 — Shareable debug links (light) */}
      <section className="feature-section feature-section--light" id="debug-links" aria-labelledby="f04-heading">
        <div className="container">
          <div className="feature-section__layout feature-section__layout--reverse">
            <div>
              <span className="feature-section__label">Recover — 02</span>
              <span className="feature-section__badge">Pro</span>
              <h2 className="heading-lg feature-section__title" id="f04-heading">Shareable debug links.</h2>
              <p className="feature-section__body">Turn any captured request into a permanent, shareable URL. Paste it in a Slack message, a Jira ticket, or a PR comment. Anyone with the link sees the full request and response — no account required. Cross-team incident response, without the overhead.</p>
              <p className="feature-section__secondary">Incident resolution slows down when context lives in one engineer&apos;s terminal. Shareable links make every failure a shared artifact — visible, referenceable, and linkable across your entire org.</p>
              <ul className="feature-section__list">
                <li className="feature-section__list-item">Permanent link to exact request snapshot</li>
                <li className="feature-section__list-item">Full headers, body, and response visible</li>
                <li className="feature-section__list-item">No account required to view</li>
                <li className="feature-section__list-item">Works across environments and teams</li>
              </ul>
            </div>
            <div>
              <div className="dm-browser">
                <div className="dm-browser__bar">
                  <div className="dm-browser__dots">
                    <span className="dm-browser__dot"></span>
                    <span className="dm-browser__dot"></span>
                    <span className="dm-browser__dot"></span>
                  </div>
                  <span className="dm-browser__url">getrequest.io/share/req_8xm2k9p</span>
                </div>
                <div className="dm-browser__body">
                  <p className="dm-hint" style={{ marginBottom: 12 }}>Shared request snapshot — no account required to view</p>
                  <div className="dm-row-item" style={{ paddingTop: 0 }}>
                    <span className="dm-method dm-method--post">POST</span>
                    <span className="dm-row-item__path">/api/webhooks/stripe</span>
                    <span className="dm-badge dm-badge--err">500</span>
                  </div>
                  <div className="dm-row" style={{ marginTop: 10 }}>
                    <label className="dm-label">Request body</label>
                    <div className="dm-json">
                      {'{ '}<span className="dm-k">&quot;type&quot;</span>: <span className="dm-s">&quot;payment_intent.succeeded&quot;</span>, <span className="dm-k">&quot;data&quot;</span>: {'{ '}<span className="dm-k">&quot;amount&quot;</span>: 4200{' }'}{' }'}
                    </div>
                  </div>
                  <div className="dm-row">
                    <label className="dm-label">Response body</label>
                    <div className="dm-json">{'{ '}<span className="dm-k">&quot;error&quot;</span>: <span className="dm-s">&quot;unhandled event type&quot;</span>{' }'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 05 — Smart forwarding (dark) */}
      <section className="feature-section feature-section--dark" id="smart-forwarding" aria-labelledby="f05-heading">
        <div className="container">
          <div className="feature-section__layout">
            <div>
              <span className="feature-section__label">Relay — 02</span>
              <h2 className="heading-lg feature-section__title" id="f05-heading">Smart forwarding.</h2>
              <p className="feature-section__body"><strong>Sync API</strong> is a transparent proxy layer for any upstream — no SDK, no agent, no code changes required. getrequest routes traffic to your destination, forwards the request body byte-for-byte, and logs everything. The routing layer you&apos;d otherwise have to build yourself.</p>
              <p className="feature-section__secondary">Route to staging, production, or third-party APIs. Validate what your system sends against what the upstream receives. The proxy ships with the infrastructure — there&apos;s nothing extra to configure.</p>
              <ul className="feature-section__list">
                <li className="feature-section__list-item">Works with any upstream, any HTTP client</li>
                <li className="feature-section__list-item">Request body forwarded byte-for-byte</li>
                <li className="feature-section__list-item">Full request + response logged</li>
                <li className="feature-section__list-item">HTTP and HTTPS supported</li>
              </ul>
            </div>
            <div>
              <div className="dm-frame">
                <div className="dm-frame__bar">
                  <GRMark />
                  <Crumbs items={['Projects', 'Production', 'Endpoints', 'Charges']} />
                </div>
                <div className="dm-frame__body">
                  <div className="dm-row">
                    <label className="dm-label">Action</label>
                    <div className="dm-actions">
                      <div className="dm-action">
                        <div className="dm-action__title">Static API</div>
                      </div>
                      <div className="dm-action dm-action--active">
                        <div className="dm-action__title">Sync API</div>
                      </div>
                      <div className="dm-action">
                        <div className="dm-action__title">Async API</div>
                      </div>
                    </div>
                  </div>
                  <div className="dm-row">
                    <label className="dm-label">Destination URL</label>
                    <div className="dm-input">api.stripe.com/v1/charges</div>
                  </div>
                  <div className="dm-row">
                    <label className="dm-label">Proxied &amp; logged</label>
                    <div className="dm-list">
                      <div className="dm-row-item">
                        <span className="dm-method dm-method--post">POST</span>
                        <span className="dm-row-item__path">Charges → api.stripe.com/v1/charges</span>
                        <span className="dm-badge dm-badge--ok">200</span>
                        <span className="dm-row-item__meta">143ms</span>
                      </div>
                      <div className="dm-row-item" style={{ borderBottom: 'none' }}>
                        <span className="dm-method dm-method--post">POST</span>
                        <span className="dm-row-item__path">Charges → api.stripe.com/v1/charges</span>
                        <span className="dm-badge dm-badge--ok">200</span>
                        <span className="dm-row-item__meta">67ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 06 — Usage metering (light) */}
      <section className="feature-section feature-section--light" id="usage-metering" aria-labelledby="f06-heading">
        <div className="container">
          <div className="feature-section__layout feature-section__layout--reverse">
            <div>
              <span className="feature-section__label">Retain — 02</span>
              <h2 className="heading-lg feature-section__title" id="f06-heading">Usage metering.</h2>
              <p className="feature-section__body">Build a reliability baseline from real traffic data. Track request volume per project, spot usage trends before they become capacity problems, and maintain a full audit trail. Get notified before you hit limits — not after traffic drops.</p>
              <p className="feature-section__secondary">Reliability starts with measurement. getrequest makes traffic data visible by default — no separate metrics pipeline, no custom dashboards to maintain.</p>
              <ul className="feature-section__list">
                <li className="feature-section__list-item">Real-time usage dashboard, per project</li>
                <li className="feature-section__list-item">Pre-limit alerts before incidents happen</li>
                <li className="feature-section__list-item">Full audit trail with timestamps</li>
                <li className="feature-section__list-item">Capacity planning from real traffic trends</li>
              </ul>
            </div>
            <div>
              <div className="dm-frame">
                <div className="dm-frame__bar">
                  <GRMark />
                  <Crumbs items={['Settings', 'Usage']} />
                </div>
                <div className="dm-frame__body">
                  <div className="dm-stats">
                    <div className="dm-stat">
                      <div className="dm-stat__label">Used</div>
                      <div className="dm-stat__value">68,110</div>
                    </div>
                    <div className="dm-stat">
                      <div className="dm-stat__label">Remaining</div>
                      <div className="dm-stat__value">31,890</div>
                    </div>
                    <div className="dm-stat">
                      <div className="dm-stat__label">Total quota</div>
                      <div className="dm-stat__value">100,000</div>
                    </div>
                  </div>
                  <div className="dm-row" style={{ marginTop: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#71717a', marginBottom: 6 }}>
                      <span>Progress</span><span>68%</span>
                    </div>
                    <div className="dm-progress">
                      <div className="dm-progress__bar dm-progress__bar--warn" style={{ width: '68%' }} />
                    </div>
                  </div>
                  <div className="dm-row">
                    <label className="dm-label">Daily usage — May 2025</label>
                    <div className="dm-chart">
                      {[32, 48, 40, 60, 52, 70, 58, 66, 74, 54, 62, 80].map((h, i) => (
                        <div key={i} className="dm-chart__bar" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="dm-row" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 8, padding: '8px 12px', fontSize: 11.5, color: '#92400e' }}>
                    ⚠ Production is on track to exceed its monthly limit — upgrade to Pro for 1M requests/mo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 07 — Async delivery (dark) */}
      <section className="feature-section feature-section--dark" id="async-delivery" aria-labelledby="f07-heading">
        <div className="container">
          <div className="feature-section__layout">
            <div>
              <span className="feature-section__label">Relay — 03</span>
              <h2 className="heading-lg feature-section__title" id="f07-heading">Async delivery.</h2>
              <p className="feature-section__body">Acknowledge the caller instantly, deliver to your backend in the background. Built for webhooks and any traffic where the caller shouldn&apos;t wait on — or be blocked by — your response.</p>
              <p className="feature-section__secondary">A failed delivery isn&apos;t a lost one. getrequest retries automatically on a backoff schedule, re-reading your destination and auth config on every attempt, so a fix or a rotated credential takes effect on the very next try.</p>
              <ul className="feature-section__list">
                <li className="feature-section__list-item">Caller gets a 202 immediately, every time</li>
                <li className="feature-section__list-item">Up to 6 automatic retry attempts, ~36 minutes</li>
                <li className="feature-section__list-item">Live delivery status: retrying, delivered, failed</li>
                <li className="feature-section__list-item">Available on every plan, including Free</li>
              </ul>
              <p className="feature-section__secondary">
                <a href={`${DOCS_URL}/guides/async-api`} className="feature-section__link">See the exact retry schedule and delivery states →</a>
              </p>
            </div>
            <div>
              <div className="dm-frame">
                <div className="dm-frame__bar">
                  <GRMark />
                  <Crumbs items={['Projects', 'Production', 'Endpoints', 'Stripe webhook']} />
                </div>
                <div className="dm-frame__body">
                  <div className="dm-row">
                    <label className="dm-label">Action</label>
                    <div className="dm-actions">
                      <div className="dm-action"><div className="dm-action__title">Static API</div></div>
                      <div className="dm-action"><div className="dm-action__title">Sync API</div></div>
                      <div className="dm-action dm-action--active"><div className="dm-action__title">Async API</div></div>
                    </div>
                  </div>
                  <div className="dm-row">
                    <label className="dm-label">Destination URL</label>
                    <div className="dm-input">api.example.com/webhooks/stripe</div>
                  </div>
                  <div className="dm-row">
                    <div className="dm-row-item" style={{ paddingTop: 0 }}>
                      <span className="dm-method dm-method--post">POST</span>
                      <span className="dm-row-item__path">Stripe webhook</span>
                      <span className="dm-badge dm-badge--ok">202 Accepted</span>
                    </div>
                    <p className="dm-hint">Caller is acknowledged instantly — delivery continues in the background</p>
                  </div>
                  <div className="dm-row">
                    <label className="dm-label">Delivery attempts</label>
                    <div className="dm-list">
                      <div className="dm-row-item">
                        <span className="dm-row-item__path">attempt 1 · immediate</span>
                        <span className="dm-badge dm-badge--err">timeout</span>
                      </div>
                      <div className="dm-row-item">
                        <span className="dm-row-item__path">attempt 2 · +15s</span>
                        <span className="dm-badge dm-badge--warn">retrying</span>
                      </div>
                      <div className="dm-row-item" style={{ borderBottom: 'none' }}>
                        <span className="dm-row-item__path">attempt 3 · +60s</span>
                        <span className="dm-badge dm-badge--ok">delivered ✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 08 — Authentication (light) */}
      <section className="feature-section feature-section--light" id="authentication" aria-labelledby="f08-heading">
        <div className="container">
          <div className="feature-section__layout feature-section__layout--reverse">
            <div>
              <span className="feature-section__label">Relay — 04</span>
              <h2 className="heading-lg feature-section__title" id="f08-heading">Built-in authentication.</h2>
              <p className="feature-section__body">Require a credential on incoming requests before getrequest processes them, and attach a credential to the outbound call it makes to your backend — two completely independent settings.</p>
              <p className="feature-section__secondary">Bearer, API Key, Basic Auth, or HMAC signature verification on the way in. The same four options signing or authenticating the call on the way out — reapplied automatically on every retry attempt.</p>
              <ul className="feature-section__list">
                <li className="feature-section__list-item">Verify inbound callers — Bearer, API Key, Basic, HMAC</li>
                <li className="feature-section__list-item">Authenticate to your own backend the same way</li>
                <li className="feature-section__list-item">Verify webhook provider signatures for you, before your handler runs</li>
                <li className="feature-section__list-item">Available on every plan, including Free</li>
              </ul>
            </div>
            <div>
              <div className="dm-frame">
                <div className="dm-frame__bar">
                  <GRMark />
                  <Crumbs items={['Projects', 'Production', 'Endpoints', 'Stripe webhook']} />
                </div>
                <div className="dm-frame__body">
                  <div className="dm-row">
                    <label className="dm-label">Authentication — verifies the caller</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div className="dm-input" style={{ flex: 1 }}>HMAC</div>
                      <div className="dm-input" style={{ flex: 1 }}>Stripe-Signature</div>
                    </div>
                    <div className="dm-row-item" style={{ paddingTop: 10 }}>
                      <span className="dm-method dm-method--post">POST</span>
                      <span className="dm-row-item__path">Stripe webhook</span>
                      <span className="dm-badge dm-badge--ok">✓ verified → forwarded</span>
                    </div>
                  </div>
                  <div className="dm-row">
                    <label className="dm-label">Destination authentication — calls your backend</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div className="dm-input" style={{ flex: 1 }}>Bearer</div>
                      <div className="dm-input" style={{ flex: 1 }}>••••••••</div>
                    </div>
                    <p className="dm-hint">Authorization: Bearer •••••••• → attached on every attempt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 09 — Bulk retry (dark) */}
      <section className="feature-section feature-section--dark" id="bulk-retry" aria-labelledby="f09-heading">
        <div className="container">
          <div className="feature-section__layout">
            <div>
              <span className="feature-section__label">Recover — 03</span>
              <span className="feature-section__badge">Pro</span>
              <h2 className="heading-lg feature-section__title" id="f09-heading">Bulk retry.</h2>
              <p className="feature-section__body">An outage doesn&apos;t fail one request — it fails hundreds. Select exactly the rows you want and retry them together, or apply a filter and let getrequest sweep up every matching request as a tracked background job, paced so it never hammers your recovering backend.</p>
              <p className="feature-section__secondary">Recurring failures are grouped for you automatically on the Retries page — endpoint, status, and error — so recovering from an incident starts with one click, not a manual filter you have to reconstruct every time.</p>
              <ul className="feature-section__list">
                <li className="feature-section__list-item">Manual selection — up to 100 requests, retried instantly</li>
                <li className="feature-section__list-item">Filter-based — unbounded size, runs as a cancellable background job</li>
                <li className="feature-section__list-item">Paced delivery — 10 requests/sec, won&apos;t re-overwhelm your backend</li>
                <li className="feature-section__list-item">Auto-grouped recurring failures on the Retries page</li>
              </ul>
            </div>
            <div>
              <div className="dm-frame">
                <div className="dm-frame__bar">
                  <GRMark />
                  <Crumbs items={['Projects', 'Production', 'Retries']} />
                </div>
                <div className="dm-frame__body">
                  <div className="dm-row">
                    <label className="dm-label">Filter — status = 5xx · endpoint = /api/charges · last 2h</label>
                    <div className="dm-row-item" style={{ paddingTop: 0, borderBottom: 'none' }}>
                      <span className="dm-row-item__path">214 requests match</span>
                      <span className="dm-btn dm-btn--primary">Start Bulk Retry</span>
                    </div>
                  </div>
                  <div className="dm-row">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#71717a', marginBottom: 6 }}>
                      <span>Paced at 10 req/s</span><span>191 / 214</span>
                    </div>
                    <div className="dm-progress">
                      <div className="dm-progress__bar" style={{ width: '89%' }} />
                    </div>
                  </div>
                  <div className="dm-stats">
                    <div className="dm-stat">
                      <div className="dm-stat__label">Delivered</div>
                      <div className="dm-stat__value" style={{ color: '#047857' }}>198</div>
                    </div>
                    <div className="dm-stat">
                      <div className="dm-stat__label">Failed</div>
                      <div className="dm-stat__value" style={{ color: '#b91c1c' }}>9</div>
                    </div>
                    <div className="dm-stat">
                      <div className="dm-stat__label">Pending</div>
                      <div className="dm-stat__value" style={{ color: '#b45309' }}>7</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="container container--narrow">
          <h2 className="heading-xl cta-section__title" id="cta-heading">Relay. Retain. Recover. From day one.</h2>
          <p className="cta-section__sub">No gateway to configure. No code to add. Point one URL and the reliability layer is live.</p>
          <a href={APP_REGISTER_URL} className="btn btn-primary btn-lg">Start for free →</a>
        </div>
      </section>
    </main>
  )
}
