# Celestial's Badminton Academy — Design strategy

*16 Oct 2026. Inputs: client Notion brief (sitemap, moodboard, stack), public listings for business facts (`src/lib/academy.ts`), and the research report `docs/RESEARCH.md`.*

## 1. What the business needs

| Fact | Source |
|---|---|
| 7 indoor, fully air-conditioned PVC courts, Sector 104 Noida | Hudle, PlaySport, Instagram bio |
| Two revenue streams: **pay-and-play** (₹450/slot onwards, booked on Hudle/Playo) and **coaching** (group + 1:1, kids/teens/adults, morning/evening/weekend, free trial) | Hudle, District, LyfSkills, Instagram |
| Support stack: gym, physio + medical room, steam, lockers, cafeteria, pro shop, hostel; S&C, assessments, video analysis | Hudle, PlaySport |
| 4.4★ on Google (~275 reviews) vs 3.9–4.0 on the booking apps | LyfSkills (GBP mirror), Hudle, Playo |
| Notion asks for: Hero, Stats, Programs, Gallery, Testimonials, Booking (redirect); pages /about /programs /facilities /gallery /contact; Next.js + Tailwind + Framer | Notion "Design" page |

**The core problem:** visitors arrive with one of two different intents — *"I want to play tonight"* or *"I want my child / myself to train"* — and today the venue's best-rated proof (Google 4.4) is not where people book (Playo 3.96, next to 179 competitors). The site must sort intent fast and do the persuading *before* the hand-off.

## 2. Three concepts

**A. Night Session (cinematic).** Full-bleed rally photography, dark, video-led like On/Babolat. *Risk:* the available photos are phone-grade; at full bleed they read as amateur. Video needs a shoot and a 1.5 MB budget. Mood-only heroes suit brands, not a booking business (research: premium brands synthesis).

**B. Court Lines (graphic-led, venue-derived).** The venue's own surface becomes the identity: deep court green, mat teal, chalk lines, net-post lime. Court geometry (2 px chalk rules, service-line ticks, the arc of a clear) is the recurring device — research found *no* racket-sport site using it. Real photos are framed, not stretched. The hero answers both intents in one line.

**C. Celestial Orbit (name-led).** Night-sky navy, the shuttle as a comet. *Risk:* themed and cheesy, drifts from the sport, purple-blue palette clashes with the venue's green and with the anti-"AI purple" rule.

| Criterion (1–5) | A Night Session | **B Court Lines** | C Orbit |
|---|---|---|---|
| Fit with business & audience (parents, adults, aspirants) | 3 | **5** | 2 |
| Distinctiveness | 3 | **5** | 4 |
| Clarity of communication | 3 | **5** | 2 |
| Booking-journey usability | 3 | **5** | 3 |
| Motion quality potential | 5 | **4** | 4 |
| Mobile | 2 | **4** | 3 |
| Accessibility | 3 | **5** | 3 |
| Feasibility with current assets | 2 | **5** | 4 |
| Performance | 2 | **5** | 4 |
| **Total / 45** | 26 | **43** | 29 |

**Selected: B, Court Lines** — borrowing one idea from A: a real rally photo as the hero's anchor, so the signature animation starts inside the academy's own hall.

## 3. Decision framework (research → decision → expected outcome)

Evidence labels: **EV** evidence-backed · **CO** competitive observation · **HY** design hypothesis · **BR** brand decision.

| # | Decision | Traces to | Type | Expected outcome | Validate by |
|---|---|---|---|---|---|
| 1 | Palette from the venue surface: court green `#071c17`, mat `#1f9482`, chalk `#f3f0e8`, lime `#d6f04e` (net posts) | Roland-Garros clay palette ("surface is the palette"); Wimbledon restricted palette | CO + BR | Recognisable, honest to the hall in the photos | Contrast checks (done), client review |
| 2 | Lime used **only** for the primary action and the shuttle path | Nike/On: one CTA per view, colour from content; isolation of a single accent | CO + EV (visual hierarchy) | Booking action is the most salient element | First-viewport 5-second test |
| 3 | Hero headline answers both intents: **"Play tonight. Train for years."** | Indian academy sites lead with trophies (convention challenged); Barry's new-vs-returning split; 3–5 word heroes on all premium brands | CO + HY | Visitors self-sort in the first viewport | Click split Book vs Trial |
| 4 | Practical facts in the first viewport: open-now status, ₹450 from, 4.4★ Google, metro distance | Premium-brand convention challenged ("commerce hides practical info"); NN/g 57% of attention above fold; NN/g trust: upfront pricing | EV + CO | Fewer "where/when/how much" bounces | Scroll-depth + contact clicks |
| 5 | One static hero, no carousel | NN/g auto-forwarding; Yonex 11-slide hero rendered blank | EV | Message is seen | — |
| 6 | Signature: a shuttle launched from a real player's racket in a real CBA photo, flying a drag-dominated "triangular" path (fast leg, apex, near-vertical drop), landing on a chalk line that draws the info strip | Shuttle physics (Cohen et al. 2015; terminal speed ≈6.5 m/s; cork-first flip); no racket-sport site animates flight (racket-sport research) | BR + HY | Memorable, sport-specific first impression; attention guided to the facts strip | Motion review, recall test, INP/CLS |
| 7 | Animation is one-shot (~2.4 s), transform-only, replayable by button, fully static under reduced motion | WCAG 2.3.3 / C39; NN/g 100–500 ms UI motion; Nike reduced-motion rule; On had none | EV | No vestibular harm, no layout shift | Reduced-motion screenshot run |
| 8 | Header: visible links on desktop; on mobile "Book" stays visible next to a labelled Menu | NN/g hamburger study (hidden nav used 27% vs 48%) | EV | Booking reachable in one tap everywhere | Navigation task test |
| 9 | "Two ways in" split (Play / Train) + 2-question picker that recommends a path | Wimbledon parallel route cards; Yonex Racquet Selector; no club groups by audience (clubs research); Chernev 2015: overload only when unsure → give a default | CO + EV + HY | Parents find coaching fast; players find booking fast | Picker completion → CTA rate |
| 10 | Outbound booking labelled ("Opens Hudle"), price and rules repeated before hand-off | Rocket Padel hand-off; Hudle/Playo pages show weaker rating | CO + HY | Redirect feels intentional; fewer surprises | Outbound click tracking |
| 11 | Trial via WhatsApp (existing channel from Instagram bio) instead of a long form | Baymard form length; IMG commitment ladder | EV + CO | Lower-commitment first step for coaching | WhatsApp click-through |
| 12 | Social proof = Google aggregate + link out; testimonial slots stay hidden until the client supplies real, consented quotes | NN/g trust (third-party reviews); brief forbids fabrication | EV | Credible proof without invented quotes | — |
| 13 | Condensed display (Archivo, width axis 62) + Archivo text + mono labels; pill buttons | Nike Futura / Yonex Oswald condensed caps; moodboard pills | CO + BR | Athletic voice, one font file family | Design review |
| 14 | Map is a link, not an embed; images are pre-sized WebP, lazy below the fold, hero photo prioritised | Clubs research: embeds/video heaviest; On's 39 eager images (anti-pattern); Core Web Vitals | EV | LCP ≤ 2.5 s on 4G | Lighthouse on staging |
| 15 | No pinch-zoom lock, 48 px targets, visible lime/ink focus ring | 4 of 5 racket sites disable zoom (anti-pattern); WCAG 2.5.8, 2.4.7 | EV | Usable for all | Keyboard + zoom test |

*Full reference-by-reference trace, including rejected patterns and the client moodboard: `docs/TRACEABILITY.md`.*

## 4. Signature hero sequence (as built)

1. **Anticipation** — headline lines rise in; a lime ring pings once at the player's racket.
2. **Launch → flight** — shuttle leaves the racket at ~7× terminal speed, decelerating under quadratic drag; it points along its velocity (cork leading) and its skirt "breathes" to suggest spin.
3. **Apex → descent** — the path flattens, then the shuttle falls almost vertically at terminal speed (no parabola).
4. **Impact** — cork-first touch-down, two decaying hops, an impact ring.
5. **Resolution** — a chalk court line draws outward from the landing point and the facts strip (open now · from ₹450 · 4.4★ · metro) fades in. The trail stays as a faint arc: the brand mark.

The physics is integrated once (Euler, 1 ms steps) with V₀ = 5.5 Vt at 50° (≈2.2 s hang, real time), then fitted between the racket and the landing mark, so the timing is physically shaped, not eased.

## 5. Mobile

Photo first (4:3), headline second; the flight is contained in the photo frame and lands on its bottom edge, which becomes the court line. Two CTAs full width. Asymmetric grids collapse to one column below 768 px.


## 6. Revision 2: academy-first (16 Oct 2026)

**Client direction:** the site's job is the academy, for players starting out and players looking to improve. Court booking stays on the homepage, as a secondary route.

**What changed and why**

| # | Decision | Traces to | Type | Expected outcome | Validate by |
|---|---|---|---|---|---|
| 16 | Hero becomes **"Start right. Keep getting better."** Primary CTA "Book a free trial" (WhatsApp), secondary "Find your level"; court booking drops to a text link under the CTAs | Client direction; one-job hero (Nike/Wimbledon); the two lines name the two audiences | BR + HY | Both beginners and improvers see themselves in the first viewport | Trial clicks from the hero; 5-second test with parents and club players |
| 17 | **Header CTA = "Free trial"**; nav is Pathway · Programs · First session · Facilities · About · Contact. Gallery moves to the footer | NN/g visible-nav evidence (#8 kept); academy-first IA | EV + BR | The trial is reachable in one tap on every page | Navigation task test |
| 18 | **Starting points**: "I'm new to this" vs "I want to improve" panels, each answering its own worry | Barry's first-timer vs returning split; IMG commitment ladder | CO + HY | Visitors self-select; beginners see "no experience needed" first | Click split by panel |
| 19 | **Four-level training pathway** as the site's spine, drawn as a staircase the shuttle arc hops up | Goal-gradient (Kivetz et al. 2006: visible progress toward a visible goal speeds effort); no academy site examined shows a pathway | EV (transferred) + BR | Players see where they start and what's next; parents see progress is planned | /pathway visits → trial clicks; recall test |
| 20 | **Level finder** replaces the 2-question picker: 3–4 questions → a starting level shown on the pathway strip → a WhatsApp trial request **pre-filled with the answers** | Yonex selector; Chernev 2015 (give a default under uncertainty); Baymard (fewer steps) | EV + HY (H7) | Fewer back-and-forth messages before a trial is booked | Completion rate; % of WhatsApp trials arriving with answers |
| 21 | **"Bring us the problem"** for improvers: six common plateaus → coaching response → confirmed methods | Improvers shop for a fix, not "coaching" (hypothesis); concreteness (Third Space/IMG) | HY | Club players recognise their problem and book | Section click-through to trial |
| 22 | **Parents section** answering five questions with confirmed facts only (assessments, timings, physio + CCTV, free trial, route to tournaments) | NN/g trust; first-visit anxiety (Barry's) | EV + CO | Parents reassured before persuasion | Parent interviews; trial clicks with "parent" prefill |
| 23 | **/first-session**: six-step day-one sequence, what to bring, beginner FAQs | Barry's "What to expect"; uncertainty reduction | CO + HY | Lower first-visit anxiety → more beginner trials | Trial bookings from /first-session |
| 24 | Court booking kept as a **mat-teal band near the end of the homepage**, a text link in the hero, the Visit card, mobile menu, Facilities (#book-a-court) and footer | Client decision; Rocket Padel labelled hand-off (#10 kept) | BR | Players who only want a court still find it in one scroll | Outbound Hudle/Playo clicks stay stable vs v1 |
| 25 | Score sheet leads with academy numbers (400+ trained · 4 levels · 3 batch windows), then courts and rating | Concreteness over adjectives | CO | Academy credibility at a glance | — |
| 26 | Lime still reserved for one primary action per view: Visit's "Get directions" demoted to outline so "Book a free trial" is the only lime there | Decision #2 | EV | Clear primary action | — |
| 27 | New `mat-deep` text token (#12665a, 6.0:1 on chalk) for teal text on light backgrounds | WCAG 2.2 1.4.3 (mat on chalk was 3.3:1) | EV | Readable small labels | Contrast check (done) |

**New homepage order:** hero → where are you starting from (+ level finder) → pathway → how we coach → bring us the problem → for parents → score sheet → the arena → reviews → book a court → visit. The community photo strip moved to /about.
