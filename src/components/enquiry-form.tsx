"use client";

import { useState } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
export const ENQUIRY_ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? "";

type Errors = Partial<Record<"name" | "phone" | "interest", string>>;

export function EnquiryForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [errors, setErrors] = useState<Errors>({});
  if (!ENQUIRY_ENDPOINT) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const err: Errors = {};
    if (!data.name?.trim()) err.name = "Please tell us your name.";
    if (!/^[+\d][\d\s-]{8,}$/.test(data.phone ?? "")) err.phone = "Enter a phone number we can call or WhatsApp.";
    if (!data.interest) err.interest = "Choose what you’re interested in.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setState("sending");
    try {
      const r = await fetch(ENQUIRY_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
      setState(r.ok ? "sent" : "failed");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent")
    return (
      <div role="status" className="flex gap-3 rounded-[22px] bg-mat-soft/40 p-6">
        <CheckCircle size={24} weight="fill" className="text-court-800" aria-hidden="true" />
        <p>Thanks — we&rsquo;ll call or WhatsApp you within a day.</p>
      </div>
    );

  const field = "min-h-[48px] w-full rounded-xl bg-white px-4 ring-1 ring-ink/15 focus:outline-none focus:ring-2 focus:ring-ink";
  return (
    <form onSubmit={onSubmit} noValidate className="on-light grid gap-5 rounded-[28px] bg-chalk-2 p-7 sm:p-9">
      <p className="display text-[2rem]">Send an enquiry</p>
      <div className="grid gap-2">
        <label htmlFor="eq-name" className="font-semibold">Name</label>
        <input id="eq-name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "eq-name-err" : undefined} />
        {errors.name && <p id="eq-name-err" className="text-sm text-[#9a2c14]">{errors.name}</p>}
      </div>
      <div className="grid gap-2">
        <label htmlFor="eq-phone" className="font-semibold">Phone / WhatsApp</label>
        <input id="eq-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} aria-invalid={!!errors.phone} aria-describedby="eq-phone-help" />
        <p id="eq-phone-help" className="text-sm text-ink-soft">{errors.phone ? <span className="text-[#9a2c14]">{errors.phone}</span> : "We’ll reply by call or WhatsApp."}</p>
      </div>
      <div className="grid gap-2">
        <label htmlFor="eq-interest" className="font-semibold">Interested in</label>
        <select id="eq-interest" name="interest" className={field} defaultValue="" aria-invalid={!!errors.interest}>
          <option value="" disabled>Choose one</option>
          <option>Free trial — junior coaching</option>
          <option>Free trial — adult coaching</option>
          <option>One-to-one coaching</option>
          <option>Group or corporate court booking</option>
          <option>Something else</option>
        </select>
        {errors.interest && <p className="text-sm text-[#9a2c14]">{errors.interest}</p>}
      </div>
      <div className="grid gap-2">
        <label htmlFor="eq-msg" className="font-semibold">Message <span className="font-normal text-ink-soft">(optional)</span></label>
        <textarea id="eq-msg" name="message" rows={3} className={`${field} py-3`} />
      </div>
      {state === "failed" && (
        <p role="alert" className="flex gap-2 text-[#9a2c14]">
          <WarningCircle size={20} weight="bold" aria-hidden="true" /> That didn&rsquo;t send. Please try again, or message us on WhatsApp.
        </p>
      )}
      <button type="submit" disabled={state === "sending"} className="btn btn-ink justify-center disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
