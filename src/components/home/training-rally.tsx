"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowCounterClockwise } from "@phosphor-icons/react";
import { useReducedMotion } from "framer-motion";
import { academy } from "@/lib/academy";
import { SectionHead } from "../section-head";
import { InternalButton } from "../buttons";
import { ShuttleShape } from "../shuttle";

const steps = [
  {
    n: "01",
    t: "Assess",
    d: "Periodic assessments set a baseline, so progress is measured — not guessed.",
  },
  {
    n: "02",
    t: "Condition",
    d: "Strength & conditioning in the on-site gym, built around badminton movement.",
  },
  {
    n: "03",
    t: "Analyse",
    d: "Video analysis shows players what the coach sees, frame by frame.",
  },
  {
    n: "04",
    t: "Review",
    d: "Individual reviews turn the footage and numbers into the next block of work.",
  },
];

const SCALE = 0.88;
const HOP_DURATION = 620;

type Point = {
  x: number;
  y: number;
};

type Arc = {
  p0: Point;
  p1: Point;
  p2: Point;
  p3: Point;
};

const ARCS: Arc[] = [
  {
    p0: { x: 6, y: 158 },
    p1: { x: 110, y: 0 },
    p2: { x: 290, y: 0 },
    p3: { x: 308, y: 158 },
  },
  {
    p0: { x: 308, y: 158 },
    p1: { x: 412, y: 0 },
    p2: { x: 597, y: 0 },
    p3: { x: 615, y: 158 },
  },
  {
    p0: { x: 615, y: 158 },
    p1: { x: 719, y: 0 },
    p2: { x: 905, y: 0 },
    p3: { x: 923, y: 158 },
  },
];

const HOPS = ARCS.length;
const TOTAL_FLIGHT = HOP_DURATION * HOPS;

const RALLY_PATH =
  "M6 158 C 110 0, 290 0, 308 158 " +
  "C 412 0, 597 0, 615 158 " +
  "C 719 0, 905 0, 923 158";

const LAND = ARCS[HOPS - 1].p3;

function getRestPose(land: Point) {
  const angle = 166;
  const radians = (angle * Math.PI) / 180;

  const points = [
    [0, -5],
    [0, 5],
    [-35, -13.5],
    [-35, 13.5],
  ];

  const maxY = Math.max(
    ...points.map(([x, y]) => (x * Math.sin(radians) + y * Math.cos(radians)) * SCALE)
  );

  return {
    x: land.x + 6 * SCALE,
    y: land.y - maxY - 1,
    angle,
  };
}

const REST = getRestPose(LAND);

function sampleBezier(arc: Arc | undefined, progress: number) {
  // Backstop: never throw if an arc index is ever out of range.
  if (!arc) return { x: 0, y: 0, angle: 0, speed: 0 };

  const u = Math.max(0, Math.min(progress, 1));
  const v = 1 - u;

  const x =
    v ** 3 * arc.p0.x +
    3 * v ** 2 * u * arc.p1.x +
    3 * v * u ** 2 * arc.p2.x +
    u ** 3 * arc.p3.x;

  const y =
    v ** 3 * arc.p0.y +
    3 * v ** 2 * u * arc.p1.y +
    3 * v * u ** 2 * arc.p2.y +
    u ** 3 * arc.p3.y;

  const dx =
    3 * v ** 2 * (arc.p1.x - arc.p0.x) +
    6 * v * u * (arc.p2.x - arc.p1.x) +
    3 * u ** 2 * (arc.p3.x - arc.p2.x);

  const dy =
    3 * v ** 2 * (arc.p1.y - arc.p0.y) +
    6 * v * u * (arc.p2.y - arc.p1.y) +
    3 * u ** 2 * (arc.p3.y - arc.p2.y);

  return {
    x,
    y,
    angle: (Math.atan2(dy, dx) * 180) / Math.PI,
    speed: Math.hypot(dx, dy),
  };
}

export function TrainingRally({
  index = "03",
  label = "How we coach",
  cta = { href: "/pathway/", label: "See the pathway" },
}: {
  index?: string;
  label?: string;
  cta?: { href: string; label: string };
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const shuttleRef = useRef<SVGGElement>(null);
  const skirtRef = useRef<SVGGElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const pingRef = useRef<SVGCircleElement>(null);
  const impactRef = useRef<SVGCircleElement>(null);

  const rafRef = useRef<number>(0);
  const runIdRef = useRef(0);
  const playedRef = useRef(false);

  const reduce = useReducedMotion();

  const [phase, setPhase] = useState<"idle" | "flying" | "landed">("idle");

  const ex = academy.coaching.exchange;

  const placeShuttle = useCallback(
    (x: number, y: number, angle: number, skirtScale = 1) => {
      shuttleRef.current?.setAttribute(
        "transform",
        `translate(${x.toFixed(2)} ${y.toFixed(2)}) ` +
          `rotate(${angle.toFixed(2)}) scale(${SCALE})`
      );

      skirtRef.current?.setAttribute("transform", `scale(1 ${skirtScale.toFixed(3)})`);
    },
    []
  );

  const play = useCallback(() => {
    if (reduce) return;

    const id = ++runIdRef.current;

    cancelAnimationFrame(rafRef.current);

    setPhase("flying");

    if (trailRef.current) {
      trailRef.current.style.strokeDashoffset = "1";
    }

    if (shuttleRef.current) {
      shuttleRef.current.style.opacity = "1";
    }

    if (pingRef.current) {
      pingRef.current.setAttribute("r", "6");
      pingRef.current.style.opacity = "0.9";
    }

    if (impactRef.current) {
      impactRef.current.style.opacity = "0";
    }

    const start = performance.now();

    let lastNow = start;
    let spin = 0;
    let lastHop = -1;

    const frame = (now: number) => {
      if (id !== runIdRef.current) return;

      // rAF timestamps can land slightly before performance.now() at start.
      // That made elapsed negative, currentHop -1, and ARCS[-1] undefined.
      const elapsed = Math.max(0, now - start);

      // Launch pulse at Assess.
      if (pingRef.current) {
        const p = Math.min(elapsed / 420, 1);

        pingRef.current.setAttribute("r", String(6 + p * 24));
        pingRef.current.style.opacity = String(p < 1 ? (1 - p) * 0.9 : 0);
      }

      // Fly through the coaching transitions.
      if (elapsed < TOTAL_FLIGHT) {
        const currentHop = Math.max(0, Math.min(Math.floor(elapsed / HOP_DURATION), HOPS - 1));

        const hopElapsed = elapsed - currentHop * HOP_DURATION;

        const progress = Math.min(hopElapsed / HOP_DURATION, 1);

        // Pulse when the shuttle reaches an intermediate step.
        if (currentHop > lastHop && currentHop > 0) {
          lastHop = currentHop;

          const stepPoint = ARCS[currentHop].p0;

          if (impactRef.current) {
            impactRef.current.setAttribute("cx", String(stepPoint.x));
            impactRef.current.setAttribute("cy", String(stepPoint.y));
            impactRef.current.setAttribute("r", "5");
            impactRef.current.style.opacity = "0.85";
          }
        }

        // Fade the impact pulse.
        if (impactRef.current && lastHop > 0) {
          const p = Math.min(hopElapsed / 360, 1);

          impactRef.current.setAttribute("r", String(5 + p * 22));
          impactRef.current.style.opacity = String((1 - p) * 0.85);
        }

        const point = sampleBezier(ARCS[currentHop], progress);

        // Animate the shuttle skirt while flying.
        spin += ((now - lastNow) / 1000) * (2 + point.speed * 0.003) * Math.PI * 2;

        const skirtScale = 0.84 + 0.16 * Math.abs(Math.cos(spin));

        placeShuttle(point.x, point.y, point.angle, skirtScale);

        // Reveal the lime trail behind the shuttle.
        const overallProgress = (currentHop + progress) / HOPS;

        if (trailRef.current) {
          trailRef.current.style.strokeDashoffset = String(1 - overallProgress);
        }

        lastNow = now;

        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      // Landing impact at Review.
      const landingElapsed = elapsed - TOTAL_FLIGHT;
      const endAngle = sampleBezier(ARCS[HOPS - 1], 1).angle;
      const landingDuration = 480;

      if (impactRef.current) {
        const p = Math.min(landingElapsed / landingDuration, 1);

        impactRef.current.setAttribute("cx", String(LAND.x));
        impactRef.current.setAttribute("cy", String(LAND.y));
        impactRef.current.setAttribute("r", String(5 + p * 26));
        impactRef.current.style.opacity = String(1 - p);
      }

      // Settle with the same two-stage bounce as PathwaySteps.
      if (landingElapsed < landingDuration) {
        const p = landingElapsed / landingDuration;

        const hop =
          p < 0.55
            ? Math.sin((p / 0.55) * Math.PI) * 9
            : Math.sin(((p - 0.55) / 0.45) * Math.PI) * 3;

        const ease = 1 - Math.pow(1 - p, 3);

        const angle = endAngle + (REST.angle - endAngle) * ease;

        const x = LAND.x + (REST.x - LAND.x) * ease;

        const y = LAND.y + (REST.y - LAND.y) * ease - hop * SCALE;

        placeShuttle(x, y, angle);

        if (trailRef.current) {
          trailRef.current.style.strokeDashoffset = "0";
        }

        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      // Final resting position.
      placeShuttle(REST.x, REST.y, REST.angle);

      if (trailRef.current) {
        trailRef.current.style.strokeDashoffset = "0";
      }

      setPhase("landed");
    };

    rafRef.current = requestAnimationFrame(frame);
  }, [placeShuttle, reduce]);

  // Trigger automatically when the section enters the viewport.
  useEffect(() => {
    if (reduce) {
      placeShuttle(REST.x, REST.y, REST.angle);

      if (trailRef.current) {
        trailRef.current.style.strokeDashoffset = "0";
      }

      if (shuttleRef.current) {
        shuttleRef.current.style.opacity = "1";
      }

      setPhase("landed");
      return;
    }

    const target = wrapRef.current || sectionRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!playedRef.current) {
              playedRef.current = true;
              play();
            }
          } else if (entry.boundingClientRect.top > window.innerHeight) {
            // Scrolling back above the section allows it to replay.
            playedRef.current = false;
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [play, placeShuttle, reduce]);

  // Stop pending animation frames when the component unmounts.
  useEffect(() => {
    return () => {
      runIdRef.current++;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="train-method-title"
      className="relative overflow-hidden bg-court-900 py-24 text-chalk sm:py-32"
    >
      <div
        className="strings pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] opacity-60 [mask-image:linear-gradient(to_left,black,transparent)] lg:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHead
          tone="dark"
          index={index}
          label={label}
          id="train-method-title"
          title="Every session is a rally, not a drill"
          intro="Coaching at Celestial’s runs as a loop: find out where a player is, build the body to play, show them what happened, and decide what comes next."
        />

        <div className="mt-4 hidden justify-end lg:flex">
          {phase === "landed" && !reduce && (
            <button
              type="button"
              onClick={play}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-white/20 bg-court-900 px-3.5 text-xs font-semibold uppercase tracking-wider text-chalk transition hover:border-white/40"
              aria-label="Replay the training shuttle animation"
            >
              <ArrowCounterClockwise size={13} weight="bold" aria-hidden="true" />
              <span>Replay</span>
            </button>
          )}
        </div>

        <div ref={wrapRef} className="relative mt-8">
          {/* Shuttle track: desktop only */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-[-17px] hidden h-40 w-full overflow-visible lg:block"
          >
            <defs>
              <filter
                id="training-rally-shuttle-shadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="2"
                  floodColor="#0e1a17"
                  floodOpacity="0.22"
                />
              </filter>
            </defs>

            {/* Faint dotted guide */}
            <path
              d={RALLY_PATH}
              fill="none"
              stroke="#f3f0e8"
              strokeOpacity="0.14"
              strokeWidth="2"
              strokeDasharray="1 9"
              strokeLinecap="round"
            />

            {/* Animated lime trail */}
            <path
              ref={trailRef}
              d={RALLY_PATH}
              pathLength={1}
              fill="none"
              stroke="#d6f04e"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeDasharray="1 1"
              strokeDashoffset={reduce ? 0 : 1}
            />

            {/* Launch pulse */}
            <circle
              ref={pingRef}
              cx={ARCS[0].p0.x}
              cy={ARCS[0].p0.y}
              r="6"
              fill="none"
              stroke="#d6f04e"
              strokeWidth="2"
              style={{ opacity: 0 }}
            />

            {/* Intermediate and final impact pulse */}
            <circle
              ref={impactRef}
              cx={LAND.x}
              cy={LAND.y}
              r="6"
              fill="none"
              stroke="#d6f04e"
              strokeWidth="2"
              style={{ opacity: 0 }}
            />

            {/* Shuttle controlled by requestAnimationFrame */}
            <g
              ref={shuttleRef}
              filter="url(#training-rally-shuttle-shadow)"
              style={{ opacity: reduce ? 1 : 0 }}
            >
              <ShuttleShape skirtRef={skirtRef} />
            </g>
          </svg>

          {/* Coaching steps */}
          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8 lg:pt-36">
            {steps.map((s, i) => (
              <li
                key={s.n}
                className="relative border-l-2 border-chalk/15 pl-6 lg:border-l-0 lg:border-t-2 lg:pl-0 lg:pt-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-lime lg:-top-[7px] lg:left-0"
                />

                <p className="eyebrow text-mat-soft">{s.n}</p>

                <h3 className="display mt-2 text-[2.6rem]">{s.t}</h3>

                <p className="mt-2 max-w-[30ch] text-chalk/70">{s.d}</p>

                {i === 1 && (
                  <p className="mt-3 text-sm text-chalk/55">
                    Physio and medical room on site for injury care.
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* International exposure */}
        <div className="mt-16 grid gap-8 rounded-[28px] bg-court-950/70 p-7 ring-1 ring-white/10 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow text-mat-soft">International exposure</p>

            <p className="mt-3 max-w-[60ch] text-[1.1rem] leading-relaxed text-chalk/85">
              An {ex.label.toLowerCase()} with{" "}
              <strong className="font-semibold text-chalk">{ex.partner}</strong> in {ex.country}{" "}
              gives academy players a view of how the game is coached elsewhere.
            </p>
          </div>

          <InternalButton href={cta.href} variant="ghost-dark">
            {cta.label}
          </InternalButton>
        </div>
      </div>
    </section>
  );
}