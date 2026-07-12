import Head from 'next/head'
import Nav from '../components/Nav'
import { occupations, getRiskColor } from '../data/occupations'

export default function Signals() {
  const fastest = [...occupations].sort((a, b) => b.disDelta - a.disDelta).slice(0, 5)
  const highest = [...occupations].sort((a, b) => b.dis - a.dis).slice(0, 5)

  return (
    <>
      <Head><title>Signals — Landfall</title></Head>
      <Nav />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 2rem 80px' }}>

        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: 'var(--signal-red)',
          marginBottom: '16px',
        }}>Q3 2026 UPDATE</div>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '24px',
          maxWidth: '700px',
        }}>The gap is closing faster in legal than anywhere else.</h1>

        <p style={{
          fontSize: '17px',
          color: 'var(--mid-grey)',
          maxWidth: '640px',
          lineHeight: 1.8,
          marginBottom: '60px',
        }}>
          Our Q3 2026 reading shows three occupations crossing new thresholds this quarter. 
          The Legal sector's DIS moved +0.07 — the second-largest single-quarter move we've recorded. 
          Graphic Design is accelerating fastest. Customer Service is the first occupation to show 
          measurable employment decline consistent with our predictions.
        </p>

        <div style={{ height: '1px', background: 'var(--navy-border)', marginBottom: '60px' }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          marginBottom: '64px',
        }}>
          {/* Fastest moving */}
          <div>
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: 'var(--signal-red)',
              marginBottom: '20px',
            }}>FASTEST MOVING THIS QUARTER</div>
            {fastest.map((occ, i) => (
              <div key={occ.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0',
                borderBottom: '1px solid var(--navy-border)',
              }}>
                <div>
                  <div style={{ fontSize: '14px', color: 'var(--off-white)', marginBottom: '4px' }}>{occ.title}</div>
                  <div style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '11px',
                    color: 'var(--mid-grey)',
                  }}>DIS: {occ.dis.toFixed(2)}</div>
                </div>
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--signal-red)',
                }}>↑ +{occ.disDelta.toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Highest DIS */}
          <div>
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: 'var(--mid-grey)',
              marginBottom: '20px',
            }}>HIGHEST DIS SCORES</div>
            {highest.map((occ) => (
              <div key={occ.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0',
                borderBottom: '1px solid var(--navy-border)',
              }}>
                <div>
                  <div style={{ fontSize: '14px', color: 'var(--off-white)', marginBottom: '4px' }}>{occ.title}</div>
                  <div style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '11px',
                    color: 'var(--mid-grey)',
                  }}>Resolves: {occ.predictionResolution}</div>
                </div>
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: getRiskColor(occ.riskLevel),
                }}>{occ.dis.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: '1px', background: 'var(--navy-border)', marginBottom: '60px' }} />

        {/* Quarterly narrative */}
        <div style={{ maxWidth: '680px' }}>
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'var(--signal-red)',
            marginBottom: '24px',
          }}>QUARTERLY SIGNAL — JULY 2026</div>

          {[
            {
              head: 'Customer Service crosses the first threshold.',
              body: 'Employment in Customer Service & Call Centers has fallen below 2.6M — consistent with our Q1 2026 prediction. This isn\'t dramatic announcement layoffs. It\'s attrition that firms are choosing not to backfill. The mechanism matters: it means the transition is quieter than the number suggests. Workers in these roles are not being fired. Their jobs are not being refilled when they leave. That\'s harder to organize against, harder to measure, and harder to reverse.',
            },
            {
              head: 'The legal sector is accelerating, not stabilizing.',
              body: 'Paralegal DIS moved +0.07 this quarter — its second consecutive large move. The driver is deployment momentum, not new capability. The capability has been there for 18+ months. What changed is that legal software vendors shipped production-ready e-discovery and contract review automation that integrates with existing workflows. The friction is eroding. We\'re maintaining our Q1 2027 prediction.',
            },
            {
              head: 'Software development is the anomaly in the data.',
              body: 'DIS for software developers is flat at 0.71 for the second consecutive quarter. Capability is high (0.85). Deployment is the highest of any occupation (0.89 — AI tools are in 89% of new job postings). But the labor signal remains ambiguous. The METR finding holds: aggregate productivity gains for experienced developers on real tasks are smaller than expected. The DIS is flat because these two signals are in tension. We\'re watching this closely. If the labor signal starts moving, it will move fast.',
            },
            {
              head: 'Graphic Design shows the fastest single-quarter acceleration.',
              body: '+0.08 in one quarter. The driver is generative image quality crossing a threshold for commodity design work. The split is stark: freelance and agency markets are collapsing (Upwork postings down 35% since 2022), while in-house roles with brand oversight responsibility are holding. This is what task-level automation looks like when it\'s not yet occupation-level displacement. The occupation score will lag the market signal by 6–12 months.',
            },
          ].map(({ head, body }) => (
            <div key={head} style={{ marginBottom: '40px' }}>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--off-white)',
              }}>{head}</h3>
              <p style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--mid-grey)',
              }}>{body}</p>
            </div>
          ))}

          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px',
            color: 'var(--mid-grey)',
            marginTop: '40px',
            letterSpacing: '0.04em',
          }}>
            Next update: October 2026 · <a href="/methodology" style={{ color: 'var(--off-white-dim)', textDecoration: 'underline' }}>Full methodology</a>
          </div>
        </div>
      </main>
    </>
  )
}
