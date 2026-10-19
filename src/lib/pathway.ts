/**
 * The training pathway — four levels a player moves through.
 *
 * STATUS: PROPOSED, NOT YET CONFIRMED BY THE ACADEMY (see docs/DEPENDENCIES.md).
 * The academy's published material confirms coaching for kids, teens and adults, group and
 * one-to-one formats, morning/evening/weekend batches, periodic assessments, strength &
 * conditioning, video analysis, individual reviews, a physio on site and an exchange with
 * BATTS Athletics Academy (sources in academy.ts). It does NOT name levels. The level names,
 * the skills listed and the "ready to move up" markers below follow a standard badminton
 * coaching progression and must be checked and renamed by the head coach before launch.
 * Edit here only — every page reads from this file.
 */
export type Level = {
  id: "foundation" | "development" | "performance" | "competitive";
  n: string;
  name: string;
  tagline: string;
  forWho: string;
  ages: string;
  work: string[];
  readyWhen: string[];
  format: string;
  /** Which of the academy's confirmed methods carry most weight at this level. */
  support: string[];
};

export const levels: Level[] = [
  {
    id: "foundation",
    n: "01",
    name: "Foundation",
    tagline: "First steps on court",
    forWho: "Complete beginners: kids trying the sport, and adults who never learned properly.",
    ages: "Kids · Teens · Adults",
    work: [
      "Grip and ready position",
      "Basic footwork to all four corners",
      "Underarm and high serves",
      "The overhead clear",
      "Keeping a rally going",
      "Rules and scoring",
    ],
    readyWhen: ["You can keep a rally going for 10+ shots", "You serve legally, every time", "You can score your own game"],
    format: "Group batch",
    support: ["Coach feedback in every session", "Periodic assessments"],
  },
  {
    id: "development",
    n: "02",
    name: "Development",
    tagline: "Build a real game",
    forWho: "Players who can rally but have never been coached, or who learned with bad habits.",
    ages: "Kids · Teens · Adults",
    work: [
      "Full-court footwork patterns",
      "Forehand and backhand clears, drops and net shots",
      "A first smash",
      "Singles and doubles positioning",
      "Playing proper games",
    ],
    readyWhen: ["Your clears reach the back of the court from both sides", "You move back to base after every shot", "You can play a full game with a plan"],
    format: "Group batch, with one-to-one sessions if you want faster progress",
    support: ["Periodic assessments", "Video analysis of key strokes"],
  },
  {
    id: "performance",
    n: "03",
    name: "Performance",
    tagline: "Train like a player",
    forWho: "Regular players and juniors who want to get properly good, and stay injury-free doing it.",
    ages: "Teens · Adults",
    work: [
      "Speed and agility around the court",
      "Smash, defence and the transition between them",
      "Deception and shot variety",
      "Strength & conditioning in the gym",
      "Game-situation practice",
    ],
    readyWhen: ["You want to enter tournaments", "You can train on a weekly plan", "Your coach agrees you're ready"],
    format: "Group batch plus one-to-one",
    support: ["Strength & conditioning", "Video analysis", "Individual reviews", "Physio on site"],
  },
  {
    id: "competitive",
    n: "04",
    name: "Competitive",
    tagline: "Tournament pathway",
    forWho: "Juniors and adults entering tournaments, training to a plan built around the calendar.",
    ages: "Juniors · Adults",
    work: [
      "A training plan built around your tournaments",
      "Match review from video",
      "Tactics against different opponents",
      "Conditioning, recovery and injury prevention",
    ],
    readyWhen: ["This is the top of the pathway: the work becomes your results"],
    format: "Academy training plus one-to-one",
    support: ["Assessments", "Video analysis", "Individual reviews", "Strength & conditioning", "Physio", "Exchange with BATTS Athletics Academy, Canada"],
  },
];

export const levelById = Object.fromEntries(levels.map((l) => [l.id, l])) as Record<Level["id"], Level>;
