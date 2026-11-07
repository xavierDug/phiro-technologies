import { BookingSection } from "@/components/offer/booking-section";
import { OfferFaq } from "@/components/offer/offer-faq";
import { OfferHero } from "@/components/offer/offer-hero";
import { OfferPackages } from "@/components/offer/offer-packages";
import { OfferPlans } from "@/components/offer/offer-plans";
import { OfferProcess } from "@/components/offer/offer-process";
import { OfferWork } from "@/components/offer/offer-work";
import type { Locale } from "@/lib/seo";

/**
 * The website-packages page, shared by `/websites` and `/fr/sites-web`.
 * Unlisted (noindex, not in the nav or sitemap): visitors arrive from outreach
 * emails. Every section is a server component; the only new client island is
 * the booking form.
 */
export function OfferView({ locale }: { locale: Locale }) {
  return (
    <>
      <OfferHero locale={locale} />
      <OfferPackages locale={locale} />
      <OfferPlans locale={locale} />
      <OfferProcess locale={locale} />
      <OfferWork locale={locale} />
      <OfferFaq locale={locale} />
      <BookingSection locale={locale} />
    </>
  );
}
