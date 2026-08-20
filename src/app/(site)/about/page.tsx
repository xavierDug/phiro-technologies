import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { Mission } from "@/components/sections/mission";
import { Journey } from "@/components/sections/journey";
import { Stats } from "@/components/sections/stats";
import { Stack } from "@/components/sections/stack";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Phiro Technologies builds software that still makes sense in three years. Who we are, how we think, and what we refuse to ship.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Building with"
        accent="purpose"
        description="We are a small team that takes the unglamorous parts seriously — the boundaries, the contracts, the second year of a codebase. That is where good products are actually decided."
      />
      <Mission />
      <Journey />
      <Stats />
      <Stack />
      <CTA />
    </>
  );
}
