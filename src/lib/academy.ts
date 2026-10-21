/**
 * Single source of truth for every business fact shown on the site.
 *
 * Rule: nothing goes on the page unless it appears here with a source.
 * Items marked `confirm: true` came from a third-party listing and should be
 * re-confirmed with the academy before launch (see docs/DEPENDENCIES.md).
 *
 * Sources (accessed 16 Oct 2026):
 *  [GBP]  Google Business Profile data as mirrored on LyfSkills
 *         https://discover.lyfskills.com/listing/9909
 *  [HUD]  Hudle venue page (venue-written description + booking)
 *         https://hudle.in/venues/celestial-badminton-academy/776227
 *  [PLY]  Playo venue page   https://playo.co/venues/sector--104-ncr/celestials-badminton-academy-sector-4-ncr
 *  [PS]   PlaySport listing (academy-written "About")
 *         https://playsport.com/celestialsbadmintonacademy_ag_9f716b48
 *  [ZI]   ZoomInfo company record (phone)
 *  [DIS]  District (Zomato) play page (price range)
 *  [IG]   Instagram bio, @celestialsbadmintonacademy (via search snippet)
 */

export const academy = {
  name: "Celestial's Badminton Academy",
  shortName: "Celestial's",
  initials: "CBA",

  address: {
    line1: "Maharishi Ved Vigyan No. 1–2, Maharishi Nagar",
    line2: "Near Great Value Sharanam Society",
    locality: "Sector 104, Noida",
    region: "Uttar Pradesh 201304",
    country: "India",
    // [GBP]
    lat: 28.540167,
    lng: 77.3775952,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Celestials+Badminton+Academy+Sector+104+Noida",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=28.540167,77.3775952",
    // [HUD]
    nearestMetro: { name: "Noida Sector 81", distance: "2.5 km" },
  },

  // [GBP] — Tuesday differs on Google; Playo lists 5 AM–11 PM for all days. confirm: true
  hours: [
    { day: "Monday", short: "Mon", open: "05:00", close: "23:00" },
    { day: "Tuesday", short: "Tue", open: "05:00", close: "20:00" },
    { day: "Wednesday", short: "Wed", open: "05:00", close: "23:00" },
    { day: "Thursday", short: "Thu", open: "05:00", close: "23:00" },
    { day: "Friday", short: "Fri", open: "05:00", close: "23:00" },
    { day: "Saturday", short: "Sat", open: "05:00", close: "23:00" },
    { day: "Sunday", short: "Sun", open: "05:00", close: "23:00" },
  ],
  hoursSummary: "Daily 5 AM – 11 PM · Tuesdays until 8 PM",

  contact: {
    // [IG] bio "Free trial: DM/WhatsApp 9560478732" and [PLY] venue telephone agree.
    // Other numbers seen online (ZoomInfo 88262 68236, Facebook 88829 43676) — confirm which to keep.
    phoneDisplay: " +91 88262 68236 ",
    phoneHref: "tel: +91 88262 68236 ",
    // Not shown: the domain has no MX records as of 16 Oct 2026, so the
    // published address cbainfo@celestialsacademy.com cannot receive mail.
    email: null as string | null,
    // [IG] bio names this number for WhatsApp free-trial enquiries.
    whatsappUrl:
      "https://wa.me/88262 68236?text=" +
      encodeURIComponent("Hi Celestial's, I'd like to book a free trial session."),
    instagram: {
      handle: "@celestialsbadmintonacademy",
      url: "https://www.instagram.com/celestialsbadmintonacademy",
    },
    facebook:
      "https://www.facebook.com/p/Celestials-Badminton-Academy-100076309075941/",
  },

  booking: {
    // Notion brief: "Booking Section (Redirect)". Hudle and Playo both list the venue.
    primary: {
      label: "Book on Hudle",
      provider: "Hudle",
      url: "https://hudle.in/venues/celestial-badminton-academy/776227",
    },
    secondary: {
      label: "Book on Playo",
      provider: "Playo",
      url: "https://playo.co/venues/sector--104-ncr/celestials-badminton-academy-sector-4-ncr",
    },
    // [HUD][DIS]
    priceFrom: "₹450",
    priceNote: "per slot, onwards. Peak evening and weekend slots may cost more — the booking page shows the live rate.",
  },

  // [GBP] aggregate only; review counts differ slightly across mirrors (258–279).
  rating: {
    value: "4.4",
    countLabel: "270+",
    source: "Google",
    url: "https://www.google.com/maps/search/?api=1&query=Celestials+Badminton+Academy+Sector+104+Noida",
  },

  courts: {
    // [HUD][PS]
    count: 7,
    surface: "PVC court mats",
    indoor: true,
    airConditioned: true, // [PS] + [IG] bio "Fully AC courts"
  },

  // [PLY] venue rules shown on Playo
  courtRules: [
    "Non-marking shoes are compulsory on court.",
    "Up to 4 players per court per booking.",
  ],

  // [PLY] amenities list
  amenities: ["Parking", "Showers", "Seating", "CCTV"],

  // [HUD] venue-written facility list; [PS] adds AC, nutrition, orthopaedic oversight
  facilities: [
    { key: "courts", label: "7 indoor PVC courts", detail: "Fully air-conditioned, under high-bay lighting." },
    { key: "gym", label: "Strength gym", detail: "Free weights, racks and machines on site." },
    { key: "physio", label: "Physiotherapist & medical room", detail: "Injury care and prevention without leaving the building." },
    { key: "steam", label: "Steam bath", detail: "Recovery after long sessions." },
    { key: "lockers", label: "Lockers & changing rooms", detail: "Separate changing areas and lockers." },
    { key: "cafe", label: "Cafeteria", detail: "Food and drinks between sessions." },
    { key: "shop", label: "Badminton pro shop", detail: "Shuttles, strings and gear on site." },
    { key: "hostel", label: "Hostel", detail: "Residential option for training players." },
  ],

  // [PS][HUD][GBP]
  coaching: {
    formats: ["Group batches", "One-to-one coaching"],
    ages: ["Kids", "Teens", "Adults"],
    batches: ["Morning", "Evening", "Weekend"],
    trial: true, // [GBP] "Trial available"
    methods: [
      "Strength & conditioning",
      "Periodic assessments",
      "Video analysis",
      "Individual reviews",
    ],
    exchange: {
      // [HUD]
      partner: "BATTS Athletics Academy",
      country: "Canada",
      label: "Inter-academy exchange programme",
    },
  },

  // [PS] academy-written claim. confirm: true
  studentsTrained: "400+",

  // Notion brief: required, not yet supplied by client
  pending: {
    coaches: true,
    owner: true,
    programmeFees: true,
    batchTimings: true,
    testimonials: true,
    brandColours: true,
    logo: true,
  },
} as const;

export type Academy = typeof academy;

/**
 * WhatsApp link for a free-trial request. The level finder passes the visitor's answers,
 * so the academy gets age, level and goal in the first message instead of a bare "hi"
 * (fewer back-and-forth messages before a trial is booked — design hypothesis H7).
 */
export function trialLink(details?: string): string {
  const base = "https://wa.me/919560478732?text=";
  const msg = details
    ? `Hi Celestial's, I'd like to book a free trial session.\n${details}`
    : "Hi Celestial's, I'd like to book a free trial session.";
  return base + encodeURIComponent(msg);
}
