import Link from "next/link";

import { PostCover } from "@/components/blog/post-cover";
import type { Post } from "@/content/blog/types";
import { readingMinutes } from "@/content/blog/types";
import type { Dictionary } from "@/content/dictionaries/types";
import { formatPostDate, isoDate } from "@/lib/date";
import { localePath, type Locale } from "@/lib/seo";

export function RelatedPosts({ posts, dict, locale }: { posts: Post[]; dict: Dictionary; locale: Locale }) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mx-auto max-w-7xl px-5 pt-28 sm:px-10">
      <p className="eyebrow mb-5">{dict.blog.relatedEyebrow}</p>
      <h2 id="related-heading" className="text-[clamp(2rem,3.4vw,2.75rem)]">
        {dict.blog.relatedTitle}.
      </h2>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={localePath(`/blog/${post.slug}`, locale)} className="group block">
            <PostCover category={post.category} title={post.title} className="aspect-[16/10]" />
            <p className="eyebrow mt-5">
              <time dateTime={isoDate(post.publishedAt)}>{formatPostDate(post.publishedAt, locale)}</time> ·{" "}
              {readingMinutes(post.body)} {dict.blog.minuteRead}
            </p>
            <h3 className="mt-2.5 text-[1.5rem] leading-[1.15] tracking-[-0.02em] decoration-1 underline-offset-[5px] group-hover:underline">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
