import { SiteChrome } from "@/components/layout/site-chrome";

/**
 * French site. Mirrors `(site)/layout.tsx` with a different locale — the chrome
 * itself, and every section under it, resolves its copy from the dictionary
 * this sets.
 */
export default function FrenchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteChrome locale="fr">{children}</SiteChrome>;
}
