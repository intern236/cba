"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { ShuttleShape } from "../shuttle";

/**
 * Mobile (< lg) version of the signature shuttle flight for vertical step lists.
 *
 * Phones are the main audience, and a timed animation is easy to scroll straight past on a
 * phone. So below lg the shuttle is tied to the scroll position instead: it hops down the
 * list's left rail from dot to dot (each hop bulges into the gutter), the rail fills behind
 * it, and the parent lights each dot as the shuttle lands on it (via `onReach`).
 * Transform-only updates, passive listeners, at most one rAF per frame.
 * Reduced motion: drawn in its final state, nothing moves.
 *
 * Expects each step <li> to carry its dot at `top-1` (12 px tall) on its left border.
 */
const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const m = window.matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const getRM = () => window.matchMedia(RM).matches;

export function RailFlight({
  wrapRef,
  itemRefs,
  count,
  onReach,
  tone = "light",
}: {
  wrapRef: RefObject<HTMLElement | null>;
  itemRefs: RefObject<(HTMLElement | null)[]>;
  count: number;
  onReach: (index: number) => void;
  tone?: "light" | "dark";
}) {
  const shuttle = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const reachedRef = useRef(-1);
  const onReachRef = useRef(onReach);
  const [dots, setDots] = useState<number[]>([]);
  const reduced = useSyncExternalStore(subscribeRM, getRM, () => false);

  useEffect(() => {
    onReachRef.current = onReach;
  });

  useEffect(() => {
    const W = wrapRef.current;
    if (!W) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    let frame = 0;
    let ys: number[] = [];

    const measure = () => {
      const top = W.getBoundingClientRect().top;
      ys = (itemRefs.current ?? []).slice(0, count).map((el) => (el ? el.getBoundingClientRect().top - top + 10 : 0));
      setDots(ys);
    };

    const paint = () => {
      frame = 0;
      if (mq.matches || ys.length < 2) return;
      const first = ys[0];
      const last = ys[ys.length - 1];
      let y = last;
      if (!reduced) {
        const anchor = window.innerHeight * 0.62; // shuttle rides a little below mid-screen
        y = Math.min(Math.max(anchor - W.getBoundingClientRect().top, first), last);
      }
      let i = 0;
      while (i < ys.length - 2 && y > ys[i + 1]) i++;
      const seg = Math.max(ys[i + 1] - ys[i], 1);
      const u = Math.min(Math.max((y - ys[i]) / seg, 0), 1);
      const bulge = 13; // px into the left gutter at the top of each hop
      const x = -bulge * Math.sin(Math.PI * u);
      const angle = (Math.atan2(seg, -bulge * Math.PI * Math.cos(Math.PI * u)) * 180) / Math.PI;
      if (shuttle.current) {
        shuttle.current.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${angle.toFixed(1)}deg)`;
        shuttle.current.style.opacity = "1";
      }
      if (fill.current) fill.current.style.transform = `scaleY(${((y - first) / Math.max(last - first, 1)).toFixed(4)})`;
      let r = -1;
      ys.forEach((d, k) => {
        if (y >= d - 1) r = k;
      });
      if (r !== reachedRef.current) {
        reachedRef.current = r;
        onReachRef.current(r);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(W);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [wrapRef, itemRefs, count, reduced]);

  if (dots.length < 2) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] lg:hidden">
      <div
        ref={fill}
        className={`absolute left-0 w-[2px] rounded-full ${tone === "dark" ? "bg-accent" : "bg-mat"}`}
        style={{ top: dots[0], height: dots[dots.length - 1] - dots[0], transform: "scaleY(0)", transformOrigin: "top" }}
      />
      <div ref={shuttle} className="absolute left-[1px] top-0 h-0 w-0 opacity-0 will-change-transform">
        <svg
          width="44"
          height="30"
          viewBox="-40 -15 44 30"
          className="absolute -left-[40px] -top-[15px] overflow-visible"
          style={{ filter: "drop-shadow(0 1.5px 1.5px rgb(11 18 19 / 0.35))" }}
        >
          <ShuttleShape />
        </svg>
      </div>
    </div>
  );
}
