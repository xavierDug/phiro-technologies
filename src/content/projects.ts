/**
 * Single source of truth for everything project-related.
 *
 * Previously this array was duplicated in `components/projects.tsx` and
 * `app/(site)/projects/page.tsx`, and the two copies had already drifted — the
 * same project linked to `/projects/phiro` in one and `/projects/members` in the
 * other, and neither route existed. The home grid, the projects index and the
 * `/projects/[slug]` case studies now all read from here.
 *
 * TODO(content): metrics, testimonial quotes and client names below are
 * plausible placeholders. Verify every number against real analytics before
 * this ships publicly.
 */

export type ProjectCategory = "SaaS" | "Web App" | "Website" | "E-commerce";

export interface ProjectMetric {
  label: string;
  value: number;
  /** Rendered after the counted value, e.g. "%", "h", "x". */
  suffix?: string;
  prefix?: string;
}

export interface ProjectSection {
  heading: string;
  body: string[];
}

export interface GalleryItem {
  src: string;
  alt: string;
  /** Chrome the screenshot is presented in on the case-study page. */
  frame?: "safari" | "iphone" | "none";
}

export interface Project {
  slug: string;
  title: string;
  /** Short label used in cards and the projects index. */
  name: string;
  client: string;
  year: string;
  category: ProjectCategory;
  role: string;
  /** One line. Used on cards and as the meta description. */
  summary: string;
  /** Two or three sentences, opening the case study. */
  intro: string;
  cover: string;
  stack: string[];
  challenge: ProjectSection;
  approach: ProjectSection;
  outcome: ProjectSection;
  metrics: ProjectMetric[];
  gallery: GalleryItem[];
  testimonial?: { quote: string; author: string; role: string };
  liveUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "members",
    title: "Members — Gym Management SaaS",
    name: "Members",
    client: "Phiro Technologies",
    year: "2025",
    category: "SaaS",
    role: "Product design, full-stack engineering, infrastructure",
    summary:
      "A multi-tenant SaaS that runs the whole business side of a gym — memberships, payments, attendance and reporting.",
    intro:
      "Independent gyms run on a patchwork of spreadsheets, card readers and paper sign-in sheets. Members replaces all of it with one system: memberships, Stripe subscriptions, door check-ins, and an owner's dashboard that finally answers whether the business is actually growing.",
    cover: "/saas-gym.png",
    stack: [
      "Next.js",
      "TypeScript",
      ".NET 8",
      "Dapper",
      "SQL Server",
      "Stripe",
      "Firebase Auth",
      "Azure",
    ],
    challenge: {
      heading: "The challenge",
      body: [
        "Every gym we spoke to was running three or four disconnected tools. Membership status lived in one place, payment status in another, and attendance in a binder at the front desk. Reconciling them was a manual job someone did on a Sunday.",
        "The harder constraint was multi-tenancy. One deployment had to serve many gyms with strict data isolation, per-tenant billing and per-tenant branding — without the per-customer maintenance burden that quietly kills small SaaS products.",
      ],
    },
    approach: {
      heading: "What we built",
      body: [
        "A clean-architecture .NET API with a repository layer over Dapper — deliberately no ORM, so every query against the tenant-scoped schema stays explicit and reviewable. Tenant resolution happens once, at the edge of the request, and every downstream query inherits it.",
        "Stripe handles subscriptions, with webhooks driving membership state so payment status and access rights can never disagree. The Next.js front end is built around the owner's daily loop: who is here now, who lapsed, what came in this month.",
      ],
    },
    outcome: {
      heading: "The outcome",
      body: [
        "Front-desk check-in went from a paper binder to a two-second scan. Owners get a live revenue picture instead of a month-end reconciliation, and failed payments surface the day they happen rather than the month after.",
      ],
    },
    metrics: [
      { label: "Faster member check-in", value: 94, suffix: "%" },
      { label: "Admin hours saved weekly", value: 12, suffix: "h" },
      { label: "Reconciliation time", value: 0, suffix: "h" },
    ],
    gallery: [
      { src: "/saas-gym.png", alt: "Members owner dashboard", frame: "safari" },
      { src: "/Demo.png", alt: "Members membership management view", frame: "safari" },
      { src: "/IphoneMockup.png", alt: "Members mobile check-in", frame: "none" },
    ],
    featured: true,
  },
  {
    slug: "och-planner",
    title: "OCH Planner — Automotive Workshop Scheduling",
    name: "OCH Planner",
    client: "Optimum Car Health",
    year: "2024",
    category: "Web App",
    role: "Product design, full-stack engineering",
    summary:
      "Online booking and shop-floor scheduling for an automotive workshop, replacing a phone-and-notebook workflow.",
    intro:
      "A busy garage loses money two ways: empty bays, and a service advisor who spends half the day on the phone. OCH Planner gives customers self-serve online booking, and gives the shop a single schedule view of every bay, every day.",
    cover: "/OCHProject.png",
    stack: ["Next.js", "React", "TypeScript", "Firebase", "Tailwind CSS"],
    challenge: {
      heading: "The challenge",
      body: [
        "Appointments arrived by phone, walk-in and text, and lived in a paper day-book. Double-bookings were routine, and nobody could see tomorrow's capacity without physically reading the book.",
        "Any replacement had to be usable by technicians with oily hands on a wall-mounted tablet — which ruled out dense, desktop-style interfaces.",
      ],
    },
    approach: {
      heading: "What we built",
      body: [
        "A public booking flow that only ever offers slots the shop can actually service, driven by real bay capacity and service-duration rules rather than a generic calendar widget.",
        "Behind it, a shop-floor schedule built for glanceability: large touch targets, colour-coded service types, drag-to-reschedule. Firebase keeps the front desk and the floor tablet in sync in real time.",
      ],
    },
    outcome: {
      heading: "The outcome",
      body: [
        "Booking moved off the phone almost entirely within the first month, and the day-book was retired. Double-bookings stopped being a category of problem.",
      ],
    },
    metrics: [
      { label: "Bookings taken online", value: 78, suffix: "%" },
      { label: "Fewer scheduling conflicts", value: 100, suffix: "%" },
      { label: "Phone time saved daily", value: 2, suffix: "h" },
    ],
    gallery: [
      { src: "/OCHProject.png", alt: "OCH Planner booking interface", frame: "safari" },
      { src: "/PhiroGarageMock.png", alt: "OCH Planner shop-floor schedule", frame: "none" },
    ],
    testimonial: {
      quote:
        "The phone barely rings for appointments now. That alone gave me back half my morning.",
      author: "Shop owner",
      role: "Optimum Car Health",
    },
    featured: true,
  },
  {
    slug: "soudure-flf",
    title: "Soudure FLF — Industrial Welding",
    name: "Soudure FLF",
    client: "Soudure FLF",
    year: "2024",
    category: "Website",
    role: "Design, WebGL development, WordPress build",
    summary:
      "A manufacturer's site where products are explored as interactive 3D models instead of flat photographs.",
    intro:
      "Industrial fabrication is a tactile business sold through flat catalogue photos. We rebuilt Soudure FLF's site around interactive Three.js models, so a prospect can turn a part over and understand it before ever picking up the phone.",
    cover: "/SoudureFLF.png",
    stack: ["WordPress", "Three.js", "JavaScript", "PHP", "SCSS"],
    challenge: {
      heading: "The challenge",
      body: [
        "Photographs flatten welded assemblies into something unreadable. The sales team was fielding the same geometry questions on every call.",
        "The site also had to stay editable by a non-technical team and load acceptably on rural connections — two goals that pull directly against shipping 3D assets.",
      ],
    },
    approach: {
      heading: "What we built",
      body: [
        "Compressed, Draco-encoded models that stream in progressively behind a static poster image, so the page is readable immediately and becomes interactive a moment later. On slow connections or reduced-motion settings, the poster simply stays.",
        "Everything around the viewer stayed in WordPress, so the team edits copy and products exactly as they did before.",
      ],
    },
    outcome: {
      heading: "The outcome",
      body: [
        "Prospects arrive at calls already understanding the product, and time on product pages more than doubled against the old catalogue layout.",
      ],
    },
    metrics: [
      { label: "Longer time on product pages", value: 140, suffix: "%" },
      { label: "Lighthouse performance", value: 92 },
      { label: "Products modelled in 3D", value: 18 },
    ],
    gallery: [
      {
        src: "/SoudureFLF.png",
        alt: "Soudure FLF product page with 3D viewer",
        frame: "safari",
      },
    ],
    featured: true,
  },
  {
    slug: "coach-fitness",
    title: "Team OT13 — Personal Training",
    name: "Team OT13",
    client: "Team OT13",
    year: "2023",
    category: "Website",
    role: "Design, WordPress build, SEO",
    summary:
      "A conversion-focused site for a personal trainer, built around one goal: booked consultations.",
    intro:
      "A personal trainer's site has exactly one job. We stripped everything that was not moving a visitor toward booking a consultation, then made the remaining path fast and obvious on a phone.",
    cover: "/TeamOT13.png",
    stack: ["WordPress", "PHP", "Tailwind CSS", "Google Analytics"],
    challenge: {
      heading: "The challenge",
      body: [
        "The previous site was a brochure: plenty of pages, no path. Visitors landed, read, and left without a next step.",
        "Almost all traffic was mobile and local, so mobile performance and local search visibility mattered far more than desktop polish.",
      ],
    },
    approach: {
      heading: "What we built",
      body: [
        "A single-narrative page — proof, method, pricing, book — with the booking CTA persistently reachable rather than buried at the bottom.",
        "Local SEO groundwork: structured data, location pages, compressed imagery, and a build that scores well on mobile without a caching plugin propping it up.",
      ],
    },
    outcome: {
      heading: "The outcome",
      body: [
        "Consultation enquiries roughly tripled in the first quarter after launch, from the same traffic volume.",
      ],
    },
    metrics: [
      { label: "More consultation enquiries", value: 210, suffix: "%" },
      { label: "Mobile Lighthouse score", value: 96 },
      { label: "Local search impressions", value: 3, suffix: "x" },
    ],
    gallery: [
      { src: "/TeamOT13.png", alt: "Team OT13 landing page", frame: "safari" },
      { src: "/SeoThumbnail.png", alt: "Search visibility growth after launch", frame: "none" },
    ],
  },
  {
    slug: "cn-mustang",
    title: "Club de Natation Mustang",
    name: "CN Mustang",
    client: "Club de Natation Mustang",
    year: "2023",
    category: "Website",
    role: "Lead developer, ongoing maintenance",
    summary:
      "A swim club's public site and member information hub, maintained season over season.",
    intro:
      "A competitive swim club publishes constantly — schedules, meet results, registration windows — to parents who need the answer in ten seconds on a phone at the pool deck. We rebuilt the site around that reality.",
    cover: "/CNMustang.png",
    stack: ["WordPress", "PHP", "JavaScript", "SCSS"],
    challenge: {
      heading: "The challenge",
      body: [
        "Season information was scattered across PDFs, Facebook posts and email. Parents asked volunteers the same questions every week because there was no single reliable place to look.",
        "The people maintaining it are volunteers, not web editors, so anything requiring technical confidence would decay within a season.",
      ],
    },
    approach: {
      heading: "What we built",
      body: [
        "A structured content model for schedules, groups and results, so updating the season means filling in fields rather than editing layout.",
        "A mobile-first information architecture built around the questions actually being asked, plus ongoing technical maintenance so the club never has to think about updates or security.",
      ],
    },
    outcome: {
      heading: "The outcome",
      body: [
        "Repetitive parent enquiries dropped sharply, and the club has run several seasons of content updates without developer involvement.",
      ],
    },
    metrics: [
      { label: "Seasons maintained", value: 3 },
      { label: "Fewer repeat enquiries", value: 60, suffix: "%" },
      { label: "Volunteer training needed", value: 0, suffix: "h" },
    ],
    gallery: [
      { src: "/CNMustang.png", alt: "Club de Natation Mustang home page", frame: "safari" },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Wraps around, so the last case study still offers somewhere to go next. */
export function getNextProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];
