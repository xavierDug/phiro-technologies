import type { MetadataRoute } from "next";

import { allPosts, translationPaths } from "@/content/blog";
import { projects } from "@/content/projects";
import {
  LOCALES,
  SITE_URL,
  absoluteUrl,
  languageAlternates,
  languageAlternatesFor,
} from "@/lib/seo";

/**
 * Derived entirely from the content modules, so a new project or post appears
 * here the moment it is registered — the sitemap cannot drift out of sync with
 * the routes that actually exist.
 *
 * Every entry carries `alternates.languages`, which is how Google learns that
 * `/about` and `/fr/about` are the same page in two languages rather than
 * duplicate content competing with each other.
 */

interface RouteSpec {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: string | Date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: RouteSpec[] = [
    { path: "/", priority: 1.0, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  ];

  const projectRoutes: RouteSpec[] = projects.map((project) => ({
    path: `/projects/${project.slug}`,
    priority: 0.7,
    changeFrequency: "yearly",
  }));

  // Post slugs are translated, so alternates come from the translation key
  // rather than from prefixing one path. A post with no translation is listed
  // under its own locale only, with no alternate advertised.
  const postRoutes: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`, post.locale),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.8 : 0.7,
    alternates: { languages: languageAlternatesFor(translationPaths(post)) },
  }));

  const localised = [...staticRoutes, ...projectRoutes].flatMap((route) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(route.path, locale),
      lastModified: route.lastModified ? new Date(route.lastModified) : new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages: languageAlternates(route.path) },
    }))
  );

  return [...localised, ...postRoutes];
}

export const baseUrl = SITE_URL;
