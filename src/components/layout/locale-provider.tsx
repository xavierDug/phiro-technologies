"use client";

import { createContext, useContext } from "react";

import type { SlugTranslation } from "@/content/blog";
import type { Dictionary } from "@/content/dictionaries/types";
import type { Locale } from "@/lib/seo";

interface LocaleContextValue {
  locale: Locale;
  dict: Dictionary;
  /**
   * Slug -> translated-slug lookup for blog posts, computed server-side by
   * SiteChrome. Carried as plain data rather than imported here so this
   * client-side context never pulls full post bodies into its bundle — see
   * the doc comment on `blogSlugMap` in content/blog/index.ts.
   */
  blogSlugMap: SlugTranslation[];
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Makes the active dictionary available to client components without prop
 * drilling it through twenty section components.
 *
 * Server components should NOT use this — they call `getDictionary(locale)`
 * directly, which keeps their output static. This exists only for the leaf
 * components that are already "use client" for animation reasons.
 */
export function LocaleProvider({
  locale,
  dict,
  blogSlugMap,
  children,
}: LocaleContextValue & { children: React.ReactNode }) {
  return (
    <LocaleContext.Provider value={{ locale, dict, blogSlugMap }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error("useLocale must be used inside <LocaleProvider>.");
  }
  return value;
}
