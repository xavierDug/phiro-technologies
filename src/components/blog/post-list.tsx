"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import type { Post } from "@/content/blog/types";
import type { Dictionary } from "@/content/dictionaries/types";
import { formatPostDate, isoDate } from "@/lib/date";
import { readingMinutes } from "@/content/blog/types";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { EASE } from "@/lib/motion";
import { localePath, type Locale } from "@/lib/seo";

interface PostListProps {
  posts: Post[];
  dict: Dictionary;
  locale: Locale;
}

/**
 * The index below the lead article: hairline-separated editorial rows, not
 * cards.
 *
 * Cards would give every post the same visual weight and turn the page into a
 * grid of thumbnails — the look every blog template already has. Rows let the
 * titles be the largest thing on the page, which is the only element a reader
 * is actually choosing between. The cover art still earns its place: it appears
 * on hover, tracking the cursor, echoing the reveal already used by the site's
 * FlowingMenu.
 */
export function PostList({ posts, dict, locale }: PostListProps) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<Post | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 220, damping: 28, mass: 0.4 });
  const y = useSpring(pointerY, { stiffness: 220, damping: 28, mass: 0.4 });

  function trackPointer(event: React.MouseEvent) {
    pointerX.set(event.clientX);
    pointerY.set(event.clientY);
  }

  if (posts.length === 0) return null;

  return (
    <div className="relative">
      <ul className="border-t border-line" onMouseMove={reduced ? undefined : trackPointer}>
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-line">
            <Link
              href={localePath(`/blog/${post.slug}`, locale)}
              onMouseEnter={() => setHovered(post)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(null)}
              className="group grid items-baseline gap-x-8 gap-y-3 py-8 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:py-10"
            >
              <div className="flex items-center gap-3 sm:block">
                <time
                  dateTime={isoDate(post.publishedAt)}
                  className="eyebrow block whitespace-nowrap"
                >
                  {formatPostDate(post.publishedAt, locale)}
                </time>
                <span className="mt-2 hidden text-xs text-faint sm:block">
                  {post.category}
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="text-[clamp(1.35rem,2.6vw,1.9rem)] transition-colors duration-300 group-hover:text-gold">
                  {post.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[0.975rem] leading-relaxed text-dim">
                  {post.excerpt}
                </p>
                <span className="mt-3 inline-block text-xs text-faint">
                  {readingMinutes(post.body)} {dict.blog.minuteRead}
                </span>
              </div>

              <ArrowUpRight
                aria-hidden="true"
                className="hidden size-5 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold sm:block"
              />
            </Link>
          </li>
        ))}
      </ul>

      {/* Cursor-tracked preview. Pointer-events-none so it never intercepts the
          hover it is reacting to. Desktop only — there is no cursor to track on
          touch, and reduced-motion readers opt out entirely. */}
      {!reduced && (
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.slug}
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.28, ease: EASE }}
              style={{ x, y }}
              className="pointer-events-none fixed left-0 top-0 z-50 hidden lg:block"
            >
              <div className="-translate-x-1/2 -translate-y-[115%]">
                <div className="relative h-40 w-72 overflow-hidden rounded-xl border border-line-strong bg-surface shadow-2xl shadow-black/60">
                  <Image
                    src={hovered.cover.src}
                    alt=""
                    fill
                    sizes="288px"
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
