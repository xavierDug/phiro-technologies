import { Marquee } from "@/components/ui/marquee";
import { clients } from "@/content/site";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/seo";

/**
 * A slow CSS marquee of client names. Pure CSS, paused on hover, and frozen
 * for reduced-motion readers (see globals.css).
 */
export function Clients({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section aria-label={dict.sections.clients.label} className="border-y border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:px-10 md:flex-row md:items-center md:gap-12">
        <p className="eyebrow shrink-0">{dict.sections.clients.label}</p>
        <Marquee
          pauseOnHover
          repeat={3}
          className="min-w-0 flex-1 p-0 [--duration:36s] [--gap:3.5rem] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          {clients.map((name) => (
            <span
              key={name}
              className="flex items-center gap-14 font-display text-xl font-medium tracking-[-0.02em] whitespace-nowrap text-muted"
            >
              {name}
              <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
