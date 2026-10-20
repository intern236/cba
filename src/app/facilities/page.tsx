
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
  {
    img: images.panorama,
    title: "The courts",
    body: "Seven courts laid out in one long hall under high-bay lighting, with a walkway running along the side of the courts.",
    ratio: "aspect-[16/7]",
  },
  {
    img: images.gymFloor,
    title: "Strength gym",
    body: "Free weights, benches and machines on site — used for the academy’s strength & conditioning work.",
    ratio: "aspect-[16/9]",
  },
  {
    img: images.mural,
    title: "Arrival",
    body: "A painted badminton mural marks the glass entrance. Lockers and separate changing rooms are inside.",
    ratio: "aspect-[4/3]",
  },
];

export default function FacilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Facilities & timings"
        title="Everything under one roof"
        intro="Courts to train on, a gym to get stronger, a physio when something hurts, and somewhere to sit down afterwards. The courts are also open for pay-and-play."
      >
        <div className="rounded-[22px] bg-court-900 p-4 sm:p-5 ring-1 ring-white/10">
          <OpenStatus className="text-chalk/85" />
          <p className="mt-2 text-sm leading-relaxed text-chalk/60">
            {a.hoursSummary}
          </p>
        </div>
      </PageHeader>

      {/* COURT SPECIFICATIONS */}
      <section
        aria-labelledby="spec-title"
        className="on-light bg-chalk py-14 sm:py-20 lg:py-24"
      >
        <div className="mx-auto grid max-w-[1320px] gap-8 px-4 sm:gap-12 sm:px-8 lg:grid-cols-12">
          <Reveal className="min-w-0 lg:col-span-5">
            <p className="eyebrow text-ink-soft">01 · Court spec</p>

            <h2
              id="spec-title"
              className="display mt-4 text-[clamp(2.3rem,5vw,4.4rem)]"
            >
              The numbers
            </h2>

            <p className="mt-5 max-w-[44ch] leading-relaxed text-ink-soft">
              Hudle also lists wooden and synthetic court options when you
              book — the booking page shows which courts are free for your
              slot.
            </p>
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-7" delay={0.08}>
            <dl className="border-b-2 border-ink/10">
              {spec.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[minmax(0,6.5rem)_minmax(0,1fr)] gap-3 border-t-2 border-ink/10 py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4"
                >
                  <dt className="eyebrow break-words pt-1 text-ink-soft">
                    {k}
                  </dt>

                  <dd className="min-w-0 break-words text-base font-semibold leading-relaxed sm:text-lg">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* BOOK A COURT */}
      <section
        id="book-a-court"
        aria-labelledby="book-title"
        className="on-light scroll-mt-24 bg-chalk-2 py-14 sm:py-16 lg:py-20"
      >
        <div className="mx-auto grid max-w-[1320px] gap-10 px-4 sm:px-8 lg:grid-cols-12 lg:items-center">
          <Reveal className="min-w-0 lg:col-span-6">
            <p className="eyebrow text-ink-soft">Pay &amp; play</p>

            <h2
              id="book-title"
              className="display mt-4 text-[clamp(2.3rem,5vw,4.4rem)]"
            >
              Book a court
            </h2>

            <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-ink-soft sm:text-lg">
              Not training with the academy? The courts are open for pay-and-play.
              Book an hour online, bring your racket and non-marking shoes.
              Rates vary by slot; the booking page shows the live price before
              you pay.
            </p>

            <ul className="mt-6 grid gap-3 text-ink-soft">
              {a.courtRules.map((r) => (
                <li key={r} className="flex min-w-0 items-start gap-2">
                  <Check
                    size={18}
                    weight="bold"
                    className="mt-0.5 shrink-0 text-mat-deep"
                    aria-hidden="true"
                  />

                  <span className="min-w-0 break-words">{r}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            className="min-w-0 lg:col-span-5 lg:col-start-8"
            delay={0.08}
          >
            <dl className="grid grid-cols-2 gap-x-4 gap-y-6 border-t-2 border-ink/10 pt-6 sm:gap-x-6">
              {[
                ["From", a.booking.priceFrom],
                ["Per court", "Up to 4"],
                ["Hours", "5 AM–11 PM"],
                ["Tuesdays", "Till 8 PM"],
              ].map(([k, v]) => (
                <div key={k} className="min-w-0">
                  <dt className="eyebrow text-ink-soft">{k}</dt>

                  <dd className="display mt-1 break-words text-[clamp(1.4rem,3vw,1.9rem)]">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

        <div className="mt-8 flex w-full flex-col items-end gap-2">
  <ExternalButton
    href={a.booking.secondary.url}
    variant="ghost-light"
    note="opens Playo"
    className="w-fit justify-between"
  >
    Book on Playo
  </ExternalButton>

  <ExternalButton
    href={a.booking.primary.url}
    variant="ink"
    note="opens Hudle"
    className="w-fit justify-between"
  >
    Book on Hudle
  </ExternalButton>
</div>
</Reveal>
        </div>
      </section>

      {/* SPACES AND FACILITY IMAGES */}
      <section
        aria-labelledby="spaces-title"
        className="on-light mt-8 bg-chalk pb-14 pt-6 sm:mt-10 sm:pb-20 sm:pt-8 lg:mt-12 lg:pb-24 lg:pt-10"
      >
        <h2 id="spaces-title" className="sr-only">
          Spaces
        </h2>

        <div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:gap-16 sm:px-8 lg:gap-20">
          {zigzag.map((z, i) => (
            <div
              key={z.title}
              className="grid min-w-0 gap-6 sm:gap-8 lg:grid-cols-12 lg:items-center"
            >
              <Reveal
                className={`min-w-0 lg:col-span-7 ${
                  i % 2 ? "lg:order-2 lg:col-start-6" : ""
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden rounded-2xl bg-chalk-2 sm:rounded-[24px] lg:rounded-[28px] ${
                    i === 0
                      ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/9]"
                      : i === 1
                        ? "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]"
                        : "aspect-[4/3]"
                  }`}
                >
                  <Photo
                    img={z.img}
                    sizes="(min-width: 1024px) 760px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"
                  />
                </div>
              </Reveal>

              <Reveal
                className={`min-w-0 lg:col-span-4 ${
                  i % 2
                    ? "lg:order-1 lg:col-start-1"
                    : "lg:col-start-9"
                }`}
                delay={0.08}
              >
                <p className="eyebrow text-ink-soft">
                  {String(i + 2).padStart(2, "0")}
                </p>

                <h3 className="display mt-3 text-[clamp(2rem,4vw,3.4rem)]">
                  {z.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
                  {z.body}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ON-SITE FACILITIES AND TIMINGS */}
      <section
        aria-labelledby="onsite-title"
        className="bg-court-950 py-14 text-chalk sm:py-20 lg:py-24"
      >
        <div className="mx-auto grid max-w-[1320px] gap-10 px-4 sm:gap-12 sm:px-8 lg:grid-cols-12">
          <Reveal className="min-w-0 lg:col-span-7">
            <p className="eyebrow text-mat-soft">05 · On site</p>

            <h2
              id="onsite-title"
              className="display mt-4 text-[clamp(2.3rem,5vw,4.4rem)]"
            >
              What&rsquo;s here
            </h2>

            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {a.facilities.map((f) => (
                <li
                  key={f.key}
                  className="flex min-w-0 items-start gap-3 border-t-2 border-chalk/12 py-4 sm:gap-4"
                >
                  <FacilityIcon
                    k={f.key}
                    className="!bg-court-800"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="break-words font-semibold">{f.label}</p>

                    <p className="mt-1 break-words text-sm leading-relaxed text-chalk/65">
                      {f.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-chalk/70">
              {a.amenities.map((m) => (
                <span
                  key={m}
                  className="inline-flex items-start gap-1.5"
                >
                  <Check
                    size={14}
                    weight="bold"
                    className="mt-0.5 shrink-0 text-lime"
                    aria-hidden="true"
                  />

                  <span>{m}</span>
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal
            className="min-w-0 lg:col-span-5"
            delay={0.08}
          >
            <div className="rounded-2xl bg-court-900 p-4 ring-1 ring-white/10 sm:rounded-[28px] sm:p-7">
              <h3 className="display text-[1.8rem] sm:text-[2rem]">
                Timings
              </h3>

              <div className="mt-4 min-w-0 overflow-x-auto">
                <HoursTable />
              </div>

        <div className="mt-3 flex  items-end gap-2">
  <ExternalButton
    href={a.booking.secondary.url}
    variant="ghost-dark"
    note="opens Playo"
    className="w-full justify-between"
  >
    Playo
  </ExternalButton>

  <ExternalButton
    href={a.booking.primary.url}
    note="opens Hudle"
    className="w-full justify-between"
  >
    Hudle
  </ExternalButton>
</div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
