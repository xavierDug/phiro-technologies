/**
 * Copy for the marketing sections.
 *
 * Kept separate from `types.ts` (nav / blog / footer / common chrome) purely
 * for file size — this is the bulk of the site's prose, and one 400-line
 * dictionary interface is harder to diff than two focused ones.
 *
 * Every heading here follows the site's one headline pattern: a plain `title`
 * fragment, then a single serif-italic `accent` word. Translations must keep
 * that shape — a French accent word that is three words long breaks the
 * typographic rhythm the whole page is built on.
 */

export interface HeadingCopy {
  eyebrow: string;
  title: string;
  accent: string;
  description?: string;
}

export interface SectionsDict {
  hero: {
    badge: string;
    /** First line, plain. */
    titleLead: string;
    /** Second line, serif italic gold. */
    titleAccent: string;
    lead: string;
    scroll: string;
  };
  stack: {
    eyebrow: string;
    ariaLabel: string;
  };
  services: HeadingCopy;
  work: HeadingCopy & { allProjects: string };
  craft: HeadingCopy & {
    points: string[];
    imageAlt: string;
    cta: string;
  };
  process: HeadingCopy;
  testimonials: HeadingCopy;
  mission: HeadingCopy;
  journey: HeadingCopy;
  cta: HeadingCopy & { emailUs: string };
  /** Page heroes for the interior routes. */
  pages: {
    about: HeadingCopy;
    projects: HeadingCopy;
    contact: HeadingCopy;
  };
  contact: {
    emailLabel: string;
    basedIn: string;
    responseTime: string;
    reachDirectly: string;
  };
  /** Display labels for the projects-index filter. Keys are ProjectCategory. */
  projectCategories: Record<string, string>;
  /** Count suffix under the projects filter. */
  projectCount: { one: string; other: string };
  caseStudy: {
    client: string;
    year: string;
    role: string;
    stack: string;
    results: string;
    screens: string;
    next: string;
  };
}
