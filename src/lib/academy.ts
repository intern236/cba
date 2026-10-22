
export const academy = {
  name: "Celestial's Badminton Academy",
  shortName: "Celestial's",
  initials: "CBA",

  // SEO metadata
  seo: {
    title:
      "Celestial's Badminton Academy | Badminton Coaching in Noida",
    description:
      "Train at Celestial's Badminton Academy in Sector 104, Noida. Explore indoor AC badminton courts, professional coaching, group batches, one-to-one training and free trial sessions.",
    keywords: [
      "badminton academy in Noida",
      "badminton coaching in Noida",
      "badminton academy Sector 104 Noida",
      "badminton classes in Noida",
      "badminton coaching for kids in Noida",
      "badminton training for adults in Noida",
      "indoor badminton courts in Noida",
      "one-to-one badminton coaching",
      "badminton academy near me",
    ],
    locale: "en_IN",
    language: "en-IN",
    type: "website",
    twitterCard: "summary_large_image",
    // Add your actual public website URL in .env.local
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
    ogImage: "/images/academy-og.jpg",
  },

  address: {
    line1: "Maharishi Ved Vigyan No. 1–2, Maharishi Nagar",
    line2: "Near Great Value Sharanam Society",
    locality: "Sector 104, Noida",
    region: "Uttar Pradesh",
    postalCode: "201304",
    country: "India",
    countryCode: "IN",
    lat: 28.540167,
    lng: 77.3775952,

    // Plain URLs, not Markdown links
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Celestials+Badminton+Academy+Sector+104+Noida",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=28.540167,77.3775952",

    nearestMetro: {
      name: "Noida Sector 81",
      distance: "2.5 km",
    },
  },

  hours: [
    { day: "Monday", short: "Mon", open: "05:00", close: "23:00" },
    { day: "Tuesday", short: "Tue", open: "05:00", close: "23:00" },
    { day: "Wednesday", short: "Wed", open: "05:00", close: "23:00" },
    { day: "Thursday", short: "Thu", open: "05:00", close: "23:00" },
    { day: "Friday", short: "Fri", open: "05:00", close: "23:00" },
    { day: "Saturday", short: "Sat", open: "05:00", close: "23:00" },
    { day: "Sunday", short: "Sun", open: "05:00", close: "23:00" },
  ],

  hoursSummary: "Daily 5 AM – 11 PM",

  contact: {
    phoneDisplay: "+91 8826268236",
    phoneHref: "tel:+918826268236",

    // Keep null until a working email address is confirmed
    email: null as string | null,

    whatsappUrl:
      "https://wa.me/918826268236?text=" +
      encodeURIComponent(
        "Hi Celestial's, I'd like to book a free trial session."
      ),

    instagram: {
      handle: "@celestialsbadmintonacademy",
      url: "https://www.instagram.com/celestialsbadmintonacademy/",
    },

    facebook:
      "https://www.facebook.com/p/Celestial-Badminton-Academy-100076309075941/",
  },

  booking: {
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
    priceNote:
      "Per slot, onwards. Peak evening and weekend slots may cost more. Check the booking page for live rates.",
  },

  rating: {
    value: "4.4",
    countLabel: "320+",
    source: "Google",
    url:
      "https://www.google.com/maps/search/?api=1&query=Celestials+Badminton+Academy+Sector+104+Noida",
  },

  courts: {
    count: 7,
    surface: "PVC court mats",
    indoor: true,
    airConditioned: true,
  },

  courtRules: [
    "Non-marking shoes are compulsory on court.",
    "Up to 4 players per court per booking.",
  ],

  amenities: ["Parking", "Showers", "Seating", "CCTV"],

  facilities: [
    {
      key: "courts",
      label: "7 indoor PVC courts",
      detail: "Fully air-conditioned, under high-bay lighting.",
    },
    {
      key: "gym",
      label: "Strength gym",
      detail: "Free weights, racks and machines on site.",
    },
    {
      key: "physio",
      label: "Physiotherapist & medical room",
      detail: "Injury care and prevention without leaving the building.",
    },
    {
      key: "steam",
      label: "Steam bath",
      detail: "Recovery after long sessions.",
    },
    {
      key: "lockers",
      label: "Lockers & changing rooms",
      detail: "Separate changing areas and lockers.",
    },
    {
      key: "cafe",
      label: "Cafeteria",
      detail: "Food and drinks between sessions.",
    },
    {
      key: "shop",
      label: "Badminton pro shop",
      detail: "Shuttles, strings and gear on site.",
    },
    {
      key: "hostel",
      label: "Hostel",
      detail: "Residential option for training players.",
    },
  ],

  coaching: {
    formats: ["Group batches", "One-to-one coaching"],
    ages: ["Kids", "Teens", "Adults"],
    batches: ["Morning", "Evening", "Weekend"],
    trial: true,

    methods: [
      "Strength & conditioning",
      "Periodic assessments",
      "Video analysis",
      "Individual reviews",
    ],

    exchange: {
      partner: "BATTS Athletics Academy",
      country: "Canada",
      label: "Inter-academy exchange programme",
    },
  },

  studentsTrained: "400+",

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
 * Build a WhatsApp link for a free trial request.
 * Optional details can include age, level and training goals.
 */
export function trialLink(details?: string): string {
  const base = "https://wa.me/918826268236?text=";

  const msg = details
    ? `Hi Celestial's, I'd like to book a free trial session.\n${details}`
    : "Hi Celestial's, I'd like to book a free trial session.";

  return base + encodeURIComponent(msg);
}
