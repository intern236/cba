"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import type { Img } from "@/lib/images";
import { src } from "@/lib/images";
import { Photo } from "./photo";

/**
 * Gallery with an accessible lightbox (focus trapped to its controls, Esc/arrow keys, focus restored).
 * Mobile (< md): swipeable scroll-snap slider with arrows above it (right-aligned). md+: masonry grid.
 */
export function GalleryGrid({ items }: { items: Img[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const sliderTriggers = useRef<(HTMLButtonElement | null)[]>([]);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  // Slider state (mobile only)
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

  const close = useCallback(() => {
    setOpen((cur) => {
      if (cur !== null) {
        setTimeout(() => {
          // Restore focus to whichever trigger is actually visible (slider on mobile, grid on md+)
          const target = [triggers.current[cur], sliderTriggers.current[cur]].find((el) => el && el.offsetParent !== null);
          target?.focus();
        }, 0);
      }
      return null;
    });
  }, []);
  const step = useCallback((d: number) => setOpen((cur) => (cur === null ? cur : (cur + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    closeBtn.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab" && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const cur = open !== null ? items[open] : null;

  const arrowBase =
    "relative grid size-10 place-items-center rounded-full " +
    "border border-ink/10 bg-chalk text-ink shadow-sm " +
    "transition-all duration-300 ease-out active:scale-90 " +
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const arrowEnabled = "opacity-100";
  const arrowDisabled = "pointer-events-none opacity-30";

  return (
    <>

      {/* Mobile slider (hidden from md up) */}
      <div className="md:hidden">
        {/* Arrows: above the photos, right-aligned */}
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
              className={canPrev && !canNext ? "gal-nudge-left" : ""}
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
              <span aria-hidden="true" className="gal-ring absolute inset-0 rounded-full border border-ink/30" />
            )}
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
              className={canNext && !canPrev ? "gal-nudge" : ""}
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div
          ref={sliderRef}
          onScroll={updateArrows}
          className="-mx-5 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pb-2 scroll-px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 sm:scroll-px-8"
        >
          {items.map((img, i) => (
            <figure key={img.name} className="w-[82%] shrink-0 snap-start sm:w-[60%]">
              <button
                ref={(el) => {
                  sliderTriggers.current[i] = el;
                }}
                type="button"
                onClick={() => setOpen(i)}
                className="block w-full overflow-hidden rounded-[24px] bg-chalk-2"
                aria-label={`Open photo: ${img.caption}`}
              >
                <div className="aspect-[4/3]">
                  <Photo img={img} sizes="82vw" />
                </div>
              </button>
              <figcaption className="eyebrow mt-3 text-ink-soft">{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Masonry grid (md and up only) */}
      <ul className="hidden gap-5 md:block md:columns-2 lg:columns-3">
        {items.map((img, i) => (
          <li key={img.name} className="mb-5 break-inside-avoid">
            <figure>
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full overflow-hidden rounded-[22px] bg-chalk-2"
                aria-label={`Open photo: ${img.caption}`}
              >
                <div style={{ aspectRatio: `${img.w} / ${img.h}` }}>
                  <Photo img={img} sizes="(min-width:1024px) 33vw, 50vw" className="transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
              </button>
              <figcaption className="eyebrow mt-3 text-ink-soft">{img.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {cur && (
          <m.div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo ${open! + 1} of ${items.length}: ${cur.caption}`}
            className="fixed inset-0 z-50 flex flex-col bg-court-950/95 p-4 text-chalk backdrop-blur sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="eyebrow text-chalk/70">
                {open! + 1} / {items.length} · {cur.caption}
              </p>
              <button ref={closeBtn} type="button" onClick={close} className="flex min-h-[44px] items-center gap-2 rounded-full px-4 font-medium ring-1 ring-white/25">
                <X size={18} weight="bold" aria-hidden="true" /> Close
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center py-4" onClick={(e) => e.target === e.currentTarget && close()}>
              <m.img
                key={cur.name}
                src={src(cur)}
                alt={cur.alt}
                width={cur.w}
                height={cur.h}
                className="max-h-full max-w-full rounded-[18px] object-contain"
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-center gap-3">
              <button type="button" onClick={() => step(-1)} className="flex min-h-[48px] items-center gap-2 rounded-full px-5 font-medium ring-1 ring-white/25">
                <CaretLeft size={18} weight="bold" aria-hidden="true" /> Previous
              </button>
              <button type="button" onClick={() => step(1)} className="flex min-h-[48px] items-center gap-2 rounded-full px-5 font-medium ring-1 ring-white/25">
                Next <CaretRight size={18} weight="bold" aria-hidden="true" />
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}