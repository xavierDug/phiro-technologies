import { cn } from "@/lib/utils";

/**
 * Minimal browser chrome around a screenshot: three dots and a hairline.
 * Pure markup and CSS (see `.browser-frame` in globals.css), so it costs no JS.
 */
export function BrowserFrame({
  children,
  className,
  flushBottom = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Square the bottom corners when the frame bleeds off a panel's edge. */
  flushBottom?: boolean;
}) {
  return (
    <div className={cn("browser-frame", flushBottom && "rounded-b-none", className)}>
      <div aria-hidden="true" className="flex gap-1.5 border-b border-line bg-card px-3.5 py-3">
        <span className="size-2.5 rounded-full bg-panel" />
        <span className="size-2.5 rounded-full bg-panel" />
        <span className="size-2.5 rounded-full bg-panel" />
      </div>
      {children}
    </div>
  );
}
