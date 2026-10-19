import { Reveal } from "./reveal";

/** Numbered section heading — the "01 / 02 / 03" strip pattern observed on Roland-Garros. */
export function SectionHead({
  index,
  label,
  title,
  intro,
  tone = "light",
  id,
  className = "",
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "light" | "dark";
  id?: string;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <Reveal className={className}>
      <div className={`flex items-center gap-4 ${dark ? "text-chalk/55" : "text-ink-soft"}`}>
        <span className="eyebrow">{index}</span>
        <span className={`h-[2px] w-10 ${dark ? "bg-chalk/25" : "bg-ink/20"}`} aria-hidden="true" />
        <span className="eyebrow">{label}</span>
      </div>
      <h2 id={id} className={`display mt-5 max-w-[16ch] text-[clamp(2.6rem,5.4vw,4.9rem)] ${dark ? "text-chalk" : "text-ink"}`}>
        {title}
      </h2>
      {intro && <p className={`mt-5 max-w-[58ch] text-[1.05rem] leading-relaxed ${dark ? "text-chalk/70" : "text-ink-soft"}`}>{intro}</p>}
    </Reveal>
  );
}
