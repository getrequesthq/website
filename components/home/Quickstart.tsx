'use client'

import { useEffect, useRef, useState } from 'react'
import { APP_REGISTER_URL, DOCS_URL } from '@/lib/urls'

const URL = 'https://e.getrequest.io/aB3dEf7gH9jK2mN4'

const CURL = `curl -X POST ${URL} \\
  -H "Content-Type: application/json" \\
  -d '{
    "order_id": "ord_8841",
    "items": [{ "sku": "SKU-123", "qty": 2 }],
    "total": 59.98
  }'`

const MODES = {
  sync: {
    label: 'Sync API',
    blurb: 'Forwards to your destination and returns its exact response. 3 second timeout, no automatic retries.',
    status: 'HTTP/2 200',
    tone: 'ok',
    body: `{
  "json": {
    "order_id": "ord_8841",
    "items": [{ "sku": "SKU-123", "qty": 2 }],
    "total": 59.98
  },
  "url": "https://postman-echo.com/post"
}`,
    foot: 'Destination: postman-echo.com/post, which echoes your payload back unchanged.',
    doc: '/quickstart',
  },
  async: {
    label: 'Async API',
    blurb: 'Answers 202 right away and delivers in the background: up to 6 attempts over about 36 minutes.',
    status: 'HTTP/2 202',
    tone: 'ack',
    body: `{ "status": "Success", "request_id": "3f9c1e2a-…" }`,
    foot: '202 means accepted for delivery. Track the outcome in Logs: retrying, delivered, or failed.',
    doc: '/guides/async-api',
  },
  static: {
    label: 'Static API',
    blurb: 'Returns a JSON body you define. No destination, so it works before your backend exists.',
    status: 'HTTP/2 200',
    tone: 'ok',
    body: `{
  "id": "usr_01HXYZ",
  "email": "alice@example.com",
  "plan": "pro",
  "created_at": "2024-01-15T09:00:00Z"
}`,
    foot: 'Switch the action to Sync API later. The URL your callers use stays the same.',
    doc: '/guides/api-mocking',
  },
} as const

type Mode = keyof typeof MODES

export function Quickstart() {
  const [mode, setMode] = useState<Mode>('sync')
  const [phase, setPhase] = useState<'idle' | 'sending' | 'done'>('idle')
  const [copied, setCopied] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const pick = (m: Mode) => {
    timers.current.forEach(clearTimeout)
    setMode(m)
    setPhase('idle')
  }

  const send = () => {
    timers.current.forEach(clearTimeout)
    setPhase('sending')
    timers.current.push(window.setTimeout(() => setPhase('done'), mode === 'sync' ? 650 : 280))
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CURL)
      setCopied(true)
      timers.current.push(window.setTimeout(() => setCopied(false), 1600))
    } catch { /* clipboard unavailable */ }
  }

  const m = MODES[mode]

  return (
    <section className="section section--dark qs" aria-labelledby="qs-heading">
      <div className="container">
        <div className="qs__grid">
          <div className="qs__copy">
            <span className="eyebrow">Quickstart</span>
            <h2 className="heading-xl" id="qs-heading">One URL. One request. Under two minutes.</h2>
            <p className="sx-head__lede">Create an endpoint in the dashboard, copy its URL, and send it anything. There is no SDK to install and nothing to deploy. Your callers change one base URL.</p>
            <ol className="qs__steps">
              <li><span>1</span>Create an endpoint and choose an action</li>
              <li><span>2</span>Send a request to its unique URL</li>
              <li><span>3</span>Open Logs and inspect the full exchange</li>
            </ol>
            <div className="hx__ctas">
              <a href={APP_REGISTER_URL} className="btn btn-primary">Create an endpoint →</a>
              <a href={`${DOCS_URL}${m.doc}`} className="btn btn-ghost">Read {m.label} guide</a>
            </div>
          </div>

          <div className="qs__term">
            <div className="qs__bar">
              <div className="qs__modes" role="group" aria-label="Endpoint action">
                {(Object.keys(MODES) as Mode[]).map((k) => (
                  <button
                    key={k}
                    
                    aria-pressed={mode === k}
                    className={`qs__mode${mode === k ? ' is-on' : ''}`}
                    onClick={() => pick(k)}
                  >
                    {MODES[k].label}
                  </button>
                ))}
              </div>
              <button className="qs__copy-btn" onClick={copy} aria-label="Copy curl command">
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="qs__blurb">{m.blurb}</p>
            <pre className="qs__code" tabIndex={0} aria-label="curl command"><code><span className="qs__prompt">$ </span>{CURL}</code></pre>

            <div className="qs__run">
              <button className="qs__send" onClick={send} disabled={phase === 'sending'}>
                {phase === 'sending' ? 'Sending…' : '▶ Run example'}
              </button>
              <span className="qs__sim">Simulated response, nothing is sent</span>
            </div>

            <div className={`qs__out is-${phase}`} aria-live="polite">
              {phase === 'idle' && <span className="qs__wait">Response appears here</span>}
              {phase === 'sending' && <span className="qs__wait">POST {URL.replace('https://', '')} …</span>}
              {phase === 'done' && (
                <>
                  <div className={`qs__status qs__status--${m.tone}`}>{m.status}</div>
                  <pre className="qs__resp">{m.body}</pre>
                  <p className="qs__foot">{m.foot}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
