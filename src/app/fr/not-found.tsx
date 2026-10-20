import { NotFoundView } from "@/components/pages/not-found-view";

/** Rendered inside the French layout, which already provides the chrome. */
export default function FrenchNotFound() {
  return <NotFoundView locale="fr" />;
}
