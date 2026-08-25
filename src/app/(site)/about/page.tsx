import type { Metadata } from "next";

import { AboutView } from "@/components/pages/about-view";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Meet the Montréal studio behind Phiro Technologies — how we scope, build and support software that still makes sense three years after launch.",
  path: "/about",
  locale: "en",
});

export default function AboutPage() {
  return <AboutView locale="en" />;
}
