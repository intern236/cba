import type { Ref } from "react";

/**
 * A feather shuttlecock drawn in local coordinates with the cork tip at (0,0)
 * pointing along +x. The skirt trails behind (−x), as in real flight: the centre
 * of mass sits ~3 cm ahead of the centre of drag, so the cork always leads.
 */
export function ShuttleShape({ skirtRef }: { skirtRef?: Ref<SVGGElement> }) {
  return (
    <g>
      <g ref={skirtRef}>
        <path d="M-10,-4.6 L-35,-13.5 Q-36.5,0 -35,13.5 L-10,4.6 Z" fill="#ffffff" />
        <path
          d="M-10,-2.4 L-35,-8 M-10,0 L-35.6,0 M-10,2.4 L-35,8 M-22,-8.6 Q-23,0 -22,8.6"
          stroke="#072628"
          strokeOpacity="0.28"
          strokeWidth="0.9"
          fill="none"
        />
      </g>
      <rect x="-11.2" y="-5.2" width="2.6" height="10.4" rx="0.8" fill="#03989e" />
      <path d="M-8.8,-5.2 L-3.2,-5.2 A5.2,5.2 0 0 1 -3.2,5.2 L-8.8,5.2 Z" fill="#dfe6e6" />
    </g>
  );
}

/** Static brand mark: a shuttle resting at the end of a clear's arc. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path d="M5 40 C 12 8, 30 2, 36 30" fill="none" stroke="#03989e" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="0.1 5.2" />
      <g transform="translate(38 36) rotate(84) scale(0.58)">
        <ShuttleShape />
      </g>
      <path d="M4 44 H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
