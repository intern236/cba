"use client";

import { useState } from "react";
import { images } from "@/lib/images";
import { Photo } from "../photo";
import { SectionHead } from "../section-head";
import { TextLink } from "../buttons";

const strip = [images.group, images.wooden, images.rally, images.mural, images.gymFloor];

/**
 * Accordion strip from the client's moodboard ("cards scroller"). It expands on hover AND
 * keyboard focus, never auto-advances (NN/g auto-forwarding), and becomes a plain
 * horizontal scroller on touch screens.
 */
export function Community() {
  const [active, setActive] = useState(0);
  return (
    <section aria-labelledby="community-title" className="on-light bg-chalk-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHead
            className="lg:col-span-8"
            index="04"
            label="On court"
            id="community-title"
            title="Early mornings, late rallies"
            intro="Morning and evening batches, juniors and adults, pay-and-play regulars and academy players — all in one hall. Every photo here was taken at Celestial’s."
          />
          <div className="lg:col-span-4 lg:pb-2 lg:text-right">
            <TextLink href="/gallery/">Open the gallery</TextLink>
          </div>
        </div>

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

        <ul className="-mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:hidden" aria-label="Photos from the academy">
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
    </section>
  );
}
