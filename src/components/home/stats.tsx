import { NumberTicker } from "@/components/ui/number-ticker";
import { getSiteContent } from "@/content/site";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/seo";

export function Stats({ locale }: { locale: Locale }) {
  const { stats } = getSiteContent(locale);
  const copy = getDictionary(locale).sections.stats;

  return (
    <section aria-label={copy.ariaLabel} className="mx-auto max-w-7xl px-5 pb-28 sm:px-10 sm:pb-36">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-12 border-y border-line-strong py-12 lg:grid-cols-4">
        {stats.map((stat) => (
          // dt first in the DOM for screen readers; flex-col-reverse puts the
          // number on top visually.
          <div key={stat.label} className="flex flex-col-reverse justify-end">
            <dt className="mt-3.5 text-[0.9375rem] text-muted">{stat.label}</dt>
            <dd className="font-display text-[clamp(3rem,5.4vw,4.5rem)] leading-none font-medium tracking-[-0.045em]">
              {stat.prefix}
              {stat.literal ? stat.value : <NumberTicker value={stat.value} />}
              {stat.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
