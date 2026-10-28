import type { Metadata } from "next";
import { InstagramLogo } from "@phosphor-icons/react/ssr";
import { academy } from "@/lib/academy";
import { images } from "@/lib/images";
import { PageHeader } from "@/components/page-header";
import { GalleryGrid } from "@/components/gallery-grid";
import { ExternalButton } from "@/components/buttons";

export const metadata: Metadata = {
  title: "Photos: Badminton Courts, Gym & Players | Celestial's Noida",
  description:
    "Real photos from Celestial's Badminton Academy, Sector 104, Noida: 7 indoor courts, the strength gym, junior batches and tournament days.",
  alternates: { canonical: "/gallery/" },
  openGraph: {
    title: "Photos: Badminton Courts, Gym & Players | Celestial's Noida",
    description:
      "Real photos from Celestial's Badminton Academy, Sector 104, Noida: 7 indoor courts, the strength gym, junior batches and tournament days.",
    images: "/images/gallery-og.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photos: Badminton Courts, Gym & Players | Celestial's Noida",
    description:
      "Explore real photos of Celestial's Badminton Academy in Sector 104, Noida, featuring indoor courts, the strength gym, junior players and tournaments.",
    images: ["/images/gallery-og.jpg"],
  },
};
const order = [images.rally, images.panorama, images.group, images.wooden, images.mural, images.courtsRow, images.gymFloor, images.empty, images.gymStrength];

export default function GalleryPage() {
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Inside Celestial's Badminton Academy, Noida" intro="Our seven indoor courts, the strength gym and the people who use them, all in Sector 104, Noida. No stock photos — every image here was taken at Celestial's.">
        <ExternalButton href={academy.contact.instagram.url} variant="ghost-dark" note="opens Instagram">
          More on Instagram
        </ExternalButton>
      </PageHeader>
      <section aria-label="Photos" className="on-light bg-chalk py-20">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <GalleryGrid items={order} />
          <p className="mt-10 flex items-center gap-2 text-ink-soft">
            <InstagramLogo size={18} weight="bold" aria-hidden="true" />
            Follow the academy on{" "}
            <a href={academy.contact.instagram.url} target="_blank" rel="noopener noreferrer" className="link-underline font-semibold text-ink">
              {academy.contact.instagram.handle}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
