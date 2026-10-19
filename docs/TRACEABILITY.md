# Research → build traceability

*16 Oct 2026. Rule: every major reference must inform at least one explicit design decision. Each row below links an observed pattern → a verdict (**Adopt**, **Adapt**, **Reject**, **Deferred**) → the reason → the decision number in `STRATEGY.md` §3 → where it lives in the build. Rejections count as decisions: we looked, and chose not to.*

Evidence labels as in STRATEGY: **EV** evidence-backed · **CO** competitive observation · **HY** hypothesis · **BR** brand decision.

## A. Athletic, racket-sport and venue sites (RESEARCH.md matrix)

| Reference | Observed pattern | Verdict | Why | Decision | Where in the build |
|---|---|---|---|---|---|
| [Nike](https://www.nike.com/) | 2-line condensed uppercase headline at extreme scale; one pill CTA; header hides on scroll down | **Adopt** type scale + single CTA + hide/reveal header. **Reject** merch-style nav and carousels | Scale contrast creates an instant hierarchy (CO). A local venue has 5 pages, not 7 product menus | #2, #13 | `hero.tsx` headline "Play tonight. / Train for years."; `site-header.tsx` L20 hide-on-scroll; `globals.css` `.display` |
| [On](https://www.on.com/en-us) + [Babolat](https://www.babolat.com/us) | Autoplay mood film with a pause control; 3-item nav; 39 eager images; no reduced-motion rule found | **Reject** video hero (Concept A scored 26/45). **Adopt** the small nav idea and treat On's gaps as anti-patterns | No footage exists, and phone-grade photos fail at full bleed. Eager images and missing reduced-motion are measurable costs | #5, #7, #14 | Hero uses one framed photo; `reveal.tsx` + `globals.css` reduced-motion guards; lazy images in `photo.tsx` |
| [adidas](https://www.adidas.com/us) | One owned graphic device (label boxes, 0 px corners) recognisable without the logo | **Adapt** the idea of a single owned device into a CBA-specific one: the 2 px chalk court line and the shuttle-flight arc | Distinctiveness from one consistent asset (CO; evidence for drive is weak, see RESEARCH) | #1, #6 | Court line drawn at landing (`hero.tsx`); `border-2 chalk/20` rules in `court-sheet.tsx`; arc reused in `training-rally.tsx` and the logo `Mark` in `shuttle.tsx` |
| [ASICS](https://www.asics.com/us/en-us/) | Proof through named people and verifiable results | **Adapt** as named-coach slots that stay hidden until real profiles exist | Named authority builds trust, but inventing coaches is forbidden | #12 | `lib/coaches.ts` (empty), rendered by `about/page.tsx` when filled |
| [BWF](https://bwfbadminton.com/) | "LIVE" status strip in the chrome; "Add to calendar" | **Adapt** live state as an honest **open-now status** in India time. **Reject** "courts free tonight" and "Add to calendar" | No availability API and no batch timetable were supplied, so either feature would show invented data | #4 | `open-status.tsx` (Asia/Kolkata), shown in hero facts strip and `visit.tsx` hours card |
| [Yonex](https://www.yonex.com/badminton) | Racquet Selector quiz (good); 11-slide hero carousel that rendered blank (bad); string-bed photography | **Adopt** guided chooser + string-mesh texture. **Reject** carousel | Guided choice helps uncertain users (Chernev 2015, EV). Auto-rotation halves exposure (NN/g, EV) | #5, #9 | `path-picker.tsx` 2-question picker; `.strings` texture in `training-rally.tsx` |
| [Wimbledon](https://www.wimbledon.com/) | Hero with one job; one parallel card per route to the goal; serif eyebrow label; zoom disabled | **Adopt** one-job hero + parallel route cards. **Reject** serif eyebrow (replaced by a mono label) and zoom lock | Mono labels match the "court sheet" scoreboard voice with one fewer font. Zoom lock fails WCAG 1.4.4 | #3, #9, #13, #15 | `home/two-ways.tsx` ("I want a game" / "I want to get better"); `.eyebrow` mono; `layout.tsx` viewport without `maximum-scale` |
| [Roland-Garros](https://www.rolandgarros.com/en-us/) | Playing-surface colour is the brand colour; numbered 01/02/03 story strip | **Adopt** both: palette sampled from CBA's own court mats; numbered sections and a numbered coaching loop | "Surface is the palette" makes the identity honest to the hall in the photos (CO + BR) | #1 | `globals.css` `@theme` tokens (court green, mat teal, chalk, lime); `section-head.tsx`; 01–04 Assess → Condition → Analyse → Review in `training-rally.tsx` |
| [PGBA](https://gopichandacademy.com/) / [PPBA](https://www.ppba.in/) | Legacy-first hero, count-up counters, no fees, no enquiry path, stale news, zoom lock | **Reject** all of it (counter-example) | Local Indian competitors leave room for a decision-first site. Count-ups show "0" without JS | #3, #4, #15 | Hero leads with the visitor's choice; `court-sheet.tsx` uses static numbers with sources |
| [Equinox](https://www.equinox.com/) + [Third Space](https://www.thirdspace.london/clubs/) | Low-commitment "Visit a club" CTA; concrete numbers instead of adjectives | **Adopt** | Commitment ladder + concreteness (CO; trust guidance EV) | #4, #11 | Secondary CTA "Book a free trial"; "7 courts · 18 hrs/day · ₹450" in `court-sheet.tsx` |
| [Barry's](https://www.barrys.com/studio/tribeca/) | First-timer vs returning split; location card with transit time; "What to expect" | **Adopt** split + location card + what-to-bring | Reduces first-visit uncertainty (CO) | #3, #9 | `visit.tsx` (address, metro 2.5 km, parking, hours); "What to bring" in `programs/page.tsx`; shoes rule in hero strip |
| [IMG Academy](https://www.imgacademy.com/camps) | Consultation → apply ladder; "Not sure? Talk to an advisor" default | **Adopt** as WhatsApp trial plus the picker's "Not sure where to start?" | A default for uncertain parents (EV, moderated) | #9, #11 | `path-picker.tsx`; trial CTAs → WhatsApp |
| [Rocket Padel](https://www.rocketpadel.com/) / [Padel Clube](https://www.padelclube.com/) | Third-party booking hand-off; affiliations; safeguarding policy for parents | **Adopt** labelled hand-off + affiliation (BATTS exchange). **Deferred** safeguarding | No safeguarding policy was supplied, and we won't write one for the academy | #10 | "opens Hudle" labels in `buttons.tsx`, `two-ways.tsx`, `visit.tsx`; BATTS card in `training-rally.tsx`. Safeguarding → `DEPENDENCIES.md` |
| [Hudle](https://hudle.in/venues/celestial-badminton-academy/776227) / [Playo](https://playo.co/venues/sector--104-ncr/celestials-badminton-academy-sector-4-ncr) | CBA's own listings rated 3.92–4.0, beside rivals rated 4.2–4.3 | **Adopt** "persuade before the redirect": price, rules and the stronger Google rating come before the click | The comparison happens at the destination (CO + HY H5) | #4, #10, #12 | Hero strip; `proof.tsx` (Google 4.4 + link out); booking copy "the booking page holds no surprises" |

## B. UX evidence and physics sources

| Source | Finding used | Decision | Where |
|---|---|---|---|
| [NN/g scrolling & attention](https://www.nngroup.com/articles/scrolling-and-attention/) | ~57% of viewing time above the fold | #4: facts strip in the first viewport | `hero.tsx` strip |
| [NN/g auto-forwarding](https://www.nngroup.com/articles/auto-forwarding/) | Carousels hide messages | #5: static hero; community strip never auto-advances | `hero.tsx`, `community.tsx` |
| [NN/g hamburger menus](https://www.nngroup.com/articles/hamburger-menus/) | Hidden nav used 27% vs 48% visible | #8: "Book" stays visible beside Menu on mobile | `site-header.tsx` |
| [Chernev et al. 2015](https://www.sciencedirect.com/science/article/abs/pii/S1057740814000916) | Overload under uncertainty → give a default | #9: picker | `path-picker.tsx` |
| [Baymard checkout](https://baymard.com/research-articles/ecommerce-checkout-usability-report-and-benchmark) | Long forms cause abandonment | #11: WhatsApp instead of a long form; optional form is 4 fields | `enquiry-form.tsx` |
| [Stanford credibility](https://credibility.stanford.edu/guidelines/) + [NN/g trust](https://nngroup.com/articles/trustworthy-design/) | Address, real photos, prices, third-party reviews | #4, #12, #14 | `arena.tsx`, `visit.tsx`, `proof.tsx` |
| [NN/g animation duration](https://www.nngroup.com/articles/animation-duration/) + [WCAG 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) | 100–500 ms UI motion; reduced-motion alternative | #7 | `globals.css`, `hero.tsx` static final frame |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Contrast, focus, target size | #15 | Tokens checked (VALIDATION §1), 48 px targets, lime/ink focus ring |
| [web.dev CWV](https://web.dev/articles/defining-core-web-vitals-thresholds) | LCP ≤ 2.5 s, CLS ≤ 0.1 | #14 | Hero preload in `app/page.tsx`; lazy Framer; CSS reveals |
| [Cohen et al. 2015](https://rainbow.ldeo.columbia.edu/~alexeyk/Papers/Cohen_2015_New_J._Phys._17_063001.pdf), [Collet 2026](https://arxiv.org/abs/2601.01412), [Collet 2023](https://arxiv.org/abs/2310.11155) | Quadratic drag, Vt ≈ 6.5 m/s, "triangular" path, cork-first flip | #6: signature flight | `lib/flight.ts` (Euler integration), `hero.tsx`, `shuttle.tsx` |
| [Hart & Potts 2020](https://www.mdpi.com/2504-3900/49/1/28) | Anticlockwise skirt spin | #6: skirt "breathing" scale cue | `shuttle.tsx` |
| [Kivetz et al. 2006](https://home.uchicago.edu/ourminsky/Goal-Gradient_Illusionary_Goal_Progress.pdf) (goal-gradient) | Pre-stamped progress cards speed completion | **Rejected for now.** CBA has no session-pack product, and inventing one would be a fake offer. Revisit if the academy sells 10-session packs | — |
| Sticky mobile "Book" bar | No transparent study found | **Adapted** to the always-visible header button (better-evidenced: visible nav) | `site-header.tsx` |

## C. Client moodboard (Notion "Design" page, saved in `/ref/design` and `/ref/ui`)

| Moodboard image | Pattern | Verdict | Where / why |
|---|---|---|---|
| d01 pill buttons + circular arrow button | Pill CTA with an arrow disc | **Adopt** | `buttons.tsx`, `globals.css` L91. All primary CTAs |
| d02, d05 pill-shaped nav bar | Floating rounded nav | **Adopt** | `site-header.tsx` rounded container |
| d04 Netmaster yellow "Get in touch" | One high-chroma CTA colour | **Adopt** as lime, reserved for the primary action + shuttle path | Decision #2 |
| d06, d07, u14, u15 coach cards with credentials | Named coach + qualification | **Adapt**: slot built, hidden until real profiles | `lib/coaches.ts`; About shows "meet the team at a free trial" meanwhile |
| d08, u12 contact info + WhatsApp card + form + map | Contact hub | **Adapt**: call/WhatsApp/Instagram buttons, form only when an endpoint exists, map as a link (no embed) | `contact/page.tsx`, `visit.tsx`. Embed rejected for LCP (#14) |
| d09 newsletter | Email capture | **Deferred**: Notion marks it "Do we need?"; no list or backend | `DEPENDENCIES.md` |
| d10 multi-column footer | Columns of links | **Adopt** | `site-footer.tsx` (Visit / Hours / Talk / Explore / Book) |
| d11 word + image pills ("We → Protect → Nature") | Inline image-in-headline strip | **Reject** | Decorative; competes with the one-job hero. Lacks enough real photos to carry it |
| d12 floating circular thumbnails around headline | Ornamental bubbles | **Reject** | The shuttle is the one moving element; "if everything moves, nothing stands out" |
| d13, u07 fanned card carousel | Rotating card deck | **Adapt** into a non-rotating expanding accordion strip | `community.tsx`: hover *and* focus expand, no auto-advance, plain scroller on touch |
| u02 padel: numbered services + FAQ | 1. Court rental 2. Coaching 3. Events; "Got questions?" | **Adopt** numbered services and FAQ | `two-ways.tsx`; `faq.tsx` on `/programs` |
| u03 lime + green badminton editorial | Lime accent on deep green | **Adopt** as palette direction (confirmed by the venue's own lime net posts) | `@theme` tokens |
| u04 "Your court is waiting" | Booking-first tennis hero | **Adopt** the territory: hero leads with the visitor's action | Decision #3 |
| u06 athlete showcase with countdown stats | Count-up / countdown numbers | **Reject** count-ups; **Adopt** a big-numeral stats row | `court-sheet.tsx` static |
| u08 tennis journey: programmes by level | Programmes grouped by player stage | **Adopt** | `/programs` grouped by kids / teens / adults; picker |
| u10 TIDA "We don't just train players" | Purpose-led academy statement | **Adapt** the voice: "Every session is a rally, not a drill" | `training-rally.tsx` |
| u11 partner-logo strip | Logo wall | **Reject** | Only one verified affiliation (BATTS), so a logo wall would be padding. BWF research flags logo walls too |
| u01 racket product page, u05 sports collage, u09 climate NGO, u13 academy "about" | Product, collage and about layouts | **Partly used**: u13's photo + mission layout informs `/about`; the others don't fit a venue booking site | `about/page.tsx` |

## D. What could not be verified

- **Notion brief:** captured in an earlier pass, with the moodboard images saved to `/ref`. A re-fetch on 16 Oct 2026 returned only Notion's JavaScript shell, so changes since that capture can't be confirmed.
- **Google Business link** (`share.google/…`): automated fetching is blocked (robots). The rating, hours and address come from mirrors (LyfSkills) and the booking listings, as sourced in `lib/academy.ts`.
- **Motion on reference sites** was inferred from markup and static captures, not watched. adidas and ASICS returned 403.
- **No conversion data** exists for any reference. Each "why it works" is an interpretation, labelled CO or HY.


## E. Revision 2 (academy-first): references re-used and why

| Reference | Pattern re-used | Where in the build |
|---|---|---|
| Barry's | First-timer vs returning split → "I'm new to this" / "I want to improve"; "What to expect" → /first-session | `home/starting-points.tsx`, `app/first-session/page.tsx` |
| IMG Academy | "Not sure? Talk to an advisor" → level finder; commitment ladder → free trial with answers attached | `level-finder.tsx` |
| Yonex | Guided selector, now 3–4 questions with a level on a visual strip | `level-finder.tsx` |
| Kivetz et al. 2006 (goal-gradient) | Previously rejected because there was no session-pack product. **Now adopted** in a form that needs no invented offer: a visible start point and next level on the pathway, the lit segment in the finder result, and the progress rail on each /pathway level | `home/pathway-steps.tsx`, `app/pathway/page.tsx`, `PathStrip` in `level-finder.tsx` |
| ASICS | Named-coach proof: still a slot waiting for data, now flagged as the #1 content gap | `lib/coaches.ts` |
| Roland-Garros numbered strip | Numbers kept only where order is real (pathway levels, first-session steps) | `pathway.ts`, `first-session/page.tsx` |
| Rocket Padel | Labelled hand-off kept for the now-secondary court booking | `home/book-court.tsx`, `facilities/page.tsx#book-a-court` |
| Moodboard u08 (programmes by level) | Fully realised as the pathway | `lib/pathway.ts` |
| Moodboard d06/d07/u14/u15 (coach cards) | Still pending real coach data | `lib/coaches.ts` |
