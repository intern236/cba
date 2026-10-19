import { trialLink } from "@/lib/academy";
import { SectionHead } from "../section-head";
import { Reveal } from "../reveal";
import { ExternalButton } from "../buttons";

/**
 * Improvers don't shop for "coaching"; they shop for a fix to the thing that keeps losing
 * them points. Each row starts from a problem a player recognises and ends on the academy's
 * own confirmed methods (assessments, S&C, video analysis, reviews, physio — academy.ts).
 * The fixes describe standard coaching practice, not promised outcomes.
 */
const rows = [
  { p: "Always a step late", fix: "Footwork patterns and split-step timing on court, then speed and agility work in the gym.", tags: ["Footwork", "Strength & conditioning"] },
  { p: "Backhand won’t reach the back", fix: "Grip, timing and body rotation, checked on video until it holds up in a rally.", tags: ["Technique", "Video analysis"] },
  { p: "Fading in long rallies", fix: "Badminton-specific conditioning in the on-site gym, tracked in periodic assessments.", tags: ["Strength & conditioning", "Assessments"] },
  { p: "Good in practice, lose the match", fix: "Game-situation practice, shot selection and tactics, with match footage reviewed with the coach.", tags: ["Tactics", "Video analysis", "Reviews"] },
  { p: "Keep picking up niggles", fix: "The physio on site, plus strength work that protects knees, shoulders and ankles.", tags: ["Physio", "Strength & conditioning"] },
  { p: "Not sure what to fix", fix: "Start with an assessment. It sets a baseline and shows where your points are going.", tags: ["Assessments"] },
];

export function Problems() {
  return (
    <section id="problems" aria-labelledby="problems-title" className="on-light scroll-mt-24 bg-chalk py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHead
          index="04"
          label="Already playing?"
          id="problems-title"
          title="Bring us the problem"
          intro="Most players who come to improve already know what’s costing them points. Here’s how the coaching goes after the common ones."
        />
        <ul className="mt-14 border-b-2 border-ink/10">
          {rows.map((r, i) => (
            <Reveal as="li" key={r.p} delay={i * 0.04} className="grid gap-3 border-t-2 border-ink/10 py-6 md:grid-cols-12 md:items-baseline md:gap-6">
              <h3 className="display text-[clamp(1.9rem,3vw,2.5rem)] md:col-span-5">{r.p}</h3>
              <p className="max-w-[52ch] text-ink-soft md:col-span-4">{r.fix}</p>
              <p className="flex flex-wrap gap-1.5 md:col-span-3 md:justify-end">
                {r.tags.map((t) => (
                  <span key={t} className="eyebrow rounded-full px-2.5 py-1 text-[0.64rem] text-mat-deep ring-1 ring-mat/40">{t}</span>
                ))}
              </p>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <ExternalButton href={trialLink("I already play and want to work on something specific.")} variant="ink" note="opens WhatsApp">Book a free trial</ExternalButton>
          <p className="text-ink-soft">Tell us what you want to fix when you book. The coach will look at it in the first session.</p>
        </Reveal>
      </div>
    </section>
  );
}
