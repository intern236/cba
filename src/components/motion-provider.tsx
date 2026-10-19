"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/** Loads only the DOM-animation feature set (smaller than the full `motion` bundle). */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
