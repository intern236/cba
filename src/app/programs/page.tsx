import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "@phosphor-icons/react/ssr";
import { academy, trialLink } from "@/lib/academy";
import { fees, weekdayTimings, weekendTimings, feesFrom } from "@/lib/batches";
import { levels, levelCountWord } from "@/lib/pathway";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ExternalButton, TextLink } from "@/components/buttons";
import { Faq } from "@/components/faq";
import { LevelFinder } from "@/components/level-finder";

export const metadata: Metadata = {
  title: { absolute: "Badminton Coaching in Noida: Batches & Fees | Celestial's" },
  description: `Badminton coaching classes in Noida for every age: kids, teens & adults. Weekday & weekend batches from ${feesFrom}/month. Book a free trial.`,
  alternates: { canonical: "/programs/" },
  openGraph: {
    title: "Badminton Coaching in Noida: Batches & Fees | Celestial's",
    description: `Coaching batches for kids, teens, and adults. Morning, evening and weekend batches from ${feesFrom}/month. Free trial available.`,
    url: "/programs/",
  },
};


const a = academy;
const siteUrl = "https://www.celestialsacademy.com";

const groups = [
  ...levels.map((l) => ({
    t: l.name,
    age: l.ages,
    d: `${l.tagline}. ${l.forWho} Focus: ${l.work.slice(0, 3).join(", ").toLowerCase()}.`,
    start: `Programme ${l.n}`,
    href: `/pathway/#${l.id}`,
  })),
 
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
    q: "What are the badminton batch timings and monthly fees in Noida?",
    text: `Monthly coaching fees start at ${feesFrom}, depending on the plan and how many days a week the player trains. Weekday and weekend batches run through the morning and evening. The first session is free. The full timetable and fee table are on this page.`,
    a: (
      <>
        Monthly coaching fees start at {feesFrom}, depending on the plan and
        how many days a week the player trains. Weekday and weekend batches
        run through the morning and evening. The first session is free.{" "}
        <a href="#timings" className="link-underline font-semibold text-ink">
          View the full batch timetable and monthly fees
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
        eyebrow="Coaching programs"
        title="Badminton Coaching Classes in Noida for Every Age"
        intro="Start right, keep getting better. Badminton coaching in Sector 104, Noida for kids, teens and adults, from complete beginners to tournament players. Group batches or one-to-one, in the morning, the evening or at weekends."
      >
        <nav aria-label="On this page" className="flex flex-wrap gap-2 lg:justify-end">
          {[
            ["#ages", "Ages"],
            ["#formats", "Formats"],
            ["#timings", "Timings & fees"],
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
            <p className="eyebrow text-ink-soft">01 · Who we coach</p>
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
            <h2 id="formats-title" className="display mt-4 max-w-[18ch] text-[clamp(2.6rem,5vw,4.4rem)]">How you train</h2>
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
              <h3 className="display text-[2.2rem]">What sits behind the coaching</h3>
              <ul className="mt-4 grid gap-x-8 gap-y-3 text-chalk/80 sm:grid-cols-2">
                {[...a.coaching.methods, "Physiotherapist & medical room", `Exchange with ${a.coaching.exchange.partner} (${a.coaching.exchange.country})`].map((m) => (
                  <li key={m} className="flex gap-2"><Check size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />{m}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TIMINGS & FEES */}
      <section id="timings" aria-labelledby="timings-title" className="on-light scroll-mt-24 bg-chalk py-24">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-ink-soft">03 · Timings &amp; fees</p>
            {/* SEO: keyword in H2 */}
            <h2 id="timings-title" className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">Badminton batch timings &amp; monthly fees</h2>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.08}>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-[24px] bg-court-950 p-7 text-chalk">
                <h3 className="display text-[2rem]">Batch timings</h3>
                <h4 className="eyebrow mt-5 text-mat-soft">Weekdays</h4>
                <ul className="mt-2 tabular-nums">
                  {weekdayTimings.map((t) => (
                    <li key={t} className="border-b border-chalk/10 py-2.5">{t}</li>
                  ))}
                </ul>
                <h4 className="eyebrow mt-6 text-mat-soft">Weekends</h4>
                <ul className="mt-2 tabular-nums">
                  {weekendTimings.map((t) => (
                    <li key={t} className="border-b border-chalk/10 py-2.5 last:border-b-0">{t}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[24px] bg-chalk-2 p-7">
                <h3 className="display text-[2rem]">Monthly fees</h3>
                <table className="mt-4 w-full text-left tabular-nums">
                  <caption className="sr-only">Monthly coaching fees by number of days per week</caption>
                  <thead>
                    <tr className="eyebrow text-ink-soft">
                      <th scope="col" className="py-2 font-normal">Plan</th>
                      <th scope="col" className="py-2 text-right font-normal">Per month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.map((f) => (
                      <tr key={f.plan} className="border-t border-ink/10">
                        <th scope="row" className="py-2.5 font-normal">{f.plan}</th>
                        <td className="py-2.5 text-right font-semibold">{f.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-6 flex flex-col items-end gap-4 sm:flex-row sm:items-center sm:justify-end">
              <a
                href={a.contact.phoneHref}
                className="font-semibold link-underline inline-flex min-h-[44px] items-center lg:min-h-0"
              >
                Call {a.contact.phoneDisplay}
              </a>
              <ExternalButton
                href={trialLink("Which batch would suit the player?")}
                variant="ink"
                note="opens WhatsApp"
              >
                Ask which batch fits
              </ExternalButton>
            </div>
            {/* SEO: no longer implies fees are "on request" */}
            <p className="mt-4 text-sm text-ink-soft">The first session is free. Fees shown are monthly. Timings are confirmed when you book.</p>
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