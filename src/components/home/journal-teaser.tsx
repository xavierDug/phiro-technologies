import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/headline";
import { Reveal } from "@/components/motion/reveal";
import { PostCover } from "@/components/blog/post-cover";
import { featuredPost } from "@/content/blog";
import { readingMinutes } from "@/content/blog/types";
import { getDictionary } from "@/content/dictionaries";
import { formatPostDate, isoDate } from "@/lib/date";
import { localePath, type Locale } from "@/lib/seo";

export function JournalTeaser({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const copy = dict.sections.journal;
  const post = featuredPost(locale);
  if (!post) return null;

  return (
    <section className="bg-panel">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-10 sm:py-32">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          accent={copy.accent}
          aside={
            <ButtonLink href={localePath("/blog", locale)} variant="outline">
              {copy.allArticles}
            </ButtonLink>
          }
        />
        <Reveal className="mt-12">
          <Link
            href={localePath(`/blog/${post.slug}`, locale)}
            className="group grid items-center gap-10 rounded-[20px] bg-paper p-4 sm:p-6 md:grid-cols-2"
          >
            <PostCover category={post.category} title={post.title} className="aspect-[16/10]" />
            <div className="px-2 pb-4 md:pr-8 md:pb-0">
              <p className="eyebrow">
                {post.category} · <time dateTime={isoDate(post.publishedAt)}>{formatPostDate(post.publishedAt, locale)}</time> ·{" "}
                {readingMinutes(post.body)} {dict.blog.minuteRead}
              </p>
              <h3 className="mt-4 mb-4 text-[clamp(1.75rem,2.8vw,2.25rem)] leading-[1.08] tracking-[-0.03em] decoration-1 underline-offset-[5px] group-hover:underline">
                {post.title}
              </h3>
              <p className="text-[1.0625rem] leading-relaxed text-muted">{post.excerpt}</p>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
