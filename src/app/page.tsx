import { preload } from "react-dom";
import { Hero } from "@/components/hero";
import { StartingPoints } from "@/components/home/starting-points";
import { PathwaySteps } from "@/components/home/pathway-steps";
// import { TrainingRally } from "@/components/home/training-rally";
// import { Problems } from "@/components/home/problems";
// import { Parents } from "@/components/home/parents";
import { CourtSheet } from "@/components/home/court-sheet";
import { Arena } from "@/components/home/arena";
import { Proof } from "@/components/home/proof";
import { BookCourt } from "@/components/home/book-court";
import { Visit } from "@/components/visit";

/**
 * Revision 2 — academy-first journey (client direction, 16 Oct 2026):
 * hero (start right / keep getting better) → where are you starting from? + level finder
 * → the pathway → how we coach → problems improvers bring → parents' questions
 * → the academy in numbers → the place → reviews → book a court (secondary) → visit.
 * Each section answers one question; see docs/STRATEGY.md §6.
 */
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
      {/* <TrainingRally /> */}
      {/* <Problems /> */}
      {/* <Parents /> */}
      <CourtSheet />
      <Arena />
      <Proof />
      <BookCourt />
      <Visit />
    </>
  );
}
