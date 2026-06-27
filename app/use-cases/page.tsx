import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { APP_REGISTER_URL } from '@/lib/urls'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/jsonld'

export const metadata: Metadata = buildMetadata({
  title: 'Use Cases',
  description: 'getrequest fits wherever you need to launch, observe, or recover from API failures. Mock APIs, capture webhooks, proxy upstreams, replay failures, share debug evidence, and more.',
  path: '/use-cases',
})

export default function UseCasesPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: 'https://getrequest.io' },
        { name: 'Use Cases', url: 'https://getrequest.io/use-cases' },
      ])} />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container">
          <div className="hero__inner">
            <span className="hero__label">// api reliability infrastructure</span>
            <h1 className="heading-hero hero__title" id="hero-heading">One infrastructure layer.<br />Dozens of use cases.</h1>
            <p className="hero__sub">getrequest fits wherever teams need to launch, observe, or recover from API failures — without managing the underlying stack.</p>
          </div>
        </div>
      </section>

      {/* USE CASES GRID */}
      <section className="section section--light" id="scenarios" aria-labelledby="scenarios-heading">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="label label--light">// scenarios</span>
            <h2 className="heading-xl" id="scenarios-heading">Pick your scenario.</h2>
            <p className="section__sub section__sub--light section__sub--center">Every scenario below is a real situation teams face when building on APIs. getrequest covers all of them.</p>
          </div>
          <div className="use-case-grid">
            <div className="use-case-card">
              <span className="use-case-card__plan">Free</span>
              <h3 className="use-case-card__title">Launch APIs without a backend</h3>
              <p className="use-case-card__desc">Your backend isn&apos;t ready. Launch a getrequest endpoint that returns real JSON and unblock your frontend team immediately — no server to provision, no config to manage.</p>
              <code className="use-case-card__code">action: mock_json</code>
            </div>
            <div className="use-case-card">
              <span className="use-case-card__plan">Free</span>
              <h3 className="use-case-card__title">Capture and inspect webhooks</h3>
              <p className="use-case-card__desc">A third-party service is firing webhooks and your handler is broken. Point the webhook URL at getrequest — every payload is captured and inspectable before you write a single handler.</p>
              <code className="use-case-card__code">POST /webhooks/stripe → captured</code>
            </div>
            <div className="use-case-card">
              <span className="use-case-card__plan">Free</span>
              <h3 className="use-case-card__title">Observe upstream API traffic</h3>
              <p className="use-case-card__desc">Replace your upstream URL with a getrequest forwarding endpoint. Every request your system sends and every response it receives is now fully visible — without touching your code.</p>
              <code className="use-case-card__code">destination: api.stripe.com</code>
            </div>
            <div className="use-case-card">
              <span className="use-case-card__plan">Pro</span>
              <h3 className="use-case-card__title">Recover from production failures</h3>
              <p className="use-case-card__desc">A request failed in production. Find it in the log, replay it against your fixed build, confirm the issue is resolved — before it ships. Failure recovery with one click.</p>
              <code className="use-case-card__code">↺ replay req_8xm2k9p</code>
            </div>
            <div className="use-case-card">
              <span className="use-case-card__plan">Pro</span>
              <h3 className="use-case-card__title">Share incident evidence across teams</h3>
              <p className="use-case-card__desc">Generate a permanent link to any captured request and paste it in the incident ticket. Your whole team sees the exact failure — headers, body, response — without needing access to your environment.</p>
              <code className="use-case-card__code">getrequest.io/share/req_...</code>
            </div>
            <div className="use-case-card">
              <span className="use-case-card__plan">Free</span>
              <h3 className="use-case-card__title">Validate integration contracts</h3>
              <p className="use-case-card__desc">Verify that a third party is sending the right fields in the right format before your handler goes live. Capture inbound requests and inspect the schema against your expectations.</p>
              <code className="use-case-card__code">POST /webhooks/partner → inspect</code>
            </div>
            <div className="use-case-card">
              <span className="use-case-card__plan">Free</span>
              <h3 className="use-case-card__title">Replace your API gateway</h3>
              <p className="use-case-card__desc">Route and log API traffic without running Nginx, Kong, or Kubernetes. getrequest is the gateway layer for teams that need to move fast without a platform engineer managing it.</p>
              <code className="use-case-card__code">route: /api/* → upstream</code>
            </div>
            <div className="use-case-card">
              <span className="use-case-card__plan">Free</span>
              <h3 className="use-case-card__title">Test API reliability pre-launch</h3>
              <p className="use-case-card__desc">Stand up a getrequest endpoint for your new API surface before wiring it to a real backend. Validate request shapes, response contracts, and failure modes under real conditions.</p>
              <code className="use-case-card__code">action: mock_json | forward</code>
            </div>
          </div>
        </div>
      </section>

      {/* PERSONA SECTION */}
      <section className="section section--light" aria-labelledby="persona-heading">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="label label--light">// who uses getrequest</span>
            <h2 className="heading-xl" id="persona-heading">Built for every team that builds on APIs.</h2>
            <p className="section__sub section__sub--light section__sub--center">getrequest scales from a solo side project to a platform team managing production API traffic.</p>
          </div>
          <div className="persona-grid">
            <div className="persona-card">
              <div className="persona-card__icon" aria-hidden="true">⌨</div>
              <h3 className="persona-card__title">Backend &amp; API engineers</h3>
              <p className="persona-card__desc">Launch endpoints instantly, observe every request without instrumenting anything, and replay failures to confirm fixes. getrequest is the reliability layer you&apos;d otherwise have to build yourself.</p>
            </div>
            <div className="persona-card">
              <div className="persona-card__icon" aria-hidden="true">⚙</div>
              <h3 className="persona-card__title">Platform &amp; DevOps teams</h3>
              <p className="persona-card__desc">Replace the gateway config, log aggregation pipeline, and request tracing stack with one tool. getrequest covers launch, observe, and recover — without a dedicated engineer to maintain each layer.</p>
            </div>
            <div className="persona-card">
              <div className="persona-card__icon" aria-hidden="true">✓</div>
              <h3 className="persona-card__title">QA &amp; reliability engineers</h3>
              <p className="persona-card__desc">Validate exactly what your system sends and what the API returns. Capture inbound requests, inspect every field against expected schema, replay failures precisely, and share evidence across teams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="container container--narrow">
          <h2 className="heading-xl cta-section__title" id="cta-heading">Your stack. Without the overhead.</h2>
          <p className="cta-section__sub">getrequest is the API reliability infrastructure your team can launch today — no gateway config, no observability pipeline, no ops team.</p>
          <a href={APP_REGISTER_URL} className="btn btn-primary btn-lg">Start for free →</a>
        </div>
      </section>
    </main>
  )
}
