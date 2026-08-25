import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Campaign landing pages are paid-traffic destinations. They duplicate
        // service copy that the main site should rank for, so keeping them out
        // of the index avoids competing with ourselves.
        disallow: ["/och-planner", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
