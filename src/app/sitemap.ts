import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.celestialsacademy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "pathway/", "programs/", "first-session/", "facilities/", "gallery/", "about/", "contact/"].map((p) => ({
    url: `${base}/${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
