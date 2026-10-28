import {
  MapPin,
  Clock,
  Wind,
  CurrencyInr,
  Certificate,
  Star,
  ArrowUpRight,
} from "@phosphor-icons/react/ssr";
import { academy } from "@/lib/academy";
import { Reveal } from "./reveal";

interface FactItem {
  icon: React.ComponentType<{ size?: number; weight?: "bold" | "fill" | "regular"; className?: string }>;
  iconWeight?: "bold" | "fill";
  label: string;
  value: string;
  detail: string;
  link?: {
    href: string;
    text: string;
  };
}

export function QuickFacts() {
  const facts: FactItem[] = [
    {
      icon: MapPin,
      iconWeight: "bold",
      label: "Address",
      value: "Sector 104, Noida",
      detail: "Maharishi Ved Vigyan No. 1–2, Maharishi Nagar, Sector 104, Noida 201304",
      link: {
        href: academy.address.mapsUrl,
        text: "View on Google Maps",
      },
    },
    {
      icon: Clock,
      iconWeight: "bold",
      label: "Open Hours",
      value: "Daily 5 AM – 11 PM",
      detail: "Open daily 5 AM–11 PM (Tuesdays till 8 PM)",
    },
    {
      icon: Wind,
      iconWeight: "bold",
      label: "Courts",
      value: "7 Indoor Courts",
      detail: "7 indoor, air-conditioned courts with shock-absorbing PVC court mats",
    },
    {
      icon: CurrencyInr,
      iconWeight: "bold",
      label: "Rates & Pricing",
      value: "Coaching & Bookings",
      detail: "Coaching: from ₹3,500/month · Courts: from ₹450/slot",
      link: {
        href: academy.booking.primary.url,
        text: "Check slot availability",
      },
    },
    {
      icon: Certificate,
      iconWeight: "bold",
      label: "Coaches",
      value: "NIS & BAI-Certified",
      detail: "NIS and BAI-certified head coaches for beginner, intermediate & elite training",
    },
    {
      icon: Star,
      iconWeight: "fill",
      label: "Google Rating",
      value: "4.4★ Google Rating",
      detail: "4.4★ from 270+ reviews on Google Maps",
      link: {
        href: academy.rating.url,
        text: "Read 270+ reviews",
      },
    },
  ];

  return (
    <section
      aria-labelledby="quick-facts-title"
      className="on-light relative overflow-hidden bg-chalk py-16 text-ink sm:py-20"
    >
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        <Reveal className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
          <h2
            id="quick-facts-title"
            className="display text-[clamp(2.4rem,4.5vw,3.6rem)] text-ink"
          >
            Visit Celestial&apos;s in Sector 104, Noida
          </h2>
          <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft sm:text-base">
            Location, opening hours, courts, fees and coaches in one place.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {facts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.label} delay={idx * 0.05}>
                <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-chalk-2 p-6 ring-1 ring-ink/10 transition-all duration-300 hover:-translate-y-1 hover:ring-mat-deep/40 hover:shadow-[0_16px_36px_-12px_rgba(10,20,25,0.18)]">
                  {/* Subtle hover glow */}
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-mat/15 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-mat/25"
                    aria-hidden="true"
                  />

                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="eyebrow text-[0.7rem] font-semibold text-mat-deep">
                        {item.label}
                      </span>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mat/20 text-mat-deep ring-1 ring-mat-deep/20 transition-all duration-300 group-hover:scale-105 group-hover:bg-mat group-hover:text-ink group-hover:ring-mat">
                        <Icon
                          size={22}
                          weight={item.iconWeight || "bold"}
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <h3 className="display-wide mt-3 text-lg font-bold text-ink sm:text-xl">
                      {item.value}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {item.detail}
                    </p>
                  </div>

                  {item.link ? (
                    <div className="mt-5 border-t border-ink/10 pt-4">
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-semibold text-mat-deep transition-colors hover:text-ink"
                      >
                        <span>{item.link.text}</span>
                        <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                      </a>
                    </div>
                  ) : (
                    <div className="mt-5 border-t border-ink/10 pt-4">
                      <span className="text-xs font-medium text-ink/50">
                        Sector 104 · Noida
                      </span>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}