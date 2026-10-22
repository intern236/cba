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
/**
 * Homepage flow (21 Oct 2026, mobile-first). Each section answers the question the one
 * before it raises:
 *   Hero — what is this? (coaching, free first session)
 *   → Starting points + level finder — is it for me / my child? where do we start?
 *   → Pathway — where does it lead?
 *   → Programmes slider — what exactly, when, and how much?
 *   → Results — does it work? (real players, with photos)
 *   → Score sheet — how big / how established?
 *   → Google reviews — what do other people say?
 *   → Corporate tournaments — what else happens here?
 *   → Instagram — what is it like day to day? (live feed once connected)
 *   → Book a court — just want to play?
 *   → Find us — where is it? (address, Google Map, directions)
 * Removed by the owner (kept commented below): TrainingRally, Problems, Parents, Arena, Visit.
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
