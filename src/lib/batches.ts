/**
 * Batch timings and monthly fees — supplied by the academy, 21 Oct 2026 (as shown in the
 * homepage programme slider). Single source for the slider, /programs and the level finder.
 * Confirm before launch that these are current (docs/DEPENDENCIES.md).
 */
export const fees = [
  { plan: "3 days a week", price: "₹4,000" },
  { plan: "4 days a week", price: "₹5,000" },
  { plan: "5 days a week", price: "₹6,000" },
  { plan: "6 days a week", price: "₹7,000" },
  { plan: "Weekends only", price: "₹3,500" },
] as const;

export const weekdayTimings = ["8:00 am–1:00 pm", "5:00–6:30 pm", "6:30–8:00 pm", "8:30–10:00 pm"] as const;

export const weekendTimings = ["11:00 am–1:00 pm", "7:15–9:15 pm"] as const;

/** Lowest monthly fee, for "from ₹…" lines. */
export const feesFrom = fees.reduce((min, f) => {
  const n = Number(f.price.replace(/[^\d]/g, ""));
  return n < min.n ? { n, label: f.price } : min;
}, { n: Infinity, label: "" }).label;
