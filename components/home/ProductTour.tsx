'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { GRMark, Crumbs } from '@/components/dashboard-mockup'

const TABS = [
  { key: 'endpoint', label: 'Built-in Auth', note: 'Pick an action, set a destination, require a credential from callers, and attach a different one to the outbound call. No redeploy.' },
  { key: 'inspector', label: 'Inspect', note: 'Every request, the moment it lands. Method, status, endpoint, duration. Filter by any of them, or search headers and bodies.' },
  { key: 'payload', label: 'Request-Response', note: 'The full exchange, side by side. Request headers and body as your caller sent them; response as your destination returned it.' },
  { key: 'replay', label: 'Replay', note: 'Re-send the exact original to the endpoint’s destination. The new response is stored next to the original, which is never modified. Pro and Gro.' },
  { key: 'async', label: 'Auto-retry', note: 'Async API answers 202 and delivers in the background: up to 6 attempts over about 36 minutes, 10 seconds each. Every attempt is recorded.' },
  { key: 'bulk', label: 'Bulk Retry', note: 'The Retries page groups the last 7 days of failures by endpoint, status, and error. Retry a whole group, or hand-pick up to 100. Pro and Gro.' },
] as const

type TabKey = (typeof TABS)[number]['key']

const LOGS = [
  { m: 'POST', name: 'Order checkout', status: '201', tone: 'ok', ms: '84ms', t: 'just now' },
  { m: 'POST', name: 'Stripe webhook', status: '202', tone: 'ok', ms: '12ms', t: '4s ago' },
  { m: 'POST', name: 'Order checkout', status: '502', tone: 'err', ms: '31ms', t: '9s ago', active: true },
  { m: 'GET', name: 'Get order', status: '404', tone: 'warn', ms: '22ms', t: '14s ago' },
  { m: 'POST', name: 'HubSpot sync', status: '200', tone: 'ok', ms: '143ms', t: '21s ago' },
  { m: 'POST', name: 'Create ticket', status: '401', tone: 'warn', ms: '3ms', t: '30s ago' },
]

function Frame({ crumbs, right, children }: { crumbs: string[]; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="dm-frame pt-frame">
      <div className="dm-frame__bar">
        <GRMark />
        <Crumbs items={crumbs} />
        {right && <span style={{ marginLeft: 'auto' }}>{right}</span>}
      </div>
      <div className="dm-frame__body">{children}</div>
    </div>
  )
}

function Method({ m }: { m: string }) {
  return <span className={`dm-method dm-method--${m.toLowerCase()}`}>{m}</span>
}

function Inspector() {
  return (
    <Frame crumbs={['Production', 'Logs']} right={<span className="dm-badge dm-badge--live">Live</span>}>
      <div className="pt-filters">
        <span className="pt-filter pt-filter--on">Status: any</span>
        <span className="pt-filter">Method: any</span>
        <span className="pt-filter">Last 1 hour</span>
        <span className="pt-search">Search headers, body…</span>
      </div>
      <div className="dm-list">
        {LOGS.map((l, i) => (
          <div key={i} className={`dm-row-item${l.active ? ' dm-row-item--active' : ''}`}>
            <Method m={l.m} />
            <span className="dm-row-item__path">{l.name}</span>
            <span className={`dm-badge dm-badge--${l.tone}`}>{l.status}</span>
            <span className="dm-row-item__meta">{l.ms} · {l.t}</span>
          </div>
        ))}
      </div>
    </Frame>
  )
}

function Payload() {
  return (
    <Frame crumbs={['Production', 'Logs', 'req_8xm2k9p']} right={<span className="dm-badge dm-badge--err">502</span>}>
      <div className="pt-meta">
        <Method m="POST" />
        <span className="pt-mono">e.getrequest.io/aB3dEf7gH9jK2mN4</span>
        <span className="pt-meta__r">Sync API · 31ms · Oct 19, 14:02:11</span>
      </div>
      <div className="pt-split">
        <div>
          <span className="dm-label">Request</span>
          <pre className="dm-json pt-pre">
            <span className="dm-d">content-type: application/json</span>{'\n'}
            <span className="dm-d">x-request-source: checkout-web</span>{'\n\n'}
            {'{\n  '}<span className="dm-k">&quot;order_id&quot;</span>: <span className="dm-s">&quot;ord_8841&quot;</span>,{'\n  '}
            <span className="dm-k">&quot;items&quot;</span>: [{'{ '}<span className="dm-k">&quot;sku&quot;</span>: <span className="dm-s">&quot;SKU-123&quot;</span>, <span className="dm-k">&quot;qty&quot;</span>: 2 {'}'}],{'\n  '}
            <span className="dm-k">&quot;total&quot;</span>: 59.98{'\n}'}
          </pre>
        </div>
        <div>
          <span className="dm-label">Response</span>
          <pre className="dm-json pt-pre">
            <span className="dm-d">HTTP 502 Bad Gateway</span>{'\n'}
            <span className="dm-d">content-type: application/json</span>{'\n\n'}
            {'{\n  '}<span className="dm-k">&quot;error&quot;</span>: <span className="dm-s">&quot;Upstream request failed&quot;</span>{'\n}'}
          </pre>
        </div>
      </div>
      <div className="dm-btn-row" style={{ marginTop: 14 }}>
        <span className="dm-btn dm-btn--primary">↺ Replay</span>
        <span className="dm-btn dm-btn--outline">⎘ Share link</span>
        <span className="pt-hint">Share links expire after 30 days and can be revoked.</span>
      </div>
    </Frame>
  )
}

function Replay() {
  return (
    <Frame crumbs={['Production', 'Logs', 'req_8xm2k9p']}>
      <div className="pt-replay">
        <div className="pt-attempt">
          <span className="pt-attempt__k">Original</span>
          <Method m="POST" />
          <span className="dm-badge dm-badge--err">502</span>
          <span className="pt-mono pt-dim">Upstream request failed · 31ms</span>
          <span className="pt-attempt__t">14:02:11</span>
        </div>
        <div className="pt-arrow" aria-hidden="true">↺ replayed with the same method, headers, and body</div>
        <div className="pt-attempt pt-attempt--ok">
          <span className="pt-attempt__k">Replay</span>
          <Method m="POST" />
          <span className="dm-badge dm-badge--ok">201</span>
          <span className="pt-mono pt-dim">{'{ "status": "confirmed" }'} · 91ms</span>
          <span className="pt-attempt__t">14:19:40</span>
        </div>
      </div>
      <p className="pt-hint" style={{ marginTop: 14 }}>The original record stays exactly as captured. Replays are manual, limited to 20 per minute, and work on Sync and Async endpoints.</p>
    </Frame>
  )
}

const ATTEMPTS = [
  { n: 1, at: 'immediately', status: '503', tone: 'err' },
  { n: 2, at: '+15s', status: '503', tone: 'err' },
  { n: 3, at: '+60s', status: 'timeout', tone: 'err' },
  { n: 4, at: '+5m', status: '200', tone: 'ok' },
]

function Async() {
  return (
    <Frame crumbs={['Production', 'Logs', 'Stripe webhook']} right={<span className="dm-badge dm-badge--ok">delivered</span>}>
      <div className="pt-meta">
        <span className="dm-badge dm-badge--ok">202</span>
        <span className="pt-mono pt-dim">{'{ "status": "Success", "request_id": "3f9c1e2a-…" }'}</span>
        <span className="pt-meta__r">returned to caller</span>
      </div>
      <ol className="pt-attempts">
        {ATTEMPTS.map((a) => (
          <li key={a.n} className={`pt-att pt-att--${a.tone}`}>
            <span className="pt-att__dot" />
            <span className="pt-att__n">Attempt {a.n}</span>
            <span className="pt-att__at">{a.at}</span>
            <span className={`dm-badge dm-badge--${a.tone}`}>{a.status}</span>
          </li>
        ))}
        <li className="pt-att pt-att--idle"><span className="pt-att__dot" /><span className="pt-att__n">Attempts 5–6</span><span className="pt-att__at">+15m, +15m</span><span className="pt-dim pt-mono">not needed</span></li>
      </ol>
      <p className="pt-hint">A 202 means the request was accepted for delivery, not that it was delivered. If all 6 attempts fail, delivery_status becomes failed and the request waits for a manual replay.</p>
    </Frame>
  )
}

const GROUPS = [
  { name: 'Order checkout', status: '502', err: 'Upstream request failed', n: 214 },
  { name: 'Order checkout', status: '504', err: 'Upstream timeout', n: 37 },
  { name: 'Stripe webhook', status: '500', err: 'Internal Server Error', n: 9 },
]

function Bulk() {
  return (
    <Frame crumbs={['Production', 'Retries']}>
      <p className="dm-hint" style={{ marginBottom: 12 }}>Failures in the last 7 days, grouped by endpoint, status, and error</p>
      <div className="pt-groups">
        {GROUPS.map((g, i) => (
          <div key={i} className="pt-group">
            <div>
              <div className="pt-group__t">{g.name} <span className="dm-badge dm-badge--err">{g.status}</span></div>
              <div className="pt-group__s">{g.err}</div>
            </div>
            <span className="pt-group__n">{g.n} requests</span>
            <span className="dm-btn dm-btn--outline">Resolve</span>
            <span className={`dm-btn ${i === 0 ? 'dm-btn--primary' : 'dm-btn--outline'}`}>Retry group</span>
          </div>
        ))}
      </div>
      <div className="pt-confirm">
        <span>This will queue 214 requests for one retry attempt each.</span>
        <span className="dm-btn dm-btn--primary">Start Bulk Retry</span>
      </div>
      <p className="pt-hint">Filter-based jobs run at 10 requests per second, so the recovery doesn’t knock your API over again.</p>
    </Frame>
  )
}

function Endpoint() {
  return (
    <Frame crumbs={['Production', 'Endpoints', 'Stripe webhook']}>
      <div className="pt-form">
        <div className="pt-field">
          <span className="dm-label">Action</span>
          <div className="pt-seg"><span>Static API</span><span>Sync API</span><span className="is-on">Async API</span></div>
        </div>
        <div className="pt-field">
          <span className="dm-label">Destination URL</span>
          <div className="dm-input pt-mono">https://api.yourapp.com/webhooks/stripe</div>
        </div>
        <div className="pt-field">
          <span className="dm-label">Authentication <span className="pt-dim">· verifies the caller</span></span>
          <div className="pt-pair">
            <div className="dm-input">HMAC</div>
            <div className="dm-input pt-mono">Stripe-Signature</div>
          </div>
        </div>
        <div className="pt-field">
          <span className="dm-label">Destination Authentication <span className="pt-dim">· attached to the outbound call</span></span>
          <div className="pt-pair">
            <div className="dm-input">Bearer Token</div>
            <div className="dm-input pt-mono">••••••••••••3f2a</div>
          </div>
        </div>
      </div>
      <p className="pt-hint">A request that fails authentication gets a 401, never reaches your destination, and is still logged.</p>
    </Frame>
  )
}

const PANELS: Record<TabKey, () => React.ReactElement> = {
  inspector: Inspector, payload: Payload, replay: Replay, async: Async, bulk: Bulk, endpoint: Endpoint,
}

// How much page scroll each tab gets while the section is pinned.
const STEP_VH = 55

export function ProductTour() {
  const [idx, setIdx] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const tabsRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const active = TABS[idx].key

  // Geometry of the pinned stretch: where it starts (in page coords) and how far it scrolls.
  const geometry = useCallback(() => {
    const track = trackRef.current, pin = pinRef.current
    if (!track || !pin) return null
    const top = parseFloat(getComputedStyle(pin).top) || 0
    const start = track.getBoundingClientRect().top + window.scrollY - top
    const span = track.offsetHeight - pin.offsetHeight
    return { start, span }
  }, [])

  // Scroll position drives the active tab.
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const g = geometry()
      if (!g || g.span <= 0) return
      const p = (window.scrollY - g.start) / g.span
      const next = Math.min(TABS.length - 1, Math.max(0, Math.floor(p * TABS.length)))
      setIdx((cur) => (cur === next ? cur : next))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [geometry])

  // Keep the active tab visible in the horizontal (mobile) tab bar.
  useEffect(() => {
    const bar = tabsRef.current, tab = tabRefs.current[idx]
    if (!bar || !tab || bar.scrollWidth <= bar.clientWidth) return
    bar.scrollTo({ left: tab.offsetLeft - (bar.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' })
  }, [idx])

  // Selecting a tab scrolls the page to that tab's stretch, so scroll and selection never disagree.
  const go = (i: number) => {
    setIdx(i)
    const g = geometry()
    if (!g || g.span <= 0) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: g.start + ((i + 0.5) / TABS.length) * g.span, behavior: reduce ? 'auto' : 'smooth' })
  }

  const onKey = (e: KeyboardEvent) => {
    let next = -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % TABS.length
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (idx - 1 + TABS.length) % TABS.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = TABS.length - 1
    if (next < 0) return
    e.preventDefault()
    go(next)
    tabRefs.current[next]?.focus({ preventScroll: true })
  }

  return (
    <section className="section section--dark pt" aria-labelledby="tour-heading">
      <div className="container">
        <div className="sx-head">
          <span className="eyebrow">The product</span>
          <h2 className="heading-xl" id="tour-heading">What you open when something breaks.</h2>
          <p className="sx-head__lede">These are the screens you use during an incident: endpoint auth, the log, the full exchange, replay, auto-retry, and bulk retry. Real layouts with sample data.</p>
        </div>

        <div className="pt__track" ref={trackRef} style={{ height: `calc(var(--pt-pin-h) + ${TABS.length * STEP_VH}vh)` }}>
          <div className="pt__grid pt__pin" ref={pinRef}>
            <div className="pt__tabs" ref={tabsRef} role="tablist" aria-label="Product screens" aria-orientation="vertical" onKeyDown={onKey}>
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  ref={(el) => { tabRefs.current[i] = el }}
                  role="tab"
                  id={`pt-tab-${t.key}`}
                  aria-selected={idx === i}
                  aria-controls="pt-panel"
                  tabIndex={idx === i ? 0 : -1}
                  className={`pt__tab${idx === i ? ' is-active' : ''}`}
                  onClick={() => go(i)}
                >
                  <span className="pt__tab-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pt__tab-l">{t.label}</span>
                  <span className="pt__tab-note">{t.note}</span>
                </button>
              ))}
              <div className="pt__progress" aria-hidden="true"><i style={{ transform: `scaleY(${(idx + 1) / TABS.length})` }} /></div>
            </div>
            <div className="pt__panel" role="tabpanel" id="pt-panel" aria-labelledby={`pt-tab-${active}`}>
              {/* Screens are layered in place and cross-fade, the same way the story visual above changes state. */}
              <div className="pt__stage">
                {TABS.map((t, i) => {
                  const P = PANELS[t.key]
                  return (
                    <div key={t.key} className={`pt__slide${i === idx ? ' is-active' : ''}`} aria-hidden={i !== idx} inert={i !== idx}>
                      <P />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Phones: every screen stacked in order, so scrolling walks through 01–06 without tabs. */}
        <ol className="pt__stack">
          {TABS.map((t, i) => {
            const P = PANELS[t.key]
            return (
              <li key={t.key} className="pt__stack-item">
                <div className="pt__stack-head">
                  <span className="pt__tab-n">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="pt__stack-l">{t.label}</h3>
                </div>
                <p className="pt__stack-note">{t.note}</p>
                <P />
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
