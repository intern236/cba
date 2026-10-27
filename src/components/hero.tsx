"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowCounterClockwiseIcon, ArrowRightIcon, StarIcon, UsersThreeIcon, CalendarDotsIcon, VideoCameraIcon } from "@phosphor-icons/react";
import { academy, trialLink } from "@/lib/academy";
import { fitToScreen, pathFrom, simulateClear, type ScreenSample } from "@/lib/flight";
import { ShuttleShape } from "./shuttle";

/** Where the player's racket is in play-rally (1440×1080), as a fraction of the frame. */
const RACKET = { x: 0.688, y: 0.6 };
const TIME_SCALE = 1.0; // real time: a high clear hangs ~2.2 s, as on court
const SIM = simulateClear({ speedRatio: 5.5, angleDeg: 50 });

type Geo = {
  w: number;
  h: number;
  pts: ScreenSample[];
  d: string;
  launch: { x: number; y: number };
  land: { x: number; y: number };
  lineX1: number;
  lineX2: number;
  scale: number;
  rest: { x: number; y: number; angle: number };
};

function restPose(land: { x: number; y: number }, scale: number) {
  // Resting shuttle lies on its side, cork slightly lower than the skirt rim.
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

const RM = "(prefers-reduced-motion: reduce)";
function subscribeRM(cb: () => void) {
  const m = window.matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}
const getRM = () => window.matchMedia(RM).matches;

export function Hero() {
  const wrap = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const shuttle = useRef<SVGGElement>(null);
  const skirt = useRef<SVGGElement>(null);
  const reveal = useRef<SVGPathElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const ping = useRef<SVGCircleElement>(null);
  const impact = useRef<SVGCircleElement>(null);
  const raf = useRef<number>(0);
  const [geo, setGeoState] = useState<Geo | null>(null);
  const geoRef = useRef<Geo | null>(null);
  const setGeo = (g: Geo) => {
    geoRef.current = g;
    setGeoState(g);
  };
  const [phase, setPhase] = useState<"idle" | "flying" | "landed">("idle");
  const [shown, setShown] = useState(false);
  const reduced = useSyncExternalStore(subscribeRM, getRM, () => false);
  const runId = useRef(0);

  const measure = useCallback(() => {
    const W = wrap.current;
    const P = photo.current;
    if (!W || !P) return;
    const wr = W.getBoundingClientRect();
    const pr = P.getBoundingClientRect();
    const px = pr.left - wr.left;
    const py = pr.top - wr.top;
    const desktop = wr.width >= 1024;
    // Land below whichever column is taller, so the court line never cuts through the copy.
    const gr = grid.current?.getBoundingClientRect();
    const gridBottom = gr ? gr.bottom - wr.top : py + pr.height;
    const launch = { x: px + pr.width * RACKET.x, y: py + pr.height * RACKET.y };
    const land = desktop
      ? { x: px - 34, y: Math.max(py + pr.height, gridBottom) + 34 }
      : { x: px + pr.width * 0.14, y: py + pr.height };
    const apexY = desktop ? Math.max(py - 44, 84) : py + pr.height * 0.09;
    const pts = fitToScreen(SIM, launch, land, apexY);
    const scale = desktop ? 1.15 : 0.85;
    setGeo({
      w: wr.width,
      h: wr.height,
      pts,
      d: pathFrom(pts),
      launch,
      land,
      lineX1: desktop ? 0 : px,
      lineX2: desktop ? wr.width : px + pr.width,
      scale,
      rest: restPose(land, scale),
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [measure]);

  const placeShuttle = (x: number, y: number, angle: number, skirtScale = 1) => {
    const g = shuttle.current;
    const G = geoRef.current;
    if (!g || !G) return;
    g.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle.toFixed(1)}) scale(${G.scale})`);
    skirt.current?.setAttribute("transform", `scale(1 ${skirtScale.toFixed(3)})`);
  };

  const play = useCallback(() => {
    const geo = geoRef.current;
    if (!geo) return;
    const id = ++runId.current;
    cancelAnimationFrame(raf.current);
    const { pts } = geo;
    const total = pts[pts.length - 1].len;
    const T = pts[pts.length - 1].t;
    setPhase("flying");
    if (trail.current) trail.current.style.opacity = "0.9";
    reveal.current?.setAttribute("stroke-dashoffset", "1");
    if (shuttle.current) shuttle.current.style.opacity = "1";

    const start = performance.now();
    const pingDur = 560;
    const flightStart = pingDur * 0.55;
    let spin = 0;
    let lastNow = start;
    let i = 0;
    let touched = false;

    const frame = (now: number) => {
      if (id !== runId.current) return;
      const el = now - start;
      // 1. Anticipation: ping at the racket
      if (ping.current) {
        const p = Math.min(el / pingDur, 1);
        ping.current.setAttribute("r", String(6 + p * 26));
        ping.current.style.opacity = String(p < 1 ? 1 - p : 0);
      }
      const ft = (el - flightStart) / 1000 / TIME_SCALE; // physical seconds since launch
      if (ft < 0) {
        placeShuttle(pts[0].x, pts[0].y, pts[0].angle);
        raf.current = requestAnimationFrame(frame);
        lastNow = now;
        return;
      }
      if (ft < T) {
        // 2–5. Launch, flight, apex, descent: sample the physical trajectory by time
        while (i < pts.length - 2 && pts[i + 1].t < ft) i++;
        const a = pts[i];
        const b = pts[i + 1];
        const k = (ft - a.t) / Math.max(b.t - a.t, 1e-6);
        const x = a.x + (b.x - a.x) * k;
        const y = a.y + (b.y - a.y) * k;
        let da = b.angle - a.angle;
        if (da > 180) da -= 360;
        if (da < -180) da += 360;
        const ang = a.angle + da * k;
        // Spin reads as the skirt "breathing"; faster when the shuttle is faster.
        spin += ((now - lastNow) / 1000) * (2 + a.speed * 0.18) * Math.PI * 2;
        placeShuttle(x, y, ang, 0.84 + 0.16 * Math.abs(Math.cos(spin)));
        const len = a.len + (b.len - a.len) * k;
        reveal.current?.setAttribute("stroke-dashoffset", String(1 - len / total));
        lastNow = now;
        raf.current = requestAnimationFrame(frame);
        return;
      }
      // 6. Impact: cork-first touch-down, two decaying hops, settle on its side
      const it = (ft - T) * 1000 * TIME_SCALE; // ms since impact
      const land = pts[pts.length - 1];
      if (impact.current) {
        const p = Math.min(it / 520, 1);
        impact.current.setAttribute("r", String(4 + p * 30));
        impact.current.style.opacity = String(1 - p);
      }
      const HOP = 520;
      if (it < HOP) {
        const p = it / HOP;
        const hop = p < 0.55 ? Math.sin((p / 0.55) * Math.PI) * 12 : Math.sin(((p - 0.55) / 0.45) * Math.PI) * 4;
        const ease = 1 - Math.pow(1 - p, 3);
        const ang = land.angle + (geo.rest.angle - land.angle) * ease;
        const x = land.x + (geo.rest.x - land.x) * ease;
        const y = land.y + (geo.rest.y - land.y) * ease - hop * geo.scale;
        placeShuttle(x, y, ang);
        reveal.current?.setAttribute("stroke-dashoffset", "0");
        if (!touched) {
          touched = true;
          setPhase("landed");
          setShown(true);
        }
        raf.current = requestAnimationFrame(frame);
        return;
      }
      // 7. Resolution
      placeShuttle(geo.rest.x, geo.rest.y, geo.rest.angle);
      if (trail.current) trail.current.style.opacity = "0.38";
      setPhase("landed");
    };
    raf.current = requestAnimationFrame(frame);
  }, []);

  // Auto-play once per page view after the headline has settled.
  const played = useRef(false);
  useEffect(() => {
    if (!geo) return;
    if (reduced) {
      placeShuttle(geo.rest.x, geo.rest.y, geo.rest.angle);
      reveal.current?.setAttribute("stroke-dashoffset", "0");
      if (trail.current) trail.current.style.opacity = "0.38";
      if (shuttle.current) shuttle.current.style.opacity = "1";
      return;
    }
    if (!played.current) {
      const t = setTimeout(() => {
        played.current = true;
        play();
      }, 650);
      return () => clearTimeout(t);
    }
    // On resize after landing, keep the resting state in the new geometry.
    if (phase === "landed") placeShuttle(geo.rest.x, geo.rest.y, geo.rest.angle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo, reduced]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const a = academy;
  const landed = phase === "landed" || reduced;
  const showStrip = shown || reduced;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-court-950 text-chalk">
      {/* faint court geometry in the background: a full court seen from above, 13.4 × 6.1 m */}
      <svg aria-hidden="true" className="pointer-events-none absolute -right-[14%] top-[6%] hidden h-[115%] opacity-[0.06] lg:block" viewBox="0 0 610 1340" fill="none" stroke="#f3f0e8" strokeWidth="4">
        <rect x="2" y="2" width="606" height="1336" />
        <path d="M48 2V1338M562 2V1338M2 670H608M2 472H608M2 868H608M2 78H608M2 1262H608M305 2V472M305 868V1338" />
      </svg>

      <div ref={wrap} className="relative mx-auto max-w-[1320px] px-5 pb-10 pt-28 sm:px-8 lg:pb-12 lg:pt-36">
        <div ref={grid} className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <p className="eyebrow rise-in text-mat-soft pb-5" style={{ animationDelay: "60ms" }}>
Start right. Keep getting better.            </p>
            <h1 id="hero-title" className="display mt-5 text-[clamp(3.3rem,6.15vw,5.9rem)]">
              <span className="sr-only">
                Celestial&rsquo;s Badminton Academy &mdash; Premier Badminton Coaching &amp; Indoor Courts in Sector 104, Noida
              </span>
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="rise-line block" style={{ animationDelay: "120ms" }}>Badminton Academy in Noida</span>
              </span>
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="rise-line block text-chalk/55" style={{ animationDelay: "240ms" }}>for Kids, Teens and Adults</span>
              </span>
            </h1>

            <p className="rise-in mt-6 max-w-[52ch] text-pretty text-[1.06rem] leading-relaxed text-chalk/75" style={{ animationDelay: "380ms" }}>
              Coaching for kids, teens and adults, from a first lesson to a first tournament. Your first session is free.
            </p>
            <div className="mt-8 flex w-full flex-row items-center  gap-3">
              <a
                href="#find-your-level"
                className="btn btn-ghost-dark justify-center"
              >
                Find your level
              </a>
              <a
                href={trialLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary justify-between lg:mr-40"
              >
                <span>
                  Book a free trial
                  <span className="sr-only">
                    {" "}(opens WhatsApp in a new tab)
                  </span>
                </span>

                <span className="btn-icon" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M4 12 12 4M5.5 4H12v6.5" />
                  </svg>
                </span>
              </a>


            </div>
            <p className="rise-in mt-5 text-[0.95rem] text-chalk/60" style={{ animationDelay: "560ms" }}>
              Just want to play?{" "}
              <a href={a.booking.primary.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-chalk/85 hover:text-chalk">
                <span className="link-underline">Book a court from {a.booking.priceFrom}</span>
                <ArrowRightIcon size={13} weight="bold" aria-hidden="true" />
                <span className="sr-only"> (opens Hudle in a new tab)</span>
              </a>
            </p>
          </div>

          {/* Real photo from the hall: the shuttle leaves this player's racket */}
          <figure className="order-1 lg:order-2">
            <div
              ref={photo}
              className="photo-in relative aspect-[4/3] overflow-hidden rounded-[22px] bg-court-800 ring-1 ring-white/10 lg:rounded-[28px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/play-rally-1600.webp"
                srcSet="/images/play-rally-800.webp 800w, /images/play-rally-1600.webp 1440w"
                sizes="(min-width: 1024px) 600px, 100vw"
                width={1440}
                height={1080}
                alt="A junior player prepares an overhead shot while adults rally on neighbouring green courts at Celestial's."
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-court-950/45 via-transparent to-court-950/10" aria-hidden="true" />
              <button
                type="button"
                onClick={play}
                disabled={!geo || reduced}
                className={`absolute bottom-3 right-3 flex min-h-[40px] items-center gap-2 rounded-full bg-court-950/70 px-3.5 text-sm font-medium text-chalk ring-1 ring-white/15 backdrop-blur transition-opacity hover:bg-court-950/85 disabled:hidden ${landed ? "visible opacity-100" : "invisible opacity-0"}`}
              >
                <ArrowCounterClockwiseIcon size={15} weight="bold" aria-hidden="true" />
                Replay the shot
              </button>
            </div>
            <figcaption className="sr-only">A junior player training on court at Celestial&rsquo;s, Sector 104.</figcaption>
          </figure>
        </div>

        {/* Facts strip, revealed by the court line the shuttle lands on */}
        <div className="relative mt-10 lg:mt-[68px]">
          <ul className="grid grid-cols-1 gap-x-8 gap-y-3 pt-5 text-[0.95rem] text-chalk/80 sm:grid-cols-2 lg:grid-cols-4 lg:pt-6">
            <li className="strip-item flex items-center gap-2">
              <UsersThreeIcon size={16} weight="bold" className="text-mat-soft" aria-hidden="true" />
              Kids · Teens · Adults
            </li>
            <li className="strip-item flex items-center gap-2">
              <CalendarDotsIcon size={16} weight="bold" className="text-mat-soft" aria-hidden="true" />
              Morning, evening &amp; weekend batches
            </li>
            <li className="strip-item flex items-center gap-2">
              <VideoCameraIcon size={16} weight="bold" className="text-mat-soft" aria-hidden="true" />
              Assessments &amp; video analysis
            </li>
            <li className="strip-item flex items-center gap-2">
              <StarIcon size={16} weight="fill" className="text-lime" aria-hidden="true" />
              <a href={a.rating.url} target="_blank" rel="noopener noreferrer" className="link-underline">
                {a.rating.value} on Google · {a.rating.countLabel} reviews
              </a>
            </li>
          </ul>
        </div>

        {/* Flight overlay */}
        {geo && (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-visible"
            width={geo.w}
            height={geo.h}
            viewBox={`0 0 ${geo.w} ${geo.h}`}
          >
            <defs>
              <mask id="trail-mask" maskUnits="userSpaceOnUse">
                <path ref={reveal} d={geo.d} stroke="#fff" strokeWidth="14" fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset="1" />
              </mask>
            </defs>
            {/* the court line the shuttle lands on */}
            <line
              x1={geo.lineX1}
              x2={geo.lineX2}
              y1={geo.land.y}
              y2={geo.land.y}
              stroke="#f3f0e8"
              strokeWidth="2"
              className="court-line"
              style={{
                transformOrigin: `${geo.land.x}px ${geo.land.y}px`,
                transform: showStrip ? "scaleX(1)" : "scaleX(0)",
                opacity: showStrip ? 0.32 : 0,
              }}
            />
            <path
              ref={trail}
              d={geo.d}
              fill="none"
              stroke="#d6f04e"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="0.1 7"
              mask="url(#trail-mask)"
              style={{ opacity: 0, transition: "opacity 900ms ease" }}
            />
            <circle ref={ping} cx={geo.launch.x} cy={geo.launch.y} r="6" fill="none" stroke="#d6f04e" strokeWidth="2" style={{ opacity: 0 }} />
            <circle ref={impact} cx={geo.land.x} cy={geo.land.y} r="4" fill="none" stroke="#d6f04e" strokeWidth="2" style={{ opacity: 0 }} />
            <g ref={shuttle} style={{ opacity: 0 }}>
              <ShuttleShape skirtRef={skirt} />
            </g>
          </svg>
        )}
      </div>
    </section>
  );
}