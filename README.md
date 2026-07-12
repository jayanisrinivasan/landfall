# Landfall

**A living forecast of where AI is about to hit the economy.**

Landfall publishes the Displacement Imminence Score (DIS) for major occupations — a single number combining AI capability exposure, real-world deployment momentum, and early labor market signals. Updated quarterly. Predictions are logged with dates and scored publicly when they resolve.

## Stack

- **Next.js 14** (Pages Router)
- **TypeScript**
- **Recharts** (score history charts)
- **Space Grotesk + Playfair Display + Space Mono** (Google Fonts)
- **No backend** — static site, all data in `data/occupations.ts`

## Deploy to Vercel

1. Push this repo to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Deploy — zero config needed (`vercel.json` handles it)

Or via CLI:
```bash
npm i -g vercel
vercel
```

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Project Structure

```
landfall/
├── data/
│   └── occupations.ts      # All occupation data, DIS scores, predictions
├── pages/
│   ├── index.tsx            # Homepage — forecast table
│   ├── methodology.tsx      # DIS formula explained
│   ├── signals.tsx          # Quarterly narrative update
│   ├── about.tsx            # Data sources, contact
│   └── occupation/
│       └── [id].tsx         # Individual occupation pages
├── components/
│   ├── Nav.tsx
│   └── DISBar.tsx
└── styles/
    └── globals.css
```

## Adding / Updating Occupations

All data lives in `data/occupations.ts`. To update scores each quarter:

1. Update `dis` and `disDelta` for each occupation
2. Add a new entry to each occupation's `history` array
3. Update `predictionStatus` when predictions resolve (`'pending'` → `'correct'` / `'incorrect'` / `'partial'`)
4. Update `LAST_UPDATED` and `NEXT_UPDATE` in `pages/index.tsx`
5. Write a new quarterly piece in `pages/signals.tsx`

## The Python Package

The `landfall` Python package (separate repo) implements the same DIS methodology so researchers can run it with their own data:

```python
from landfall import DIS

score = DIS(
    capability_data="my_onet_scores.csv",
    deployment_data="job_postings.csv",
    labor_data="employment.csv"
)
score.compute(occupation="23-2011")  # Paralegals
# → {"dis": 0.74, "components": {...}, "prediction": "..."}
```

## Data Sources

| Source | Use | License |
|---|---|---|
| Anthropic Economic Index | AI autonomy, human-only ability by SOC | CC-BY |
| BLS OEWS | Employment by SOC | Public domain |
| O*NET | Task decomposition | Public domain |
| Revelio RPLS | Hiring/attrition rates | Free tier |
| Lightcast | Job posting AI skill trends | Commercial |
| Epoch AI | AI capability data | CC-BY |

## License

Data: CC-BY. Code: MIT.

## Citation

```
Landfall (2026). Displacement Imminence Score: Methodology v0.1.
landfall.io/methodology
```
