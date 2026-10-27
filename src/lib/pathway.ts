
export type Level = {
  id: "beginner" | "intermediate" | "professional";
  n: string;
  name: string;
  tagline: string;
  forWho: string;
  ages: string;
  work: string[];
  readyWhen: string[];
  format: string;
  support: string[];
};

export const levels: Level[] = [
  {
    id: "beginner",
    n: "01",
    name: "Beginner",
    tagline: "Start with the fundamentals",
    forWho: "New players, roughly 5 to 10 years old, starting from the basics.",
    ages: "Approx. 5–10 yrs",
    work: [
      "Badminton basics",
      "Footwork and coordination",
      "Building a love for the game",
      "Grip, ready position and serves", // proposed detail
      "Keeping a rally going", // proposed detail
    ],
    readyWhen: ["You can keep a rally going and serve legally", "Your footwork gets you to all four corners", "Your coach says you're ready"],
    format: "Group batch",
    support: ["Coach feedback every session", "Periodic assessments"],
  },
  {
    id: "intermediate",
    n: "02",
    name: "Intermediate",
    tagline: "Build a stronger game",
    forWho: "Roughly 8 to 16 years old: school and district players building a real game.",
    ages: "Approx. 8–16 yrs",
    work: [
      "Match play and tactics",
      "Fitness and movement",
      "Consistency under pressure",
      "Full-court strokes: clears, drops, smash and net play", // proposed detail
    ],
    readyWhen: ["You're competing at district level or above", "You can train to a weekly plan", "Your coach agrees you're ready"],
    format: "Group batch, with one-to-one sessions for faster progress",
    support: ["Periodic assessments", "Video analysis", "Strength & conditioning"],
  },
  {
    id: "professional",
    n: "03",
    name: "Professional",
    tagline: "Train to compete",
    forWho: "State and national competitors.",
    ages: "State & national",
    work: [
      "High-intensity training",
      "Conditioning and video analysis",
      "Tournament planning",
      "Match review and tactics against different opponents", // proposed detail
    ],
    readyWhen: ["State and national tournaments: this is where the work becomes results"],
    format: "Academy training plus one-to-one",
    support: ["Assessments", "Video analysis", "Individual reviews", "Strength & conditioning", "Physio", "Exchange with BATTS Athletics Academy, Canada"],
  },
];

export const levelById = Object.fromEntries(levels.map((l) => [l.id, l])) as Record<Level["id"], Level>;

/** Other ways to train, from the academy's programme list. */
export const otherFormats = ["Adult batches", "One-on-one coaching", "Weekend batch", "Pay-and-play"] as const;

/** "Three", "Four"… for headings, so copy follows the data. */
export const levelCountWord = ["Zero", "One", "Two", "Three", "Four", "Five"][levels.length] ?? String(levels.length);
