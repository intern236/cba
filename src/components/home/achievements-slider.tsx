"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Achievement = {
    name: string;
    result: string;
    event: string;
    date: string;
    image?: string;
};

const GAP = 16; // Must match gap-4

const arrowClass =
    "flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-chalk text-ink transition-all duration-200 hover:border-mat/50 hover:bg-court-950 hover:text-chalk disabled:pointer-events-none disabled:opacity-30";

export function AchievementsSlider({
    achievements,
    children,
}: {
    achievements: Achievement[];
    children: React.ReactNode;
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const drag = useRef({ active: false, startX: 0, startScroll: 0 });

    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);
    const [dragging, setDragging] = useState(false);

    const update = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;

        setCanPrev(el.scrollLeft > 4);
        setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
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

        el.scrollTo({
            left: el.scrollLeft + dir * step,
            behavior: "smooth",
        });
    };

    // Mouse drag for desktop; touch swiping works natively.
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

        el.scrollLeft =
            drag.current.startScroll - (e.clientX - drag.current.startX);
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

    return (
        <>
            <div className="flex items-end justify-between gap-6">
                <div className="min-w-0">{children}</div>

                <div className="flex shrink-0 gap-2">
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
                aria-label="Player achievements"
                onKeyDown={onKeyDown}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerLeave={endDrag}
                onPointerCancel={endDrag}
                className={`scrollbar-none mt-6 grid w-full grid-flow-col auto-cols-[300px] gap-4 overflow-x-auto overscroll-x-contain pb-4 sm:auto-cols-[380px] lg:auto-cols-[calc((100%_-_2rem)/3)] ${
                    dragging
                        ? "cursor-grabbing select-none snap-none"
                        : "snap-x snap-proximity lg:cursor-grab"
                }`}
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                {achievements.map((achievement) => (
                    <div
                        key={`${achievement.name}-${achievement.event}-${achievement.date}`}
                        data-card
                        className="snap-start"
                    >
                        <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-ink/10 bg-chalk shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-mat/40 hover:shadow-lg">
                            {/* Achievement image */}
                            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-chalk-2">
                                {achievement.image ? (
                                    <Image
                                        src={achievement.image}
                                        alt={`${achievement.name} - ${achievement.result}`}
                                        fill
                                        sizes="(max-width: 639px) 300px, (max-width: 1023px) 380px, 33vw"
                                        className="object-cover object-top"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center px-4 text-center text-sm text-ink-soft">
                                        Achievement photo coming soon
                                    </div>
                                )}
                            </div>

                            {/* Achievement details */}
                            <div className="flex flex-1 flex-col p-6 sm:p-7">
                                <p className="eyebrow inline-flex w-fit rounded-full bg-chalk-2 px-3 py-2 text-mat">
                                    {achievement.date}
                                </p>

                                <h3 className="display mt-5 text-2xl leading-tight transition-colors duration-300 group-hover:text-mat sm:text-3xl">
                                    {achievement.name}
                                </h3>

                                <p className="mt-3 whitespace-pre-line text-lg font-semibold leading-snug text-ink">
                                    {achievement.result}
                                </p>

                                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                                    {achievement.event}
                                </p>
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        </>
    );
}