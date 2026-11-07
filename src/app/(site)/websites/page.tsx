import type { Metadata } from "next";

import { OfferView } from "@/components/pages/offer-view";
import { fillPrices, getOffer } from "@/content/offer";
import { buildMetadata } from "@/lib/metadata";
import { TRANSLATED_PATHS } from "@/lib/seo";

const meta = getOffer("en").meta;

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: fillPrices(meta.description, "en"),
  path: TRANSLATED_PATHS["/websites"].en,
  alternatePaths: TRANSLATED_PATHS["/websites"],
  locale: "en",
  // Unlisted campaign page: reached from outreach emails, never from search.
  noIndex: true,
});

export default function WebsitesPage() {
  return <OfferView locale="en" />;
}
