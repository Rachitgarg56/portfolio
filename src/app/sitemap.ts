import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return ["/", ...projects.map(({ slug }) => `/work/${slug}`)].map((path) => ({ url: new URL(path, site.url).href }));
}
