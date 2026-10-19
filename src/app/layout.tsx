import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { academy } from "@/lib/academy";
import { MotionProvider } from "@/components/motion-provider";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.celestialsacademy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Celestial's Badminton Academy — coaching for kids, teens & adults, Noida",
    template: "%s · Celestial's Badminton Academy",
  },
  description:
    "Badminton coaching in Sector 104, Noida for players starting out and players getting better: kids, teens and adults, group or one-to-one, with assessments, video analysis and a free first session. Courts also open for pay-and-play from ₹450.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: academy.name,
    images: [{ url: "/images/play-rally-1600.webp", width: 1440, height: 1080, alt: "A junior player training on court at Celestial's" }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#071c17",
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
  telephone: academy.contact.phoneHref.replace("tel:", ""),
  priceRange: "₹450+",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${academy.address.line1}, ${academy.address.line2}`,
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201304",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: academy.address.lat, longitude: academy.address.lng },
  openingHoursSpecification: academy.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.day,
    opens: h.open,
    closes: h.close,
  })),
  sameAs: [academy.contact.instagram.url, academy.contact.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${mono.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
