/**
 * Copy for the marketing sections.
 *
 * Kept separate from `types.ts` (nav / blog / footer / common chrome) purely
 * for file size — this is the bulk of the site's prose, and one 400-line
 * dictionary interface is harder to diff than two focused ones.
 *
 * Every heading here follows the site's one headline pattern: a plain `title`
 * fragment, then a single serif-italic `accent` word (with the gold
 * highlighter), then an optional `titleEnd`. Translations must keep that shape —
 * a French accent of three words breaks the rhythm the whole page is built on.
 */

export interface HeadingCopy {
  eyebrow: string;
  title: string;
  accent: string;
  /** Plain text after the accent word, before the closing punctuation. */
  titleEnd?: string;
  description?: string;
}

export interface SectionsDict {
  hero: {
    badge: string;
    titleLead: string;
    /** The accent word, set in serif italic over the gold highlighter. */
    titleAccent: string;
    lead: string;
  };
  clients: {
    label: string;
  };
  intro: {
    eyebrow: string;
    statement: string;
    link: string;
  };
  services: HeadingCopy;
  work: HeadingCopy & { allProjects: string };
  process: HeadingCopy;
  stats: {
    ariaLabel: string;
  };
  testimonial: {
    eyebrow: string;
  };
  journal: HeadingCopy & { allArticles: string };
  cta: HeadingCopy & { emailUs: string };
  about: {
    values: HeadingCopy;
    journey: HeadingCopy;
    team: HeadingCopy & { name: string; role: string; imageAlt: string };
    stack: { eyebrow: string };
    imageAlt: string;
  };
  /** Page heroes for the interior routes. */
  pages: {
    about: HeadingCopy;
    projects: HeadingCopy;
    contact: HeadingCopy;
  };
  contact: {
    emailLabel: string;
    phoneLabel: string;
    basedIn: string;
    responseTime: string;
  };
  notFound: HeadingCopy & {
    home: string;
    contact: string;
    popular: string;
  };
  /** Display labels for the projects-index filter. Keys are ProjectCategory. */
  projectCategories: Record<string, string>;
  /** Count suffix under the projects filter. */
  projectCount: { one: string; other: string };
  caseStudy: {
    eyebrow: string;
    allWork: string;
    client: string;
    year: string;
    role: string;
    stack: string;
    results: string;
    screens: string;
    next: string;
    visitSite: string;
  };
}
