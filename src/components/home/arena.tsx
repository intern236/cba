"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { academy } from "@/lib/academy";
import { images } from "@/lib/images";
import { Photo } from "../photo";
import { SectionHead } from "../section-head";
import { Reveal } from "../reveal";
import { TextLink } from "../buttons";
import { FacilityIcon } from "../facility-icon";

/**
 * Trust: Stanford credibility #2 and NN/g — real premises photos. Captions sit outside
 * the images (gallery-style), and the asymmetric grid avoids the 3-equal-cards template.
 * On mobile the photos become a horizontal scroll-snap row with arrows above it (right-aligned);
 * from md up it's the grid.
 */
export function Arena() {
  const sliderRef = useRef<HTMLDivElement>(null);
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
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: "smooth" });
  };

  const arrowBase =
    "relative grid size-10 place-items-center rounded-full " +
    "border border-ink/10 bg-chalk text-ink shadow-sm " +
    "transition-all duration-300 ease-out active:scale-90 " +
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const arrowEnabled = "opacity-100";
  const arrowDisabled = "pointer-events-none opacity-30";

  return (
    <section aria-labelledby="arena-title" className="on-light bg-chalk py-24 sm:py-32">


      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHead
            className="lg:col-span-7"
            index="04"
            label="The arena"
            id="arena-title"
            title="Built for the long session"
            intro="Seven courts are only half of it. A strength gym, a physio and a medical room, a steam bath and a cafeteria mean you can train, recover and refuel without leaving the building."
          />
          <Reveal className="lg:col-span-5 lg:pb-2" delay={0.1}>
            <TextLink href="/facilities/">Court specs, timings and everything on site</TextLink>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6 md:grid-rows-[auto_auto]">
          {/* Mobile: wrapper holding the arrows row + scroller. md+: `contents`
              removes the wrapper so the figures act as direct grid items. */}
          <div className="md:contents">
            {/* Arrows: above the photos, right-aligned (mobile only) */}
            <div className="mb-3 flex justify-end gap-2 md:hidden">
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
                  className={canPrev && !canNext ? "arena-nudge-left" : ""}
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
                  <span aria-hidden="true" className="arena-ring absolute inset-0 rounded-full border border-ink/30" />
                )}
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                  className={canNext && !canPrev ? "arena-nudge" : ""}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            <div
              ref={sliderRef}
              onScroll={updateArrows}
              className="-mx-5 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pb-2 scroll-px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 sm:scroll-px-8 md:contents"
            >
              <Reveal
                as="figure"
                className="w-[82%] shrink-0 snap-start sm:w-[60%] md:col-span-4 md:w-auto md:shrink"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-[24px] bg-chalk-2 md:aspect-[16/9]">
                  <Photo img={images.courtsRow} sizes="(min-width:768px) 66vw, 82vw" />
                </div>
                <figcaption className="eyebrow mt-3 text-ink-soft">{images.courtsRow.caption}</figcaption>
              </Reveal>

              <Reveal
                as="figure"
                className="w-[82%] shrink-0 snap-start sm:w-[60%] md:col-span-2 md:w-auto md:shrink"
                delay={0.08}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-[24px] bg-chalk-2 md:aspect-auto md:h-[calc(100%-2rem)]">
                  <Photo img={images.mural} sizes="(min-width:768px) 33vw, 82vw" position="30% 50%" />
                </div>
                <figcaption className="eyebrow mt-3 text-ink-soft">{images.mural.caption}</figcaption>
              </Reveal>

              <Reveal
                as="figure"
                className="w-[82%] shrink-0 snap-start sm:w-[60%] md:col-span-2 md:w-auto md:shrink"
                delay={0.04}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-[24px] bg-chalk-2">
                  <Photo img={images.gymStrength} sizes="(min-width:768px) 33vw, 82vw" />
                </div>
                <figcaption className="eyebrow mt-3 text-ink-soft">{images.gymStrength.caption}</figcaption>
              </Reveal>
            </div>
          </div>

          <Reveal className="md:col-span-4" delay={0.12}>
            <ul className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2 md:gap-x-8 md:gap-y-0">
              {academy.facilities.map((f) => (
                <li
                  key={f.key}
                  className="flex items-start gap-4 rounded-[28px] border border-ink/10 bg-chalk-2 p-5 md:rounded-none md:border-0 md:border-t-2 md:bg-transparent md:px-0 md:py-4"
                >
                  <FacilityIcon k={f.key} />
                  <div>
                    <p className="font-semibold">{f.label}</p>
                    <p className="text-sm text-ink-soft">{f.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}