
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
    {
      title: "Silver Medal",
      event: "Mixed Doubles · National Championship for the Deaf, Chandigarh",
      date: "May 2026",
    },
    {
      title: "State Champion",
      event: "Men's Singles and Doubles · UP State Championship for the Deaf, Agra",
      date: "March 2026",
    },
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
  results: [
    {
      title: "Ranked in India's Top 10",
      event: "BAI · U-15 Boys Doubles",
      date: "July 2025",
    },
  ],
},
{
  name: "Dr. Ketan",
  tag: "Adult · 35+",
  photo: "dr-ketan",
  results: [
    {
      title: "Men's Singles Champion",
      event: "National Doctors Championship, Goa",
      date: "March 2026",
    },
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
  results: [
    {
      title: "Main draw (Top 64)",
      event: "First All-India event · Yonex-Sunrise All India Sub-Junior Ranking, U-15 Boys Singles, Jaipur",
      date: "February 2026",
    },
  ],
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
  {
  name: "Anil Bhatnagar",
  tag: "Masters",
  photo: "anil-bhatnagar",
  results: [
    {
      title: "Runner-Up",
      event: "UP State Masters Badminton Championship (MD 65+)",
    },
  ],
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
