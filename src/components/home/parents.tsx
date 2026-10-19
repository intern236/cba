import { academy, trialLink } from "@/lib/academy";
import { images } from "@/lib/images";
import { Photo } from "../photo";
import { SectionHead } from "../section-head";
import { Reveal } from "../reveal";
import { ExternalButton, TextLink } from "../buttons";

/**
 * Parents choose for someone else, so they need reassurance before persuasion. Every answer
 * below is a confirmed fact (academy.ts): assessments and reviews, physio + medical room,
 * CCTV in the hall (Playo amenities), morning/evening/weekend batches, free trial, hostel,
 * BATTS exchange. Coach ratio, minimum age and safeguarding policy are NOT claimed —
 * they're pending from the academy (docs/DEPENDENCIES.md).
 */
export function Parents() {
  const a = academy;
  const qa = [
    { q: "Will I see progress?", a: "Periodic assessments and individual reviews mean progress is measured, not guessed, and you hear about it." },
    { q: "Will it fit around school?", a: "Batches run in the morning, in the evening and at weekends." },
    { q: "Is someone looking after them?", a: "There’s a physiotherapist and a medical room on site, and CCTV in the hall." },
    { q: "What if they don’t enjoy it?", a: "The first session is free. Let them try it before you commit to anything." },
    {
      q: "What if they get serious?",
      a: `The pathway runs to tournament level, with a hostel for training players and an exchange with ${a.coaching.exchange.partner}, ${a.coaching.exchange.country}.`,
    },
  ];
  return (
    <section aria-labelledby="parents-title" className="on-light bg-chalk-2 py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead
            index="05"
            label="For parents"
            id="parents-title"
            title="The questions parents ask first"
            intro="You’re choosing for someone else. Here are straight answers to what most parents want to know before a first session."
          />
          <Reveal className="mt-10" delay={0.06}>
            <div className="aspect-[4/3] overflow-hidden rounded-[24px] bg-chalk">
              <Photo img={images.group} sizes="(min-width:1024px) 520px, 100vw" />
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <dl className="border-b-2 border-ink/10">
            {qa.map((x, i) => (
              <Reveal key={x.q} delay={i * 0.04} className="grid gap-2 border-t-2 border-ink/10 py-6 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8">
                <dt className="display text-[1.7rem] leading-[0.95]">{x.q}</dt>
                <dd className="text-[1.05rem] leading-relaxed text-ink-soft">{x.a}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ExternalButton href={trialLink("I'm a parent, booking for my child.")} variant="ink" note="opens WhatsApp">Book a free trial for your child</ExternalButton>
            <TextLink href="/first-session/">What happens in the first session</TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
