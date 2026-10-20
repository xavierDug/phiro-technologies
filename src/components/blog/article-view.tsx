import { ArticleCta } from "@/components/blog/article-cta";
import { ArticleHeader } from "@/components/blog/article-header";
import { ArticleLayout } from "@/components/blog/article-rail";
import { PostFaq } from "@/components/blog/post-faq";
import { Prose } from "@/components/blog/prose";
import { RelatedPosts } from "@/components/blog/related-posts";
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

        <div className="pt-20">
          <ArticleLayout toc={toc}>
            <Prose blocks={post.body} />
            {post.faq && <PostFaq items={post.faq} dict={dict} />}
            {post.tags.length > 0 && (
              <ul className="mx-auto mt-14 flex w-full max-w-[44rem] flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-line-strong px-3.5 py-1.5 text-[0.8125rem] text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </ArticleLayout>
        </div>
      </article>

      <RelatedPosts posts={related} dict={dict} locale={locale} />
      <ArticleCta dict={dict} locale={locale} />
    </>
  );
}
