
import type { Metadata } from "next";
import {
  WhatsappLogo,
  Phone,
  InstagramLogo,
  CalendarCheck,
} from "@phosphor-icons/react/ssr";
import { academy, trialLink } from "@/lib/academy";
import { Visit } from "@/components/visit";
import { Reveal } from "@/components/reveal";
import { EnquiryForm, ENQUIRY_ENDPOINT } from "@/components/enquiry-form";

export const metadata: Metadata = {
  title: "Contact & Directions | Badminton Academy Sector 104 Noida",
  description:
    "Celestial's Badminton Academy, Maharishi Nagar, Sector 104, Noida. Call or WhatsApp +91 8826268236. Open daily 5 AM–11 PM, Tuesdays till 8 PM.",
  alternates: { canonical: "/contact/" },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Directions | Badminton Academy Sector 104 Noida",
    description:
      "Celestial's Badminton Academy, Maharishi Nagar, Sector 104, Noida. Call or WhatsApp +91 8826268236. Open daily 5 AM–11 PM, Tuesdays till 8 PM.",
  },
};

const a = academy;

// Add the actual profile URLs below when available.
// Use the full public URLs, not profile names or handles.
const googleBusinessProfileUrl = "";
const facebookUrl = "";
const playoUrl = "";

const sameAs = [
  googleBusinessProfileUrl,
  a.contact.instagram.url,
  facebookUrl,
  a.booking.primary.url, // Hudle, if this is the academy's Hudle listing
  playoUrl,
].filter(Boolean);

const academySchema = {
  "@context": "https://schema.org",
  "@type": ["SportsActivityLocation", "LocalBusiness"],
  name: "Celestial's Badminton Academy",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Maharishi Nagar, Sector 104",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.540167,
    longitude: 77.3775952,
  },
  telephone: a.contact.phoneDisplay,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "https://schema.org/Monday",
        "https://schema.org/Wednesday",
        "https://schema.org/Thursday",
        "https://schema.org/Friday",
        "https://schema.org/Saturday",
        "https://schema.org/Sunday",
      ],
      opens: "05:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "https://schema.org/Tuesday",
      opens: "05:00",
      closes: "20:00",
    },
  ],
  priceRange: "₹₹",
  sameAs,
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "Air-conditioned indoor badminton courts",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "On-site parking",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Gym",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Physiotherapy",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Hostel accommodation",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Steam bath",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Cafeteria",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Badminton pro shop",
      value: true,
    },
  ],
};

const routes = [
  {
    I: WhatsappLogo,
    t: "Free trial or coaching questions",
    d: "Message the academy on WhatsApp. Tell us the player's age and level.",
    href: trialLink(),
    ext: true,
    cta: "Open WhatsApp",
  },
  {
    I: Phone,
    t: "Call",
    d: a.contact.phoneDisplay,
    href: a.contact.phoneHref,
    ext: false,
    cta: "Call now",
  },
  {
    I: InstagramLogo,
    t: "Instagram",
    d: `${a.contact.instagram.handle}. DM for a free trial.`,
    href: a.contact.instagram.url,
    ext: true,
    cta: "Open Instagram",
  },
  {
    I: CalendarCheck,
    t: "Book a court",
    d: "Pay-and-play. Pick a slot and pay online.",
    href: a.booking.primary.url,
    ext: true,
    cta: "Open Hudle",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(academySchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="pt-16 sm:pt-20 bg-court-950" />

      <Visit headingLevel={1} />

      <section
        aria-labelledby="reach-title"
        className="on-light bg-chalk py-24"
      >
        <div
          className={`mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 ${
            ENQUIRY_ENDPOINT ? "lg:grid-cols-2" : ""
          }`}
        >
          <Reveal>
            <p className="eyebrow text-ink-soft">
              Quickest ways to reach us
            </p>

            <h2
              id="reach-title"
              className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)]"
            >
              Fastest way to reach us
            </h2>

            <ul
              className={`mt-10 grid gap-x-10 border-b-2 border-ink/10 ${
                ENQUIRY_ENDPOINT ? "" : "lg:grid-cols-2"
              }`}
            >
              {routes.map(({ I, t, d, href, ext, cta }) => (
                <li key={t} className="border-t-2 border-ink/10">
                  <a
                    href={href}
                    {...(ext
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                    className="group flex items-center gap-5 py-6"
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-accent transition-transform duration-300 group-hover:-rotate-12"
                    >
                      <I size={22} weight="bold" />
                    </span>

                    <span className="flex-1">
                      <span className="block text-lg font-semibold">
                        {t}
                      </span>
                      <span className="block text-ink-soft">{d}</span>
                    </span>

                    <span className="link-underline hidden font-semibold sm:inline">
                      {cta}
                      {ext && (
                        <span className="sr-only">
                          {" "}
                          (opens in a new tab)
                        </span>
                      )}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {ENQUIRY_ENDPOINT && (
            <Reveal delay={0.08}>
              <EnquiryForm />
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
