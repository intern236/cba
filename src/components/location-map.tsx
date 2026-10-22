"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { academy } from "@/lib/academy";

/**
 * Location map: a static, self-hosted map image (OpenStreetMap data, tinted to the logo palette)
 * centred on the academy's Google Business Profile coordinates, with our own pin on top.
 *
 * Why not a Google Maps iframe: an embed depends on the host allowing google.com frames (the
 * preview host blocks them, and so do strict privacy settings). It also loads ~1 MB of script
 * on phones and traps scrolling. A static image always renders, costs ~57 KB on phones, and a
 * tap opens the real listing in Google Maps (the app on phones), which is what visitors
 * want there anyway: directions.
 *
 * The image is centred on the pin and shown at natural size (`object-none`), so the pin
 * is always at the centre of the frame, whatever the frame's size.
 * Motion: the pin drops in once when the map scrolls into view, then a ring pulses under it.
 * Without JS, or with reduced motion, the pin simply sits there.
 */
export function LocationMap({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const a = academy;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.armed = "";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.seen = "";
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ring = tone === "dark" ? "ring-white/10" : "ring-ink/10";
  return (
    <div ref={ref} className={`loc-map relative isolate overflow-hidden rounded-[24px] bg-[#dfeaea] ring-1 sm:rounded-[28px] ${ring} ${className}`}>
      <a
        href={a.address.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group absolute inset-0 block focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-mat"
      >
        <picture>
          <source media="(max-width: 639px)" srcSet="/images/location-map-800.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/location-map-1400.webp"
            alt=""
            width={1400}
            height={1000}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-none object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </picture>

        {/* Pin, anchored on the exact centre of the image */}
        <span aria-hidden="true" className="absolute left-1/2 top-1/2">
          <span className="map-ping absolute -left-7 -top-[18px] h-9 w-14 rounded-[50%] bg-accent/40" />
          <span className="map-pin absolute bottom-0 left-0 block">
            <svg width="40" height="50" viewBox="0 0 40 50" className="drop-shadow-[0_6px_6px_rgb(11_18_19/0.35)]">
              <path d="M20 49C20 49 3 30.5 3 18.5a17 17 0 1 1 34 0C37 30.5 20 49 20 49Z" fill="#03989e" stroke="#0b1213" strokeWidth="2" />
              <circle cx="20" cy="18.5" r="7.5" fill="#ffffff" />
              <circle cx="20" cy="18.5" r="3.2" fill="#0b1213" />
            </svg>
          </span>
          <span className="map-label absolute bottom-[60px] left-0 whitespace-nowrap rounded-full bg-court-950 px-3.5 py-1.5 text-[0.82rem] font-semibold text-chalk shadow-lg">
            Celestial&rsquo;s Badminton Academy
          </span>
        </span>

        <span className="absolute bottom-3 left-3 inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-chalk px-4 text-sm font-semibold text-ink shadow-lg ring-1 ring-ink/10 transition-colors group-hover:bg-chalk-2">
          Open in Google Maps
          <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
        </span>
        <span className="sr-only">
          Map of {a.name}, {a.address.locality}. Open in Google Maps (opens in a new tab)
        </span>
      </a>

      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-0 right-0 z-10 inline-flex min-h-[24px] items-center rounded-tl-lg bg-chalk/85 px-2 text-[11px] text-ink-soft hover:text-ink"
      >
        © OpenStreetMap contributors<span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
