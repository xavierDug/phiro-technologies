"use client";

import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/sections/section-heading";
import { getSiteContent, type Testimonial } from "@/content/site";
import { useLocale } from "@/components/layout/locale-provider";

function QuoteCard({ quote, author, role }: Testimonial) {
  return (
    <figure className="w-[340px] shrink-0 rounded-2xl border border-line bg-surface/60 p-6 transition-colors duration-500 hover:border-gold/25 sm:w-[400px]">
      <span aria-hidden="true" className="accent-serif text-4xl leading-none">
        &ldquo;
      </span>
      <blockquote className="mt-2 text-[15px] leading-relaxed text-text/90">
        {quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold/10 font-mono text-xs text-gold">
          {author.charAt(0)}
        </span>
        <span className="text-sm">
          <span className="block text-text">{author}</span>
          <span className="block text-xs text-faint">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const { locale, dict } = useLocale();
  const copy = dict.sections.testimonials;
  const { testimonials } = getSiteContent(locale);

  const half = Math.ceil(testimonials.length / 2);
  const firstRow = testimonials.slice(0, half);
  const secondRow = testimonials.slice(half);

  return (
    <section className="relative overflow-hidden border-t border-line py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          accent={copy.accent}
          align="center"
        />
      </div>

      {/* Opposing directions read as motion rather than as a slideshow. */}
      <div className="relative mt-16 flex flex-col gap-5">
        <Marquee pauseOnHover className="[--duration:46s] [--gap:1.25rem]">
          {firstRow.map((item) => (
            <QuoteCard key={item.quote} {...item} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:54s] [--gap:1.25rem]">
          {secondRow.map((item) => (
            <QuoteCard key={item.quote} {...item} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent sm:w-40" />
      </div>
    </section>
  );
}
