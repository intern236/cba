
import type { Metadata } from "next";
import { preload } from "react-dom";
import { Hero } from "@/components/hero";
import { QuickFacts } from "@/components/quick-facts";
import { StartingPoints } from "@/components/home/starting-points";
import { PathwaySteps } from "@/components/home/pathway-steps";
// import { TrainingRally } from "@/components/home/training-rally";
// import { Problems } from "@/components/home/problems";
// import { Parents } from "@/components/home/parents";
// import { CourtSheet } from "@/components/home/court-sheet";
// import { Arena } from "@/components/home/arena";
// import { Proof } from "@/components/home/proof";
import { BookCourt } from "@/components/home/book-court";
// import { Visit } from "@/components/visit";
import { CorporateTournaments } from "@/components/home/Companies";
// import { ProgramsSlider } from "@/components/home/program-slider";
import { Results } from "@/components/home/results";
import { FindUs } from "@/components/home/find-us";
import InstagramEmbed from "@/components/home/InstagramEmbed";
import { FaqHome } from "@/components/faq-home";

/* SEO metadata */
export const metadata: Metadata = {
  title: {
    absolute: "Badminton Academy in Noida | Celestial's, Sector 104",
  },
  description:
    "Badminton coaching for kids, teens and adults in Sector 104, Noida. 7 AC indoor courts, NIS-certified coaches, gym and physio. First session free.",
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Badminton Academy in Noida | Celestial's, Sector 104",
    description:
      "Badminton coaching for kids, teens and adults in Sector 104, Noida. 7 AC indoor courts, NIS-certified coaches, gym and physio. First session free.",
    images: ["/images/play-rally-1600.webp"],
  },
};

export default function Home() {
  // Preload the hero image for better loading performance.
  preload("/images/play-rally-800.webp", {
    as: "image",
    fetchPriority: "high",
    imageSrcSet:
      "/images/play-rally-800.webp 800w, /images/play-rally-1600.webp 1440w",
    imageSizes: "(min-width: 1024px) 600px, 100vw",
  });

  return (
    <>
      <Hero />
      <QuickFacts />
      <StartingPoints />
      <PathwaySteps />
      {/* <ProgramsSlider /> */}
      <Results id="achievements-title" />
      {/* <CourtSheet /> */}
      {/* <Proof /> */}
      <InstagramEmbed />
      <BookCourt />
      <FindUs />
      <CorporateTournaments />
      <FaqHome />
    </>
  );
}
