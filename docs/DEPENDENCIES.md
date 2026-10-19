# What we need from the academy

*Updated 16 Oct 2026, after the academy-first rebuild. Every business fact on the site lives in `src/lib/` with its source. The items below are missing, proposed by us, or taken from third-party listings, and need the academy's input or sign-off before launch.*

## 1. Blocking launch

| # | What we need | Why | Where it goes |
|---|---|---|---|
| 1 | **Recover celestialsacademy.com.** It currently serves a gambling spam page, and the domain has no mail records, so `cbainfo@celestialsacademy.com` can't receive email (checked 16 Oct 2026). | The site can't launch on a hijacked domain, and the published email is dead. | Registrar / Cloudflare account |
| 2 | **Which phone/WhatsApp number to use.** The site uses +91 95604 78732 (Instagram bio and Playo agree). Also seen online: 88262 68236 and 88829 43676. | Every free-trial request goes to this WhatsApp number. | `academy.ts` → `contact`, `trialLink()` |
| 3 | **Approve or rename the four-level pathway** (Foundation → Development → Performance → Competitive), including the skills listed per level and the "ready to move up" markers. | The pathway is now the spine of the site, but we drafted it from standard coaching progressions. The academy's material doesn't name levels. | `src/lib/pathway.ts` (one file feeds every page) |
| 4 | **Confirm the free-trial format.** The six-step "Day one" sequence (book → arrive → warm-up → coach watches you play → train at your level → talk about what's next) is our proposal. | It's a promise to nervous beginners and parents, so it has to match what really happens. | `src/app/first-session/page.tsx` → `steps` |
| 5 | **Confirm batches are grouped by level.** The site says group batches put "players at a similar level" together. | This is implied by the pathway, but not confirmed. | `programs/page.tsx`, `first-session/page.tsx` |

## 2. Content that makes the academy pitch credible

These sections are built and switch on automatically when the data is added.

| # | What we need | Current behaviour | Where it goes |
|---|---|---|---|
| 6 | **Coach profiles**: name, role, qualifications (e.g. NIS, BWF), years coaching, a 4:5 photo, one line on coaching approach | About shows "meet the team at a free trial" | `src/lib/coaches.ts`; photos in `public/images/coaches/` |
| 7 | **Batch timetable and fees**: level, ages, days, time, monthly fee | Programs shows "ask on WhatsApp" | `src/lib/batches.ts`: a table appears once rows exist |
| 8 | **Founder / head coach note**: who runs the academy and why | Hidden | `founder` in `src/lib/coaches.ts` |
| 9 | **Parent and player testimonials**: real quotes with written permission (name, and e.g. "parent of U-13 player") | The Google rating summary is shown instead | `src/lib/testimonials.ts` |
| 10 | **Student progress stories and results**: 2–3 players who moved up a level or won tournaments, with consent (parents' consent for minors) | Not shown | New section on /pathway (we'll build it once content exists) |
| 11 | **A sample progress report**: what an assessment or review looks like, anonymised | Not shown | /pathway "How progress is tracked" |
| 12 | **Short technique or video-analysis clip** (10–20 s, phone video is fine) | Not shown | Hero or /pathway |

## 3. Answers parents and beginners will ask

| # | Question | Current site answer |
|---|---|---|
| 13 | **Youngest age you coach?** | Not stated; the level finder just asks "Under 10 / 10–14 / 15–18" |
| 14 | **Players per coach** in a group batch | Not stated |
| 15 | **Safeguarding / child-protection policy** | Not stated. We won't write one for you; send yours and we'll link it from /programs and the parents section |
| 16 | **Can parents watch sessions?** | Not stated |
| 17 | **Rackets for trial players**: can beginners borrow one? | "No racket yet? Mention it when you book the trial" |
| 18 | **How parents get progress updates** (WhatsApp group, report, meeting?) | "…and you hear about it" (generic) |
| 19 | **One-to-one pricing and booking** | "Ask us" |
| 20 | **Camps, holiday programmes, tournaments you enter or host** | Not shown; we'll add them if they exist |

## 4. Facts to confirm (from third-party listings)

| Item | On the site | Source / conflict |
|---|---|---|
| Hours | Mon, Wed–Sun 5 AM–11 PM; **Tue 5 AM–8 PM** | Google shows Tuesday 8 PM; Playo says 5–11 every day |
| "400+ students trained" | Home score sheet, About | Academy-written text on PlaySport only |
| Exchange with BATTS Athletics Academy (Canada) | Home, Pathway, Programs, About, parents section | Hudle venue description only |
| Hostel, steam bath, pro shop, cafeteria | Shown | Hudle venue description |
| CCTV in the hall | Parents section | Playo amenities list |
| Court surface | "PVC court mats" | Hudle lists PVC, but its booking options also show "Wooden Court"; one photo shows a wooden floor |
| Court price "₹450 onwards" | Pay-and-play band, Facilities | Hudle + District |
| Nutritionist / orthopaedic oversight | Not shown | Mentioned on PlaySport only; left out until confirmed |

## 5. Brand and media

| Item | Current | To add |
|---|---|---|
| Logo and brand colours | Typographic wordmark + shuttle-arc mark; palette sampled from the venue | Vector logo; tokens live in `src/app/globals.css` |
| Photos | 9 photos from public listings | Originals plus written permission for identifiable people, especially minors. Most wanted: coaches coaching, juniors in a batch, a parent watching, an assessment in progress |

## 6. Deployment

- Set `NEXT_PUBLIC_SITE_URL` to the final domain (canonical URLs, sitemap, structured data).
- The static export (`out/`) runs on any static host. Serve it with Brotli/gzip: mobile performance dropped ~20 Lighthouse points without compression.
- Add analytics events for the hypotheses in `VALIDATION.md`: trial clicks by source (hero, starting points, level finder, parents, pathway), level-finder completion, outbound Hudle/Playo clicks.
