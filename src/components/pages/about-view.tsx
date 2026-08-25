import { PageHero } from "@/components/sections/page-hero";
import { Mission } from "@/components/sections/mission";
import { Journey } from "@/components/sections/journey";
import { Stats } from "@/components/sections/stats";
import { Stack } from "@/components/sections/stack";
import { CTA } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { getDictionary } from "@/content/dictionaries";
import { breadcrumbSchema, graph } from "@/lib/schema";
import type { Locale } from "@/lib/seo";

export function AboutView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const copy = dict.sections.pages.about;

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(
            [
              { name: locale === "fr" ? "Accueil" : "Home", path: "/" },
              { name: copy.eyebrow, path: "/about" },
            ],
            locale
          )
        )}
      />
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        accent={copy.accent}
        description={copy.description ?? ""}
      />
      <Mission />
      <Journey />
      <Stats />
      <Stack />
      <CTA />
    </>
  );
}
