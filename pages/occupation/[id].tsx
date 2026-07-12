import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Nav from '../../components/Nav'
import DISBar from '../../components/DISBar'
import { occupations, getOccupationById, getRiskColor, getRiskLabel, Occupation } from '../../data/occupations'

interface Props { occupation: Occupation }

export default function OccupationPage({ occupation: occ }: Props) {
  const color = getRiskColor(occ.riskLevel)

  const chartData = occ.history.map(h => ({
    quarter: h.quarter.replace('Q', 'Q'),
    score: h.score,
  }))

  const driverLabels = [
    { key: 'capability', label: 'AI Capability Exposure', weight: '40%' },
    { key: 'deployment', label: 'Deployment Momentum', weight: '40%' },
    { key: 'laborSignal', label: 'Labor Market Signal', weight: '20%' },
  ]

  return (
    <>
      <Head>
        <title>{occ.title} — Landfall</title>
        <meta name="description" content={`DIS score ${occ.dis} for ${occ.title}. ${occ.prediction}`} />
      </Head>
      <Nav />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 2rem 80px' }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: '32px' }}>
          <Link href="/" style={{
            fontSize: '12px',
            fontFamily: 'Space Mono, monospace',
            color: 'var(--mid-grey)',
            letterSpacing: '0.08em',
          }}>← FORECAST</Link>
        </div>

        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '32px',
          alignItems: 'start',
          marginBottom: '48px',
        }}>
          <div>
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: 'var(--mid-grey)',
              marginBottom: '12px',
            }}>SOC {occ.socCode} · {occ.employmentCount} WORKERS</div>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(28px, 5vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}>{occ.title}</h1>
            <DISBar score={occ.dis} level={occ.riskLevel} size="large" animated={true} />
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '64px',
              fontWeight: 700,
              color,
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}>{occ.dis.toFixed(2)}</div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '8px',
              marginTop: '12px',
            }}>
              <span style={{
                fontSize: '10px',
                fontFamily: 'Space Mono, monospace',
                letterSpacing: '0.1em',
                color,
                border: `1px solid ${color}`,
                padding: '3px 8px',
              }}>{getRiskLabel(occ.riskLevel)}</span>
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '13px',
                color: occ.disDelta > 0 ? 'var(--signal-red)' : 'var(--green)',
              }}>
                {occ.disDelta > 0 ? '↑' : '↓'} {occ.disDelta > 0 ? '+' : ''}{occ.disDelta.toFixed(2)} this quarter
              </span>
            </div>
          </div>
        </div>

        <div className="rule" />

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '64px',
          marginTop: '48px',
        }}>
          {/* Left column */}
          <div>
            {/* Narrative */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--signal-red)',
                marginBottom: '16px',
              }}>ANALYSIS</div>
              <p style={{
                fontSize: '16px',
                lineHeight: 1.8,
                color: 'var(--off-white)',
              }}>{occ.narrative}</p>
            </div>

            {/* Score history chart */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--signal-red)',
                marginBottom: '16px',
              }}>DIS HISTORY</div>
              <div style={{ height: '160px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 4, right: 4, left: -24, bottom: 4 }}>
                    <XAxis
                      dataKey="quarter"
                      tick={{ fill: 'var(--mid-grey)', fontSize: 10, fontFamily: 'Space Mono' }}
                      axisLine={{ stroke: 'var(--navy-border)' }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 1]}
                      tick={{ fill: 'var(--mid-grey)', fontSize: 10, fontFamily: 'Space Mono' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--navy-mid)',
                        border: '1px solid var(--navy-border)',
                        borderRadius: 0,
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '12px',
                        color: 'var(--off-white)',
                      }}
                      formatter={(val: number) => [val.toFixed(2), 'DIS']}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke={color}
                      strokeWidth={2}
                      dot={{ fill: color, strokeWidth: 0, r: 4 }}
                      activeDot={{ fill: color, r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* DIS component breakdown */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--signal-red)',
                marginBottom: '20px',
              }}>SCORE COMPONENTS</div>
              {driverLabels.map(({ key, label, weight }) => {
                const val = occ.drivers[key as keyof typeof occ.drivers]
                return (
                  <div key={key} style={{ marginBottom: '20px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}>
                      <span style={{ fontSize: '13px', color: 'var(--off-white)' }}>{label}</span>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{
                          fontSize: '10px',
                          fontFamily: 'Space Mono, monospace',
                          color: 'var(--mid-grey)',
                        }}>{weight}</span>
                        <span style={{
                          fontSize: '14px',
                          fontFamily: 'Space Mono, monospace',
                          fontWeight: 700,
                          color: 'var(--off-white)',
                        }}>{val.toFixed(2)}</span>
                      </div>
                    </div>
                    <div style={{ height: '4px', background: 'var(--navy-border)', position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        top: 0, left: 0, height: '100%',
                        width: `${val * 100}%`,
                        background: color,
                        transition: 'width 1s ease',
                      }} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* What would change */}
            <div>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--mid-grey)',
                marginBottom: '16px',
              }}>WHAT WOULD LOWER THIS SCORE</div>
              <p style={{
                fontSize: '14px',
                color: 'var(--mid-grey)',
                lineHeight: 1.7,
                borderLeft: '2px solid var(--navy-border)',
                paddingLeft: '16px',
              }}>{occ.whatWouldChange}</p>
            </div>
          </div>

          {/* Right column */}
          <div>
            {/* Prediction box */}
            <div style={{
              border: `1px solid ${color}`,
              padding: '24px',
              marginBottom: '32px',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: '-1px', left: '16px',
                background: 'var(--navy)',
                padding: '0 8px',
                fontFamily: 'Space Mono, monospace',
                fontSize: '9px',
                letterSpacing: '0.12em',
                color,
              }}>PREDICTION</div>

              <p style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: 'var(--off-white)',
                marginBottom: '20px',
                marginTop: '8px',
                fontStyle: 'italic',
              }}>"{occ.prediction}"</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  fontFamily: 'Space Mono, monospace',
                }}>
                  <span style={{ color: 'var(--mid-grey)' }}>LOGGED</span>
                  <span style={{ color: 'var(--off-white)' }}>{occ.predictionDate}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  fontFamily: 'Space Mono, monospace',
                }}>
                  <span style={{ color: 'var(--mid-grey)' }}>RESOLVES</span>
                  <span style={{ color: 'var(--off-white)' }}>{occ.predictionResolution}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  fontFamily: 'Space Mono, monospace',
                }}>
                  <span style={{ color: 'var(--mid-grey)' }}>STATUS</span>
                  <span style={{ color: 'var(--amber)' }}>⏳ PENDING</span>
                </div>
              </div>
            </div>

            {/* Data sources */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--mid-grey)',
                marginBottom: '16px',
              }}>DATA SOURCES</div>
              {occ.sources.map((src, i) => (
                <div key={i} style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--navy-border)',
                }}>
                  <div style={{
                    fontSize: '11px',
                    fontFamily: 'Space Mono, monospace',
                    color: 'var(--mid-grey)',
                    marginBottom: '4px',
                    letterSpacing: '0.04em',
                  }}>{src.name}</div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}>
                    <span style={{ fontSize: '13px', color: 'var(--off-white)' }}>{src.metric}</span>
                    <span style={{
                      fontSize: '13px',
                      fontFamily: 'Space Mono, monospace',
                      fontWeight: 700,
                      color,
                    }}>{src.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Other occupations */}
            <div>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--mid-grey)',
                marginBottom: '16px',
              }}>OTHER OCCUPATIONS</div>
              {occupations
                .filter(o => o.id !== occ.id)
                .sort((a, b) => b.dis - a.dis)
                .slice(0, 5)
                .map(o => (
                  <Link key={o.id} href={`/occupation/${o.id}`}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 0',
                      borderBottom: '1px solid var(--navy-border)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => e.currentTarget.style.paddingLeft = '4px'}
                    onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
                    >
                      <span style={{ fontSize: '13px', color: 'var(--mid-grey)' }}>{o.title}</span>
                      <span style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: getRiskColor(o.riskLevel),
                      }}>{o.dis.toFixed(2)}</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: occupations.map(o => ({ params: { id: o.id } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const occupation = getOccupationById(params?.id as string)
  if (!occupation) return { notFound: true }
  return { props: { occupation } }
}
