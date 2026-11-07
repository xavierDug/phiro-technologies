import { Reveal } from "@/components/motion/reveal";
import { Headline } from "@/components/ui/headline";
import { OFFER_PRICES, fillPrices, formatPrice, getOffer } from "@/content/offer";
import type { Locale } from "@/lib/seo";

/** Monthly plans and the extras line. Still on the panel band, so pricing reads as one block. */
export function OfferPlans({ locale }: { locale: Locale }) {
  const offer = getOffer(locale);
  const copy = offer.plans;
  const extras = offer.extras;

  return (
    <section aria-labelledby="plans-title" className="bg-panel">
      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-10 sm:pb-[clamp(5rem,9vw,8rem)]">
        <Reveal className="grid items-center gap-8 rounded-[18px] bg-paper p-7 sm:p-[clamp(1.75rem,4vw,3.5rem)] lg:grid-cols-[5fr_7fr] lg:gap-12">
          <div>
            <p className="eyebrow mb-5">{copy.eyebrow}</p>
            <h2 id="plans-title" className="max-w-[14ch] text-[clamp(1.875rem,3.2vw,2.75rem)]">
              <Headline title={copy.title} accent={copy.accent} />
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted">{copy.description}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {copy.items.map((plan) => (
              <div key={plan.name} className="rounded-[14px] border border-line bg-card p-7">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[1.375rem] tracking-[-0.03em]">{plan.name}</h3>
                  <p className="eyebrow rounded-full border border-line-strong px-2.5 py-1 !text-[0.6875rem]">
                    {plan.badge}
                  </p>
                </div>
                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-display text-[2.75rem] leading-none font-semibold tracking-[-0.045em] tabular-nums">
                    {formatPrice(OFFER_PRICES[plan.priceKey], locale)}
                  </span>
                  <span className="text-[0.9375rem] text-muted">{copy.perMonth}</span>
                </p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{plan.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-7 flex flex-wrap items-center gap-y-3 px-1 text-[0.9375rem]">
          <p className="eyebrow w-full !text-faint md:w-auto md:pr-7">{extras.label}</p>
          {extras.items.map((item) => (
            <p
              key={item.label}
              className="flex w-full items-baseline justify-between gap-2.5 border-t border-line py-3 md:w-auto md:justify-start md:border-t-0 md:border-l md:px-7 md:py-0"
            >
              <span>{item.label}</span>
              <span className="font-display text-[1.1875rem] font-semibold tracking-[-0.02em] tabular-nums">
                {fillPrices(item.value, locale)}
                {item.note && (
                  <span className="ml-1.5 font-sans text-[0.8125rem] font-normal tracking-normal text-muted">
                    {item.note}
                  </span>
                )}
              </span>
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
