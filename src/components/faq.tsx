import { Plus } from "@phosphor-icons/react/ssr";

/** Native <details>: keyboard and screen-reader accessible with zero JS. */
export function Faq({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <div className="border-b-2 border-ink/10">
      {items.map((it) => (
        <details key={it.q} className="group border-t-2 border-ink/10">
          <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-[1.12rem] font-semibold [&::-webkit-details-marker]:hidden">
            {it.q}
            <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 ring-ink/20 transition-transform duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-lime">
              <Plus size={16} weight="bold" />
            </span>
          </summary>
          <div className="max-w-[64ch] pb-6 pr-12 leading-relaxed text-ink-soft">{it.a}</div>
        </details>
      ))}
    </div>
  );
}
