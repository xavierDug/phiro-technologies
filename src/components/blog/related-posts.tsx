import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import type { Post } from "@/content/blog/types";
import { readingMinutes } from "@/content/blog/types";
import type { Dictionary } from "@/content/dictionaries/types";
import { formatPostDate, isoDate } from "@/lib/date";
import { localePath, type Locale } from "@/lib/seo";

export function RelatedPosts({
  posts,
  dict,
  locale,
}: {
  posts: Post[];
  dict: Dictionary;
  locale: Locale;
}) {
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="related-heading"
      className="mx-auto w-full max-w-5xl px-6 pt-24"
    >
      <div className="mb-6 flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-gold/50" />
        <span className="eyebrow">{dict.blog.relatedEyebrow}</span>
      </div>

      <h2 id="related-heading" className="text-[clamp(1.7rem,3.2vw,2.35rem)]">
        {dict.blog.relatedTitle}
        <span className="text-gold">.</span>
      </h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={localePath(`/blog/${post.slug}`, locale)}
            className="group overflow-hidden rounded-2xl border border-line bg-surface/60 transition-colors duration-300 hover:border-line-strong"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-faint">
                <span className="text-gold/80">{post.category}</span>
                <span aria-hidden="true" className="h-px w-4 bg-line-strong" />
                <time dateTime={isoDate(post.publishedAt)}>
                  {formatPostDate(post.publishedAt, locale)}
                </time>
              </div>
              <h3 className="mt-3 flex items-start gap-2 text-xl leading-snug transition-colors duration-300 group-hover:text-gold">
                {post.title}
                <ArrowUpRight
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </h3>
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-dim">
                {post.excerpt}
              </p>
              <p className="mt-4 text-xs text-faint">
                {readingMinutes(post.body)} {dict.blog.minuteRead}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
