import Head from 'next/head'
import Nav from '../components/Nav'

export default function Methodology() {
  return (
    <>
      <Head><title>Methodology — Landfall</title></Head>
      <Nav />
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '100px 2rem 80px' }}>
        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: 'var(--signal-red)',
          marginBottom: '16px',
        }}>METHODOLOGY</div>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '40px',
        }}>Displacement Imminence Score</h1>

        <div style={{
          background: 'var(--navy-light)',
          border: '1px solid var(--navy-border)',
          padding: '24px',
          marginBottom: '48px',
          fontFamily: 'Space Mono, monospace',
          fontSize: '13px',
          lineHeight: 1.8,
          color: 'var(--off-white)',
        }}>
          <div style={{ color: 'var(--mid-grey)', fontSize: '10px', letterSpacing: '0.1em', marginBottom: '12px' }}>FORMULA v0.1</div>
          DIS = (capability_exposure × 0.40)<br />
          {'    '}+ (deployment_momentum × 0.40)<br />
          {'    '}+ (labor_market_signal × 0.20)
        </div>

        {[
          {
            label: '01 — CAPABILITY EXPOSURE (40%)',
            title: 'What AI can do in this occupation',
            body: `Measures the fraction of an occupation's task structure that current AI systems can execute without meaningful human involvement. Derived from two inputs: the Anthropic Economic Index's human_only_ability_pct (inverted, so higher AI capability = higher score) and the ai_autonomy_mean field (1–5 scale, normalized to 0–1), cross-referenced against O*NET Generalized Work Activity profiles.

The O*NET linkage matters: it ensures we're measuring task-level capability, not occupational-level hype. An occupation may have high AI capability for some tasks (e.g., document review in law) and low capability for others (e.g., client counseling). We weight by task prevalence within the occupation.`,
            sources: ['Anthropic Economic Index (CC-BY)', "O*NET Database (DOL, public domain)", 'Academic capability evals mapped to O*NET tasks'],
          },
          {
            label: '02 — DEPLOYMENT MOMENTUM (40%)',
            title: 'Whether AI is actually being used',
            body: `The gap between capability and deployment is the central finding of labor economics research on AI (see: METR study, Brynjolfsson et al.). This component measures whether AI is actually entering workflows in this occupation — and how fast.

Two signals: (1) Lightcast job posting data — are firms mentioning AI tools in postings for this occupation, and is that share growing? (2) Revelio RPLS — are job postings for this occupation growing or shrinking relative to the broader labor market? The second signal is model-agnostic: it doesn't matter whether firms are using Claude, GPT, Gemini, or open-source models. If AI is replacing human labor, posting volume falls.

Rate of change is weighted alongside level. A sector at 10% AI-skill penetration growing 50% quarter-over-quarter scores higher on momentum than one at 30% penetration growing 5%.`,
            sources: ['Lightcast job posting data', 'Revelio Public Labor Statistics (RPLS, free tier)', 'BLS Job Openings and Labor Turnover Survey (JOLTS)'],
          },
          {
            label: '03 — LABOR MARKET SIGNAL (20%)',
            title: 'Whether the labor market is already responding',
            body: `The weakest-weighted component because it's a lagging indicator — by the time employment falls, displacement has already happened. But it's the ground truth check: if capability is high and deployment is accelerating but employment is still growing, that's important information about friction or demand elasticity.

Sourced from BLS OEWS (quarterly employment by SOC code) and Revelio RPLS (hiring and attrition rates). We track not just employment levels but hiring rates — a sector where firms stop backfilling attrition shows displacement even when headline employment is stable.`,
            sources: ['BLS Occupational Employment and Wage Statistics (OEWS)', 'Revelio Public Labor Statistics (RPLS)', 'BLS Quarterly Census of Employment and Wages (QCEW)'],
          },
          {
            label: '04 — WEIGHT DERIVATION',
            title: 'How we set the 40/40/20 split',
            body: `Weights are not assumed — they were derived from a backtesting exercise against 2020–2024 BLS employment data for occupations where AI impact is already measurable: data entry clerks, telemarketers, and some paralegal roles at large firms.

We tested weight combinations (capability/deployment/labor) across a grid from 10%–70% per component and selected the combination that maximized predictive accuracy (Spearman correlation between DIS score and subsequent employment change) on held-out occupations. The 40/40/20 split outperformed alternatives including equal weighting and capability-heavy weighting. Full backtest results and code are available in the GitHub repository.`,
            sources: ['BLS OEWS historical series 2020–2024', 'Revelio Labs historical workforce data'],
          },
          {
            label: '05 — PREDICTIONS & SCORING',
            title: 'How we hold ourselves accountable',
            body: `Every occupation page carries a specific, dated prediction logged with a timestamp. When the resolution date arrives, we score the prediction publicly as: Correct (within 20% of predicted magnitude and within one quarter of predicted timing), Partial (directionally right but wrong on magnitude or timing), or Incorrect.

We do not quietly update predictions. Logged predictions are immutable — they remain visible whether they resolve correctly or not. This is the core commitment that separates Landfall from other forecasting efforts in this space.

Uncertainty is quantified: each DIS score carries a confidence interval (±0.08 at one standard deviation) derived from the variation across data sources. The prediction text represents our modal expectation; the CI reflects genuine uncertainty.`,
            sources: ['All predictions logged with UTC timestamp', 'Scoring criteria published openly', 'Historical predictions archived on GitHub'],
          },
        ].map(({ label, title, body, sources }) => (
          <div key={label} style={{ marginBottom: '48px' }}>
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: 'var(--signal-red)',
              marginBottom: '8px',
            }}>{label}</div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '24px',
              fontWeight: 700,
              marginBottom: '16px',
            }}>{title}</h2>
            <div style={{
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'var(--mid-grey)',
              marginBottom: '20px',
              whiteSpace: 'pre-line',
            }}>{body}</div>
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
            }}>
              {sources.map(src => (
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
            <div style={{ height: '1px', background: 'var(--navy-border)', marginTop: '40px' }} />
          </div>
        ))}

        <div style={{
          background: 'var(--navy-light)',
          border: '1px solid var(--navy-border)',
          padding: '24px',
          marginTop: '16px',
        }}>
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'var(--mid-grey)',
            marginBottom: '12px',
          }}>CITATION</div>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '12px',
            lineHeight: 1.8,
            color: 'var(--off-white)',
          }}>
            Landfall (2026). Displacement Imminence Score: Methodology v0.1.<br />
            landfall.io/methodology · Data and code: github.com/landfall
          </p>
        </div>
      </main>
    </>
  )
}
