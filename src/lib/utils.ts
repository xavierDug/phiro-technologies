/**
 * Minimal class-name joiner.
 *
 * Deliberately not clsx + tailwind-merge: nothing here relies on conflict
 * resolution between competing Tailwind utilities, so the two extra
 * dependencies would not earn their place.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
