import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
export function ArticleHeader({
  post,
  readingMinutes,
  dict,
  locale,
}: ArticleHeaderProps) {
  return (
    <header className="mx-auto w-full max-w-3xl px-6 pt-32 sm:pt-40">
      <Link
        href={localePath("/blog", locale)}
        className="group inline-flex items-center gap-2 text-sm text-faint transition-colors hover:text-gold"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        {dict.blog.backToBlog}
      </Link>

      <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="rounded-full border border-gold/30 bg-gold/[0.07] px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
          {post.category}
        </span>
        <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
        <span className="eyebrow">
          {readingMinutes} {dict.blog.minuteRead}
        </span>
      </div>

      <h1 className="mt-6 text-[clamp(2.25rem,6vw,4rem)]">
        {post.title}
        <span className="text-gold">.</span>
      </h1>

      <p className="mt-7 text-[1.15rem] leading-relaxed text-dim sm:text-[1.25rem]">
        {post.excerpt}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 text-sm">
        <div>
          <p className="eyebrow mb-1">{dict.blog.writtenBy}</p>
          <p className="text-text">{post.author.name}</p>
          <p className="text-xs text-faint">{post.author.role}</p>
        </div>

        <div>
          <p className="eyebrow mb-1">{dict.blog.published}</p>
          <time dateTime={isoDate(post.publishedAt)} className="text-text">
            {formatPostDate(post.publishedAt, locale)}
          </time>
        </div>

        {post.updatedAt && (
          <div>
            <p className="eyebrow mb-1">{dict.blog.updated}</p>
            <time dateTime={isoDate(post.updatedAt)} className="text-text">
              {formatPostDate(post.updatedAt, locale)}
            </time>
          </div>
        )}
      </div>

      <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-surface">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          // The cover is the LCP element on every article page, so it must not
          // be lazy-loaded.
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent"
        />
      </div>
    </header>
  );
}
