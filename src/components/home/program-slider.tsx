"use client";

import { useState } from "react";

function ArrowLeftIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
        </svg>
    );
}

function ArrowRightIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </svg>
    );
}

function MedalIcon() {
    return (
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="8" r="5" />
            <path d="m8.2 12-1.2 9 5-3 5 3-1.2-9" />
        </svg>
    );
}

function UsersIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="10" cy="7" r="4" />
            <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function DumbbellIcon() {
    return (
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <path d="m6.5 6.5 11 11" />
            <path d="m21 21-3-3" />
            <path d="m3 3 3 3" />
            <path d="m18 6 3-3" />
            <path d="m3 21 3-3" />
            <path d="m8 8-4 4" />
            <path d="m16 16 4-4" />
        </svg>
    );
}

const programs = [
    {
        number: "01",
        level: "Beginner",
        subtitle: "Start with the fundamentals",
        for: "New players, approx. 5–10 years",
        focus: [
            "Badminton basics",
            "Footwork and coordination",
            "Building a love for the game",
        ],
    },
    {
        number: "02",
        level: "Intermediate",
        subtitle: "Build a stronger game",
        for: "Approx. 8–16 years, school and district players",
        focus: [
            "Match play and tactics",
            "Fitness and movement",
            "Consistency under pressure",
        ],
    },
    {
        number: "03",
        level: "Professional",
        subtitle: "Train to compete",
        for: "State and national competitors",
        focus: [
            "High-intensity training",
            "Conditioning and video analysis",
            "Tournament planning",
        ],
    },
];

const fees = [
    { plan: "3 days a week", price: "₹4,000" },
    { plan: "4 days a week", price: "₹5,000" },
    { plan: "5 days a week", price: "₹6,000" },
    { plan: "6 days a week", price: "₹7,000" },
    { plan: "Weekends only", price: "₹3,500" },
];

const weekdayTimings = [
    "8:00 am–1:00 pm",
    "5:00–6:30 pm",
    "6:30–8:00 pm",
    "8:30–10:00 pm",
];

const weekendTimings = [
    "11:00 am–1:00 pm",
    "7:15–9:15 pm",
];

const additionalOptions = [
    "Adult batches",
    "One-on-one coaching",
    "Weekend batch",
    "Pay-and-play",
];

export function ProgramsSlider() {
    const [activeIndex, setActiveIndex] = useState(0);

    const previousSlide = () => {
        setActiveIndex((current) =>
            current === 0 ? programs.length - 1 : current - 1
        );
    };

    const nextSlide = () => {
        setActiveIndex((current) =>
            current === programs.length - 1 ? 0 : current + 1
        );
    };

    return (
        <section
            id="programs"
            aria-labelledby="programs-title"
            className="on-light overflow-hidden bg-chalk-2 py-12 sm:py-16 lg:py-20"
        >
            <div className="mx-auto max-w-[1320px] px-5 sm:px-8">

                {/* Heading and top-right slider controls */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-[760px]">
                       <p className="eyebrow text-mat flex items-center gap-4">
  <span className="h-[2px] w-10 bg-ink/20" aria-hidden="true" />
  FIND YOUR GAME
</p>

                        <h2
                            id="programs-title"
                            className="display mt-3 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] tracking-tight"
                        >
                            Badminton programmes for every level
                        </h2>

                        <p className="mt-4 max-w-[650px] text-base leading-relaxed text-ink-soft sm:text-lg">
                            Whether you are picking up a racket for the first time or
                            preparing for competition, find the right path for you.
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 self-start sm:self-auto">
                        <button
                            type="button"
                            onClick={previousSlide}
                            aria-label="Previous program"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-chalk transition-all duration-200 hover:border-mat hover:bg-court-950 hover:text-chalk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mat"
                        >
                            <ArrowLeftIcon />
                        </button>

                        <span
                            className="min-w-[60px] text-center text-sm font-medium tabular-nums text-ink-soft"
                            aria-live="polite"
                        >
                            0{activeIndex + 1} / 0{programs.length}
                        </span>

                        <button
                            type="button"
                            onClick={nextSlide}
                            aria-label="Next program"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-chalk transition-all duration-200 hover:border-mat hover:bg-court-950 hover:text-chalk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mat"
                        >
                            <ArrowRightIcon />
                        </button>
                    </div>
                </div>

                {/* Horizontal program slider */}
                <div
                    className="mt-8 overflow-hidden rounded-[26px] border border-ink/10 bg-chalk shadow-sm sm:mt-10"
                    aria-roledescription="carousel"
                    aria-label="Badminton training programs"
                >
                    <div
                        className="flex items-stretch transition-transform duration-500 ease-in-out motion-reduce:transition-none"
                        style={{
                            width: `${programs.length * 100}%`,
                            transform: `translateX(-${(activeIndex * 100) / programs.length}%)`,
                        }}
                    >
                        {programs.map((program) => (
                            <article
                                key={program.number}
                                aria-label={`${program.level} program`}
                                aria-roledescription="slide"
                                className="grid shrink-0 lg:grid-cols-12"
                                style={{ width: `${100 / programs.length}%` }}
                            >
                                {/* Left panel */}
<div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden bg-court-950 p-5 text-chalk sm:min-h-[300px] sm:p-7 lg:col-span-5 lg:min-h-[380px] lg:p-10">                                    <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-chalk/10" />
                                    <div className="pointer-events-none absolute -right-6 -top-6 h-36 w-36 rounded-full border border-chalk/10" />

                                    <div className="relative">
                                        <div className="flex items-center justify-between">
                                            <span className="eyebrow text-mat">
                                                PROGRAM {program.number}
                                            </span>

                                            <span className="text-mat">
                                                <MedalIcon />
                                            </span>
                                        </div>

                                        <h3 className="display mt-10 text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-tight">
                                            {program.level}
                                        </h3>

                                        <p className="mt-4 text-lg text-chalk/75">
                                            {program.subtitle}
                                        </p>
                                    </div>

                                    <div className="relative mt-10 border-t border-chalk/15 pt-5">
                                        <div className="flex items-start gap-3">
                                            <span className="mt-0.5 shrink-0 text-mat">
                                                <UsersIcon />
                                            </span>

                                            <div>
                                                <p className="text-xs uppercase tracking-[0.15em] text-chalk/50">
                                                    Designed for
                                                </p>

                                                <p className="mt-1 text-sm leading-relaxed text-chalk/90 sm:text-base">
                                                    {program.for}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right panel */}
                                <div className="flex flex-col justify-center p-6 sm:p-9 lg:col-span-7 lg:p-10">
                                    <p className="eyebrow text-mat">TRAINING FOCUS</p>

                                    <h4 className="display mt-3 text-2xl sm:text-3xl">
                                        What you will work on
                                    </h4>

                                    <ul className="mt-7 space-y-5">
                                        {program.focus.map((item, index) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-4"
                                            >
                                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-chalk-2 text-xs font-semibold text-mat">
                                                    0{index + 1}
                                                </span>

                                                <span className="pt-1 text-base leading-relaxed text-ink-soft sm:text-lg">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-8 border-t border-ink/10 pt-6">
                                        <p className="text-sm leading-relaxed text-ink-soft">
                                            Every player develops at a different pace. Training
                                            can be tailored to their ability and goals.
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Slider pagination */}
                <div
                    className="mt-5 flex justify-center gap-2"
                    aria-label="Choose a program"
                >
                    {programs.map((program, index) => (
                        <button
                            key={program.number}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Show ${program.level} program`}
                            aria-current={activeIndex === index ? "true" : undefined}
                            className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mat ${activeIndex === index
                                    ? "w-8 bg-court-950"
                                    : "w-2 bg-ink/20 hover:bg-ink/40"
                                }`}
                        />
                    ))}
                </div>

                {/* Additional coaching options */}
                <div className="mt-10 rounded-[24px] border border-ink/10 bg-chalk p-5 sm:mt-12 sm:p-7">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="eyebrow text-mat">MORE WAYS TO PLAY</p>

                            <h3 className="display mt-2 text-2xl sm:text-3xl">
                                Find a format that works for you.
                            </h3>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                            {additionalOptions.map((option) => (
                                <span
                                    key={option}
                                    className="rounded-full border border-ink/10 bg-chalk-2 px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors duration-200 hover:border-mat/40 hover:text-ink"
                                >
                                    {option}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Batch timings and fees */}
                <div className="mt-12 grid gap-5 lg:grid-cols-12">
                    <div className="rounded-[24px] bg-court-950 p-6 text-chalk sm:p-8 lg:col-span-5">
                        <span className="text-mat">
                            <ClockIcon />
                        </span>

                        <h3 className="display mt-4 text-2xl sm:text-3xl">
                            Batch timings
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-chalk/65">
                            Choose a training window that fits your schedule.
                        </p>

                        <div className="mt-6">
                            <p className="eyebrow text-mat">WEEKDAYS</p>

                            <ul className="mt-3 space-y-2">
                                {weekdayTimings.map((time) => (
                                    <li
                                        key={time}
                                        className="flex items-center gap-3 border-b border-chalk/10 py-2.5 text-sm text-chalk/85 last:border-0 sm:text-base"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-mat" />
                                        {time}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6 border-t border-chalk/15 pt-5">
                            <p className="eyebrow text-mat">WEEKENDS</p>

                            <ul className="mt-3 space-y-2">
                                {weekendTimings.map((time) => (
                                    <li
                                        key={time}
                                        className="flex items-center gap-3 border-b border-chalk/10 py-2.5 text-sm text-chalk/85 last:border-0 sm:text-base"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-mat" />
                                        {time}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Monthly fees */}
                    <div className="overflow-hidden rounded-[24px] border border-ink/10 bg-chalk lg:col-span-7">
                        <div className="flex items-center gap-3 border-b border-ink/10 p-6 sm:p-8">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-chalk-2 text-mat">
                                <DumbbellIcon />
                            </div>

                            <div>
                                <p className="eyebrow text-mat">TRAINING PLANS</p>

                                <h3 className="display mt-1 text-2xl sm:text-3xl">
                                    Monthly fees
                                </h3>
                            </div>
                        </div>

                        <div className="p-4 sm:p-6">
                            <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-ink/10 px-3 pb-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft sm:px-4">
                                <span>Plan</span>
                                <span>Fee / month</span>
                            </div>

                            <ul className="mt-1">
                                {fees.map((fee, index) => (
                                    <li
                                        key={fee.plan}
                                        className={`grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl px-3 py-4 transition-colors duration-200 hover:bg-chalk-2 sm:px-4 ${index !== fees.length - 1
                                                ? "border-b border-ink/5"
                                                : ""
                                            }`}
                                    >
                                        <span className="text-sm text-ink-soft sm:text-base">
                                            {fee.plan}
                                        </span>

                                        <span className="text-base font-semibold tabular-nums text-ink sm:text-lg">
                                            {fee.price}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-4 px-3 text-xs leading-relaxed text-ink-soft sm:px-4">
                                Fees are listed as provided. Confirm current pricing and
                                batch availability with the academy before enrolling.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}