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
/* SEO: this is what Google shows in search results.
   Title: keyword first, under 60 characters. Description: 120-160 characters. */
export const metadata: Metadata = {
  title: { absolute: "Badminton Academy in Noida | Celestial's, Sector 104" },
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
  // Let the browser start fetching the hero photo (the LCP element) from the <head>.
  preload("/images/play-rally-800.webp", {
    as: "image",
    fetchPriority: "high",
    imageSrcSet: "/images/play-rally-800.webp 800w, /images/play-rally-1600.webp 1440w",
    imageSizes: "(min-width: 1024px) 600px, 100vw",
  });
  return (
    <>
      <Hero />
      <StartingPoints />
      <PathwaySteps />
      <ProgramsSlider />
      <Results id="achievements-title" />
      <CourtSheet />
      <Proof />
      <InstagramEmbed />
      <BookCourt />
      <FindUs />
      <CorporateTournaments />
      {/* <TrainingRally /> */}
      {/* <Problems /> */}
      {/* <Parents /> */}
      {/* <Arena /> */}
      {/* <Visit /> */}
    </>
  );
}