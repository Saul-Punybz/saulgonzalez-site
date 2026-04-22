import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Saul A. González — Consultoría Digital'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#090820',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gradient orbs */}
        <div style={{
          position: 'absolute', top: -120, left: -80,
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(112,48,239,0.35) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: -100, right: -60,
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,38,211,0.25) 0%, transparent 70%)',
        }} />

        {/* Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          padding: '80px 100px',
          position: 'relative',
        }}>
          {/* Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(112,48,239,0.15)',
            border: '1px solid rgba(112,48,239,0.35)',
            borderRadius: 100,
            padding: '10px 22px',
            marginBottom: 40,
            alignSelf: 'flex-start',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#a855f7' }} />
            <span style={{ color: '#a855f7', fontSize: 16, fontWeight: 700, letterSpacing: '0.12em' }}>
              CONSULTORÍA DIGITAL · PUERTO RICO
            </span>
          </div>

          {/* Name */}
          <div style={{
            fontSize: 82,
            fontWeight: 900,
            color: 'white',
            lineHeight: 1,
            marginBottom: 20,
            letterSpacing: '-2px',
          }}>
            Saul A. González
          </div>

          {/* Tagline */}
          <div style={{
            fontSize: 32,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.55)',
            marginBottom: 60,
          }}>
            WebApps · Apps Móviles · Inteligencia Artificial
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 60 }}>
            {[
              { n: '15+',   l: 'años de experiencia' },
              { n: '29',    l: 'países' },
              { n: '2,000+', l: 'proyectos' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 44, fontWeight: 900, color: '#a855f7', lineHeight: 1 }}>{s.n}</span>
                <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: 5,
          background: 'linear-gradient(90deg, #7030ef, #c026d3, #ec4899)',
        }} />
      </div>
    ),
    { ...size }
  )
}
