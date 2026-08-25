import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleView } from "@/components/blog/article-view";
import { getPost, postsForLocale, translationPaths } from "@/content/blog";
import { buildMetadata } from "@/lib/metadata";
import { isoDate } from "@/lib/date";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return postsForLocale("fr").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug, "fr");

  if (!post) return { title: "Introuvable", robots: { index: false, follow: false } };

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    locale: "fr",
    // Slugs are translated, so alternates come from the translation key rather
    // than from prefixing this path.
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

export default async function FrenchBlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug, "fr");

  if (!post) notFound();

  return <ArticleView post={post} locale="fr" />;
}
