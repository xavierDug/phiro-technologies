"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { BorderBeam } from "@/components/ui/border-beam";
import { Magnetic } from "@/components/layout/magnetic";
import type { Post } from "@/content/blog/types";
import { readingMinutes } from "@/content/blog/types";
import type { Dictionary } from "@/content/dictionaries/types";
import { formatPostDate, isoDate } from "@/lib/date";
import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { localePath, type Locale } from "@/lib/seo";

/**
 * The lead article, given an asymmetric two-column treatment so it reads as an
 * editorial feature rather than the first item in a grid.
 */
export function FeaturedPost({
  post,
  dict,
  locale,
}: {
  post: Post;
  dict: Dictionary;
  locale: Locale;
}) {
  const reduced = useReducedMotion();
  const href = localePath(`/blog/${post.slug}`, locale);

  return (
    <motion.article
      variants={stagger()}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <motion.div variants={fadeUp} className="order-2 lg:order-1">
        <div className="mb-5 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-gold/50" />
          <span className="eyebrow">{dict.blog.featured}</span>
        </div>

        <h2 className="text-[clamp(1.9rem,4vw,3rem)]">
          <Link href={href} className="transition-colors duration-300 hover:text-gold">
            {post.title}
          </Link>
          <span className="text-gold">.</span>
        </h2>

        <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-dim">
          {post.excerpt}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-faint">
          <span className="text-gold/80">{post.category}</span>
          <span aria-hidden="true" className="h-px w-4 bg-line-strong" />
          <time dateTime={isoDate(post.publishedAt)}>
            {formatPostDate(post.publishedAt, locale)}
          </time>
          <span aria-hidden="true" className="h-px w-4 bg-line-strong" />
          <span>
            {readingMinutes(post.body)} {dict.blog.minuteRead}
          </span>
        </div>

        <Magnetic>
          <Link
            href={href}
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-[#ffd75e]"
          >
            {dict.blog.readArticle}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Magnetic>
      </motion.div>

      <motion.div variants={fadeUp} className="order-1 lg:order-2">
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="group relative block overflow-hidden rounded-2xl border border-line bg-surface"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={post.cover.src}
              alt={post.cover.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.03]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent"
            />
          </div>
          {/* One gold accent on the lead card only — the whole point of the
              site's "one spotlight per viewport" rule. */}
          {!reduced && <BorderBeam size={220} duration={14} colorFrom="#c9962e" colorTo="#f5c843" />}
        </Link>
      </motion.div>
    </motion.article>
  );
}
