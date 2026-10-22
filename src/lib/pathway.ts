/**
 * The training pathway: three levels a player moves through.
 *
 * STATUS: Level names, age bands and the focus of each level come from the academy's brief
 * (Beginner / Intermediate / Professional). The detailed skill lists under `work` and the
 * "ready to move up" markers in `readyWhen` follow a standard badminton coaching progression
 * and still need checking by the head coach before launch (see docs/DEPENDENCIES.md).
 * The academy's published material confirms group and one-to-one formats, periodic
 * assessments, strength & conditioning, video analysis, individual reviews and a physio on
 * site (sources in academy.ts).
 * Edit here only. Every page reads from this file.
 */
export type Level = {
  id: "beginner" | "intermediate" | "professional";
  n: string;
  name: string;
  tagline: string;
  forWho: string;
  ages: string;
  /** The one-line focus of the level, straight from the academy's brief. */
  focus: string;
  work: string[];
  readyWhen: string[];
  format: string;
  /** Which of the academy's confirmed methods carry most weight at this level. */
  support: string[];
};

export const levels: Level[] = [
  {
    id: "beginner",
    n: "01",
    name: "Beginner",
    tagline: "First steps on court",
    forWho: "New players taking up the sport, usually young children.",
    ages: "Approx. 5–10 yrs",
    focus: "Basics, footwork, love for the game",
    work: [
      "Grip and ready position",
      "Basic footwork to all four corners",
      "Underarm and high serves",
      "The overhead clear",
      "Keeping a rally going",
      "Fun games that build a love for the sport",
    ],
    readyWhen: [
      "You can keep a rally going for 10+ shots",
      "You serve legally, every time",
      "You look forward to every session",
    ],
    format: "Group batch",
    support: ["Coach feedback in every session", "Periodic assessments"],
  },
  {
    id: "intermediate",
    n: "02",
    name: "Intermediate",
    tagline: "Build a real game",
    forWho: "School and district-level players who can rally and are ready to compete.",
    ages: "Approx. 8–16 yrs",
    focus: "Match play, tactics, fitness",
    work: [
      "Full-court footwork patterns",
      "Clears, drops, net shots and a first smash",
      "Singles and doubles tactics and positioning",
      "Regular match play",
      "Fitness: stamina, speed and agility",
    ],
    readyWhen: [
      "You move back to base after every shot",
      "You play a full match with a clear plan",
      "You are competing at school or district level",
    ],
    format: "Group batch, with one-to-one sessions for faster progress",
    support: ["Periodic assessments", "Video analysis of key strokes", "Strength & conditioning"],
  },
  {
    id: "professional",
    n: "03",
    name: "Professional",
    tagline: "Train like a player",
    forWho: "State and national competitors training for results.",
    ages: "State / national level",
    focus: "High-intensity training, conditioning, video analysis, tournament plan",
    work: [
      "High-intensity court sessions",
      "Strength & conditioning in the gym",
      "Video analysis of your matches and opponents",
      "Deception, shot variety and game-situation practice",
      "A season-long tournament plan",
    ],
    readyWhen: [
      "You are competing at state or national level",
      "You train to a weekly and seasonal plan",
      "Your coach agrees you're ready",
    ],
    format: "Group batch plus one-to-one",
    support: ["Strength & conditioning", "Video analysis", "Individual reviews", "Physio on site"],
  },
];

export const levelById = Object.fromEntries(levels.map((l) => [l.id, l])) as Record<Level["id"], Level>;