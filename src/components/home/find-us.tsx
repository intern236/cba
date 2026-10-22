import { Clock, Train, Car, Phone } from "@phosphor-icons/react/ssr";
import { academy } from "@/lib/academy";
import { Reveal } from "../reveal";
import { ExternalButton } from "../buttons";
import { LocationMap } from "../location-map";

/**
 * Homepage "Find us": address, Google Map and directions, last before the footer.
 * Research: location and hours are among the first things visitors look for (docs/DEPENDENCIES D).
 * Mobile order: heading + address → map → getting here + buttons, so "Get directions"
 * sits right under the map. Desktop: text on the left, map on the right.
 */
export function FindUs() {
  const a = academy;
  return (
    <section aria-labelledby="find-us-title" className="on-light bg-chalk py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8">
        <Reveal className="lg:col-span-5 lg:row-start-1">
          <p className="eyebrow text-mat-deep">Find us · Sector 104, Noida</p>
          <h2 id="find-us-title" className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)] leading-[1.02]">
            Come see the courts.
          </h2>
          <address className="mt-6 max-w-[36ch] text-[1.1rem] not-italic leading-snug text-ink">
            {a.address.line1},
            <br />
            {a.address.line2},
            <br />
            {a.address.locality}, {a.address.region}
          </address>
        </Reveal>

        <Reveal className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1" delay={0.06}>
          <LocationMap className="h-[340px] sm:h-[420px] lg:h-full lg:min-h-[480px]" />
        </Reveal>

        <Reveal className="lg:col-span-5 lg:row-start-2 lg:self-end" delay={0.1}>
          <ul className="grid gap-3 text-ink-soft">
            <li className="flex items-center gap-3">
              <Train size={18} weight="bold" className="shrink-0 text-mat-deep" aria-hidden="true" />
              {a.address.nearestMetro.distance} from {a.address.nearestMetro.name} metro station
            </li>
            <li className="flex items-center gap-3">
              <Car size={18} weight="bold" className="shrink-0 text-mat-deep" aria-hidden="true" />
              Parking available
            </li>
            <li className="flex items-center gap-3">
              <Clock size={18} weight="bold" className="shrink-0 text-mat-deep" aria-hidden="true" />
              {a.hoursSummary}
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <a href={a.contact.phoneHref} className="btn btn-ghost-light">
              <Phone size={18} weight="bold" aria-hidden="true" />
              <span>Call {a.contact.phoneDisplay}</span>
            </a>

            <ExternalButton
              href={a.address.directionsUrl}
              variant="ink"
              note="opens Google Maps"
            >
              Get directions
            </ExternalButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
