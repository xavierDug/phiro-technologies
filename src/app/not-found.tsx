import type { Metadata } from "next";

import { SiteChrome } from "@/components/layout/site-chrome";
import { NotFoundView } from "@/components/pages/not-found-view";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * Root 404. It renders outside the route groups' layouts, so it brings the
 * site chrome itself.
 */
export default function NotFound() {
  return (
    <SiteChrome locale="en">
      <NotFoundView locale="en" />
    </SiteChrome>
  );
}
