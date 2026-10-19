/**
 * Venue photos. Sourced from the academy's public listings (Google Business Profile
 * via LyfSkills, Hudle, PlaySport) — replace with originals from the client and
 * confirm usage rights before launch (see docs/DEPENDENCIES.md).
 * `w`/`h` are the real pixel sizes of the large file, used to reserve layout space.
 */
export type Img = { name: string; w: number; h: number; alt: string; caption: string };

export const images = {
  rally: { name: "play-rally", w: 1440, h: 1080, alt: "A junior player prepares an overhead shot while adults rally on neighbouring green courts.", caption: "Evening session, main hall" },
  panorama: { name: "courts-panorama", w: 1600, h: 563, alt: "A row of green PVC courts with yellow net posts under high-bay lights, wooden walkway alongside.", caption: "The main hall — courts in a row" },
  courtsRow: { name: "courts-row", w: 1599, h: 899, alt: "Indoor courts seen from the end of the hall, nets up and lines marked.", caption: "Courts set for the morning batch" },
  empty: { name: "courts-empty", w: 1200, h: 675, alt: "Empty courts before a session, nets strung and ready.", caption: "Before the 5 AM opening" },
  wooden: { name: "play-wooden", w: 1600, h: 900, alt: "Juniors rallying on a wooden-floor court in front of a Transform Badminton banner.", caption: "Juniors on the wooden court" },
  gymFloor: { name: "gym-floor", w: 1200, h: 675, alt: "Strength gym with dumbbell racks, benches and cable machines.", caption: "Strength gym" },
  gymStrength: { name: "gym-strength", w: 1600, h: 900, alt: "Gym floor with free weights and machines along a row of windows.", caption: "Conditioning floor" },
  mural: { name: "mural-entrance", w: 1440, h: 1080, alt: "A colourful painted badminton mural beside the academy's glass entrance, with potted plants.", caption: "The entrance mural" },
  group: { name: "community-group", w: 1440, h: 1080, alt: "A group of players and coaches standing together on court after a session.", caption: "The Celestial's community" },
} satisfies Record<string, Img>;

export const src = (i: Img, size: 800 | 1600 = 1600) => `/images/${i.name}-${size}.webp`;
export const srcSet = (i: Img) => `/images/${i.name}-800.webp 800w, /images/${i.name}-1600.webp ${i.w}w`;
