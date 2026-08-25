import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LocaleProvider } from "@/components/layout/locale-provider";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Toaster } from "@/components/ui/sonner";
import { blogSlugMap } from "@/content/blog";
import { getDictionary } from "@/content/dictionaries";
import { JsonLd } from "@/components/seo/json-ld";
import { graph, websiteSchema } from "@/lib/schema";
import { DEFAULT_LOCALE, HREFLANG, type Locale } from "@/lib/seo";

/**
 * Chrome for the main Phiro Technologies site, in either language.
 *
 * Both `(site)` and `fr` layouts render this, which is what keeps the two route
 * trees from drifting: there is one navbar, one footer, one place to change.
 * Campaign landing pages (och-planner) deliberately do not use it.
 *
 * The `lang` attribute goes on this wrapper rather than <html> because Next
 * allows only one root layout here, and a root layout cannot know which locale
 * is rendering without going dynamic. Per the HTML spec, `lang` on a subtree is
 * authoritative for that subtree — which is what assistive technology reads.
 * Google determines language from the content and the hreflang annotations, not
 * from this attribute, so the SEO signal is unaffected either way.
 */
export function SiteChrome({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const dict = getDictionary(locale);
  // Computed here, server-side, and handed down as data — see the doc comment
  // on blogSlugMap for why the client-side switcher must not import this itself.
  const slugMap = blogSlugMap();

  return (
    <LocaleProvider locale={locale} dict={dict} blogSlugMap={slugMap}>
      {/* Declares the language of this tree. Rendered per locale rather than in
          the root layout, which cannot know which one is active. */}
      <JsonLd data={graph(websiteSchema(locale))} />
      <ScrollProgress className="z-[70] h-[2px] bg-gradient-to-r from-gold-deep via-gold to-gold-deep" />
      <Navbar />
      <main
        id="main"
        {...(locale !== DEFAULT_LOCALE ? { lang: HREFLANG[locale] } : {})}
      >
        {children}
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </LocaleProvider>
  );
}
