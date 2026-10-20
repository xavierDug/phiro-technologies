/**
 * The translation contract.
 *
 * Every locale file implements this interface, which means a missing or renamed
 * key is a compile error rather than a string that silently renders in the
 * wrong language. That is stronger than the default guarantee from a JSON-based
 * i18n library, and it is the reason this site does not need one.
 *
 * Long-form content (case studies, blog posts) is NOT in here — it lives in its
 * own per-locale modules, because prose that long wants to be authored, not
 * key-mapped.
 */

export interface NavDict {
  home: string;
  about: string;
  work: string;
  services: string;
  blog: string;
  contact: string;
  /** Accessible label for the locale toggle. */
  switchLanguage: string;
  menu: string;
  close: string;
}

export interface BlogDict {
  /** Index page. */
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  featured: string;
  latest: string;
  allPosts: string;
  readArticle: string;
  minuteRead: string;
  /** Shown when a locale has no posts yet. */
  emptyTitle: string;
  emptyBody: string;
  emptyCta: string;
  /** Article page. */
  backToBlog: string;
  onThisPage: string;
  writtenBy: string;
  published: string;
  updated: string;
  share: string;
  copyLink: string;
  linkCopied: string;
  faqTitle: string;
  faqEyebrow: string;
  relatedTitle: string;
  relatedEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
}

export interface CommonDict {
  startProject: string;
  seeWork: string;
  getInTouch: string;
  nextCaseStudy: string;
  email: string;
  phone: string;
  location: string;
  responseTime: string;
  allRightsReserved: string;
  tagline: string;
}

export interface FooterDict {
  studio: string;
  services: string;
  contact: string;
}

import type { SectionsDict } from "@/content/dictionaries/sections.types";
import type { FormDict } from "@/content/dictionaries/form";

export interface Dictionary {
  nav: NavDict;
  blog: BlogDict;
  sections: SectionsDict;
  form: FormDict;
  footer: FooterDict;
  common: CommonDict;
}
