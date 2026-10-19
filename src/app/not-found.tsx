import Link from "next/link";
import { ShuttleShape } from "@/components/shuttle";

export default function NotFound() {
  return (
    <section className="bg-court-950 text-chalk">
      <div className="mx-auto max-w-[1320px] px-5 pb-24 pt-40 sm:px-8">
        <p className="eyebrow text-mat-soft">404</p>
        <h1 className="display mt-5 text-[clamp(3.4rem,9vw,8rem)]">That one landed out.</h1>
        <p className="mt-6 max-w-[48ch] text-lg text-chalk/75">The page you were looking for isn&rsquo;t here. Head back to the court.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">Back to home</Link>
          <Link href="/contact/" className="btn btn-ghost-dark">Contact &amp; directions</Link>
        </div>
        <div className="relative mt-20" aria-hidden="true">
          <svg className="absolute -top-[26px] right-[12%] h-10 w-14 overflow-visible" viewBox="-40 -20 50 40">
            <g transform="translate(-2 2) rotate(166) scale(0.9)">
              <ShuttleShape />
            </g>
          </svg>
          <div className="h-[2px] bg-chalk/25" />
        </div>
      </div>
    </section>
  );
}
