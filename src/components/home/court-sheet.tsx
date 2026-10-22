import { academy } from "@/lib/academy";
import { levels } from "@/lib/pathway";
import { Reveal } from "../reveal";

/**
 * Notion asks for a "Stats" section. Revision 2 leads with academy numbers (players trained,
 * pathway levels, batch windows) and keeps courts and rating as supporting facts.
 * Research: Gopichand's count-up counters render "0"
 * without JS and read as template; Third Space/IMG use concrete numbers instead of
 * adjectives. So: static numbers, each with where it comes from — styled as a score sheet.
 */
export function CourtSheet() {
  const a = academy;
  const first = levels[0];
  const last = levels[levels.length - 1];
  const rows = [
    { k: "Trained", v: a.studentsTrained, unit: "players", note: "Coached at the academy" },
    // Count and range come from lib/pathway.ts, so this stays correct if the levels change again.
    { k: "Pathway", v: String(levels.length), unit: "levels", note: `${first.name} to ${last.name}` },
    { k: "Batches", v: "3", unit: "windows", note: "Morning, evening, weekend" },
    { k: "Courts", v: String(a.courts.count), unit: "indoor", note: "Fully air-conditioned hall" },
    { k: "Google", v: a.rating.value, unit: "★", note: `From ${a.rating.countLabel} reviews` },
  ];
  return (
    <section aria-labelledby="sheet-title" className="bg-court-950 text-chalk">
      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="sheet-title" className="display text-[clamp(2.2rem,4vw,3.4rem)]">
            The score sheet
          </h2>
          <p className="eyebrow text-chalk/55">Celestial&rsquo;s · Sector 104 · Noida</p>
        </Reveal>
        <dl className="mt-10 grid grid-cols-2 border-y-2 border-chalk/20 md:grid-cols-3 lg:grid-cols-5">
          {rows.map((r, i) => (
            <Reveal
              key={r.k}
              delay={i * 0.06}
              className={`relative flex flex-col justify-between gap-6 py-7 pr-4 ${i > 0 ? "lg:border-l-2 lg:border-chalk/20 lg:pl-6" : ""} ${i % 2 === 1 ? "border-l-2 border-chalk/20 pl-5 md:border-l-0 md:pl-0" : ""} ${i >= 2 ? "border-t-2 border-chalk/20 md:border-t-0" : ""}`}
            >
              <dt className="eyebrow text-chalk/55">{r.k}</dt>
              <dd>
                <span className="flex items-baseline gap-2">
                  <span className="display text-[clamp(3.2rem,5.4vw,5rem)] leading-[0.85]">{r.v}</span>
                  <span className="eyebrow text-mat-soft">{r.unit}</span>
                </span>
                <span className="mt-3 block text-sm text-chalk/60">{r.note}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}