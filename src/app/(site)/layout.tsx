import { SiteChrome } from "@/components/layout/site-chrome";

/**
 * English site. French lives under `src/app/fr` with its own layout so it can
 * carry a different dictionary and `lang`; campaign landing pages
 * (e.g. /och-planner) sit outside both so they can bring their own
 * header/footer without fighting Phiro's navigation.
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteChrome locale="en">{children}</SiteChrome>;
}
