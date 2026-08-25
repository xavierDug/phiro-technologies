/**
 * Blog content model.
 *
 * Posts are typed modules rather than MDX, matching how `projects.ts` and
 * `och-planner/_content/offer.ts` already work: the body is structured data,
 * the rendering is entirely ours. That buys three things a Markdown pipeline
 * does not — zero new dependencies, compile-time errors when a post is missing
 * a field, and a body shape we can walk to derive reading time, a table of
 * contents and Article JSON-LD without parsing anything.
 *
 * The cost is verbosity when authoring. Accepted deliberately.
 */

import type { Locale } from "@/lib/seo";

export type Block =
  | { type: "paragraph"; text: string }
  /** Only h2/h3 — h1 belongs to the post title, and the TOC is built from h2s. */
  | { type: "heading"; level: 2 | 3; text: string; id: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "code"; lang: string; code: string; caption?: string }
  | { type: "callout"; tone: "note" | "warn" | "win"; title?: string; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "divider" };

export interface Author {
  name: string;
  role: string;
  avatar?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Post {
  slug: string;
  locale: Locale;
  /**
   * Shared id linking translations of the same article.
   *
   * Slugs are translated (a French article should have a French URL), so the
   * slug cannot be the join key between locales. This can, and it is what
   * hreflang pairing reads.
   */
  translationKey: string;
  title: string;
  /**
   * The meta description, authored as one. Not an auto-generated summary of the
   * first paragraph — that is precisely the pattern that makes Google throw the
   * description away and synthesise its own snippet.
   *
   * Target 140–160 characters.
   */
  excerpt: string;
  /** Shown above the title and used as `articleSection` in JSON-LD. */
  category: string;
  tags: string[];
  /** ISO 8601. Drives `datePublished` and sitemap `lastModified`. */
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  cover: { src: string; alt: string };
  body: Block[];
  /** Rendered as an accordion and emitted as FAQPage schema. Optional. */
  faq?: FAQ[];
  /** Slugs of related posts. Unknown slugs are ignored at render time. */
  related?: string[];
  featured?: boolean;
}

/** Inline markup supported inside `text` fields, resolved by the prose renderer. */
export const INLINE_SYNTAX = {
  /** `**bold**` */
  bold: /\*\*(.+?)\*\*/g,
  /** `` `code` `` */
  code: /`([^`]+?)`/g,
  /** `[label](href)` */
  link: /\[([^\]]+?)\]\(([^)]+?)\)/g,
} as const;

/** Average adult reading speed for technical prose, words per minute. */
const WPM = 200;

function blockWords(block: Block): number {
  switch (block.type) {
    case "paragraph":
    case "heading":
    case "quote":
      return block.text.split(/\s+/).length;
    case "callout":
      return block.text.split(/\s+/).length + (block.title?.split(/\s+/).length ?? 0);
    case "list":
      return block.items.join(" ").split(/\s+/).length;
    case "table":
      return [...block.head, ...block.rows.flat()].join(" ").split(/\s+/).length;
    // Code is scanned, not read: counting it inflates the estimate badly.
    case "code":
    case "image":
    case "divider":
      return 0;
  }
}

export function wordCount(body: Block[]): number {
  return body.reduce((total, block) => total + blockWords(block), 0);
}

export function readingMinutes(body: Block[]): number {
  return Math.max(1, Math.round(wordCount(body) / WPM));
}

/** h2s only — a two-level TOC in a sidebar rail stops being scannable. */
export function tableOfContents(body: Block[]): { id: string; text: string }[] {
  return body
    .filter((b): b is Extract<Block, { type: "heading" }> => b.type === "heading")
    .filter((b) => b.level === 2)
    .map(({ id, text }) => ({ id, text }));
}
