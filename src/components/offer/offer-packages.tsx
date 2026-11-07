import { Check, Clock, Plus } from "lucide-react";

import { buttonStyles } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/headline";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { OFFER_ANCHORS } from "@/content/navigation";
import { OFFER_PRICES, formatPrice, getOffer, type OfferPackage } from "@/content/offer";
import type { Locale } from "@/lib/seo";
import { cn } from "@/lib/utils";

function PackageCard({
  item,
  locale,
  bookAnchor,
  recommendedLabel,
  quotedLabel,
}: {
  item: OfferPackage;
  locale: Locale;
  bookAnchor: string;
  recommendedLabel: string;
  quotedLabel: string;
}) {
  const dark = Boolean(item.recommended);
  const Icon = item.featureStyle === "plus" ? Plus : Check;
  const number = { essential: "01", standard: "02", custom: "03" }[item.id];

  return (
    <RevealItem
      as="article"
      className={cn(
        "flex flex-col rounded-[18px] border px-8 pt-9 pb-8 transition-colors duration-300",
        dark
          ? "order-first border-ink bg-ink text-on-ink shadow-[0_24px_48px_rgb(11_11_13/0.14)] lg:order-none"
          : "border-line bg-card hover:border-line-strong"
      )}
    >
      <div className="flex h-7 items-center justify-between gap-3">
        <p className={cn("eyebrow", dark ? "!text-on-ink-faint" : "!text-faint")}>{number}</p>
        {dark && (
          <p className="inline-flex h-7 items-center rounded-full bg-gold px-3 font-mono text-[0.6875rem] tracking-[0.14em] text-ink uppercase">
            {recommendedLabel}
          </p>
        )}
      </div>

      <h3 className="mt-5 text-[1.875rem] tracking-[-0.035em]">{item.name}</h3>
      <p className={cn("mt-3 text-[0.9375rem] leading-relaxed lg:min-h-[4.5rem]", dark ? "text-on-ink-muted" : "text-muted")}>
        {item.blurb}
      </p>

      <div className={cn("mt-8 border-b pb-7", dark ? "border-line-on-ink" : "border-line")}>
        <p className="font-display text-[3.75rem] leading-none font-semibold tracking-[-0.045em] tabular-nums">
          {item.priceKey ? formatPrice(OFFER_PRICES[item.priceKey], locale) : quotedLabel}
        </p>
        <p className={cn("eyebrow mt-3", dark ? "!text-on-ink-faint" : "!text-faint")}>{item.priceNote}</p>
      </div>

      <p className={cn("mt-6 flex items-start gap-2.5 text-sm leading-normal", dark ? "text-on-ink" : "text-ink-soft")}>
        <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        <span>{item.delivery}</span>
      </p>

      <ul className="mt-6 flex grow flex-col gap-3 text-[0.9375rem]">
        {item.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <Icon aria-hidden="true" className="mt-1 size-4 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* A plain in-page link: BookingForm picks up data-package and checks it. */}
      <a
        href={`#${bookAnchor}`}
        data-package={item.id}
        className={cn(buttonStyles({ variant: dark ? "gold" : "outline" }), "mt-9 w-full")}
      >
        {item.cta}
      </a>
    </RevealItem>
  );
}

/** Three package cards on the panel band; Standard leads on narrow screens. */
export function OfferPackages({ locale }: { locale: Locale }) {
  const copy = getOffer(locale).packages;
  const anchors = OFFER_ANCHORS[locale];

  return (
    <section id={anchors.packages} aria-labelledby="packages-title" className="scroll-mt-20 bg-panel">
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-14 sm:px-10 sm:pt-[clamp(5rem,9vw,8rem)] sm:pb-20">
        <SectionHeading
          id="packages-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          accent={copy.accent}
          description={copy.description}
          className="mb-14"
        />

        <RevealGroup className="mx-auto grid max-w-xl gap-5 lg:max-w-none lg:grid-cols-3">
          {copy.items.map((item) => (
            <PackageCard
              key={item.id}
              item={item}
              locale={locale}
              bookAnchor={anchors.book}
              recommendedLabel={copy.recommended}
              quotedLabel={copy.quoted}
            />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
