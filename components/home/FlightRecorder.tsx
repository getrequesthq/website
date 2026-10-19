'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { PacketLayer, wait } from './packets'

type Src = 'app' | 'agent' | 'stripe'
type Delivery = 'delivering' | 'delivered' | 'retrying' | 'failed'

interface Row {
  id: string
  src: Src
  t: number
  done: boolean
  status?: number
  ms?: number
  error?: string
  delivery?: Delivery
  attempts?: number
  nextIn?: string
  replay?: 'pending' | 'ok' | 'failed'
  replayStatus?: number
  orderRef: number
}

const SOURCES: Record<Src, {
  label: string
  sub: string
  endpoint: string
  endpointId: string
  action: 'sync' | 'async'
  okStatus: number
  ua: string
  body: (n: number) => string
}> = {
  app: {
    label: 'Checkout app',
    sub: 'POST · Sync API',
    endpoint: 'Order checkout',
    endpointId: 'aB3dEf7gH9jK2mN4',
    action: 'sync',
    okStatus: 201,
    ua: 'checkout-web/3.2',
    body: (n) => `{ "order_id": "ord_${8800 + n}", "total": 59.98 }`,
  },
  agent: {
    label: 'Support agent',
    sub: 'POST · Sync API',
    endpoint: 'Create ticket',
    endpointId: 'Qp4Lm8Zt2Wx6Rv1N',
    action: 'sync',
    okStatus: 200,
    ua: 'support-agent/0.9 (tool: create_ticket)',
    body: (n) => `{ "customer": "cus_${(19 + n).toString(36)}dK", "priority": "high" }`,
  },
  stripe: {
    label: 'Stripe',
    sub: 'webhook · Async API',
    endpoint: 'Stripe webhook',
    endpointId: 'Hn7Cv3Ks9Df2Tg5B',
    action: 'async',
    okStatus: 202,
    ua: 'Stripe/1.0 (+https://stripe.com/docs/webhooks)',
    body: () => `{ "type": "payment_intent.succeeded" }`,
  },
}

// Documented Async API retry schedule (delay before attempt N).
const RETRY_DELAYS = ['15s', '60s', '5m', '15m', '15m']
// Real-time spacing between simulated attempts, so the backoff is watchable.
const RETRY_SPACING_MS = [2600, 3400, 4600, 5600, 5600]

const SEED: Row[] = ([
  { id: 'req_7f3a21', src: 'app', t: -9.4, done: true, status: 201, ms: 84, orderRef: 1 },
  { id: 'req_2c91e8', src: 'stripe', t: -7.1, done: true, status: 202, ms: 21, delivery: 'delivered', attempts: 1, orderRef: 2 },
  { id: 'req_b40d17', src: 'agent', t: -5.6, done: true, status: 200, ms: 112, orderRef: 3 },
  { id: 'req_e8a3f0', src: 'app', t: -3.2, done: true, status: 201, ms: 77, orderRef: 4 },
  { id: 'req_51fd9c', src: 'stripe', t: -1.4, done: true, status: 202, ms: 19, delivery: 'delivered', attempts: 1, orderRef: 5 },
] as Row[]).reverse()

const MAX_ROWS = 6
const hex = () => Math.random().toString(16).slice(2, 8)
const rand = (a: number, b: number) => Math.round(a + Math.random() * (b - a))

function isFailed(r: Row) {
  if (r.replay === 'ok') return false
  if (r.replay === 'pending') return false
  return (r.status !== undefined && r.status >= 500) || r.delivery === 'failed'
}

function statusTone(r: Row): 'ok' | 'err' | 'warn' | 'pending' {
  if (!r.done) return 'pending'
  if (r.replay === 'ok') return 'ok'
  if (r.delivery === 'retrying') return 'warn'
  if (r.delivery === 'failed') return 'err'
  if (r.status && r.status >= 500) return 'err'
  return 'ok'
}

function everFailed(r: Row) {
  return (r.status !== undefined && r.status >= 500) || r.delivery === 'retrying' || r.delivery === 'failed' || (r.attempts ?? 1) > 1 || r.replay !== undefined
}

function ago(now: number, t: number) {
  const s = Math.max(0, now - t)
  if (s < 1) return 'now'
  if (s < 60) return `${Math.floor(s)}s`
  return `${Math.floor(s / 60)}m`
}

export function FlightRecorder() {
  const svgLayerRef = useRef<SVGGElement>(null)
  const paths = useRef<Record<string, SVGPathElement | null>>({})
  const engineRef = useRef<PacketLayer | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const backendRef = useRef<SVGGElement>(null)
  const logRef = useRef<SVGGElement>(null)

  const [rows, setRows] = useState<Row[]>(SEED)
  const rowsRef = useRef<Row[]>(SEED)
  const [backendUp, setBackendUp] = useState(true)
  const upRef = useRef(true)
  const [selected, setSelected] = useState<string>(SEED[0].id)
  const [now, setNow] = useState(0)
  const clockStart = useRef(0)
  const [stats, setStats] = useState({ received: 5, logged: 5, failed: 0, recovered: 0 })
  const [replaying, setReplaying] = useState(false)
  const [announce, setAnnounce] = useState('')
  const [hint, setHint] = useState<string | null>(null)
  const [view, setView] = useState<'all' | 'failures'>('all')
  const reduced = useRef(false)
  const visible = useRef(true)
  const counter = useRef(10)
  const alive = useRef(true)

  const commit = useCallback((fn: (rs: Row[]) => Row[]) => {
    rowsRef.current = fn(rowsRef.current)
    if (alive.current) setRows(rowsRef.current)
  }, [])

  const patch = useCallback((id: string, p: Partial<Row>) => {
    commit((rs) => rs.map((r) => (r.id === id ? { ...r, ...p } : r)))
  }, [commit])

  const bump = useCallback((k: keyof typeof stats, by = 1) => {
    if (alive.current) setStats((s) => ({ ...s, [k]: s[k] + by }))
  }, [])

  const flash = (g: SVGGElement | null, cls: string) => {
    if (!g || reduced.current) return
    g.classList.remove(cls)
    void g.getBoundingClientRect()
    g.classList.add(cls)
  }

  const send = (key: string, kind: Parameters<PacketLayer['send']>[1], opts?: { reverse?: boolean; dur?: number }) =>
    engineRef.current?.send(paths.current[key], kind, opts) ?? Promise.resolve()

  // ---- async delivery retries (Async API only) ----
  const scheduleRetry = useCallback((id: string, first: number) => {
    const tick = (attempt: number) => {
      const spacing = RETRY_SPACING_MS[Math.min(attempt - 1, RETRY_SPACING_MS.length - 1)]
      setTimeout(async () => {
        if (!alive.current) return
        const row = rowsRef.current.find((r) => r.id === id)
        if (!row || row.delivery !== 'retrying') return
        await send('fwd', 'retry')
        if (upRef.current) {
          await send('fwd', 'ok', { reverse: true })
          patch(id, { delivery: 'delivered', attempts: attempt + 1, nextIn: undefined })
          bump('recovered')
          bump('failed', -1)
          setAnnounce(`Async delivery ${id} succeeded on attempt ${attempt + 1}.`)
        } else {
          flash(backendRef.current, 'is-hit')
          await send('fwd', 'err', { reverse: true })
          const next = attempt + 1
          if (next >= 6) {
            patch(id, { delivery: 'failed', attempts: 6, nextIn: undefined })
            setAnnounce(`Async delivery ${id} exhausted all 6 attempts and is marked failed.`)
          } else {
            patch(id, { attempts: next, nextIn: RETRY_DELAYS[next - 1] })
            tick(next)
          }
        }
      }, reduced.current ? spacing * 1.5 : spacing)
    }
    tick(first)
  }, [bump, patch])

  // ---- one request lifecycle ----
  const runRequest = useCallback(async (src: Src) => {
    const s = SOURCES[src]
    const id = `req_${hex()}`
    const orderRef = counter.current++
    const t = (performance.now() - clockStart.current) / 1000
    await send(src, 'req', { dur: 480 })
    if (!alive.current) return

    // Captured: getrequest records it the moment it arrives.
    commit((rs) => [{ id, src, t, done: false, orderRef }, ...rs].slice(0, 40))
    bump('received')
    bump('logged')
    flash(logRef.current, 'is-hit')
    send('log', 'req', { dur: 340 })

    if (s.action === 'async') {
      // Caller is acknowledged immediately; delivery happens out of band.
      patch(id, { status: 202, ms: rand(16, 28), delivery: 'delivering', attempts: 1, done: true })
      await send('fwd', 'req')
      if (upRef.current) {
        await send('fwd', 'ok', { reverse: true })
        patch(id, { delivery: 'delivered' })
      } else {
        flash(backendRef.current, 'is-hit')
        await send('fwd', 'err', { reverse: true })
        patch(id, { delivery: 'retrying', nextIn: RETRY_DELAYS[0] })
        bump('failed')
        setSelected(id)
        scheduleRetry(id, 1)
      }
      return
    }

    // Sync: the caller waits for the backend's real answer.
    await send('fwd', 'req')
    if (upRef.current) {
      await send('fwd', 'ok', { reverse: true })
      patch(id, { status: s.okStatus, ms: rand(62, 140), done: true })
    } else {
      const timeout = Math.random() < 0.3
      flash(backendRef.current, 'is-hit')
      if (timeout) await wait(reduced.current ? 0 : 520)
      await send('fwd', 'err', { reverse: true })
      patch(id, timeout
        ? { status: 504, ms: 3001, error: 'Upstream timeout', done: true }
        : { status: 502, ms: rand(24, 70), error: 'Upstream request failed', done: true })
      bump('failed')
      setSelected(id)
    }
  }, [bump, commit, patch, scheduleRetry])

  // ---- traffic generator ----
  useEffect(() => {
    alive.current = true
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    clockStart.current = performance.now()
    if (svgLayerRef.current) engineRef.current = new PacketLayer(svgLayerRef.current, () => reduced.current)

    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting }, { threshold: 0.15 })
    if (rootRef.current) io.observe(rootRef.current)

    let timer: ReturnType<typeof setTimeout>
    const loop = () => {
      if (visible.current && !document.hidden) {
        const r = Math.random()
        runRequest(r < 0.4 ? 'app' : r < 0.68 ? 'agent' : 'stripe')
      }
      timer = setTimeout(loop, reduced.current ? 2600 : rand(1000, 1500))
    }
    timer = setTimeout(loop, 700)
    const clock = setInterval(() => setNow((performance.now() - clockStart.current) / 1000), 1000)

    return () => {
      alive.current = false
      clearTimeout(timer)
      clearInterval(clock)
      io.disconnect()
      engineRef.current?.dispose()
    }
  }, [runRequest])

  const toggleOutage = () => {
    const next = !upRef.current
    upRef.current = next
    setBackendUp(next)
    setHint(null)
    setAnnounce(next
      ? 'Backend restored. Async deliveries will succeed on their next retry. Failed sync requests are ready to replay.'
      : 'Backend is down. Sync callers now receive 502 or 504. Async callers still get 202 while delivery retries.')
  }

  const failedRows = rows.filter((r) => r.done && isFailed(r))

  const replayFailed = async () => {
    if (replaying || failedRows.length === 0) return
    if (!upRef.current) {
      setHint('Backend is still down. A replay would fail the same way. Restore it first.')
      return
    }
    setReplaying(true)
    setHint(null)
    setView('failures')
    const targets = rowsRef.current.filter((r) => r.done && isFailed(r))
    for (const r of targets) {
      if (!alive.current) return
      patch(r.id, { replay: 'pending' })
      setSelected(r.id)
      await send('fwd', 'retry')
      await send('fwd', 'ok', { reverse: true })
      const ok = SOURCES[r.src].action === 'async' ? 200 : SOURCES[r.src].okStatus
      patch(r.id, { replay: 'ok', replayStatus: ok, ...(r.delivery === 'failed' ? { delivery: 'delivered' as Delivery } : {}) })
      bump('recovered')
      bump('failed', -1)
      if (reduced.current) continue
      await wait(140)
    }
    setReplaying(false)
    setAnnounce(`Replayed ${targets.length} failed request${targets.length === 1 ? '' : 's'} with their original payloads.`)
  }

  const failureRows = rows.filter(everFailed)
  const visibleRows = (view === 'all' ? rows : failureRows).slice(0, MAX_ROWS)
  const sel = rows.find((r) => r.id === selected) ?? visibleRows[0]

  return (
    <div className="fr" ref={rootRef} data-backend={backendUp ? 'up' : 'down'}>
      <div className="fr__bar">
        <div className="fr__title"><span className="fr__title-dot" aria-hidden="true" />my-vibe-coded-app</div>
        <div className="fr__controls">
          <button
            type="button"
            className={`fr-btn ${backendUp ? 'fr-btn--danger' : 'fr-btn--neutral'}`}
            onClick={toggleOutage}
            aria-pressed={!backendUp}
          >
            <span className="fr-btn__dot" aria-hidden="true" />
            {backendUp ? 'Simulate outage' : 'Restore backend'}
          </button>
          <button
            type="button"
            className="fr-btn fr-btn--primary"
            onClick={replayFailed}
            disabled={replaying || failedRows.length === 0}
          >
            ↺ {replaying ? 'Replaying…' : `Replay failed${failedRows.length ? ` (${failedRows.length})` : ''}`}
          </button>
        </div>
      </div>

      <div className="fr__body">
        <div className="fr__diagram">
          <svg viewBox="0 0 560 320" className="fr-svg" role="img" aria-label="Requests from a checkout app, a support agent, and Stripe pass through getrequest, which logs each one and forwards it to your API.">
            <defs>
              <pattern id="fr-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="560" height="320" fill="url(#fr-grid)" />

            {/* wires */}
            <path ref={(el) => { paths.current.app = el }} className="fr-wire" d="M128 70 C172 70 168 148 210 148" />
            <path ref={(el) => { paths.current.agent = el }} className="fr-wire" d="M128 160 L210 160" />
            <path ref={(el) => { paths.current.stripe = el }} className="fr-wire" d="M128 250 C172 250 168 172 210 172" />
            <path ref={(el) => { paths.current.fwd = el }} className="fr-wire fr-wire--fwd" d="M330 160 L440 160" />
            <path ref={(el) => { paths.current.log = el }} className="fr-wire fr-wire--log" d="M270 192 L270 252" />

            {/* sources */}
            {(['app', 'agent', 'stripe'] as Src[]).map((k, i) => (
              <g key={k} className="fr-node" transform={`translate(12 ${47 + i * 90})`}>
                <rect width="116" height="46" rx="8" />
                <text x="12" y="20" className="fr-node__title">{SOURCES[k].label}</text>
                <text x="12" y="35" className="fr-node__sub">{SOURCES[k].sub}</text>
              </g>
            ))}

            {/* getrequest */}
            <g className="fr-node fr-node--gr" transform="translate(210 128)">
              <rect width="120" height="64" rx="10" />
              <g transform="translate(13 15) scale(0.9)">
                <path d="M2.4 8L0 0C5.7 1.7 11.1 4.4 16 8C11.2 11.6 5.7 14.3 0 16L2.4 8Z" fill="#FFFF00" />
              </g>
              <text x="34" y="27" className="fr-node__title">getrequest</text>
              <text x="13" y="48" className="fr-node__sub">e.getrequest.io</text>
            </g>

            {/* log */}
            <g className="fr-node fr-node--log" ref={logRef} transform="translate(205 252)">
              <rect width="130" height="36" rx="8" />
              <text x="12" y="22" className="fr-node__sub">request log</text>
              <text x="118" y="22" className="fr-node__count" textAnchor="end">{stats.logged}</text>
            </g>

            {/* backend */}
            <g className="fr-node fr-node--backend" ref={backendRef} transform="translate(440 130)">
              <rect width="112" height="60" rx="10" />
              <text x="12" y="24" className="fr-node__title">Your API</text>
              <circle cx="16" cy="41" r="3.5" className="fr-node__led" />
              <text x="26" y="44" className="fr-node__sub fr-node__state">{backendUp ? 'healthy' : 'unreachable'}</text>
            </g>

            <g ref={svgLayerRef} />
          </svg>

          <dl className="fr__stats">
            <div><dt>Received</dt><dd>{stats.received}</dd></div>
            <div><dt>Logged</dt><dd>{stats.logged}</dd></div>
            <div><dt>Failing</dt><dd className={stats.failed > 0 ? 'is-err' : ''}>{Math.max(0, stats.failed)}</dd></div>
            <div><dt>Recovered</dt><dd className={stats.recovered > 0 ? 'is-ok' : ''}>{stats.recovered}</dd></div>
          </dl>
        </div>

        <div className="fr__inspector">
          <div className="fr__inspector-head">
            <div className="fr-tabs" role="group" aria-label="Filter request log">
              <button type="button" className={`fr-tab${view === 'all' ? ' is-on' : ''}`} aria-pressed={view === 'all'} onClick={() => setView('all')}>All</button>
              <button type="button" className={`fr-tab${view === 'failures' ? ' is-on' : ''}`} aria-pressed={view === 'failures'} onClick={() => setView('failures')}>
                Failures{failureRows.length ? <span className="fr-tab__n">{failureRows.length}</span> : null}
              </button>
            </div>
            <span className={`fr__live ${backendUp ? '' : 'is-down'}`}>{backendUp ? 'Live' : 'Backend down'}</span>
          </div>
          <ul className="fr__rows" aria-label="Captured requests">
            {visibleRows.length === 0 && <li className="fr__empty">No failures yet. Try simulating an outage.</li>}
            {visibleRows.map((r) => {
              const s = SOURCES[r.src]
              const tone = statusTone(r)
              return (
                <li key={r.id}>
                  <button
                    type="button"
                    className={`fr-row${sel?.id === r.id ? ' is-selected' : ''}`}
                    aria-pressed={sel?.id === r.id}
                    onClick={() => setSelected(r.id)}
                  >
                    <span className={`fr-row__dot is-${tone}`} aria-hidden="true" />
                    <span className="fr-row__method">{s.action === 'async' ? 'ASYNC' : 'SYNC'}</span>
                    <span className="fr-row__name">{s.endpoint}</span>
                    <span className={`fr-row__status is-${tone}`}>
                      {!r.done ? '···' : r.replay === 'ok' ? `↺ ${r.replayStatus}` : r.replay === 'pending' ? '↺ ···' : r.delivery === 'retrying' ? `retry ${r.attempts}/6` : r.delivery === 'failed' ? 'failed' : r.status}
                    </span>
                    <span className="fr-row__time">{ago(now, r.t)}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          {sel ? <Detail row={sel} /> : <div className="fr-detail fr-detail--empty" aria-hidden="true" />}
        </div>
      </div>

      {hint && <p className="fr__hint" role="status">{hint}</p>}
      <p className="sr-only" aria-live="polite">{announce}</p>
      <p className="fr__foot">Simulated traffic, not production telemetry</p>
    </div>
  )
}

function Detail({ row }: { row: Row }) {
  const s = SOURCES[row.src]
  let outcome: string
  let body: string
  if (!row.done) {
    outcome = 'in flight'
    body = '…'
  } else if (row.status === 202) {
    outcome = '202 Accepted'
    body = `{ "status": "Success", "request_id": "${row.id.slice(4)}…" }`
  } else if (row.error) {
    outcome = `${row.status} ${row.error === 'Upstream timeout' ? 'Gateway Timeout' : 'Bad Gateway'}`
    body = `{ "error": "${row.error}" }`
  } else {
    outcome = `${row.status} ${row.status === 201 ? 'Created' : 'OK'}`
    body = row.src === 'app' ?'{ "id": "ord_…", "status": "confirmed" }' : '{ "ticket": "T-4821", "state": "open" }'
  }

  const origTone = !row.done ? 'pending' : row.status === 202 ? 'ok' : row.error ? 'err' : 'ok'

  let note: string
  if (row.replay === 'ok') note = `Replayed with the original headers and body. Destination answered ${row.replayStatus}. The original record is kept alongside the replay.`
  else if (row.replay === 'pending') note = 'Replaying the exact original request…'
  else if (s.action === 'async' && row.delivery === 'retrying') note = `Caller already got 202. Delivery attempt ${row.attempts} failed; attempt ${(row.attempts ?? 1) + 1} of 6 is scheduled ${row.nextIn} later.`
  else if (s.action === 'async' && row.delivery === 'failed') note = 'All 6 automatic attempts failed. Still in the log, ready for a manual replay.'
  else if (s.action === 'async') note = row.attempts && row.attempts > 1 ? `Delivered on attempt ${row.attempts} after automatic retries.` : 'Caller got 202 immediately. Delivered to your API in the background.'
  else if (row.error) note = 'The caller received this failure. getrequest kept the full request so you can replay it once your API is back.'
  else note = 'Proxied byte-for-byte. The caller received your API’s exact response.'

  return (
    <div className="fr-detail" aria-live="off">
      <div className="fr-detail__line">
        <span className="fr-detail__method">POST</span>
        <span className="fr-detail__url">e.getrequest.io/{s.endpointId}</span>
      </div>
      <div className="fr-detail__grid">
        <div>
          <div className="fr-detail__k">request</div>
          <code className="fr-detail__code">user-agent: {s.ua}{'\n'}{s.body(row.orderRef)}</code>
        </div>
        <div>
          <div className="fr-detail__k">{row.replay ? 'original response' : 'response'} · <span className={`is-${origTone}`}>{outcome}</span></div>
          <code className="fr-detail__code">{body}</code>
          <div className="fr-detail__replay" aria-hidden={!row.replay}>
            {row.replay && <>↺ replay · <span className={row.replay === 'ok' ? 'is-ok' : 'is-pending'}>{row.replay === 'ok' ? `${row.replayStatus} ${row.replayStatus === 201 ? 'Created' : 'OK'}` : 'sending…'}</span></>}
          </div>
        </div>
      </div>
      <p className="fr-detail__note">{note}</p>
    </div>
  )
}
