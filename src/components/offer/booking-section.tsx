import { BookingForm } from "@/components/offer/booking-form";
import { Headline } from "@/components/ui/headline";
import { OFFER_ANCHORS } from "@/content/navigation";
import { OFFER_PRICES, formatPrice, getOffer } from "@/content/offer";
import { contactDetails } from "@/content/site";
import type { Locale } from "@/lib/seo";

const TERM = "font-mono text-xs uppercase tracking-[0.14em] text-on-ink-faint";
const LINK = "transition-colors duration-300 hover:text-gold";

/**
 * The closing dark band, which here is the booking form rather than a link
 * away. Replaces ClosingCta on this page; the footer follows as usual.
 */
export function BookingSection({ locale }: { locale: Locale }) {
  const copy = getOffer(locale).booking;
  const prices = {
    essential: formatPrice(OFFER_PRICES.essential, locale),
    standard: formatPrice(OFFER_PRICES.standard, locale),
  };

  return (
    <section
      id={OFFER_ANCHORS[locale].book}
      aria-labelledby="booking-title"
      className="scroll-mt-16 bg-ink text-on-ink"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 pt-24 pb-20 sm:px-10 sm:pt-32 sm:pb-24 lg:grid-cols-[5fr_7fr] lg:gap-18">
        <div>
          <p className="eyebrow mb-6 !text-on-ink-faint">{copy.eyebrow}</p>
          <h2 id="booking-title" className="max-w-[11ch] text-[clamp(2.75rem,5.6vw,5.25rem)]">
            <Headline title={copy.title} accent={copy.accent} onInk />
          </h2>
          <p className="mt-7 max-w-[25rem] text-lg leading-relaxed text-on-ink-muted">{copy.lead}</p>

          <dl className="mt-12">
            <div className="border-t border-line-on-ink py-5">
              <dt className={TERM}>{copy.phone}</dt>
              <dd className="mt-2.5 text-[1.0625rem]">
                <a href={contactDetails.phoneHref} className={LINK}>
                  {contactDetails.phone}
                </a>
              </dd>
            </div>
            <div className="border-t border-line-on-ink py-5">
              <dt className={TERM}>{copy.email}</dt>
              <dd className="mt-2.5 text-[1.0625rem]">
                <a href={`mailto:${contactDetails.email}`} className={LINK}>
                  {contactDetails.email}
                </a>
              </dd>
            </div>
            <div className="border-t border-line-on-ink py-5">
              <dt className={TERM}>{copy.studio}</dt>
              <dd className="mt-2.5 text-[1.0625rem] text-on-ink-muted">{contactDetails.locality}</dd>
            </div>
          </dl>
        </div>

        <BookingForm copy={copy} locale={locale} prices={prices} />
      </div>
    </section>
  );
}
