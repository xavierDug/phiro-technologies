import { SectionHeading } from "@/components/ui/headline";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getSiteContent } from "@/content/site";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/seo";

/** An editorial list, not cards: the titles are what a reader scans. */
export function Services({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).sections.services;
  const { services } = getSiteContent(locale);

  return (
    <section id="services" className="scroll-mt-20 border-y border-line bg-card">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-10 sm:py-36">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          accent={copy.accent}
          description={copy.description}
        />
        <RevealGroup as="ol" className="mt-16 border-t border-line-strong">
          {services.map((service) => (
            <RevealItem
              as="li"
              key={service.index}
              className="grid gap-x-10 gap-y-3 border-b border-line-strong py-9 md:grid-cols-[60px_minmax(0,1fr)_minmax(0,1.1fr)_200px]"
            >
              <span className="eyebrow pt-2.5">{service.index}</span>
              <h3 className="text-[clamp(1.75rem,2.6vw,2.25rem)] tracking-[-0.03em]">{service.title}</h3>
              <p className="max-w-md text-[1.0625rem] leading-relaxed text-muted">{service.description}</p>
              <p className="eyebrow pt-2 leading-[1.9]">
                {service.tags[0]}
                <br />
                {service.tags[1]}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
