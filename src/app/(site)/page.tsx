import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";
import { Craft } from "@/components/sections/craft";
import { Process } from "@/components/sections/process";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Stack } from "@/components/sections/stack";
import { CTA } from "@/components/sections/cta";

/**
 * Server component. Interactivity lives in the leaf sections, each of which
 * marks itself "use client" — the page itself ships no JS of its own.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Stack />
      <Services />
      <Work />
      <Craft />
      <Process />
      <Stats />
      <Testimonials />
      <CTA />
    </>
  );
}
