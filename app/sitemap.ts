import type { MetadataRoute } from "next";
import { getEvents } from "@/lib/events";
import { getAllBlogPosts } from "@/lib/blog";
import { getAllNewsletterIssues } from "@/lib/newsletter";
import { categories } from "@/lib/categories";
import { siteUrl, localPath } from "@/lib/community";
import { getTranslation } from "@/lib/translated-content";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/events",
    "/cfp",
    "/blog",
    "/newsletter",
    "/resources",
    ...getEvents().flatMap((e) => [
      `/events/${e.slug}`,
      ...(e.recap ? [`/events/${e.slug}/recap`] : []),
    ]),
    ...getAllBlogPosts().map((p) => `/blog/${p.slug}`),
    ...getAllNewsletterIssues().map((p) => `/newsletter/${p.slug}`),
    ...categories.flatMap((c) => [
      `/resources/${c.slug}`,
      ...c.components.map((t) => `/resources/${c.slug}/${t.slug}`),
    ]),
  ];
  return paths.flatMap((path) => {
    const parts = path.split("/").filter(Boolean);
    const translated =
      !(
        parts.length === 2 &&
        (parts[0] === "blog" || parts[0] === "newsletter")
      ) || !!getTranslation(parts[0] as "blog" | "newsletter", parts[1]);
    const languages = {
      en: siteUrl + path,
      ...(translated ? { "zh-CN": siteUrl + localPath(path, "zh") } : {}),
    };
    return (translated ? (["en", "zh"] as const) : (["en"] as const)).map(
      (locale) => ({
        url: siteUrl + localPath(path, locale),
        alternates: { languages },
        changeFrequency:
          path === "/" || path === "/events"
            ? ("weekly" as const)
            : ("monthly" as const),
        priority: path === "/" ? 1 : 0.7,
      }),
    );
  });
}
