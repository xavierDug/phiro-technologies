import Link from "next/link";

import { PostCover } from "@/components/blog/post-cover";
import type { Post } from "@/content/blog/types";
import { readingMinutes } from "@/content/blog/types";
import type { Dictionary } from "@/content/dictionaries/types";
import { formatPostDate, isoDate } from "@/lib/date";
import { localePath, type Locale } from "@/lib/seo";

/**
 * The lead article, as an editorial feature: typographic cover on the left,
 * headline and standfirst on the right. Server component.
 */
export function FeaturedPost({ post, dict, locale }: { post: Post; dict: Dictionary; locale: Locale }) {
  const href = localePath(`/blog/${post.slug}`, locale);

  return (
    <article className="fade-up border-t border-line-strong pt-14" style={{ "--delay": "240ms" } as React.CSSProperties}>
      <Link href={href} className="group grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <PostCover category={post.category} title={post.title} size="lg" className="aspect-[4/3]" />
        <div>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex h-7 items-center rounded-full bg-gold px-3 text-xs font-medium">
              {dict.blog.featured}
            </span>
            <span className="eyebrow">
              {post.category} · <time dateTime={isoDate(post.publishedAt)}>{formatPostDate(post.publishedAt, locale)}</time> ·{" "}
              {readingMinutes(post.body)} {dict.blog.minuteRead}
            </span>
          </p>
          <h2 className="mt-6 mb-5 text-[clamp(2.25rem,3.8vw,3.375rem)] leading-[1.04] decoration-1 underline-offset-[6px] group-hover:underline">
            {post.title}
          </h2>
          <p className="max-w-[32rem] text-lg leading-relaxed text-muted">{post.excerpt}</p>
          <p className="mt-8 flex items-center gap-3">
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-panel font-mono text-[0.8125rem]">
              {post.author.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
            <span className="text-[0.9375rem]">
              <span className="block font-medium">{post.author.name}</span>
              <span className="block text-sm text-muted">{post.author.role}</span>
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}
