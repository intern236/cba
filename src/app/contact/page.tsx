import type { Metadata } from "next";
import { WhatsappLogo, Phone, InstagramLogo, CalendarCheck } from "@phosphor-icons/react/ssr";
import { academy, trialLink } from "@/lib/academy";
import { Visit } from "@/components/visit";
import { Reveal } from "@/components/reveal";
import { EnquiryForm, ENQUIRY_ENDPOINT } from "@/components/enquiry-form";

export const metadata: Metadata = {
  title: "Contact & directions",
  description:
    "Find Celestial's Badminton Academy in Sector 104, Noida — 2.5 km from Noida Sector 81 metro. Call, WhatsApp or book a court online. Open 5 AM – 11 PM.",
  alternates: { canonical: "/contact/" },
};

const a = academy;

const routes = [
  { I: WhatsappLogo, t: "Free trial or coaching questions", d: "Message the academy on WhatsApp. Tell us the player’s age and level.", href: trialLink(), ext: true, cta: "Open WhatsApp" },
  { I: Phone, t: "Call", d: a.contact.phoneDisplay, href: a.contact.phoneHref, ext: false, cta: "Call now" },
  { I: InstagramLogo, t: "Instagram", d: `${a.contact.instagram.handle}. DM for a free trial.`, href: a.contact.instagram.url, ext: true, cta: "Open Instagram" },
  { I: CalendarCheck, t: "Book a court", d: "Pay-and-play. Pick a slot and pay online.", href: a.booking.primary.url, ext: true, cta: "Open Hudle" },
];

export default function ContactPage() {
  return (
    <>
      <div className="pt-16 sm:pt-20 bg-court-950" />
      <Visit headingLevel={1} />
      <section aria-labelledby="reach-title" className="on-light bg-chalk py-24">
        <div className={`mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 ${ENQUIRY_ENDPOINT ? "lg:grid-cols-2" : ""}`}>
          <Reveal>
            <p className="eyebrow text-ink-soft">Quickest ways to reach us</p>
            <h2 id="reach-title" className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">Pick a channel</h2>
            <ul className={`mt-10 grid gap-x-10 border-b-2 border-ink/10 ${ENQUIRY_ENDPOINT ? "" : "lg:grid-cols-2"}`}>
              {routes.map(({ I, t, d, href, ext, cta }) => (
                <li key={t} className="border-t-2 border-ink/10">
                  <a href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-center gap-5 py-6">
                    <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-accent transition-transform duration-300 group-hover:-rotate-12">
                      <I size={22} weight="bold" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-lg font-semibold">{t}</span>
                      <span className="block text-ink-soft">{d}</span>
                    </span>
                    <span className="link-underline hidden font-semibold sm:inline">
                      {cta}
                      {ext && <span className="sr-only"> (opens in a new tab)</span>}
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
