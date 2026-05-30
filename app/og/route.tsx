import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') ?? 'getrequest'
  const desc = searchParams.get('desc') ?? 'API reliability infrastructure for modern teams.'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#06080f',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '64px 72px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Dot grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Top glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '300px',
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.25) 0%, transparent 70%)',
          }}
        />
        {/* Logo text */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            left: '72px',
            color: '#ffffff',
            fontSize: '22px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          getrequest ▶
        </div>
        {/* Label */}
        <div
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '13px',
            fontFamily: 'monospace',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          // api reliability infrastructure
        </div>
        {/* Title */}
        <div
          style={{
            color: '#ffffff',
            fontSize: title.length > 40 ? '42px' : '52px',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            marginBottom: '20px',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>
        {/* Description */}
        <div
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '20px',
            lineHeight: 1.5,
            maxWidth: '800px',
          }}
        >
          {desc}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
