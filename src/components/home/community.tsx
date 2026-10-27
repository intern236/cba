"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { images } from "@/lib/images";
import { Photo } from "../photo";
import { SectionHead } from "../section-head";
import { TextLink } from "../buttons";

const strip = [images.group, images.wooden, images.rally, images.mural, images.gymFloor];

/**
 * Accordion strip from the client's moodboard ("cards scroller"). It expands on hover AND
 * keyboard focus, never auto-advances (NN/g auto-forwarding). On touch screens (< md) it
 * becomes a swipeable scroll-snap slider with prev/next arrows above it (right-aligned).
 */
export function Community() {
  const [active, setActive] = useState(0);

  // Mobile slider state
  const sliderRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = sliderRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateArrows]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = sliderRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 12), behavior: "smooth" });
  };

  const arrowBase =
    "relative grid size-10 place-items-center rounded-full " +
    "border border-ink/10 bg-chalk text-ink shadow-sm " +
    "transition-all duration-300 ease-out active:scale-90 " +
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const arrowEnabled = "opacity-100";
  const arrowDisabled = "pointer-events-none opacity-30";

  return (
    <section aria-labelledby="community-title" className="on-light bg-chalk-2 py-24 sm:py-32">


      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHead
            className="lg:col-span-8"
            // index="01"
            label="On court"
            id="community-title"
            title="Early mornings, late rallies: life at the academy"
            intro="Morning and evening batches, juniors and adults, pay-and-play regulars and academy players — all in one hall. Every photo here was taken at Celestial’s."
          />
          <div className="lg:col-span-4 lg:pb-2 lg:text-right">
            <TextLink href="/gallery/">Open the gallery</TextLink>
          </div>
        </div>

        {/* md+: accordion strip (unchanged) */}
        <ul className="mt-12 hidden h-[520px] gap-3 md:flex" aria-label="Photos from the academy">
          {strip.map((img, i) => (
            <li
              key={img.name}
              className="relative min-w-0 overflow-hidden rounded-[24px] bg-court-900 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ flexGrow: active === i ? 5 : 1, flexBasis: 0 }}
              onMouseEnter={() => setActive(i)}
            >
              <button
                type="button"
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                aria-label={`Show photo: ${img.caption}`}
                className="absolute inset-0 z-10 rounded-[24px]"
              />
              <Photo img={img} sizes="(min-width:768px) 60vw, 100vw" />
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-court-950/85 to-transparent p-6 transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}
              >
                <p className="eyebrow text-chalk">{img.caption}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* < md: swipeable slider with arrows above (right-aligned) */}
        <div className="mt-10 md:hidden">
          <div className="mb-3 flex justify-end gap-2">
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              className={`${arrowBase} ${canPrev ? arrowEnabled : arrowDisabled}`}
            >
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                className={canPrev && !canNext ? "com-nudge-left" : ""}
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Next photo"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              className={`${arrowBase} ${canNext ? arrowEnabled : arrowDisabled}`}
            >
              {canNext && !canPrev && (
                <span aria-hidden="true" className="com-ring absolute inset-0 rounded-full border border-ink/30" />
              )}
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                className={canNext && !canPrev ? "com-nudge" : ""}
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <ul
            ref={sliderRef}
            onScroll={updateArrows}
            className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 scroll-px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 sm:scroll-px-8"
            aria-label="Photos from the academy"
          >
            {strip.map((img) => (
              <li key={img.name} className="w-[78%] shrink-0 snap-start">
                <div className="aspect-[4/5] overflow-hidden rounded-[22px] bg-court-900">
                  <Photo img={img} sizes="80vw" />
                </div>
                <p className="eyebrow mt-3 text-ink-soft">{img.caption}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}