import Link from "next/link";
import { ShuttleShape } from "./shuttle";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-court-950 text-chalk">
      <div className="mx-auto max-w-[1320px] px-5 pb-14 pt-32 sm:px-8 sm:pt-40 lg:pb-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="eyebrow rise-in flex items-center gap-2 text-mat-soft">
              <Link href="/" className="hover:text-chalk transition-colors">Home</Link>
              <span aria-hidden="true" className="text-chalk/35">/</span>
              <span>{eyebrow}</span>
            </nav>

            <h1 className="display mt-5 text-[clamp(3.2rem,7.4vw,6.6rem)]">
              <span className="drop-in block">{title}</span>
            </h1>
            {intro && (
              <p className="rise-in mt-6 max-w-[56ch] text-[1.08rem] leading-relaxed text-chalk/75" style={{ animationDelay: "220ms" }}>
                {intro}
              </p>
            )}
          </div>
          {children && <div className="rise-in lg:col-span-4" style={{ animationDelay: "300ms" }}>{children}</div>}
        </div>
        <div className="relative mt-14" aria-hidden="true">
          <svg className="absolute -top-[30px] right-[8%] h-10 w-14 overflow-visible" viewBox="-40 -20 50 40">
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