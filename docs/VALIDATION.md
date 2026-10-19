# Validation report — 16 Oct 2026

**What this is:** automated checks and rendered-page inspection of the static build in headless Chromium. **What this is not:** testing with real visitors, field performance data, or conversion results — none of those exist yet. Measured results and inspection-based conclusions are labelled separately.

## 1. Measured (tools)

### Lighthouse 12 (static export served with compression, headless Chromium)

| Page | Mobile perf | Desktop perf | Accessibility | Best practices | SEO | Mobile LCP* | CLS |
|---|---|---|---|---|---|---|---|
| Home | 92 | 99 | 100 | 100 | 100 | 3.0 s | 0.006 |
| Programs | 91 | 100 | 100 | 100 | 100 | 3.5 s | 0 |
| Facilities | 89 | 100 | 100 | 100 | 100 | 3.6 s | 0 |
| Gallery | 90 | 100 | 100 | 100 | 100 | 3.7 s | 0 |
| About | 91 | 100 | 100 | 100 | 100 | 2.6 s | 0 |
| Contact | 92 | 100 | 100 | 100 | 100 | 2.9 s | 0.005 |

\*Simulated "slow 4G + 4× CPU" model. Desktop LCP is 0.7–0.8 s on every page; in the unthrottled trace the home LCP was 1.3 s. **Mobile LCP is above the 2.5 s "good" threshold in the simulation** and runs vary by ±0.5 s; confirm with field data (Search Console / CrUX) after launch. Raw JSON: `docs/lighthouse/`.

What moved the numbers during the build (each re-measured):
- Scroll reveals rewritten from Framer Motion to CSS scroll-driven animation, so content is never hidden waiting for JavaScript — programs mobile LCP 3.6 → 2.4–3.5 s.
- Hero photo no longer fades in (Chrome ignores invisible first paints for LCP); hero image preloaded.
- Framer Motion lazy-loaded (`LazyMotion` + `domAnimation`).
- Without compression the same build scored 66 on mobile — hosting must serve Brotli/gzip.

### Automated render checks (`tools/shoot.py`) — 6 pages × desktop/tablet/mobile + desktop reduced-motion

| Check | Result |
|---|---|
| Horizontal overflow at 1440 / 834 / 390 px | **0 px on all 24 renders** |
| Console errors | **None** |
| Broken internal links / 4xx | **None** |
| Images without `alt` | **None** |
| One `<h1>` per page | **Yes** |
| Links/buttons without an accessible name | None (the checker flags 2 links inside collapsed FAQ answers — false positive, verified by hand) |

### Interaction tests (`playwright`, scripted)

| Test | Result |
|---|---|
| Keyboard Tab order: skip link → logo → nav → Book → hero CTAs → replay → strip | Pass, logical order, visible lime/ink focus ring |
| Mobile menu: opens as dialog, focus moves to Close, Esc closes and returns focus to Menu | Pass |
| Path picker: "My child" → "Compete seriously" → "Competitive pathway" announced in `aria-live` region | Pass |
| Gallery lightbox: opens on correct photo, → arrow advances, Esc closes, focus returns to the thumbnail | Pass |
| `prefers-reduced-motion: reduce` | Pass — hero renders its final state instantly (resting shuttle, faint arc, line, facts strip); no scroll motion |
| Open/closed status uses India time, not the visitor's | Pass (computed with `Asia/Kolkata`) |
| Colour contrast of palette pairs (WCAG 2.2) | ink on chalk 15.6:1 · chalk on court 15.5:1 · ink on lime 13.9:1 · ink on mat 4.8:1 · ink-soft on chalk 7.0:1; small text never below chalk 50% (4.7:1) |

### Hero animation (frame captures at 1440×900 and 390×844)
Shuttle launches from the player's racket in the real photo, climbs steeply, flattens at the apex and falls almost vertically (drag-dominated path, ~2.2 s real time), lands cork-first with two decaying hops, then the court line draws out and the facts strip appears. Desktop: lands in the gutter below the photo without crossing the headline or CTAs. Mobile: flight stays inside the photo frame. Frame strips and full-page captures: `docs/screens/`.

## 2. Inspection-based conclusions (not measured)

- **Distinct from templates:** venue-derived palette, condensed type and court-line/shuttle-arc motif are used consistently; no stock photos, no 3-equal-card rows, no count-up counters.
- **First-time visitor can tell what's offered:** headline + sub-copy name both offers, price and location in the first viewport.
- **Booking found quickly:** "Book a court" is in the header on every page and the first hero button; on mobile the header keeps "Book" visible.
- **Location easy to discover:** metro distance in the hero strip; full address, directions, hours on home and /contact.
- **Understandable without animation:** confirmed via the reduced-motion render.

## 3. Hypotheses to validate after launch

| Hypothesis | Why it might work | Assumptions | How to validate | If it fails |
|---|---|---|---|---|
| H1 "Play tonight. Train for years." helps visitors self-sort | Names both intents in 5 words (Barry's new/returning split) | Visitors know which intent they have | Ratio of Hudle vs WhatsApp clicks from the hero; 5-second test with 5–8 local parents/players | Test intent-specific headlines per ad campaign |
| H2 The shuttle flight makes the site memorable without slowing booking | Motion contrasts with stillness; one-shot, ends on the facts | Motion isn't read as decoration | Unaided recall in a short user test; hero CTA click-through with animation on vs. off (A/B) | Keep the static final frame only |
| H3 Facts strip revealed by the landing doesn't hide information people need | Appears ~3 s after load on desktop | Few people leave in the first 3 s | Scroll/heat maps; compare with strip shown immediately | Show strip at load; keep line-draw only |
| H4 The 2-question picker helps unsure parents | Choice overload appears under uncertainty (Chernev 2015); gives a default | Parents use it | Picker completion rate and CTA clicks from the result | Replace with 3 audience cards |
| H5 Showing price, rules and Google rating before the hand-off reduces drop-off on Hudle | Booking apps show a weaker rating next to competitors | Hudle is the main booking route | Ask Hudle/Playo for referral data; UTM-tag outbound links | Embed a booking widget if a platform offers one |
| H6 WhatsApp is the right first step for trials | Channel already advertised in the Instagram bio | Someone answers promptly | Trial bookings per week before/after launch | Enable the enquiry form (`NEXT_PUBLIC_ENQUIRY_ENDPOINT`) |

## 4. Not tested / unverified

- Real devices (iOS Safari, low-end Android) — only headless Chromium was used. Scroll-driven reveals are skipped in browsers without `animation-timeline` (content simply appears).
- Screen readers (NVDA/VoiceOver) — semantics checked by axe and markup review only.
- Field Core Web Vitals, conversion or engagement data.
- Whether Hudle/Playo deep links keep working (third-party URLs).

## 5. Re-check, 16 Oct 2026 (second pass)

| Check | Result |
|---|---|
| Fresh `next build` + `tools/shoot.py` on all 7 pages × 1440/834/390 px + reduced motion | 0 px overflow, no console errors, no 4xx, one `<h1>` each (the same 2 FAQ links flagged as a known false positive) |
| Court-sheet row inspected in a real viewport | Correct. A line crossing the captions in the stitched full-page capture was the scroll reveal mid-animation, not a layout bug. Shortened the "Trained" caption so all five numerals share a baseline |
| Header active-link logic | Rewritten to compare last path segments; `aria-current` verified on `/programs/`, `/gallery/` and in the preview build |
| Path-independent preview (`tools/make_preview.py`) served from a nested sub-path | All pages hydrate, hero flight plays, mobile menu and gallery lightbox work, no 4xx, no React errors. Only browser warnings: two preloaded font files not used within a few seconds |
| Research → build trace | Every matrix reference and moodboard image mapped to a verdict and a file: `docs/TRACEABILITY.md` |

**Not verified:** the claude.ai artifact preview itself was published but not opened in a browser from here; the local test reproduces its file layout exactly.


## 6. Revision 2 checks (academy-first), 16 Oct 2026

| Check | Result |
|---|---|
| `next build`, `tsc`, `eslint` | Pass, no warnings |
| `tools/shoot.py`: 9 pages (incl. new /pathway, /first-session) × 1440/834/390 px + reduced motion | 0 px overflow, no console errors, no 4xx, one `<h1>` each (the known FAQ false positive on /programs) |
| Level finder, scripted: 5 answer paths | Child under 10 + tournaments → Development (age cap). Child 15–18 + coached + compete → Performance. Adult beginner → Foundation. Adult "just a game" → court booking card. WhatsApp link carries player, experience, goal and suggested level |
| Hero landing after the 3-line headline | Court line now lands 34 px below the copy column (was cutting through the "Just want to play?" line) |
| Contrast of new teal text | `mat-deep` 6.0:1 on chalk, 5.4:1 on chalk-2 (old mat was 3.3:1, replaced on all light backgrounds) |
| Preview build from a nested sub-path | All 10 pages hydrate; finder → `pathway.html#development`; nav to the new pages works; no 4xx |

**New hypotheses:** H7, pre-filled trial messages reduce back-and-forth before a trial (measure: % of WhatsApp trials arriving with answers; time to booked trial). H8, the pathway raises trial requests from improvers (measure: /pathway → trial clicks). H9, the parents section raises trial requests for children (measure: "parent" prefill share).

**Not verified:** the pathway content and trial format are proposals awaiting the academy's sign-off (DEPENDENCIES §1). No testing with real parents or players has been done.
