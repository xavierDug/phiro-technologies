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
      className="mx-auto w-full max-w-[44rem] pt-20"
    >
      <p className="eyebrow mb-5">{dict.blog.faqEyebrow}</p>
      <h2 id="faq-heading" className="text-[clamp(1.75rem,3vw,2.25rem)] tracking-[-0.03em]">
        {dict.blog.faqTitle}.
      </h2>

      <div className="mt-8 divide-y divide-line-strong border-y border-line-strong">
        {items.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 marker:content-none">
              <h3 className="font-sans text-[1.0625rem] leading-snug font-medium tracking-normal text-ink">
                {item.question}
              </h3>
              <span
                aria-hidden="true"
                className="mt-0.5 shrink-0 font-mono text-sm text-muted transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-6 pr-10 text-base leading-[1.75] text-ink-soft">
              <Inline text={item.answer} />
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
