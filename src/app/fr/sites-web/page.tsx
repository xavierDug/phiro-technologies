import type { Metadata } from "next";

import { OfferView } from "@/components/pages/offer-view";
import { fillPrices, getOffer } from "@/content/offer";
import { buildMetadata } from "@/lib/metadata";
import { TRANSLATED_PATHS } from "@/lib/seo";

const meta = getOffer("fr").meta;

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: fillPrices(meta.description, "fr"),
  path: TRANSLATED_PATHS["/websites"].fr,
  alternatePaths: TRANSLATED_PATHS["/websites"],
  locale: "fr",
  // Page non répertoriée : on y arrive par courriel, jamais par la recherche.
  noIndex: true,
});

export default function FrenchWebsitesPage() {
  return <OfferView locale="fr" />;
}
