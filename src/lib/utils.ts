import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Class-name joiner with Tailwind conflict resolution.
 *
 * This was previously a plain `filter(Boolean).join(" ")`, on the reasoning that
 * nothing here needed conflict resolution. That reasoning no longer holds: every
 * component pulled from the shadcn / Magic UI / React Bits registries uses `cn()`
 * to let a `className` prop OVERRIDE its defaults. With a plain joiner those
 * overrides silently lose (`cn("bg-white", "bg-black")` keeps both, and source
 * order decides), which produces bugs that look like Tailwind misbehaving.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
