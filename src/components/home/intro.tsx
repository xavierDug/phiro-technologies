import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { getDictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/seo";

export function Intro({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).sections.intro;

  return (
    <section className="mx-auto max-w-7xl px-5 py-28 sm:px-10 sm:py-36">
      <Reveal className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-20">
        <p className="eyebrow pt-3">{copy.eyebrow}</p>
        <div>
          <p className="font-display text-[clamp(1.85rem,3.6vw,3.25rem)] leading-[1.12] font-medium tracking-[-0.035em]">
            {copy.statement}
          </p>
          <Link
            href={localePath("/about", locale)}
            className="group mt-10 inline-flex items-center gap-2 border-b border-ink pb-1"
          >
            {copy.link}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
