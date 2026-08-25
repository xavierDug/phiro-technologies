import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Overridable so a production build can run while `next dev` holds a lock on
   * the default `.next` directory on Windows:
   *   NEXT_DIST_DIR=.next-build npm run build
   */
  distDir: process.env.NEXT_DIST_DIR ?? ".next",

  images: {
    // AVIF first, WebP as the fallback. Both are markedly smaller than the
    // source PNGs in /public, and image weight is what decides LCP here.
    formats: ["image/avif", "image/webp"],
  },

  // NOTE: the apex -> www redirect is issued by Vercel at the domain level,
  // before a request ever reaches Next, so it cannot be configured here.
  // Set it to *permanent* in the Vercel dashboard: Project -> Settings ->
  // Domains. It currently answers 307 (temporary), which tells crawlers to keep
  // the apex indexed rather than consolidating onto www.
};

export default nextConfig;
