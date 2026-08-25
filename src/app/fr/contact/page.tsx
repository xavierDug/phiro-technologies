import type { Metadata } from "next";

import { ContactPanel } from "@/components/sections/contact-panel";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Démarrez un projet avec Phiro Technologies. Dites-nous ce que vous construisez et recevez une réponse réfléchie d'un ingénieur montréalais en un jour ouvrable.",
  path: "/contact",
  locale: "fr",
});

export default function FrenchContactPage() {
  return <ContactPanel />;
}
