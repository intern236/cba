import { Faq } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { trialLink } from "@/lib/academy";
import { ExternalButton } from "@/components/buttons";

export const homeFaqs = [
  {
    q: "Which is the best badminton academy in Noida?",
    a: "It depends on where you live and what you want from the game. If you're near Sector 104, Celestial's is worth a look: seven AC courts, NIS and BAI-certified head coaches, an on-site gym and physio, and 4.4★ from 270+ Google reviews. Come for a free session and judge for yourself.",
  },
  {
    q: "How much does badminton coaching cost in Noida?",
    a: "At Celestial's, monthly coaching costs ₹3,500 to ₹7,000, depending on how many days a week you train. Weekend-only batches are ₹3,500. Confirm current fees on WhatsApp before you join.",
  },

  {
    q: "What age can my child start badminton?",
    a: "Most kids start between five and seven. Our Beginner batches are built around games, footwork and keeping a rally going, so young children enjoy it from day one.",
  },
  {
    q: "Are there batches for working adults?",
    a: "Yes. Weekday batches run 5–6:30 PM, 6:30–8 PM and 8:30–10 PM, plus weekend batches. Complete beginners are welcome.",
  },
];

export function FaqHome() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-home-title"
      className="on-light scroll-mt-24 bg-chalk-2 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1320px] gap-8 px-5 sm:gap-12 sm:px-8 lg:grid-cols-12">
        <Reveal className="min-w-0 lg:col-span-5">
          <p className="eyebrow text-ink-soft">Common questions</p>

          <h2
            id="faq-home-title"
            className="display mt-4 text-[clamp(2.4rem,4.5vw,4.2rem)] text-ink"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 max-w-[45ch] text-[1.05rem] leading-relaxed text-ink-soft">
            Quick answers about coaching fees, court bookings, child age limits, and adult batches at Celestial’s in Sector 104, Noida.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 flex justify-end">
            <ExternalButton
              href={trialLink("I have a question about Celestial's Badminton Academy.")}
              variant="ink"
              note="opens WhatsApp"
            >
              Ask on WhatsApp
            </ExternalButton>
          </div>
        </Reveal>

        <Reveal className="min-w-0 lg:col-span-7" delay={0.08}>
          <Faq items={homeFaqs} />
        </Reveal>
      </div>
    </section>
  );
}

export { FaqHome as FaqsHome };
export default FaqHome;
