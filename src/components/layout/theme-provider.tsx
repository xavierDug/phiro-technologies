"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * The site is dark-only. This exists purely so registry components that call
 * `useTheme()` (Magic UI's MagicCard, among others) resolve to "dark" instead of
 * `undefined` and pick their dark-variant styling. There is no toggle, and
 * `forcedTheme` means there is nothing for a user preference to fight with.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
