import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleView } from "@/components/blog/article-view";
import { getPost, postsForLocale, translationPaths } from "@/content/blog";
import { buildMetadata } from "@/lib/metadata";
import { isoDate } from "@/lib/date";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Every post is known at build time, so all of them prerender. */
export function generateStaticParams() {
  return postsForLocale("en").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug, "en");

  if (!post) return { title: "Not found", robots: { index: false, follow: false } };

  return buildMetadata({
    title: post.title,
    // Authored per post, never derived from the body — see the excerpt doc
    // comment in content/blog/types.ts for why that distinction matters.
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    locale: "en",
    alternatePaths: translationPaths(post),
    image: post.cover.src,
    imageAlt: post.cover.alt,
    type: "article",
    publishedTime: isoDate(post.publishedAt),
    modifiedTime: post.updatedAt ? isoDate(post.updatedAt) : undefined,
    authors: [post.author.name],
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug, "en");

  if (!post) notFound();

  return <ArticleView post={post} locale="en" />;
}
