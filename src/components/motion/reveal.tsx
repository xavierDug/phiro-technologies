"use client";

import { m } from "motion/react";

import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";

type RevealTag = "div" | "section" | "li" | "ul" | "ol" | "article" | "figure" | "header" | "p";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: RevealTag;
  /** Seconds before this element starts, on top of any parent stagger. */
  delay?: number;
}

/**
 * Fades and lifts its children into place the first time they scroll into
 * view. Children stay server-rendered: this island only adds the wrapper.
 */
export function Reveal({ children, className, as = "div", delay = 0 }: RevealProps) {
  const Tag = m[as];
  return (
    <Tag
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={delay ? { delay } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Parent that plays its `RevealItem` children in sequence. */
export function RevealGroup({
  children,
  className,
  as = "div",
  gap = 0.08,
  delay = 0,
}: RevealProps & { gap?: number }) {
  const Tag = m[as];
  return (
    <Tag
      variants={stagger(delay, gap)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: Omit<RevealProps, "delay">) {
  const Tag = m[as];
  return (
    <Tag variants={fadeUp} className={className}>
      {children}
    </Tag>
  );
}
