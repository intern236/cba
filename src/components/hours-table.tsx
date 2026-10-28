"use client";

import { useSyncExternalStore } from "react";
import { academy } from "@/lib/academy";

function fmt(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}${m ? ":" + String(m).padStart(2, "0") : ""} ${ap}`;
}

function subscribeMinute(cb: () => void) {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
}
const weekdayInNoida = () => new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "long" }).format(new Date());

/** Weekly hours with today (in Noida time) highlighted. Renders fully without JS. */
export function HoursTable({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const today = useSyncExternalStore(subscribeMinute, weekdayInNoida, () => null);
  const dark = tone === "dark";
  return (
    <table className="w-full text-left">
      <caption className="sr-only">Opening hours (India Standard Time)</caption>
      <tbody>
        {academy.hours.map((h) => {
          const isToday = h.day === today;
          return (
            <tr key={h.day} className={`border-t ${dark ? "border-chalk/12" : "border-ink/10"}`}>
              <th scope="row" className={`py-2.5 pr-4 font-medium ${isToday ? (dark ? "text-lime" : "text-ink") : dark ? "text-chalk/70" : "text-ink-soft"}`}>
                {h.day}
                {isToday && <span className="eyebrow ml-2 text-[0.65rem]">Today</span>}
              </th>
              <td className={`py-2.5 text-right tabular-nums ${isToday ? "font-semibold" : ""} ${dark ? "text-chalk" : "text-ink"}`}>
                {"slots" in h && h.slots
                  ? h.slots.map((slot, index) => (
                    <span key={slot.open}>
                      {index > 0 && " / "}
                      {fmt(slot.open)} – {fmt(slot.close)}
                    </span>
                  ))
                  : "open" in h && "close" in h
                    ? `${fmt(h.open)} – ${fmt(h.close)}`
                    : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
