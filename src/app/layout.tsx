import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { academy } from "@/lib/academy";
import { MotionProvider } from "@/components/motion-provider";
import { WhatsAppFloat } from "@/components/whatsapp-float";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://celestial.in");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Badminton Academy in Noida | Celestial's, Sector 104",
    template: "%s · Celestial's Badminton Academy",
  },
  description:
    "Badminton coaching for kids, teens and adults in Sector 104, Noida. 7 AC indoor courts, NIS-certified coaches, gym and physio. First session free.",
  keywords: [
    "badminton academy in noida",
    "badminton coaching sector 104 noida",
    "indoor badminton courts noida",
    "badminton training for kids noida",
    "pay and play badminton courts noida",
    "celestials badminton academy",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: academy.name,
    title: "Celestial's Badminton Academy — Noida Sector 104",
    description: "7 indoor AC courts, BWF certified coaches, batches for kids and adults. Book your free trial.",
    images: [{ url: "/images/play-rally-1600.webp", width: 1440, height: 1080, alt: "Badminton coaching at Celestial's" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Badminton Academy in Noida | Celestial's, Sector 104",
    description: "7 indoor AC courts, professional coaching & free trial.",
    images: ["/images/play-rally-1600.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#041a1b",
  width: "device-width",
  initialScale: 1,
  // Pinch-zoom is deliberately NOT disabled (4 of 5 racket-sport sites researched lock it).
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: academy.name,
  sport: "Badminton",
  image: `${siteUrl}/images/courts-panorama-1600.webp`,
  telephone: "+918826268236",
  priceRange: "₹450 - ₹1500",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Credit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${academy.address.line1}, ${academy.address.line2}`,
    addressLocality: "Sector 104, Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201304",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: academy.address.lat,
    longitude: academy.address.lng,
  },
  // ⭐ This enables the 4.4 Gold Star Rating in Google search results:
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.4",
    reviewCount: "270",
    bestRating: "5",
    worstRating: "1",
  },
  openingHoursSpecification: academy.hours.flatMap(
    (h): { "@type": string; dayOfWeek: string; opens: string; closes: string }[] => {
      if ("slots" in h && h.slots) {
        return h.slots.map((slot) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.day,
          opens: slot.open,
          closes: slot.close,
        }));
      }
      if ("open" in h && "close" in h) {
        return [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.day,
            opens: h.open,
            closes: h.close,
          },
        ];
      }
      return [];
    }),
  logo: `${siteUrl}/images/LOGO.png`,
  sameAs: [
    academy.contact.instagram.url,
    academy.contact.facebook,
    academy.address.mapsUrl,
    academy.booking.primary.url,
    academy.booking.secondary.url,
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${archivo.variable} ${mono.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
        <WhatsAppFloat />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
