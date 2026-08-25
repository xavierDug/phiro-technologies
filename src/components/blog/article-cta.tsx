import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { DotPattern } from "@/components/ui/dot-pattern";
import type { Dictionary } from "@/content/dictionaries/types";
import { cn } from "@/lib/utils";
import { localePath, type Locale } from "@/lib/seo";

/**
 * End-of-article conversion block.
 *
 * Deliberately quieter than the site-wide CTA that follows it further down the
 * page: a reader who has just finished 1,800 words does not need to be shouted
 * at, and two loud CTAs stacked would cancel each other out.
 */
export function ArticleCta({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <section className="mx-auto w-full max-w-[68ch] px-6 pt-20 sm:px-0">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/70 px-7 py-10 sm:px-10">
        <DotPattern
          className={cn(
            "pointer-events-none absolute inset-0 fill-gold/25",
            "[mask-image:radial-gradient(320px_circle_at_80%_20%,white,transparent)]"
          )}
          width={22}
          height={22}
          cr={1}
        />

        <div className="relative">
          <h2 className="max-w-md text-[clamp(1.5rem,3vw,2rem)]">
            {dict.blog.ctaTitle}
          </h2>
          <p className="mt-4 max-w-lg text-[0.975rem] leading-relaxed text-dim">
            {dict.blog.ctaBody}
          </p>
          <Link
            href={localePath("/contact", locale)}
            className="group mt-7 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/[0.08] px-6 py-3 text-sm text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
          >
            {dict.blog.ctaButton}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
