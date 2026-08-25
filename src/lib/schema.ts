/**
 * schema.org JSON-LD builders.
 *
 * These are the strongest lever available for a contested brand name: "Phiro"
 * currently resolves to a robotics kit, an automotive electronics firm, a data
 * consultancy and a 3D studio before it resolves to us. Explicit entity markup
 * — legal name, locality, phone, founding date, sameAs — is how you tell Google
 * which Phiro this is instead of hoping it infers correctly.
 *
 * Pure functions returning plain objects: no React, no I/O, so they stay
 * testable and can feed either a <script> tag or a build-time export.
 */

import {
  BUSINESS,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  SOCIAL_PROFILES,
  absoluteUrl,
  type Locale,
} from "@/lib/seo";

/** Stable @id anchors so the graph nodes can reference each other. */
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: BUSINESS.legalName,
    alternateName: `${SITE_NAME} — ${SITE_TAGLINE}`,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/PhiroTechnoLogo.png`,
      caption: SITE_NAME,
    },
    image: `${SITE_URL}/PhiroTechnoLogo.png`,
    description:
      "Software studio in Montréal, Québec building custom SaaS platforms, web applications and marketing sites with clean architecture and long-term maintainability.",
    foundingDate: BUSINESS.foundingYear,
    email: BUSINESS.email,
    telephone: BUSINESS.telephoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      addressCountry: BUSINESS.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    // Service-area business, not a storefront: describe the reach rather than
    // claiming a walk-in address we do not publish.
    areaServed: [
      { "@type": "City", name: "Montréal" },
      { "@type": "AdministrativeArea", name: "Québec" },
      { "@type": "Country", name: "Canada" },
    ],
    knowsLanguage: ["en-CA", "fr-CA"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: BUSINESS.email,
      telephone: BUSINESS.telephoneE164,
      areaServed: "CA",
      availableLanguage: ["English", "French"],
    },
    sameAs: [...SOCIAL_PROFILES],
  };
}

export function websiteSchema(locale: Locale = "en"): JsonLd {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: `${SITE_NAME} — ${SITE_TAGLINE}`,
    publisher: { "@id": ORG_ID },
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
    // No `potentialAction: SearchAction` here on purpose: the site has no search
    // endpoint, and declaring one that 404s is a markup error, not a freebie.
  };
}

export interface Crumb {
  name: string;
  /** Site-relative, locale-free path. */
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[], locale: Locale = "en"): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path, locale),
    })),
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
  section?: string;
  tags?: string[];
  wordCount?: number;
}

export function articleSchema(
  article: ArticleSchemaInput,
  locale: Locale = "en"
): JsonLd {
  const url = absoluteUrl(article.path, locale);

  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: article.image.startsWith("http")
      ? article.image
      : `${SITE_URL}${article.image}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": "Person", name: article.authorName, url: SITE_URL },
    publisher: { "@id": ORG_ID },
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
    ...(article.section ? { articleSection: article.section } : {}),
    ...(article.tags?.length ? { keywords: article.tags.join(", ") } : {}),
    ...(article.wordCount ? { wordCount: article.wordCount } : {}),
  };
}

export function faqSchema(items: { question: string; answer: string }[]): JsonLd {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function blogSchema(locale: Locale = "en"): JsonLd {
  return {
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog", locale)}#blog`,
    url: absoluteUrl("/blog", locale),
    name: `${SITE_NAME} Journal`,
    description:
      "Field notes on software architecture, web performance and technical SEO from the team at Phiro Technologies.",
    publisher: { "@id": ORG_ID },
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
  };
}

/**
 * Wraps nodes in a single @graph so one <script> carries the whole page's
 * entity set and the nodes can cross-reference by @id.
 */
export function graph(...nodes: JsonLd[]): JsonLd {
  return { "@context": "https://schema.org", "@graph": nodes };
}
