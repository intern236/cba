"use client";

import { useSyncExternalStore } from "react";
import { academy } from "@/lib/academy";


function toMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
function fmt(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h % 12 || 12;
  return m ? `${hh}:${String(m).padStart(2, "0")} ${ap}` : `${hh} ${ap}`;
}

function getSlots(dayConfig: (typeof academy.hours)[number] | undefined) {
  if (!dayConfig) return [];
  if ("slots" in dayConfig && dayConfig.slots) {
    return [...dayConfig.slots];
  }
  if ("open" in dayConfig && "close" in dayConfig) {
    return [{ open: dayConfig.open, close: dayConfig.close }];
  }
  return [];
}

/** Computes open/closed in the venue's own time zone (Asia/Kolkata), not the visitor's. */
export function computeStatus(now = new Date()): { open: boolean; label: string } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = get("weekday");
  const mins = Number(get("hour")) * 60 + Number(get("minute"));
  const idx = academy.hours.findIndex((h) => h.day === day);
  const today = academy.hours[idx];
  const todaySlots = getSlots(today);

  const currentSlot = todaySlots.find(
    (s) => mins >= toMinutes(s.open) && mins < toMinutes(s.close)
  );
  if (currentSlot) {
    return { open: true, label: `Open now · until ${fmt(currentSlot.close)}` };
  }

  const upcomingSlot = todaySlots.find((s) => mins < toMinutes(s.open));
  if (upcomingSlot) {
    return { open: false, label: `Opens today at ${fmt(upcomingSlot.open)}` };
  }

  const next = academy.hours[(idx + 1) % 7];
  const nextSlots = getSlots(next);
  const firstNextSlot = nextSlots[0];
  if (firstNextSlot) {
    return { open: false, label: `Closed · opens ${fmt(firstNextSlot.open)} tomorrow` };
  }

  return { open: false, label: "Closed" };
}

/** Re-render once a minute; the snapshot is a string so React can compare it cheaply. */
function subscribeMinute(cb: () => void) {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
}
const snapshot = () => JSON.stringify(computeStatus());

export function OpenStatus({ className = "" }: { className?: string }) {
  const raw = useSyncExternalStore(subscribeMinute, snapshot, () => null);
  const s = raw ? (JSON.parse(raw) as { open: boolean; label: string }) : null;
  // Server render / no-JS fallback shows the static summary, so nothing is ever blank.
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden="true"
        className={`relative inline-block h-2 w-2 rounded-full ${s ? (s.open ? "bg-lime" : "bg-cork") : "bg-chalk/50"}`}
      >
        {s?.open && <span className="absolute inset-0 animate-ping rounded-full bg-lime/70" />}
      </span>
      <span>{s ? s.label : academy.hoursSummary}</span>
    </span>
  );
}
