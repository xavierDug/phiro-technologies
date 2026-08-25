/**
 * Renders a schema.org graph into the document.
 *
 * Server component by design — the markup has to be in the initial HTML for
 * crawlers that never run JS.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escaping `<` prevents a `</script>` sequence inside any content-derived
      // string (a post title, a FAQ answer) from closing the tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
