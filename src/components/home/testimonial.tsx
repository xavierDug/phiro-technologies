import { Reveal } from "@/components/motion/reveal";
import { getSiteContent } from "@/content/site";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/seo";

function initials(text: string) {
  return text
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function Testimonial({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).sections.testimonial;
  const quote = getSiteContent(locale).testimonials.find((t) => t.featured);
  if (!quote) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 pb-32 sm:px-10 sm:pb-40">
      <Reveal as="figure" className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-20">
        <p className="eyebrow pt-4">{copy.eyebrow}</p>
        <div>
          <blockquote className="font-serif text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1.1] tracking-[-0.015em]">
            &ldquo;{quote.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-9 flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className="grid size-11 place-items-center rounded-full bg-panel font-mono text-sm"
            >
              {initials(quote.author)}
            </span>
            <span>
              <span className="block font-medium">{quote.author}</span>
              <span className="block text-sm text-muted">{quote.role}</span>
            </span>
          </figcaption>
        </div>
      </Reveal>
    </section>
  );
}
