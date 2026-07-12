import Head from 'next/head'
import Nav from '../components/Nav'

export default function About() {
  return (
    <>
      <Head><title>About — Landfall</title></Head>
      <Nav />
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '100px 2rem 80px' }}>
        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: 'var(--signal-red)',
          marginBottom: '16px',
        }}>ABOUT</div>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '40px',
        }}>The gap between what AI can do and what it's doing to people.</h1>

        <div style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--mid-grey)' }}>
          <p style={{ marginBottom: '24px' }}>
            Current approaches to tracking AI progress — benchmark scores, compute measurements, capability demos — are valuable but paint an incomplete picture. There's often a massive gap between "AI can nail the bar exam" and "AI is meaningfully changing how paralegals do their jobs."
          </p>
          <p style={{ marginBottom: '24px' }}>
            Landfall exists to measure that gap, and to forecast where it's about to close.
          </p>
          <p style={{ marginBottom: '24px' }}>
            The Displacement Imminence Score is the first metric that triangulates AI capability, real-world deployment momentum, and early labor market signals into a single forward-looking number per occupation. It is updated every quarter. It makes specific, dated predictions. And it scores itself publicly when those predictions resolve.
          </p>
          <p style={{ marginBottom: '24px' }}>
            The methodology is fully open source. Researchers anywhere can run it with their own data — national labor statistics, sector-specific deployment signals, firm-level HR data — and publish their results.
          </p>
        </div>

        <div style={{ height: '1px', background: 'var(--navy-border)', margin: '48px 0' }} />

        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: 'var(--mid-grey)',
          marginBottom: '20px',
        }}>DATA SOURCES</div>

        {[
          ['Anthropic Economic Index', 'CC-BY · Occupational AI usage, autonomy scores, human-only ability by SOC', 'anthropic.com/economic-futures'],
          ['Bureau of Labor Statistics', 'Public domain · OEWS, JOLTS, QCEW employment by SOC', 'bls.gov'],
          ["O*NET Database", "Public domain · Task decomposition for 900+ occupations", 'onetonline.org'],
          ['Revelio Public Labor Statistics', 'Free tier · Employment, hiring, attrition by SOC and state, monthly', 'reveliolabs.com/public-labor-statistics'],
          ['Lightcast', 'Commercial · Job posting trends, AI skill mentions by occupation', 'lightcast.io'],
          ['Epoch AI', 'CC-BY · AI model capabilities, adoption polling', 'epoch.ai/data'],
        ].map(([name, desc, url]) => (
          <div key={name} style={{
            padding: '16px 0',
            borderBottom: '1px solid var(--navy-border)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
              <span style={{ fontSize: '14px', color: 'var(--off-white)', fontWeight: 500 }}>{name}</span>
              <a href={`https://${url}`} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                color: 'var(--mid-grey)',
                letterSpacing: '0.04em',
              }}>{url} ↗</a>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--mid-grey)' }}>{desc}</div>
          </div>
        ))}

        <div style={{ height: '1px', background: 'var(--navy-border)', margin: '48px 0' }} />

        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: 'var(--mid-grey)',
          marginBottom: '20px',
        }}>CONTACT</div>

        <p style={{ fontSize: '15px', color: 'var(--mid-grey)', lineHeight: 1.7 }}>
          For research inquiries, data partnerships, or methodology questions:{' '}
          <a href="mailto:research@landfall.io" style={{ color: 'var(--off-white)', textDecoration: 'underline' }}>
            research@landfall.io
          </a>
        </p>

        <p style={{ fontSize: '15px', color: 'var(--mid-grey)', lineHeight: 1.7, marginTop: '16px' }}>
          Package and methodology on{' '}
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--off-white)', textDecoration: 'underline' }}>
            GitHub
          </a>
          . Data released under CC-BY.
        </p>
      </main>
    </>
  )
}
