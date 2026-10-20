import { ButtonLink } from "@/components/ui/button-link";
import type { Dictionary } from "@/content/dictionaries/types";
import { localePath, type Locale } from "@/lib/seo";

/**
 * End-of-article conversion block. Quieter than the closing band that follows
 * it: a reader who has just finished 1,800 words does not need to be shouted at.
 */
export function ArticleCta({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section className="mt-20 bg-panel">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-5 py-20 sm:px-10">
        <div className="max-w-[40rem]">
          <h2 className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.05]">{dict.blog.ctaTitle}</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{dict.blog.ctaBody}</p>
        </div>
        <ButtonLink href={localePath("/contact", locale)} variant="ink" icon="up-right">
          {dict.blog.ctaButton}
        </ButtonLink>
      </div>
    </section>
  );
}
