// Tiny imperative packet animator for SVG paths. One rAF loop drives every
// in-flight packet; React never re-renders per frame.

export type PacketKind = 'req' | 'ok' | 'err' | 'ack' | 'retry'

interface Flight {
  el: SVGCircleElement
  path: SVGPathElement
  len: number
  start: number
  dur: number
  reverse: boolean
  resolve: () => void
}

const SVG_NS = 'http://www.w3.org/2000/svg'

export class PacketLayer {
  private flights: Flight[] = []
  private raf = 0
  private disposed = false

  constructor(private layer: SVGGElement, private instant: () => boolean) {}

  send(path: SVGPathElement | null, kind: PacketKind, opts: { reverse?: boolean; dur?: number } = {}): Promise<void> {
    if (!path || this.disposed || this.instant()) return Promise.resolve()
    return new Promise((resolve) => {
      const el = document.createElementNS(SVG_NS, 'circle')
      el.setAttribute('r', kind === 'req' ? '3.5' : '3')
      el.setAttribute('class', `pkt pkt--${kind}`)
      const len = path.getTotalLength()
      // Place it at its starting point before it's attached, so it never flashes at the SVG origin.
      const start = path.getPointAtLength(opts.reverse ? len : 0)
      el.setAttribute('cx', start.x.toFixed(1))
      el.setAttribute('cy', start.y.toFixed(1))
      this.layer.appendChild(el)
      this.flights.push({ el, path, len, start: performance.now(), dur: opts.dur ?? 520, reverse: !!opts.reverse, resolve })
      if (!this.raf) this.raf = requestAnimationFrame(this.tick)
    })
  }

  private tick = (now: number) => {
    this.flights = this.flights.filter((f) => {
      const p = Math.min(1, (now - f.start) / f.dur)
      const at = f.path.getPointAtLength((f.reverse ? 1 - p : p) * f.len)
      f.el.setAttribute('cx', at.x.toFixed(1))
      f.el.setAttribute('cy', at.y.toFixed(1))
      if (p >= 1) {
        f.el.remove()
        f.resolve()
        return false
      }
      return true
    })
    this.raf = this.flights.length && !this.disposed ? requestAnimationFrame(this.tick) : 0
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.raf)
    this.flights.forEach((f) => { f.el.remove(); f.resolve() })
    this.flights = []
  }
}

export const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))
