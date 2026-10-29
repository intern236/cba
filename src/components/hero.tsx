"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowCounterClockwise, ArrowRight, Star, UsersThree, CalendarDots, VideoCamera } from "@phosphor-icons/react";
import { academy, trialLink } from "@/lib/academy";
import { heroClear, PHOTO_H, PHOTO_W, RACKET_PX } from "@/lib/court-perspective";
import { ShuttleShape } from "./shuttle";

/**
 * Hero shot (client feedback, 22 Oct 2026): the photo looks down the length of the court, so the
 * shuttle now flies *into* the picture, in the photo's own perspective (lib/court-perspective.ts):
 * a cross-court clear from the girl's racket to the far left back corner. It shrinks with
 * distance, peaks beyond the net and drops steeply; a dashed trace follows its shadow along the
 * floor, which is what makes the depth read. Transform/attribute updates only, one rAF.
 */
const CLEAR = heroClear();
const SHUTTLE_LEN = 36; // ShuttleShape's length in its own units
const REST_ANGLE = 166; // lying on its side, cork slightly lower than the skirt rim

type Pt = { t: number; x: number; y: number; gx: number; gy: number; size: number; sr: number; h: number; angle: number; airLen: number; floorLen: number };
type Geo = {
  w: number;
  h: number;
  pts: Pt[];
  airD: string;
  floorD: string;
  launch: { x: number; y: number };
  land: { x: number; y: number };
  clip: { x: number; y: number; w: number; h: number; r: number };
  ringRx: number;
  ringRatio: number;
  landSize: number;
  rest: { x: number; y: number; angle: number };
};

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
  const shuttle = useRef<SVGGElement>(null);
  const skirt = useRef<SVGGElement>(null);
  const reveal = useRef<SVGPathElement>(null);
  const floorReveal = useRef<SVGPathElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const floor = useRef<SVGPathElement>(null);
  const shadow = useRef<SVGEllipseElement>(null);
  const ping = useRef<SVGCircleElement>(null);
  const impact = useRef<SVGEllipseElement>(null);
  const raf = useRef<number>(0);
  const [geo, setGeoState] = useState<Geo | null>(null);
  const geoRef = useRef<Geo | null>(null);
  const setGeo = (g: Geo) => {
    geoRef.current = g;
    setGeoState(g);
  };
  const [phase, setPhase] = useState<"idle" | "flying" | "landed">("idle");
  const reduced = useSyncExternalStore(subscribeRM, getRM, () => false);
  const runId = useRef(0);

  const measure = useCallback(() => {
    const W = wrap.current;
    const P = photo.current;
    if (!W || !P) return;
    // Layout offsets, not getBoundingClientRect: the photo scales in on load (photo-in), and the
    // flight must be mapped onto its final size. The wrapper is the photo's offsetParent.
    const px = P.offsetLeft;
    const py = P.offsetTop;
    const pw = P.offsetWidth;
    const ph = P.offsetHeight;
    const desktop = W.offsetWidth >= 1024;
    // object-fit: cover, centred
    const c = Math.max(pw / PHOTO_W, ph / PHOTO_H);
    const ox = px + (pw - PHOTO_W * c) / 2;
    const oy = py + (ph - PHOTO_H * c) / 2;
    const map = (u: number, v: number) => ({ x: ox + u * c, y: oy + v * c });
    const minSize = desktop ? 9 : 7.5;
    let airLen = 0;
    let floorLen = 0;
    const pts: Pt[] = CLEAR.samples.map((s, i, all) => {
      const a = map(s.x, s.y);
      const g = map(s.gx, s.gy);
      if (i > 0) {
        const pa = map(all[i - 1].x, all[i - 1].y);
        const pg = map(all[i - 1].gx, all[i - 1].gy);
        airLen += Math.hypot(a.x - pa.x, a.y - pa.y);
        floorLen += Math.hypot(g.x - pg.x, g.y - pg.y);
      }
      const n = all[Math.min(i + 1, all.length - 1)];
      const p = all[Math.max(i - 1, 0)];
      const angle = (Math.atan2((n.y - p.y) * c, (n.x - p.x) * c) * 180) / Math.PI;
      return { t: s.t, x: a.x, y: a.y, gx: g.x, gy: g.y, size: Math.max(minSize, 0.24 * s.k * c), sr: Math.max(3, 0.2 * s.k * c), h: s.h, angle, airLen, floorLen };
    });
    const last = pts[pts.length - 1];
    const toD = (key: "air" | "floor") =>
      pts.map((p, i) => `${i ? "L" : "M"}${(key === "air" ? p.x : p.gx).toFixed(1)} ${(key === "air" ? p.y : p.gy).toFixed(1)}`).join("");
    const landSize = last.size;
    const sc = landSize / SHUTTLE_LEN;
    const r = (REST_ANGLE * Math.PI) / 180;
    // drop the resting shuttle so its lowest point sits on the floor at the landing point
    const lowest = Math.max(...[[0, -5], [0, 5], [-35, -13.5], [-35, 13.5]].map(([x, y]) => (x * Math.sin(r) + y * Math.cos(r)) * sc));
    setGeo({
      w: W.offsetWidth,
      h: W.offsetHeight,
      pts,
      airD: toD("air"),
      floorD: toD("floor"),
      launch: map(RACKET_PX[0], RACKET_PX[1]),
      land: { x: last.gx, y: last.gy },
      clip: { x: px, y: py, w: pw, h: ph, r: desktop ? 28 : 22 },
      ringRx: Math.max(14, 0.9 * (last.size / 0.24)),
      ringRatio: CLEAR.ringRatio,
      landSize,
      rest: { x: last.gx + landSize * 0.3, y: last.gy - lowest, angle: REST_ANGLE },
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [measure]);

  const placeShuttle = (x: number, y: number, angle: number, size: number, skirtScale = 1) => {
    shuttle.current?.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle.toFixed(1)}) scale(${(size / SHUTTLE_LEN).toFixed(3)})`);
    skirt.current?.setAttribute("transform", `scale(1 ${skirtScale.toFixed(3)})`);
  };
  const placeShadow = (x: number, y: number, rx: number, opacity: number) => {
    const s = shadow.current;
    if (!s) return;
    s.setAttribute("cx", x.toFixed(1));
    s.setAttribute("cy", y.toFixed(1));
    s.setAttribute("rx", rx.toFixed(1));
    s.setAttribute("ry", (rx * 0.38).toFixed(1));
    s.style.opacity = opacity.toFixed(3);
  };
  const showRest = (g: Geo) => {
    placeShuttle(g.rest.x, g.rest.y, g.rest.angle, g.landSize);
    placeShadow(g.land.x + g.landSize * 0.1, g.land.y + 1, g.landSize * 0.75, 0.55);
    reveal.current?.setAttribute("stroke-dashoffset", "0");
    floorReveal.current?.setAttribute("stroke-dashoffset", "0");
    if (trail.current) trail.current.style.opacity = "0.4";
    if (floor.current) floor.current.style.opacity = "0.5";
    if (shuttle.current) shuttle.current.style.opacity = "1";
  };

  const play = useCallback(() => {
    const geo = geoRef.current;
    if (!geo) return;
    const id = ++runId.current;
    cancelAnimationFrame(raf.current);
    const { pts } = geo;
    const last = pts[pts.length - 1];
    const T = last.t;
    setPhase("flying");
    if (trail.current) trail.current.style.opacity = "0.9";
    if (floor.current) floor.current.style.opacity = "0.75";
    reveal.current?.setAttribute("stroke-dashoffset", "1");
    floorReveal.current?.setAttribute("stroke-dashoffset", "1");
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
        ping.current.setAttribute("r", String(5 + p * 20));
        ping.current.style.opacity = String(p < 1 ? 1 - p : 0);
      }
      const ft = (el - flightStart) / 1000; // real seconds since launch
      if (ft < 0) {
        placeShuttle(pts[0].x, pts[0].y, pts[0].angle, pts[0].size);
        placeShadow(pts[0].gx, pts[0].gy, pts[0].sr, 0);
        raf.current = requestAnimationFrame(frame);
        lastNow = now;
        return;
      }
      if (ft < T) {
        // 2–5. Launch, climb, peak beyond the net, steep fall: sampled by time
        while (i < pts.length - 2 && pts[i + 1].t < ft) i++;
        const a = pts[i];
        const b = pts[i + 1];
        const k = (ft - a.t) / Math.max(b.t - a.t, 1e-6);
        const L = (m: number, n: number) => m + (n - m) * k;
        let da = b.angle - a.angle;
        if (da > 180) da -= 360;
        if (da < -180) da += 360;
        // Spin reads as the skirt "breathing", faster early in the flight when the shuttle is fast.
        spin += ((now - lastNow) / 1000) * (2.5 + 9 * (1 - ft / T)) * Math.PI * 2;
        placeShuttle(L(a.x, b.x), L(a.y, b.y), a.angle + da * k, L(a.size, b.size), 0.84 + 0.16 * Math.abs(Math.cos(spin)));
        const h = L(a.h, b.h);
        placeShadow(L(a.gx, b.gx), L(a.gy, b.gy), L(a.sr, b.sr), 0.3 + 0.35 * Math.exp(-h / 3));
        reveal.current?.setAttribute("stroke-dashoffset", String(1 - L(a.airLen, b.airLen) / last.airLen));
        floorReveal.current?.setAttribute("stroke-dashoffset", String(1 - L(a.floorLen, b.floorLen) / last.floorLen));
        lastNow = now;
        raf.current = requestAnimationFrame(frame);
        return;
      }
      // 6. Impact: a ring spreads on the floor, the shuttle hops twice and settles on its side
      const it = (ft - T) * 1000; // ms since impact
      if (impact.current) {
        const p = Math.min(it / 640, 1);
        const rx = 3 + p * geo.ringRx;
        impact.current.setAttribute("rx", rx.toFixed(1));
        impact.current.setAttribute("ry", (rx * geo.ringRatio).toFixed(1));
        impact.current.style.opacity = String(1 - p);
      }
      const HOP = 520;
      if (it < HOP) {
        const p = it / HOP;
        const hop = (p < 0.55 ? Math.sin((p / 0.55) * Math.PI) * 0.5 : Math.sin(((p - 0.55) / 0.45) * Math.PI) * 0.18) * geo.landSize;
        const ease = 1 - Math.pow(1 - p, 3);
        const ang = last.angle + (geo.rest.angle - last.angle) * ease;
        placeShuttle(last.x + (geo.rest.x - last.x) * ease, last.y + (geo.rest.y - last.y) * ease - hop, ang, geo.landSize);
        placeShadow(geo.land.x, geo.land.y + 1, geo.landSize * 0.75, 0.55);
        reveal.current?.setAttribute("stroke-dashoffset", "0");
        floorReveal.current?.setAttribute("stroke-dashoffset", "0");
        if (!touched) {
          touched = true;
          setPhase("landed");
        }
        raf.current = requestAnimationFrame(frame);
        return;
      }
      // 7. Resolution
      showRest(geo);
      setPhase("landed");
    };
    raf.current = requestAnimationFrame(frame);
    // showRest/placeShuttle/placeShadow only touch refs, so they are stable in practice.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-play once per page view after the headline has settled.
  const played = useRef(false);
  useEffect(() => {
    if (!geo) return;
    if (reduced) {
      showRest(geo);
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
    if (phase === "landed") showRest(geo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo, reduced]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const a = academy;
  const landed = phase === "landed" || reduced;


  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-court-950 text-chalk">
      {/* faint court geometry in the background: a full court seen from above, 13.4 × 6.1 m */}
      <svg aria-hidden="true" className="pointer-events-none absolute -right-[14%] top-[6%] hidden h-[115%] opacity-[0.06] lg:block" viewBox="0 0 610 1340" fill="none" stroke="#ffffff" strokeWidth="4">
        <rect x="2" y="2" width="606" height="1336" />
        <path d="M48 2V1338M562 2V1338M2 670H608M2 472H608M2 868H608M2 78H608M2 1262H608M305 2V472M305 868V1338" />
      </svg>

      <div ref={wrap} className="relative mx-auto max-w-[1320px] px-5 pb-10 pt-28 sm:px-8 lg:pb-12 lg:pt-36">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <p className="eyebrow rise-in text-mat-soft" style={{ animationDelay: "60ms" }}>
              Start right. Keep getting better            </p>
            <h1 id="hero-title" className="display mt-4 text-[clamp(3.3rem,6.15vw,5.9rem)]">
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="rise-line block" style={{ animationDelay: "120ms" }}>Badminton Academy in Noida</span>
              </span>
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="rise-line block text-chalk/55" style={{ animationDelay: "240ms" }}>for Kids, Teens and Adults</span>
              </span>
            </h1>
            <p className="rise-in mt-6 max-w-[52ch] text-pretty text-[1.06rem] leading-relaxed text-chalk/75" style={{ animationDelay: "380ms" }}>
              Celestial's is a badminton academy in Sector 104, Noida, with seven air-conditioned courts, a strength gym and a physio under one roof. Kids can start at four. Adults can start whenever they like. Your first session is free.
            </p>
            {/* Buttons sit together (proximity). On narrow phones they share the row, or stack full-width when it's too tight. */}
            <div className="mt-8 flex w-full flex-row items-center  gap-3">
              <a
                href="#find-your-level"
                className="btn btn-ghost-dark justify-center"
              >
                Find your level
              </a>
              <a
                href={a.contact.phoneHref}
                className="btn btn-primary justify-between lg:mr-40"
              >
                <span>
                  Book a free trial
                  <span className="sr-only">
                    {" "}(calls the academy)
                  </span>
                </span>
                <span className="btn-icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M4 12 12 4M5.5 4H12v6.5" />
                  </svg>
                </span>
              </a>
            </div>
            <p className="rise-in mt-6 text-[0.95rem] text-chalk/60" style={{ animationDelay: "560ms" }}>
              Just want to play?{" "}
              <a href={a.booking.primary.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1 font-semibold text-chalk/85 hover:text-chalk lg:min-h-0">
                <span className="link-underline">Book a court on Hudle</span>
                <ArrowRight size={13} weight="bold" aria-hidden="true" />
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
                <ArrowCounterClockwise size={15} weight="bold" aria-hidden="true" />
                Replay the shot
              </button>
            </div>
            <figcaption className="sr-only">A junior player training on court at Celestial&rsquo;s, Sector 104.</figcaption>
          </figure>
        </div>

        {/* Facts strip, revealed by the court line the shuttle lands on */}
        {/* Facts strip: a hairline and a normal gap (the old landing line under the photo is gone) */}
        <div className="relative mt-10 border-t border-chalk/15 lg:mt-12">
          <ul className="grid grid-cols-1 gap-x-8 gap-y-3 pt-5 text-[0.95rem] text-chalk/80 sm:grid-cols-2 lg:grid-cols-4 lg:pt-6">
            <li className="strip-item flex items-center gap-2">
              <UsersThree size={16} weight="bold" className="text-mat-soft" aria-hidden="true" />
              Kids · Teens · Adults
            </li>
            <li className="strip-item flex items-center gap-2">
              <CalendarDots size={16} weight="bold" className="text-mat-soft" aria-hidden="true" />
              Morning, evening &amp; weekend batches
            </li>
            <li className="strip-item flex items-center gap-2">
              <VideoCamera size={16} weight="bold" className="text-mat-soft" aria-hidden="true" />
              Assessments &amp; video analysis
            </li>
            <li className="strip-item flex items-center gap-2">
              <Star size={16} weight="fill" className="text-accent" aria-hidden="true" />
              <a href={a.rating.url} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex min-h-[44px] items-center lg:min-h-0">
                {a.rating.value} on Google · {a.rating.countLabel} reviews
              </a>
            </li>
          </ul>
        </div>

        {/* Flight overlay, in the photo's perspective */}
        {geo && (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-visible"
            width={geo.w}
            height={geo.h}
            viewBox={`0 0 ${geo.w} ${geo.h}`}
          >
            <defs>
              <clipPath id="hero-floor-clip">
                <rect x={geo.clip.x} y={geo.clip.y} width={geo.clip.w} height={geo.clip.h} rx={geo.clip.r} />
              </clipPath>
              <mask id="trail-mask" maskUnits="userSpaceOnUse">
                <path ref={reveal} d={geo.airD} stroke="#fff" strokeWidth="14" fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset="1" />
              </mask>
              <mask id="floor-mask" maskUnits="userSpaceOnUse">
                <path ref={floorReveal} d={geo.floorD} stroke="#fff" strokeWidth="10" fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset="1" />
              </mask>
            </defs>
            {/* On the floor (clipped to the photo): the shadow's trace, the shadow, the impact ring */}
            <g clipPath="url(#hero-floor-clip)">
              <path
                ref={floor}
                d={geo.floorD}
                fill="none"
                stroke="#041a1b"
                strokeWidth="2"
                strokeDasharray="5 5"
                mask="url(#floor-mask)"
                style={{ opacity: 0, transition: "opacity 900ms ease" }}
              />
              <ellipse ref={shadow} cx={geo.land.x} cy={geo.land.y} rx="4" ry="1.5" fill="#041a1b" style={{ opacity: 0, filter: "blur(1px)" }} />
              <ellipse ref={impact} cx={geo.land.x} cy={geo.land.y} rx="3" ry="1" fill="none" stroke="#ffffff" strokeWidth="2" style={{ opacity: 0 }} />
            </g>
            {/* In the air */}
            <path
              ref={trail}
              d={geo.airD}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="0.1 6"
              mask="url(#trail-mask)"
              style={{ opacity: 0, transition: "opacity 900ms ease" }}
            />
            <circle ref={ping} cx={geo.launch.x} cy={geo.launch.y} r="5" fill="none" stroke="#ffffff" strokeWidth="2" style={{ opacity: 0 }} />
            <g ref={shuttle} style={{ opacity: 0 }}>
              <ShuttleShape skirtRef={skirt} />
            </g>
          </svg>
        )}
      </div>
    </section>
  );
}
