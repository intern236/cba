import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "@phosphor-icons/react/ssr";
import { academy, trialLink } from "@/lib/academy";
import { batches } from "@/lib/batches";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ExternalButton, TextLink } from "@/components/buttons";
import { Faq } from "@/components/faq";
import { LevelFinder } from "@/components/level-finder";

export const metadata: Metadata = {
  title: "Coaching programs & batches",
  description:
    "Badminton coaching in Sector 104, Noida for kids, teens and adults, from complete beginners to tournament players. Group batches or one-to-one, morning, evening and weekend, with assessments, video analysis and a free first session.",
  alternates: { canonical: "/programs/" },
};

const a = academy;

const ages = [
  {
    t: "Kids",
    d: "Group batches that build the fundamentals the right way, with periodic assessments so parents can see progress, not just attendance.",
    start: "Usually start at Foundation or Development",
  },
  {
    t: "Teens",
    d: "Technique, game-situation practice and strength & conditioning, with video analysis for players who want to compete.",
    start: "Development to Competitive",
  },
  {
    t: "Adults",
    d: "Complete beginners, returning players and competitors. Learn properly or sharpen your game in morning, evening or weekend batches, or one-to-one.",
    start: "Any level, including complete beginners",
  },
];

const faqs = [
  { q: "Is there a free trial?", a: <>Yes, the first session is free. <Link href="/first-session/" className="link-underline font-semibold text-ink">Here’s what happens on the day</Link>.</> },
  { q: "Which ages do you coach?", a: "Kids, teens and adults. Tell us the player’s age and experience and we’ll suggest a batch." },
  { q: "Group batch or one-to-one?", a: "Group batches are the usual starting point. One-to-one sessions suit players who want faster, individual feedback, and many players combine the two." },
  { q: "How will I know I’m improving?", a: "Periodic assessments set a baseline and measure progress against it, and individual reviews turn that into the next block of work." },
  { q: "What are the batch timings and fees?", a: <>There are morning, evening and weekend batches. Ask for current timings and fees on WhatsApp or call {a.contact.phoneDisplay}.</> },
  { q: "Can I also just book a court?", a: <>Yes. Courts are booked on Hudle or Playo from {a.booking.priceFrom} a slot. <Link href="/facilities/#book-a-court" className="link-underline font-semibold text-ink">Court booking details</Link>.</> },
];

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Coaching programs"
        title="Coaching for every age and level"
        intro="Kids, teens and adults, from complete beginners to tournament players. Group batches or one-to-one, in the morning, the evening or at weekends."
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
            <h2 id="ages-title" className="display mt-4 max-w-[18ch] text-[clamp(2.6rem,5vw,4.4rem)]">Three age groups, one pathway</h2>
          </Reveal>
          <ul className="mt-12 border-b-2 border-ink/10">
            {ages.map((g, i) => (
              <Reveal as="li" key={g.t} delay={i * 0.06} className="grid gap-3 border-t-2 border-ink/10 py-8 md:grid-cols-12 md:items-baseline">
                <h3 className="display text-[clamp(3rem,6vw,5rem)] md:col-span-4">{g.t}</h3>
                <div className="md:col-span-7 md:col-start-6">
                  <p className="max-w-[56ch] text-lg text-ink-soft">{g.d}</p>
                  <p className="eyebrow mt-3 text-mat-deep">{g.start}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-8">
            <TextLink href="/pathway/">How the four levels work</TextLink>
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
                  <li key={m} className="flex gap-2"><Check size={18} weight="bold" className="mt-0.5 shrink-0 text-lime" aria-hidden="true" />{m}</li>
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
            <h2 id="timings-title" className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">Batches</h2>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.08}>
            {batches.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-b-2 border-ink/10 text-left">
                  <thead>
                    <tr className="eyebrow text-ink-soft">
                      <th scope="col" className="py-3 pr-4 font-normal">Level</th>
                      <th scope="col" className="py-3 pr-4 font-normal">Ages</th>
                      <th scope="col" className="py-3 pr-4 font-normal">Days</th>
                      <th scope="col" className="py-3 pr-4 font-normal">Time</th>
                      <th scope="col" className="py-3 font-normal">Fee</th>
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    {batches.map((b) => (
                      <tr key={`${b.level}-${b.days}-${b.time}`} className="border-t-2 border-ink/10">
                        <th scope="row" className="py-4 pr-4 font-semibold">{b.level}</th>
                        <td className="py-4 pr-4">{b.ages}</td>
                        <td className="py-4 pr-4">{b.days}</td>
                        <td className="py-4 pr-4">{b.time}</td>
                        <td className="py-4">{b.fee ?? "Ask us"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid gap-6 rounded-[24px] bg-chalk-2 p-7 sm:p-9 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="display text-[clamp(1.9rem,3vw,2.5rem)]">Morning, evening and weekend batches</p>
                  <p className="mt-3 max-w-[52ch] text-ink-soft">
                    Tell us the player&rsquo;s age, level and the times that suit you, and we&rsquo;ll send the current timetable and fees for the batches that fit.
                  </p>
                </div>
               <div className="flex flex-col items-end gap-3 sm:items-start">
  <a
    href={a.contact.phoneHref}
    className="text-center font-semibold link-underline"
  >
    Call {a.contact.phoneDisplay}
  </a>

  <ExternalButton
    href={trialLink("Please send current batch timings and fees.")}
    variant="ink"
    note="opens WhatsApp"
  >
    Ask on WhatsApp
  </ExternalButton>
</div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* FINDER + FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="on-light scroll-mt-24 bg-chalk-2 py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-ink-soft">04 · Questions</p>
            <h2 id="faq-title" className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">Before you start</h2>
            <div className="mt-8">
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
