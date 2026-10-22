"use client";

import { useId, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { academy, trialLink } from "@/lib/academy";
import { levels, levelById, type Level } from "@/lib/pathway";
import { feesFrom } from "@/lib/batches";

/**
 * "Find your level" — the academy's guided chooser (research: Yonex Racquet Selector; IMG's
 * "Not sure? Talk to an advisor"; Chernev et al. 2015 — overload appears under uncertainty,
 * so give a default). Three questions, one recommended starting level shown ON the pathway
 * (goal-gradient: a visible start point and a visible next step), and a trial request that
 * carries the answers into WhatsApp so the academy can place the player before they arrive.
 */

type Who = "me" | "child";
type Age = "5to7" | "8to10" | "11to16" | "17plus";
type Now = "never" | "casual" | "coached" | "tournaments";
type Goal = "game" | "fun" | "good" | "compete";

const AGE: { value: Age; label: string }[] = [
  { value: "5to7", label: "5–7" },
  { value: "8to10", label: "8–10" },
  { value: "11to16", label: "11–16" },
  { value: "17plus", label: "17+" },
];

const NOW: Record<Who, { value: Now; label: string }[]> = {
  me: [
    { value: "never", label: "Never really played" },
    { value: "casual", label: "I play, never coached" },
    { value: "coached", label: "Coached, play regularly" },
    { value: "tournaments", label: "I play tournaments" },
  ],
  child: [
    { value: "never", label: "New to badminton" },
    { value: "casual", label: "Plays for fun" },
    { value: "coached", label: "Has had coaching" },
    { value: "tournaments", label: "Plays state or national events" },
  ],
};

const GOAL: Record<Who, { value: Goal; label: string }[]> = {
  me: [
    { value: "fun", label: "Fitness and fun" },
    { value: "good", label: "Get properly good" },
    { value: "compete", label: "Compete" },
    { value: "game", label: "Just a game with friends" },
  ],
  child: [
    { value: "fun", label: "Enjoy a sport" },
    { value: "good", label: "Build real skills" },
    { value: "compete", label: "Compete seriously" },
  ],
};

/**
 * Placement rules, using the academy's programme ages (Beginner ≈5–10, Intermediate ≈8–16,
 * Professional = state & national competitors). Adults who aren't competing go to an adult
 * batch, which is one of the academy's listed formats rather than a pathway level.
 */
type Placement = { kind: "level"; level: Level } | { kind: "adult"; oneToOne: boolean } | { kind: "court" };

function place(who: Who, age: Age | null, now: Now, goal: Goal): Placement {
  if (goal === "game") return { kind: "court" };
  const compete = goal === "compete";
  if (who === "me") {
    if (now === "tournaments" && compete) return { kind: "level", level: levelById.professional };
    return { kind: "adult", oneToOne: goal === "good" || compete };
  }
  // Child
  if (now === "tournaments" && goal !== "fun") return { kind: "level", level: levelById.professional };
  if (age === "5to7" || now === "never") return { kind: "level", level: levelById.beginner };
  if (age === "17plus" && !compete) return { kind: "adult", oneToOne: goal === "good" };
  if (now === "casual" && age === "8to10") return { kind: "level", level: levelById.beginner };
  return { kind: "level", level: levelById.intermediate };
}

function label<T extends string>(opts: { value: T; label: string }[], v: T | null) {
  return opts.find((o) => o.value === v)?.label ?? "";
}

function Choice<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="eyebrow text-ink-soft">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="cursor-pointer">
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="peer sr-only" />
            <span className="flex min-h-[44px] items-center rounded-full px-4 text-[0.95rem] font-medium ring-1 ring-ink/20 transition-colors hover:ring-ink/50 peer-checked:bg-ink peer-checked:text-chalk peer-checked:ring-ink peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Step({ show, k, children }: { show: boolean; k: string; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence initial={false}>
      {show && (
        <m.div key={k} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }}>
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
}

/** The programmes as a court line; the recommended one is lit. */
function PathStrip({ active }: { active: Level["id"] }) {
  const at = levels.findIndex((l) => l.id === active);
  return (
    <ol className="mt-5 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${levels.length}, minmax(0, 1fr))` }} aria-label="Where this sits on the pathway">
      {levels.map((l, i) => (
        <li key={l.id} className="min-w-0">
          <span aria-hidden="true" className={`block h-1.5 rounded-full ${i === at ? "bg-accent" : i < at ? "bg-chalk/45" : "bg-chalk/15"}`} />
          <span className={`eyebrow mt-2 block truncate text-[0.62rem] ${i === at ? "text-accent" : "text-chalk/50"}`}>
            {l.name}
            {i === at && <span className="sr-only"> (your starting level)</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function LevelFinder({ id: anchor = "find-your-level", wide = false }: { id?: string; wide?: boolean }) {
  const id = useId();
  const reduce = useReducedMotion();
  const [who, setWho] = useState<Who | null>(null);
  const [age, setAge] = useState<Age | null>(null);
  const [now, setNow] = useState<Now | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);

  const needAge = who === "child";
  const askNow = who && (!needAge || age);
  const done = who && now && goal && (!needAge || age);
  const placement = done ? place(who!, age, now!, goal!) : null;
  const lvl = placement?.kind === "level" ? placement.level : null;

  const details = done
    ? [
        `Player: ${who === "me" ? "me (adult)" : `my child, ${label(AGE, age)}`}`,
        `Experience: ${label(NOW[who!], now)}`,
        `Goal: ${label(GOAL[who!], goal)}`,
        lvl ? `Suggested programme on your site: ${lvl.name}` : placement?.kind === "adult" ? "Suggested on your site: adult batch" : "",
      ]
        .filter(Boolean)
        .join("\n")
    : undefined;

  const reset = (from: "who" | "age" | "now") => {
    if (from === "who") setAge(null);
    if (from === "who" || from === "age") setNow(null);
    setGoal(null);
  };

  return (
    <div id={anchor} className="on-light scroll-mt-28 rounded-[28px] bg-chalk-2 p-6 sm:p-8">
      <p className="display text-[clamp(1.9rem,3vw,2.4rem)] text-ink">Find your level</p>
      <p className="mt-1 text-ink-soft">A few quick questions. We&rsquo;ll suggest where to start and send your answers with the trial request.</p>

      <div className={wide ? "mt-6 grid gap-8 lg:grid-cols-2 lg:items-start" : ""}>
      <div className={`grid gap-6 ${wide ? "" : "mt-6"}`}>
        <Choice
          name={`${id}-who`}
          legend="Who is playing?"
          options={[
            { value: "me", label: "Me" },
            { value: "child", label: "My child" },
          ]}
          value={who}
          onChange={(v) => {
            setWho(v);
            reset("who");
          }}
        />
        <Step show={needAge} k="age">
          <Choice name={`${id}-age`} legend="How old?" options={AGE} value={age} onChange={(v) => { setAge(v); reset("age"); }} />
        </Step>
        <Step show={!!askNow} k={`now-${who}`}>
          {who && <Choice name={`${id}-now`} legend={who === "me" ? "Where are you now?" : "Where are they now?"} options={NOW[who]} value={now} onChange={(v) => { setNow(v); reset("now"); }} />}
        </Step>
        <Step show={!!(askNow && now)} k={`goal-${who}`}>
          {who && <Choice name={`${id}-goal`} legend="What’s the goal?" options={GOAL[who]} value={goal} onChange={setGoal} />}
        </Step>
      </div>

      <div aria-live="polite" className={wide ? "mt-1 lg:mt-0" : "mt-7"}>
        {done ? (
          <m.div
            key={`${lvl?.id ?? placement?.kind}-${goal}`}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="rounded-[22px] bg-court-950 p-6 text-chalk sm:p-7"
          >
            {lvl ? (
              <>
                <p className="eyebrow text-mat-soft">Start in</p>
                <p className="display mt-2 text-[clamp(2.4rem,4vw,3rem)]">
                  {lvl.name} <span className="text-chalk/45">· {lvl.tagline}</span>
                </p>
                <PathStrip active={lvl.id} />
                <p className="mt-5 max-w-[52ch] text-chalk/75">
                  <strong className="font-semibold text-chalk">You&rsquo;ll work on:</strong> {lvl.work.slice(0, 3).join(", ").toLowerCase()}.{" "}
                  <strong className="font-semibold text-chalk">Format:</strong> {lvl.format.toLowerCase()}.
                </p>
                <p className="mt-2 text-sm text-chalk/55">
                  Fees from {feesFrom} a month. The coach confirms the programme in your free first session.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a href={trialLink(details)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <span>
                      Book a free trial
                      <span className="sr-only"> (opens WhatsApp in a new tab, with your answers filled in)</span>
                    </span>
                    <span className="btn-icon" aria-hidden="true"><ArrowUpRight size={16} weight="bold" /></span>
                  </a>
                  <Link href={`/pathway/#${lvl.id}`} className="inline-flex items-center gap-1.5 font-semibold text-chalk/85 hover:text-chalk">
                    <span className="link-underline">About {lvl.name}</span>
                    <ArrowRight size={14} weight="bold" aria-hidden="true" />
                  </Link>
                </div>
              </>
            ) : placement?.kind === "adult" ? (
              <>
                <p className="eyebrow text-mat-soft">Start in</p>
                <p className="display mt-2 text-[clamp(2.4rem,4vw,3rem)]">
                  An adult batch{placement.oneToOne && <span className="text-chalk/45"> + one-to-one</span>}
                </p>
                <p className="mt-3 max-w-[50ch] text-chalk/75">
                  Group coaching for adults in the morning, evening or at weekends.
                  {placement.oneToOne && " Add one-to-one sessions if you want faster, individual feedback."} Fees from {feesFrom} a month.
                </p>
                <p className="mt-2 text-sm text-chalk/55">The coach confirms the right batch in your free first session.</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a href={trialLink(details)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <span>
                      Book a free trial
                      <span className="sr-only"> (opens WhatsApp in a new tab, with your answers filled in)</span>
                    </span>
                    <span className="btn-icon" aria-hidden="true"><ArrowUpRight size={16} weight="bold" /></span>
                  </a>
                  <Link href="/programs/#timings" className="inline-flex items-center gap-1.5 font-semibold text-chalk/85 hover:text-chalk">
                    <span className="link-underline">Batch timings &amp; fees</span>
                    <ArrowRight size={14} weight="bold" aria-hidden="true" />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="eyebrow text-mat-soft">You want</p>
                <p className="display mt-2 text-[clamp(2.4rem,4vw,3rem)]">A court, not a coach</p>
                <p className="mt-3 max-w-[48ch] text-chalk/75">
                  Book a court for an hour on Hudle. Up to 4 players per court; non-marking shoes required.
                  If you ever want to get better, the first coaching session is free.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a href={academy.booking.primary.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <span>
                      Book a court on Hudle
                      <span className="sr-only"> (opens Hudle in a new tab)</span>
                    </span>
                    <span className="btn-icon" aria-hidden="true"><ArrowUpRight size={16} weight="bold" /></span>
                  </a>
                </div>
              </>
            )}
          </m.div>
        ) : (
          <p className="rounded-[20px] border-2 border-dashed border-ink/15 px-6 py-5 text-ink-soft">Your starting level will appear here.</p>
        )}
      </div>
      </div>
    </div>
  );
}
