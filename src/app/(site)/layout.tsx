import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
