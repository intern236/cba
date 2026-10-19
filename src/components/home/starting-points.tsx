import { Check } from "@phosphor-icons/react/ssr";
import { trialLink } from "@/lib/academy";
import { images } from "@/lib/images";
import { Photo } from "../photo";
import { SectionHead } from "../section-head";
import { Reveal } from "../reveal";
import { ExternalButton, TextLink } from "../buttons";
import { LevelFinder } from "../level-finder";

/**
 * Revision 2 (academy-first). The two audiences the academy serves have different worries:
 * beginners (and parents) worry about fit and day one; improvers worry about results.
 * Each panel answers its own worry and ends on its own next step (Barry's first-timer vs
 * returning split; IMG's commitment ladder). The level finder is the default for the unsure.
 */
export function StartingPoints() {
  const starting = [
    "No experience needed: kids, teens and adults",
    "Grip, footwork, serves and your first real rallies",
    "Group batches in the morning, evening or at weekends",
    "Your first session is free",
  ];
  const better = [
    "An assessment sets your baseline",
    "Video analysis shows what the coach sees",
    "Strength & conditioning in the on-site gym",
    "One-to-one sessions for faster progress",
  ];
  return (
    <section aria-labelledby="start-title" className="on-light bg-chalk py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHead
          index="01"
          label="Where are you starting from?"
          id="start-title"
          title={<>New to the game, or ready for more?</>}
          intro="Celestial’s coaches complete beginners and tournament players in the same hall. Start where you are."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <article aria-labelledby="new-title" className="flex h-full flex-col overflow-hidden rounded-[28px] bg-mat text-ink">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Photo img={images.wooden} sizes="(min-width:1024px) 640px, 100vw" />
                <span className="eyebrow absolute left-5 top-5 rounded-full bg-chalk/90 px-3 py-1.5 text-ink">Starting out</span>
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-9">
                <h3 id="new-title" className="display text-[clamp(2.4rem,4.4vw,3.6rem)]">I&rsquo;m new to this</h3>
                <ul className="mt-6 grid gap-3 border-t-2 border-ink/20 pt-6 text-[1.02rem]">
                  {starting.map((t) => (
                    <li key={t} className="flex gap-2.5"><Check size={18} weight="bold" className="mt-0.5 shrink-0" aria-hidden="true" />{t}</li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
                  <ExternalButton href={trialLink("I'm a beginner.")} variant="ink" note="opens WhatsApp">Book a free trial</ExternalButton>
                  <TextLink href="/first-session/">What happens on day one</TextLink>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={0.1}>
            <article aria-labelledby="better-title" className="flex h-full flex-col overflow-hidden rounded-[28px] bg-court-950 text-chalk">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Photo img={images.gymFloor} sizes="(min-width:1024px) 640px, 100vw" />
                <span className="eyebrow absolute left-5 top-5 rounded-full bg-court-950/75 px-3 py-1.5 text-chalk backdrop-blur">Getting better</span>
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-9">
                <h3 id="better-title" className="display text-[clamp(2.4rem,4.4vw,3.6rem)]">I want to improve</h3>
                <ul className="mt-6 grid gap-3 border-t-2 border-chalk/15 pt-6 text-[1.02rem] text-chalk/85">
                  {better.map((t) => (
                    <li key={t} className="flex gap-2.5"><Check size={18} weight="bold" className="mt-0.5 shrink-0 text-lime" aria-hidden="true" />{t}</li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
                  <ExternalButton href={trialLink("I already play and want to improve.")} note="opens WhatsApp">Book a free trial</ExternalButton>
                  <TextLink href="#problems" className="text-chalk/85">Bring us your problem</TextLink>
                </div>
              </div>
            </article>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">

          <Reveal className="lg:col-span-8" delay={0.1}>
            <LevelFinder />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
