import { ContactForm } from "@/components/contact/contact-form";
import { Headline } from "@/components/ui/headline";
import { contactDetails } from "@/content/site";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/seo";

/**
 * Contact page: the pitch and the direct details on the left, the three-step
 * form on a white card on the right. Server component; the form is the only
 * client island.
 */
export function ContactPanel({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const page = dict.sections.pages.contact;
  const labels = dict.sections.contact;

  const details = [
    { label: labels.emailLabel, value: contactDetails.email, href: `mailto:${contactDetails.email}` },
    { label: labels.phoneLabel, value: contactDetails.phone, href: contactDetails.phoneHref },
    { label: labels.basedIn, value: contactDetails.location },
    { label: labels.responseTime, value: dict.common.responseTime },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 pt-14 pb-28 sm:px-10 sm:pt-24 sm:pb-36">
      <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-24">
        <div>
          <p className="eyebrow fade-up mb-8">{page.eyebrow}</p>
          <h1
            className="fade-up max-w-[9ch] text-[clamp(3rem,6.6vw,6rem)] leading-[0.98] tracking-[-0.045em]"
            style={{ "--delay": "60ms" } as React.CSSProperties}
          >
            <Headline title={page.title} accent={page.accent} />
          </h1>
          <p
            className="fade-up mt-8 max-w-md text-lg leading-relaxed text-muted"
            style={{ "--delay": "140ms" } as React.CSSProperties}
          >
            {page.description}
          </p>

          <dl className="fade-up mt-14 border-t border-line-strong" style={{ "--delay": "220ms" } as React.CSSProperties}>
            {details.map((row) => (
              <div key={row.label} className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-b border-line-strong py-5">
                <dt className="eyebrow pt-0.5">{row.label}</dt>
                <dd className="text-[1.0625rem]">
                  {row.href ? (
                    <a href={row.href} className="underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink">
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="fade-up rounded-3xl border border-line bg-card p-6 sm:p-12"
          style={{ "--delay": "180ms" } as React.CSSProperties}
        >
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
