import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ExternalButton } from "@/components/buttons";
import { getInstagramPosts } from "@/lib/instagram";

const username = "celestialsbadmintonacademy";
const profileUrl = `https://www.instagram.com/${username}/`;

// Shown only if the live feed fails or the token is missing.
const fallback = [
  { src: "/images/Instagram1.webp", alt: "Players training on court" },
  { src: "/images/Instagram2.webp", alt: "Tournament moment" },
  { src: "/images/Instagram3.webp", alt: "Coaching session" },
  { src: "/images/Instagram4.webp", alt: "Academy players with medals" },
];

export default async function InstagramLive() {
  const posts = await getInstagramPosts(6);

  const items =
    posts.length > 0
      ? posts
          .map((p) => ({
            key: p.id,
            src:
              p.media_type === "VIDEO"
                ? p.thumbnail_url ?? p.media_url
                : p.media_url,
            alt: p.caption?.slice(0, 100) || "Instagram post",
            href: p.permalink,
          }))
          .filter((p): p is typeof p & { src: string } => !!p.src)
      : fallback.map((f) => ({
          key: f.src,
          src: f.src,
          alt: f.alt,
          href: profileUrl,
        }));

  return (
    <div className="mx-auto mt-12 w-full max-w-[1320px] px-5 sm:px-8">
      {/* MOBILE: stacked. DESKTOP (md+): text left, live photos right */}
      <Reveal className="mx-auto grid max-w-[900px] overflow-hidden rounded-[24px] bg-court-950 text-chalk shadow-sm md:grid-cols-[1fr_420px]">
        {/* Text */}
    

        {/* Live photo grid: 3 columns, fills the right side */}
        <div className="grid grid-cols-3 gap-0.5 bg-black">
          {items.map((item) => (
            <a
              key={item.key}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.alt} (opens Instagram)`}
              className="group relative block aspect-square overflow-hidden"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 140px, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          ))}
        </div>
            <div className="flex flex-col justify-center p-5 sm:p-6 md:p-8">
          <p className="eyebrow text-mat">STAY CONNECTED</p>

          <h2 className="display mt-3 text-2xl leading-tight sm:text-3xl">
            Follow us on Instagram.
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-chalk/75 sm:text-base">
            Training sessions, tournaments and player achievements.
          </p>

          <div className="mt-5 flex justify-end md:justify-end">
            <ExternalButton
              href={profileUrl}
              note="opens Instagram"
              className="!flex !w-full !max-w-[180px] !justify-center"
            >
              Follow us
            </ExternalButton>
          </div>
        </div>
      </Reveal>
    </div>
  );
}