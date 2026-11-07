import { Plus } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Headline } from "@/components/ui/headline";
import { contactDetails } from "@/content/site";
import { fillPrices, getOffer } from "@/content/offer";
import type { Locale } from "@/lib/seo";

/**
 * Native <details>: works without JS, keyboard-accessible, and the open/close
 * needs no height animation. The plus turns into a cross.
 */
export function OfferFaq({ locale }: { locale: Locale }) {
  const copy = getOffer(locale).faq;

  return (
    <section aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-10 sm:py-[clamp(5rem,9vw,8rem)] lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-5">{copy.eyebrow}</p>
          <h2 id="faq-title" className="max-w-[12ch] text-[clamp(2.375rem,4.8vw,4.25rem)]">
            <Headline title={copy.title} accent={copy.accent} />
          </h2>
          <p className="mt-6 max-w-[340px] leading-relaxed text-muted">
            {copy.writePrompt}{" "}
            <a
              href={`mailto:${contactDetails.email}`}
              className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
            >
              {contactDetails.email}
            </a>
            .
          </p>
        </div>

        <Reveal className="border-t border-line">
          {copy.items.map((item, i) => (
            <details key={item.question} open={i === 0} className="group border-b border-line">
              <summary className="flex min-h-[4.75rem] cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="font-display text-xl leading-snug font-medium tracking-[-0.02em] transition-colors group-hover:text-ink-soft">
                  {item.question}
                </span>
                <Plus
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="size-5 shrink-0 transition-transform duration-300 ease-[var(--ease-expo)] group-open:rotate-45"
                />
              </summary>
              <p className="pr-12 pb-7 leading-relaxed text-muted">{fillPrices(item.answer, locale)}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
