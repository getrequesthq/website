'use client'

import { useEffect, useRef, useState } from 'react'

const CHAPTERS = [
  {
    key: 'relay',
    num: '01',
    name: 'Relay',
    title: 'Point callers at one URL. Everything else passes through.',
    body: 'Each endpoint gets a URL like e.getrequest.io/aB3dEf7gH9jK2mN4. Sync API forwards the request to your destination and hands back its exact status, headers, and body. Async API answers 202 immediately and delivers in the background. Static API returns a JSON body you define.',
    facts: ['Body forwarded unchanged', 'Your real response returned on Sync', 'Switch actions without redeploying'],
  },
  {
    key: 'retain',
    num: '02',
    name: 'Retain',
    title: 'When your API fails, the request is still on record.',
    body: 'A bad deploy starts throwing. A Sync caller gets a real 502 or 504, not a fake 200, and the full request is logged with its headers, body, response, and timing. An Async delivery keeps retrying on a fixed schedule: 15s, 60s, 5m, 15m, 15m.',
    facts: ['Headers, body, status, timing', 'Searchable for 7 to 30 days', 'Failures are logged, not swallowed'],
  },
  {
    key: 'recover',
    num: '03',
    name: 'Recover',
    title: 'Fix the deploy. Replay what it missed.',
    body: 'Replay re-sends the exact original request to the endpoint’s destination. The result is stored next to the original, which stays untouched. After a wide outage, bulk retry takes a hand-picked selection of up to 100, or sweeps a whole filtered set at a steady 10 requests per second.',
    facts: ['Original payload, original headers', 'Original record preserved', 'Bulk retry on Pro and Gro'],
  },
]

export function StoryVisual({ step }: { step: number }) {
  return (
    <div className="sv" data-step={step}>
      <div className="sv__bar">
        <span className="sv__dot" />
        <span className="sv__title">trace · Order checkout</span>
        <span className="sv__chip">illustrative</span>
      </div>

      <svg viewBox="0 0 480 120" className="sv__svg" aria-hidden="true">
        <path className="sv-wire sv-wire--in" d="M118 60 H182" />
        <path className="sv-wire sv-wire--out" d="M298 60 H362" />
        <path className="sv-wire sv-wire--replay" d="M240 88 C240 112 420 112 420 88" />
        <g className="sv-node" transform="translate(10 34)">
          <rect width="108" height="52" rx="9" />
          <text x="12" y="23" className="sv-node__t">Checkout app</text>
          <text x="12" y="39" className="sv-node__s">caller</text>
        </g>
        <g className="sv-node sv-node--gr" transform="translate(182 34)">
          <rect width="116" height="52" rx="9" />
          <path transform="translate(12 13) scale(0.8)" d="M2.4 8L0 0C5.7 1.7 11.1 4.4 16 8C11.2 11.6 5.7 14.3 0 16L2.4 8Z" fill="#FFFF00" />
          <text x="30" y="24" className="sv-node__t">getrequest</text>
          <text x="12" y="40" className="sv-node__s">Sync API</text>
        </g>
        <g className="sv-node sv-node--api" transform="translate(362 34)">
          <rect width="108" height="52" rx="9" />
          <text x="12" y="23" className="sv-node__t">Your API</text>
          <circle cx="16" cy="36" r="3.5" className="sv-led" />
          <text x="26" y="39" className="sv-node__s sv-api-state">{step === 1 ? 'v142 failing' : 'healthy'}</text>
        </g>
      </svg>

      <div className="sv__record">
        <div className="sv__rline">
          <span className="sv__m">POST</span>
          <span className="sv__u">e.getrequest.io/aB3dEf7gH9jK2mN4</span>
          <span className="sv__id">req_8xm2k9p</span>
        </div>

        <div className="sv__spans">
          <div className="sv-span sv-span--relay">
            <span className="sv-span__k">relay → your API</span>
            <span className="sv-span__bar"><i /></span>
            <span className="sv-span__v">{step === 0 ? '201 · 84 ms' : '502 · 31 ms'}</span>
          </div>
          <div className="sv-span sv-span--log">
            <span className="sv-span__k">log record</span>
            <span className="sv-span__bar"><i /></span>
            <span className="sv-span__v">stored</span>
          </div>
          <div className="sv-span sv-span--replay">
            <span className="sv-span__k">↺ replay</span>
            <span className="sv-span__bar"><i /></span>
            <span className="sv-span__v">201 · 91 ms</span>
          </div>
        </div>

        <div className="sv__payload">
          <div>
            <div className="sv__k">request body</div>
            <code>{'{ "order_id": "ord_8841",\n  "items": [{ "sku": "SKU-123", "qty": 2 }],\n  "total": 59.98 }'}</code>
          </div>
          <div>
            <div className="sv__k">{step === 2 ? 'original response' : 'response'}</div>
            <code className={step === 0 ? 'is-ok' : 'is-err'}>{step === 0 ? 'HTTP 201 Created\n{ "status": "confirmed" }' : 'HTTP 502 Bad Gateway\n{ "error": "Upstream request failed" }'}</code>
          </div>
        </div>

        <p className="sv__caption" key={step}>
          {step === 0 && 'The caller got your API’s exact 201. The exchange is logged either way.'}
          {step === 1 && 'The caller received the 502. The request is kept with everything needed to send it again.'}
          {step === 2 && 'Replayed after the fix. The replay result sits next to the original 502, which is never overwritten.'}
        </p>
      </div>
    </div>
  )
}

export function ReliabilityStory() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="story" id="how-it-works" aria-labelledby="story-heading">
      <div className="container">
        <div className="sx-head">
          <span className="eyebrow">How it works</span>
          <h2 className="heading-xl" id="story-heading">Follow one request through a bad deploy.</h2>
          <p className="sx-head__lede">Relay, Retain, Recover is what happens to every request that reaches a getrequest endpoint. Here is a single checkout call living through all three.</p>
        </div>

        <div className="story__grid">
          <ol className="story__chapters">
            {CHAPTERS.map((c, i) => (
              <li
                key={c.key}
                className={`story__chapter${active === i ? ' is-active' : ''}`}
                data-idx={i}
                ref={(el) => { refs.current[i] = el }}
              >
                <div className="story__num"><span>{c.num}</span>{c.name}</div>
                <h3 className="story__title">{c.title}</h3>
                <p className="story__body">{c.body}</p>
                <ul className="story__facts">
                  {c.facts.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <div className="story__inline"><StoryVisual step={i} /></div>
              </li>
            ))}
          </ol>
          <div className="story__stage">
            <div className="story__sticky"><StoryVisual step={active} /></div>
          </div>
        </div>
      </div>
    </section>
  )
}
