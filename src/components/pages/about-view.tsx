import Image from "next/image";

import { PageHero } from "@/components/sections/page-hero";
import { ClosingCta } from "@/components/sections/closing-cta";
import { SectionHeading } from "@/components/ui/headline";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { getSiteContent, stack } from "@/content/site";
import { getDictionary } from "@/content/dictionaries";
import { breadcrumbSchema, graph } from "@/lib/schema";
import type { Locale } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function AboutView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const page = dict.sections.pages.about;
  const copy = dict.sections.about;
  const { values, journey } = getSiteContent(locale);

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(
            [
              { name: locale === "fr" ? "Accueil" : "Home", path: "/" },
              { name: page.eyebrow, path: "/about" },
            ],
            locale
          )
        )}
      />

      <PageHero eyebrow={page.eyebrow} title={page.title} accent={page.accent} description={page.description} />

      <div className="mx-auto max-w-7xl px-5 pb-28 sm:px-10 sm:pb-36">
        <div className="fade-up relative aspect-[4/3] overflow-hidden rounded-[20px] sm:aspect-[21/9]" style={{ "--delay": "240ms" } as React.CSSProperties}>
          <Image
            src="/AboutUs.jpg"
            alt={copy.imageAlt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-10 sm:pb-36">
        <div className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-20">
          <p className="eyebrow pt-3">{copy.values.eyebrow}</p>
          <div>
            <Reveal>
              <h2 className="max-w-[15ch] text-[clamp(2.5rem,5vw,4.25rem)]">
                {copy.values.title} <span className="accent">{copy.values.accent}</span>.
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">{copy.values.description}</p>
            </Reveal>
            <RevealGroup className="mt-16 grid border-t border-line-strong md:grid-cols-2 md:gap-x-12">
              {values.map((value) => (
                <RevealItem key={value.title} className="border-b border-line-strong py-8">
                  <h3 className="mb-2.5 text-2xl tracking-[-0.02em]">{value.title}</h3>
                  <p className="leading-relaxed text-muted">{value.description}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-y border-line bg-card">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-10 sm:py-36">
          <SectionHeading
            eyebrow={copy.journey.eyebrow}
            title={copy.journey.title}
            accent={copy.journey.accent}
            description={copy.journey.description}
          />
          <RevealGroup as="ol" className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((entry, i) => (
              <RevealItem
                as="li"
                key={entry.year}
                className={cn("pt-6", i === 0 ? "border-t-2 border-ink" : "border-t border-line-strong")}
              >
                <span
                  className={cn(
                    "font-display text-[2.75rem] leading-none font-medium tracking-[-0.04em]",
                    i === journey.length - 1 && "text-muted"
                  )}
                >
                  {entry.year}
                </span>
                <h3 className="mt-6 mb-2.5 text-xl tracking-[-0.02em]">{entry.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-muted">{entry.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-10 sm:py-36">
        <Reveal className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[20px] bg-panel">
            <Image src="/PhiroTechnoNoText.png" alt="" width={469} height={469} className="w-2/5 opacity-90" />
          </div>
          <div>
            <p className="eyebrow mb-6">{copy.team.eyebrow}</p>
            <h2 className="text-[clamp(2.5rem,4.6vw,4rem)]">
              {copy.team.title} <span className="accent">{copy.team.accent}</span>.
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-muted">{copy.team.description}</p>
            <div className="mt-10 border-t border-line-strong pt-7">
              <p className="font-display text-xl font-medium">{copy.team.name}</p>
              <p className="mt-1 text-[0.9375rem] text-muted">{copy.team.role}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stack */}
      <section className="mx-auto max-w-7xl px-5 pb-32 sm:px-10 sm:pb-40">
        <div className="grid gap-8 border-t border-line-strong pt-14 lg:grid-cols-[200px_1fr] lg:gap-20">
          <p className="eyebrow pt-2">{copy.stack.eyebrow}</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 font-display text-[1.375rem] font-medium tracking-[-0.02em] sm:grid-cols-3 lg:grid-cols-4">
            {stack.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta locale={locale} />
    </>
  );
}
