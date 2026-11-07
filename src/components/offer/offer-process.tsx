import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/headline";
import { fillPrices, getOffer } from "@/content/offer";
import type { Locale } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Three steps with large serif-italic numerals; the list itself carries the order. */
export function OfferProcess({ locale }: { locale: Locale }) {
  const copy = getOffer(locale).process;

  return (
    <section aria-labelledby="process-title">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-10 sm:py-[clamp(5rem,9vw,8rem)]">
        <SectionHeading
          id="process-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          accent={copy.accent}
          description={fillPrices(copy.description, locale)}
          className="mb-16"
        />
        <RevealGroup as="ol" className="grid lg:grid-cols-3 lg:gap-10">
          {copy.steps.map((step, i) => (
            <RevealItem
              as="li"
              key={step.title}
              className={cn("border-t pt-7 pb-8", i === 0 ? "border-ink" : "border-line-strong")}
            >
              <p
                aria-hidden="true"
                className="mt-2 font-serif text-[5.5rem] leading-[0.8] tracking-[-0.03em] italic lg:text-[7rem]"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-9 text-[1.75rem] tracking-[-0.035em]">{step.title}</h3>
              <p className="mt-3.5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-muted">{step.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
