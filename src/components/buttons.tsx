import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react/ssr";

type Variant = "primary" | "ghost-dark" | "ink" | "ghost-light";

const cls: Record<Variant, string> = {
  primary: "btn btn-primary",
  "ghost-dark": "btn btn-ghost-dark",
  ink: "btn btn-ink",
  "ghost-light": "btn btn-ghost-light",
};

/** External booking / messaging link. Always says where it goes (research: label the hand-off). */
export function ExternalButton({
  href,
  children,
  variant = "primary",
  note,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  note?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cls[variant]} ${className}`}
    >
      <span>
        {children}
        <span className="sr-only">{note ? ` (${note} in a new tab)` : " (opens in a new tab)"}</span>
      </span>
      {variant === "primary" || variant === "ink" ? (
        <span className="btn-icon" aria-hidden="true">
          <ArrowUpRight size={16} weight="bold" />
        </span>
      ) : (
        <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
      )}
    </a>
  );
}

export function InternalButton({
  href,
  children,
  variant = "ghost-dark",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${cls[variant]} ${className}`}>
      <span>{children}</span>
      {variant === "primary" || variant === "ink" ? (
        <span className="btn-icon" aria-hidden="true">
          <ArrowRight size={16} weight="bold" />
        </span>
      ) : (
        <ArrowRight size={16} weight="bold" aria-hidden="true" />
      )}
    </Link>
  );
}

export function TextLink({ href, children, external = false, className = "" }: { href: string; children: React.ReactNode; external?: boolean; className?: string }) {
  const inner = (
    <>
      <span className="link-underline">{children}</span>
      {external ? <ArrowUpRight size={14} weight="bold" aria-hidden="true" /> : <ArrowRight size={14} weight="bold" aria-hidden="true" />}
    </>
  );
  const c = `inline-flex items-center gap-1.5 font-semibold ${className}`;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={c}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={c}>
      {inner}
    </Link>
  );
}
