import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'
import DISBar from '../components/DISBar'
import { occupations, getRiskColor, getRiskLabel, RiskLevel } from '../data/occupations'

const LAST_UPDATED = 'Q3 2026 — Updated July 2026'
const NEXT_UPDATE = 'October 2026'
const DATA_SOURCES = ['Anthropic Economic Index', 'BLS OEWS', 'Revelio RPLS', 'O*NET', 'Lightcast']

export default function Home() {
  const [filter, setFilter] = useState<RiskLevel | 'all'>('all')
  const [sortBy, setSortBy] = useState<'dis' | 'delta'>('dis')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const scanRef = useRef<HTMLDivElement>(null)

  const filtered = occupations
    .filter(o => filter === 'all' || o.riskLevel === filter)
    .sort((a, b) => sortBy === 'dis' ? b.dis - a.dis : b.disDelta - a.disDelta)

  const stats = {
    critical: occupations.filter(o => o.riskLevel === 'critical').length,
    high: occupations.filter(o => o.riskLevel === 'high').length,
    avgDIS: (occupations.reduce((s, o) => s + o.dis, 0) / occupations.length).toFixed(2),
    fastestMoving: [...occupations].sort((a, b) => b.disDelta - a.disDelta)[0],
  }

  return (
    <>
      <Head>
        <title>Landfall — AI Economic Impact Forecast</title>
      </Head>
      <Nav />

      {/* Radar scan line */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}>
        <div ref={scanRef} style={{
          position: 'absolute',
          left: 0, right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, var(--scan-line), transparent)',
          animation: 'radar-sweep 8s linear infinite',
        }} />
      </div>

      <main style={{ position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <section style={{
          padding: '120px 2rem 80px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '6px', height: '6px',
              background: 'var(--signal-red)',
              borderRadius: '50%',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px',
              letterSpacing: '0.12em',
              color: 'var(--signal-red)',
            }}>LIVE — {LAST_UPDATED}</span>
          </div>

          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(42px, 7vw, 88px)',
            fontWeight: 800,
            lineHeight: 1.0,
            color: 'var(--off-white)',
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}>
            Where AI hits<br />
            <span style={{ color: 'var(--signal-red)', fontStyle: 'italic' }}>the economy.</span>
          </h1>

          <p style={{
            fontSize: '18px',
            color: 'var(--mid-grey)',
            maxWidth: '560px',
            marginTop: '24px',
            lineHeight: 1.7,
          }}>
            The Displacement Imminence Score measures how close each occupation is to meaningful AI-driven disruption — updated every quarter, with specific predictions we score publicly when they resolve.
          </p>

          <div style={{
            display: 'flex',
            gap: '2rem',
            marginTop: '48px',
            flexWrap: 'wrap',
          }}>
            {[
              { label: 'Occupations tracked', value: String(occupations.length) },
              { label: 'Critical risk', value: String(stats.critical) },
              { label: 'Mean DIS', value: stats.avgDIS },
              { label: 'Fastest moving', value: stats.fastestMoving.title.split(' ')[0] },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '28px',
                  fontWeight: 700,
                  color: 'var(--off-white)',
                }}>{value}</div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--mid-grey)',
                  letterSpacing: '0.08em',
                  marginTop: '4px',
                }}>{label.toUpperCase()}</div>
              </div>
            ))}
          </div>

          {/* Data sources strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '40px',
            flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: '11px', color: 'var(--mid-grey)', letterSpacing: '0.08em' }}>DATA:</span>
            {DATA_SOURCES.map(src => (
              <span key={src} style={{
                fontSize: '11px',
                fontFamily: 'Space Mono, monospace',
                color: 'var(--mid-grey)',
                border: '1px solid var(--navy-border)',
                padding: '3px 8px',
                letterSpacing: '0.04em',
              }}>{src}</span>
            ))}
          </div>
        </section>

        <div className="rule" style={{ maxWidth: '1200px', margin: '0 auto' }} />

        {/* Forecast table */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 2rem',
        }}>
          {/* Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: 'var(--mid-grey)', letterSpacing: '0.08em' }}>FILTER:</span>
              {(['all', 'critical', 'high', 'moderate', 'low'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    fontSize: '11px',
                    fontFamily: 'Space Mono, monospace',
                    letterSpacing: '0.06em',
                    padding: '4px 10px',
                    border: '1px solid',
                    borderColor: filter === f
                      ? (f === 'all' ? 'var(--off-white)' : getRiskColor(f as RiskLevel))
                      : 'var(--navy-border)',
                    background: filter === f
                      ? (f === 'all' ? 'var(--off-white)' : getRiskColor(f as RiskLevel))
                      : 'transparent',
                    color: filter === f ? 'var(--navy)' : 'var(--mid-grey)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: 'var(--mid-grey)', letterSpacing: '0.08em' }}>SORT:</span>
              {[
                { value: 'dis', label: 'DIS SCORE' },
                { value: 'delta', label: 'FASTEST MOVING' },
              ].map(s => (
                <button
                  key={s.value}
                  onClick={() => setSortBy(s.value as 'dis' | 'delta')}
                  style={{
                    fontSize: '11px',
                    fontFamily: 'Space Mono, monospace',
                    letterSpacing: '0.06em',
                    padding: '4px 10px',
                    border: '1px solid',
                    borderColor: sortBy === s.value ? 'var(--off-white)' : 'var(--navy-border)',
                    background: sortBy === s.value ? 'var(--navy-border)' : 'transparent',
                    color: sortBy === s.value ? 'var(--off-white)' : 'var(--mid-grey)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >{s.label}</button>
              ))}
            </div>
          </div>

          {/* Column headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 120px 80px 80px 1fr',
            gap: '16px',
            padding: '0 16px 12px',
            borderBottom: '1px solid var(--navy-border)',
          }}>
            {['OCCUPATION', 'DIS SCORE', 'QoQ', 'RISK', 'PREDICTION'].map(col => (
              <div key={col} style={{
                fontSize: '10px',
                fontFamily: 'Space Mono, monospace',
                letterSpacing: '0.1em',
                color: 'var(--mid-grey)',
              }}>{col}</div>
            ))}
          </div>

          {/* Rows */}
          {filtered.map((occ, i) => {
            const color = getRiskColor(occ.riskLevel)
            const isHovered = hoveredId === occ.id
            return (
              <Link key={occ.id} href={`/occupation/${occ.id}`}>
                <div
                  onMouseEnter={() => setHoveredId(occ.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 120px 80px 80px 1fr',
                    gap: '16px',
                    padding: '20px 16px',
                    borderBottom: '1px solid var(--navy-border)',
                    background: isHovered ? 'var(--navy-light)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                    animation: `fade-in-up 0.4s ease ${i * 0.05}s both`,
                  }}
                >
                  {/* Title */}
                  <div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: isHovered ? 'var(--off-white)' : 'var(--off-white)',
                      marginBottom: '6px',
                    }}>{occ.title}</div>
                    <DISBar score={occ.dis} level={occ.riskLevel} size="small" animated={false} />
                  </div>

                  {/* DIS Score */}
                  <div style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '22px',
                    fontWeight: 700,
                    color,
                    letterSpacing: '-0.02em',
                  }}>
                    {occ.dis.toFixed(2)}
                  </div>

                  {/* Delta */}
                  <div style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '13px',
                    color: occ.disDelta > 0 ? 'var(--signal-red)' : occ.disDelta < 0 ? 'var(--green)' : 'var(--mid-grey)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                  }}>
                    {occ.disDelta > 0 ? '↑' : occ.disDelta < 0 ? '↓' : '→'}
                    {occ.disDelta !== 0 ? `+${occ.disDelta.toFixed(2)}` : 'flat'}
                  </div>

                  {/* Risk badge */}
                  <div>
                    <span style={{
                      fontSize: '9px',
                      fontFamily: 'Space Mono, monospace',
                      letterSpacing: '0.1em',
                      color,
                      border: `1px solid ${color}`,
                      padding: '2px 6px',
                    }}>{getRiskLabel(occ.riskLevel)}</span>
                  </div>

                  {/* Prediction */}
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--mid-grey)',
                    lineHeight: 1.4,
                  }}>
                    <span style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '9px',
                      letterSpacing: '0.08em',
                      color: occ.predictionStatus === 'pending' ? 'var(--amber)' : 'var(--green)',
                      display: 'block',
                      marginBottom: '4px',
                    }}>
                      {occ.predictionStatus === 'pending' ? `⏳ RESOLVES ${occ.predictionResolution}` : `✓ RESOLVED`}
                    </span>
                    {occ.prediction}
                  </div>
                </div>
              </Link>
            )
          })}
        </section>

        <div className="rule" style={{ maxWidth: '1200px', margin: '0 auto' }} />

        {/* How it works strip */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 2rem',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '40px',
          }}>
            <div>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--signal-red)',
                marginBottom: '12px',
              }}>THE METRIC</div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '22px',
                fontWeight: 700,
                marginBottom: '12px',
              }}>Displacement Imminence Score</h3>
              <p style={{ fontSize: '14px', color: 'var(--mid-grey)', lineHeight: 1.7 }}>
                DIS combines three components — AI capability exposure (40%), real-world deployment momentum (40%), and early labor market signal (20%) — into a single 0–1 score per occupation, updated quarterly.
              </p>
            </div>
            <div>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--signal-red)',
                marginBottom: '12px',
              }}>THE COMMITMENT</div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '22px',
                fontWeight: 700,
                marginBottom: '12px',
              }}>Predictions with dates</h3>
              <p style={{ fontSize: '14px', color: 'var(--mid-grey)', lineHeight: 1.7 }}>
                Every occupation carries a specific, dated prediction. When the resolution date arrives, we score ourselves publicly — right, wrong, or partial. The track record is the product.
              </p>
            </div>
            <div>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--signal-red)',
                marginBottom: '12px',
              }}>THE PACKAGE</div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '22px',
                fontWeight: 700,
                marginBottom: '12px',
              }}>Run it with your data</h3>
              <p style={{ fontSize: '14px', color: 'var(--mid-grey)', lineHeight: 1.7 }}>
                The methodology is open source. Bring your own occupational data — Korean labor stats, EU sector surveys, firm-level HR data — and compute DIS scores for your context.
              </p>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '12px',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: 'var(--signal-red)',
                }}>pip install landfall →</a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid var(--navy-border)',
          padding: '32px 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div style={{ fontSize: '12px', color: 'var(--mid-grey)' }}>
            <span style={{ fontFamily: 'Space Mono, monospace', letterSpacing: '0.08em' }}>LANDFALL</span>
            {' '}— Next update: {NEXT_UPDATE}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--mid-grey)' }}>
            Data released under CC-BY · Methodology on{' '}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--off-white-dim)', textDecoration: 'underline' }}>GitHub</a>
          </div>
        </footer>

      </main>
    </>
  )
}
