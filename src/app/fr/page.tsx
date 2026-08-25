import type { Metadata } from "next";

import { HomeView } from "@/components/pages/home-view";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Développement web et logiciel sur mesure à Montréal",
  description:
    "Studio logiciel montréalais : plateformes SaaS, applications web et sites vitrines. Architecture propre, performance mesurable, accompagnement après le lancement.",
  path: "/",
  locale: "fr",
});

export default function FrenchHomePage() {
  return <HomeView />;
}
