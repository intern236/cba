import { academy } from "@/lib/academy";
import { images } from "@/lib/images";
import { Photo } from "../photo";
import { SectionHead } from "../section-head";
import { Reveal } from "../reveal";
import { TextLink } from "../buttons";
import { FacilityIcon } from "../facility-icon";

/**
 * Trust: Stanford credibility #2 and NN/g — real premises photos. Captions sit outside
 * the images (gallery-style), and the asymmetric grid avoids the 3-equal-cards template.
 */
export function Arena() {
  return (
    <section aria-labelledby="arena-title" className="on-light bg-chalk py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHead
            className="lg:col-span-7"
            index="04"
            label="The arena"
            id="arena-title"
            title="Built for the long session"
            intro="Seven courts are only half of it. A strength gym, a physio and a medical room, a steam bath and a cafeteria mean you can train, recover and refuel without leaving the building."
          />
          <Reveal className="lg:col-span-5 lg:pb-2" delay={0.1}>
            <TextLink href="/facilities/">Court specs, timings and everything on site</TextLink>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6 md:grid-rows-[auto_auto]">
          <Reveal as="figure" className="md:col-span-4">
            <div className="aspect-[16/9] overflow-hidden rounded-[24px] bg-chalk-2">
              <Photo img={images.courtsRow} sizes="(min-width:768px) 66vw, 100vw" />
            </div>
            <figcaption className="eyebrow mt-3 text-ink-soft">{images.courtsRow.caption}</figcaption>
          </Reveal>
          <Reveal as="figure" className="md:col-span-2" delay={0.08}>
            <div className="aspect-[4/5] overflow-hidden rounded-[24px] bg-chalk-2 md:aspect-auto md:h-[calc(100%-2rem)]">
              <Photo img={images.mural} sizes="(min-width:768px) 33vw, 100vw" position="30% 50%" />
            </div>
            <figcaption className="eyebrow mt-3 text-ink-soft">{images.mural.caption}</figcaption>
          </Reveal>
          <Reveal as="figure" className="md:col-span-2" delay={0.04}>
            <div className="aspect-[4/3] overflow-hidden rounded-[24px] bg-chalk-2">
              <Photo img={images.gymStrength} sizes="(min-width:768px) 33vw, 100vw" />
            </div>
            <figcaption className="eyebrow mt-3 text-ink-soft">{images.gymStrength.caption}</figcaption>
          </Reveal>
          <Reveal className="md:col-span-4" delay={0.12}>
            <ul className="grid h-full grid-cols-1 gap-x-8 sm:grid-cols-2">
              {academy.facilities.map((f) => (
                <li key={f.key} className="flex items-start gap-4 border-t-2 border-ink/10 py-4">
                  <FacilityIcon k={f.key} />
                  <div>
                    <p className="font-semibold">{f.label}</p>
                    <p className="text-sm text-ink-soft">{f.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
