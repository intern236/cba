
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

  // Confirmed by the academy, 22 Oct 2026: 5 AM – 11 PM every day (Google listed Tuesday until 8 PM; update it).
  hours: [
    { day: "Monday", short: "Mon", open: "05:00", close: "23:00" },
    { day: "Tuesday", short: "Tue", open: "05:00", close: "23:00" },
    { day: "Wednesday", short: "Wed", open: "05:00", close: "23:00" },
    { day: "Thursday", short: "Thu", open: "05:00", close: "23:00" },
    { day: "Friday", short: "Fri", open: "05:00", close: "23:00" },
    {
      day: "Saturday",
      short: "Sat",
      slots: [
        { open: "11:00", close: "13:00" },
        { open: "19:15", close: "21:15" },
      ],
    },
    {
      day: "Sunday",
      short: "Sun",
      slots: [
        { open: "11:00", close: "13:00" },
        { open: "19:15", close: "21:15" },
      ],
    },
  ],
  hoursSummary: "Daily 5 AM – 11 PM",

  contact: {
    // Confirmed by the user, 21 Oct 2026: +91 88262 68236 for calls AND WhatsApp.
    // (Replaces 95604 78732 from the Instagram bio — update the bio too.)
    phoneDisplay: "+918826268236",
    phoneHref: "tel:+918826268236",
    // Not shown: the domain has no MX records as of 16 Oct 2026, so the
    // published address cbainfo@celestialsacademy.com cannot receive mail.
    email: null as string | null,
    whatsappUrl:
      "https://wa.me/918826268236?text=" +
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
    priceFrom: "₹450",
    // Court prices are deliberately not shown anywhere on the site (client instruction,
    // 22 Oct 2026). Hudle and Playo show the live rate at booking.
  },

  // [GBP] aggregate only. 324 reviews on Google on 22 Oct 2026, shown as "320+".
  rating: {
    value: "4.4",
    countLabel: "320+", // Google showed 324 reviews on 22 Oct 2026
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
    { key: "hostel", label: "Hostel", detail: "rooms on campus for outstation players training full-time. [Beds/rooms, age group, contact for availability]" },
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
  const base = "https://wa.me/918826268236?text=";
  const msg = details
    ? `Hi Celestial's, I'd like to book a free trial session.\n${details}`
    : "Hi Celestial's, I'd like to book a free trial session.";
  return base + encodeURIComponent(msg);
}
