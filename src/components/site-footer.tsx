import Image from "next/image";
import Link from "next/link";
import { academy } from "@/lib/academy";
import { navLinks, moreLinks } from "@/lib/nav";

/* ---------- Icons ---------- */
type IconProps = { className?: string };

function PhoneIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const socialLinkClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-chalk/20 text-chalk/85 transition-colors hover:border-chalk hover:bg-chalk hover:text-court-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chalk";

export function SiteFooter() {
  const a = academy;

  const socials = [
    { label: "WhatsApp", href: a.contact.whatsappUrl, Icon: WhatsAppIcon },
    { label: "Instagram", href: a.contact.instagram.url, Icon: InstagramIcon },
    { label: "Facebook", href: a.contact.facebook, Icon: FacebookIcon },
  ].filter((s) => s.href);

  const bookingBlock = (
    <>
      <p className="eyebrow mt-10 text-chalk/50 md:mt-12">Book a court</p>
      <ul className="mt-3 space-y-1 text-chalk/85 md:mt-4 md:space-y-1.5">
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
    </>
  );

  return (
    <footer className="bg-court-950 text-chalk">
      <div className="mx-auto max-w-[1320px] px-5 pb-6 pt-10 sm:px-8 sm:pb-10 sm:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 text-sm md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12 md:text-base">
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
                className="h-12 w-12 shrink-0 object-contain sm:h-16 sm:w-16"
              />
              <span className="leading-none">
                <span className="display block whitespace-nowrap text-[1.1rem] font-bold tracking-[0.01em] sm:text-[1.4rem]">
                  Celestial&rsquo;s
                </span>
                <span className="eyebrow mt-1.5 block whitespace-nowrap text-[0.55rem] uppercase tracking-[0.12em] text-chalk/70 sm:text-[0.6rem]">
                  Badminton Academy
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-[40ch] text-sm leading-[1.6] text-chalk/80 sm:mt-8 sm:text-lg">
              A badminton academy for players starting out and players getting
              better: coaching, seven indoor courts and a recovery stack under
              one roof in Sector 104, Noida.
            </p>
          </div>

          {/* Visit */}
          <div>
            <p className="eyebrow text-chalk/50">Visit</p>
            <address className="mt-3 not-italic leading-relaxed text-chalk/85 md:mt-4">
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
              className="link-underline mt-2 inline-block font-semibold md:mt-3"
            >
              Get directions
              <span className="sr-only"> (opens Google Maps)</span>
            </a>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow text-chalk/50">Talk to us</p>

            <a
              href={a.contact.phoneHref}
              className="link-underline mt-3 inline-flex items-center gap-2 text-chalk/85 md:mt-4"
            >
              <PhoneIcon className="h-4 w-4 shrink-0" />
              {a.contact.phoneDisplay}
            </a>

            <ul className="mt-3 flex flex-wrap items-center gap-2 md:gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={socialLinkClass}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{label} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile only */}
            <div className="md:hidden">{bookingBlock}</div>
          </div>

          {/* Explore */}
          <div className="col-span-2 md:col-span-1">
            <p className="eyebrow text-chalk/50">Explore</p>
            <ul className="mt-3 columns-2 gap-x-6 space-y-1 text-chalk/85 md:mt-4 md:columns-1 md:space-y-1.5">
              {[...navLinks, ...moreLinks].map((l) => (
                <li key={l.href} className="break-inside-avoid">
                  <Link href={l.href} className="link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop only */}
            <div className="hidden md:block">{bookingBlock}</div>
          </div>
        </div>

        <div className="mt-8 h-px bg-chalk/15 sm:mt-16 sm:h-[2px]" aria-hidden="true" />

        <div className="mt-4 flex items-start justify-between gap-4 text-xs text-chalk/50 sm:mt-6 sm:gap-8 sm:text-sm">
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