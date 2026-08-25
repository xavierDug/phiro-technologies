import { HomeView } from "@/components/pages/home-view";

/**
 * Server component. Interactivity lives in the leaf sections, each of which
 * marks itself "use client" — the page itself ships no JS of its own.
 * Metadata for `/` comes from the root layout.
 */
export default function HomePage() {
  return <HomeView />;
}
