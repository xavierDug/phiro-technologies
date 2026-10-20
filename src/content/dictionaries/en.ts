import type { Dictionary } from "@/content/dictionaries/types";
import { sectionsEn } from "@/content/dictionaries/sections.en";
import { formEn } from "@/content/dictionaries/form";

export const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    work: "Work",
    services: "Services",
    blog: "Journal",
    contact: "Contact",
    switchLanguage: "Passer au français",
    menu: "Open menu",
    close: "Close menu",
  },
  blog: {
    eyebrow: "Journal",
    title: "Notes from the",
    titleAccent: "build",
    description:
      "What we learn shipping software — architecture decisions, performance work, and the technical SEO nobody looks at until traffic stops arriving.",
    featured: "Latest",
    latest: "More writing",
    allPosts: "All posts",
    readArticle: "Read article",
    minuteRead: "min read",
    emptyTitle: "Nothing published here yet",
    emptyBody:
      "The first articles are being written. In the meantime, the work itself is the better read.",
    emptyCta: "See our work",
    backToBlog: "Back to Journal",
    onThisPage: "On this page",
    writtenBy: "Written by",
    published: "Published",
    updated: "Updated",
    share: "Share",
    copyLink: "Copy link",
    linkCopied: "Link copied",
    faqTitle: "Common questions",
    faqEyebrow: "FAQ",
    relatedTitle: "Keep reading",
    relatedEyebrow: "Related",
    ctaTitle: "Want this audit run against your site?",
    ctaBody:
      "Tell us what you're building and we'll tell you what's holding it back. We reply within one business day.",
    ctaButton: "Start a conversation",
  },
  sections: sectionsEn,
  form: formEn,
  footer: {
    studio: "Studio",
    services: "Services",
    contact: "Contact",
  },
  common: {
    startProject: "Start a project",
    seeWork: "See our work",
    getInTouch: "Get in touch",
    nextCaseStudy: "Next case study",
    email: "Email",
    phone: "Phone",
    location: "Location",
    responseTime: "Within one business day",
    allRightsReserved: "All rights reserved.",
    tagline: "Purpose, engineered",
  },
};
