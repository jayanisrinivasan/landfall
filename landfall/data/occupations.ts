export type RiskLevel = 'critical' | 'high' | 'moderate' | 'low';

export interface DISHistory {
  quarter: string;
  score: number;
}

export interface DataSource {
  name: string;
  metric: string;
  value: string;
}

export interface Occupation {
  id: string;
  title: string;
  socCode: string;
  dis: number;
  disDelta: number; // change from last quarter
  riskLevel: RiskLevel;
  prediction: string;
  predictionDate: string; // when prediction was logged
  predictionResolution: string; // when it resolves
  predictionStatus: 'pending' | 'correct' | 'incorrect' | 'partial';
  history: DISHistory[];
  drivers: {
    capability: number;      // 0-1
    deployment: number;      // 0-1
    laborSignal: number;     // 0-1
  };
  sources: DataSource[];
  narrative: string;
  employmentCount: string;
  whatWouldChange: string;
}

export const occupations: Occupation[] = [
  {
    id: 'paralegals',
    title: 'Paralegals & Legal Assistants',
    socCode: '23-2011',
    dis: 0.81,
    disDelta: +0.07,
    riskLevel: 'critical',
    prediction: 'Employment at firms with 500+ employees contracts >5% by Q1 2027.',
    predictionDate: 'June 2026',
    predictionResolution: 'Q1 2027',
    predictionStatus: 'pending',
    history: [
      { quarter: 'Q4 2025', score: 0.61 },
      { quarter: 'Q1 2026', score: 0.71 },
      { quarter: 'Q2 2026', score: 0.74 },
      { quarter: 'Q3 2026', score: 0.81 },
    ],
    drivers: {
      capability: 0.94,
      deployment: 0.72,
      laborSignal: 0.61,
    },
    sources: [
      { name: 'Anthropic Economic Index', metric: 'Human-only ability', value: '76.1%' },
      { name: 'Revelio RPLS', metric: 'Job postings YoY', value: '−18%' },
      { name: 'AEI', metric: 'AI autonomy score', value: '3.8 / 5' },
      { name: 'BLS OEWS', metric: 'Employment (2025)', value: '374,000' },
    ],
    narrative: 'Legal has the lowest human-only ability score in the entire occupational taxonomy — meaning AI can complete more legal tasks without human involvement than in almost any other field. Yet deployment has lagged capability by roughly 18 months, held back by regulatory uncertainty and partner resistance. That friction is now visibly eroding: e-discovery automation is production-grade at major firms, contract review is routine, and the first round of paralegal headcount reductions at large firms was reported in Q2 2026. The gap is closing faster here than anywhere.',
    employmentCount: '374,000',
    whatWouldChange: 'Bar association rulings restricting AI in legal proceedings; slower-than-expected agentic deployment in legal software suites; firm liability concerns around AI-generated documents.',
  },
  {
    id: 'medical-coders',
    title: 'Medical Records & Health Info Technicians',
    socCode: '29-2072',
    dis: 0.76,
    disDelta: +0.09,
    riskLevel: 'critical',
    prediction: 'Hiring rates fall >20% below 2024 baseline by Q3 2026, concentrated in hospital systems.',
    predictionDate: 'June 2026',
    predictionResolution: 'Q3 2026',
    predictionStatus: 'pending',
    history: [
      { quarter: 'Q4 2025', score: 0.54 },
      { quarter: 'Q1 2026', score: 0.61 },
      { quarter: 'Q2 2026', score: 0.67 },
      { quarter: 'Q3 2026', score: 0.76 },
    ],
    drivers: {
      capability: 0.91,
      deployment: 0.78,
      laborSignal: 0.44,
    },
    sources: [
      { name: 'Anthropic Economic Index', metric: 'AI autonomy score', value: '4.1 / 5' },
      { name: 'Lightcast', metric: 'AI skills in postings', value: '+340% YoY' },
      { name: 'Revelio RPLS', metric: 'Hiring rate change', value: '−14%' },
      { name: 'BLS OEWS', metric: 'Employment (2025)', value: '217,000' },
    ],
    narrative: 'Medical coding is among the most structurally automatable occupations in healthcare — rule-based, highly standardized, and already operating within digital systems. AI coding tools have been in production at large hospital systems since 2024. The deployment momentum signal is the strongest in the dataset: AI-skills mentions in medical coding job postings are up 340% year-over-year, and the postings themselves are declining. This is what the early stage of threshold crossing looks like.',
    employmentCount: '217,000',
    whatWouldChange: 'CMS regulation requiring human review of all coded claims; HIPAA uncertainty around AI-processed records; slower EHR integration than vendors are projecting.',
  },
  {
    id: 'financial-analysts',
    title: 'Financial Analysts',
    socCode: '13-2051',
    dis: 0.74,
    disDelta: +0.04,
    riskLevel: 'high',
    prediction: 'Entry-level analyst hiring at banks and asset managers down >15% by Q4 2026 vs. 2023 peak.',
    predictionDate: 'June 2026',
    predictionResolution: 'Q4 2026',
    predictionStatus: 'pending',
    history: [
      { quarter: 'Q4 2025', score: 0.58 },
      { quarter: 'Q1 2026', score: 0.64 },
      { quarter: 'Q2 2026', score: 0.70 },
      { quarter: 'Q3 2026', score: 0.74 },
    ],
    drivers: {
      capability: 0.88,
      deployment: 0.69,
      laborSignal: 0.52,
    },
    sources: [
      { name: 'Goldman Sachs Research', metric: 'Junior analyst employment', value: '−16% since 2022' },
      { name: 'Revelio RPLS', metric: 'Entry-level postings', value: '−22% YoY' },
      { name: 'AEI', metric: 'Human-only ability', value: '81.3%' },
      { name: 'BLS OEWS', metric: 'Employment (2025)', value: '312,000' },
    ],
    narrative: 'The junior analyst pipeline is the clearest early signal in financial services. Goldman Sachs data shows employment for 22–25-year-olds in AI-exposed financial roles has fallen 16% since late 2022, while experienced analysts held steady. This is the classic pattern: AI absorbs entry-level task volume while senior judgment remains. The question is whether that pattern holds as AI capability extends up the seniority ladder.',
    employmentCount: '312,000',
    whatWouldChange: 'AI reliability concerns in high-stakes financial decisions; regulatory requirements for human sign-off; demonstrated errors in AI-generated financial models.',
  },
  {
    id: 'software-developers',
    title: 'Software Developers',
    socCode: '15-1252',
    dis: 0.71,
    disDelta: 0.00,
    riskLevel: 'high',
    prediction: 'Net developer employment flat or declining by Q2 2027 despite productivity gains — output absorbs headcount reduction.',
    predictionDate: 'June 2026',
    predictionResolution: 'Q2 2027',
    predictionStatus: 'pending',
    history: [
      { quarter: 'Q4 2025', score: 0.66 },
      { quarter: 'Q1 2026', score: 0.69 },
      { quarter: 'Q2 2026', score: 0.71 },
      { quarter: 'Q3 2026', score: 0.71 },
    ],
    drivers: {
      capability: 0.85,
      deployment: 0.89,
      laborSignal: 0.31,
    },
    sources: [
      { name: 'METR Study', metric: 'Productivity gain (experienced devs)', value: 'Minimal' },
      { name: 'Revelio RPLS', metric: 'Junior dev employment age 22–25', value: '−20%' },
      { name: 'Lightcast', metric: 'AI coding skills in postings', value: '89% of new postings' },
      { name: 'BLS OEWS', metric: 'Employment (2025)', value: '1,847,000' },
    ],
    narrative: 'Software development is the most complex story in the dataset. Deployment momentum is the highest of any occupation — AI coding tools are in 89% of new job postings. But the METR study found minimal aggregate productivity gains for experienced developers on real tasks. The score is flat this quarter because capability and deployment are both high, but the labor signal remains ambiguous. The most likely outcome: junior role compression without senior displacement, at least through 2027.',
    employmentCount: '1,847,000',
    whatWouldChange: 'METR or similar study showing large productivity gains at scale; demonstrated agentic software completion on production codebases without human supervision; major employer headcount announcements.',
  },
  {
    id: 'radiologists',
    title: 'Radiologists',
    socCode: '29-1224',
    dis: 0.58,
    disDelta: +0.02,
    riskLevel: 'moderate',
    prediction: 'Deployment friction keeps meaningful displacement beyond 2028 despite high AI capability.',
    predictionDate: 'June 2026',
    predictionResolution: 'Q1 2028',
    predictionStatus: 'pending',
    history: [
      { quarter: 'Q4 2025', score: 0.51 },
      { quarter: 'Q1 2026', score: 0.54 },
      { quarter: 'Q2 2026', score: 0.56 },
      { quarter: 'Q3 2026', score: 0.58 },
    ],
    drivers: {
      capability: 0.87,
      deployment: 0.38,
      laborSignal: 0.11,
    },
    sources: [
      { name: 'FDA Clearances', metric: 'AI diagnostic tools cleared', value: '692 (2025)' },
      { name: 'Revelio RPLS', metric: 'Radiologist employment', value: 'Stable' },
      { name: 'AEI', metric: 'AI autonomy score (medical imaging)', value: '3.9 / 5' },
      { name: 'BLS OEWS', metric: 'Employment (2025)', value: '31,000' },
    ],
    narrative: 'Radiology is the canonical example of the capability-deployment gap. AI diagnostic tools match or exceed radiologist accuracy on specific imaging tasks, and 692 AI diagnostic tools have FDA clearance. Yet employment is stable and deployment in clinical settings remains fragmented. The friction is structural: liability, workflow integration, physician resistance, and reimbursement coding. High DIS with slow velocity — the threshold is real but not imminent.',
    employmentCount: '31,000',
    whatWouldChange: 'FDA pathway reform for AI diagnostics; major malpractice ruling clarifying liability; insurance reimbursement codes for AI-only reads; hospital system standardization.',
  },
  {
    id: 'customer-service',
    title: 'Customer Service Representatives',
    socCode: '43-4051',
    dis: 0.69,
    disDelta: +0.05,
    riskLevel: 'high',
    prediction: 'Total employment falls below 2.5M by end of 2026 (from 2.9M in 2023).',
    predictionDate: 'June 2026',
    predictionResolution: 'Q4 2026',
    predictionStatus: 'pending',
    history: [
      { quarter: 'Q4 2025', score: 0.55 },
      { quarter: 'Q1 2026', score: 0.60 },
      { quarter: 'Q2 2026', score: 0.64 },
      { quarter: 'Q3 2026', score: 0.69 },
    ],
    drivers: {
      capability: 0.89,
      deployment: 0.74,
      laborSignal: 0.58,
    },
    sources: [
      { name: 'BLS OEWS', metric: 'Employment change 2023–2025', value: '−11%' },
      { name: 'Revelio RPLS', metric: 'Attrition rate', value: 'Elevated, not backfilled' },
      { name: 'AEI', metric: 'AI autonomy (customer support tasks)', value: '3.6 / 5' },
      { name: 'SHRM', metric: 'Firms replacing CS roles with AI', value: '38%' },
    ],
    narrative: 'Customer service is where displacement is already measurable rather than predicted. Employment has fallen 11% since 2023, driven primarily by attrition that firms are choosing not to backfill rather than active layoffs. This is the quiet version of displacement — no dramatic announcements, just roles that disappear when people leave. The velocity here is the highest in the dataset.',
    employmentCount: '2,580,000',
    whatWouldChange: 'Customer backlash against AI service quality driving firms back to human agents; regulation mandating human escalation paths; union agreements restricting replacement.',
  },
  {
    id: 'registered-nurses',
    title: 'Registered Nurses',
    socCode: '29-1141',
    dis: 0.19,
    disDelta: +0.01,
    riskLevel: 'low',
    prediction: 'No meaningful employment displacement through 2028. AI augments rather than replaces.',
    predictionDate: 'June 2026',
    predictionResolution: 'Q4 2028',
    predictionStatus: 'pending',
    history: [
      { quarter: 'Q4 2025', score: 0.16 },
      { quarter: 'Q1 2026', score: 0.17 },
      { quarter: 'Q2 2026', score: 0.18 },
      { quarter: 'Q3 2026', score: 0.19 },
    ],
    drivers: {
      capability: 0.31,
      deployment: 0.14,
      laborSignal: 0.09,
    },
    sources: [
      { name: 'AEI', metric: 'Human-only ability', value: '94.2%' },
      { name: 'BLS', metric: 'Employment outlook 2025–2035', value: '+6% projected' },
      { name: 'AEI', metric: 'AI autonomy score', value: '1.9 / 5' },
      { name: 'BLS OEWS', metric: 'Employment (2025)', value: '3,130,000' },
    ],
    narrative: 'Nursing is the clearest example of what low DIS looks like. Physical care, emotional presence, real-time clinical judgment in variable environments — the task structure is fundamentally resistant to current AI capability. The AEI data confirms this: 94% of nursing tasks are classified as requiring human-only ability. AI is entering nursing as a documentation and monitoring assistant, not a replacement. Demand is growing faster than supply.',
    employmentCount: '3,130,000',
    whatWouldChange: 'Physical robotics breakthrough enabling autonomous patient care; major AI diagnostic integration changing the scope of nursing tasks; extreme labor shortage driving experimental automation.',
  },
  {
    id: 'accountants',
    title: 'Accountants & Auditors',
    socCode: '13-2011',
    dis: 0.63,
    disDelta: +0.06,
    riskLevel: 'high',
    prediction: 'Entry-level accounting roles at Big 4 firms down >25% by Q2 2027 vs. 2022 peak.',
    predictionDate: 'June 2026',
    predictionResolution: 'Q2 2027',
    predictionStatus: 'pending',
    history: [
      { quarter: 'Q4 2025', score: 0.48 },
      { quarter: 'Q1 2026', score: 0.54 },
      { quarter: 'Q2 2026', score: 0.57 },
      { quarter: 'Q3 2026', score: 0.63 },
    ],
    drivers: {
      capability: 0.82,
      deployment: 0.61,
      laborSignal: 0.39,
    },
    sources: [
      { name: 'Big 4 Hiring Reports', metric: 'Entry associate intake', value: '−17% since 2023' },
      { name: 'Lightcast', metric: 'AI skills in accounting postings', value: '+280% YoY' },
      { name: 'AEI', metric: 'Human-only ability', value: '83.1%' },
      { name: 'BLS OEWS', metric: 'Employment (2025)', value: '1,392,000' },
    ],
    narrative: 'Accounting is following the junior analyst pattern: AI absorbs the task volume that was previously handled by entry-level associates, while senior judgment and client relationships remain human. The Big 4 are the leading indicator — their entry associate intake has fallen 17% since 2023 while partner headcount is stable. The velocity is accelerating this quarter as AI audit tools reach production maturity.',
    employmentCount: '1,392,000',
    whatWouldChange: 'SEC audit standards requiring human sign-off on all material judgments; demonstrated AI errors in high-profile audits; client preference for human accountant relationships.',
  },
  {
    id: 'graphic-designers',
    title: 'Graphic Designers',
    socCode: '27-1024',
    dis: 0.55,
    disDelta: +0.08,
    riskLevel: 'moderate',
    prediction: 'Freelance and agency graphic design market contracts 30% by end of 2026 while in-house roles hold.',
    predictionDate: 'June 2026',
    predictionResolution: 'Q4 2026',
    predictionStatus: 'pending',
    history: [
      { quarter: 'Q4 2025', score: 0.38 },
      { quarter: 'Q1 2026', score: 0.43 },
      { quarter: 'Q2 2026', score: 0.47 },
      { quarter: 'Q3 2026', score: 0.55 },
    ],
    drivers: {
      capability: 0.79,
      deployment: 0.62,
      laborSignal: 0.22,
    },
    sources: [
      { name: 'AEI', metric: 'AI autonomy (creative tasks)', value: '3.2 / 5' },
      { name: 'Upwork', metric: 'Graphic design job postings', value: '−35% since 2022' },
      { name: 'Lightcast', metric: 'AI design tools in postings', value: '+190% YoY' },
      { name: 'BLS OEWS', metric: 'Employment (2025)', value: '266,000' },
    ],
    narrative: 'Graphic design shows the fastest DIS velocity increase this quarter (+0.08) driven by rapid generative image capability improvements. The displacement pattern is split by market segment: freelance and commodity design work is collapsing (Upwork postings down 35% since 2022), while in-house roles requiring brand oversight and strategic direction are holding. The score is moderate but the acceleration is the signal.',
    employmentCount: '266,000',
    whatWouldChange: 'Client preference for human creative relationships; IP/copyright clarity issues with AI-generated content; saturation of AI image quality plateau.',
  },
  {
    id: 'electricians',
    title: 'Electricians',
    socCode: '47-2111',
    dis: 0.09,
    disDelta: 0.00,
    riskLevel: 'low',
    prediction: 'No meaningful AI-driven displacement through 2030. Demand driven by infrastructure buildout.',
    predictionDate: 'June 2026',
    predictionResolution: 'Q4 2030',
    predictionStatus: 'pending',
    history: [
      { quarter: 'Q4 2025', score: 0.08 },
      { quarter: 'Q1 2026', score: 0.08 },
      { quarter: 'Q2 2026', score: 0.09 },
      { quarter: 'Q3 2026', score: 0.09 },
    ],
    drivers: {
      capability: 0.12,
      deployment: 0.07,
      laborSignal: 0.06,
    },
    sources: [
      { name: 'AEI', metric: 'Human-only ability', value: '97.8%' },
      { name: 'BLS', metric: 'Employment outlook 2025–2035', value: '+11% projected' },
      { name: 'AEI', metric: 'AI autonomy score', value: '1.2 / 5' },
      { name: 'BLS OEWS', metric: 'Employment (2025)', value: '786,000' },
    ],
    narrative: 'Electricians are the clearest counterexample to displacement anxiety. Physical dexterity in variable environments, safety-critical judgment, and real-world problem-solving — the task structure is almost entirely outside current AI capability. Robotics would need to advance significantly before this occupation faces meaningful automation pressure. Meanwhile, AI data center construction and grid modernization are driving demand growth.',
    employmentCount: '786,000',
    whatWouldChange: 'General-purpose physical robotics breakthrough; autonomous construction robots reaching production maturity.',
  },
];

export const getOccupationById = (id: string) =>
  occupations.find((o) => o.id === id);

export const getRiskColor = (level: RiskLevel) => {
  switch (level) {
    case 'critical': return '#E82B2B';
    case 'high': return '#F5A623';
    case 'moderate': return '#E8C42B';
    case 'low': return '#2DB87A';
  }
};

export const getRiskLabel = (level: RiskLevel) => {
  switch (level) {
    case 'critical': return 'CRITICAL';
    case 'high': return 'HIGH';
    case 'moderate': return 'MODERATE';
    case 'low': return 'LOW';
  }
};
