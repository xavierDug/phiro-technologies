/**
 * Site-wide content: services, process, stack, testimonials, navigation.
 *
 * Kept as typed data rather than JSX so sections stay presentational and the
 * same content can feed more than one layout — the same pattern used by
 * `och-planner/_content/offer.ts`.
 */

import type { Dictionary } from "@/content/dictionaries/types";
import { en } from "@/content/dictionaries/en";
import { BUSINESS, localePath, type Locale } from "@/lib/seo";
import {
  journeyFr,
  processStepsFr,
  servicesFr,
  statsFr,
  testimonialsFr,
  valuesFr,
} from "@/content/site.fr";

export interface NavLink {
  href: string;
  label: string;
}

/**
 * Navigation as structure, not strings: the path is fixed, the label comes from
 * the active dictionary. Adding a locale therefore cannot forget a nav item.
 */
const NAV_ITEMS = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "work", path: "/projects" },
  { key: "blog", path: "/blog" },
  { key: "contact", path: "/contact" },
] as const satisfies readonly { key: keyof Dictionary["nav"]; path: string }[];

export function buildNavLinks(dict: Dictionary, locale: Locale): NavLink[] {
  return NAV_ITEMS.map((item) => ({
    href: localePath(item.path, locale),
    label: dict.nav[item.key],
  }));
}

/** English default, kept for components that have no locale in scope yet. */
export const navLinks: NavLink[] = buildNavLinks(en, "en");

/**
 * Published contact details.
 *
 * These strings must stay byte-identical to the Google Business Profile — the
 * match between site and profile is a literal string comparison, so "Montréal"
 * and "Montreal" are two different businesses as far as it is concerned.
 * Sourced from BUSINESS in lib/seo.ts so the JSON-LD cannot disagree with the
 * footer.
 */
export const contactDetails = {
  email: BUSINESS.email,
  phone: BUSINESS.telephone,
  phoneHref: `tel:${BUSINESS.telephoneE164}`,
  location: `${BUSINESS.addressLocality}, ${BUSINESS.addressRegion}, Canada`,
  responseTime: "Within one business day",
};

export interface Service {
  /** Stable key, also used to look up the card's graphic. */
  index: string;
  /** One word, set in mono above the title. */
  eyebrow: string;
  title: string;
  /**
   * Kept to two lines. The bento card gives copy a small frosted panel over a
   * large graphic — the graphic carries the weight, so anything longer than
   * this overflows and makes the grid feel cramped.
   */
  description: string;
  /** Columns out of six. Row one is 3+3, row two is 2+2+2. */
  span: 3 | 2;
}

export const services: Service[] = [
  {
    index: "01",
    eyebrow: "Platforms",
    title: "Product & SaaS engineering",
    description:
      "Multi-tenant platforms, billing and dashboards — built to survive their second year, not just their launch.",
    span: 3,
  },
  {
    index: "02",
    eyebrow: "Applications",
    title: "Web applications",
    description:
      "Internal tools and customer-facing apps that replace the spreadsheet the business quietly runs on.",
    span: 3,
  },
  {
    index: "03",
    eyebrow: "Websites",
    title: "Marketing sites",
    description:
      "Fast, distinctive sites your team can actually edit.",
    span: 2,
  },
  {
    index: "04",
    eyebrow: "Design",
    title: "Interface design",
    description:
      "Design that starts from the daily loop your users are already in.",
    span: 2,
  },
  {
    index: "05",
    eyebrow: "Partnership",
    title: "We stay after launch",
    description:
      "Monitoring, iteration, and the steady removal of what slows you down.",
    span: 2,
  },
];

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Clarity first",
    description:
      "Before a line of code, we find the one thing this product has to do well. Most briefs contain three projects; we help you pick the one that matters and defer the rest.",
  },
  {
    index: "02",
    title: "Design and engineering together",
    description:
      "No handoff wall. The people designing the interface are the people building it, so what gets specified is what can actually ship — and what ships still looks like the design.",
  },
  {
    index: "03",
    title: "Built to scale",
    description:
      "Typed contracts, a real service layer, no logic smuggled into route handlers. The boring discipline that makes the second year cheaper than the first.",
  },
  {
    index: "04",
    title: "Partner, not vendor",
    description:
      "You get direct access to the people building your product, and we stay past launch. The relationship is the deliverable.",
  },
];

export interface StackItem {
  name: string;
  /** simple-icons slug, resolved by the stack ribbon. */
  icon: string;
}

export const stack: StackItem[] = [
  { name: "Next.js", icon: "nextdotjs" },
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: ".NET", icon: "dotnet" },
  { name: "C#", icon: "csharp" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "SQL Server", icon: "microsoftsqlserver" },
  { name: "Stripe", icon: "stripe" },
  { name: "Firebase", icon: "firebase" },
  { name: "Vercel", icon: "vercel" },
  { name: "Azure", icon: "microsoftazure" },
  { name: "Figma", icon: "figma" },
  { name: "GitHub", icon: "github" },
  { name: "WordPress", icon: "wordpress" },
];

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

/**
 * TODO(content): these are placeholders written to demonstrate layout and
 * length. Replace every one with a real, attributable quote before launch —
 * fabricated testimonials are both a legal and a credibility problem.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "They asked better questions than our last three agencies combined. The build was almost the easy part.",
    author: "Operations lead",
    role: "Fitness group",
  },
  {
    quote:
      "The phone barely rings for appointments now. That alone gave me back half my morning.",
    author: "Shop owner",
    role: "Optimum Car Health",
  },
  {
    quote:
      "We shipped in nine weeks what our internal team had been scoping for eight months.",
    author: "Founder",
    role: "SaaS startup",
  },
  {
    quote:
      "First agency that pushed back on our spec instead of just billing for it. Saved us a quarter of work.",
    author: "Product manager",
    role: "Logistics",
  },
  {
    quote:
      "Two years on, the codebase is still easy to hire into. That was not our experience before.",
    author: "CTO",
    role: "B2B platform",
  },
  {
    quote:
      "Our volunteers update the whole season now without calling anyone. That was the entire goal.",
    author: "Club administrator",
    role: "Club de Natation Mustang",
  },
];

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

/** TODO(content): verify these against your real numbers before launch. */
export const stats: Stat[] = [
  { label: "Products shipped", value: 24, suffix: "+" },
  { label: "Years building", value: 4 },
  { label: "Average Lighthouse score", value: 96 },
  { label: "Client retention", value: 100, suffix: "%" },
];

export interface JourneyEntry {
  year: string;
  title: string;
  description: string;
}

export const journey: JourneyEntry[] = [
  {
    year: "2023",
    title: "The vision is born",
    description:
      "Phiro starts as a conviction that most software is built backwards — shipped fast, understood never. The first client projects are websites, and the discipline starts there.",
  },
  {
    year: "2024",
    title: "Laying the foundation",
    description:
      "The stack settles: Next.js and TypeScript on the front, .NET and Dapper behind it, clean architecture as a non-negotiable. Projects get bigger and the boundaries get sharper.",
  },
  {
    year: "2025",
    title: "Launch and momentum",
    description:
      "Members ships — a full multi-tenant SaaS with billing, auth and reporting. Phiro stops being a studio that makes websites and becomes one that builds products.",
  },
  {
    year: "Next",
    title: "Expanding the vision",
    description:
      "More product work, longer partnerships, and a bar that keeps moving. The goal was never volume — it was building things that hold up.",
  },
];

export interface Value {
  title: string;
  description: string;
}

export const values: Value[] = [
  {
    title: "Simple, not simplistic",
    description:
      "Complexity is easy to add and expensive to remove. We spend the effort up front so the product stays understandable.",
  },
  {
    title: "Built to last",
    description:
      "Typed contracts and real boundaries. The second year of a codebase should cost less than the first, not more.",
  },
  {
    title: "Human first",
    description:
      "Software is used by people under time pressure. Every decision gets measured against that, not against a spec sheet.",
  },
  {
    title: "Honest about tradeoffs",
    description:
      "We will tell you when a request is a bad idea, and why. You are paying for judgement, not agreement.",
  },
];

/**
 * Locale-resolved site content.
 *
 * `stack` is deliberately absent: product names (Next.js, .NET, PostgreSQL) are
 * proper nouns and are not translated.
 */
export interface SiteContent {
  services: Service[];
  processSteps: ProcessStep[];
  testimonials: Testimonial[];
  stats: Stat[];
  journey: JourneyEntry[];
  values: Value[];
}

export function getSiteContent(locale: Locale): SiteContent {
  if (locale === "fr") {
    return {
      services: servicesFr,
      processSteps: processStepsFr,
      testimonials: testimonialsFr,
      stats: statsFr,
      journey: journeyFr,
      values: valuesFr,
    };
  }

  return { services, processSteps, testimonials, stats, journey, values };
}
