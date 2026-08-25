import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { CTA } from "@/components/sections/cta";
import { FeaturedPost } from "@/components/blog/featured-post";
import { PostList } from "@/components/blog/post-list";
import { JsonLd } from "@/components/seo/json-ld";
import { featuredPost, postsForLocale } from "@/content/blog";
import { getDictionary } from "@/content/dictionaries";
import { blogSchema, breadcrumbSchema, graph } from "@/lib/schema";
import { localePath, type Locale } from "@/lib/seo";

/**
 * The whole blog index, parameterised by locale.
 *
 * Both `/blog` and `/fr/blog` render this. Keeping the markup in one component
 * rather than duplicating it per route is what makes the no-i18n-library
 * approach maintainable: there is exactly one layout to change.
 */
export function BlogIndex({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const posts = postsForLocale(locale);
  const lead = featuredPost(locale);
  const rest = posts.filter((post) => post.slug !== lead?.slug);

  return (
    <>
      <JsonLd
        data={graph(
          blogSchema(locale),
          breadcrumbSchema(
            [
              { name: locale === "fr" ? "Accueil" : "Home", path: "/" },
              { name: dict.blog.eyebrow, path: "/blog" },
            ],
            locale
          )
        )}
      />

      <PageHero
        eyebrow={dict.blog.eyebrow}
        title={dict.blog.title}
        accent={dict.blog.titleAccent}
        description={dict.blog.description}
      />

      {lead ? (
        <>
          <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <FeaturedPost post={lead} dict={dict} locale={locale} />
          </section>

          {rest.length > 0 && (
            <section className="mx-auto max-w-6xl px-6 pb-24">
              <div className="mb-8 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-gold/50" />
                <span className="eyebrow">{dict.blog.latest}</span>
              </div>
              <PostList posts={rest} dict={dict} locale={locale} />
            </section>
          )}
        </>
      ) : (
        <EmptyState locale={locale} />
      )}

      <CTA />
    </>
  );
}

/** An empty index is an invitation, not an apology. */
function EmptyState({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <div className="rounded-2xl border border-line bg-surface/60 px-8 py-16">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)]">{dict.blog.emptyTitle}</h2>
        <p className="mx-auto mt-4 max-w-md text-dim">{dict.blog.emptyBody}</p>
        <Link
          href={localePath("/projects", locale)}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm transition-colors hover:border-gold hover:text-gold"
        >
          {dict.blog.emptyCta}
        </Link>
      </div>
    </section>
  );
}
