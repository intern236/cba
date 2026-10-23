/**
 * Player results — single source for the homepage results section and /about.
 * SOURCE: supplied by the academy, 21 Oct 2026 (names, results, dates, photos).
 *
 * CHECK BEFORE LAUNCH (docs/DEPENDENCIES.md):
 *  - Written consent to publish each player's name and photo (parents' consent for minors).
 *  - Photo ↔ name matching. Matched from the event banners in the photos where possible;
 *    Kashish Sharma and Siddhant Thakur were matched by elimination — please confirm.
 *  - Dates the photos disagree with: Dr. Ketan's National Doctors Championship poster says
 *    21–22 Feb 2026 (supplied: Mar 2026); Parth's UP State Deaf Championship banner says
 *    22 Feb 2026 (supplied: Mar 2026). Supplied dates are shown until confirmed.
 *  - Richa Tomar's date (Sep 2026) is read from the 2nd U.P. State Masters banner in her photo.
 *  - Removed 22 Oct 2026 (no photos): Kaira (silver) & Lakshita (bronze), Delhi State Championship,
 *    Oct 2025; Akshita, 3rd place U-11 GS, PNB MetLife JBC, Nov 2023. Re-add with photos if supplied.
 */
export type Result = { title: string; event: string; date?: string };

export type Player = {
  name: string;
  /** Short context chip: age group or category. */
  tag: string;
  results: Result[];
  /** Slug of /public/images/players/{slug}-{480|960}.jpg (4:5). */
  photo?: string;
  /** Widths available for this photo (some originals are small). */
  widths?: number[];
};

export const players: Player[] = [
  {
    name: "Parth Aggarwal",
    tag: "Deaf Nationals",
    photo: "parth-aggarwal",
    results: [
      { title: "National silver medal", event: "Mixed Doubles · Deaf Nationals", date: "May 2026" },
      { title: "UP State Champion", event: "Singles and Doubles", date: "Mar 2026" },
    ],
  },
  {
    name: "Sneha Maurya",
    tag: "U-17",
    photo: "sneha-maurya",
    results: [{ title: "India Top 15", event: "U-17 Girls Doubles ranking", date: "Dec 2025" }],
  },
  {
    name: "Siddhant Thakur",
    tag: "U-15",
    photo: "siddhant-thakur",
    widths: [480],
    results: [{ title: "India Top 10", event: "U-15 Boys Doubles ranking", date: "Jul 2025" }],
  },
  {
    name: "Dr. Ketan",
    tag: "Adult · 35+",
    photo: "dr-ketan",
    results: [
      { title: "Men's Singles champion", event: "National Doctors Championship", date: "Mar 2026" },
      { title: "Runner-up", event: "UP State Ranking · 35+", date: "Oct 2026" },
    ],
  },
  {
    name: "Mamta Yadav",
    tag: "Masters",
    photo: "mamta-yadav",
    results: [{ title: "National medallist", event: "Masters National Championship" }],
  },
  {
    name: "Vatsal Vedansh",
    tag: "U-15",
    photo: "vatsal-vedansh",
    widths: [480],
    results: [{ title: "Main draw", event: "All India Sub-Junior Ranking · U-15", date: "Feb 2026" }],
  },
  {
    name: "Richa Tomar",
    tag: "Masters · 40+",
    photo: "richa-tomar",
    results: [{ title: "Triple state champion", event: "Women's Singles, Women's Doubles and Mixed Doubles · 40+ · UP State Masters", date: "Sep 2026" }],
  },
  {
    name: "Kashish Sharma",
    tag: "School",
    photo: "kashish-sharma",
    results: [{ title: "Medallist", event: "CBSE East Zone" }],
  },
];

/** Team result shown alongside the player cards. */
export const teamResult = {
  title: "8 players selected for the UP State Mini Championships",
  body: "Eight U-11 players were selected for the UP State Mini Championships after trials held at Celestial’s in October 2026.",
};

export function photoSrc(p: Player) {
  if (!p.photo) return null;
  const widths = p.widths ?? [480, 960];
  return {
    src: `/images/players/${p.photo}-${widths[0]}.jpg`,
    srcSet: widths.map((w) => `/images/players/${p.photo}-${w}.jpg ${w}w`).join(", "),
  };
}
