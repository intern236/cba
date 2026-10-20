import { academy } from "@/lib/academy";
import { Reveal } from "../reveal";
import { ExternalButton } from "../buttons";

/**
 * Court booking stays on the homepage (client decision, 16 Oct 2026) but as a secondary
 * route: one compact band near the end, labelled hand-offs to Hudle/Playo, facts first
 * (research: Rocket Padel hand-off; show price and rules before the redirect).
 */
export function BookCourt() {
  const a = academy;
  return (
    <section aria-labelledby="court-title" className="on-light bg-mat py-14 text-ink sm:py-16">
      <Reveal className="mx-auto grid max-w-[1320px] gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow text-ink">Pay &amp; play</p>
          <h2 id="court-title" className="display mt-3 text-[clamp(2.3rem,4.4vw,3.6rem)]">Just want a game? Book a court.</h2>
          <p className="mt-4 max-w-[60ch] text-[1.05rem] leading-relaxed text-ink">
            {a.courts.count} air-conditioned indoor courts, {a.hoursSummary.replace("Daily ", "daily ")}. From {a.booking.priceFrom} a slot, up to 4
            players per court, non-marking shoes required. Rates vary by slot; the booking page shows the live price.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
          <ExternalButton href={a.booking.secondary.url} variant="ghost-light" note="opens Playo">Book on Playo</ExternalButton>
           <ExternalButton href={a.booking.primary.url} variant="ink" note="opens Hudle">Book on Hudle</ExternalButton>
       
        </div>
      </Reveal>
    </section>
  );
}
