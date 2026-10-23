import type { Metadata } from "next";
import { preload } from "react-dom";
import { Hero } from "@/components/hero";
import { StartingPoints } from "@/components/home/starting-points";
import { PathwaySteps } from "@/components/home/pathway-steps";
// import { TrainingRally } from "@/components/home/training-rally";
// import { Problems } from "@/components/home/problems";
// import { Parents } from "@/components/home/parents";
import { CourtSheet } from "@/components/home/court-sheet";
// import { Arena } from "@/components/home/arena";
import { Proof } from "@/components/home/proof";
import { BookCourt } from "@/components/home/book-court";
// import { Visit } from "@/components/visit";
import { CorporateTournaments } from "@/components/home/Companies";
import { ProgramsSlider } from "@/components/home/program-slider";
import { Results } from "@/components/home/results";
import { FindUs } from "@/components/home/find-us";
import InstagramEmbed from '@/components/home/InstagramEmbed';
import { academy } from "@/lib/academy"; // SEO: used for the structured data below
/* SEO: this is what Google shows in search results.
   Title: keyword first, under 60 characters. Description: 120-160 characters. */
export const metadata: Metadata = {
  title: { absolute: "Badminton Academy in Noida, Sector 104 | Celestial's" } ,
  description:
    "Badminton coaching in Sector 104, Noida for kids, teens and adults. NIS-certified coaches, 7 AC indoor courts, flexible batches. First session free.",
  alternates: {
    canonical: "/",
  },
};

/* SEO: hidden business data for Google (not visible on the page).
   Helps Google understand name, address, phone, hours and location. */
// const siteUrl = "https://www.celestialsacademy.com";

// const businessJsonLd = {
//   "@context": "https://schema.org",
//   "@type": "SportsActivityLocation",
//   "@id": `${siteUrl}/#academy`,
//   name: "Celestial's Badminton Academy",
//   description:
//     "Badminton academy in Sector 104, Noida offering coaching for kids, teens and adults, with 7 air-conditioned indoor courts.",
//   url: `${siteUrl}/`,
//   logo: `${siteUrl}/images/LOGO.png`,
//   image: `${siteUrl}/images/play-rally-1600.webp`,
//   // Uses the same number as your header and footer, so they always match.
//   telephone: academy.contact.phoneHref.replace(/^tel:/, ""),
//   priceRange: "₹450–₹7,000",
//   foundingDate: "2022",
//   address: {
//     "@type": "PostalAddress",
//     streetAddress: `${academy.address.line1}, ${academy.address.line2}`,
//     addressLocality: "Noida",
//     addressRegion: "Uttar Pradesh",
//     postalCode: "201304",
//     addressCountry: "IN",
//   },
//   geo: { "@type": "GeoCoordinates", latitude: 28.540167, longitude: 77.3775952 },
//   openingHoursSpecification: [
//     {
//       "@type": "OpeningHoursSpecification",
//       dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
//       opens: "05:00",
//       closes: "23:00",
//     },
//     {
//       "@type": "OpeningHoursSpecification",
//       dayOfWeek: "Tuesday",
//       opens: "05:00",
//       closes: "20:00",
//     },
//   ],
//   sameAs: [
//     academy.contact.instagram.url,
//     academy.contact.facebook,
//     // Add your Google Business Profile link here once you have it.
//   ],
// };

export default function Home() {
  // Let the browser start fetching the hero photo (the LCP element) from the <head>.
  preload("/images/play-rally-800.webp", {
    as: "image",
    fetchPriority: "high",
    imageSrcSet: "/images/play-rally-800.webp 800w, /images/play-rally-1600.webp 1440w",
    imageSizes: "(min-width: 1024px) 600px, 100vw",
  });
  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessJsonLd).replace(/</g, "\\u003c"),
        }}
      /> */}
      <Hero />
      <StartingPoints />
      <PathwaySteps />
      <ProgramsSlider />
      <Results id="achievements-title" />
      <CourtSheet />
      <Proof />
      <CorporateTournaments />
      <InstagramEmbed />
      <BookCourt />
      <FindUs />
      {/* <TrainingRally /> */}
      {/* <Problems /> */}
      {/* <Parents /> */}
      {/* <Arena /> */}
      {/* <Visit /> */}
    </>
  );
}