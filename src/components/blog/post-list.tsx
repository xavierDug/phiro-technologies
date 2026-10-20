import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Post } from "@/content/blog/types";
import { readingMinutes } from "@/content/blog/types";
import type { Dictionary } from "@/content/dictionaries/types";
import { formatPostDate, isoDate } from "@/lib/date";
import { localePath, type Locale } from "@/lib/seo";

/**
 * The index below the lead article: hairline-separated editorial rows, not
 * cards. The titles are the largest thing in each row — they are the only
 * element a reader is actually choosing between. Server component.
 */
export function PostList({ posts, dict, locale }: { posts: Post[]; dict: Dictionary; locale: Locale }) {
  if (posts.length === 0) return null;

  return (
    <ul className="border-t border-line-strong">
      {posts.map((post) => (
        <li key={post.slug} className="border-b border-line-strong">
          <Link
            href={localePath(`/blog/${post.slug}`, locale)}
            className="group grid items-baseline gap-x-10 gap-y-3 px-1 py-8 transition-colors duration-300 hover:bg-card sm:grid-cols-[150px_minmax(0,1fr)_auto] sm:px-4"
          >
            <time dateTime={isoDate(post.publishedAt)} className="eyebrow whitespace-nowrap">
              {formatPostDate(post.publishedAt, locale)}
            </time>
            <div className="min-w-0">
              <h3 className="text-[clamp(1.375rem,2.4vw,1.75rem)] tracking-[-0.02em]">{post.title}</h3>
              <p className="mt-2.5 max-w-2xl leading-relaxed text-muted">{post.excerpt}</p>
              <p className="eyebrow mt-3">
                {post.category} · {readingMinutes(post.body)} {dict.blog.minuteRead}
              </p>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className="hidden size-5 text-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink sm:block"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
