"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowCounterClockwise, ArrowRight } from "@phosphor-icons/react";
import { levels, levelCountWord } from "@/lib/pathway";
import { SectionHead } from "../section-head";
import { InternalButton } from "../buttons";
import { ShuttleShape } from "../shuttle";
import { RailFlight } from "./rail-flight";

/**
 * The pathway as a staircase: each level sits one step higher than the last.
 * When the user scrolls to the section, the signature shuttlecock hops up the steps,
 * tracing and revealing the vibrant pathway arc behind it (signature motif, STRATEGY #6 & #19).
 * Works for any number of levels: the step count, arcs and grid all follow lib/pathway.ts.
 */
const N = levels.length;
const HOPS = Math.max(N - 1, 1);
const STEP = 60; // px each level rises above the previous one on desktop
const LIFT = levels.map((_, i) => (N - 1 - i) * STEP); // px each column is pushed down
const PAD = 60; // room above the top step for the arcs
const H = PAD + LIFT[0];
const Y_COORDS = LIFT.map((l) => PAD + l);
const GAP = 32; // must match lg:gap-8
const GRID_COLS = N === 3 ? "lg:grid-cols-3" : N === 2 ? "lg:grid-cols-2" : "lg:grid-cols-4";

/** Column start positions for an N-column grid of the given width. */
function defaultXs(width: number) {
  const colW = (width - (N - 1) * GAP) / N;
  return levels.map((_, i) => i * (colW + GAP) + 6);
}

type Arc = {
  p0: { x: number; y: number };
  p1: { x: number; y: number };
  p2: { x: number; y: number };
  p3: { x: number; y: number };
};

type Geo = {
  w: number;
  xCoords: number[];
  yCoords: number[];
  arcs: Arc[];
  d: string;
  scale: number;
  land: { x: number; y: number };
  rest: { x: number; y: number; angle: number };
};

function restPose(land: { x: number; y: number }, scale: number) {
  // Resting shuttle lies on its side, cork slightly lower than the skirt rim (from hero.tsx)
  const angle = 166;
  const pts = [
    [0, -5],
    [0, 5],
    [-35, -13.5],
    [-35, 13.5],
  ];
  const r = (angle * Math.PI) / 180;
  const maxY = Math.max(...pts.map(([x, y]) => (x * Math.sin(r) + y * Math.cos(r)) * scale));
  return { x: land.x + 6 * scale, y: land.y - maxY - 1, angle };
}

function sampleBezier(arc: Arc | undefined, u: number) {
  if (!arc || !arc.p0 || !arc.p1 || !arc.p2 || !arc.p3) {
    return { x: 0, y: 0, angle: 0, speed: 0 };
  }
  const clampedU = Math.min(Math.max(u, 0), 1);
  const u1 = 1 - clampedU;
  const x =
    u1 * u1 * u1 * arc.p0.x +
    3 * u1 * u1 * clampedU * arc.p1.x +
    3 * u1 * clampedU * clampedU * arc.p2.x +
    clampedU * clampedU * clampedU * arc.p3.x;
  const y =
    u1 * u1 * u1 * arc.p0.y +
    3 * u1 * u1 * clampedU * arc.p1.y +
    3 * u1 * clampedU * clampedU * arc.p2.y +
    clampedU * clampedU * clampedU * arc.p3.y;
  const dx =
    3 * u1 * u1 * (arc.p1.x - arc.p0.x) +
    6 * u1 * clampedU * (arc.p2.x - arc.p1.x) +
    3 * clampedU * clampedU * (arc.p3.x - arc.p2.x);
  const dy =
    3 * u1 * u1 * (arc.p1.y - arc.p0.y) +
    6 * u1 * clampedU * (arc.p2.y - arc.p1.y) +
    3 * clampedU * clampedU * (arc.p3.y - arc.p2.y);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const speed = Math.hypot(dx, dy);
  return { x, y, angle, speed };
}

function computeGeo(
  width: number,
  stepElements: (HTMLLIElement | null)[] = [],
  wrapElement: HTMLElement | null = null
): Geo {
  const desktop = width >= 1024;
  const fallback = defaultXs(width);
  let xCoords = fallback;

  if (desktop && wrapElement && stepElements.length >= N && stepElements.slice(0, N).every(Boolean)) {
    const wr = wrapElement.getBoundingClientRect();
    const measured = stepElements.slice(0, N).map((el, i) => {
      if (!el) return fallback[i];
      const r = el.getBoundingClientRect();
      return r.left - wr.left + 6;
    });
    if (measured.every((v) => Number.isFinite(v))) {
      xCoords = measured;
    }
  }

  const yCoords = Y_COORDS;
  const arcs: Arc[] = [];
  let pathD = "";

  for (let i = 0; i < N - 1; i++) {
    const x1 = xCoords[i] ?? fallback[i];
    const y1 = yCoords[i];
    const x2 = xCoords[i + 1] ?? fallback[i + 1];
    const y2 = yCoords[i + 1];
    const peak = y2 - 58;
    const arc: Arc = {
      p0: { x: x1, y: y1 },
      p1: { x: x1 + 90, y: peak - 30 },
      p2: { x: x2 - 70, y: peak },
      p3: { x: x2, y: y2 },
    };
    arcs.push(arc);
    if (i === 0) {
      pathD = `M${arc.p0.x.toFixed(1)} ${arc.p0.y.toFixed(1)} C ${arc.p1.x.toFixed(1)} ${arc.p1.y.toFixed(1)}, ${arc.p2.x.toFixed(1)} ${arc.p2.y.toFixed(1)}, ${arc.p3.x.toFixed(1)} ${arc.p3.y.toFixed(1)}`;
    } else {
      pathD += ` C ${arc.p1.x.toFixed(1)} ${arc.p1.y.toFixed(1)}, ${arc.p2.x.toFixed(1)} ${arc.p2.y.toFixed(1)}, ${arc.p3.x.toFixed(1)} ${arc.p3.y.toFixed(1)}`;
    }
  }

  const land = { x: xCoords[N - 1] ?? fallback[N - 1], y: yCoords[N - 1] };
  const scale = 0.88;
  const rest = restPose(land, scale);

  return {
    w: width,
    xCoords,
    yCoords,
    arcs,
    d: pathD,
    scale,
    land,
    rest,
  };
}

const RM = "(prefers-reduced-motion: reduce)";
function subscribeRM(cb: () => void) {
  if (typeof window === "undefined") return () => { };
  const m = window.matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}
const getRM = () => (typeof window !== "undefined" ? window.matchMedia(RM).matches : false);

export function PathwaySteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  const shuttle = useRef<SVGGElement>(null);
  const skirt = useRef<SVGGElement>(null);
  const reveal = useRef<SVGPathElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const ping = useRef<SVGCircleElement>(null);
  const impact = useRef<SVGCircleElement>(null);

  const raf = useRef<number>(0);
  const runId = useRef(0);
  const played = useRef(false);

  const [geo, setGeoState] = useState<Geo>(() => computeGeo(1200));
  const geoRef = useRef<Geo>(geo);
  const setGeo = (g: Geo) => {
    geoRef.current = g;
    setGeoState(g);
  };

  const [phase, setPhase] = useState<"idle" | "flying" | "landed">("idle");
  const reduced = useSyncExternalStore(subscribeRM, getRM, () => false);

  const measure = useCallback(() => {
    const W = wrap.current;
    if (!W) return;
    const wr = W.getBoundingClientRect();
    const width = wr.width || 1200;
    setGeo(computeGeo(width, stepRefs.current, W));
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [measure]);

  const placeShuttle = useCallback((x: number, y: number, angle: number, skirtScale = 1) => {
    const g = shuttle.current;
    const G = geoRef.current;
    if (!g || !G) return;
    g.setAttribute(
      "transform",
      `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle.toFixed(1)}) scale(${G.scale})`
    );
    skirt.current?.setAttribute("transform", `scale(1 ${skirtScale.toFixed(3)})`);
  }, []);

  const play = useCallback(() => {
    const g = geoRef.current;
    if (!g || !g.arcs || g.arcs.length < HOPS) return;
    const id = ++runId.current;
    cancelAnimationFrame(raf.current);

    setPhase("flying");
    if (reveal.current) reveal.current.setAttribute("stroke-dashoffset", "1");
    if (shuttle.current) shuttle.current.style.opacity = "1";

    const hopDuration = 620; // ms per hop across each step
    const totalFlight = hopDuration * HOPS; // one hop between each pair of levels
    const start = performance.now();
    let lastNow = start;
    let spin = 0;
    let lastHop = -1;

    const frame = (now: number) => {
      if (id !== runId.current) return;
      const el = now - start;

      // Guard against frame timestamp jitter before start
      if (el < 0) {
        raf.current = requestAnimationFrame(frame);
        return;
      }

      // 1. Initial launch ping at the first level
      if (ping.current) {
        const p = Math.min(el / 420, 1);
        ping.current.setAttribute("r", String(6 + p * 24));
        ping.current.style.opacity = String(p < 1 ? (1 - p) * 0.9 : 0);
      }

      // 2. Flight across the step arcs
      if (el < totalFlight) {
        const curHop = Math.min(Math.max(0, Math.floor(el / hopDuration)), HOPS - 1);
        const hopEl = el - curHop * hopDuration;
        const u = Math.min(Math.max(hopEl / hopDuration, 0), 1);

        // Impact pulse at intermediate steps when transitioning
        if (curHop > lastHop && curHop > 0) {
          lastHop = curHop;
          if (impact.current) {
            const touchX = g.xCoords[curHop] ?? 0;
            const touchY = g.yCoords[curHop] ?? 0;
            impact.current.setAttribute("cx", String(touchX));
            impact.current.setAttribute("cy", String(touchY));
            impact.current.setAttribute("r", "5");
            impact.current.style.opacity = "0.85";
          }
        }

        // Decay intermediate impact ring
        if (impact.current && lastHop > 0) {
          const impactAge = hopEl;
          const ip = Math.min(impactAge / 360, 1);
          impact.current.setAttribute("r", String(5 + ip * 22));
          impact.current.style.opacity = String((1 - ip) * 0.85);
        }

        const arc = g.arcs[curHop] || g.arcs[0];
        const { x, y, angle, speed } = sampleBezier(arc, u);

        // Spin reads as the skirt fluttering/breathing in flight (from hero.tsx)
        spin += ((now - lastNow) / 1000) * (2 + speed * 0.003) * Math.PI * 2;
        const skirtScale = 0.84 + 0.16 * Math.abs(Math.cos(spin));
        placeShuttle(x, y, angle, skirtScale);

        // Reveal trail behind shuttlecock
        const overallProgress = (curHop + u) / HOPS;
        reveal.current?.setAttribute("stroke-dashoffset", String(1 - overallProgress));

        lastNow = now;
        raf.current = requestAnimationFrame(frame);
        return;
      }

      // 3. Impact & settling on the top level
      const it = el - totalFlight; // ms since touchdown
      const land = g.land;
      const lastArc = g.arcs[g.arcs.length - 1];
      const endAngle = sampleBezier(lastArc, 1).angle;

      if (impact.current) {
        impact.current.setAttribute("cx", String(land.x));
        impact.current.setAttribute("cy", String(land.y));
        const ip = Math.min(it / 480, 1);
        impact.current.setAttribute("r", String(5 + ip * 26));
        impact.current.style.opacity = String(1 - ip);
      }

      const HOP = 480;
      if (it < HOP) {
        const p = it / HOP;
        // Two decaying hops upon touchdown (from hero.tsx)
        const hop = p < 0.55 ? Math.sin((p / 0.55) * Math.PI) * 9 : Math.sin(((p - 0.55) / 0.45) * Math.PI) * 3;
        const ease = 1 - Math.pow(1 - p, 3);
        const ang = endAngle + (g.rest.angle - endAngle) * ease;
        const x = land.x + (g.rest.x - land.x) * ease;
        const y = land.y + (g.rest.y - land.y) * ease - hop * g.scale;
        placeShuttle(x, y, ang, 1);
        reveal.current?.setAttribute("stroke-dashoffset", "0");
        raf.current = requestAnimationFrame(frame);
        return;
      }

      // 4. Settled resolution
      placeShuttle(g.rest.x, g.rest.y, g.rest.angle, 1);
      reveal.current?.setAttribute("stroke-dashoffset", "0");
      setPhase("landed");
    };

    raf.current = requestAnimationFrame(frame);
  }, [placeShuttle]);

  // Trigger flight automatically when PathwaySteps is scrolled into viewport
  useEffect(() => {
    if (reduced) {
      placeShuttle(geo.rest.x, geo.rest.y, geo.rest.angle, 1);
      reveal.current?.setAttribute("stroke-dashoffset", "0");
      if (shuttle.current) shuttle.current.style.opacity = "1";
      return;
    }

    if (phase === "landed") {
      placeShuttle(geo.rest.x, geo.rest.y, geo.rest.angle, 1);
      reveal.current?.setAttribute("stroke-dashoffset", "0");
    }

    const target = wrap.current || sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!played.current) {
              played.current = true;
              setTimeout(() => {
                play();
              }, 120);
            }
          } else {
            // If the user scrolls far away (e.g. back to top), reset so it can trigger again on next scroll
            if (entry.boundingClientRect.top > (typeof window !== "undefined" ? window.innerHeight : 800)) {
              played.current = false;
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [geo, reduced, play, phase, placeShuttle]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // Mobile (< lg): scroll-linked flight down the rail — see components/rail-flight.tsx.
  const [reached, setReached] = useState(-1);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="pathway-title"
      className="on-light relative overflow-hidden bg-chalk-2 py-20 sm:py-24 lg:py-28"
    >
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHead
            className="lg:col-span-8"
            // index="02"
            label="The pathway"
            id="pathway-title"
            title={`${levelCountWord} levels. One direction.`}
            intro="Every player at Celestial’s sits somewhere on this pathway. You always know what you’re working on now, and what it takes to move up."
          />
<div className="flex flex-wrap items-center justify-end gap-3 lg:col-span-4 lg:justify-end">            {phase === "landed" && !reduced && (
              <button
                type="button"
                onClick={play}
className="hidden min-h-[40px] items-center gap-1.5 rounded-full border border-ink/20 bg-chalk px-3.5 text-xs font-semibold uppercase tracking-wider text-ink transition hover:border-ink/40 hover:bg-chalk-2 lg:inline-flex"                aria-label="Replay the shuttle flight transition"
              >
                <ArrowCounterClockwise size={13} weight="bold" aria-hidden="true" />
                <span>Replay</span>
              </button>
            )}
            <InternalButton href="/pathway/" variant="ink">
              See the full pathway
            </InternalButton>
          </div>
        </div>

        <div ref={wrap} className="relative mt-16 lg:mt-20">
          {/* Pathway SVG staircase: faint track, revealed teal trail, and flying shuttlecock */}
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${geo.w} ${H}`}
            className="pointer-events-none absolute inset-x-0 top-0 hidden w-full overflow-visible lg:block"
            style={{ height: H }}
          >
            <defs>
              <mask id="pathway-trail-mask" maskUnits="userSpaceOnUse">
                <path
                  ref={reveal}
                  d={geo.d}
                  stroke="#fff"
                  strokeWidth="16"
                  fill="none"
                  pathLength={1}
                  strokeDasharray="1 1"
                  strokeDashoffset={reduced ? 0 : 1}
                />
              </mask>
              <filter id="pathway-shuttle-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0b1213" floodOpacity="0.22" />
              </filter>
            </defs>

            {/* Faint dashed guide line along the steps */}
            <path
              d={geo.d}
              fill="none"
              stroke="#0b1213"
              strokeOpacity="0.16"
              strokeWidth="2"
              strokeDasharray="1 9"
              strokeLinecap="round"
            />

            {/* Vibrant pathway trail revealed behind the flying shuttle */}
            <path
              ref={trail}
              d={geo.d}
              fill="none"
              stroke="#03989e"
              strokeWidth="2.8"
              strokeLinecap="round"
              mask="url(#pathway-trail-mask)"
            />

            {/* Launch ping at Level 1 */}
            <circle
              ref={ping}
              cx={geo.xCoords[0] ?? 6}
              cy={geo.yCoords[0] ?? 240}
              r="6"
              fill="none"
              stroke="#03989e"
              strokeWidth="2"
              style={{ opacity: 0 }}
            />

            {/* Impact ping on touchdown */}
            <circle
              ref={impact}
              cx={geo.xCoords[geo.xCoords.length - 1] ?? 929}
              cy={geo.yCoords[geo.yCoords.length - 1] ?? 60}
              r="6"
              fill="none"
              stroke="#03989e"
              strokeWidth="2"
              style={{ opacity: 0 }}
            />

            {/* Flying Shuttlecock element transitioning across pathway steps */}
            <g
              ref={shuttle}
              filter="url(#pathway-shuttle-shadow)"
              className="pointer-events-auto cursor-pointer"
              onClick={play}
              style={{ opacity: 0 }}
            >
              <title>Click to replay shuttle transition</title>
              <ShuttleShape skirtRef={skirt} />
            </g>
          </svg>

          {/* Mobile flight (hidden from lg up, where the timed desktop flight runs) */}
          <RailFlight wrapRef={wrap} itemRefs={stepRefs} count={N} onReach={setReached} />

          <ol className={`relative grid gap-10 lg:gap-8 ${GRID_COLS}`}>
            {levels.map((l, i) => (
              <li
                key={l.id}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="relative border-l-2 border-ink/15 pl-6 lg:border-l-0 lg:pl-0"
                style={{ ["--lift" as string]: `${PAD + LIFT[i]}px` }}
              >
                <div className="lg:mt-[var(--lift)] lg:border-t-2 lg:border-ink/80 lg:pt-6">
                  <span
                    aria-hidden="true"
                    data-lit={reached >= i ? "" : undefined}
                    className={`path-dot absolute -left-[7px] top-1 z-[2] h-3 w-3 rounded-full lg:left-0 lg:top-[calc(var(--lift)-6px)] ${i === levels.length - 1 ? "bg-accent ring-2 ring-ink" : "bg-mat"
                      }`}
                  />
                  <p className="eyebrow text-ink-soft">
                    {l.n} · {l.ages}
                  </p>
                  <h3 className="display mt-2 text-[clamp(2.4rem,3.4vw,3rem)]">{l.name}</h3>
                  <p className="mt-1 font-semibold text-mat-deep">{l.tagline}</p>
                  <p className="mt-3 max-w-[32ch] text-ink-soft">{l.forWho}</p>
                  <p className="mt-4 text-sm text-ink-soft">
                    <span className="eyebrow block text-[0.68rem] text-ink/70">
                      {i < levels.length - 1 ? "Move up when" : "The aim"}
                    </span>
                    {l.readyWhen[0]}
                  </p>
                  <Link href={`/pathway/#${l.id}`} className="mt-4 inline-flex items-center gap-1.5 font-semibold">
                    <span className="link-underline">More on {l.name}</span>
                    <ArrowRight size={14} weight="bold" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
