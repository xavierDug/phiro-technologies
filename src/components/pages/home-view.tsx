import { Hero } from "@/components/home/hero";
import { Clients } from "@/components/home/clients";
import { Intro } from "@/components/home/intro";
import { FeaturedWork } from "@/components/home/featured-work";
import { Services } from "@/components/home/services";
import { Process } from "@/components/home/process";
import { Stats } from "@/components/home/stats";
import { Testimonial } from "@/components/home/testimonial";
import { JournalTeaser } from "@/components/home/journal-teaser";
import { ClosingCta } from "@/components/sections/closing-cta";
import type { Locale } from "@/lib/seo";

/**
 * The home page composition, shared by `/` and `/fr`. Every section is a
 * server component; the client islands are small and leaf-level (hero
 * parallax, magnetic CTA, scroll reveals, the stats ticker).
 */
export function HomeView({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Clients locale={locale} />
      <Intro locale={locale} />
      <FeaturedWork locale={locale} />
      <Services locale={locale} />
      <Process locale={locale} />
      <Stats locale={locale} />
      <Testimonial locale={locale} />
      <JournalTeaser locale={locale} />
      <ClosingCta locale={locale} />
    </>
  );
}
