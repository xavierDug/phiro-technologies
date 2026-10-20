/**
 * Site-wide content: services, process, stack, testimonials. Navigation lives
 * in `content/navigation.ts`.
 *
 * Kept as typed data rather than JSX so sections stay presentational and the
 * same content can feed more than one layout — the same pattern used by
 * `och-planner/_content/offer.ts`.
 */

import { BUSINESS, type Locale } from "@/lib/seo";
import {
  journeyFr,
  processStepsFr,
  servicesFr,
  statsFr,
  testimonialsFr,
  valuesFr,
} from "@/content/site.fr";

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
  locality: `${BUSINESS.addressLocality}, ${BUSINESS.addressRegion}`,
  responseTime: "Within one business day",
};

/**
 * Clients named on the home page. Proper nouns, not translated. Only list a
 * client here with their agreement to be named.
 */
export const clients: string[] = [
  "Optimum Car Health",
  "Soudure FLF",
  "Club de Natation Mustang",
  "Team OT13",
];

export interface Service {
  /** Stable key and the number shown beside the row. */
  index: string;
  title: string;
  /** One or two sentences. */
  description: string;
  /** Two short deliverable labels, set in mono on the right of the row. */
  tags: [string, string];
}

/** Websites lead; the software work follows as the deeper offer. */
export const services: Service[] = [
  {
    index: "01",
    title: "Marketing websites",
    description:
      "Fast, distinctive sites your team can actually edit — built around the one action you need visitors to take.",
    tags: ["Next.js · WordPress", "Copy & structure"],
  },
  {
    index: "02",
    title: "Web design",
    description:
      "Interface and visual design that starts from the daily loop your customers are already in, not from a template.",
    tags: ["UI design", "Design systems"],
  },
  {
    index: "03",
    title: "SEO & performance",
    description:
      "Technical SEO, structured data and Core Web Vitals — the faults nobody sees until the traffic stops arriving.",
    tags: ["Audits", "Local search"],
  },
  {
    index: "04",
    title: "Web apps & SaaS",
    description:
      "Booking systems, client portals and multi-tenant platforms that replace the spreadsheet the business quietly runs on.",
    tags: [".NET · TypeScript", "Stripe"],
  },
  {
    index: "05",
    title: "Care after launch",
    description:
      "Hosting, monitoring, updates and steady improvements. We stay after launch — the relationship is the deliverable.",
    tags: ["Maintenance", "Iteration"],
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
      "Before a line of code, we find the one thing this site has to do well — and help you defer the rest.",
  },
  {
    index: "02",
    title: "Design and build together",
    description:
      "No handoff wall. The people designing it are the people building it, so what ships still looks like the design.",
  },
  {
    index: "03",
    title: "Built to last",
    description:
      "Clean code, real boundaries, measured performance. The second year costs less than the first.",
  },
  {
    index: "04",
    title: "Partner, not vendor",
    description:
      "Direct access to the people building your site, and we stay past launch.",
  },
];

/** Proper nouns, not translated. */
export const stack: string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "WordPress",
  ".NET",
  "C#",
  "Node.js",
  "PostgreSQL",
  "SQL Server",
  "Stripe",
  "Firebase",
  "Vercel",
  "Azure",
  "Figma",
  "GitHub",
];

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  /** The one quote the home page leads with. */
  featured?: boolean;
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
    featured: true,
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
  /** A year or an identifier: shown as-is, never counted up or digit-grouped. */
  literal?: boolean;
}

/** TODO(content): verify these against your real numbers before launch. */
export const stats: Stat[] = [
  { label: "Products shipped", value: 24, suffix: "+" },
  { label: "Average Lighthouse score", value: 96 },
  { label: "Client retention", value: 100, suffix: "%" },
  { label: "Building in Montréal since", value: Number(BUSINESS.foundingYear), literal: true },
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
      "Members ships — a full multi-tenant SaaS with billing, auth and reporting. Phiro grows from the websites into the products behind them.",
  },
  {
    year: "Next",
    title: "Expanding the vision",
    description:
      "More client sites, longer partnerships, and a bar that keeps moving. The goal was never volume — it was building things that hold up.",
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
      "Real structure, measured performance. The second year of a website should cost less than the first, not more.",
  },
  {
    title: "Human first",
    description:
      "Websites are used by people under time pressure. Every decision gets measured against that, not against a spec sheet.",
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
 * `stack` and `clients` are deliberately absent: they are proper nouns and are
 * not translated.
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
