import type { Metadata } from "next";
import { academy } from "@/lib/academy";
import { images } from "@/lib/images";
import { coaches, founder } from "@/lib/coaches";
import { PageHeader } from "@/components/page-header";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { ExternalButton, TextLink } from "@/components/buttons";
import { Community } from "@/components/home/community";

export const metadata: Metadata = {
  title: "About the academy",
  description:
    "Celestial's Badminton Academy in Sector 104, Noida: a badminton complex for aspiring and professional players, with coaching, strength & conditioning, physio support and an exchange with BATTS Athletics Academy, Canada.",
  alternates: { canonical: "/about/" },
};

const a = academy;

const goals = [
  { k: "Story", t: "A complex built around one sport", d: "Celestial’s was set up in Sector 104, Noida as a badminton complex for both aspiring and professional players — courts, coaching and the support around them in one place." },
  { k: "Mission", t: "Every player, whatever their age or background", d: "Help each player reach their potential, whether that means learning the basics, playing for fitness or competing at national level." },
  { k: "Goals", t: "Look after the whole athlete", d: "Pair coaching with strength & conditioning, periodic assessments, video analysis and physio care, so players improve and stay fit to play." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Celestial’s"
        title="Courts first. Players always."
        intro="A badminton complex in Sector 104, Noida, for juniors starting out, adults who play for the love of it and athletes chasing tournaments."
      />

      <section aria-labelledby="story-title" className="on-light bg-chalk py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <h2 id="story-title" className="sr-only">Story, mission and goals</h2>
          <ol className="border-b-2 border-ink/10">
            {goals.map((g, i) => (
              <Reveal as="li" key={g.k} delay={i * 0.06} className="grid gap-4 border-t-2 border-ink/10 py-10 lg:grid-cols-12">
                <p className="eyebrow text-ink-soft lg:col-span-2">0{i + 1} · {g.k}</p>
                <h3 className="display text-[clamp(2.2rem,4vw,3.4rem)] lg:col-span-5">{g.t}</h3>
                <p className="max-w-[52ch] text-lg leading-relaxed text-ink-soft lg:col-span-5">{g.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="numbers-title" className="bg-court-950 py-24 text-chalk">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden rounded-[28px]">
              <Photo img={images.group} sizes="(min-width:1024px) 640px, 100vw" />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
            <h2 id="numbers-title" className="display text-[clamp(2.6rem,5vw,4.4rem)]">{a.studentsTrained} students</h2>
            <p className="mt-5 text-lg leading-relaxed text-chalk/75">
              have trained at the academy — juniors, adults and competitive players. Some have gone on to play national tournaments.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-chalk/75">
              Through an {a.coaching.exchange.label.toLowerCase()} with {a.coaching.exchange.partner} in {a.coaching.exchange.country}, academy players
              also get a look at how the game is coached abroad.
            </p>
          </Reveal>
        </div>
      </section>

      <Community />

      <section aria-labelledby="coaches-title" className="on-light bg-chalk-2 py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-ink-soft">The team</p>
            <h2 id="coaches-title" className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">Meet the coaches</h2>
          </Reveal>
          {founder && (
            <Reveal className="mt-8 max-w-[60ch] border-l-2 border-mat pl-6">
              <p className="text-lg leading-relaxed">{founder.note}</p>
              <p className="eyebrow mt-3 text-ink-soft">{founder.name} · {founder.title}</p>
            </Reveal>
          )}
          {coaches.length > 0 ? (
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {coaches.map((c) => (
                <li key={c.name}>
                  {c.photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.photo} alt={`${c.name}, ${c.role}`} width={800} height={1000} loading="lazy" className="aspect-[4/5] w-full rounded-[22px] object-cover" />
                  )}
                  <p className="display mt-4 text-[1.8rem]">{c.name}</p>
                  <p className="text-ink-soft">{c.role}</p>
                  <p className="eyebrow mt-2 text-mat">{c.credentials}</p>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal className="mt-10 grid gap-8 rounded-[28px] bg-court-950 p-8 text-chalk sm:p-10 lg:grid-cols-12 lg:items-center" delay={0.06}>
              <p className="display text-[clamp(2rem,3.6vw,3rem)] lg:col-span-7">
                The best introduction is on court. Book a free trial and train with the coaching team before you decide.
              </p>
              <div className="flex flex-wrap items-center gap-4 lg:col-span-5 lg:justify-end">
                {a.contact.whatsappUrl && <ExternalButton href={a.contact.whatsappUrl} note="opens WhatsApp">Book a free trial</ExternalButton>}
                <TextLink href="/pathway/" className="text-chalk">See the pathway</TextLink>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
