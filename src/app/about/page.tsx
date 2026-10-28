import type { Metadata } from "next";
import Image from "next/image";
import { academy } from "@/lib/academy";
import { images } from "@/lib/images";
import { coaches, founder } from "@/lib/coaches";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { ExternalButton, TextLink } from "@/components/buttons";
import { Community } from "@/components/home/community";
import { Results } from "@/components/home/results";
// import InstagramLive from "@/components/home/instagram-feed";

export const metadata: Metadata = {
  title: {
    absolute: "About Celestial's Badminton Academy, Noida | Our Coaches",
  },
  description:
    "Founded in 2022 in Sector 104, Noida. Meet NIS and BAI-certified coaches Utkarsh Chaudhary and Siddharth Jain and the players they've trained.",
  alternates: {
    canonical: "/about/",
  },
  openGraph: {
    title: "About Celestial's Badminton Academy, Noida | Our Coaches",
    description:
      "Founded in 2022 in Sector 104, Noida. Meet NIS and BAI-certified coaches Utkarsh Chaudhary and Siddharth Jain and the players they've trained.",
    url: "/about/",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Celestial's Badminton Academy, Noida | Our Coaches",
    description:
      "Founded in 2022 in Sector 104, Noida. Meet NIS and BAI-certified coaches Utkarsh Chaudhary and Siddharth Jain and the players they've trained.",
  },
};

const a = academy;

const values = [
  "Discipline",
  "Resilience",
  "Respect",
  "Health",
  "Inclusion",
];

const facilities = [
  {
    title: "7 indoor badminton courts",
    description:
      "International-standard courts featuring BWF-approved mats or wooden flooring, in a fully air-conditioned environment.",
    number: "01",
  },
  {
    title: "Strength and conditioning",
    description:
      "Gym facilities to support fitness, movement, strength and on-court performance.",
    number: "02",
  },
  {
    title: "Physio and medical support",
    description:
      "On-site physiotherapy, a medical room and nutrition guidance to support athlete wellbeing.",
    number: "03",
  },
  {
    title: "Performance analysis",
    description:
      "Video analysis to help players review technique, identify areas for improvement and develop their game.",
    number: "04",
  },
  {
    title: "Stay and refresh",
    description:
      "Hostel accommodation, a cafeteria and steam bath facilities for players and visitors.",
    number: "05",
  },
  {
    title: "Player convenience and safety",
    description:
      "Pro shop, lockers, changing rooms, parking and CCTV facilities.",
    number: "06",
  },
];

const corporateEvents = ["Microsoft", "Adobe", "Cognizant", "BNI"];

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative overflow-hidden bg-court-950 py-20 text-chalk sm:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <Reveal>
            <h1 className="display mt-10 max-w-none text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-tight">
              About Celestial's Badminton Academy, Noida
            </h1>

            <p className="eyebrow mb-4 mt-6 text-mat normal-case">
              Where everything is possible
            </p>

            <p className="mt-8 max-w-[780px] text-base leading-relaxed text-chalk/75 sm:text-lg lg:text-xl">
              Founded in 2022 in Sector 104, Noida, we help juniors, adults and
              aspiring athletes learn, improve and compete.
            </p>

            {/* Founders */}
            <div className="mt-10 max-w-[780px]">
              <h2 className="text-sm font-semibold text-mat-soft">
                Meet the founders
              </h2>

              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                <li className="rounded-2xl bg-court-900 p-5 ring-1 ring-white/10 sm:p-6">
                  <h3 className="text-xl font-semibold text-chalk">
                    Utkarsh Chaudhary
                  </h3>
                  <p className="mt-1 text-sm text-mat-soft">
                    Co-founder &amp; Head Coach
                  </p>
                </li>

                <li className="rounded-2xl bg-court-900 p-5 ring-1 ring-white/10 sm:p-6">
                  <h3 className="text-xl font-semibold text-chalk">
                    Siddharth Jain
                  </h3>
                  <p className="mt-1 text-sm text-mat-soft">
                    Co-founder &amp; Head Trainer
                  </p>
                </li>
              </ul>
            </div>

            <p className="mt-10 max-w-[780px] text-base leading-relaxed text-chalk/75 sm:text-lg lg:text-xl">
              Noida Badminton Academy in Sector 26 is our sister academy. Both are
              led by head coach Utkarsh Chaudhary, so players at either centre follow
              the same coaching method and often train and compete together.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Coaching Team */}
      <section
        aria-labelledby="coaches-title"
        className="on-light bg-chalk-2 py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow flex items-center gap-4 text-mat">
              <span
                className="h-[2px] w-10 bg-ink/20"
                aria-hidden="true"
              />
              THE TEAM
            </p>

            <h2
              id="coaches-title"
              className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)] leading-tight"
            >
              Meet our coaches
            </h2>
          </Reveal>

          {/* Co-founder and head coach profiles */}
          <div className="mt-10 mb-10px grid gap-6 lg:grid-cols-2">
            <Reveal
              className="grid gap-6 overflow-hidden rounded-[24px] border border-ink/10 bg-chalk p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-7 md:grid-cols-[200px_1fr] md:items-center xl:grid-cols-[220px_1fr]"
              delay={0.08}
            >
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-[18px] bg-chalk-2 md:mx-0 md:max-w-none">
                <Image
                  src="/images/Utkarsh.jpeg"
                  alt="Utkarsh Chaudhary, co-founder and head coach"
                  fill
                  sizes="(min-width:1280px) 220px, (min-width:768px) 200px, 260px"
                  className="object-cover object-top"
                />
              </div>

              <div>
                <p className="eyebrow text-mat">
                  CO-FOUNDER · HEAD COACH
                </p>

                <h3 className="display mt-4 text-3xl leading-tight sm:text-4xl">
                  Utkarsh Chaudhary
                </h3>

                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  NIS and BAI certified, BWF Shuttle Time trained, and a
                  former international-level player with over 10 years of
                  coaching experience.
                </p>

                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  Utkarsh has trained more than 1,000 children, many of whom
                  now compete at state and inter-state level.
                </p>
              </div>
            </Reveal>
            {/* Siddharth Jain */}
            <Reveal
              className="grid gap-6 overflow-hidden rounded-[24px] border border-ink/10 bg-chalk p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-7 md:grid-cols-[200px_1fr] md:items-center xl:grid-cols-[220px_1fr]"
              delay={0.04}
            >
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-[18px] md:mx-0 md:max-w-none">
                <Image
                  src="/images/Siddharth.jpeg"
                  alt="Siddharth Jain, co-founder and head trainer"
                  fill
                  sizes="(min-width:1280px) 220px, (min-width:768px) 200px, 260px"
                  className="object-cover object-top"
                />
              </div>

              <div>
                <p className="eyebrow text-mat">
                  CO-FOUNDER · HEAD TRAINER
                </p>

                <h3 className="display mt-4 text-3xl leading-tight sm:text-4xl">
                  Siddharth Jain
                </h3>

                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  NIS and BAI certified, with over 10 years of coaching
                  experience.
                </p>

                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  Siddharth has contributed to training more than 1,000
                  children alongside the coaching team, helping young
                  players progress towards state and inter-state competition.
                </p>
              </div>
            </Reveal>

            {/* Utkarsh Chaudhary */}

          </div>

          {/* Founder Note */}
          {founder && (
            <Reveal className="mt-8 max-w-[60ch] border-l-2 border-mat pl-6">
              <p className="text-lg leading-relaxed">{founder.note}</p>

              <p className="eyebrow mt-3 text-ink-soft">
                {founder.name} · {founder.title}
              </p>
            </Reveal>
          )}

          {/* Additional Coaches */}
          {coaches.length > 0 ? (
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {coaches.map((c) => (
                <li
                  key={c.name}
                  className="group rounded-[22px] border border-ink/10 bg-chalk p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {c.photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.photo}
                      alt={`${c.name}, ${c.role}`}
                      width={800}
                      height={1000}
                      loading="lazy"
                      className="aspect-[4/5] w-full rounded-[18px] object-cover"
                    />
                  )}

                  <p className="display mt-4 text-[1.8rem] transition-colors duration-200 group-hover:text-mat">
                    {c.name}
                  </p>

                  <p className="mt-1 text-ink-soft">{c.role}</p>

                  <p className="eyebrow mt-3 text-mat">{c.credentials}</p>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal
              className="mt-10 grid gap-8 rounded-[28px] bg-court-950 p-8 text-chalk sm:p-10 lg:grid-cols-12 lg:items-center"
              delay={0.06}
            >
              <p className="display text-[clamp(2rem,3.6vw,3rem)] leading-tight lg:col-span-7">
                The best introduction is on court. Book a free trial and train
                with the coaching team before you decide.
              </p>

              <div className="flex w-full flex-col items-end gap-2 lg:col-span-5">
                <TextLink
                  href="/pathway/"
                  className="flex !w-full max-w-[205px] items-center justify-center rounded-full border border-chalk/30 px-5 py-3 text-center text-chalk"
                >
                  See the pathway
                </TextLink>

                {a.contact.whatsappUrl && (
                  <ExternalButton
                    href={a.contact.phoneHref}
                    note="opens WhatsApp"
                    className="!flex w-full !max-w-[200px] !justify-center"
                  >
                    Book a free trial
                  </ExternalButton>
                )}
              </div>
            </Reveal>
          )}
        </div>

        {/* <InstagramLive /> */}
      </section>

      {/* Sports Philosophy */}
      <section
        aria-labelledby="philosophy-title"
        className="on-light bg-chalk-2 py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto grid w-full max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-4 text-mat">
              <span
                className="h-[2px] w-10 bg-ink/20"
                aria-hidden="true"
              />
              MORE THAN MEDALS
            </p>

            <h2
              id="philosophy-title"
              className="display mt-5 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight"
            >
              Why we started: every child should play a sport
            </h2>

            <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-ink-soft sm:text-xl">
              Medals and a sports career are great, but they aren't the only
              goal. Children who play early grow up disciplined, resilient and
              respectful, and become better members of society.
            </p>
          </Reveal>

          <Reveal
            className="lg:col-span-4 lg:col-start-9"
            delay={0.08}
          >
            <div className="rounded-[24px] border border-ink/10 bg-chalk p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8">
              <p className="eyebrow text-ink-soft">THE VALUES WE BUILD</p>

              <ul className="mt-6 space-y-4">
                {values.map((value, index) => (
                  <li
                    key={value}
                    className="group flex items-center gap-4 border-b border-ink/10 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-mat">
                      0{index + 1}
                    </span>

                    <span className="display text-2xl transition-colors duration-200 group-hover:text-mat">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Infrastructure */}
      <section
        aria-labelledby="infrastructure-title"
        className="on-light bg-chalk py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow flex items-center gap-4 text-mat">
              <span
                className="h-[2px] w-10 bg-ink/20"
                aria-hidden="true"
              />
              BUILT FOR THE GAME
            </p>

            <h2
              id="infrastructure-title"
              className="display mt-4 max-w-[950px] text-[clamp(2.6rem,5vw,4.8rem)] leading-[1.02] tracking-tight"
            >
              A complete badminton complex in Sector 104
            </h2>

            <p className="mt-6 max-w-[760px] text-lg leading-relaxed text-ink-soft sm:text-xl">
              Celestial's is a dedicated badminton complex in Sector 104,
              Noida, bringing courts, training facilities, recovery support
              and player amenities together in one place.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility, index) => (
              <Reveal
                key={facility.number}
                delay={index * 0.05}
                className="group rounded-[24px] border border-ink/10 bg-chalk p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-mat/40 hover:shadow-lg sm:p-8"
              >
                <p className="eyebrow inline-flex rounded-full bg-chalk-2 px-3 py-2 text-mat">
                  {facility.number}
                </p>

                <h3 className="display mt-5 text-2xl leading-tight transition-colors duration-300 group-hover:text-mat sm:text-3xl">
                  {facility.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  {facility.description}
                </p>
              </Reveal>
            ))}
          </div>

          {/* International Exchange */}
          <Reveal
            className="mt-8 rounded-[28px] bg-court-950 p-7 text-chalk shadow-sm sm:p-10 lg:p-12"
            delay={0.08}
          >
            <p className="eyebrow text-mat">INTERNATIONAL EXCHANGE</p>

            <h3 className="display mt-4 text-[clamp(2rem,4vw,3.5rem)] leading-tight">
              Learning beyond borders.
            </h3>

            <p className="mt-5 max-w-[760px] text-lg leading-relaxed text-chalk/75">
              Through an {a.coaching.exchange.label.toLowerCase()} with{" "}
              {a.coaching.exchange.partner} in {a.coaching.exchange.country},
              academy players get exposure to coaching approaches and
              badminton development beyond India.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Student Statistics */}
      <section
        aria-labelledby="numbers-title"
        className="bg-court-950 py-20 text-chalk sm:py-24 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <div className="overflow-hidden rounded-[28px] shadow-lg">
              <div className="aspect-[4/3]">
                <Photo
                  img={images.group}
                  sizes="(min-width:1024px) 640px, 100vw"
                />
              </div>
            </div>
          </Reveal>

          <Reveal
            className="lg:col-span-5 lg:col-start-8"
            delay={0.08}
          >
            <p className="eyebrow text-mat">OUR COMMUNITY</p>

            <h2
              id="numbers-title"
              className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)] leading-tight"
            >
              {a.studentsTrained} players trained at Celestial's
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-chalk/75">
              have trained at the academy — juniors, adults and competitive
              players. Some have gone on to play national tournaments.
            </p>

            <p className="mt-5 text-lg leading-relaxed text-chalk/75">
              Our approach combines on-court coaching with the facilities and
              support players need to keep developing.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Player Achievements */}
      <Results id="achievements-title" />

      {/* Community */}
      <Community />

      {/* Corporate Tournaments */}
      <section
        aria-labelledby="corporate-title"
        className="on-light bg-chalk py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow flex items-center gap-4 text-mat">
              <span
                className="h-[2px] w-10 bg-ink/20"
                aria-hidden="true"
              />
              BEYOND THE COURT
            </p>

            <h2
              id="corporate-title"
              className="display mt-4 max-w-[950px] text-[clamp(2.6rem,5vw,4.8rem)] leading-[1.02] tracking-tight"
            >
              Tournaments we've hosted
            </h2>

            <p className="mt-6 max-w-[760px] text-lg leading-relaxed text-ink-soft">
              Celestial's hosts corporate badminton tournaments that bring
              colleagues and communities together through competition,
              teamwork and a shared love of the game.
            </p>
          </Reveal>

          <Reveal
            className="mt-10 rounded-[28px] border border-ink/10 bg-chalk-2 p-6 shadow-sm sm:p-10"
            delay={0.08}
          >
            <p className="eyebrow text-ink-soft">CORPORATE TOURNAMENTS</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {corporateEvents.map((company) => (
                <span
                  key={company}
                  className="rounded-full border border-ink/15 bg-chalk px-5 py-3 text-sm font-semibold transition-all duration-200 hover:border-mat/50 hover:bg-court-950 hover:text-chalk sm:text-base"
                >
                  {company}
                </span>
              ))}
            </div>

            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              We have also hosted the Uttar Pradesh State Championship
              tournament and the Malhotra Badminton Cup in May 2025.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}