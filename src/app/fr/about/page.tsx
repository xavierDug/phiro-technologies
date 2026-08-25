import type { Metadata } from "next";

import { AboutView } from "@/components/pages/about-view";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "À propos",
  description:
    "Le studio montréalais derrière Phiro Technologies : comment nous cadrons, développons et soutenons des logiciels qui tiennent encore la route trois ans plus tard.",
  path: "/about",
  locale: "fr",
});

export default function FrenchAboutPage() {
  return <AboutView locale="fr" />;
}
