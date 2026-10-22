
import {
  Clock,
  Train,
  Car,
  Phone,
  WhatsappLogo,
  InstagramLogo,
} from "@phosphor-icons/react/ssr";
import { academy, trialLink } from "@/lib/academy";
import { Reveal } from "./reveal";
import { HoursTable } from "./hours-table";
import { OpenStatus } from "./open-status";
import { ExternalButton } from "./buttons";
import { LocationMap } from "../components/location-map";

export function Visit({
  headingLevel = 2,
}: {
  headingLevel?: 2 | 1;
}) {
  const a = academy;
  const H = headingLevel === 1 ? "h1" : "h2";

  const small =
    "flex min-h-[48px] items-center gap-2.5 rounded-full px-4 font-medium ring-1 ring-chalk/25 transition-colors hover:bg-chalk/[0.06] hover:ring-chalk/60";

  return (
    <section
      aria-labelledby="visit-title"
      className="bg-court-950 text-chalk"
    >
      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-mat-soft">
              Visit · Sector 104, Noida
            </p>

            <H
              id="visit-title"
              className="display mt-5 text-[clamp(3rem,6.4vw,5.8rem)]"
            >
              Come and train.
            </H>

            <address className="mt-8 max-w-[34ch] text-[1.15rem] not-italic leading-snug text-chalk/90">
              {a.address.line1},
              <br />
              {a.address.line2},
              <br />
              {a.address.locality}, {a.address.region}
            </address>

            <ul className="mt-8 grid gap-3 text-chalk/80">
              <li className="flex items-center gap-3">
                <Train
                  size={18}
                  weight="bold"
                  className="text-mat-soft"
                  aria-hidden="true"
                />
                {a.address.nearestMetro.distance} from{" "}
                {a.address.nearestMetro.name} metro station
              </li>

              <li className="flex items-center gap-3">
                <Car
                  size={18}
                  weight="bold"
                  className="text-mat-soft"
                  aria-hidden="true"
                />
                Parking available
              </li>

              <li className="flex items-center gap-3">
                <Clock
                  size={18}
                  weight="bold"
                  className="text-mat-soft"
                  aria-hidden="true"
                />
                {a.hoursSummary}
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <ExternalButton
                href={a.address.directionsUrl}
                variant="ghost-dark"
                note="opens Google Maps"
              >
                Get directions
              </ExternalButton>

              <a href={a.contact.phoneHref} className={small}>
                <Phone size={18} weight="bold" aria-hidden="true" />
                {a.contact.phoneDisplay}
              </a>

              {a.contact.whatsappUrl && (
                <a
                  href={a.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={small}
                >
                  <WhatsappLogo
                    size={18}
                    weight="bold"
                    aria-hidden="true"
                  />
                  WhatsApp
                  <span className="sr-only">
                    (opens in a new tab)
                  </span>
                </a>
              )}

              <a
                href={a.contact.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className={small}
              >
                <InstagramLogo
                  size={18}
                  weight="bold"
                  aria-hidden="true"
                />
                Instagram
                <span className="sr-only">
                  (opens in a new tab)
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="rounded-[28px] bg-court-900 p-7 ring-1 ring-white/10 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="display text-[2rem]">Hours</p>
                <OpenStatus className="text-sm text-chalk/80" />
              </div>

              <div className="mt-4">
                <HoursTable />
              </div>

              <div className="mt-6 border-t-2 border-chalk/15 pt-6 text-right">
                <p className="eyebrow text-chalk/55">
                  First session free
                </p>

                {/* Book a free trial button aligned to the right */}
                <div className="mt-4 flex justify-end">
                  <ExternalButton
                    href={trialLink()}
                    note="opens WhatsApp"
                    className="justify-between"
                  >
                    Book a free trial
                  </ExternalButton>
                </div>

                {/* <p className="mt-4 text-sm text-chalk/65">
                  Just want a court? Book on{" "}
                  <a
                    href={a.booking.primary.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-semibold text-chalk/90"
                  >
                    Hudle
                    <span className="sr-only">
                      (opens in a new tab)
                    </span>
                  </a>{" "}
                  or{" "}
                  <a
                    href={a.booking.secondary.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-semibold text-chalk/90"
                  >
                    Playo
                    <span className="sr-only">
                      (opens in a new tab)
                    </span>
                  </a>
                  .
                </p> */}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12" delay={0.12}>
          <LocationMap tone="dark" className="h-[340px] sm:h-[420px] lg:h-[460px]" />
        </Reveal>
      </div>
    </section>
  );
}
