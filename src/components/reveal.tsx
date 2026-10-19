/**
 * Scroll reveal as pure CSS (animation-timeline: view()).
 *
 * Content is visible in the server HTML and never waits for JavaScript (an earlier
 * Framer-based version hid sections until hydration, which pushed mobile LCP past 3 s).
 * Where scroll-driven animations are supported and the visitor hasn't asked for
 * reduced motion, blocks rise into place as they enter the viewport. Motion only — no fading —
 * so text is at full contrast wherever a visitor stops scrolling.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "figure";
}) {
  const Tag = as;
  return (
    <Tag className={`reveal ${className}`} style={delay ? ({ "--reveal-offset": `${Math.round(delay * 60)}%` } as React.CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}
