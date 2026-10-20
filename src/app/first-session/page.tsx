import type { Metadata } from "next";
import { Backpack, Sneaker, Drop, FirstAidKit } from "@phosphor-icons/react/ssr";
import { academy, trialLink } from "@/lib/academy";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ExternalButton, TextLink } from "@/components/buttons";
import { Faq } from "@/components/faq";
import { LevelFinder } from "@/components/level-finder";

export const metadata: Metadata = {
  title: "Your first session",
  description:
    "What happens in your free first badminton session at Celestial's, Sector 104, Noida: how to book, what to bring, what the coach looks at, and what happens after. Beginners, kids and adults welcome.",
  alternates: { canonical: "/first-session/" },
};

const a = academy;

/**
 * Day one, explained (research: Barry's "What to expect"; first-visit anxiety is the main
 * barrier for beginners and for parents). The sequence below is the PROPOSED trial format —
 * the academy confirms a free trial exists, but the step-by-step running order must be
 * confirmed with the head coach (docs/DEPENDENCIES.md). Numbers are used because the order is real.
 */
const steps = [
  { t: "Book on WhatsApp", d: "Tell us the player’s age, how much they’ve played and which time suits: morning, evening or weekend. We’ll suggest a batch and a day." },
  { t: "Arrive a little early", d: "Give yourself time to change into non-marking shoes. Lockers and changing rooms are inside." },
  { t: "Warm up with the group", d: "Every session starts with a warm-up. Nobody is put on the spot." },
  { t: "The coach watches you play", d: "Grip, movement and a few rallies. That’s all the coach needs to see where you are." },
  { t: "Train at your level", d: "Join the drills at the level that fits, whether that’s a first serve or a full-court rally." },
  { t: "Talk about what’s next", d: "The coach suggests a level, a batch and a format. There’s no pressure to sign up on the day." },
];

const faqs = [
  { q: "I’ve never played. Is that OK?", a: "Yes. The Foundation level exists for complete beginners, kids and adults." },
  { q: "Am I too old, or not fit enough?", a: "No. The academy coaches adults as well as juniors, and fitness is something the training builds. Tell the coach about any injuries and they’ll adapt the session." },
  { q: "Do I need my own racket?", a: "Bring one if you have it. If you don’t, mention it when you book the trial." },
  { q: "Will I be with much better players?", a: "The coach watches you play first, then places you at the level that fits." },
  { q: "What does it cost?", a: <>The first session is free. Ask for current batch timings and fees on WhatsApp or by phone on {a.contact.phoneDisplay}.</> },
  { q: "Where is it?", a: <>{a.address.line1}, {a.address.locality}: {a.address.nearestMetro.distance} from {a.address.nearestMetro.name} metro, with parking on site. Look for the badminton mural by the glass entrance.</> },
];

export default function FirstSessionPage() {
  return (
    <>
 <PageHeader
  eyebrow="Your first session"
  title="Day one, explained"
  intro="The first session is free. Here’s exactly what happens, so the only thing you need to think about is the shuttle."
>
  <div className="rounded-[22px] bg-court-900 p-6 ring-1 ring-white/10">
    <p className="text-chalk/80">
      Kids, teens and adults. Complete beginners welcome.
    </p>

    <div className="mt-4 flex justify-end">
      <ExternalButton href={trialLink()} note="opens WhatsApp">
        Book a free trial
      </ExternalButton>
    </div>

    <p className="mt-3 text-right text-sm text-chalk/55">
      Or call {a.contact.phoneDisplay}
    </p>
  </div>
</PageHeader>

      <section aria-labelledby="steps-title" className="on-light bg-chalk py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-ink-soft">01 · How it runs</p>
            <h2 id="steps-title" className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">Six steps, no surprises</h2>
            <p className="mt-5 max-w-[40ch] text-ink-soft">From the first message to the chat afterwards.</p>
          </Reveal>
          <ol className="relative lg:col-span-7 lg:col-start-6">
            <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-[2px] bg-ink/12" />
            {steps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.04} className="relative grid grid-cols-[40px_1fr] gap-5 pb-9 last:pb-0">
                <span className={`relative z-[1] grid h-10 w-10 place-items-center rounded-full font-mono text-sm font-semibold ${i === 0 ? "bg-lime text-ink" : "bg-ink text-chalk"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1.5">
                  <h3 className="display text-[clamp(1.8rem,2.6vw,2.3rem)]">{s.t}</h3>
                  <p className="mt-2 max-w-[54ch] text-[1.05rem] leading-relaxed text-ink-soft">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="bring-title" className="bg-court-950 py-24 text-chalk">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-mat-soft">02 · What to bring</p>
            <h2 id="bring-title" className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">Four things</h2>
          </Reveal>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {[
              { I: Sneaker, t: "Non-marking shoes", d: "Required on court. Most outdoor shoes mark the surface." },
              { I: Backpack, t: "Your racket, if you have one", d: "No racket yet? Mention it when you book the trial." },
              { I: Drop, t: "Water", d: "The hall is air-conditioned, but sessions are hard work." },
              { I: FirstAidKit, t: "A heads-up on injuries", d: "Tell the coach. There’s a physio on site." },
            ].map(({ I, t, d }, i) => (
              <Reveal as="li" key={t} delay={i * 0.04} className="flex gap-4 border-t-2 border-chalk/12 pt-5">
                <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-court-800 text-lime"><I size={20} weight="bold" /></span>
                <div>
                  <p className="font-semibold">{t}</p>
                  <p className="text-chalk/65">{d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="worries-title" className="on-light bg-chalk-2 py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-ink-soft">03 · Before you come</p>
            <h2 id="worries-title" className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">The questions beginners ask</h2>
            <div className="mt-8">
              <Faq items={faqs} />
            </div>
            <TextLink href="/pathway/" className="mt-8">See where the first session leads</TextLink>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <LevelFinder id="find-your-level" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
