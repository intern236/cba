import type { Metadata } from "next";
import { Check } from "@phosphor-icons/react/ssr";
import { academy } from "@/lib/academy";
import { images } from "@/lib/images";
import { PageHeader } from "@/components/page-header";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { HoursTable } from "@/components/hours-table";
import { OpenStatus } from "@/components/open-status";
import { ExternalButton } from "@/components/buttons";
import { FacilityIcon } from "@/components/facility-icon";

export const metadata: Metadata = {
  title: "Facilities & timings",
  description:
    "Where the academy trains: seven air-conditioned indoor PVC badminton courts, a strength gym, physio and medical room, steam bath, lockers, cafeteria, pro shop and hostel. Open 5 AM – 11 PM in Sector 104, Noida.",
  alternates: { canonical: "/facilities/" },
};

const a = academy;

const spec = [
  ["Courts", `${a.courts.count} indoor courts`],
  ["Surface", "PVC court mats"],
  ["Climate", "Fully air-conditioned hall"],
  ["Booking", `From ${a.booking.priceFrom} per slot on Hudle or Playo`],
  ["Per court", "Up to 4 players per booking"],
  ["Footwear", "Non-marking shoes compulsory"],
];

const zigzag = [
  { img: images.panorama, title: "The courts", body: "Seven courts laid out in one long hall under high-bay lighting, with a walkway running along the side of the courts.", ratio: "aspect-[16/7]" },
  { img: images.gymFloor, title: "Strength gym", body: "Free weights, benches and machines on site — used for the academy’s strength & conditioning work.", ratio: "aspect-[16/9]" },
  { img: images.mural, title: "Arrival", body: "A painted badminton mural marks the glass entrance. Lockers and separate changing rooms are inside.", ratio: "aspect-[4/3]" },
];

export default function FacilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Facilities & timings"
        title="Everything under one roof"
        intro="Courts to train on, a gym to get stronger, a physio when something hurts, and somewhere to sit down afterwards. The courts are also open for pay-and-play."
      >
        <div className="rounded-[22px] bg-court-900 p-5 ring-1 ring-white/10">
          <OpenStatus className="text-chalk/85" />
          <p className="mt-2 text-sm text-chalk/60">{a.hoursSummary}</p>
        </div>
      </PageHeader>

      <section aria-labelledby="spec-title" className="on-light bg-chalk py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-ink-soft">01 · Court spec</p>
            <h2 id="spec-title" className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">The numbers</h2>
            <p className="mt-5 max-w-[44ch] text-ink-soft">
              Hudle also lists wooden and synthetic court options when you book — the booking page shows which courts are free for your slot.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <dl className="border-b-2 border-ink/10">
              {spec.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 border-t-2 border-ink/10 py-4 sm:grid-cols-[11rem_1fr]">
                  <dt className="eyebrow pt-1 text-ink-soft">{k}</dt>
                  <dd className="text-lg font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* BOOK A COURT — moved here from /programs in revision 2 (academy-first) */}
      <section id="book-a-court" aria-labelledby="book-title" className="on-light scroll-mt-24 bg-chalk-2 py-20">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-ink-soft">Pay &amp; play</p>
            <h2 id="book-title" className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">Book a court</h2>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
              Not training with the academy? The courts are open for pay-and-play. Book an hour online, bring your racket and non-marking shoes.
              Rates vary by slot; the booking page shows the live price before you pay.
            </p>
            <ul className="mt-6 grid gap-2 text-ink-soft">
              {a.courtRules.map((r) => (
                <li key={r} className="flex gap-2"><Check size={18} weight="bold" className="mt-0.5 text-mat-deep" aria-hidden="true" />{r}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
            <dl className="grid grid-cols-2 gap-6 border-t-2 border-ink/10 pt-6">
              {[
                ["From", a.booking.priceFrom],
                ["Per court", "Up to 4"],
                ["Hours", "5 AM–11 PM"],
                ["Tuesdays", "Till 8 PM"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow text-ink-soft">{k}</dt>
                  <dd className="display mt-1 text-[1.9rem]">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <ExternalButton href={a.booking.primary.url} variant="ink" note="opens Hudle">Book on Hudle</ExternalButton>
              <ExternalButton href={a.booking.secondary.url} variant="ghost-light" note="opens Playo">Book on Playo</ExternalButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="spaces-title" className="on-light bg-chalk pb-24">
        <h2 id="spaces-title" className="sr-only">Spaces</h2>
        <div className="mx-auto grid max-w-[1320px] gap-20 px-5 sm:px-8">
          {zigzag.map((z, i) => (
            <div key={z.title} className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <Reveal className={`lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`}>
                <div className={`${z.ratio} overflow-hidden rounded-[28px] bg-chalk-2`}>
                  <Photo img={z.img} sizes="(min-width:1024px) 760px, 100vw" />
                </div>
              </Reveal>
              <Reveal className={`lg:col-span-4 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`} delay={0.08}>
                <p className="eyebrow text-ink-soft">0{i + 2}</p>
                <h3 className="display mt-3 text-[clamp(2.4rem,4vw,3.4rem)]">{z.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">{z.body}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="onsite-title" className="bg-court-950 py-24 text-chalk">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-mat-soft">05 · On site</p>
            <h2 id="onsite-title" className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">What&rsquo;s here</h2>
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {a.facilities.map((f) => (
                <li key={f.key} className="flex items-start gap-4 border-t-2 border-chalk/12 py-4">
                  <FacilityIcon k={f.key} className="!bg-court-800" />
                  <div>
                    <p className="font-semibold">{f.label}</p>
                    <p className="text-sm text-chalk/65">{f.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-chalk/70">
              {a.amenities.map((m) => (
                <span key={m} className="inline-flex items-center gap-1.5"><Check size={14} weight="bold" className="text-lime" aria-hidden="true" />{m}</span>
              ))}
            </p>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.08}>
            <div className="rounded-[28px] bg-court-900 p-7 ring-1 ring-white/10">
              <h3 className="display text-[2rem]">Timings</h3>
              <div className="mt-4"><HoursTable /></div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <ExternalButton href={a.booking.primary.url} note="opens Hudle" className="justify-between">Hudle</ExternalButton>
                <ExternalButton href={a.booking.secondary.url} variant="ghost-dark" note="opens Playo" className="justify-between">Playo</ExternalButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
