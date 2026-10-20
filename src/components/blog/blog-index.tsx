import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FeaturedPost } from "@/components/blog/featured-post";
import { PostList } from "@/components/blog/post-list";
import { JsonLd } from "@/components/seo/json-ld";
import { featuredPost, postsForLocale } from "@/content/blog";
import { getDictionary } from "@/content/dictionaries";
import { blogSchema, breadcrumbSchema, graph } from "@/lib/schema";
import { localePath, type Locale } from "@/lib/seo";

/**
 * The whole blog index, parameterised by locale. Both `/blog` and `/fr/blog`
 * render this — one layout to change, no i18n library.
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
          <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-10">
            <FeaturedPost post={lead} dict={dict} locale={locale} />
          </section>

          {rest.length > 0 && (
            <section className="mx-auto max-w-7xl px-5 pb-32 sm:px-10">
              <h2 className="mb-6 text-[1.75rem] tracking-[-0.02em]">{dict.blog.latest}</h2>
              <PostList posts={rest} dict={dict} locale={locale} />
            </section>
          )}
        </>
      ) : (
        <EmptyState locale={locale} />
      )}

      <ClosingCta locale={locale} />
    </>
  );
}

/** An empty index is an invitation, not an apology. */
function EmptyState({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="mx-auto max-w-7xl px-5 pb-32 sm:px-10">
      <div className="rounded-[20px] bg-panel px-8 py-20 text-center">
        <h2 className="text-[clamp(1.75rem,3vw,2.25rem)]">{dict.blog.emptyTitle}</h2>
        <p className="mx-auto mt-4 max-w-md text-muted">{dict.blog.emptyBody}</p>
        <Link
          href={localePath("/projects", locale)}
          className="mt-8 inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-sm font-medium transition-colors hover:border-ink"
        >
          {dict.blog.emptyCta}
        </Link>
      </div>
    </section>
  );
}
