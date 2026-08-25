import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/**
 * Resolves the small inline vocabulary allowed inside post `text` fields:
 * `**bold**`, `` `code` `` and `[label](href)`.
 *
 * One tokenising pass rather than three chained `String.replace` calls — chained
 * replaces corrupt each other the moment a link label contains backticks, and
 * they cannot produce React elements without dangerouslySetInnerHTML, which is
 * the thing we are avoiding by not shipping a Markdown pipeline at all.
 */
const PATTERN = /\*\*(.+?)\*\*|`([^`]+?)`|\[([^\]]+?)\]\(([^)]+?)\)/g;

export function Inline({ text }: { text: string }): ReactNode {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  // `exec` in a loop keeps `lastIndex`, so each iteration resumes where the
  // previous match ended.
  for (let match = PATTERN.exec(text); match; match = PATTERN.exec(text)) {
    if (match.index > cursor) {
      nodes.push(<Fragment key={key++}>{text.slice(cursor, match.index)}</Fragment>);
    }

    const [full, bold, code, label, href] = match;

    if (bold !== undefined) {
      nodes.push(
        <strong key={key++} className="font-medium text-text">
          {bold}
        </strong>
      );
    } else if (code !== undefined) {
      nodes.push(
        <code
          key={key++}
          className="rounded-[4px] border border-line bg-surface-2 px-[0.4em] py-[0.15em] font-mono text-[0.85em] text-gold"
        >
          {code}
        </code>
      );
    } else if (label !== undefined && href !== undefined) {
      nodes.push(<InlineLink key={key++} href={href} label={label} />);
    }

    cursor = match.index + full.length;
  }

  if (cursor < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(cursor)}</Fragment>);
  }

  return <>{nodes}</>;
}

const LINK_CLASS =
  "text-text underline decoration-gold/40 underline-offset-[3px] transition-colors hover:text-gold hover:decoration-gold";

function InlineLink({ href, label }: { href: string; label: string }) {
  // Internal links go through next/link so they prefetch and keep the SPA
  // transition; external ones get the rel pair that stops them leaking
  // window.opener and passing endorsement we did not intend.
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={LINK_CLASS}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={LINK_CLASS}>
      {label}
    </a>
  );
}
