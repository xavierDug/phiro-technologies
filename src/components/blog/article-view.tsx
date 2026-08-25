import { ArticleCta } from "@/components/blog/article-cta";
import { ArticleHeader } from "@/components/blog/article-header";
import { ArticleLayout } from "@/components/blog/article-rail";
import { PostFaq } from "@/components/blog/post-faq";
import { Prose } from "@/components/blog/prose";
import { RelatedPosts } from "@/components/blog/related-posts";
import { CTA } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { relatedPosts } from "@/content/blog";
import { readingMinutes, tableOfContents, wordCount } from "@/content/blog/types";
import type { Post } from "@/content/blog/types";
import { getDictionary } from "@/content/dictionaries";
import { articleSchema, breadcrumbSchema, faqSchema, graph } from "@/lib/schema";
import { isoDate } from "@/lib/date";
import type { Locale } from "@/lib/seo";

/**
 * One article page, parameterised by locale.
 *
 * A server component throughout: the only interactive piece is the progress
 * rail, which is its own client island. The article body — the entire reason
 * the page exists as far as search is concerned — is static HTML.
 */
export function ArticleView({ post, locale }: { post: Post; locale: Locale }) {
  const dict = getDictionary(locale);
  const toc = tableOfContents(post.body);
  const minutes = readingMinutes(post.body);
  const related = relatedPosts(post);

  return (
    <>
      <JsonLd
        data={graph(
          articleSchema(
            {
              title: post.title,
              description: post.excerpt,
              path: `/blog/${post.slug}`,
              image: post.cover.src,
              publishedAt: isoDate(post.publishedAt),
              updatedAt: post.updatedAt ? isoDate(post.updatedAt) : undefined,
              authorName: post.author.name,
              section: post.category,
              tags: post.tags,
              wordCount: wordCount(post.body),
            },
            locale
          ),
          breadcrumbSchema(
            [
              { name: locale === "fr" ? "Accueil" : "Home", path: "/" },
              { name: dict.blog.eyebrow, path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ],
            locale
          ),
          // Only emitted when the post actually has an FAQ block rendered on the
          // page — schema describing content that is not visible is a violation.
          ...(post.faq?.length
            ? [
                faqSchema(
                  post.faq.map((item) => ({
                    question: item.question,
                    answer: item.answer,
                  }))
                ),
              ]
            : [])
        )}
      />

      <article>
        <ArticleHeader
          post={post}
          readingMinutes={minutes}
          dict={dict}
          locale={locale}
        />

        <div className="pt-16">
          <ArticleLayout toc={toc}>
            <Prose blocks={post.body} />
          </ArticleLayout>
        </div>

        <div className="mx-auto max-w-3xl">
          {post.faq && <PostFaq items={post.faq} dict={dict} />}
          <ArticleCta dict={dict} locale={locale} />
        </div>

        {post.tags.length > 0 && (
          <div className="mx-auto max-w-3xl px-6 pt-14">
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 text-xs text-faint"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>

      <RelatedPosts posts={related} dict={dict} locale={locale} />

      <div className="pt-24">
        <CTA />
      </div>
    </>
  );
}
