import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "@phosphor-icons/react/ssr";
import { academy, trialLink } from "@/lib/academy";
import { weekdayTimings, weekendTimings } from "@/lib/batches";
import { levels, levelCountWord } from "@/lib/pathway";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ExternalButton, TextLink } from "@/components/buttons";
import { Faq } from "@/components/faq";
import { LevelFinder } from "@/components/level-finder";


export const metadata: Metadata = {
  title: {
    absolute: "Badminton Batch Timings in Noida | Celestial's",
  },
  description:
    "Explore badminton classes in Noida at Celestial's, Sector 104. Find badminton coaching for kids and adults, one-to-one badminton coaching, weekend badminton classes and evening badminton batches.",
  alternates: { canonical: "/programs/" },
  openGraph: {
    title: "Badminton Batch Timings in Noida | Celestial's",
    description:
      "Discover badminton classes in Noida for kids and adults, including one-to-one badminton coaching, weekend classes and evening batches at Celestial's, Sector 104.",
    url: "/programs/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Badminton Batch Timings in Noida | Celestial's",
    description:
      "Find badminton coaching for kids and adults in Noida, with one-to-one coaching, weekend badminton classes and evening batches at Celestial's, Sector 104.",
  },
};


const a = academy;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

const groups = [
  ...levels.map((l) => ({
    t: l.name,
    age: l.ages,
    d: `${l.tagline}. ${l.forWho} Focus: ${l.work.slice(0, 3).join(", ").toLowerCase()}.`,
    start: `Programme ${l.n}`,
    href: `/pathway/#${l.id}`,
  })),
];

/* Monthly fees (as of Oct 2026) */
const fees = [
  { plan: "3 days a week", price: "₹4,000" },
  { plan: "4 days a week", price: "₹5,000" },
  { plan: "5 days a week", price: "₹6,000" },
  { plan: "6 days a week", price: "₹7,000" },
  { plan: "Weekends only", price: "₹3,500" },
];

/* SEO: `text` is the plain-text answer used in FAQPage JSON-LD.
   It must match the visible answer word for word (link text excluded). */
const faqs = [
  {
    q: "Is there a free badminton trial class?",
    text: "Yes, the first session is free.",
    a: (
      <>
        Yes, the first session is free.{" "}
        <Link href="/first-session/" className="link-underline font-semibold text-ink">
          Here’s what happens on the day
        </Link>
        .
      </>
    ),
  },
  {
    q: "Which ages do you coach?",
    text: "We coach kids aged 5 to 11, teens aged 12 to 17 and adults aged 18 and over. Tell us the player’s age and experience and we’ll suggest a batch.",
    a: "We coach kids aged 5 to 11, teens aged 12 to 17 and adults aged 18 and over. Tell us the player’s age and experience and we’ll suggest a batch.",
  },
  {
    q: "Group batch or one-to-one badminton coaching?",
    text: "Group batches are the usual starting point. One-to-one sessions suit players who want faster, individual feedback, and many players combine the two.",
    a: "Group batches are the usual starting point. One-to-one sessions suit players who want faster, individual feedback, and many players combine the two.",
  },
  {
    q: "How will I know I’m improving?",
    text: "Periodic assessments set a baseline and measure progress against it, and individual reviews turn that into the next block of work.",
    a: "Periodic assessments set a baseline and measure progress against it, and individual reviews turn that into the next block of work.",
  },
  {
    q: "What are the badminton batch timings in Noida?",
    text: "Weekday and weekend badminton coaching batches are available in the morning and evening. Check the full timetable on this page. The first session is free.",
    a: (
      <>
        Weekday and weekend badminton coaching batches are available in the
        morning and evening. Check the full timetable on this page. The first
        session is free.{" "}
        <a href="#timings" className="link-underline font-semibold text-ink">
          View batch timings
        </a>
        .
      </>
    ),
  },
  {
    q: "Can I also just book a badminton court?",
    text: "Yes. Courts are booked online on Hudle or Playo.",
    a: (
      <>
        Yes. Courts are booked online on Hudle or Playo.{" "}
        <Link href="/facilities/#book-a-court" className="link-underline font-semibold text-ink">
          Court booking details
        </Link>
        .
      </>
    ),
  },
];

/* SEO: structured data */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.text },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Programs", item: `${siteUrl}/programs/` },
    ],
  },
];

export default function ProgramsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* SEO: new H1 with primary keyword; old creative line kept in the intro */}
      <PageHeader
        eyebrow="Coaching programmes"
        title="Badminton Coaching Classes in Noida for Every Age"
        intro="Start right, keep getting better. Badminton coaching in Sector 104, Noida for kids, teens and adults, from complete beginners to tournament players. Group batches or one-to-one, in the morning, the evening or at weekends."
      >
        <nav aria-label="On this page" className="flex flex-wrap gap-2 lg:justify-end">
          {[
            ["#ages", "Ages"],
            ["#formats", "Formats"],
            ["#timings", "Batch timings"],
            ["#find-your-level", "Find your level"],
            ["#faq", "FAQ"],
          ].map(([h, l]) => (
            <a key={h} href={h} className="flex min-h-[44px] items-center rounded-full px-4 text-sm font-medium ring-1 ring-chalk/25 hover:ring-chalk/70">
              {l}
            </a>
          ))}
        </nav>
      </PageHeader>

      {/* AGES */}
      <section id="ages" aria-labelledby="ages-title" className="on-light scroll-mt-24 bg-chalk py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-ink-soft">01 · Who we coach: kids, teens and adults</p>
            {/* SEO: keyword in H2. If you prefer the old heading, use:
                {levelCountWord} programmes, plus adult batches */}
            <h2 id="ages-title" className="display mt-4 max-w-[18ch] text-[clamp(2.6rem,5vw,4.4rem)]">Badminton classes for kids, teens &amp; adults</h2>
          </Reveal>
          <ul className="mt-12 border-b-2 border-ink/10">
            {groups.map((g, i) => (
              <Reveal as="li" key={g.t} delay={i * 0.06} className="grid gap-3 border-t-2 border-ink/10 py-8 md:grid-cols-12 md:items-baseline">
                <h3 className="display text-[clamp(3rem,6vw,5rem)] md:col-span-4">{g.t}</h3>
                <div className="md:col-span-7 md:col-start-6">
                  <p className="eyebrow mt-1 text-mat-deep font-semibold">{g.age}</p>
                  <p className="max-w-[56ch] mt-2 text-lg text-ink-soft">{g.d}</p>
                  <p className="eyebrow mt-3 text-ink/60">{g.start}</p>
                  {g.href && (
                    <Link href={g.href} className="mt-1 inline-flex min-h-[44px] items-center font-semibold">
                      <span className="link-underline">About {g.t}</span>
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-8">
            <TextLink href="/pathway/">How the programmes connect</TextLink>
          </Reveal>
        </div>
      </section>

      {/* FORMATS */}
      <section id="formats" aria-labelledby="formats-title" className="scroll-mt-24 bg-court-950 py-24 text-chalk">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-mat-soft">02 · Formats</p>
            <h2 id="formats-title" className="display mt-4 max-w-[18ch] text-[clamp(2.6rem,5vw,4.4rem)]">Group batches or one-to-one coaching</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            <Reveal className="rounded-[24px] bg-mat p-7 text-ink lg:col-span-5">
              <h3 className="display text-[2.2rem]">Formats</h3>
              <ul className="mt-4 grid gap-3">
                <li><strong>Group batches</strong>: the usual starting point, with players at a similar level.</li>
                <li><strong>One-to-one</strong>: individual sessions for faster feedback.</li>
                <li><strong>When</strong>: morning, evening and weekend batches.</li>
              </ul>
            </Reveal>
            <Reveal className="rounded-[24px] bg-court-900 p-7 ring-1 ring-white/10 lg:col-span-7" delay={0.08}>
              <h3 className="display text-[2.2rem]">What&apos;s included beyond the court</h3>
              <ul className="mt-4 grid gap-x-8 gap-y-3 text-chalk/80 sm:grid-cols-2">
                {[...a.coaching.methods, "Physiotherapist & medical room", `Exchange with ${a.coaching.exchange.partner} (${a.coaching.exchange.country})`].map((m) => (
                  <li key={m} className="flex gap-2"><Check size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />{m}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BATCH TIMINGS & FEES */}
      <section
        id="timings"
        aria-labelledby="timings-title"
        className="on-light scroll-mt-24 bg-chalk py-24"
      >
        <div className="mx-auto grid max-w-[1320px] items-start gap-10 px-5 sm:px-8 lg:grid-cols-12">
          {/* Left: heading + fees */}
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-ink-soft">03 · Batch schedule &amp; fees</p>
            <h2
              id="timings-title"
              className="display mt-4 text-[clamp(2.4rem,4.2vw,4rem)]"
            >
              Batch Timings &amp; Monthly Fees
            </h2>
            <p className="mt-4 max-w-[42ch] leading-relaxed text-ink-soft">
              Weekday and weekend coaching schedules for kids, teens and adults
              at Celestial&apos;s Badminton Academy. Pick the number of days that
              suits you.
            </p>

            <div className="mt-8 max-w-[460px] rounded-[20px] bg-chalk-2 p-6 ring-1 ring-ink/10">
              <div className="flex items-center justify-between gap-3 border-b border-ink/10 pb-3">
                <p className="eyebrow font-semibold text-mat-deep">Monthly fees</p>
                <span className="text-xs text-ink/60">per player</span>
              </div>

              <ul className="mt-1">
                {fees.map((f) => (
                  <li
                    key={f.plan}
                    className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3 last:border-b-0"
                  >
                    <span className="text-ink">{f.plan}</span>
                    <span className="text-lg font-semibold tabular-nums text-ink">
                      {f.price}
                      <span className="ml-0.5 text-sm font-normal text-ink-soft">
                        /month
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-3 text-xs leading-relaxed text-ink/60">
                First session free. Fees as of Oct 2026; confirm on WhatsApp
                before joining.
              </p>
            </div>
          </Reveal>

          {/* Right: timings card */}
          <Reveal className="lg:col-span-7 lg:flex lg:justify-end" delay={0.08}>
            <div className="w-full max-w-[520px] rounded-[20px] bg-court-950 p-6 text-chalk shadow-lg ring-1 ring-white/10 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-chalk/10 pb-4">
                <h3 className="display text-[1.6rem] leading-none">
                  Coaching Schedule
                </h3>
                <span className="rounded-full bg-mat px-3 py-1 text-xs font-semibold text-ink">
                  First session free
                </span>
              </div>

              <h4 className="eyebrow mt-5 text-mat-soft">Weekdays</h4>
              <ul className="mt-2 text-[0.95rem] tabular-nums">
                {weekdayTimings.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-3 border-b border-chalk/10 py-2.5"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <h4 className="eyebrow mt-6 text-mat-soft">Weekends</h4>
              <ul className="mt-2 text-[0.95rem] tabular-nums">
                {weekendTimings.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-3 border-b border-chalk/10 py-2.5 last:border-b-0"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

            <div className="mt-6 flex flex-col gap-3 border-t border-chalk/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
  {/* Mobile: full-width outlined button */}
  <a
    href={a.contact.phoneHref}
    className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full px-5 text-sm font-semibold ring-1 ring-chalk/25 transition-colors hover:ring-chalk/70 sm:hidden"
  >
    Call {a.contact.phoneDisplay}
  </a>
  {/* Desktop: original underlined link */}
  <a
    href={a.contact.phoneHref}
    className="link-underline hidden min-h-[44px] items-center text-sm font-semibold sm:inline-flex"
  >
    Call {a.contact.phoneDisplay}
  </a>
  <div className="w-full max-sm:[&>*]:w-full max-sm:[&>*]:justify-center sm:w-auto">
    <ExternalButton
      href={trialLink("Which batch would suit the player?")}
      variant="ink"
      note="opens WhatsApp"
    >
      Ask which batch fits
    </ExternalButton>
  </div>
</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINDER + FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="on-light scroll-mt-24 bg-chalk-2 py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-ink-soft">04 · Questions</p>
            <h2 id="faq-title" className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">Badminton coaching FAQs</h2>
            <div className="mt-8">
              {/* SEO: questions must render as <h3> inside components/faq.tsx */}
              <Faq items={faqs} />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <LevelFinder id="find-your-level" />
          </Reveal>
        </div>
      </section>
    </>
  );
}