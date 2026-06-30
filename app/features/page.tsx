import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { APP_REGISTER_URL } from '@/lib/urls'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/jsonld'

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
              <p className="feature-section__body">Launch a production-ready API endpoint in under 60 seconds. No gateway config, no server to provision, no deployment pipeline. Define your method, slug, and action — getrequest handles the rest.</p>
              <p className="feature-section__secondary">Return static JSON for mock APIs, or forward to any upstream. Switch between actions without downtime. The infrastructure layer ships with your first request.</p>
              <ul className="feature-section__list">
                <li className="feature-section__list-item">Live in under 60 seconds, zero config</li>
                <li className="feature-section__list-item">Mock JSON or proxy any upstream</li>
                <li className="feature-section__list-item">No servers, no gateways, no ops overhead</li>
                <li className="feature-section__list-item">Edit or delete endpoints at any time</li>
              </ul>
            </div>
            <div>
              <div className="code-window">
                <div className="code-window__bar">
                  <div className="code-window__dots"><span className="code-window__dot"></span><span className="code-window__dot"></span><span className="code-window__dot"></span></div>
                  <span className="code-window__title">endpoint config — getrequest.io/proj_k8s3</span>
                </div>
                <div className="code-window__body">
                  <pre><span className="tok-comment"># Define once. Live immediately.</span>{`

`}<span className="tok-key">method</span><span className="tok-dim">:</span>{`      `}<span className="tok-method-post">POST</span>{`
`}<span className="tok-key">slug</span><span className="tok-dim">:</span>{`        `}<span className="tok-path">/api/auth/login</span>{`
`}<span className="tok-key">action</span><span className="tok-dim">:</span>{`      `}<span className="tok-value">mock_json</span>{`
`}<span className="tok-key">response</span><span className="tok-dim">:</span>{`    `}<span className="tok-status-ok">200 OK</span>{`

`}<span className="tok-dim">{'{'}</span>{`
  `}<span className="tok-key">&quot;status&quot;</span><span className="tok-dim">:</span>{`  `}<span className="tok-string">&quot;success&quot;</span><span className="tok-dim">,</span>{`
  `}<span className="tok-key">&quot;token&quot;</span><span className="tok-dim">:</span>{`   `}<span className="tok-string">&quot;eyJhbGc...&quot;</span>{`
`}<span className="tok-dim">{'}'}</span>{`

`}<span className="tok-comment"># Switch to forwarding with one edit:</span>{`
`}<span className="tok-key">action</span><span className="tok-dim">:</span>{`      `}<span className="tok-value">forward</span>{`
`}<span className="tok-key">destination</span><span className="tok-dim">:</span>{` `}<span className="tok-url">api.example.com/auth/login</span></pre>
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
              <div className="code-window code-window--light">
                <div className="code-window__bar">
                  <div className="code-window__dots"><span className="code-window__dot"></span><span className="code-window__dot"></span><span className="code-window__dot"></span></div>
                  <span className="code-window__title">Live request log</span>
                </div>
                <div className="code-window__body">
                  <pre><span className="tok-comment">// Captured 2s ago</span>{`
`}<span className="tok-method-post">POST</span>{` `}<span className="tok-path">/api/auth/login</span>{`  ·  `}<span className="tok-status-ok">200 OK</span>{`  ·  `}<span className="tok-dim">43ms</span>{`

`}<span className="tok-key">content-type</span><span className="tok-dim">:</span>{`   `}<span className="tok-value">application/json</span>{`
`}<span className="tok-key">authorization</span><span className="tok-dim">:</span>{`  `}<span className="tok-string">Bearer eyJhbGc...</span>{`
`}<span className="tok-key">x-request-id</span><span className="tok-dim">:</span>{`  `}<span className="tok-string">req_8xm2k9p</span>{`

`}<span className="tok-comment">// Request body</span>{`
`}<span className="tok-dim">{'{'}</span>{` `}<span className="tok-key">&quot;user&quot;</span><span className="tok-dim">:</span>{` `}<span className="tok-string">&quot;alice&quot;</span><span className="tok-dim">,</span>{` `}<span className="tok-key">&quot;action&quot;</span><span className="tok-dim">:</span>{` `}<span className="tok-string">&quot;login&quot;</span>{` `}<span className="tok-dim">{'}'}</span>{`

`}<span className="tok-comment">// Response body</span>{`
`}<span className="tok-dim">{'{'}</span>{` `}<span className="tok-key">&quot;status&quot;</span><span className="tok-dim">:</span>{` `}<span className="tok-string">&quot;success&quot;</span><span className="tok-dim">,</span>{` `}<span className="tok-key">&quot;token&quot;</span><span className="tok-dim">:</span>{` `}<span className="tok-string">&quot;eyJhbGc...&quot;</span>{` `}<span className="tok-dim">{'}'}</span></pre>
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
              <div className="code-window">
                <div className="code-window__bar">
                  <div className="code-window__dots"><span className="code-window__dot"></span><span className="code-window__dot"></span><span className="code-window__dot"></span></div>
                  <span className="code-window__title">Replaying req_8xm2k9p</span>
                </div>
                <div className="code-window__body">
                  <pre><span className="tok-comment">// Original — captured 2 hrs ago</span>{`
`}<span className="tok-method-put">PUT</span>{` `}<span className="tok-path">/api/settings</span>{`  ·  `}<span className="tok-status-err">500</span>{`  ·  `}<span className="tok-dim">203ms</span>{`

`}<span className="tok-comment">// Replaying with original headers + body</span>{`
`}<span className="tok-key">status</span><span className="tok-dim">:</span>{` `}<span className="tok-value">replaying...</span>{`

`}<span className="tok-comment">// Result</span>{`
`}<span className="tok-method-put">PUT</span>{` `}<span className="tok-path">/api/settings</span>{`  ·  `}<span className="tok-status-err">500</span>{`  ·  `}<span className="tok-dim">198ms</span>{`

`}<span className="tok-comment">// Bug confirmed. Response diff available.</span>{`
`}<span className="tok-key">&quot;error&quot;</span><span className="tok-dim">:</span>{` `}<span className="tok-string">&quot;Cannot read property &apos;id&apos; of null&quot;</span>{`

`}<span className="tok-comment">// Fix deployed. Replaying again...</span>{`
`}<span className="tok-method-put">PUT</span>{` `}<span className="tok-path">/api/settings</span>{`  ·  `}<span className="tok-status-ok">200 OK</span>{`  ·  `}<span className="tok-dim">31ms</span></pre>
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
              <div className="code-window code-window--light">
                <div className="code-window__bar">
                  <div className="code-window__dots"><span className="code-window__dot"></span><span className="code-window__dot"></span><span className="code-window__dot"></span></div>
                  <span className="code-window__title">getrequest.io/share/req_8xm2k9p</span>
                </div>
                <div className="code-window__body">
                  <pre><span className="tok-comment"># Shared request snapshot</span>{`
`}<span className="tok-comment"># Anyone with this link can inspect it</span>{`

`}<span className="tok-method-post">POST</span>{`  `}<span className="tok-path">/api/webhooks/stripe</span>{`
`}<span className="tok-key">Host</span><span className="tok-dim">:</span>{` `}<span className="tok-url">api.example.com</span>{`

`}<span className="tok-key">stripe-signature</span><span className="tok-dim">:</span>{` `}<span className="tok-string">t=1714000000,...</span>{`
`}<span className="tok-key">content-type</span><span className="tok-dim">:</span>{` `}<span className="tok-value">application/json</span>{`

`}<span className="tok-dim">{'{'}</span>{`
  `}<span className="tok-key">&quot;type&quot;</span><span className="tok-dim">:</span>{` `}<span className="tok-string">&quot;payment_intent.succeeded&quot;</span><span className="tok-dim">,</span>{`
  `}<span className="tok-key">&quot;data&quot;</span><span className="tok-dim">:</span>{` `}<span className="tok-dim">{'{'}</span>{` `}<span className="tok-key">&quot;object&quot;</span><span className="tok-dim">:</span>{` `}<span className="tok-dim">{'{'}</span>{` `}<span className="tok-key">&quot;amount&quot;</span><span className="tok-dim">:</span>{` `}<span className="tok-number">4200</span>{` `}<span className="tok-dim">{'}'}</span>{` `}<span className="tok-dim">{'}'}</span>{`
`}<span className="tok-dim">{'}'}</span>{`

`}<span className="tok-dim">---</span>{`
`}<span className="tok-key">Response</span><span className="tok-dim">:</span>{` `}<span className="tok-status-err">500 Internal Server Error</span>{`
`}<span className="tok-key">Body</span><span className="tok-dim">:</span>{` `}<span className="tok-dim">{'{'}</span>{` `}<span className="tok-key">&quot;error&quot;</span><span className="tok-dim">:</span>{` `}<span className="tok-string">&quot;unhandled event type&quot;</span>{` `}<span className="tok-dim">{'}'}</span></pre>
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
              <p className="feature-section__body">A transparent proxy layer for any upstream — no SDK, no agent, no code changes required. getrequest routes traffic to your destination, captures the full exchange, and logs everything without modifying a single byte in transit. The routing layer you&apos;d otherwise have to build yourself.</p>
              <p className="feature-section__secondary">Route to staging, production, or third-party APIs. Validate what your system sends against what the upstream receives. The proxy ships with the infrastructure — there&apos;s nothing extra to configure.</p>
              <ul className="feature-section__list">
                <li className="feature-section__list-item">Works with any upstream, any HTTP client</li>
                <li className="feature-section__list-item">Zero byte modification in transit</li>
                <li className="feature-section__list-item">Full request + response logged</li>
                <li className="feature-section__list-item">HTTP and HTTPS supported</li>
              </ul>
            </div>
            <div>
              <div className="code-window">
                <div className="code-window__bar">
                  <div className="code-window__dots"><span className="code-window__dot"></span><span className="code-window__dot"></span><span className="code-window__dot"></span></div>
                  <span className="code-window__title">Forwarding config</span>
                </div>
                <div className="code-window__body">
                  <pre><span className="tok-comment"># Forward to your real API</span>{`
`}<span className="tok-key">action</span><span className="tok-dim">:</span>{`       `}<span className="tok-value">forward</span>{`
`}<span className="tok-key">destination</span><span className="tok-dim">:</span>{`  `}<span className="tok-url">api.stripe.com</span>{`

`}<span className="tok-comment"># Every request is proxied and logged:</span>{`
`}<span className="tok-method-post">POST</span>{`  `}<span className="tok-path">/v1/charges</span>{`  → `}<span className="tok-url">api.stripe.com/v1/charges</span>{`
  `}<span className="tok-key">status</span><span className="tok-dim">:</span>{`   `}<span className="tok-status-ok">200 OK</span>{`
  `}<span className="tok-key">latency</span><span className="tok-dim">:</span>{`  `}<span className="tok-dim">143ms</span>{`
  `}<span className="tok-key">logged</span><span className="tok-dim">:</span>{`   `}<span className="tok-value">yes</span>{`

`}<span className="tok-method-get">GET</span>{`   `}<span className="tok-path">/v1/customers</span>{`  → `}<span className="tok-url">api.stripe.com/v1/customers</span>{`
  `}<span className="tok-key">status</span><span className="tok-dim">:</span>{`   `}<span className="tok-status-ok">200 OK</span>{`
  `}<span className="tok-key">latency</span><span className="tok-dim">:</span>{`  `}<span className="tok-dim">67ms</span>{`
  `}<span className="tok-key">logged</span><span className="tok-dim">:</span>{`   `}<span className="tok-value">yes</span></pre>
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
              <div className="code-window code-window--light">
                <div className="code-window__bar">
                  <div className="code-window__dots"><span className="code-window__dot"></span><span className="code-window__dot"></span><span className="code-window__dot"></span></div>
                  <span className="code-window__title">Usage dashboard — May 2025</span>
                </div>
                <div className="code-window__body">
                  <pre><span className="tok-key">Project</span>{`         `}<span className="tok-dim">Requests   Limit    Used</span>{`
`}<span className="tok-dim">─────────────────────────────────────────</span>{`
`}<span className="tok-path">proj_api</span>{`        `}<span className="tok-number">48,231</span>{`     `}<span className="tok-dim">100,000</span>{`  `}<span className="tok-status-warn">48.2%</span>{`
`}<span className="tok-path">proj_webhooks</span>{`   `}<span className="tok-number">12,048</span>{`     `}<span className="tok-dim">100,000</span>{`  `}<span className="tok-status-ok">12.0%</span>{`
`}<span className="tok-path">proj_staging</span>{`    `}<span className="tok-number">7,831</span>{`      `}<span className="tok-dim">100,000</span>{`  `}<span className="tok-status-ok"> 7.8%</span>{`
`}<span className="tok-dim">─────────────────────────────────────────</span>{`
`}<span className="tok-key">Total</span>{`           `}<span className="tok-number">68,110</span>{`     `}<span className="tok-dim">100,000</span>{`  `}<span className="tok-status-warn">68.1%</span>{`

`}<span className="tok-status-warn">⚠</span>{`  `}<span className="tok-dim">proj_api on track to exceed limit</span>{`
   `}<span className="tok-dim">Upgrade to Pro for 1M requests/mo</span></pre>
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
