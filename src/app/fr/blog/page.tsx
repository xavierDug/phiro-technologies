import type { Metadata } from "next";

import { BlogIndex } from "@/components/blog/blog-index";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/seo";

const base = buildMetadata({
  title: "Blogue",
  description:
    "Des textes concrets sur le référencement technique, la performance web et l'architecture logicielle, par un studio montréalais qui livre en production.",
  path: "/blog",
  locale: "fr",
});

export const metadata: Metadata = {
  ...base,
  alternates: {
    ...base.alternates,
    types: { "application/rss+xml": `${SITE_URL}/blog/rss.xml` },
  },
};

export default function FrenchBlogPage() {
  return <BlogIndex locale="fr" />;
}
