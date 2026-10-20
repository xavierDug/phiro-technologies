import Image from "next/image";
import Link from "next/link";

import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { buildNavLinks } from "@/content/navigation";
import { contactDetails, getSiteContent } from "@/content/site";
import { getDictionary } from "@/content/dictionaries";
import { localePath, SOCIAL_PROFILES, type Locale } from "@/lib/seo";

const COLUMN_LABEL = "mb-2 font-mono text-xs uppercase tracking-[0.14em] text-on-ink-faint";
const LINK = "transition-colors duration-300 hover:text-gold";

/**
 * Server component: the footer is static text, so it ships no JavaScript of
 * its own (the language toggle is the one client island inside it).
 */
export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { services } = getSiteContent(locale);
  const navLinks = buildNavLinks(dict, locale);
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden bg-ink text-on-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid gap-12 border-t border-line-on-ink py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
          <Link
            href={localePath("/", locale)}
            aria-label="Phiro Technologies"
            className="flex items-start gap-2.5 self-start"
          >
            <Image src="/PhiroTechnoNoText.png" alt="" width={26} height={26} />
            <span className="font-display text-[1.0625rem] font-semibold tracking-[0.16em]">PHIRO</span>
          </Link>

          <nav aria-label={dict.footer.studio} className="flex flex-col gap-3 text-[0.9375rem]">
            <p className={COLUMN_LABEL}>{dict.footer.studio}</p>
            {navLinks
              .filter((link) => !link.href.includes("#"))
              .map((link) => (
                <Link key={link.href} href={link.href} className={LINK}>
                  {link.label}
                </Link>
              ))}
            <Link href={localePath("/contact", locale)} className={LINK}>
              {dict.nav.contact}
            </Link>
          </nav>

          <nav aria-label={dict.footer.services} className="flex flex-col gap-3 text-[0.9375rem]">
            <p className={COLUMN_LABEL}>{dict.footer.services}</p>
            {services.slice(0, 4).map((service) => (
              <Link key={service.index} href={localePath("/#services", locale)} className={LINK}>
                {service.title}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-[0.9375rem]">
            <p className={COLUMN_LABEL}>{dict.footer.contact}</p>
            <a href={`mailto:${contactDetails.email}`} className={LINK}>
              {contactDetails.email}
            </a>
            <a href={contactDetails.phoneHref} className={LINK}>
              {contactDetails.phone}
            </a>
            <span className="text-on-ink-muted">{contactDetails.locality}</span>
            <a href={SOCIAL_PROFILES[0]} target="_blank" rel="noreferrer noopener" className={LINK}>
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-line-on-ink px-5 py-7 text-[0.8125rem] text-on-ink-faint sm:px-10">
        <p>
          © {year} Phiro Technologies. {dict.common.allRightsReserved}
        </p>
        <p>{dict.common.tagline}.</p>
        <LocaleSwitcher className="text-on-ink-faint hover:text-on-ink" />
      </div>

      {/* The only place the brand is set this large. Decorative (the name is
          already in the logo above), so it is generated content rather than
          text; its descender is cropped by the footer's bottom edge so it reads
          as the page running out, not as a heading. */}
      <div
        aria-hidden="true"
        data-text="phiro"
        className="-mb-[0.22em] select-none text-center font-display text-[clamp(7rem,26vw,24rem)] leading-[0.82] font-medium tracking-[-0.06em] whitespace-nowrap text-on-ink/[0.07] before:content-[attr(data-text)]"
      />
    </footer>
  );
}
