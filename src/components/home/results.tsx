import { players, teamResult } from "@/lib/achievements";
import { Reveal } from "../reveal";
import { AchievementsSlider } from "./achievements-slider";

/**
 * Player results with photos — shared by the homepage and /about (data: lib/achievements.ts).
 * Proof of the whole pathway in one swipe: juniors with national rankings next to adults and
 * masters with state and national titles. On phones it's a native swipe row with a peek of
 * the next card and a progress bar; arrows appear from the sm breakpoint up.
 */
export function Results({ id = "results-title" }: { id?: string }) {
  return (
    <section aria-labelledby={id} className="on-light overflow-hidden bg-chalk-2 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <AchievementsSlider players={players}>
          <Reveal>
            <p className="eyebrow text-mat flex items-center gap-4">
              <span className="h-[2px] w-10 bg-ink/20" aria-hidden="true" />
              PROGRESS THAT COUNTS</p>
            <h2 id={id} className="display mt-4 max-w-[950px] text-[clamp(2.6rem,5vw,4.8rem)] leading-[1.02] tracking-tight">
              Player results and rankings
            </h2>
            <p className="mt-5 max-w-[640px] text-[1.05rem] leading-relaxed text-ink-soft sm:text-lg">
              National rankings for our juniors, state and national titles for our adults and masters. Every one of them trains at Celestial&rsquo;s.
            </p>
          </Reveal>
        </AchievementsSlider>

        <Reveal className="mt-8 rounded-[24px] bg-court-950 p-6 text-chalk sm:rounded-[28px] sm:p-10" delay={0.08}>
          <p className="eyebrow text-mat-soft">Team achievement</p>
          <h3 className="display mt-3 max-w-[850px] text-[clamp(1.9rem,4vw,2.6rem)] leading-tight">{teamResult.title}</h3>
          <p className="mt-3 max-w-[760px] leading-relaxed text-chalk/75 sm:text-lg">{teamResult.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
