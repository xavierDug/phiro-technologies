import { Inline } from "@/components/blog/inline";
import type { FAQ } from "@/content/blog/types";
import type { Dictionary } from "@/content/dictionaries/types";

/**
 * Native `<details>` rather than a JS accordion, for one specific reason:
 * this block is also emitted as FAQPage structured data, and Google requires
 * the answer text in the markup to match the schema. A JS accordion that only
 * mounts answer text on open risks shipping a page whose visible content and
 * declared schema disagree — which is a manual-action-grade markup problem.
 *
 * `<details>` keeps every answer in the DOM, collapsed by CSS, always.
 */
export function PostFaq({ items, dict }: { items: FAQ[]; dict: Dictionary }) {
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="faq-heading"
      className="mx-auto w-full max-w-[68ch] px-6 pt-20 sm:px-0"
    >
      <div className="mb-8 flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-gold/50" />
        <span className="eyebrow">{dict.blog.faqEyebrow}</span>
      </div>

      <h2 id="faq-heading" className="text-[clamp(1.7rem,3.2vw,2.35rem)]">
        {dict.blog.faqTitle}
        <span className="text-gold">.</span>
      </h2>

      <div className="mt-8 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 marker:content-none">
              <h3 className="text-[1.0625rem] font-normal leading-snug tracking-normal text-text transition-colors group-hover:text-gold">
                {item.question}
              </h3>
              <span
                aria-hidden="true"
                className="mt-0.5 shrink-0 font-mono text-sm text-faint transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-6 pr-10 text-[1rem] leading-[1.75] text-text/70">
              <Inline text={item.answer} />
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
