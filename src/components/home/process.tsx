import { SectionHeading } from "@/components/ui/headline";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getSiteContent } from "@/content/site";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function Process({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).sections.process;
  const { processSteps } = getSiteContent(locale);

  return (
    <section className="mx-auto max-w-7xl px-5 py-28 sm:px-10 sm:py-36">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} accent={copy.accent} />
      <RevealGroup as="ol" className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <RevealItem
            as="li"
            key={step.index}
            className={cn("pt-7", i === 0 ? "border-t-2 border-ink" : "border-t border-line-strong")}
          >
            <span
              className={cn(
                "font-display text-6xl leading-none font-medium tracking-[-0.04em]",
                i !== 0 && "text-muted"
              )}
            >
              {step.index}
            </span>
            <h3 className="mt-7 mb-3 text-[1.375rem] tracking-[-0.02em]">{step.title}</h3>
            <p className="leading-relaxed text-muted">{step.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
