"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type Player, photoSrc } from "@/lib/achievements";

const GAP = 16; // must match gap-4

export function AchievementsSlider({
    players = [],
    children,
    tone = "light",
}: {
    players?: Player[];
    children: React.ReactNode;
    tone?: "light" | "dark";
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const drag = useRef({ active: false, startX: 0, startScroll: 0 });
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);
    const [dragging, setDragging] = useState(false);
    const [progress, setProgress] = useState(0);

    const update = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        setCanPrev(el.scrollLeft > 4);
        setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
        const max = el.scrollWidth - el.clientWidth;
        setProgress(max > 0 ? el.scrollLeft / max : 1);
    }, []);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        update();
        el.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => {
            el.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
            ro.disconnect();
        };
    }, [update]);

    const scrollByCard = (dir: 1 | -1) => {
        const el = trackRef.current;
        if (!el) return;
        const card = el.querySelector<HTMLElement>("[data-card]");
        const step = card ? card.offsetWidth + GAP : el.clientWidth * 0.8;
        el.scrollTo({ left: el.scrollLeft + dir * step, behavior: "smooth" });
    };

    // Mouse drag for desktop (touch devices already swipe natively)
    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== "mouse" || e.button !== 0) return;
        const el = trackRef.current;
        if (!el) return;
        drag.current = {
            active: true,
            startX: e.clientX,
            startScroll: el.scrollLeft,
        };
        setDragging(true);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = trackRef.current;
        if (!drag.current.active || !el) return;
        el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
    };

    const endDrag = () => {
        if (!drag.current.active) return;
        drag.current.active = false;
        setDragging(false);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollByCard(1);
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollByCard(-1);
        }
    };

    const arrowClass =
        "flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-chalk text-ink transition-all duration-200 hover:border-mat/50 hover:bg-court-950 hover:text-chalk disabled:pointer-events-none disabled:opacity-30";

    return (
        <>
            <div className="flex items-end justify-between gap-6">
                <div className="min-w-0">{children}</div>

                {/* Arrows on larger screens; phones swipe (see the progress bar below the cards). */}
                <div className="hidden shrink-0 gap-2 sm:flex">
                    <button
                        type="button"
                        aria-label="Previous achievements"
                        onClick={() => scrollByCard(-1)}
                        disabled={!canPrev}
                        className={arrowClass}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        aria-label="Next achievements"
                        onClick={() => scrollByCard(1)}
                        disabled={!canNext}
                        className={arrowClass}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>

            <div
                ref={trackRef}
                tabIndex={0}
                role="region"
                aria-label="Player results"
                onKeyDown={onKeyDown}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerLeave={endDrag}
                onPointerCancel={endDrag}
                className={`-mx-5 mt-8 grid grid-flow-col auto-cols-[78%] gap-4 overflow-x-auto overscroll-x-contain px-5 pb-2 scroll-px-5 scrollbar-none sm:mx-0 sm:auto-cols-[300px] sm:px-0 sm:scroll-px-0 lg:auto-cols-[calc((100%_-_3rem)/4)] ${dragging
                    ? "cursor-grabbing select-none snap-none"
                    : "snap-x snap-mandatory lg:cursor-grab"
                    }`}
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                {(players ?? []).map((p) => {
                    const img = photoSrc(p);
                    return (
                        <article
                            key={p.name}
                            data-card
                            className="flex snap-start flex-col overflow-hidden rounded-[24px] bg-chalk text-ink ring-1 ring-ink/10"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden bg-court-950">
                                {img ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={img.src}
                                        srcSet={img.srcSet}
                                        sizes="(min-width: 1024px) 300px, 78vw"
                                        width={480}
                                        height={600}
                                        alt={`${p.name}${p.results[0] ? ` with the ${p.results[0].event} award` : ""}`}
                                        loading="lazy"
                                        decoding="async"
                                        draggable={false}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <svg aria-hidden="true" viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
                                        {/* No photo yet: a court seen from above, in the brand's court-line style */}
                                        <g fill="none" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="3">
                                            <rect x="60" y="40" width="280" height="420" />
                                            <path d="M80 40V460M320 40V460M60 250H340M60 190H340M60 310H340M60 64H340M60 436H340M200 40V190M200 310V460" />
                                        </g>
                                    </svg>
                                )}
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-court-950/90 via-court-950/40 to-transparent" aria-hidden="true" />
                                <span className="eyebrow absolute left-3 top-3 rounded-full bg-court-950/75 px-2.5 py-1.5 text-[0.65rem] text-chalk backdrop-blur">
                                    {p.tag}
                                </span>
                                <h3 className="display absolute inset-x-4 bottom-4 text-[1.9rem] leading-[0.95] text-chalk">{p.name}</h3>
                            </div>
                            <ul className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
                                {p.results.map((r) => (
                                    <li key={r.title + r.event}>
                                        <p className="font-semibold leading-snug">{r.title}</p>
                                        <p className="mt-0.5 text-sm leading-snug text-ink-soft">{r.event}</p>
                                        {r.date && <p className="eyebrow mt-1.5 text-[0.65rem] text-mat-deep">{r.date}</p>}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    );
                })}
            </div>

            {/* Swipe progress — tells phone users there is more to the side */}
            <div className="mt-4 flex items-center gap-3 sm:hidden" aria-hidden="true">
                <div className={`h-1 flex-1 overflow-hidden rounded-full ${tone === "dark" ? "bg-chalk/15" : "bg-ink/10"}`}>
                    <div className="h-full rounded-full bg-mat transition-[width] duration-150" style={{ width: `${Math.max(12, progress * 100)}%` }} />
                </div>
                <span className={`eyebrow text-[0.65rem] ${tone === "dark" ? "text-chalk/60" : "text-ink-soft"}`}>Swipe</span>
            </div>
        </>
    );
}