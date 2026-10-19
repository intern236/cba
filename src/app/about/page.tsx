
import type { Metadata } from "next";
import { academy } from "@/lib/academy";
import { images } from "@/lib/images";
import { coaches, founder } from "@/lib/coaches";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { ExternalButton, TextLink } from "@/components/buttons";
import { Community } from "@/components/home/community";

export const metadata: Metadata = {
  title: "About Celestial's Badminton Academy",
  description:
    "Discover Celestial's Badminton Academy in Sector 104, Noida: seven indoor badminton courts, athlete support facilities, competitive achievements, professional coaching and corporate tournaments.",
  alternates: {
    canonical: "/about/",
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

const achievements = [
  {
    name: "Parth Aggarwal",
    result: "National silver medal",
    event: "Mixed Doubles · Deaf Nationals",
    date: "May 2026",
  },
  {
    name: "Parth Aggarwal",
    result: "UP State Champion",
    event: "Singles and Doubles",
    date: "March 2026",
  },
  {
    name: "Dr. Ketan",
    result: "Men's Singles champion",
    event: "National Doctors Championship",
    date: "March 2026",
  },
  {
    name: "Siddhant Thakur",
    result: "India Top 10",
    event: "U-15 Boys Doubles",
    date: "July 2025",
  },
  {
    name: "Sneha Maurya",
    result: "India Top 15",
    event: "U-17 Girls Doubles",
    date: "December 2025",
  },
  {
    name: "Kaira",
    result: "Silver medal",
    event: "Delhi State Championship",
    date: "October 2025",
  },
  {
    name: "Lakshita",
    result: "Bronze medal",
    event: "Delhi State Championship",
    date: "October 2025",
  },
  {
    name: "Vastal",
    result: "Main draw qualification",
    event: "All India Sub-Junior Ranking · U-15",
    date: "February 2026",
  },
  {
    name: "Akshita",
    result: "3rd place",
    event: "U-11 Girls Singles · PNB MetLife JBC",
    date: "November 2023",
  },
  {
    name: "Dr. Ketan",
    result: "Runner-up",
    event: "UP State Ranking · 35+",
    date: "October 2026",
  },
];

const corporateEvents = [
  "Microsoft",
  "Adobe",
  "Cognizant",
  "BNI",
];

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative overflow-hidden bg-court-950 py-20 text-chalk sm:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <Reveal>
            <p className="eyebrow mb-4 mt-[13px] text-mat">
              WHERE EVERYTHING IS POSSIBLE
            </p>

            <h1 className="display max-w-none text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-tight">
              CELESTIAL'S BADMINTON ACADEMY
            </h1>

            <p className="mt-8 max-w-[780px] text-base leading-relaxed text-chalk/75 sm:text-lg lg:text-xl">
              Founded in 2022 in Sector 104, Noida, we help juniors,
              adults and aspiring athletes learn, improve and compete.
              <br className="hidden sm:block" />{" "}
              Our sister academy, Noida Badminton Academy in Sector 26,
              shares the same head coach.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sports Philosophy */}
      <section
        aria-labelledby="philosophy-title"
        className="on-light bg-chalk-2 py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto grid w-full max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-mat">MORE THAN MEDALS</p>

            <h2
              id="philosophy-title"
              className="display mt-5 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight"
            >
              Every child should play a sport.
            </h2>

            <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-ink-soft sm:text-xl">
              Medals and a sports career are great, but they aren't the
              only goal. Children who play early grow up disciplined,
              resilient and respectful, and become better members of society.
            </p>
          </Reveal>

          <Reveal
            className="lg:col-span-4 lg:col-start-9"
            delay={0.08}
          >
            <div className="rounded-[24px] border border-ink/10 bg-chalk p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8">
              <p className="eyebrow text-ink-soft">
                THE VALUES WE BUILD
              </p>

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
            <p className="eyebrow text-mat">BUILT FOR THE GAME</p>

            <h2
              id="infrastructure-title"
              className="display mt-4 max-w-[950px] text-[clamp(2.6rem,5vw,4.8rem)] leading-[1.02] tracking-tight"
            >
              More than courts.
              <br />
              A complete badminton complex.
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
            <p className="eyebrow text-mat">
              INTERNATIONAL EXCHANGE
            </p>

            <h3 className="display mt-4 text-[clamp(2rem,4vw,3.5rem)] leading-tight">
              Learning beyond borders.
            </h3>

            <p className="mt-5 max-w-[760px] text-lg leading-relaxed text-chalk/75">
              Through an {a.coaching.exchange.label.toLowerCase()} with{" "}
              {a.coaching.exchange.partner} in{" "}
              {a.coaching.exchange.country}, academy players get exposure
              to coaching approaches and badminton development beyond India.
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
            <p className="eyebrow text-mat">
              OUR COMMUNITY
            </p>

            <h2
              id="numbers-title"
              className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)] leading-tight"
            >
              {a.studentsTrained} students
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-chalk/75">
              have trained at the academy — juniors, adults and competitive
              players. Some have gone on to play national tournaments.
            </p>

            <p className="mt-5 text-lg leading-relaxed text-chalk/75">
              Our approach combines on-court coaching with the facilities
              and support players need to keep developing.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Player Achievements */}
      <section
        aria-labelledby="achievements-title"
        className="on-light bg-chalk-2 py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-mat">
              PROGRESS THAT COUNTS
            </p>

            <h2
              id="achievements-title"
              className="display mt-4 max-w-[950px] text-[clamp(2.6rem,5vw,4.8rem)] leading-[1.02] tracking-tight"
            >
              Hard work.
              <br />
              Results on court.
            </h2>

            <p className="mt-6 max-w-[720px] text-lg leading-relaxed text-ink-soft">
              From national rankings and championship medals to state-level
              titles, our players continue to make progress across age groups
              and competition categories.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => (
              <Reveal
                key={`${achievement.name}-${achievement.event}`}
                delay={(index % 3) * 0.05}
                className="group flex flex-col rounded-[24px] border border-ink/10 bg-chalk p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-mat/40 hover:shadow-lg sm:p-7"
              >
                <p className="eyebrow inline-flex w-fit rounded-full bg-chalk-2 px-3 py-2 text-mat">
                  {achievement.date}
                </p>

                <h3 className="display mt-5 text-2xl leading-tight transition-colors duration-300 group-hover:text-mat sm:text-3xl">
                  {achievement.name}
                </h3>

                <p className="mt-3 text-lg font-semibold leading-snug text-ink">
                  {achievement.result}
                </p>

                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {achievement.event}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Team Selection */}
          <Reveal
            className="mt-8 rounded-[28px] bg-court-950 p-7 text-chalk shadow-sm sm:p-10 lg:p-12"
            delay={0.08}
          >
            <p className="eyebrow text-mat">
              TEAM ACHIEVEMENT
            </p>

            <h3 className="display mt-4 max-w-[850px] text-3xl leading-tight sm:text-4xl">
              8 players selected for UP State Mini Championships
            </h3>

            <p className="mt-4 max-w-[760px] text-base leading-relaxed text-chalk/75 sm:text-lg">
              Eight U-11 players were selected for the UP State Mini
              Championships following trials held at Celestial's in
              October 2026.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Community */}
      <Community />

      {/* Corporate Tournaments */}
      <section
        aria-labelledby="corporate-title"
        className="on-light bg-chalk py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-mat">
              BEYOND THE COURT
            </p>

            <h2
              id="corporate-title"
              className="display mt-4 max-w-[950px] text-[clamp(2.6rem,5vw,4.8rem)] leading-[1.02] tracking-tight"
            >
              Bringing teams together through sport.
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
            <p className="eyebrow text-ink-soft">
              CORPORATE TOURNAMENTS
            </p>

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

      {/* Coaching Team */}
      <section
        aria-labelledby="coaches-title"
        className="on-light bg-chalk-2 py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-ink-soft">
              THE TEAM
            </p>

            <h2
              id="coaches-title"
              className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)] leading-tight"
            >
              Meet the coaches
            </h2>
          </Reveal>

          {/* Co-Founder Profiles */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal className="grid gap-6 overflow-hidden rounded-[24px] border border-ink/10 bg-chalk p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-7 md:grid-cols-[1fr_0.8fr] md:items-center">
              <div>
                <p className="eyebrow text-mat">
                  CO-FOUNDER · HEAD COACH
                </p>

                <h3 className="display mt-4 text-3xl leading-tight sm:text-4xl">
                  Utkarsh Chaudhary
                </h3>

                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  NIS and BAI certified, BWF Shuttle Time trained, and a
                  former international-level player.
                </p>

                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  With over 10 years of coaching experience, Utkarsh has
                  helped train more than 1,000 children, many of whom now
                  compete at state and inter-state levels.
                </p>
              </div>

              <div
                className="flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-[18px] border border-dashed border-ink/20 bg-chalk-2 transition-colors duration-300 hover:border-mat/60"
                aria-label="Utkarsh Chaudhary photo placeholder"
              >
                <div className="px-4 text-center">
                  <p className="text-3xl text-ink-soft/50">+</p>

                  <p className="eyebrow mt-3 text-ink-soft">
                    ADD COACH PHOTO
                  </p>

                  <p className="mt-2 text-sm text-ink-soft">
                    Original high-resolution image
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal
              className="grid gap-6 overflow-hidden rounded-[24px] border border-ink/10 bg-chalk p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-7 md:grid-cols-[1fr_0.8fr] md:items-center"
              delay={0.08}
            >
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

              <div
                className="flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-[18px] border border-dashed border-ink/20 bg-chalk-2 transition-colors duration-300 hover:border-mat/60"
                aria-label="Siddharth Jain photo placeholder"
              >
                <div className="px-4 text-center">
                  <p className="text-3xl text-ink-soft/50">+</p>

                  <p className="eyebrow mt-3 text-ink-soft">
                    ADD COACH PHOTO
                  </p>

                  <p className="mt-2 text-sm text-ink-soft">
                    Photo and bio to be provided
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Founder Note */}
          {founder && (
            <Reveal className="mt-8 max-w-[60ch] border-l-2 border-mat pl-6">
              <p className="text-lg leading-relaxed">
                {founder.note}
              </p>

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

                  <p className="eyebrow mt-3 text-mat">
                    {c.credentials}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal
              className="mt-10 grid gap-8 rounded-[28px] bg-court-950 p-8 text-chalk sm:p-10 lg:grid-cols-12 lg:items-center"
              delay={0.06}
            >
              <p className="display text-[clamp(2rem,3.6vw,3rem)] leading-tight lg:col-span-7">
                The best introduction is on court. Book a free trial and
                train with the coaching team before you decide.
              </p>

              <div className="flex flex-wrap items-center gap-4 lg:col-span-5 lg:justify-end">
                {a.contact.whatsappUrl && (
                  <ExternalButton
                    href={a.contact.whatsappUrl}
                    note="opens WhatsApp"
                  >
                    Book a free trial
                  </ExternalButton>
                )}

                <TextLink href="/pathway/" className="text-chalk">
                  See the pathway
                </TextLink>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
