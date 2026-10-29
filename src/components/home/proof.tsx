import { Star } from "@phosphor-icons/react/ssr";
import { academy } from "@/lib/academy";
import { testimonials } from "@/lib/testimonials";
import { Reveal } from "../reveal";
import { TextLink } from "../buttons";

/**
 * Notion asks for testimonials. We have none supplied and will not invent any, so the
 * section leads with the verifiable aggregate (NN/g trust: connect to third-party reviews)
 * and renders client-approved quotes only when `testimonials` is filled in.
 */
export function Proof() {
  const r = academy.rating;
  return (
    <section aria-labelledby="proof-title" className="on-light bg-chalk-2 py-24 sm:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5">
          <h2 id="proof-title" className="sr-only">What 326+ Google reviewers say</h2>
          <p className="display flex items-start text-[clamp(7rem,16vw,12rem)] leading-[0.8] text-ink">
            {r.value}
            <Star size={44} weight="fill" className="ml-2 mt-3 text-mat" aria-hidden="true" />
          </p>
          <p className="mt-4 text-lg text-ink-soft">
            Average rating on {r.source} from {r.countLabel} reviews.
          </p>
          <TextLink href={r.url} external className="mt-5">Read the reviews on Google</TextLink>
        </Reveal>
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          {testimonials.length > 0 ? (
            <ul className="grid gap-6">
              {testimonials.map((t) => (
                <li key={t.name} className="border-t-2 border-ink/10 pt-6">
                  <blockquote className="text-xl leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                  <p className="eyebrow mt-3 text-ink-soft">{t.name} · {t.role}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="border-l-2 border-mat pl-6">
              <p className="display text-[clamp(2rem,3.6vw,3rem)] text-ink">What comes up most in reviews</p>
              <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
                Across 274 Google reviews, players most often single out the experience of the coaches and the quality of training.
              </p>
              <p className="mt-3 text-sm text-ink-soft">
                Summary of Google reviews published by{" "}
                <a href="https://discover.lyfskills.com/listing/9909" target="_blank" rel="noopener noreferrer" className="link-underline font-semibold">
                  LyfSkills<span className="sr-only"> (opens in a new tab)</span>
                </a>
                , October 2026.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
