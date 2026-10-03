'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { EngineDiagram, type EnginePhase } from './EngineDiagram'

interface TitleSegment {
  text: string
  accent?: boolean
}

interface EnginePane {
  id: string
  kind: 'intro' | 'stage' | 'continuation'
  weight: number
  stageKey?: EnginePhase
  eyebrow?: string
  title: TitleSegment[]
  lead?: string
  points?: string[]
  description?: string
  cta?: { label: string; href: string }
}

const EYEBROW = 'Inside the reliability layer'

const PANES: EnginePane[] = [
  {
    id: 'engine',
    kind: 'intro',
    weight: 0.55,
    title: [{ text: 'One reliability layer.' }, { text: ' Three guarantees.', accent: true }],
    description:
      'getrequest sits directly in front of your backend. Every request is relayed through a controlled gateway, retained in full before it ever reaches your infrastructure, and recoverable on demand — even after downtime.',
  },
  {
    id: 'relay',
    kind: 'stage',
    weight: 1,
    stageKey: 'relay',
    eyebrow: EYEBROW,
    title: [{ text: 'Relay', accent: true }, { text: ' every request through a controlled gateway' }],
    lead: 'Your backend never sees raw, uncontrolled traffic again.',
    points: [
      'Every request passes through getrequest before it reaches your upstream — spikes and bad actors are absorbed at the edge, not in your infrastructure.',
      'Static, Sync, or Async API per endpoint: mock a response, proxy transparently byte-for-byte, or acknowledge instantly and deliver in the background.',
      'Point one URL. The reliability layer is live — no gateway to provision, no code changes downstream.',
    ],
  },
  {
    id: 'retain',
    kind: 'stage',
    weight: 1,
    stageKey: 'retain',
    eyebrow: EYEBROW,
    title: [{ text: 'Retain', accent: true }, { text: ' the full request before it ever reaches you' }],
    lead: 'Headers, body, status, and latency — captured in full, every time.',
    points: [
      'Every relayed request is durably written to storage before your backend sees it — a failed deployment or an outage can’t erase it.',
      'Full request and response detail is searchable in the live inspector the moment it lands — your observability layer, included by default.',
      'Retention holds for up to 30 days on paid plans — long enough to investigate, replay, or share.',
    ],
  },
  {
    id: 'recover',
    kind: 'stage',
    weight: 1,
    stageKey: 'recover',
    eyebrow: EYEBROW,
    title: [{ text: 'Recover', accent: true }, { text: ' from any failure, on demand' }],
    lead: 'One click restores exactly what was lost — no manual reconstruction.',
    points: [
      'Replay any retained request with its exact original payload the moment your systems are back.',
      'Recover from an outage in bulk: retry a manual selection or an entire filtered set, paced so it never re-overwhelms your backend.',
      'Async endpoints retry automatically in the background — up to 6 attempts — often before a request ever needs manual recovery.',
    ],
  },
  {
    id: 'continuation',
    kind: 'continuation',
    weight: 0.7,
    title: [{ text: 'See the ' }, { text: 'full reliability stack.', accent: true }],
    description:
      'Instant endpoints, live inspection, shareable debug links, and usage metering — all part of the same layer.',
    cta: { label: 'Explore all capabilities →', href: '#capabilities' },
  },
]

const WEIGHTS = PANES.map((pane) => pane.weight)
const TOTAL_WEIGHT = WEIGHTS.reduce((sum, weight) => sum + weight, 0)

const RAIL_STEPS: { key: EnginePhase; label: string; icon: (props: { className?: string }) => React.ReactElement }[] = [
  {
    key: 'relay',
    label: 'Relay',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 12h14" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    ),
  },
  {
    key: 'retain',
    label: 'Retain',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </svg>
    ),
  },
  {
    key: 'recover',
    label: 'Recover',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 12a8 8 0 1 1 2.6 5.9" />
        <path d="M4 20v-5h5" />
      </svg>
    ),
  },
]

function useScrollSections(
  trackRef: React.RefObject<HTMLDivElement | null>,
  stageRef: React.RefObject<HTMLDivElement | null>,
  weights: number[],
) {
  const [state, setState] = useState({ index: 0, progress: 0 })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const total = weights.reduce((sum, weight) => sum + weight, 0)
    let raf: number | null = null

    const measure = () => {
      const trackRect = track.getBoundingClientRect()
      const trackHeight = track.offsetHeight
      const viewportHeight = window.innerHeight
      let overall = 0

      if (trackRect.top <= 0) {
        const stage = stageRef.current
        if (stage) {
          const stickyTop = parseFloat(window.getComputedStyle(stage).top) || 0
          const stageHeight = stage.offsetHeight
          const slack = trackHeight - stageHeight
          if (slack > 0) {
            const scrolledPast = stickyTop - trackRect.top
            overall = Math.max(0, Math.min(1, scrolledPast / slack))
          } else {
            overall = trackHeight > viewportHeight ? Math.min(1, -trackRect.top / (trackHeight - viewportHeight)) : 1
          }
        } else {
          overall = trackHeight > viewportHeight ? Math.min(1, -trackRect.top / (trackHeight - viewportHeight)) : 1
        }
      }

      const position = overall * total
      let cursor = 0
      let index = weights.length - 1
      for (let i = 0; i < weights.length; i += 1) {
        if (position < cursor + weights[i]) {
          index = i
          break
        }
        cursor += weights[i]
      }
      index = Math.max(0, Math.min(weights.length - 1, index))
      let progress = weights[index] > 0 ? (position - cursor) / weights[index] : 1
      if (index === weights.length - 1 && position >= total) progress = 1
      progress = Math.min(1, Math.max(0, progress))

      setState((prev) => (prev.index === index && prev.progress === progress ? prev : { index, progress }))
    }

    const onScroll = () => {
      if (raf !== null) return
      raf = requestAnimationFrame(() => {
        measure()
        raf = null
      })
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackRef, stageRef])

  return state
}

export function RelayEngineScene() {
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const { index } = useScrollSections(trackRef, stageRef, WEIGHTS)

  const activePane = PANES[index]
  const diagramPhase: EnginePhase = activePane.kind === 'stage' ? (activePane.stageKey ?? 'intro') : 'intro'
  const activeRailIndex = activePane.kind === 'stage' ? RAIL_STEPS.findIndex((step) => step.key === activePane.stageKey) : -1

  const scrollToIndex = useCallback((target: number) => {
    const track = trackRef.current
    const stage = stageRef.current
    if (!track || !stage) return

    const slack = track.offsetHeight - stage.offsetHeight
    if (slack <= 0) return

    const midpoint = (WEIGHTS.slice(0, target).reduce((sum, weight) => sum + weight, 0) + WEIGHTS[target] / 2) / TOTAL_WEIGHT
    const stickyTop = parseFloat(window.getComputedStyle(stage).top) || 0
    const trackTop = track.getBoundingClientRect().top + window.scrollY

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: trackTop - stickyTop + midpoint * slack,
      behavior: reduceMotion ? 'instant' : 'smooth',
    })
  }, [])

  const handleRailCommit = useCallback(
    (railIndex: number) => {
      const step = RAIL_STEPS[railIndex]
      const paneIndex = PANES.findIndex((pane) => pane.kind === 'stage' && pane.stageKey === step.key)
      if (paneIndex >= 0) scrollToIndex(paneIndex)
    },
    [scrollToIndex],
  )

  return (
    <section className="relay-scene" aria-labelledby="relay-scene-heading">
      <h2 className="sr-only" id="relay-scene-heading">Inside the getrequest reliability layer</h2>
      <div className="relay-scene__track" ref={trackRef}>
        <div className="relay-scene__stage" ref={stageRef}>
          <div className="relay-scene__art">
            <EngineDiagram phase={diagramPhase} />
          </div>

          {PANES.map((pane, paneIndex) => (
            <div
              key={pane.id}
              className={`relay-scene__pane relay-scene__pane--${pane.kind}${paneIndex === index ? ' relay-scene__pane--active' : ''}`}
              inert={paneIndex === index ? undefined : true}
              aria-hidden={paneIndex !== index}
            >
              {pane.eyebrow && <p className="relay-scene__eyebrow">{pane.eyebrow}</p>}
              <h3 className="relay-scene__title">
                {pane.title.map((segment) => (
                  <span key={segment.text} className={segment.accent ? 'relay-scene__title-accent' : undefined}>
                    {segment.text}
                  </span>
                ))}
              </h3>
              {pane.lead && <p className="relay-scene__lead">{pane.lead}</p>}
              {pane.points && (
                <ul className="relay-scene__points">
                  {pane.points.map((point) => (
                    <li className="relay-scene__point" key={point}>{point}</li>
                  ))}
                </ul>
              )}
              {pane.description && <p className="relay-scene__description">{pane.description}</p>}
              {pane.cta && (
                <a className="relay-scene__cta btn btn-primary" href={pane.cta.href}>{pane.cta.label}</a>
              )}
            </div>
          ))}

          <div className="relay-scene__rail">
            {RAIL_STEPS.map((step, railIndex) => (
              <button
                key={step.key}
                type="button"
                className={`relay-scene__rail-step${railIndex === activeRailIndex ? ' relay-scene__rail-step--active' : ''}`}
                aria-label={`Show the ${step.label} stage`}
                aria-current={railIndex === activeRailIndex ? 'step' : undefined}
                onClick={() => handleRailCommit(railIndex)}
              >
                <step.icon className="relay-scene__rail-icon" />
                <span className="relay-scene__rail-label">{step.label}</span>
              </button>
            ))}
          </div>
        </div>

        {PANES.map((pane) => (
          <div key={pane.id} className="relay-scene__band" style={{ ['--band-weight' as string]: pane.weight }} aria-hidden="true" />
        ))}
      </div>
    </section>
  )
}
