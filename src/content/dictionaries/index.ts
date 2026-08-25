import type { Locale } from "@/lib/seo";
import type { Dictionary } from "@/content/dictionaries/types";
import { en } from "@/content/dictionaries/en";
import { fr } from "@/content/dictionaries/fr";

const DICTIONARIES: Record<Locale, Dictionary> = { en, fr };

/**
 * Synchronous by design. Both dictionaries are small typed modules, so there is
 * nothing to await and no loading state to thread through the tree — server
 * components read the dictionary inline, and pages stay fully static.
 */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary };
