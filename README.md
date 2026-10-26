# Celestial's Badminton Academy — website

Next.js 16 · Tailwind CSS 4 · Framer Motion (lazy-loaded) · static export. Stack as specified in the client's Notion brief.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out — deploy to any static host
```

Environment (optional):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Final domain, used for canonical URLs, sitemap and JSON-LD (default ``) |
| `NEXT_PUBLIC_ENQUIRY_ENDPOINT` | JSON POST endpoint (e.g. Formspree). When set, an enquiry form appears on /contact. Hidden otherwise. |

## Where things live

| Path | What |
|---|---|
| `src/lib/academy.ts` | **Every business fact on the site**, each with its source. Edit here, not in components. |
| `src/lib/images.ts` | Photo manifest (sizes, alt text, captions). Files in `public/images/` (800 w + large WebP). |
| `src/lib/pathway.ts` | The Three training levels (**proposed — needs head-coach sign-off**). Every page reads from here. |
| `src/lib/batches.ts` | Batch timetable + fees. Empty → "ask on WhatsApp"; fill it and a table appears on /programs. |
| `src/lib/coaches.ts`, `src/lib/testimonials.ts` | Empty until the client supplies real content — sections switch on automatically. |
| `src/lib/flight.ts` | Shuttle physics (gravity + quadratic drag, Vt 6.5 m/s) used by the hero. |
| `src/components/hero.tsx` | Signature hero: shuttle launched from the player's racket in the photo. |
| `src/app/globals.css` | Design tokens (`@theme`), buttons, CSS animations, scroll-driven reveals. |
| `docs/RESEARCH.md` | Research report: 14-row matrix of athletic/racket/club sites + UX evidence + shuttle physics. |
| `docs/STRATEGY.md` | Three concepts scored, chosen direction, decision table tracing each decision to research. |
| `docs/TRACEABILITY.md` | Every research reference and moodboard image → verdict (adopt/adapt/reject) → decision → file. |
| `docs/VALIDATION.md` | What was tested, results, hypotheses to validate, what remains unverified. |
| `docs/DEPENDENCIES.md` | What the client must supply or confirm before launch. |
| `docs/screens/`, `docs/lighthouse/` | Full-page captures, hero frame strips, raw Lighthouse JSON. |
| `tools/` | Validation scripts (Playwright render checks, flight frames, Lighthouse runner). |

## Pages

`/` · `/pathway/` · `/programs/` · `/first-session/` · `/facilities/` (incl. `#book-a-court`) · `/gallery/` · `/about/` · `/contact/` · 404 — plus `sitemap.xml`, `robots.txt`, SVG favicon and `SportsActivityLocation` structured data.

## Rules for editing

- No invented facts, prices, reviews or testimonials. Add a source comment in `academy.ts` for anything new.
- Lime (`--color-lime`) is reserved for the primary action (Book a free trial) and the shuttle path.
- Teal text on light backgrounds uses `mat-deep`, not `mat` (contrast).
- Keep motion transform/opacity-only and check it under `prefers-reduced-motion`.
- Shareable preview under any sub-path: `python3 tools/make_preview.py out preview` (add `--artifact` for the claude.ai preview layout). Deploy `out/`, not the preview.
- Re-run `python3 tools/shoot.py out <dir> / /programs/ …` after layout changes (0 px overflow, no console errors).
