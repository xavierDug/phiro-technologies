import type { Metadata } from "next";

import { BlogIndex } from "@/components/blog/blog-index";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/seo";

const base = buildMetadata({
  title: "Journal",
  description:
    "Practical writing on technical SEO, web performance and software architecture from a Montréal studio that ships production systems.",
  path: "/blog",
  locale: "en",
});

export const metadata: Metadata = {
  ...base,
  alternates: {
    ...base.alternates,
    // Feed autodiscovery: readers and several crawlers look for this link tag
    // rather than guessing the feed URL.
    types: { "application/rss+xml": `${SITE_URL}/blog/rss.xml` },
  },
};

export default function BlogPage() {
  return <BlogIndex locale="en" />;
}
