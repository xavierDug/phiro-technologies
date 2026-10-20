import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PostCover } from "@/components/blog/post-cover";
import type { Post } from "@/content/blog/types";
import type { Dictionary } from "@/content/dictionaries/types";
import { formatPostDate, isoDate } from "@/lib/date";
import { localePath, type Locale } from "@/lib/seo";

interface ArticleHeaderProps {
  post: Post;
  readingMinutes: number;
  dict: Dictionary;
  locale: Locale;
}

/**
 * Server component. Everything above the fold on an article page is text that
 * has to be in the initial HTML — the h1, the lead, the author and the dates
 * are all signals, not decoration.
 */
export function ArticleHeader({ post, readingMinutes, dict, locale }: ArticleHeaderProps) {
  return (
    <header className="mx-auto max-w-7xl px-5 pt-14 sm:px-10 sm:pt-20">
      <Link
        href={localePath("/blog", locale)}
        className="eyebrow group fade-up inline-flex items-center gap-2 transition-colors hover:text-ink"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
        {dict.blog.backToBlog}
      </Link>

      <div className="mt-14 max-w-[58rem]">
        <p className="eyebrow fade-up mb-7">
          {post.category} · {readingMinutes} {dict.blog.minuteRead}
        </p>
        <h1
          className="fade-up text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.0] tracking-[-0.045em]"
          style={{ "--delay": "60ms" } as React.CSSProperties}
        >
          {post.title}
        </h1>
        <p
          className="fade-up mt-8 max-w-[40rem] text-xl leading-relaxed text-muted"
          style={{ "--delay": "140ms" } as React.CSSProperties}
        >
          {post.excerpt}
        </p>

        <div
          className="fade-up mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line-strong pt-7"
          style={{ "--delay": "200ms" } as React.CSSProperties}
        >
          <div>
            <p className="eyebrow">{dict.blog.writtenBy}</p>
            <p className="mt-1.5 font-medium">{post.author.name}</p>
            <p className="text-sm text-muted">{post.author.role}</p>
          </div>
          <div>
            <p className="eyebrow">{dict.blog.published}</p>
            <time dateTime={isoDate(post.publishedAt)} className="mt-1.5 block">
              {formatPostDate(post.publishedAt, locale)}
            </time>
          </div>
          {post.updatedAt && (
            <div>
              <p className="eyebrow">{dict.blog.updated}</p>
              <time dateTime={isoDate(post.updatedAt)} className="mt-1.5 block">
                {formatPostDate(post.updatedAt, locale)}
              </time>
            </div>
          )}
        </div>
      </div>

      <PostCover
        category={post.category}
        title={post.title}
        size="lg"
        className="fade-up mt-16 aspect-[4/3] sm:aspect-[21/9]"
      />
    </header>
  );
}
