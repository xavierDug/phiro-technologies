import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Toaster } from "@/components/ui/sonner";

/**
 * Chrome for the main Phiro Technologies site.
 * Campaign landing pages (e.g. /och-planner) live outside this group so they
 * can carry their own header/footer without fighting Phiro's navigation.
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollProgress className="z-[70] h-[2px] bg-gradient-to-r from-gold-deep via-gold to-gold-deep" />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <Toaster position="bottom-right" />
    </>
  );
}
