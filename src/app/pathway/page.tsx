import type { Metadata } from "next";
import { Check, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { trialLink } from "@/lib/academy";
import { levels } from "@/lib/pathway";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ExternalButton } from "@/components/buttons";
import { LevelFinder } from "@/components/level-finder";
import { TrainingRally } from "@/components/home/training-rally";
import { Faq } from "@/components/faq";

export const metadata: Metadata = {
  title: "The training pathway",
  description:
    "Four levels from first lesson to tournament play: Foundation, Development, Performance and Competitive. What each level works on, who it's for and what it takes to move up, at Celestial's Badminton Academy, Noida.",
  alternates: { canonical: "/pathway/" },
};

const faqs = [
  { q: "Where will I start?", a: "Wherever your game is now. The coach watches you play in the free first session and confirms the level. Experienced players don’t start at Foundation." },
  { q: "How long does each level take?", a: "It depends on how often you train and how much you practise. Periodic assessments show when you’re ready, so you move up on evidence, not on a calendar." },
  { q: "Can adults go all the way?", a: "Yes. Adults train at every level, including Competitive." },
  { q: "Do I have to aim for tournaments?", a: "No. Plenty of players stay at the level they enjoy. The pathway shows what’s next if you want it." },
];

export default function PathwayPage() {
  return (
    <>
      <PageHeader
        eyebrow="The training pathway"
        title="Four levels. One direction."
        intro="From a first lesson to a tournament plan. Each level says who it’s for, what you’ll work on and what it takes to move up, so you always know where you are."
      >
        <nav aria-label="Levels" className="flex flex-wrap gap-2 lg:justify-end">
          {levels.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-medium ring-1 ring-chalk/25 hover:ring-chalk/70">
              <span className="eyebrow text-[0.65rem] text-mat-soft">{l.n}</span>
              {l.name}
            </a>
          ))}
        </nav>
      </PageHeader>

      <section aria-label="Levels" className="on-light bg-chalk py-20 sm:py-24">
        <ol className="mx-auto max-w-[1320px] px-5 sm:px-8">
          {levels.map((l, i) => (
            <li key={l.id} id={l.id} className="scroll-mt-28 border-t-2 border-ink/10 py-14 first:border-t-0 first:pt-4 sm:py-16">
              <Reveal className="grid gap-10 lg:grid-cols-12">
                {/* Rail: how far up the pathway this level sits */}
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    {levels.map((_, j) => (
                      <span key={j} className={`h-1.5 flex-1 rounded-full ${j === i ? "bg-mat" : j < i ? "bg-ink/30" : "bg-ink/10"}`} />
                    ))}
                  </div>
                  <p className="eyebrow mt-5 text-ink-soft">
                    Level {l.n} of 03 · {l.ages}
                  </p>
                  <h2 className="display mt-3 text-[clamp(3rem,4.6vw,4.6rem)]">{l.name}</h2>
                  <p className="mt-1 text-lg font-semibold text-mat-deep">{l.tagline}</p>
                  <p className="mt-4 max-w-[40ch] text-[1.05rem] leading-relaxed text-ink-soft">{l.forWho}</p>
                  <p className="mt-5 text-sm">
                    <span className="eyebrow block text-[0.68rem] text-ink-soft">Format</span>
                    <span className="font-semibold">{l.format}</span>
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <h3 className="eyebrow text-ink-soft">You&rsquo;ll work on</h3>
                  <ul className="mt-4 grid gap-2.5">
                    {l.work.map((w) => (
                      <li key={w} className="flex gap-2.5 text-[1.05rem]">
                        <span aria-hidden="true" className="mt-[0.55rem] h-[2px] w-4 shrink-0 bg-ink/40" />
                        {w}
                      </li>
                    ))}
                  </ul>
                  <h3 className="eyebrow mt-8 text-ink-soft">Support at this level</h3>
                  <p className="mt-3 flex flex-wrap gap-1.5">
                    {l.support.map((s) => (
                      <span key={s} className="eyebrow rounded-full px-2.5 py-1 text-[0.64rem] text-mat-deep ring-1 ring-mat/40">{s}</span>
                    ))}
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <div className={`rounded-[22px] p-6 ${i === levels.length - 1 ? "bg-court-950 text-chalk" : "bg-chalk-2"}`}>
                    <h3 className={`eyebrow ${i === levels.length - 1 ? "text-mat-soft" : "text-ink-soft"}`}>
                      {i < levels.length - 1 ? `Ready for ${levels[i + 1].name} when` : "Where it leads"}
                    </h3>
                    <ul className="mt-4 grid gap-3">
                      {l.readyWhen.map((r) => (
                        <li key={r} className="flex gap-2.5">
                          <Check size={18} weight="bold" className={`mt-0.5 shrink-0 ${i === levels.length - 1 ? "text-lime" : "text-mat-deep"}`} aria-hidden="true" />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={trialLink(`I'm interested in the ${l.name} level.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-6 inline-flex items-center gap-1.5 font-semibold ${i === levels.length - 1 ? "text-chalk" : ""}`}
                    >
                      <span className="link-underline">Start here: book a free trial</span>
                      <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <TrainingRally index="05" label="How progress is tracked" cta={{ href: "/programs/", label: "Programs & batches" }} />

      <section aria-labelledby="finder-title" className="on-light bg-chalk-2 py-24">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-ink-soft">Not sure where you fit?</p>
            <h2 id="finder-title" className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">Find your starting level</h2>
            <div className="mt-10">
              <h3 className="eyebrow text-ink-soft">Questions</h3>
              <div className="mt-2">
                <Faq items={faqs} />
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.08}>
            <LevelFinder id="find-your-level" />
            <div className="mt-6 flex justify-end">
              <ExternalButton href={trialLink()} variant="ink" note="opens WhatsApp ">Skip the questions: book a free trial</ExternalButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
