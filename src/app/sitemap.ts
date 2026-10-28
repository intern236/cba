import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://celestial.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "programs/", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "facilities/", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "first-session/", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "pathway/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "about/", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "contact/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "gallery/", priority: 0.65, changeFrequency: "monthly" as const },
  ];

  return routes.map((r) => ({
    url: `${base}/${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
