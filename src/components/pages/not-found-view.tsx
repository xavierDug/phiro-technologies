import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Headline } from "@/components/ui/headline";
import { buildNavLinks } from "@/content/navigation";
import { getDictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/seo";

export function NotFoundView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const copy = dict.sections.notFound;

  return (
    <section className="mx-auto max-w-7xl px-5 pt-16 pb-32 sm:px-10 sm:pt-28 sm:pb-40">
      <div className="grid items-end gap-16 lg:grid-cols-[1fr_380px] lg:gap-28">
        <div>
          <p className="eyebrow fade-up mb-8">{copy.eyebrow}</p>
          <h1
            className="fade-up max-w-[10ch] text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.98] tracking-[-0.045em]"
            style={{ "--delay": "60ms" } as React.CSSProperties}
          >
            <Headline title={copy.title} accent={copy.accent} />
          </h1>
          <p
            className="fade-up mt-9 max-w-md text-lg leading-relaxed text-muted"
            style={{ "--delay": "140ms" } as React.CSSProperties}
          >
            {copy.description}
          </p>
          <div className="fade-up mt-10 flex flex-wrap gap-3" style={{ "--delay": "200ms" } as React.CSSProperties}>
            <ButtonLink href={localePath("/", locale)} variant="ink">
              {copy.home}
            </ButtonLink>
            <ButtonLink href={localePath("/contact", locale)} variant="outline">
              {copy.contact}
            </ButtonLink>
          </div>
        </div>

        <nav aria-label={copy.popular} className="fade-up border-t border-line-strong" style={{ "--delay": "260ms" } as React.CSSProperties}>
          {buildNavLinks(dict, locale).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between border-b border-line-strong py-5 font-display text-[1.375rem] font-medium tracking-[-0.02em]"
            >
              {link.label}
              <ArrowUpRight
                aria-hidden="true"
                className="size-5 text-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
              />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
