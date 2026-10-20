/**
 * Next remounts a template on every navigation, which gives a route transition
 * for free. The fade is a CSS animation (`.page-in` in globals.css) rather than
 * a motion component: it plays on first paint without waiting for hydration,
 * so it never delays the largest contentful paint.
 */
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
