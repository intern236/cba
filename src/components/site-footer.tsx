import Image from "next/image";
import Link from "next/link";
import { academy } from "@/lib/academy";
import { navLinks, moreLinks } from "@/lib/nav";

export function SiteFooter() {
  const a = academy;

  return (
    <footer className="bg-court-950 text-chalk">
      <div className="mx-auto max-w-[1320px] px-5 pb-10 pt-20 sm:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
          {/* Brand */}

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              aria-label="Celestial's Badminton Academy home"
              className="inline-flex items-center gap-3"
            >
              <Image
                src="/images/LOGO.png"
                alt="Celestial's Badminton Academy logo"
                width={80}
                height={80}
                className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
              />

              <span className="leading-none">
                <span className="display block whitespace-nowrap text-[1.2rem] font-bold tracking-[0.01em] sm:text-[1.4rem]">
                  Celestial&rsquo;s
                </span>

                <span className="eyebrow mt-1.5 block whitespace-nowrap text-[0.55rem] uppercase tracking-[0.12em] text-chalk/70 sm:text-[0.6rem]">
                  Badminton Academy
                </span>
              </span>
            </Link>

            <p className="mt-7 max-w-[40ch] text-base leading-[1.7] text-chalk/80 sm:mt-8 sm:text-lg sm:leading-[1.6]">
              A badminton academy for players starting out and players getting
              better: coaching, seven indoor courts and a recovery stack under
              one roof in Sector 104, Noida.
            </p>
          </div>


          {/* Visit */}
          <div>
            <p className="eyebrow text-chalk/50">Visit</p>
            <address className="mt-4 not-italic leading-relaxed text-chalk/85">
              {a.address.line1}
              <br />
              {a.address.line2}
              <br />
              {a.address.locality}, {a.address.region}
            </address>

            <a
              href={a.address.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-3 inline-block font-semibold"
            >
              Get directions
              <span className="sr-only"> (opens Google Maps)</span>
            </a>
          </div>

          {/* Contact */}
          <div>
            {/* <h2 className="eyebrow text-chalk/50">Hours</h2>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-chalk/85">
              <dt>Mon, Wed–Sun</dt>
              <dd>5 AM – 11 PM</dd>
              <dt>Tuesday</dt>
              <dd>5 AM – 8 PM</dd>
            </dl> */}

            <p className="eyebrow mt-8 text-chalk/50">Talk to us</p>
            <ul className="mt-4 space-y-1.5 text-chalk/85">
              <li>
                <a href={a.contact.phoneHref} className="link-underline">
                  {a.contact.phoneDisplay}
                </a>
              </li>

              {a.contact.whatsappUrl && (
                <li>
                  <a
                    href={a.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    WhatsApp
                  </a>
                </li>
              )}

              <li>
                <a
                  href={a.contact.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  Instagram
                </a>
              </li>

              <li>
                <a
                  href={a.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Explore + booking */}
          <div>
            <p className="eyebrow text-chalk/50">Explore</p>
            <ul className="mt-4 space-y-1.5 text-chalk/85">
              {[...navLinks, ...moreLinks].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-8 text-chalk/50">Book a court</p>
            <ul className="mt-4 space-y-1.5 text-chalk/85">
              {[a.booking.primary, a.booking.secondary].map((b) => (
                <li key={b.provider}>
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    {b.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 h-[2px] bg-chalk/15" aria-hidden="true" />

        <div className="mt-6 flex items-start justify-between gap-4 text-xs text-chalk/50 sm:gap-8 sm:text-sm">
          <p className="max-w-[26ch] text-left sm:max-w-none">
            © {new Date().getFullYear()} {a.name}. All rights reserved.
          </p>
          <p className="max-w-[26ch] text-right sm:max-w-none">
            Pay-and-play court bookings are processed by Hudle and Playo.
          </p>
        </div>
      </div>
    </footer>
  );
}