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
 * The home page composition, shared by `/` and `/fr`.
 *
 * It takes no locale prop: every section reads the active dictionary from
 * LocaleProvider, which is set once by SiteChrome. That is the whole payoff of
 * the context approach — the page structure is written once.
 */
export function HomeView() {
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
